import type { Metadata } from 'next'
import Link from 'next/link'
import {
  IconLeaf,
  IconSnow,
  IconMilk,
  IconBox,
  IconFlask,
  IconLayers,
  IconThermometer,
  IconRadar,
  IconTruck,
} from '../../_ui/icons'

export const metadata: Metadata = {
  title: 'Services | Cryolane',
  description:
    'Refrigerated truckload, frozen and deep-frozen, multi-temp, and reefer LTL/partials — equipment, set point, and run mode spec’d to your commodity.',
}

const SERVICES = [
  {
    icon: <IconLeaf />,
    title: 'Fresh Produce',
    temp: '34°F – 55°F',
    body: 'Field-to-DC and DC-to-retail programs where hours matter. We spec carriers who understand pulp temps, airflow, and produce seasonality — and we build schedules around protect-from-freeze windows and appointment realities, not wishful transit math.',
    points: ['Pulp-temp awareness at pickup', 'Season-ready capacity planning', 'PACA-conscious handling'],
  },
  {
    icon: <IconSnow />,
    title: 'Frozen & Deep Frozen',
    temp: '−20°F – 0°F',
    body: 'Ice cream, seafood, frozen bakery, and prepared foods have no tolerance for cycling units or soft pre-cools. Frozen loads run on continuous mode with the pre-cool verified before the first pallet moves.',
    points: ['Continuous-run units required', 'Pre-cool verified before loading', 'Reefer download on request'],
  },
  {
    icon: <IconMilk />,
    title: 'Dairy & Protein',
    temp: '28°F – 38°F',
    body: 'Milk, cheese, beef, poultry, and pork demand sanitary, food-grade trailers and an unbroken cold chain. We hold carriers to washout and prior-load standards and keep the set point documented dock to dock.',
    points: ['Food-grade, washout-verified trailers', 'Prior-load checks', 'Tight delivery-appointment discipline'],
  },
  {
    icon: <IconBox />,
    title: 'Food & Beverage',
    temp: '36°F – 70°F',
    body: 'Beverage, grocery, chocolate, and shelf-stable product that still needs protection — from summer heat or winter freeze. Keep-from-freezing programs through northern lanes are a specialty.',
    points: ['Protect-from-freeze programs', 'Heat-protected summer moves', 'Retail routing-guide compliance'],
  },
  {
    icon: <IconFlask />,
    title: 'Specialty & High-Value',
    temp: 'Product-specific',
    body: 'Floral, nutraceuticals, cosmetics, and other unforgiving commodities that punish sloppy temperature control. We write the product spec into the rate con and match equipment accordingly.',
    points: ['Product spec on the rate con', 'High-value carrier vetting', 'Discreet, direct service'],
  },
  {
    icon: <IconLayers />,
    title: 'Multi-Temp & Partials',
    temp: 'Dual / tri-zone',
    body: 'Multi-compartment trailers for mixed-temp loads, and consolidated reefer partials when a full trailer is more than you need. Compartment set points spec’d per zone, in writing.',
    points: ['Dual and tri-zone equipment', 'Consolidated reefer LTL/partials', 'Per-zone set points documented'],
  },
]

export default function ServicesPage() {
  return (
    <main>
      <div className="cl-page-head">
        <div className="cl-page-head-inner">
          <p className="cl-kicker">Services</p>
          <h1>Every commodity has a temperature story.</h1>
          <p className="cl-lede">
            We spec the equipment, the set point, and the run mode to match yours —
            then put it in writing on every rate confirmation.
          </p>
        </div>
      </div>

      <section className="cl-section">
        <div className="cl-section-inner">
          <h2 className="sr-only">Commodities we handle</h2>
          <div className="cl-cards">
            {SERVICES.map((s) => (
              <div className="cl-card" key={s.title}>
                <div className="cl-card-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul className="cl-card-points">
                  {s.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <span className="cl-card-temp">{s.temp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cl-section cl-section-alt">
        <div className="cl-section-inner">
          <div className="cl-section-head cl-center">
            <p className="cl-kicker">Equipment & Modes</p>
            <h2 className="cl-h2">Continuous vs. cycle — it&apos;s on the rate con.</h2>
            <p className="cl-lede">
              The single most common cold-chain failure is a unit set to cycle when the
              product needed continuous air. We don&apos;t leave it to a phone call.
            </p>
          </div>
          <div className="cl-band-grid" style={{ padding: 0 }}>
            <div className="cl-feature">
              <div className="cl-feature-icon"><IconTruck /></div>
              <h3>Reefer FTL</h3>
              <p>53&apos; food-grade reefers, verified pre-cool, set point and mode written into the carrier agreement.</p>
            </div>
            <div className="cl-feature">
              <div className="cl-feature-icon"><IconLayers /></div>
              <h3>Reefer LTL / Partial</h3>
              <p>Consolidated cold freight with compatible commodities only — no produce riding with raw protein.</p>
            </div>
            <div className="cl-feature">
              <div className="cl-feature-icon"><IconThermometer /></div>
              <h3>Continuous run</h3>
              <p>For frozen, protein, dairy, and anything sensitive to air-temp swings. The default unless your spec says otherwise.</p>
            </div>
            <div className="cl-feature">
              <div className="cl-feature-icon"><IconRadar /></div>
              <h3>Monitored transit</h3>
              <p>Tracking plus scheduled temp checks; escalation to you before an exception becomes a claim.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cl-cta-band">
        <h2>Have a lane in mind?</h2>
        <p>Send the lane, product, and temp — we&apos;ll come back with a rate and capacity.</p>
        <Link href="/quote" className="cl-btn cl-btn-primary">Get a Quote</Link>
      </section>
    </main>
  )
}
