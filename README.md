# Cryolane Website

Marketing site + carrier/shipper portals for Cryolane — temperature-controlled
freight brokerage. Cold Chain. Controlled.

Stack: Next.js 16 (App Router) · React 19 · Tailwind v4 (tokens only; styling
lives in `app/globals.css` as `cl-*` marketing + `clp-*` portal class systems)
· TypeScript · `@supabase/ssr` against the Cryolane TMS Supabase project.

## Layout

- `app/(site)/` — marketing pages (home, services, shippers, carriers, about,
  contact, quote) wrapped by the shared Nav/Footer chrome.
- `app/portal/` — the portals. `login` + `no-access` are public; everything
  under `(authed)/` is guarded (proxy session gate → layout role check → the
  TMS project's `portal_*` SECURITY-BARRIER views as the DB backstop).
  Carrier role → `/portal/carrier` (loads, settlements, compliance).
  Shipper role → `/portal/shipper` (shipments + tracking links, invoices).
- `proxy.ts` — Next 16 middleware; refreshes the Supabase session cookie and
  bounces unauthenticated `/portal/*` hits. Scoped to `/portal/:path*` only.
- `lib/portal/data.ts` — loader-per-view with a resilient `Loaded<T>` envelope:
  if the portal migration hasn't been run yet, pages show a "being set up"
  notice instead of crashing.

## Linked systems

- **DB**: the TMS Supabase project (`yiwafhtdjacsuviiwtnw`). Portal read layer =
  `cryolane-tms/supabase/migrations/20260710_10_portal.sql` (run manually in
  the SQL editor). The website only ever uses the anon key.
- **Provisioning**: portal logins are granted from the TMS (carrier/customer
  detail page → "Portal Access", admin-only) via `/api/portal-access` there.
- **Tracking links**: shipper portal links to `NEXT_PUBLIC_TRACK_BASE_URL`
  (`https://cryolane.app/track/<token>`).

## Develop

```bash
npm install
npm run dev
```

`.env.local` needs `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
(same values as the TMS) and `NEXT_PUBLIC_TRACK_BASE_URL`. See
`.env.local.example` for the optional quote-form Resend relay.

## Configure

- `lib/site.ts` — contact email, carrier email, phone, MC/USDOT numbers
  (MC/DOT + the "Licensed & bonded" line render only once filled in).

## Deploy

Vercel project + cryolane.com (apex A + www CNAME at GoDaddy — do NOT move
nameservers; M365 email lives on the domain). The TMS stays on cryolane.app.
