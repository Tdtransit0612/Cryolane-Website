import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import {
  getPortalProfile,
  getShipperAccount,
  getShipperLoads,
  getShipperInvoices,
} from '@/lib/portal/data'
import { NotProvisioned, EmptyState, StatusBadge, fmtMoney, fmtDate } from '../../_ui/bits'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Shipper Portal | Cryolane',
  robots: { index: false },
}

const TRACK_BASE = process.env.NEXT_PUBLIC_TRACK_BASE_URL ?? 'https://cryolane.app/track'

export default async function ShipperPortalPage() {
  const profile = await getPortalProfile()
  if (profile.data?.role !== 'shipper') redirect('/portal')

  const [account, loads, invoices] = await Promise.all([
    getShipperAccount(),
    getShipperLoads(),
    getShipperInvoices(),
  ])

  const anyUnready = !account.ready || !loads.ready || !invoices.ready
  const moving = loads.data.filter((l) => ['booked', 'scheduled', 'in_transit'].includes(l.status))
  const openAR = invoices.data
    .filter((i) => i.status !== 'paid')
    .reduce((sum, i) => sum + (i.amount ?? 0) - (i.amount_paid ?? 0), 0)

  return (
    <main>
      <div className="clp-page-head">
        <h1>{account.data?.name ?? 'Shipper dashboard'}</h1>
        <p>Your shipments, tracking links, and invoices with Cryolane.</p>
      </div>

      {anyUnready && <NotProvisioned error={account.error ?? loads.error ?? invoices.error} />}

      <div className="clp-tiles">
        <div className="clp-tile">
          <span className="clp-tile-label">Shipments in motion</span>
          <span className="clp-tile-value">{moving.length}</span>
        </div>
        <div className="clp-tile">
          <span className="clp-tile-label">Open balance</span>
          <span className="clp-tile-value">{fmtMoney(openAR)}</span>
        </div>
        <div className="clp-tile">
          <span className="clp-tile-label">Terms</span>
          <span className="clp-tile-value">{account.data?.payment_terms ?? '—'}</span>
        </div>
      </div>

      <section className="clp-section">
        <h2>Shipments</h2>
        {!loads.ready ? null : loads.data.length === 0 ? (
          <EmptyState label="No shipments yet — your first load will show up here." />
        ) : (
          <div className="clp-table-wrap">
            <table className="clp-table">
              <thead>
                <tr>
                  <th>Load</th><th>Status</th><th>Pickup</th><th>Delivery</th>
                  <th>Commodity</th><th>Temp</th><th className="clp-num">Rate</th><th>Tracking</th>
                </tr>
              </thead>
              <tbody>
                {loads.data.map((l) => (
                  <tr key={l.id}>
                    <td className="clp-mono">
                      {l.load_number}
                      {l.po_number && <span className="clp-sub">PO {l.po_number}</span>}
                    </td>
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
                    <td className="clp-num">{fmtMoney(l.total_rate)}</td>
                    <td>
                      {l.tracking_token ? (
                        <a
                          className="clp-track-link"
                          href={`${TRACK_BASE}/${l.tracking_token}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Track ↗
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="clp-section">
        <h2>Invoices</h2>
        {!invoices.ready ? null : invoices.data.length === 0 ? (
          <EmptyState label="No invoices yet." />
        ) : (
          <div className="clp-table-wrap">
            <table className="clp-table">
              <thead>
                <tr>
                  <th>Invoice</th><th>Status</th><th className="clp-num">Amount</th>
                  <th className="clp-num">Paid</th><th>Sent</th><th>Due</th>
                </tr>
              </thead>
              <tbody>
                {invoices.data.map((i) => (
                  <tr key={i.id}>
                    <td className="clp-mono">{i.invoice_number}</td>
                    <td><StatusBadge value={i.status} /></td>
                    <td className="clp-num">{fmtMoney(i.amount)}</td>
                    <td className="clp-num">{fmtMoney(i.amount_paid)}</td>
                    <td>{fmtDate(i.sent_date)}</td>
                    <td>{fmtDate(i.due_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}
