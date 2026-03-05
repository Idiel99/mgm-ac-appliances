import { Helmet } from 'react-helmet-async'
import { Hero } from '@/components/domain/Hero'
import { TrustBadges } from '@/components/domain/TrustBadges'
import { ServiceGrid } from '@/components/domain/ServiceGrid'
import { CityGrid } from '@/components/domain/CityGrid'
import { TestimonialCarousel } from '@/components/domain/TestimonialCarousel'
import { BlogGrid } from '@/components/domain/BlogGrid'
import { services, cities, posts } from '@/content'
import { Button } from '@/components/ui/Button'

const testimonials = [
  { quote: 'Technician arrived fast and fixed our AC the same day.', author: 'Maria P.', city: 'Miami Beach' },
  { quote: 'Felt like working with family—the owners even called afterward to check temperatures.', author: 'Andre V.', city: 'Fort Lauderdale' },
  { quote: 'They remember our kids’ names and still deliver enterprise-level quality.', author: 'Lena S.', city: 'Brickell' }
]

export const HomePage = () => (
  <>
    <Helmet>
      <title>MGM A/C Appliances | Enterprise HVAC Services for Miami & Beyond</title>
      <meta
        name="description"
        content="Family-owned MGM A/C Appliances delivers premium HVAC repair, installation and maintenance with 24/7 response across Miami, Fort Lauderdale, Orlando and Tampa."
      />
    </Helmet>
    <Hero
      title="MGM A/C Appliances — Florida’s Family HVAC Partner"
      subtitle="Three generations of the MGM family deliver 24/7 care for homes, HOAs, commercial spaces and mission-critical facilities across Miami, Fort Lauderdale, Orlando and Tampa."
      highlight="Family owned & operated"
    />

    <section className="bg-brand-light py-14">
      <div className="container space-y-8">
        <div>
          <p className="section-title">Insured. Battle-tested for Miami heat.</p>
          <p className="section-subtitle">Trusted by 8,000+ homeowners and 120 commercial properties.</p>
        </div>
        <TrustBadges />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Three-generation roots',
              copy: 'Grandparents started in Hialeah garages; today their kids and grandkids still run every crew.'
            },
            {
              title: 'Neighbors first',
              copy: 'Technicians live in the same neighborhoods they serve—no outsourced call centers.'
            },
            {
              title: 'Hands-on ownership',
              copy: 'An MGM family member reviews every major install and follows up with homeowners personally.'
            }
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-6 shadow-card">
              <p className="text-xl font-semibold text-brand-dark">{item.title}</p>
              <p className="mt-2 text-slate-600">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-14">
      <div className="container space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-title">Flagship HVAC services</p>
            <p className="section-subtitle">From emergency repair to multi-zone installs engineered for Florida humidity.</p>
          </div>
          <Button variant="secondary" onClick={() => (window.location.href = '/services')}>
            View all services
          </Button>
        </div>
        <ServiceGrid services={services.slice(0, 6)} />
      </div>
    </section>

    <section className="bg-brand-dark py-12 text-white">
      <div className="container flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-3xl font-semibold">24/7 Emergency HVAC Command</p>
          <p className="mt-3 text-white/80">Live humans answer within 60 seconds. Fleet GPS tracking + temporary cooling assets ready for data rooms & luxury residences.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => (window.location.href = 'tel:+13055550100')}>Call Now</Button>
          <Button variant="secondary" onClick={() => (window.location.href = '/emergency-hvac')}>
            Emergency Details
          </Button>
        </div>
      </div>
    </section>

    <section className="bg-white py-14">
      <div className="container space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-title">Florida coverage</p>
            <p className="section-subtitle">Local teams embedded in every metro for lightning response.</p>
          </div>
          <Button variant="secondary" onClick={() => (window.location.href = '/service-areas')}>
            Explore service areas
          </Button>
        </div>
        <CityGrid cities={cities} />
      </div>
    </section>

    <section className="bg-brand-light py-14">
      <div className="container space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-title">Homeowner + HOA love</p>
            <p className="section-subtitle">Straight from recent dispatches across Miami-Dade.</p>
          </div>
        </div>
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>

    <section className="bg-white py-14">
      <div className="container space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-title">HVAC Learning Center</p>
            <p className="section-subtitle">Practical HVAC intelligence written for South Florida properties.</p>
          </div>
          <Button variant="secondary" onClick={() => (window.location.href = '/blog')}>
            View blog
          </Button>
        </div>
        <BlogGrid posts={posts} />
      </div>
    </section>
  </>
)
