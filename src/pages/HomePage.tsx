import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Hero } from '@/components/domain/Hero'
import { TrustBadges } from '@/components/domain/TrustBadges'
import { ServiceGrid } from '@/components/domain/ServiceGrid'
import { CityGrid } from '@/components/domain/CityGrid'
import { TestimonialCarousel } from '@/components/domain/TestimonialCarousel'
import { BlogGrid } from '@/components/domain/BlogGrid'
import { services, cities, posts } from '@/content'
import { Button } from '@/components/ui/Button'
import { useCopy } from '@/context/LanguageContext'
import { CONTACT_PHONE_LINK } from '@/config/site'

export const HomePage = () => {
  const navigate = useNavigate()
  const copy = useCopy()

  return (
    <>
      <Helmet>
        <title>MGM A/C Appliances | Enterprise HVAC Services for Miami & Beyond</title>
        <meta
          name="description"
          content="Family-owned MGM A/C Appliances delivers premium HVAC repair, installation and maintenance with 24/7 response across Miami, Fort Lauderdale, Orlando and Tampa."
        />
      </Helmet>
      <Hero
        title={copy.hero.title}
        subtitle={copy.hero.subtitle}
        highlight={copy.hero.highlight}
        stats={copy.hero.stats}
        callLabel={copy.hero.callLabel}
        primaryCtaLabel={copy.hero.primaryCta}
        coverageEyebrow={copy.hero.coverageEyebrow}
        coverageTitle={copy.hero.coverageTitle}
        coverageBody={copy.hero.coverageBody}
        coveragePoints={copy.hero.coveragePoints}
      />

      <section className="bg-brand-light py-14">
        <div className="container space-y-8">
          <div>
            <p className="section-title">{copy.home.familySection.title}</p>
            <p className="section-subtitle">{copy.home.familySection.subtitle}</p>
          </div>
          <TrustBadges items={copy.home.trustBadges} />
          <div className="grid gap-4 md:grid-cols-3">
            {copy.home.familySection.cards.map((item) => (
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
              <p className="section-title">{copy.home.servicesSection.title}</p>
              <p className="section-subtitle">{copy.home.servicesSection.subtitle}</p>
            </div>
            <Button variant="secondary" onClick={() => navigate('/services')}>
              {copy.home.servicesSection.cta}
            </Button>
          </div>
          <ServiceGrid services={services.slice(0, 6)} />
        </div>
      </section>

      <section className="bg-brand-dark py-12 text-white">
        <div className="container flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-3xl font-semibold">{copy.home.emergencySection.title}</p>
            <p className="mt-3 text-white/80">{copy.home.emergencySection.subtitle}</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => (window.location.href = CONTACT_PHONE_LINK)}>{copy.header.callNow}</Button>
            <Button variant="secondary" onClick={() => navigate('/services/emergency-hvac')}>
              {copy.home.emergencySection.detailsCta}
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="section-title">{copy.home.coverageSection.title}</p>
              <p className="section-subtitle">{copy.home.coverageSection.subtitle}</p>
            </div>
            <Button variant="secondary" onClick={() => navigate('/service-areas')}>
              {copy.home.coverageSection.cta}
            </Button>
          </div>
          <CityGrid cities={cities} />
        </div>
      </section>

      <section className="bg-brand-light py-14">
        <div className="container space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="section-title">{copy.home.testimonialsSection.title}</p>
              <p className="section-subtitle">{copy.home.testimonialsSection.subtitle}</p>
            </div>
          </div>
          <TestimonialCarousel testimonials={copy.home.testimonialsSection.items} />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="section-title">{copy.home.blogSection.title}</p>
              <p className="section-subtitle">{copy.home.blogSection.subtitle}</p>
            </div>
            <Button variant="secondary" onClick={() => navigate('/blog')}>
              {copy.home.blogSection.cta}
            </Button>
          </div>
          <BlogGrid posts={posts} />
        </div>
      </section>
    </>
  )
}
