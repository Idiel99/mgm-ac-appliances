import { setRequestLocale, getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";
import Hero from "@/components/Hero";
import SpecialOffers from "@/components/SpecialOffers";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyCallBar from "@/components/StickyCallBar";
import ScrollReveal from "@/components/ScrollReveal";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const faqT = await getTranslations({ locale, namespace: "faq" });
  const metaT = await getTranslations({ locale, namespace: "metadata" });

  const faqItems = Array.from({ length: 8 }, (_, i) => ({
    "@type": "Question" as const,
    name: faqT(`items.${i}.q`),
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: faqT(`items.${i}.a`),
    },
  }));

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: "MGM A/C Appliances",
    url: SITE_URL,
    telephone: "+17863520084",
    email: "sales@mgm-ac-appliances.com",
    description: metaT("description"),
    inLanguage: locale === "es" ? "es-US" : "en-US",
    availableLanguage: ["en", "es"],
    knowsLanguage: ["en", "es"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Miami",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Miami" },
      { "@type": "City", name: "Miami Beach" },
      { "@type": "City", name: "Hialeah" },
      { "@type": "City", name: "Coral Gables" },
      { "@type": "City", name: "Doral" },
      { "@type": "City", name: "Kendall" },
      { "@type": "City", name: "Homestead" },
      { "@type": "City", name: "Miami Gardens" },
      { "@type": "City", name: "Aventura" },
      { "@type": "City", name: "Fort Lauderdale" },
      { "@type": "City", name: "Hollywood" },
      { "@type": "City", name: "Boca Raton" },
      { "@type": "City", name: "West Palm Beach" },
      { "@type": "City", name: "Naples" },
      { "@type": "City", name: "Fort Myers" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+17863520084",
        contactType: "customer service",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        telephone: "+13057208273",
        contactType: "customer service",
        availableLanguage: "Spanish",
      },
      {
        "@type": "ContactPoint",
        telephone: "+17863520084",
        contactType: "emergency",
        availableLanguage: ["English", "Spanish"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
    priceRange: "$$",
    paymentAccepted: ["Cash", "Credit Card", "Check", "Financing"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HVAC Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Repair" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Maintenance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial HVAC" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency AC Repair" } },
      ],
    },
    sameAs: [],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };

  return (
    <main className="pb-14 md:pb-0">
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />
      <Navbar />
      <Hero />
      <ScrollReveal animation="fade-up">
        <SpecialOffers />
      </ScrollReveal>
      <ScrollReveal animation="fade-right">
        <Services />
      </ScrollReveal>
      <ScrollReveal animation="fade-left">
        <WhyUs />
      </ScrollReveal>
      <ScrollReveal animation="fade-up">
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal animation="zoom-in">
        <FAQ />
      </ScrollReveal>
      <ScrollReveal animation="zoom-in">
        <Contact />
      </ScrollReveal>
      <ScrollReveal animation="fade-up">
        <Footer />
      </ScrollReveal>
      <StickyCallBar />
    </main>
  );
}
