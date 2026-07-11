/**
 * Next.js 16 `proxy` (the renamed `middleware`). Scoped to /portal/* only so
 * the marketing site and /api routes keep their static/dynamic behavior.
 */
import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: ['/portal/:path*'],
}
