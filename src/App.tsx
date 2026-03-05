import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AppShell } from '@/components/layout/AppShell'
import { HomePage } from '@/pages/HomePage'
import { ServicesPage } from '@/pages/ServicesPage'
import { ServiceDetailPage } from '@/pages/ServiceDetailPage'
import { ServiceAreasPage } from '@/pages/ServiceAreasPage'
import { CityPage } from '@/pages/CityPage'
import { MaintenancePlansPage } from '@/pages/MaintenancePlansPage'
import { FinancingPage } from '@/pages/FinancingPage'
import { BookingPage } from '@/pages/BookingPage'
import { GalleryPage } from '@/pages/GalleryPage'
import { BlogPage } from '@/pages/BlogPage'
import { BlogPostPage } from '@/pages/BlogPostPage'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { TermsPage } from '@/pages/TermsPage'
import { CommercialHVACPage } from '@/pages/CommercialHVACPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppShell />}>
      <Route index element={<HomePage />} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="services/:serviceSlug" element={<ServiceDetailPage />} />
      <Route path="service-areas" element={<ServiceAreasPage />} />
      <Route path="service-areas/:citySlug" element={<CityPage />} />
      <Route path="maintenance-plans" element={<MaintenancePlansPage />} />
      <Route path="financing" element={<FinancingPage />} />
      <Route path="booking" element={<BookingPage />} />
      <Route path="gallery" element={<GalleryPage />} />
      <Route path="blog" element={<BlogPage />} />
      <Route path="blog/:postSlug" element={<BlogPostPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="commercial-hvac" element={<CommercialHVACPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="privacy" element={<PrivacyPage />} />
      <Route path="terms" element={<TermsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
