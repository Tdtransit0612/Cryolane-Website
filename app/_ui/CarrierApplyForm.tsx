'use client'

import { useState } from 'react'
import { site } from '@/lib/site'
import { IconShieldCheck } from './icons'

const EQUIPMENT = [
  'Reefer 53′ (FTL)',
  'Multi-temp',
  'Frozen / deep frozen',
  'Reefer LTL / partial',
  'Dry van',
  'Flatbed',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type State = 'idle' | 'submitting' | 'sent' | 'fallback'

function FieldErr({ name, msg }: { name: string; msg?: string }) {
  return msg ? <span id={`${name}-err`} className="cl-field-err">{msg}</span> : null
}

const packetMailto = () =>
  `mailto:${site.carrierEmail}?subject=${encodeURIComponent('Carrier packet — Cryolane network')}&body=${encodeURIComponent(
    'Please attach your W-9, certificate of insurance (with reefer breakdown coverage), and authority letter.\n\nCompany:\nMC #:\nDOT #:\nContact / phone:\nTrucks / reefer trailers:\nPreferred lanes:',
  )}`

export default function CarrierApplyForm() {
  const [state, setState] = useState<State>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [topError, setTopError] = useState('')
  const [reference, setReference] = useState('')

  function clearErr(name: string) {
    setErrors((e) => (e[name] ? { ...e, [name]: '' } : e))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTopError('')
    const form = e.currentTarget
    const fd = new FormData(form)
    const data: Record<string, unknown> = Object.fromEntries(fd.entries())
    data.equipment_types = fd.getAll('equipment_types')
    data.certify = fd.get('certify') === 'on'

    // Client-side validation mirrors the server so the user gets fast feedback.
    const clientErr: Record<string, string> = {}
    if (!String(data.company_name || '').trim()) clientErr.company_name = 'Company name is required.'
    if (!String(data.contact_name || '').trim()) clientErr.contact_name = 'A contact name is required.'
    if (!EMAIL_RE.test(String(data.email || '').trim())) clientErr.email = 'Enter a valid email address.'
    if (String(data.phone || '').replace(/\D/g, '').length < 10) clientErr.phone = 'Enter a valid phone number.'
    if (!String(data.mc_number || '').trim() && !String(data.dot_number || '').trim()) clientErr.mc_number = 'Enter your MC or DOT number.'
    if (!data.certify) clientErr.certify = 'Please certify the information is accurate.'
    if (Object.keys(clientErr).length) {
      setErrors(clientErr)
      setTopError('Please correct the highlighted fields.')
      return
    }

    setErrors({})
    setState('submitting')
    try {
      const res = await fetch('/api/carrier-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        const body = await res.json().catch(() => ({}))
        setReference(body.reference ?? '')
        setState('sent')
        return
      }
      const body = await res.json().catch(() => null)
      if (res.status === 422 && body?.errors) {
        setErrors(body.errors)
        setTopError('Please correct the highlighted fields.')
        setState('idle')
        return
      }
      if (res.status === 409) {
        setTopError(body?.message ?? 'We already received an application from this email in the last 24 hours.')
        setState('idle')
        return
      }
      if (res.status === 429) {
        setTopError('Too many submissions from your network. Please try again later, or email us your packet.')
        setState('idle')
        return
      }
      // 503 (relay/table not ready) or 5xx → mail fallback so no carrier is lost.
      setState('fallback')
    } catch {
      setState('fallback')
    }
  }

  if (state === 'sent') {
    return (
      <div className="cl-quote-shell">
        <div className="cl-form-success">
          <span style={{ color: 'var(--ice-500)' }}><IconShieldCheck size={44} /></span>
          <h3>Application received</h3>
          <p>
            Thanks — we&apos;ve got it{reference ? <> (ref <strong>{reference}</strong>)</> : null}. We&apos;ll verify
            your authority and insurance and reach out about setup.
            <br />
            Questions? Email{' '}
            <a href={`mailto:${site.carrierEmail}`} style={{ color: 'var(--ice-500)' }}>{site.carrierEmail}</a>.
          </p>
        </div>
      </div>
    )
  }

  if (state === 'fallback') {
    return (
      <div className="cl-quote-shell">
        <div className="cl-form-success">
          <span style={{ color: 'var(--ice-500)' }}><IconShieldCheck size={44} /></span>
          <h3>Send us your packet</h3>
          <p>
            Our application couldn&apos;t submit just now. Email your W-9, COI (with reefer
            breakdown coverage), and authority letter to{' '}
            <a href={packetMailto()} style={{ color: 'var(--ice-500)' }}>{site.carrierEmail}</a>{' '}
            and we&apos;ll get you set up.
          </p>
        </div>
      </div>
    )
  }

  const cls = (name: string) => `cl-input${errors[name] ? ' cl-invalid' : ''}`
  const aria = (name: string) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-err` : undefined,
  })

  return (
    <div className="cl-quote-shell">
      <form className="cl-form-grid" onSubmit={onSubmit} noValidate>
        {/* Honeypot */}
        <input
          type="text"
          name="company_website_url"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
        />

        <div className="cl-form-section">Company &amp; authority</div>
        <div className="cl-field cl-field-full">
          <label htmlFor="ca-company">Company name <span className="cl-req">*</span></label>
          <input id="ca-company" name="company_name" className={cls('company_name')} onChange={() => clearErr('company_name')} {...aria('company_name')} required />
          <FieldErr name="company_name" msg={errors.company_name} />
        </div>
        <div className="cl-field">
          <label htmlFor="ca-mc">MC number</label>
          <input id="ca-mc" name="mc_number" className={cls('mc_number')} onChange={() => clearErr('mc_number')} {...aria('mc_number')} placeholder="MC-123456" />
          <FieldErr name="mc_number" msg={errors.mc_number} />
        </div>
        <div className="cl-field">
          <label htmlFor="ca-dot">DOT number</label>
          <input id="ca-dot" name="dot_number" className="cl-input" placeholder="1234567" />
          <span className="cl-field-hint">Enter your MC or DOT number — either one.</span>
        </div>
        <div className="cl-field">
          <label htmlFor="ca-years">Years in business</label>
          <input id="ca-years" name="years_in_business" type="number" min="0" className="cl-input" />
        </div>
        <div className="cl-field">
          <label htmlFor="ca-heard">How&apos;d you hear about us?</label>
          <input id="ca-heard" name="how_heard" className="cl-input" placeholder="Load board, referral…" />
        </div>

        <div className="cl-form-section">Primary contact</div>
        <div className="cl-field">
          <label htmlFor="ca-contact">Contact name <span className="cl-req">*</span></label>
          <input id="ca-contact" name="contact_name" className={cls('contact_name')} onChange={() => clearErr('contact_name')} {...aria('contact_name')} autoComplete="name" required />
          <FieldErr name="contact_name" msg={errors.contact_name} />
        </div>
        <div className="cl-field">
          <label htmlFor="ca-title">Title</label>
          <input id="ca-title" name="contact_title" className="cl-input" placeholder="Owner, dispatcher…" />
        </div>
        <div className="cl-field">
          <label htmlFor="ca-email">Email <span className="cl-req">*</span></label>
          <input id="ca-email" name="email" type="email" className={cls('email')} onChange={() => clearErr('email')} {...aria('email')} autoComplete="email" required />
          <FieldErr name="email" msg={errors.email} />
        </div>
        <div className="cl-field">
          <label htmlFor="ca-phone">Phone <span className="cl-req">*</span></label>
          <input id="ca-phone" name="phone" type="tel" className={cls('phone')} onChange={() => clearErr('phone')} {...aria('phone')} autoComplete="tel" required />
          <FieldErr name="phone" msg={errors.phone} />
        </div>
        <div className="cl-field cl-field-full">
          <label htmlFor="ca-address">Street address</label>
          <input id="ca-address" name="address" className="cl-input" autoComplete="street-address" />
        </div>
        <div className="cl-field">
          <label htmlFor="ca-city">City</label>
          <input id="ca-city" name="city" className="cl-input" />
        </div>
        <div className="cl-field">
          <label htmlFor="ca-state">State</label>
          <input id="ca-state" name="state" className="cl-input" maxLength={2} placeholder="FL" />
        </div>
        <div className="cl-field">
          <label htmlFor="ca-zip">ZIP</label>
          <input id="ca-zip" name="zip" className="cl-input" inputMode="numeric" />
        </div>

        <div className="cl-form-section">Fleet &amp; equipment</div>
        <div className="cl-field">
          <label htmlFor="ca-power">Power units</label>
          <input id="ca-power" name="power_units" type="number" min="0" className="cl-input" />
        </div>
        <div className="cl-field">
          <label htmlFor="ca-reefer">Reefer trailers</label>
          <input id="ca-reefer" name="reefer_units" type="number" min="0" className="cl-input" />
        </div>
        <div className="cl-field cl-field-full" style={{ gap: 10 }} role="group" aria-labelledby="grp-equipment">
          <span id="grp-equipment" className="cl-group-label">Equipment you run</span>
          <div className="cl-check-group">
            {EQUIPMENT.map((eq) => (
              <label className="cl-check" key={eq}>
                <input type="checkbox" name="equipment_types" value={eq} />
                {eq}
              </label>
            ))}
          </div>
        </div>
        <div className="cl-field cl-field-full">
          <label htmlFor="ca-lanes">Preferred lanes / operating area</label>
          <textarea id="ca-lanes" name="preferred_lanes" className="cl-textarea" placeholder="e.g. FL ⟷ Northeast, Southeast regional, 48-state OTR" />
        </div>

        <div className="cl-form-section">Insurance</div>
        <div className="cl-field">
          <label htmlFor="ca-ins">Insurance provider</label>
          <input id="ca-ins" name="insurance_provider" className="cl-input" />
        </div>
        <div className="cl-field">
          <label htmlFor="ca-insexp">Insurance expiry</label>
          <input id="ca-insexp" name="insurance_expiry" type="date" className="cl-input" />
        </div>
        <div className="cl-field">
          <label htmlFor="ca-cargo">Cargo coverage</label>
          <input id="ca-cargo" name="cargo_insurance_amount" className="cl-input" placeholder="$100,000" />
        </div>
        <div className="cl-field">
          <label htmlFor="ca-auto">Auto liability</label>
          <input id="ca-auto" name="auto_liability_amount" className="cl-input" placeholder="$1,000,000" />
        </div>
        <div className="cl-field cl-field-full" style={{ gap: 10 }} role="group" aria-labelledby="grp-reefer">
          <span id="grp-reefer" className="cl-group-label">Do you carry reefer breakdown coverage?</span>
          <div className="cl-yesno">
            <label className="cl-check cl-check-inline"><input type="radio" name="reefer_breakdown" value="yes" /> Yes</label>
            <label className="cl-check cl-check-inline"><input type="radio" name="reefer_breakdown" value="no" /> No</label>
          </div>
        </div>

        <div className="cl-form-section">Business</div>
        <div className="cl-field cl-field-full" style={{ gap: 10 }} role="group" aria-labelledby="grp-w9">
          <span id="grp-w9" className="cl-group-label">Can you provide a W-9?</span>
          <div className="cl-yesno">
            <label className="cl-check cl-check-inline"><input type="radio" name="w9_available" value="yes" /> Yes</label>
            <label className="cl-check cl-check-inline"><input type="radio" name="w9_available" value="no" /> No</label>
          </div>
        </div>
        <div className="cl-field cl-field-full">
          <label htmlFor="ca-factor">Factoring company (if any)</label>
          <input id="ca-factor" name="factoring_company" className="cl-input" />
        </div>
        <div className="cl-field cl-field-full">
          <label htmlFor="ca-notes">Anything else we should know?</label>
          <textarea id="ca-notes" name="notes" className="cl-textarea" />
        </div>

        <div className="cl-field cl-field-full" style={{ gap: 10 }}>
          <label className="cl-check">
            <input type="checkbox" name="certify" onChange={() => clearErr('certify')} {...aria('certify')} />
            <span>
              I certify the information above is accurate, and I authorize Cryolane to verify
              our authority and insurance with the FMCSA and our carriers. <span className="cl-req">*</span>
            </span>
          </label>
          <FieldErr name="certify" msg={errors.certify} />
        </div>

        {topError && <div className="cl-form-error" role="alert">{topError}</div>}

        <div className="cl-form-actions">
          <button type="submit" className="cl-btn cl-btn-primary" disabled={state === 'submitting'}>
            {state === 'submitting' ? 'Submitting…' : 'Submit Application'}
          </button>
          <span className="cl-form-note">A real person reviews every application — no rate-blast lists.</span>
        </div>
      </form>
    </div>
  )
}
