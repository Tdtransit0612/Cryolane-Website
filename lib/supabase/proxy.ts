/**
 * Session refresh + edge gate for /portal/* — used by the root `proxy.ts`
 * (Next 16 renamed `middleware` → `proxy`).
 *
 * Refreshes the Supabase auth cookie on every portal request and bounces
 * unauthenticated hits to the login page. NOT the authorization boundary:
 * the role + linked-counterparty check lives in app/portal/(authed)/layout.tsx
 * and the portal_* views' scoping is the final backstop.
 */
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // Do NOT run code between createServerClient() and getUser(): getUser()
  // revalidates the token and triggers the setAll() cookie refresh. Wrap so a
  // transient Supabase outage can't 500 every /portal request.
  let user = null
  try {
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {
    user = null
  }

  const { pathname } = request.nextUrl
  const isLogin = pathname === '/portal/login'

  // Carry the refreshed Set-Cookie headers onto any redirect we return —
  // otherwise a rotated refresh token from getUser() is silently dropped and
  // the next request can fail auth.
  const redirectTo = (url: URL) => {
    const res = NextResponse.redirect(url)
    supabaseResponse.cookies.getAll().forEach((c) => res.cookies.set(c))
    return res
  }

  if (!isLogin && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/portal/login'
    if (pathname !== '/portal') url.searchParams.set('redirect', pathname)
    return redirectTo(url)
  }

  if (isLogin && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/portal'
    url.search = ''
    return redirectTo(url)
  }

  // Must return supabaseResponse unchanged (it carries the refreshed
  // Set-Cookie headers) or session refresh silently breaks.
  return supabaseResponse
}
