import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/Button'

export const CommercialHVACPage = () => (
  <div className="bg-white py-14">
    <Helmet>
      <title>Commercial HVAC | MGM A/C Appliances</title>
      <meta name="description" content="Rooftop packaged units, VRF systems and maintenance contracts for Florida commercial properties." />
    </Helmet>
    <div className="container space-y-8">
      <header>
        <p className="section-title">Commercial HVAC programs</p>
        <p className="section-subtitle">Engineers, project managers and 24/7 building automation monitoring.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {['Rooftop & VRF installs', 'National account service', 'Building analytics'].map((item) => (
          <div key={item} className="rounded-2xl border border-slate-100 bg-brand-light p-6">
            <p className="text-lg font-semibold text-brand-dark">{item}</p>
            <p className="mt-2 text-sm text-slate-600">Project management, commissioning and remote monitoring for mission-critical facilities.</p>
          </div>
        ))}
      </div>
      <Button onClick={() => (window.location.href = '/contact')}>Request proposal</Button>
    </div>
  </div>
)
