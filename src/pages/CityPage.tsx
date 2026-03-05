import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getCityBySlug } from '@/content'
import { Button } from '@/components/ui/Button'

export const CityPage = () => {
  const { citySlug } = useParams()
  const city = getCityBySlug(citySlug)

  if (!city) {
    return (
      <div className="bg-white py-14">
        <div className="container">
          <p className="text-3xl font-semibold text-brand-dark">City not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white py-14">
      <Helmet>
        <title>{city.seo.title}</title>
        <meta name="description" content={city.seo.description} />
      </Helmet>
      <div className="container space-y-8">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">Service Area</p>
          <h1 className="text-4xl font-bold text-brand-dark">{city.name}</h1>
          <p className="text-lg text-slate-600">{city.hero}</p>
          <p className="text-slate-600">{city.coverageText}</p>
          <Button onClick={() => (window.location.href = '/booking')}>Book in {city.name}</Button>
        </header>
        <section>
          <p className="section-title">Neighborhoods + Coverage</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {city.neighborhoods.map((hood) => (
              <span key={hood} className="rounded-full bg-brand-light px-4 py-2 text-brand-dark">
                {hood}
              </span>
            ))}
          </div>
        </section>
        {city.faq.length > 0 && (
          <section>
            <p className="section-title">FAQs</p>
            <ul className="mt-4 space-y-3 text-slate-600">
              {city.faq.map((faq) => (
                <li key={faq.question} className="rounded-2xl border border-slate-100 p-4 shadow-sm">
                  <p className="font-semibold text-brand-dark">{faq.question}</p>
                  <p>{faq.answer}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
