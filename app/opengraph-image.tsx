import { ImageResponse } from 'next/og'

export const alt = 'Cryolane — Cold Chain. Controlled.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Branded social card. Uses ImageResponse's default font (no external fetch,
// which the strict runtime would block anyway).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #030815 0%, #0A1B3A 55%, #123465 100%)',
          color: '#EAF4FF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <svg width="88" height="88" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 4 L89 26.5 V73.5 L50 96 L11 73.5 V26.5 Z" stroke="#4DA3FF" strokeWidth="5" strokeLinejoin="round" />
            <g stroke="#9FE3FF" strokeWidth="4.5" strokeLinecap="round">
              <line x1="50" y1="20" x2="50" y2="80" />
              <line x1="24" y1="35" x2="76" y2="65" />
              <line x1="76" y1="35" x2="24" y2="65" />
            </g>
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: 14, color: '#EAF4FF' }}>CRYOLANE</div>
        </div>
        <div style={{ fontSize: 82, fontWeight: 700, marginTop: 48, lineHeight: 1.05, display: 'flex' }}>
          Cold Chain.{' '}
          <span style={{ color: '#4DA3FF', marginLeft: 20 }}>Controlled.</span>
        </div>
        <div style={{ fontSize: 30, color: '#AECBE8', marginTop: 30, maxWidth: 900 }}>
          Temperature-controlled freight brokerage — vetted reefer carriers, verified
          set points, 24/7 visibility.
        </div>
      </div>
    ),
    { ...size },
  )
}
