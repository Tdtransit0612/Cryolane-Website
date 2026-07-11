import type { Metadata } from 'next'
import Link from 'next/link'
import { IconThermometer, IconShieldCheck, IconHeadset } from '../../_ui/icons'

export const metadata: Metadata = {
  title: 'About | Cryolane',
  description:
    'Cryolane is an operator-built, reefer-only freight brokerage. Cold chain discipline isn’t a feature — it’s the whole company.',
}

export default function AboutPage() {
  return (
    <main>
      <div className="cl-page-head">
        <div className="cl-page-head-inner">
          <p className="cl-kicker">About Cryolane</p>
          <h1>Built by operators. Run like it.</h1>
          <p className="cl-lede">
            Cryolane was started by people who run trucks for a living — who&apos;ve sat on
            docks at 3 a.m., argued reefer downloads with receivers, and learned exactly
            where cold chains break.
          </p>
        </div>
      </div>

      <section className="cl-section">
        <div className="cl-section-inner">
          <div className="cl-section-head">
            <p className="cl-kicker">Why reefer-only</p>
            <h2 className="cl-h2">Focus is the product.</h2>
            <p className="cl-lede">
              Most brokerages treat refrigerated freight as dry van with a thermostat.
              We built Cryolane on the opposite premise: temperature-controlled freight
              is a different discipline, with its own equipment standards, its own
              failure modes, and its own paperwork. So that&apos;s all we do. Every
              dispatcher conversation, every carrier we vet, every rate confirmation we
              write is about protecting product that can&apos;t survive a mistake.
            </p>
          </div>
          <div className="cl-band-grid" style={{ padding: 0 }}>
            <div className="cl-feature">
              <div className="cl-feature-icon"><IconThermometer /></div>
              <h3>Discipline over promises</h3>
              <p>We&apos;d rather turn down a load than cover it with equipment we don&apos;t trust.</p>
            </div>
            <div className="cl-feature">
              <div className="cl-feature-icon"><IconShieldCheck /></div>
              <h3>Paper trails, not phone trails</h3>
              <p>Set points, run modes, and specs in writing — so nobody&apos;s memory decides a claim.</p>
            </div>
            <div className="cl-feature">
              <div className="cl-feature-icon"><IconHeadset /></div>
              <h3>Small by design</h3>
              <p>You talk to the person who owns your freight, every time. That&apos;s not a growth-stage casualty — it&apos;s the model.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cl-section cl-section-alt">
        <div className="cl-section-inner">
          <div className="cl-section-head cl-center">
            <p className="cl-kicker">The tools</p>
            <h2 className="cl-h2">Modern systems, human judgment.</h2>
            <p className="cl-lede">
              Cryolane runs on its own transportation management system — live tracking
              links on every load, carrier compliance monitoring with automatic expiry
              alerts, and shipper &amp; carrier portals that show you your freight without
              a phone call. The technology handles the vigilance; people make the calls.
            </p>
          </div>
        </div>
      </section>

      <section className="cl-cta-band">
        <h2>Put a load on us.</h2>
        <p>The fastest way to know if we&apos;re different is to give us one lane.</p>
        <Link href="/quote" className="cl-btn cl-btn-primary">Get a Quote</Link>
      </section>
    </main>
  )
}
