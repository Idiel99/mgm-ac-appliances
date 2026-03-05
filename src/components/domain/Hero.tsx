import { Button } from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'

interface HeroProps {
  title: string
  subtitle: string
  highlight?: string
}

export const Hero = ({ title, subtitle, highlight }: HeroProps) => {
  const navigate = useNavigate()

  return (
    <section className="bg-white">
      <div className="container grid gap-8 py-16 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          {highlight && <span className="rounded-full bg-brand-primary/10 px-4 py-1 text-sm font-semibold text-brand-primary">{highlight}</span>}
          <h1 className="text-4xl font-bold text-brand-dark md:text-5xl">{title}</h1>
          <p className="text-lg text-slate-600">{subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" onClick={() => navigate('/booking')}>Schedule Service</Button>
            <Button variant="secondary" size="lg" onClick={() => (window.location.href = 'tel:+13055550100')}>
              Call 305-555-0100
            </Button>
          </div>
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <p className="text-3xl font-bold text-brand-dark">24/7</p>
              <p className="text-slate-600">Emergency dispatch</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-dark">45k+</p>
              <p className="text-slate-600">Systems maintained</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-dark">4.9 ★</p>
              <p className="text-slate-600">Google rating</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-brand-primary to-brand-dark p-8 text-white shadow-2xl">
          <p className="text-lg font-semibold uppercase tracking-widest text-white/70">Florida Coverage</p>
          <h2 className="mt-6 text-3xl font-bold">Enterprise HVAC for Miami, Fort Lauderdale, Orlando & Tampa</h2>
          <p className="mt-4 text-white/80">
            Dedicated technician teams in each market, fleet GPS tracking, and redundancy for storm season to keep
            residences, data rooms and commercial spaces online.
          </p>
          <ul className="mt-6 space-y-3 text-white/80">
            <li>• Fully insured field teams on call 24/7</li>
            <li>• FEMA & hurricane response ready</li>
            <li>• Financing up to 60 months</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
