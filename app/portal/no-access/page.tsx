import type { Metadata } from 'next'
import Link from 'next/link'
import { CryolaneMark } from '../../_ui/Logo'
import { logout } from '../auth-actions'
import { site } from '@/lib/site'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Account Not Linked | Cryolane',
  robots: { index: false },
}

export default function NoAccessPage() {
  return (
    <div className="cl-wrap clp-login-page">
      <div className="clp-login-card">
        <Link href="/" className="cl-lockup clp-login-lockup">
          <CryolaneMark size={40} id="clg-noaccess" />
          <span className="cl-lockup-name">CRYOLANE</span>
        </Link>
        <h1>Account not linked</h1>
        <p className="clp-login-sub">
          You&apos;re signed in, but this account isn&apos;t connected to a carrier or
          shipper yet. If you work with Cryolane and expected access, email{' '}
          <a href={`mailto:${site.contactEmail}`} style={{ color: 'var(--ice-500)' }}>
            {site.contactEmail}
          </a>{' '}
          and we&apos;ll link you up.
        </p>
        <p className="clp-login-sub">
          Cryolane staff: the TMS lives at{' '}
          <a href="https://cryolane.app" style={{ color: 'var(--ice-500)' }}>cryolane.app</a>.
        </p>
        <form action={logout}>
          <button type="submit" className="cl-btn cl-btn-ghost" style={{ width: '100%' }}>
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )
}
