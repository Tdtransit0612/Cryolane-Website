/**
 * Dispatch-style spec strip: a row of monospace freight readouts (key/value)
 * that sits under a page head and gives the pages an immediate "load board"
 * character. `live` renders the value in the tracking-green accent.
 */
export type Spec = { k: string; v: string; live?: boolean }

export function SpecBar({ specs }: { specs: Spec[] }) {
  return (
    <div className="cl-specbar">
      <div className="cl-specbar-inner">
        {specs.map((s) => (
          <div className="cl-spec" key={s.k}>
            <span className="cl-spec-k">{s.k}</span>
            <span className="cl-spec-v">
              {s.live ? <span className="cl-live">{s.v}</span> : s.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
