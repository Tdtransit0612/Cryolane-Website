'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const redirectTo = String(formData.get('redirect') ?? '/portal')

  // Open-redirect guard: only in-portal destinations.
  const dest = redirectTo.startsWith('/portal') ? redirectTo : '/portal'

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  // Generic error param — never leak whether the email exists. Keep the intended
  // destination so a correct retry still lands there.
  if (error) {
    const back = dest !== '/portal' ? `&redirect=${encodeURIComponent(dest)}` : ''
    redirect(`/portal/login?error=1${back}`)
  }

  redirect(dest)
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/portal/login')
}
