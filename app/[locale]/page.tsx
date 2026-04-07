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
      <Services />
      <WhyUs />
      <ScrollReveal animation="fade-up">
        <Contact />
      </ScrollReveal>
      <Footer />
    </main>
  );
}
