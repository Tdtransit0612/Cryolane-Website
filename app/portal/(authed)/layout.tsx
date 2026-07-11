import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getPortalProfile } from '@/lib/portal/data'
import { CryolaneMark } from '../../_ui/Logo'
import { logout } from '../auth-actions'

// Authed pages must never be statically cached.
export const dynamic = 'force-dynamic'

export default async function AuthedPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal/login')

  const profile = await getPortalProfile()
  const role = profile.data?.role
  // Fail closed: anything that isn't a linked portal role gets the
  // account-not-linked page (staff are pointed at the TMS there).
  const isCarrier = role === 'carrier' && !!profile.data?.carrier_id
  const isShipper = role === 'shipper' && !!profile.data?.customer_id
  if (!isCarrier && !isShipper) redirect('/portal/no-access')

  return (
    <div className="cl-wrap clp-shell">
      <header className="clp-topbar">
        <Link href="/portal" className="cl-lockup">
          <CryolaneMark size={26} id="clg-portal" />
          <span className="cl-lockup-name" style={{ fontSize: 15 }}>CRYOLANE</span>
          <span className="clp-topbar-tag">{isCarrier ? 'Carrier Portal' : 'Shipper Portal'}</span>
        </Link>
        <div className="clp-topbar-right">
          <span className="clp-topbar-user">{profile.data?.email}</span>
          <form action={logout}>
            <button type="submit" className="cl-btn cl-btn-ghost cl-btn-sm">Sign Out</button>
          </form>
        </div>
      </header>
      <div className="clp-main">{children}</div>
      <footer className="clp-foot">
        <span>© {new Date().getFullYear()} Cryolane</span>
        <Link href="/">cryolane.com</Link>
      </footer>
    </div>
  )
}
