'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { CryolaneMark } from './Logo'

const LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/shippers', label: 'Shippers' },
  { href: '/carriers', label: 'Carriers' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className="cl-nav">
      <div className="cl-nav-inner">
        <Link href="/" className="cl-lockup" aria-label="Cryolane home">
          <CryolaneMark size={30} id="clg-nav" />
          <span className="cl-lockup-name">CRYOLANE</span>
        </Link>
        <div className="cl-nav-links">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/portal/login" className="cl-btn cl-btn-ghost cl-btn-sm">Portal Login</Link>
          <Link href="/quote" className="cl-btn cl-btn-primary cl-btn-sm">Get a Quote</Link>
        </div>
        <button
          type="button"
          className="cl-nav-toggle"
          aria-expanded={open}
          aria-controls="cl-mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
      </div>
      {open && (
        <div className="cl-nav-menu" id="cl-mobile-menu">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              aria-current={pathname === l.href ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
          <div className="cl-nav-menu-ctas">
            <Link href="/portal/login" onClick={close} className="cl-btn cl-btn-ghost cl-btn-sm">Portal Login</Link>
            <Link href="/quote" onClick={close} className="cl-btn cl-btn-primary cl-btn-sm">Get a Quote</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
