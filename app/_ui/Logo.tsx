/**
 * Cryolane brand mark: a snowflake inside a hexagonal shield, stroked with the
 * ice-blue brand gradient. `id` must be unique per instance on the page because
 * SVG gradient defs are referenced by document-wide id.
 */
export function CryolaneMark({ size = 40, id = 'clg' }: { size?: number; id?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="10" y1="8" x2="90" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9FE3FF" />
          <stop offset="0.55" stopColor="#4DA3FF" />
          <stop offset="1" stopColor="#2E7BFF" />
        </linearGradient>
      </defs>
      {/* Hexagonal shield */}
      <path
        d="M50 4 L89 26.5 V73.5 L50 96 L11 73.5 V26.5 Z"
        stroke={`url(#${id})`}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Snowflake: three diameters + branch ticks, rotated in 60° steps */}
      <g stroke={`url(#${id})`} strokeWidth="4.5" strokeLinecap="round">
        <line x1="50" y1="20" x2="50" y2="80" />
        <line x1="24" y1="35" x2="76" y2="65" />
        <line x1="76" y1="35" x2="24" y2="65" />
        <g>
          <line x1="50" y1="31" x2="42.5" y2="24.5" />
          <line x1="50" y1="31" x2="57.5" y2="24.5" />
          <line x1="50" y1="69" x2="42.5" y2="75.5" />
          <line x1="50" y1="69" x2="57.5" y2="75.5" />
        </g>
        <g transform="rotate(60 50 50)">
          <line x1="50" y1="31" x2="42.5" y2="24.5" />
          <line x1="50" y1="31" x2="57.5" y2="24.5" />
          <line x1="50" y1="69" x2="42.5" y2="75.5" />
          <line x1="50" y1="69" x2="57.5" y2="75.5" />
        </g>
        <g transform="rotate(120 50 50)">
          <line x1="50" y1="31" x2="42.5" y2="24.5" />
          <line x1="50" y1="31" x2="57.5" y2="24.5" />
          <line x1="50" y1="69" x2="42.5" y2="75.5" />
          <line x1="50" y1="69" x2="57.5" y2="75.5" />
        </g>
      </g>
    </svg>
  )
}
