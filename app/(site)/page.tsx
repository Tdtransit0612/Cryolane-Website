import Link from 'next/link'
import { CryolaneMark } from '../_ui/Logo'
import {
  IconThermometer,
  IconShieldCheck,
  IconRadar,
  IconHeadset,
  IconLeaf,
  IconSnow,
  IconMilk,
  IconBox,
  IconFlask,
  IconLayers,
} from '../_ui/icons'
import QuoteForm from '../_ui/QuoteForm'
import { SpecBar } from '../_ui/SpecBar'

const SERVICES = [
  {
    icon: <IconLeaf />,
    title: 'Fresh Produce',
    body: 'Field-to-DC programs with pulp-temp awareness, fast transit, and carriers who understand PACA-sensitive freight.',
    label: 'SET',
    temp: '34°F – 55°F',
  },
  {
    icon: <IconSnow />,
    title: 'Frozen & Deep Frozen',
    body: 'Ice cream, seafood, frozen bakery, and everything that lives below zero — continuous-run units, verified pre-cool.',
    label: 'SET',
    temp: '−20°F – 0°F',
  },
  {
    icon: <IconMilk />,
    title: 'Dairy & Protein',
    body: 'Milk, cheese, beef, poultry, and pork on sanitary, food-grade trailers with unbroken cold from dock to dock.',
    label: 'SET',
    temp: '28°F – 38°F',
  },
  {
    icon: <IconBox />,
    title: 'Food & Beverage',
    body: 'Temp-protected grocery and beverage, including keep-from-freezing programs through winter lanes.',
    label: 'SET',
    temp: '36°F – 70°F',
  },
  {
    icon: <IconFlask />,
    title: 'Specialty & High-Value',
    body: 'Floral, chocolate, nutraceuticals, and other unforgiving commodities that punish sloppy temperature control.',
    label: 'SPEC',
    temp: 'Product-specific',
  },
  {
    icon: <IconLayers />,
    title: 'Multi-Temp & Partials',
    body: 'Multi-compartment loads and consolidated reefer partials when a full trailer is more than you need.',
    label: 'ZONES',
    temp: 'Dual / tri-zone',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Carrier vetting',
    body: 'Active authority, safety record, cargo insurance with reefer breakdown coverage, and equipment checks before a carrier ever sees your freight.',
  },
  {
    n: '02',
    title: 'Pre-cool verification',
    body: 'The trailer is at set point before loading — not cooling down on your dock while the clock runs.',
  },
  {
    n: '03',
    title: 'Set point in writing',
    body: 'Temperature, run mode (continuous vs. cycle), and product specs written into every rate confirmation. No verbal-only instructions.',
  },
  {
    n: '04',
    title: 'In-transit monitoring',
    body: 'Tracking plus scheduled temp checks through transit — and escalation before an issue becomes a claim.',
  },
  {
    n: '05',
    title: 'Clean delivery',
    body: 'POD collected same day, reefer download available on request, and immediate communication if anything looked off.',
  },
]

