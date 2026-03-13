import { Helmet } from 'react-helmet-async'
import { services } from '@/content'
import { ServiceGrid } from '@/components/domain/ServiceGrid'
import { useCopy } from '@/hooks/useLanguage'

export const ServicesPage = () => {
  const copy = useCopy()

  return (
    <div className="bg-white py-14">
      <Helmet>
        <title>{copy.servicesPage.metaTitle}</title>
        <meta name="description" content={copy.servicesPage.metaDescription} />
      </Helmet>
      <div className="container space-y-8">
        <header className="space-y-4">
          <p className="section-title">{copy.servicesPage.title}</p>
          <p className="section-subtitle">{copy.servicesPage.subtitle}</p>
        </header>
        <ServiceGrid services={services} />
      </div>
    </div>
  )
}
