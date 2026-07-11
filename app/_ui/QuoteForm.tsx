'use client'

import { useState } from 'react'
import { site } from '@/lib/site'
import { IconShieldCheck } from './icons'

const EQUIPMENT_OPTIONS = [
  'Reefer — Full Truckload',
  'Reefer — LTL / Partial',
  'Multi-Temp',
  'Frozen / Deep Frozen',
  'Not sure — recommend',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// idle → submitting → sent (server has the lead) | fallback (mailto draft —
// the visitor still has to hit Send, so the copy must NOT claim receipt)
type FormState = 'idle' | 'submitting' | 'sent' | 'fallback'

function draftBody(data: Record<string, string>): string {
  return [
    `Name: ${data.name}`,
    `Company: ${data.company || '—'}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '—'}`,
    '',
    `Origin: ${data.origin}`,
    `Destination: ${data.destination}`,
    `Pickup date: ${data.pickup_date || '—'}`,
    `Equipment: ${data.equipment || '—'}`,
    `Temp set point: ${data.temp || '—'}`,
    `Commodity: ${data.commodity || '—'}`,
    `Weight: ${data.weight || '—'}`,
    '',
    `Notes: ${data.notes || '—'}`,
  ].join('\n')
}

function mailtoHref(data: Record<string, string>): string {
  const subject = encodeURIComponent(`Quote request — ${data.origin} to ${data.destination}`)
  return `mailto:${site.contactEmail}?subject=${subject}&body=${encodeURIComponent(draftBody(data))}`
}

export default function QuoteForm() {
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')
  const [fallbackData, setFallbackData] = useState<Record<string, string> | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    if (!data.name?.trim() || !data.email?.trim() || !data.origin?.trim() || !data.destination?.trim()) {
      setError('Please fill in your name, email, origin, and destination.')
      return
    }
    if (!EMAIL_RE.test(data.email.trim())) {
      setError('Please enter a valid email address (e.g. you@company.com).')
      return
    }

    setState('submitting')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setState('sent')
        return
      }
      if (res.status === 422) {
        setError('Please double-check your name, email, origin, and destination, then try again.')
        setState('idle')
        return
      }
      // 503 (email relay not configured), 502 (relay down), 429, or anything
      // else server-side: hand the visitor a mail draft instead of losing the lead.
      enterFallback(data)
    } catch {
      enterFallback(data)
    }
  }

  function enterFallback(data: Record<string, string>) {
    setFallbackData(data)
    setState('fallback')
    window.location.href = mailtoHref(data)
  }

  if (state === 'sent') {
    return (
      <div className="cl-quote-shell">
        <div className="cl-form-success">
          <span style={{ color: 'var(--ice-500)' }}>
            <IconShieldCheck size={44} />
          </span>
          <h3>Request received</h3>
          <p>
            We&apos;ll come back with a rate and available capacity shortly.
            <br />
            Need it faster? Email{' '}
            <a href={`mailto:${site.contactEmail}`} style={{ color: 'var(--ice-500)' }}>
              {site.contactEmail}
            </a>
            .
          </p>
        </div>
      </div>
    )
  }

  if (state === 'fallback' && fallbackData) {
    return (
      <div className="cl-quote-shell">
        <div className="cl-form-success">
          <span style={{ color: 'var(--ice-500)' }}>
            <IconShieldCheck size={44} />
          </span>
          <h3>One more step — send the email</h3>
          <p>
            We opened a draft in your email app with your load details.
            <br />
            <strong>Press Send in your mail app to submit it.</strong>
          </p>
          <p style={{ marginTop: 14 }}>
            Nothing opened? <a href={mailtoHref(fallbackData)} style={{ color: 'var(--ice-500)' }}>Open the draft again</a>{' '}
            or email <a href={`mailto:${site.contactEmail}`} style={{ color: 'var(--ice-500)' }}>{site.contactEmail}</a>{' '}
            with the details below.
          </p>
          <pre className="cl-fallback-details">{draftBody(fallbackData)}</pre>
        </div>
      </div>
    )
  }

  return (
    <div className="cl-quote-shell">
      <form className="cl-form-grid" onSubmit={onSubmit} noValidate>
        {/* Honeypot — hidden from humans, bots fill it and get silently dropped */}
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
        />

        <div className="cl-field">
          <label htmlFor="q-origin">Origin (city, state) *</label>
          <input id="q-origin" name="origin" className="cl-input" placeholder="Orlando, FL" required />
        </div>
        <div className="cl-field">
          <label htmlFor="q-destination">Destination (city, state) *</label>
          <input id="q-destination" name="destination" className="cl-input" placeholder="Atlanta, GA" required />
        </div>

        <div className="cl-field">
          <label htmlFor="q-pickup">Pickup date</label>
          <input id="q-pickup" name="pickup_date" type="date" className="cl-input" />
        </div>
        <div className="cl-field">
          <label htmlFor="q-equipment">Equipment</label>
          <select id="q-equipment" name="equipment" className="cl-select" defaultValue={EQUIPMENT_OPTIONS[0]}>
            {EQUIPMENT_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="cl-field">
          <label htmlFor="q-temp">Temp set point</label>
          <input id="q-temp" name="temp" className="cl-input" placeholder={'34°F continuous'} />
        </div>
        <div className="cl-field">
          <label htmlFor="q-commodity">Commodity</label>
          <input id="q-commodity" name="commodity" className="cl-input" placeholder="Fresh produce" />
        </div>

        <div className="cl-field">
          <label htmlFor="q-weight">Weight</label>
          <input id="q-weight" name="weight" className="cl-input" placeholder="42,000 lbs" />
        </div>
        <div className="cl-field">
          <label htmlFor="q-company">Company</label>
          <input id="q-company" name="company" className="cl-input" placeholder="Your company" />
        </div>

        <div className="cl-field">
          <label htmlFor="q-name">Your name *</label>
          <input id="q-name" name="name" className="cl-input" autoComplete="name" required />
        </div>
        <div className="cl-field">
          <label htmlFor="q-email">Email *</label>
          <input id="q-email" name="email" type="email" className="cl-input" autoComplete="email" required />
        </div>

        <div className="cl-field">
          <label htmlFor="q-phone">Phone</label>
          <input id="q-phone" name="phone" type="tel" className="cl-input" autoComplete="tel" />
        </div>
        <div className="cl-field">
          <label htmlFor="q-notes">Notes</label>
          <input id="q-notes" name="notes" className="cl-input" placeholder="Appointments, multi-stop, etc." />
        </div>

        {error && <div className="cl-form-error" role="alert">{error}</div>}

        <div className="cl-form-actions">
          <button type="submit" className="cl-btn cl-btn-primary" disabled={state === 'submitting'}>
            {state === 'submitting' ? 'Sending…' : 'Request a Quote'}
          </button>
          <span className="cl-form-note">No spam, no rate-blast lists — a person reads every request.</span>
        </div>
      </form>
    </div>
  )
}
