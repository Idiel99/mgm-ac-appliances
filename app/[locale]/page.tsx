import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
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

  return (
    <main className="pb-14 md:pb-0">
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
