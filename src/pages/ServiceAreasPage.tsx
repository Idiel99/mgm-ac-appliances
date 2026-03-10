import { Helmet } from 'react-helmet-async'
import { CityGrid } from '@/components/domain/CityGrid'
import { cities } from '@/content'
import { useCopy } from '@/context/LanguageContext'

export const ServiceAreasPage = () => {
  const copy = useCopy()

  return (
    <div className="bg-white py-14">
      <Helmet>
        <title>{copy.serviceAreasPage.metaTitle}</title>
        <meta name="description" content={copy.serviceAreasPage.metaDescription} />
      </Helmet>
      <div className="container space-y-6">
        <header>
          <p className="section-title">{copy.serviceAreasPage.title}</p>
          <p className="section-subtitle">{copy.serviceAreasPage.subtitle}</p>
        </header>
        <CityGrid cities={cities} />
      </div>
    </div>
  )
}
