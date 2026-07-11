import type { Metadata } from 'next'
import Link from 'next/link'
import { IconShieldCheck, IconSnow, IconHeadset, IconBox } from '../../_ui/icons'
import { SpecBar } from '../../_ui/SpecBar'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'For Carriers | Cryolane',
  description:
    'Run reefer? Join the Cryolane network — complete load specs before you commit, no detention games, and a carrier portal with your loads and settlements.',
}

const REQUIREMENTS = [
  'Active FMCSA operating authority in good standing',
  'Cargo insurance including reefer breakdown coverage',
  'Auto liability meeting federal minimums',
  'Food-grade, washout-ready refrigerated equipment',
  'W-9 and signed carrier agreement',
]

const packetMailto = `mailto:${site.carrierEmail}?subject=${encodeURIComponent('Carrier packet — Cryolane network')}&body=${encodeURIComponent('Please attach your W-9, certificate of insurance (with reefer breakdown coverage), and authority letter.\n\nMC #:\nDOT #:\nTrucks / reefer trailers:\nHome base / preferred lanes:')}`

export default function CarriersPage() {
  return (
    <main>
      <div className="cl-page-head">
        <div className="cl-page-head-inner">
          <p className="cl-kicker">For Carriers</p>
          <h1>Run reefer? Run with us.</h1>
          <p className="cl-lede">
            We keep the network tight on purpose: complete load specs before you commit,
            straight talk on detention, and a portal where your loads and settlements
            are always visible.
          </p>
        </div>
      </div>
      <SpecBar
        specs={[
          { k: 'Network', v: 'Reefer-only' },
          { k: 'Detention', v: 'Paid, no games' },
          { k: 'Settlements', v: 'Portal-visible' },
          { k: 'Setup', v: 'W-9 + COI + authority' },
        ]}
      />

      <section className="cl-band">
        <h2 className="sr-only">Why carriers run with Cryolane</h2>
        <div className="cl-band-grid">
          <div className="cl-feature">
            <div className="cl-feature-icon"><IconBox /></div>
            <h3>Full specs up front</h3>
            <p>Set point, commodity, weight, appointments, and accessorials on the rate con — before you commit the truck.</p>
          </div>
          <div className="cl-feature">
            <div className="cl-feature-icon"><IconShieldCheck /></div>
            <h3>No detention games</h3>
            <p>Clear terms in the agreement, and a broker who actually fights for your detention instead of dodging calls.</p>
          </div>
          <div className="cl-feature">
            <div className="cl-feature-icon"><IconSnow /></div>
            <h3>Reefer freight, consistently</h3>
            <p>Cold chain is all we do — the freight fits your equipment, not the other way around.</p>
          </div>
          <div className="cl-feature">
            <div className="cl-feature-icon"><IconHeadset /></div>
            <h3>A dispatcher-friendly broker</h3>
            <p>One contact who knows the load. No offshore check-call mills, no rate-con roulette.</p>
          </div>
        </div>
      </section>

      <section className="cl-section">
        <div className="cl-section-inner">
          <div className="cl-split">
            <div className="cl-panel">
              <p className="cl-kicker">Requirements</p>
              <h3>What we need to set you up.</h3>
              <p>Send your packet and you&apos;re typically approved and rolling fast.</p>
              <ul>
                {REQUIREMENTS.map((r) => (
                  <li key={r}><IconShieldCheck size={16} /> {r}</li>
                ))}
              </ul>
              <div className="cl-panel-ctas">
                <a href={packetMailto} className="cl-btn cl-btn-primary">Send Your Packet</a>
              </div>
            </div>
            <div className="cl-panel">
              <p className="cl-kicker">Carrier Portal</p>
              <h3>Your loads and settlements, no phone tag.</h3>
              <p>
                Approved carriers get portal access: assigned loads with full specs,
                settlement status with amounts, and your compliance dates so nothing
                lapses by surprise.
              </p>
              <ul>
                <li><IconShieldCheck size={16} /> Assigned loads with pickup/delivery detail</li>
                <li><IconShieldCheck size={16} /> Settlement status — what&apos;s owed, what&apos;s paid</li>
                <li><IconShieldCheck size={16} /> Your insurance expiry on file, visible</li>
              </ul>
              <div className="cl-panel-ctas">
                <Link href="/portal/login" className="cl-btn cl-btn-ghost">Carrier Portal Login</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cl-cta-band">
        <h2>Get set up today.</h2>
        <p>W-9, COI with reefer breakdown, and your authority letter — that&apos;s the whole packet.</p>
        <a href={packetMailto} className="cl-btn cl-btn-primary">Join the Network</a>
      </section>
    </main>
  )
}
