import type { Metadata } from 'next'
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google'
import { site } from '@/lib/site'
import './globals.css'

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})
const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
})
const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Cryolane | Cold Chain. Controlled.',
    template: '%s',
  },
  description:
    'Cryolane is a temperature-controlled freight brokerage. Refrigerated and frozen truckload moved by vetted reefer carriers — verified set points, 24/7 visibility, and one point of contact from pre-cool to POD.',
  keywords:
    'refrigerated freight broker, reefer freight, cold chain logistics, frozen truckload, produce shipping, temperature controlled freight',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Cryolane | Cold Chain. Controlled.',
    description:
      'Temperature-controlled freight brokerage. Vetted reefer carriers, verified set points, and 24/7 visibility on every load.',
    url: site.url,
    siteName: 'Cryolane',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cryolane | Cold Chain. Controlled.',
    description: 'Temperature-controlled freight brokerage. Reefer-first, verified set points, 24/7 visibility.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
