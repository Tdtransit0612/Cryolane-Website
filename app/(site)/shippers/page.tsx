import type { Metadata } from 'next'
import Link from 'next/link'
import { IconShieldCheck, IconRadar, IconThermometer, IconHeadset } from '../../_ui/icons'
import { SpecBar } from '../../_ui/SpecBar'
import QuoteForm from '../../_ui/QuoteForm'

export const metadata: Metadata = {
  title: 'For Shippers | Cryolane',
  description:
    'Spec’d loads, vetted reefer carriers, live tracking, and a shipper portal with your full shipment and invoice history. Cold chain, controlled end to end.',
}

const STEPS = [
  {
    n: '01',
    title: 'Send the lane',
    body: 'Origin, destination, product, temp, and timing — by form, email, or phone. You get a real answer, not an auto-rate.',
  },
  {
    n: '02',
    title: 'We spec and cover it',
    body: 'Equipment, set point, and run mode are matched to your product and written into the carrier rate confirmation.',
  },
  {
    n: '03',
    title: 'Watch it move',
    body: 'Live tracking link for every load, temp checks through transit, and proactive calls if anything drifts.',
  },
  {
    n: '04',
    title: 'Clean paperwork',
    body: 'POD same day, invoices that match the quote, and your history available anytime in the shipper portal.',
  },
]

export default function ShippersPage() {
  return (
    <main>
      <div className="cl-page-head">
        <div className="cl-page-head-inner">
          <p className="cl-kicker">For Shippers</p>
          <h1>Your product, protected end to end.</h1>
          <p className="cl-lede">
            Weekly produce program or one-off frozen truckload — you get a spec&apos;d load,
            a vetted reefer carrier, and a broker who stays on it until the POD is in your inbox.
          </p>
        </div>
      </div>
      <SpecBar
        specs={[
          { k: 'Set point', v: 'On every rate con' },
          { k: 'Visibility', v: 'Live tracking', live: true },
          { k: 'Portal', v: 'Shipments + invoices' },
          { k: 'Contact', v: 'One dispatcher' },
        ]}
      />

      <section className="cl-band">
        <h2 className="sr-only">What you get</h2>
        <div className="cl-band-grid">
          <div className="cl-feature">
            <div className="cl-feature-icon"><IconThermometer /></div>
            <h3>Set point in writing</h3>
            <p>Temperature, run mode, and product spec on every rate con — the paper trail that prevents claims.</p>
          </div>
          <div className="cl-feature">
            <div className="cl-feature-icon"><IconShieldCheck /></div>
            <h3>Vetted capacity</h3>
            <p>Authority, safety record, reefer breakdown coverage, and equipment checks on every carrier we use.</p>
          </div>
          <div className="cl-feature">
            <div className="cl-feature-icon"><IconRadar /></div>
            <h3>Tracking on every load</h3>
            <p>A live tracking link per shipment — share it with your receiver instead of fielding &quot;where&apos;s my truck&quot; calls.</p>
          </div>
          <div className="cl-feature">
            <div className="cl-feature-icon"><IconHeadset /></div>
            <h3>One number to call</h3>
            <p>The person who quoted your load is the person watching it. Nights and weekends included.</p>
          </div>
        </div>
      </section>

      <section className="cl-section" id="how-it-works">
        <div className="cl-section-inner">
          <div className="cl-section-head">
            <p className="cl-kicker">How it works</p>
            <h2 className="cl-h2">From quote to POD, without the chase.</h2>
          </div>
          <div className="cl-steps cl-steps-4">
            {STEPS.map((s) => (
              <div className="cl-step" key={s.n}>
                <span className="cl-step-num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cl-section cl-section-alt" id="portal">
        <div className="cl-section-inner">
          <div className="cl-split">
            <div className="cl-panel">
              <p className="cl-kicker">Shipper Portal</p>
              <h3>Your freight, on one screen.</h3>
              <p>
                Every Cryolane customer gets portal access — shipments with live status and
                tracking links, plus your invoice history, in one place.
              </p>
              <ul>
                <li><IconShieldCheck size={16} /> Current and past shipments with status</li>
                <li><IconShieldCheck size={16} /> Tracking links you can forward to receivers</li>
                <li><IconShieldCheck size={16} /> Invoices with amounts and due dates</li>
                <li><IconShieldCheck size={16} /> No software to buy — it&apos;s included</li>
              </ul>
              <div className="cl-panel-ctas">
                <Link href="/portal/login" className="cl-btn cl-btn-primary">Portal Login</Link>
              </div>
            </div>
            <div className="cl-panel">
              <p className="cl-kicker">FAQ</p>
              <h3>Common questions.</h3>
              <div className="cl-faq" style={{ maxWidth: 'none' }}>
                <details>
                  <summary>Do you handle contract lanes or just spot?</summary>
                  <p>Both. Spot moves are how most shippers try us; contract lanes are where we earn our keep. Bring us a lane you&apos;re tired of babysitting.</p>
                </details>
                <details>
                  <summary>What happens if a reefer unit fails in transit?</summary>
                  <p>Every carrier we dispatch carries cargo insurance with reefer breakdown coverage, and our monitoring is designed to catch problems while there&apos;s still time to act — rescue power, cross-dock, or re-cover.</p>
                </details>
                <details>
                  <summary>How do I get portal access?</summary>
                  <p>Move a load with us and we&apos;ll set up your login. Your shipment and invoice history is there from day one.</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cl-section" id="quote">
        <div className="cl-section-inner">
          <div className="cl-section-head cl-center">
            <p className="cl-kicker">Get a Quote</p>
            <h2 className="cl-h2">Tell us about the load.</h2>
          </div>
          <QuoteForm />
        </div>
      </section>
    </main>
  )
}
