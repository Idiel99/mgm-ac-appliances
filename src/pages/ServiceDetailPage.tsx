import { useMemo } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getServiceBySlug, services } from '@/content'
import { Button } from '@/components/ui/Button'
import { Accordion } from '@/components/ui/Accordion'

export const ServiceDetailPage = () => {
  const { serviceSlug } = useParams()
  const service = getServiceBySlug(serviceSlug)
  const navigate = useNavigate()

  const faqItems = useMemo(
    () => service?.faq.map((item, index) => ({ id: `${index}`, title: item.question, content: item.answer })) ?? [],
    [service]
  )

  if (!service) {
    return (
      <div className="bg-white py-14">
        <div className="container space-y-6">
          <p className="text-3xl font-semibold text-brand-dark">Service not found</p>
          <Link to="/services" className="text-brand-primary">
            Back to services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white py-14">
      <Helmet>
        <title>{service.seo.title}</title>
        <meta name="description" content={service.seo.description} />
      </Helmet>
      <div className="container space-y-10">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">{service.name}</p>
          <h1 className="text-4xl font-bold text-brand-dark">{service.hero}</h1>
          <p className="text-lg text-slate-600">{service.shortDescription}</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate('/booking')}>Schedule service</Button>
            <Button variant="secondary" onClick={() => (window.location.href = 'tel:+13055550100')}>
              Call dispatch
            </Button>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="section-title">Symptoms we solve</p>
            <ul className="space-y-3 text-slate-600">
              {service.symptoms.map((symptom) => (
                <li key={symptom} className="rounded-2xl bg-brand-light px-4 py-3">
                  {symptom}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <p className="section-title">What’s included</p>
            <ul className="space-y-3 text-slate-600">
              {service.includes.map((item) => (
                <li key={item} className="rounded-2xl border border-slate-100 px-4 py-3 shadow-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {faqItems.length > 0 && (
          <section className="space-y-4">
            <p className="section-title">Frequently asked questions</p>
            <Accordion items={faqItems} />
          </section>
        )}

        <section className="space-y-4">
          <p className="section-title">Related services</p>
          <div className="flex flex-wrap gap-3">
            {service.relatedServices.map((slug) => {
              const related = services.find((s) => s.slug === slug)
              return (
                related && (
                  <Link key={slug} to={`/services/${slug}`} className="rounded-full bg-brand-light px-4 py-2 font-semibold text-brand-dark">
                    {related.name}
                  </Link>
                )
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
