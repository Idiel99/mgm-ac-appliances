import { Link } from 'react-router-dom'
import type { ServiceItem } from '@/content/types'

interface ServiceCardProps {
  service: ServiceItem
}

export const ServiceCard = ({ service }: ServiceCardProps) => (
  <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
    <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">{service.name}</p>
    <h3 className="mt-2 text-2xl font-semibold text-brand-dark">{service.hero}</h3>
    <p className="mt-3 text-slate-600">{service.shortDescription}</p>
    <ul className="mt-4 space-y-2 text-sm text-slate-600">
      {service.symptoms.slice(0, 3).map((symptom) => (
        <li key={symptom}>• {symptom}</li>
      ))}
    </ul>
    <Link to={`/services/${service.slug}`} className="mt-5 inline-flex items-center gap-1 text-brand-primary font-semibold">
      Explore service →
    </Link>
  </article>
)
