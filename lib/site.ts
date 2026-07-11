/**
 * Single place to update Cryolane contact/identity details as the entity
 * finishes setup (domain email, phone, MC number).
 */
export const site = {
  name: 'Cryolane',
  tagline: 'Cold Chain. Controlled.',
  // Canonical site origin (no trailing slash) — used for metadata, sitemap, robots.
  url: 'https://cryolane.com',
  // TODO: switch to a Cryolane inbox (e.g. quotes@cryolane.com) once the
  // domain mailbox exists. Until then, quote requests land here.
  contactEmail: 'adamg@tdtransit.com',
  carrierEmail: 'adamg@tdtransit.com',
  // Leave empty until FMCSA broker authority is granted — nothing renders
  // in the footer while these are blank.
  mcNumber: '',
  usdotNumber: '',
  phone: '',
}
