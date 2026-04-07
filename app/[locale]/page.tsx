import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Navbar />
      <Hero />
      <ScrollReveal animation="fade-right">
        <Services />
      </ScrollReveal>
      <ScrollReveal animation="fade-left">
        <WhyUs />
      </ScrollReveal>
      <ScrollReveal animation="zoom-in">
        <Contact />
      </ScrollReveal>
      <ScrollReveal animation="fade-up">
        <Footer />
      </ScrollReveal>
    </main>
  );
}
