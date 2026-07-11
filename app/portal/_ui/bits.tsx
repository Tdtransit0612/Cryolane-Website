/**
 * Small server-renderable portal UI helpers.
 */

export function NotProvisioned({ error }: { error?: string | null }) {
  return (
    <div className="clp-notice" role="status">
      <strong>This section isn&apos;t available yet.</strong> Your portal is being
      set up — check back shortly, or contact Cryolane if this persists.
      {error ? <span className="clp-notice-detail">({error})</span> : null}
    </div>
  )
}

export function EmptyState({ label }: { label: string }) {
  return <div className="clp-empty">{label}</div>
}

const STATUS_TONES: Record<string, string> = {
  // loads
  booked: 'info',
  scheduled: 'info',
  covered: 'info',
  in_transit: 'active',
  delivered: 'good',
  invoiced: 'info',
  paid: 'good',
  cancelled: 'muted',
  // settlements / invoices
  draft: 'muted',
  approved: 'info',
  sent: 'info',
  overdue: 'warn',
  // carrier account
  active: 'good',
  pending: 'warn',
  inactive: 'muted',
  do_not_use: 'warn',
}

export function StatusBadge({ value }: { value: string }) {
  const tone = STATUS_TONES[value] ?? 'muted'
  return <span className={`clp-badge clp-badge-${tone}`}>{value.replace(/_/g, ' ')}</span>
}

export function fmtMoney(n: number | null | undefined): string {
  if (n == null) return '—'
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function fmtDate(d: string | null | undefined): string {
  if (!d) return '—'
  const date = new Date(d.includes('T') ? d : `${d}T00:00:00`)
  if (isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
