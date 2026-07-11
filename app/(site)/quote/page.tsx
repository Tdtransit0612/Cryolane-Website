import type { Metadata } from 'next'
import QuoteForm from '../../_ui/QuoteForm'

export const metadata: Metadata = {
  title: 'Get a Quote | Cryolane',
  description:
    'Request a refrigerated freight quote — lane, product, and temp is all we need. A real person reads every request and comes back with a rate and capacity.',
}

export default function QuotePage() {
  return (
    <main>
      <div className="cl-page-head">
        <div className="cl-page-head-inner">
          <p className="cl-kicker">Get a Quote</p>
          <h1>Tell us about the load.</h1>
          <p className="cl-lede">
            Lane, product, and temp — that&apos;s all we need to get started. A real person
            reads every request and comes back with a rate and available capacity.
          </p>
        </div>
      </div>
      <section className="cl-section">
        <div className="cl-section-inner">
          <QuoteForm />
        </div>
      </section>
    </main>
  )
}
