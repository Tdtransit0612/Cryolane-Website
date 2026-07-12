import type { Metadata } from 'next'
import CarrierApplyForm from '../../../_ui/CarrierApplyForm'
import { SpecBar } from '../../../_ui/SpecBar'

export const metadata: Metadata = {
  title: 'Carrier Application | Cryolane',
  description:
    'Apply to join the Cryolane reefer carrier network. Send your authority, insurance, and equipment details and we’ll get you set up.',
}

export default function CarrierApplyPage() {
  return (
    <main>
      <div className="cl-page-head">
        <div className="cl-page-head-inner">
          <p className="cl-kicker">Carrier Application</p>
          <h1>Join the Cryolane network.</h1>
          <p className="cl-lede">
            Tell us about your operation. We&apos;ll verify your authority and insurance,
            and once you&apos;re set up you get consistent reefer freight and a portal with
            your loads and settlements.
          </p>
        </div>
      </div>
      <SpecBar
        specs={[
          { k: 'Need', v: 'Authority · COI · W-9' },
          { k: 'Coverage', v: 'Reefer breakdown' },
          { k: 'Setup', v: 'Fast once verified' },
          { k: 'Review', v: 'By a real person', live: true },
        ]}
      />
      <section className="cl-section">
        <div className="cl-section-inner">
          <CarrierApplyForm />
        </div>
      </section>
    </main>
  )
}
