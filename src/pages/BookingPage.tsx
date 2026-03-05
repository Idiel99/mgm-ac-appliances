import { Helmet } from 'react-helmet-async'
import { BookingWizard } from '@/components/domain/BookingWizard'

export const BookingPage = () => (
  <div className="bg-brand-light py-14">
    <Helmet>
      <title>Book Service | MGM A/C Appliances</title>
      <meta name="description" content="Step-by-step HVAC booking wizard with service selection, property type and contact confirmation." />
    </Helmet>
    <div className="container space-y-6">
      <header className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">Book now</p>
        <h1 className="text-4xl font-bold text-brand-dark">Schedule service in 4 steps</h1>
        <p className="text-slate-600">Emergency? Call 305-555-0100 for priority routing.</p>
      </header>
      <BookingWizard />
    </div>
  </div>
)
