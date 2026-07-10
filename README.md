# Cryolane Website

Marketing site for Cryolane — temperature-controlled freight brokerage.
Cold Chain. Controlled.

Stack: Next.js 16 (App Router) · React 19 · Tailwind v4 (tokens only; styling
lives in `app/globals.css` as a `cl-*` class system) · TypeScript.

## Develop

```bash
npm install
npm run dev
```

## Configure

- `lib/site.ts` — contact email, carrier email, phone, MC/USDOT numbers
  (MC/DOT render in the footer only once filled in).
- `.env.local` — see `.env.local.example` for quote-form email relay (Resend).
  Without it, the quote form falls back to a prefilled `mailto:` draft, so no
  lead is lost either way.

## Deploy

Vercel project + custom domain, same pattern as top-dawg-website.
