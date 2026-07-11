import type { Metadata } from 'next'
import Link from 'next/link'
import { CryolaneMark } from '../../_ui/Logo'
import { login } from '../auth-actions'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Portal Login | Cryolane',
  description: 'Sign in to the Cryolane carrier and shipper portal.',
  robots: { index: false },
}

export default async function PortalLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; redirect?: string }>
}) {
  const params = await searchParams
  const hasError = params.error === '1'
  const redirectTo = params.redirect ?? '/portal'

  return (
    <div className="cl-wrap clp-login-page">
      <div className="clp-login-card">
        <Link href="/" className="cl-lockup clp-login-lockup">
          <CryolaneMark size={40} id="clg-login" />
          <span className="cl-lockup-name">CRYOLANE</span>
        </Link>
        <h1>Portal login</h1>
        <p className="clp-login-sub">
          Shipments, settlements, and invoices — for Cryolane shippers and carriers.
        </p>
        {hasError && (
          <div className="cl-form-error" role="alert">
            Sign-in failed. Check your email and password and try again.
          </div>
        )}
        <form action={login} className="clp-login-form">
          <input type="hidden" name="redirect" value={redirectTo} />
          <div className="cl-field">
            <label htmlFor="p-email">Email</label>
            <input id="p-email" name="email" type="email" className="cl-input" autoComplete="email" required />
          </div>
          <div className="cl-field">
            <label htmlFor="p-password">Password</label>
            <input id="p-password" name="password" type="password" className="cl-input" autoComplete="current-password" required />
          </div>
          <button type="submit" className="cl-btn cl-btn-primary" style={{ width: '100%' }}>
            Sign In
          </button>
        </form>
        <p className="clp-login-help">
          No login yet? Portal access comes with moving freight with us —{' '}
          <Link href="/contact">get in touch</Link>.
        </p>
      </div>
    </div>
  )
}
