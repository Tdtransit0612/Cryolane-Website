import type { Metadata } from 'next'
import Link from 'next/link'
import { IconHeadset, IconTruck, IconBox } from '../../_ui/icons'
import { SpecBar } from '../../_ui/SpecBar'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact | Cryolane',
  description:
    'Reach Cryolane — quotes, carrier setup, and portal support for temperature-controlled freight.',
}

const packetMailto = `mailto:${site.carrierEmail}?subject=${encodeURIComponent('Carrier packet — Cryolane network')}`

export default function ContactPage() {
  return (
    <main>
      <div className="cl-page-head">
        <div className="cl-page-head-inner">
          <p className="cl-kicker">Contact</p>
          <h1>Talk to a person.</h1>
          <p className="cl-lede">
            Quotes, carrier setup, a load in motion, or portal access — here&apos;s where
            to reach us.
          </p>
        </div>
      </div>
      <SpecBar
        specs={[
          { k: 'Quotes', v: 'Same-day' },
          { k: 'Carrier setup', v: 'W-9 + COI + authority' },
          { k: 'Support', v: 'Portal login' },
          { k: 'After hours', v: 'Covered', live: true },
        ]}
      />

      <section className="cl-section">
        <div className="cl-section-inner">
          <h2 className="sr-only">How to reach us</h2>
          <div className="cl-cards">
            <div className="cl-card">
              <div className="cl-card-icon"><IconBox /></div>
              <h3>Shippers</h3>
              <p>New lanes, quotes, and active shipments.</p>
              <p style={{ marginTop: 12 }}>
                <a href={`mailto:${site.contactEmail}`} style={{ color: 'var(--ice-500)' }}>{site.contactEmail}</a>
              </p>
              <div style={{ marginTop: 18 }}>
                <Link href="/quote" className="cl-btn cl-btn-primary cl-btn-sm">Get a Quote</Link>
              </div>
            </div>
            <div className="cl-card">
              <div className="cl-card-icon"><IconTruck /></div>
              <h3>Carriers</h3>
              <p>Network setup, packets, and load questions.</p>
              <p style={{ marginTop: 12 }}>
                <a href={`mailto:${site.carrierEmail}`} style={{ color: 'var(--ice-500)' }}>{site.carrierEmail}</a>
              </p>
              <div style={{ marginTop: 18 }}>
                <a href={packetMailto} className="cl-btn cl-btn-ghost cl-btn-sm">Send Your Packet</a>
              </div>
            </div>
            <div className="cl-card">
              <div className="cl-card-icon"><IconHeadset /></div>
              <h3>Portal support</h3>
              <p>Login help for the shipper and carrier portals.</p>
              <p style={{ marginTop: 12 }}>
                <a href={`mailto:${site.contactEmail}`} style={{ color: 'var(--ice-500)' }}>{site.contactEmail}</a>
              </p>
              <div style={{ marginTop: 18 }}>
                <Link href="/portal/login" className="cl-btn cl-btn-ghost cl-btn-sm">Portal Login</Link>
              </div>
            </div>
          </div>
          {site.phone && (
            <p style={{ marginTop: 40, textAlign: 'center', color: 'var(--ice-300)' }}>
              Prefer the phone? <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} style={{ color: 'var(--ice-500)' }}>{site.phone}</a>
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
