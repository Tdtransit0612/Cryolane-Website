import { CryolaneMark } from './_ui/Logo'
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
  IconCheck,
} from './_ui/icons'
import QuoteForm from './QuoteForm'
import { site } from '@/lib/site'

const SERVICES = [
  {
    icon: <IconLeaf />,
    title: 'Fresh Produce',
    body: 'Field-to-DC programs with pulp-temp awareness, fast transit, and carriers who understand PACA-sensitive freight.',
    temp: '34°F – 55°F',
  },
  {
    icon: <IconSnow />,
    title: 'Frozen & Deep Frozen',
    body: 'Ice cream, seafood, frozen bakery, and everything that lives below zero — continuous-run units, verified pre-cool.',
    temp: '−20°F – 0°F',
  },
  {
    icon: <IconMilk />,
    title: 'Dairy & Protein',
    body: 'Milk, cheese, beef, poultry, and pork on sanitary, food-grade trailers with unbroken cold from dock to dock.',
    temp: '28°F – 38°F',
  },
  {
    icon: <IconBox />,
    title: 'Food & Beverage',
    body: 'Temp-protected grocery and beverage, including keep-from-freezing programs through winter lanes.',
    temp: '36°F – 70°F',
  },
  {
    icon: <IconFlask />,
    title: 'Specialty & High-Value',
    body: 'Floral, chocolate, nutraceuticals, and other unforgiving commodities that punish sloppy temperature control.',
    temp: 'Product-specific',
  },
  {
    icon: <IconLayers />,
    title: 'Multi-Temp & Partials',
    body: 'Multi-compartment loads and consolidated reefer partials when a full trailer is more than you need.',
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
    <div className="cl-wrap">
      {/* ─── Nav ─── */}
      <nav className="cl-nav">
        <div className="cl-nav-inner">
          <a href="#top" className="cl-lockup">
            <CryolaneMark size={30} id="clg-nav" />
            <span className="cl-lockup-name">CRYOLANE</span>
          </a>
          <div className="cl-nav-links">
            <a href="#services">Services</a>
            <a href="#standard">The Standard</a>
            <a href="#shippers">Shippers</a>
            <a href="#carriers">Carriers</a>
            <a href="#quote" className="cl-btn cl-btn-primary cl-btn-sm">Get a Quote</a>
          </div>
        </div>
      </nav>

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
            <a href="#quote" className="cl-btn cl-btn-primary">Get a Quote</a>
            <a href="#carriers" className="cl-btn cl-btn-ghost">Join the Carrier Network</a>
          </div>
          <div className="cl-chip-row">
            <span className="cl-chip"><IconSnow size={15} /> Reefer-first network</span>
            <span className="cl-chip"><IconRadar size={15} /> 24/7 load visibility</span>
            <span className="cl-chip"><IconThermometer size={15} /> −20°F to 70°F protected</span>
          </div>
        </div>
      </header>

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
                <span className="cl-card-temp">{s.temp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The Cryolane Standard ─── */}
      <section className="cl-section cl-section-alt" id="standard">
        <div className="cl-section-inner">
          <div className="cl-section-head cl-center">
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
              </p>
              <ul>
                <li><IconCheck /> Rates built for your lanes — spot or contract</li>
                <li><IconCheck /> Set point, run mode, and specs on every rate con</li>
                <li><IconCheck /> Tracking updates without having to ask</li>
                <li><IconCheck /> Straight answers when something changes</li>
              </ul>
              <a href="#quote" className="cl-btn cl-btn-primary">Request a Quote</a>
            </div>
            <div className="cl-panel" id="carriers">
              <p className="cl-kicker">For Carriers</p>
              <h3>Run reefer? Run with us.</h3>
              <p>
                We keep our carrier network tight on purpose. Clear set points, accurate
                load info, and a broker who respects your clock and your equipment.
              </p>
              <ul>
                <li><IconCheck /> Complete load specs before you commit</li>
                <li><IconCheck /> No games on detention and layover</li>
                <li><IconCheck /> Consistent reefer freight, not one-and-done loads</li>
                <li><IconCheck /> Fast setup — send your packet, get rolling</li>
              </ul>
              <a
                href={`mailto:${site.carrierEmail}?subject=${encodeURIComponent('Carrier packet — Cryolane network')}&body=${encodeURIComponent('Please attach your W-9, certificate of insurance (with reefer breakdown coverage), and authority letter.\n\nMC #:\nDOT #:\nTrucks / reefer trailers:\nHome base / preferred lanes:')}`}
                className="cl-btn cl-btn-ghost"
              >
                Join the Network
              </a>
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

      {/* ─── Footer ─── */}
      <footer className="cl-footer">
        <div className="cl-footer-inner">
          <div className="cl-footer-brand">
            <a href="#top" className="cl-lockup">
              <CryolaneMark size={28} id="clg-foot" />
              <span className="cl-lockup-name" style={{ fontSize: 16 }}>CRYOLANE</span>
            </a>
            <p className="cl-footer-tagline">
              {site.tagline} Temperature-controlled freight brokerage for shippers who
              can&apos;t afford a warm trailer.
            </p>
          </div>
          <div className="cl-footer-cols">
            <div className="cl-footer-col">
              <h3>Company</h3>
              <a href="#services">Services</a>
              <a href="#standard">The Cryolane Standard</a>
              <a href="#shippers">For Shippers</a>
              <a href="#carriers">For Carriers</a>
            </div>
            <div className="cl-footer-col">
              <h3>Contact</h3>
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              {site.phone && <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>{site.phone}</a>}
              <a href="#quote">Request a quote</a>
            </div>
          </div>
        </div>
        <div className="cl-footer-base">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>
            {site.mcNumber
              ? `MC ${site.mcNumber} · ${site.usdotNumber ? `USDOT ${site.usdotNumber} · ` : ''}Licensed & bonded property broker`
              : 'FMCSA broker authority registration in process'}
          </span>
        </div>
      </footer>
    </div>
  )
}
