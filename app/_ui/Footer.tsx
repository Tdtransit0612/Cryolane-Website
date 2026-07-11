import Link from 'next/link'
import { CryolaneMark } from './Logo'
import { site } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="cl-footer">
      <div className="cl-footer-inner">
        <div className="cl-footer-brand">
          <Link href="/" className="cl-lockup">
            <CryolaneMark size={28} id="clg-foot" />
            <span className="cl-lockup-name" style={{ fontSize: 16 }}>CRYOLANE</span>
          </Link>
          <p className="cl-footer-tagline">
            {site.tagline} Temperature-controlled freight brokerage for shippers who
            can&apos;t afford a warm trailer.
          </p>
        </div>
        <div className="cl-footer-cols">
          <div className="cl-footer-col">
            <h3>Company</h3>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="cl-footer-col">
            <h3>Shippers</h3>
            <Link href="/quote">Get a Quote</Link>
            <Link href="/shippers">Why Cryolane</Link>
            <Link href="/portal/login">Shipper Portal</Link>
          </div>
          <div className="cl-footer-col">
            <h3>Carriers</h3>
            <Link href="/carriers">Join the Network</Link>
            <Link href="/portal/login">Carrier Portal</Link>
          </div>
          <div className="cl-footer-col">
            <h3>Contact</h3>
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            {site.phone && <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>{site.phone}</a>}
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
  )
}
