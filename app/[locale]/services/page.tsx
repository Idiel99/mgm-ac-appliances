import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/seo";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const SERVICES = [
  { id: "installation", icon: "\u{1F3D7}\uFE0F" },
  { id: "repair", icon: "\uD83D\uDD27" },
  { id: "maintenance", icon: "\uD83D\uDEE1\uFE0F" },
  { id: "commercial", icon: "\uD83C\uDFE2" },
  { id: "residential", icon: "\uD83C\uDFE0" },
  { id: "emergency", icon: "\uD83D\uDEA8" },
] as const;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return generatePageMetadata({
    title: t("services.title"),
    description: t("services.description"),
    locale,
    path: "/services",
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <main>
      <Navbar />
      <PageHeader label={t("label")} title={t("title")} subtitle={t("subtitle")} />
      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ id, icon }) => (
            <Link
              key={id}
              href={`/${locale}/services/${id}`}
              className="group bg-sky-50/50 border border-slate-100 rounded-2xl p-8 text-center hover:-translate-y-1 hover:shadow-lg hover:border-sky-200 transition-all duration-200"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-bold text-slate-900 text-lg mb-2" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
                {t(`${id}.title`)}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{t(`${id}.desc`)}</p>
              <span className="inline-block mt-4 text-sky-500 font-semibold text-sm group-hover:text-sky-700 transition-colors">
                {t("viewAll")} &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
