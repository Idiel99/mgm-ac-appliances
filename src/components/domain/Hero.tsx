import { Button } from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { CONTACT_PHONE_LINK } from '@/config/site'

interface HeroProps {
  title: string
  subtitle: string
  highlight?: string
  stats: ReadonlyArray<{ value: string; label: string }>
  callLabel: string
  primaryCtaLabel: string
  coverageEyebrow: string
  coverageTitle: string
  coverageBody: string
  coveragePoints: ReadonlyArray<string>
}

export const Hero = ({
  title,
  subtitle,
  highlight,
  stats,
  callLabel,
  primaryCtaLabel,
  coverageEyebrow,
  coverageTitle,
  coverageBody,
  coveragePoints
}: HeroProps) => {
  const navigate = useNavigate()

  return (
    <section className="bg-white">
      <div className="container grid gap-8 py-16 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          {highlight && <span className="rounded-full bg-brand-primary/10 px-4 py-1 text-sm font-semibold text-brand-primary">{highlight}</span>}
          <h1 className="text-4xl font-bold text-brand-dark md:text-5xl">{title}</h1>
          <p className="text-lg text-slate-600">{subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" onClick={() => navigate('/booking')}>
              {primaryCtaLabel}
            </Button>
            <Button variant="secondary" size="lg" onClick={() => (window.location.href = CONTACT_PHONE_LINK)}>
              {callLabel}
            </Button>
          </div>
          <div className="flex flex-wrap gap-8 text-sm">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-brand-dark">{stat.value}</p>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-brand-primary to-brand-dark p-8 text-white shadow-2xl">
          <p className="text-lg font-semibold uppercase tracking-widest text-white/70">{coverageEyebrow}</p>
          <h2 className="mt-6 text-3xl font-bold">{coverageTitle}</h2>
          <p className="mt-4 text-white/80">{coverageBody}</p>
          <ul className="mt-6 space-y-3 text-white/80">
            {coveragePoints.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
