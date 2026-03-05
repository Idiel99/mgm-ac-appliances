import { Helmet } from 'react-helmet-async'
import { services } from '@/content'
import { ServiceGrid } from '@/components/domain/ServiceGrid'

export const ServicesPage = () => (
  <div className="bg-white py-14">
    <Helmet>
      <title>HVAC Services | MGM A/C Appliances</title>
      <meta name="description" content="Comprehensive HVAC repair, installation, emergency response and IAQ services across Florida." />
    </Helmet>
    <div className="container space-y-8">
      <header className="space-y-4">
        <p className="section-title">All services</p>
        <p className="section-subtitle">Enterprise-ready HVAC programs for homeowners, HOAs, commercial properties and developers.</p>
      </header>
      <ServiceGrid services={services} />
    </div>
  </div>
)
