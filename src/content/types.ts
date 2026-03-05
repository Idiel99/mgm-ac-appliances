export interface ServiceFaq {
  question: string
  answer: string
}

export interface ServiceSeo {
  title: string
  description: string
}

export interface ServiceItem {
  slug: string
  name: string
  shortDescription: string
  hero: string
  symptoms: string[]
  includes: string[]
  faq: ServiceFaq[]
  seo: ServiceSeo
  relatedServices: string[]
}

export interface CityItem {
  slug: string
  name: string
  counties: string[]
  neighborhoods: string[]
  hero: string
  coverageText: string
  faq: ServiceFaq[]
  seo: ServiceSeo
}

export interface PlanItem {
  id: string
  name: string
  priceMonthly: number
  priceYearly: number
  perks: string[]
  bestFor: string
}

export interface PostItem {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  readingTime: string
}

export interface ProjectItem {
  id: string
  title: string
  serviceType: string
  city: string
  beforeImage: string
  afterImage: string
  description: string
}
