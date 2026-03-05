import servicesData from './services.json'
import citiesData from './cities.json'
import plansData from './plans.json'
import postsData from './posts.json'
import projectsData from './projects.json'
import type { CityItem, PlanItem, PostItem, ProjectItem, ServiceItem } from './types'

export const services = servicesData as ServiceItem[]
export const cities = citiesData as CityItem[]
export const plans = plansData as PlanItem[]
export const posts = postsData as PostItem[]
export const projects = projectsData as ProjectItem[]

export const getServiceBySlug = (slug?: string) =>
  services.find((service) => service.slug === slug)

export const getCityBySlug = (slug?: string) =>
  cities.find((city) => city.slug === slug)

export const getPostBySlug = (slug?: string) =>
  posts.find((post) => post.slug === slug)
