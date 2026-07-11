import { redirect } from 'next/navigation'
import { getPortalProfile } from '@/lib/portal/data'

export const dynamic = 'force-dynamic'

/** Role router: /portal → the right area. The layout has already verified auth. */
export default async function PortalIndex() {
  const profile = await getPortalProfile()
  const role = profile.data?.role
  if (role === 'carrier') redirect('/portal/carrier')
  if (role === 'shipper') redirect('/portal/shipper')
  redirect('/portal/no-access')
}
