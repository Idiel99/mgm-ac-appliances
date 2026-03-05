import { Helmet } from 'react-helmet-async'
import { CityGrid } from '@/components/domain/CityGrid'
import { cities } from '@/content'

export const ServiceAreasPage = () => (
  <div className="bg-white py-14">
    <Helmet>
      <title>Florida Service Areas | MGM A/C Appliances</title>
      <meta name="description" content="Miami, Fort Lauderdale, Orlando and Tampa HVAC coverage with city-specific response times." />
    </Helmet>
    <div className="container space-y-6">
      <header>
        <p className="section-title">Florida coverage map</p>
        <p className="section-subtitle">Dedicated teams across Miami-Dade, Broward, Orange/Seminole and Hillsborough/Pinellas counties.</p>
      </header>
      <CityGrid cities={cities} />
    </div>
  </div>
)
