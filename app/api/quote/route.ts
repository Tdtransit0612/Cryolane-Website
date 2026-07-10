/**
 * POST /api/quote
 *
 * Receives shipper quote requests from the public site and forwards them by
 * email via Resend. No database — this is a lead-capture relay.
 *
 * Required env vars for email sending:
 *   RESEND_API_KEY     — Resend API key
 *   QUOTE_FROM_EMAIL   — verified sender, e.g. "Cryolane <quotes@cryolane.com>"
 * Optional:
 *   QUOTE_TO_EMAIL     — destination inbox (defaults to lib/site.ts contactEmail)
 *
 * If email isn't configured the route answers 503 and the client falls back to
 * opening a prefilled mailto: draft, so no lead is ever lost.
 */

import { NextRequest, NextResponse } from 'next/server'
import { site } from '@/lib/site'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const str = (v: unknown): string => (typeof v === 'string' ? v.trim().slice(0, 500) : '')

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
  }

  // Honeypot: real users never fill this hidden field.
  if (str(body.company_website)) return NextResponse.json({ ok: true })

  const name = str(body.name)
  const email = str(body.email)
  const origin = str(body.origin)
  const destination = str(body.destination)

  if (!name || !origin || !destination || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.QUOTE_FROM_EMAIL
  if (!apiKey || !from) {
    return NextResponse.json({ ok: false, error: 'email_not_configured' }, { status: 503 })
  }

  const to = process.env.QUOTE_TO_EMAIL || site.contactEmail
  const rows: Array<[string, string]> = [
    ['Name', name],
    ['Company', str(body.company)],
    ['Email', email],
    ['Phone', str(body.phone)],
    ['Origin', origin],
    ['Destination', destination],
    ['Pickup date', str(body.pickup_date)],
    ['Equipment', str(body.equipment)],
    ['Temp set point', str(body.temp)],
    ['Commodity', str(body.commodity)],
    ['Weight', str(body.weight)],
    ['Notes', str(body.notes)],
  ]

  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const html = `
    <h2 style="font-family:sans-serif">New quote request — ${esc(origin)} &rarr; ${esc(destination)}</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 14px 6px 0;color:#555;vertical-align:top">${k}</td><td style="padding:6px 0"><strong>${esc(v) || '—'}</strong></td></tr>`,
        )
        .join('')}
    </table>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Quote request: ${origin} -> ${destination} (${name})`,
      html,
    }),
  })

  if (!res.ok) {
    console.error('quote email failed', res.status, await res.text().catch(() => ''))
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
