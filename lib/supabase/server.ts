/**
 * Server-side Supabase client (Server Components, Server Actions, Route
 * Handlers). Anon key + SSR cookies — the portal never touches the service
 * role; scoping is done by the portal_* SECURITY DEFINER views in the TMS
 * Supabase project.
 */
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Server Component render — proxy.ts writes the refreshed cookies.
          }
        },
      },
    },
  )
}
