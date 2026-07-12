'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'
import { createClient } from '@/lib/supabase/browser'

/**
 * Carrier self-service payment-method election. Writes ONLY the caller's own
 * carriers.quick_pay_opt_in through the SECURITY DEFINER RPC set_my_carrier_quick_pay
 * (scoped by my_carrier_id()); the carrier can't touch any other field or tenant.
 */
export default function QuickPayToggle({ initial }: { initial: boolean }) {
  const [optIn, setOptIn] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const choose = async (next: boolean) => {
    if (next === optIn || saving) return
    setSaving(true)
    setMsg(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.rpc('set_my_carrier_quick_pay', { p_opt_in: next })
      if (error) {
        setMsg({ ok: false, text: 'Could not save — please try again or contact Cryolane.' })
        return
      }
      setOptIn(next)
      setMsg({ ok: true, text: 'Saved.' })
    } catch {
      setMsg({ ok: false, text: 'Network error — please try again.' })
    } finally {
      setSaving(false)
    }
  }

  const btn = (active: boolean): CSSProperties => ({
    flex: 1,
    padding: '10px 14px',
    fontSize: 14,
    fontWeight: 600,
    cursor: saving ? 'default' : 'pointer',
    border: 'none',
    background: active ? '#0284c7' : 'transparent',
    color: active ? '#ffffff' : '#64748b',
    transition: 'background .15s',
  })

  return (
    <div>
      <div
        role="group"
        aria-label="Payment method"
        style={{
          display: 'flex',
          maxWidth: 420,
          border: '1px solid #cbd5e1',
          borderRadius: 10,
          overflow: 'hidden',
          opacity: saving ? 0.7 : 1,
        }}
      >
        <button type="button" disabled={saving} aria-pressed={optIn} onClick={() => choose(true)} style={btn(optIn)}>
          ⚡ Quick Pay
        </button>
        <button type="button" disabled={saving} aria-pressed={!optIn} onClick={() => choose(false)} style={btn(!optIn)}>
          Net 30
        </button>
      </div>
      <p className="clp-note" style={{ marginTop: 8 }}>
        {optIn
          ? 'Quick Pay: paid the next business day, with a 3% fee ($25 minimum) deducted from each settlement.'
          : 'Net 30: paid within 30 days by check or ACH — no fee.'}
        {msg ? (
          <span style={{ marginLeft: 8, fontWeight: 600, color: msg.ok ? '#16a34a' : '#dc2626' }}>{msg.text}</span>
        ) : null}
      </p>
    </div>
  )
}
