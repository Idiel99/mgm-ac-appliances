import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuotePageContent from "@/components/admin/QuotePageContent";

export const metadata: Metadata = {
  title: "Quote Generator | MGM A/C Appliances",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Navbar />
      <QuotePageContent />
      <Footer />
    </main>
  );
}
