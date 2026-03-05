import type { ServiceItem } from '@/content/types'
import { ServiceCard } from './ServiceCard'

interface ServiceGridProps {
  services: ServiceItem[]
}

export const ServiceGrid = ({ services }: ServiceGridProps) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {services.map((service) => (
      <ServiceCard key={service.slug} service={service} />
    ))}
  </div>
)