export default function Home() {
  return (
    <main>
      {/* ─── Hero ─── */}
      <header className="cl-hero" id="top">
        <div className="cl-hero-fx" aria-hidden="true">
          <div className="cl-streak" /><div className="cl-streak" /><div className="cl-streak" />
          <div className="cl-streak" /><div className="cl-streak" /><div className="cl-streak" />
          <div className="cl-streak" /><div className="cl-streak" /><div className="cl-streak" />
          <div className="cl-streak" /><div className="cl-streak" /><div className="cl-streak" />
          <div className="cl-glow" />
        </div>
        <div className="cl-hero-content">
          <div className="cl-hero-mark">
            <CryolaneMark size={92} id="clg-hero" />
          </div>
          <p className="cl-eyebrow">Temperature-Controlled Freight Brokerage</p>
          <h1 className="cl-h1">
            Cold Chain. <span className="cl-h1-grad">Controlled.</span>
          </h1>
          <p className="cl-sub">
            Cryolane moves refrigerated and frozen freight with the discipline your product
            demands — vetted reefer carriers, verified set points, and eyes on every load
            from pre-cool to proof of delivery.
          </p>
          <div className="cl-cta-row">
            <Link href="/quote" className="cl-btn cl-btn-primary">Get a Quote</Link>
            <Link href="/carriers" className="cl-btn cl-btn-ghost">Join the Carrier Network</Link>
          </div>
        </div>
      </header>
      <SpecBar
        specs={[
          { k: 'Network', v: 'Reefer-first' },
          { k: 'Range', v: '−20°F → 70°F' },
          { k: 'Visibility', v: '24/7 tracking', live: true },
          { k: 'Coverage', v: '48 states' },
        ]}
      />

      {/* ─── Capability band ─── */}
      <section className="cl-band">
        <h2 className="sr-only">Why Cryolane</h2>
        <div className="cl-band-grid">
          <div className="cl-feature">
            <div className="cl-feature-icon"><IconThermometer /></div>
            <h3>Continuous cold</h3>
            <p>Set point on every rate con — confirmed at pickup, held through transit, documented at delivery.</p>
          </div>
          <div className="cl-feature">
            <div className="cl-feature-icon"><IconShieldCheck /></div>
            <h3>Vetted reefer carriers</h3>
            <p>Authority, safety scores, reefer breakdown coverage, and sanitary equipment — checked before dispatch.</p>
          </div>
          <div className="cl-feature">
            <div className="cl-feature-icon"><IconRadar /></div>
            <h3>24/7 visibility</h3>
            <p>Live tracking and scheduled check calls, so you hear about problems from us — before they cost you.</p>
          </div>
          <div className="cl-feature">
            <div className="cl-feature-icon"><IconHeadset /></div>
            <h3>One point of contact</h3>
            <p>A broker who answers the phone, owns the load, and doesn&apos;t disappear after the rate con is signed.</p>
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section className="cl-section" id="services">
        <div className="cl-section-inner">
          <div className="cl-section-head">
            <p className="cl-kicker">What we move</p>
            <h2 className="cl-h2">Built for freight that can&apos;t wait — or warm up.</h2>
            <p className="cl-lede">
              Every commodity has a temperature story. We spec the equipment, the set point,
              and the run mode to match yours.
            </p>
          </div>
          <div className="cl-cards">
            {SERVICES.map((s) => (
              <div className="cl-card" key={s.title}>
                <div className="cl-card-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <span className="cl-card-temp" data-label={s.label}>{s.temp}</span>
              </div>
            ))}
          </div>
          <div className="cl-section-cta">
            <Link href="/services" className="cl-btn cl-btn-ghost">Explore our services</Link>
          </div>
        </div>
      </section>

      {/* ─── The Cryolane Standard ─── */}
      <section className="cl-section cl-section-alt" id="standard">
        <div className="cl-section-inner">
          <div className="cl-section-head">
            <p className="cl-kicker">The Cryolane Standard</p>
            <h2 className="cl-h2">Five checkpoints. Zero surprises.</h2>
            <p className="cl-lede">
              Cold chain failures don&apos;t announce themselves — they show up as rejected loads
              and claims. Our process is built to catch them before they happen.
            </p>
          </div>
          <div className="cl-steps">
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

      {/* ─── Shippers / Carriers ─── */}
      <section className="cl-section" id="shippers">
        <div className="cl-section-inner">
          <div className="cl-split">
            <div className="cl-panel">
              <p className="cl-kicker">For Shippers</p>
              <h3>Your product, protected end to end.</h3>
              <p>
                Whether it&apos;s a weekly produce program or a one-off frozen truckload,
                you get a spec&apos;d load, a vetted carrier, and a broker who stays on it.
                Track every shipment and invoice in the shipper portal.
              </p>
              <ul>
                <li><IconShieldCheck size={16} /> Rates built for your lanes — spot or contract</li>
                <li><IconShieldCheck size={16} /> Set point, run mode, and specs on every rate con</li>
                <li><IconShieldCheck size={16} /> Live tracking + a portal with your full history</li>
                <li><IconShieldCheck size={16} /> Straight answers when something changes</li>
              </ul>
              <div className="cl-panel-ctas">
                <Link href="/quote" className="cl-btn cl-btn-primary">Request a Quote</Link>
                <Link href="/shippers" className="cl-btn cl-btn-ghost">Learn more</Link>
              </div>
            </div>
            <div className="cl-panel" id="carriers">
              <p className="cl-kicker">For Carriers</p>
              <h3>Run reefer? Run with us.</h3>
              <p>
                We keep our carrier network tight on purpose. Clear set points, accurate
                load info, and a portal where you see your loads, settlements, and
                compliance status — no phone tag.
              </p>
              <ul>
                <li><IconShieldCheck size={16} /> Complete load specs before you commit</li>
                <li><IconShieldCheck size={16} /> No games on detention and layover</li>
                <li><IconShieldCheck size={16} /> Settlement visibility in the carrier portal</li>
                <li><IconShieldCheck size={16} /> Fast setup — send your packet, get rolling</li>
              </ul>
              <div className="cl-panel-ctas">
                <Link href="/carriers" className="cl-btn cl-btn-ghost">Join the Network</Link>
                <Link href="/portal/login" className="cl-btn cl-btn-ghost">Carrier Portal</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quote ─── */}
      <section className="cl-section cl-section-alt" id="quote">
        <div className="cl-section-inner">
          <div className="cl-section-head cl-center">
            <p className="cl-kicker">Get a Quote</p>
            <h2 className="cl-h2">Tell us about the load.</h2>
            <p className="cl-lede">
              Lane, product, and temp — that&apos;s all we need to get started. A real person
              reads every request and comes back with a rate and capacity.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </main>
  )
}
