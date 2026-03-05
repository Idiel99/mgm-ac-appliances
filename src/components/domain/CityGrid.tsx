import { Link } from 'react-router-dom'
import type { CityItem } from '@/content/types'

interface CityGridProps {
  cities: CityItem[]
}

export const CityGrid = ({ cities }: CityGridProps) => (
  <div className="grid gap-6 md:grid-cols-2">
    {cities.map((city) => (
      <article key={city.slug} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-brand-primary">Service Area</p>
            <h3 className="text-2xl font-semibold text-brand-dark">{city.name}</h3>
          </div>
          <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-sm font-semibold text-brand-primary">
            {city.counties[0]}
          </span>
        </div>
        <p className="mt-3 text-slate-600">{city.hero}</p>
        <p className="mt-2 text-sm text-slate-500">{city.coverageText}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {city.neighborhoods.map((hood) => (
            <span key={hood} className="rounded-full bg-brand-light px-3 py-1 text-brand-dark">
              {hood}
            </span>
          ))}
        </div>
        <Link to={`/service-areas/${city.slug}`} className="mt-5 inline-flex items-center gap-1 font-semibold text-brand-primary">
          View response times →
        </Link>
      </article>
    ))}
  </div>
)
