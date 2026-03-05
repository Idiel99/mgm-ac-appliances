import { Helmet } from 'react-helmet-async'

export const AboutPage = () => (
  <div className="bg-white py-14">
    <Helmet>
      <title>About MGM A/C Appliances</title>
      <meta name="description" content="Meet the enterprise HVAC team serving Miami, Orlando and Tampa with 200+ technicians." />
    </Helmet>
    <div className="container space-y-8">
      <header className="space-y-4">
        <p className="section-title">Built for Florida heat</p>
        <p className="section-subtitle">200+ technicians, 60 fully-stocked trucks, 5 emergency depots.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-brand-light p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">Mission</p>
          <p className="mt-3 text-lg text-slate-600">
            Deliver enterprise-level HVAC reliability to every Florida homeowner and property manager with data-driven dispatch and concierge-level communication.
          </p>
        </div>
        <div className="rounded-2xl bg-brand-light p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">Credentials</p>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>• NATE-certified technicians</li>
            <li>• Carrier, Trane and Mitsubishi Elite partners</li>
            <li>• FEMA & municipal emergency contracts</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)
