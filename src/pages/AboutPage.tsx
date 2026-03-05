import { Helmet } from 'react-helmet-async'

export const AboutPage = () => (
  <div className="bg-white py-14">
    <Helmet>
      <title>About MGM A/C Appliances</title>
      <meta name="description" content="Family-owned HVAC pros combining neighborhood care with enterprise-scale delivery." />
    </Helmet>
    <div className="container space-y-10">
      <header className="space-y-4">
        <p className="section-title">Family-owned, South Florida proud</p>
        <p className="section-subtitle">
          MGM A/C Appliances began as a single-truck operation in 1998. The same family still answers the phone, rides
          along on installs and checks in with customers after every job.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-brand-light p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">Our story</p>
          <p className="mt-3 text-lg text-slate-600">
            Our parents built MGM on word-of-mouth service calls around Miami-Dade. Their kids grew up in the warehouse,
            learned the trade, and now lead dispatch, installs and customer care.
          </p>
          <p className="mt-3 text-sm text-slate-500">We still sign every estimate with our family name.</p>
        </div>
        <div className="rounded-2xl bg-brand-light p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">Today</p>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>• 200+ technicians stationed across Miami, Broward, Orlando and Tampa</li>
            <li>• Family members embedded in every department (operations, finance, QA)</li>
            <li>• Concierge-style updates after service so homeowners always hear from “one of the MGM’s”</li>
          </ul>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Family handshake promise',
            copy: 'We treat every job like we’re repairing our own parents’ AC — and we show up when we say we will.'
          },
          {
            title: 'Community investment',
            copy: 'Portion of every install funds neighborhood STEM programs and trade school scholarships.'
          },
          {
            title: 'Enterprise discipline',
            copy: 'While we’re family-owned, we still document every visit, photo-log installs and maintain enterprise SLAs.'
          }
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-100 p-6 shadow-card">
            <p className="text-lg font-semibold text-brand-dark">{item.title}</p>
            <p className="mt-2 text-slate-600">{item.copy}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)
