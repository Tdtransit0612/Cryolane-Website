import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import {
  getPortalProfile,
  getCarrierAccount,
  getCarrierLoads,
  getCarrierSettlements,
} from '@/lib/portal/data'
import { NotProvisioned, EmptyState, StatusBadge, fmtMoney, fmtDate } from '../../_ui/bits'
import QuickPayToggle from './QuickPayToggle'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Carrier Portal | Cryolane',
  robots: { index: false },
}

export default async function CarrierPortalPage() {
  const profile = await getPortalProfile()
  if (profile.data?.role !== 'carrier') redirect('/portal')

  const [account, loads, settlements] = await Promise.all([
    getCarrierAccount(),
    getCarrierLoads(),
    getCarrierSettlements(),
  ])

  const anyUnready = !account.ready || !loads.ready || !settlements.ready
  const activeLoads = loads.data.filter((l) => l.status === 'covered' || l.status === 'in_transit')
  const owed = settlements.data
    .filter((s) => s.status !== 'paid')
    .reduce((sum, s) => sum + (s.net ?? 0), 0)

  return (
    <main>
      <div className="clp-page-head">
        <h1>{account.data?.name ?? 'Carrier dashboard'}</h1>
        <p>Your loads, settlements, and compliance status with Cryolane.</p>
      </div>

      {anyUnready && <NotProvisioned error={account.error ?? loads.error ?? settlements.error} />}

      <div className="clp-tiles">
        <div className="clp-tile">
          <span className="clp-tile-label">Active loads</span>
          <span className="clp-tile-value">{activeLoads.length}</span>
        </div>
        <div className="clp-tile">
          <span className="clp-tile-label">Unpaid settlements</span>
          <span className="clp-tile-value">{fmtMoney(owed)}</span>
        </div>
        <div className="clp-tile">
          <span className="clp-tile-label">Insurance expiry</span>
          <span className="clp-tile-value">{fmtDate(account.data?.insurance_expiry)}</span>
        </div>
        <div className="clp-tile">
          <span className="clp-tile-label">Authority</span>
          <span className="clp-tile-value" style={{ textTransform: 'capitalize' }}>
            {account.data?.authority_status ?? '—'}
          </span>
        </div>
      </div>

      <section className="clp-section">
        <h2>Loads</h2>
        {!loads.ready ? null : loads.data.length === 0 ? (
          <EmptyState label="No loads assigned yet." />
        ) : (
          <div className="clp-table-wrap">
            <table className="clp-table">
              <thead>
                <tr>
                  <th>Load</th><th>Status</th><th>Pickup</th><th>Delivery</th>
                  <th>Commodity</th><th>Temp</th><th className="clp-num">Rate</th>
                </tr>
              </thead>
              <tbody>
                {loads.data.map((l) => (
                  <tr key={l.id}>
                    <td className="clp-mono">{l.load_number}</td>
                    <td><StatusBadge value={l.status} /></td>
                    <td>
                      {l.pickup_city ? `${l.pickup_city}, ${l.pickup_state ?? ''}` : '—'}
                      <span className="clp-sub">{fmtDate(l.pickup_date)}</span>
                    </td>
                    <td>
                      {l.delivery_city ? `${l.delivery_city}, ${l.delivery_state ?? ''}` : '—'}
                      <span className="clp-sub">{fmtDate(l.delivery_date)}</span>
                    </td>
                    <td>{l.commodity ?? '—'}</td>
                    <td className="clp-mono">{l.temperature ?? '—'}</td>
                    <td className="clp-num">{fmtMoney(l.carrier_rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="clp-section">
        <h2>Settlements</h2>
        {!settlements.ready ? null : settlements.data.length === 0 ? (
          <EmptyState label="No settlements yet — they appear here once a load delivers." />
        ) : (
          <div className="clp-table-wrap">
            <table className="clp-table">
              <thead>
                <tr>
                  <th>Settlement</th><th>Status</th><th className="clp-num">Gross</th>
                  <th className="clp-num">Deductions</th><th className="clp-num">Net</th>
                  <th>Paid</th><th>Reference</th>
                </tr>
              </thead>
              <tbody>
                {settlements.data.map((s) => (
                  <tr key={s.id}>
                    <td className="clp-mono">{s.settlement_number}</td>
                    <td><StatusBadge value={s.status} /></td>
                    <td className="clp-num">{fmtMoney(s.gross)}</td>
                    <td className="clp-num">{fmtMoney(s.deductions)}</td>
                    <td className="clp-num"><strong>{fmtMoney(s.net)}</strong></td>
                    <td>{fmtDate(s.paid_date)}</td>
                    <td className="clp-mono">{s.payment_reference ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="clp-section">
        <h2>Payment method</h2>
        <p style={{ marginTop: 0 }}>Choose how Cryolane pays you. You can change this anytime — it applies to settlements built after the change.</p>
        {account.ready && account.data ? (
          <QuickPayToggle initial={account.data.quick_pay_opt_in ?? false} />
        ) : (
          <EmptyState label="Unavailable right now." />
        )}
      </section>

      <section className="clp-section">
        <h2>Compliance on file</h2>
        <div className="clp-kv">
          <div><span>MC #</span><strong className="clp-mono">{account.data?.mc_number ?? '—'}</strong></div>
          <div><span>DOT #</span><strong className="clp-mono">{account.data?.dot_number ?? '—'}</strong></div>
          <div><span>Insurance</span><strong>{account.data?.insurance_provider ?? '—'}</strong></div>
          <div><span>Cargo coverage</span><strong>{fmtMoney(account.data?.cargo_insurance_amount)}</strong></div>
          <div><span>Auto liability</span><strong>{fmtMoney(account.data?.auto_liability_amount)}</strong></div>
          <div><span>W-9</span><strong>{account.data?.w9_on_file ? 'On file' : 'Missing'}</strong></div>
          <div><span>Terms</span><strong>{account.data?.payment_terms ?? '—'}</strong></div>
        </div>
        <p className="clp-note">
          Insurance renewing? Send your updated COI before the expiry date to stay
          dispatchable — expired paperwork pauses new loads automatically.
        </p>
      </section>
    </main>
  )
}
