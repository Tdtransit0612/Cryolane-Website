/**
 * POST /api/carrier-apply
 *
 * Public "join the network" carrier application from cryolane.com/carriers/apply.
 * Inserts into the Cryolane TMS `carrier_applications` table via the service-role
 * key (server-side only). Staff review + approve it in the TMS, which creates a
 * vetted `carriers` record — the ops table is never written to from the public web.
 *
 * Required env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 * Optional:
 *   CARRIER_APPLY_NOTIFY_EMAIL + RESEND_API_KEY + QUOTE_FROM_EMAIL — email a
 *   heads-up to staff on each submission (best-effort; failure never blocks).
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const str = (v: unknown, max = 500): string =>
  typeof v === 'string' ? v.replace(/[\r\n\t]+/g, ' ').trim().slice(0, max) : ''
const strMultiline = (v: unknown, max = 2000): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''
const intOrNull = (v: unknown): number | null => {
  const n = parseInt(str(v).replace(/[^\d-]/g, ''), 10)
  return Number.isFinite(n) ? n : null
}
const numOrNull = (v: unknown): number | null => {
  const n = parseFloat(str(v).replace(/[^\d.]/g, ''))
  return Number.isFinite(n) ? n : null
}
const boolOrNull = (v: unknown): boolean | null => {
  if (v === true || v === false) return v
  const s = str(v).toLowerCase()
  if (s === 'yes' || s === 'true') return true
  if (s === 'no' || s === 'false') return false
  return null
}

const MAX_BODY_BYTES = 24 * 1024 // hard cap on the raw request before parsing

// Prefer the platform-provided client IP (Vercel sets x-real-ip / the LAST XFF
// hop) over the client-appendable leftmost x-forwarded-for entry.
function clientIp(req: NextRequest): string {
  const real = req.headers.get('x-real-ip')
  if (real) return real.trim()
  const xff = req.headers.get('x-forwarded-for')
  if (xff) { const parts = xff.split(','); return parts[parts.length - 1].trim() }
  return 'unknown'
}

// Best-effort per-IP throttle (in-memory → per warm instance only; a real global
// limit would need a shared store. The body-size cap + honeypot are the primary
// abuse controls; this just blunts naive loops).
const hits = new Map<string, number[]>()
function rateLimited(ip: string, limit = 4, windowMs = 60 * 60 * 1000): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs)
  if (hits.size > 1000) hits.clear()
  hits.set(ip, [...recent, now])
  return recent.length >= limit
}

function validate(b: Record<string, unknown>): Record<string, string> {
  const e: Record<string, string> = {}
  if (!str(b.company_name)) e.company_name = 'Company name is required.'
  const email = str(b.email)
  if (!email) e.email = 'Email is required.'
  else if (!EMAIL_RE.test(email)) e.email = 'Enter a valid email address.'
  if (!str(b.phone) || str(b.phone).replace(/\D/g, '').length < 10) e.phone = 'Enter a valid phone number.'
  if (!str(b.contact_name)) e.contact_name = 'A contact name is required.'
  // A carrier needs at least one authority number to be actionable.
  if (!str(b.mc_number) && !str(b.dot_number)) e.mc_number = 'Enter your MC or DOT number.'
  if (b.certify !== true) e.certify = 'Please certify the information is accurate.'
  return e
}

export async function POST(req: NextRequest) {
  // Cap the raw body before parsing so an anonymous caller can't push large
  // payloads into the shared production DB via full_application.
  const raw = await req.text()
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: 'too_large' }, { status: 413 })
  }
  let body: Record<string, unknown>
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
    }
    body = parsed as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
  }

  // Honeypot — real users never fill this hidden field.
  if (str(body.company_website_url)) return NextResponse.json({ ok: true })

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }

  const errors = validate(body)
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: 'invalid', errors }, { status: 422 })
  }

  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('[carrier-apply] Supabase env not configured')
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY)
  const email = str(body.email).toLowerCase()

  // Duplicate-submission guard: same email in the last 24h. Email is stored
  // lower-cased so this is an index-usable equality lookup.
  const cutoff = new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  const { data: dupes } = await supabase
    .from('carrier_applications')
    .select('id')
    .eq('email', email)
    .gte('created_at', cutoff)
    .limit(1)
  if (dupes && dupes.length) {
    return NextResponse.json(
      { ok: false, error: 'duplicate', message: 'We already received an application from this email in the last 24 hours.' },
      { status: 409 },
    )
  }

  const equipment = Array.isArray(body.equipment_types)
    ? (body.equipment_types as unknown[]).map((x) => str(x)).filter(Boolean).slice(0, 20)
    : []

  const nowIso = new Date().toISOString()
  // All sanitized (length-capped) fields — reused for both the flat columns and
  // the full_application snapshot, so the jsonb can't exceed the same bounds.
  const fields = {
    company_name: str(body.company_name),
    mc_number: str(body.mc_number) || null,
    dot_number: str(body.dot_number) || null,
    contact_name: str(body.contact_name) || null,
    contact_title: str(body.contact_title) || null,
    phone: str(body.phone) || null,
    email: email || null,
    address: str(body.address) || null,
    city: str(body.city) || null,
    state: str(body.state) || null,
    zip: str(body.zip) || null,
    years_in_business: intOrNull(body.years_in_business),
    power_units: intOrNull(body.power_units),
    reefer_units: intOrNull(body.reefer_units),
    equipment_types: equipment,
    preferred_lanes: strMultiline(body.preferred_lanes),
    insurance_provider: str(body.insurance_provider) || null,
    insurance_expiry: str(body.insurance_expiry) || null,
    cargo_insurance_amount: numOrNull(body.cargo_insurance_amount),
    auto_liability_amount: numOrNull(body.auto_liability_amount),
    reefer_breakdown: boolOrNull(body.reefer_breakdown),
    w9_available: boolOrNull(body.w9_available),
    factoring_company: str(body.factoring_company) || null,
    how_heard: str(body.how_heard) || null,
    notes: strMultiline(body.notes),
  }
  const row = {
    status: 'new',
    ...fields,
    full_application: { ...fields, submitted_at: nowIso },
  }

  const { data: inserted, error } = await supabase
    .from('carrier_applications')
    .insert(row)
    .select('id, application_number')
    .single()

  if (error) {
    // Missing table/columns → the TMS migration (12_carrier_applications) hasn't run.
    const notMigrated = error.code === '42P01' || error.code === '42703'
    console.error('[carrier-apply] insert failed', error.code, error.message)
    return NextResponse.json(
      { ok: false, error: notMigrated ? 'not_configured' : 'insert_failed' },
      { status: notMigrated ? 503 : 502 },
    )
  }

  // Best-effort staff notification.
  const notify = process.env.CARRIER_APPLY_NOTIFY_EMAIL
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.QUOTE_FROM_EMAIL
  if (notify && apiKey && from) {
    const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [notify],
        reply_to: email,
        subject: `New carrier application: ${str(body.company_name)} (${inserted.application_number})`,
        html: `<p>New carrier application <strong>${esc(inserted.application_number ?? '')}</strong> from <strong>${esc(str(body.company_name))}</strong>.</p><p>MC ${esc(str(body.mc_number) || '—')} · DOT ${esc(str(body.dot_number) || '—')} · ${esc(str(body.contact_name))} · ${esc(email)} · ${esc(str(body.phone))}</p><p>Review it in the TMS → Carrier Applications.</p>`,
      }),
    }).catch(() => {})
  }

  return NextResponse.json({ ok: true, reference: inserted.application_number })
}
