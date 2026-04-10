import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ServiceAreaMapLoader from "@/components/ServiceAreaMapLoader";

const CITIES = [
  { id: "miami" },
  { id: "miamiBeach" },
  { id: "hialeah" },
  { id: "miamiGardens" },
  { id: "aventura" },
  { id: "coralGables" },
  { id: "doral" },
  { id: "kendall" },
  { id: "homestead" },
  { id: "theKeys" },
  { id: "fortLauderdale" },
  { id: "hollywood" },
  { id: "bocaraton" },
  { id: "westPalmBeach" },
  { id: "naples" },
  { id: "fortMyers" },
] as const;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export default async function ServiceAreasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("serviceArea");

  return (
    <main>
      <Navbar />
      <PageHeader label={t("label")} title={t("title")} subtitle={t("subtitle")} />

      {/* Map */}
      <section className="bg-slate-50 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <ServiceAreaMapLoader />
        </div>
      </section>

      {/* City cards */}
      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CITIES.map(({ id }) => (
            <Link
              key={id}
              href={`/${locale}/service-areas/${id}`}
              className="group bg-sky-50/50 border border-slate-100 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg hover:border-sky-200 transition-all duration-200"
            >
              <h3 className="font-bold text-slate-900 text-lg mb-2" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
                {t(`cities.${id}.name`)}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{t(`cities.${id}.desc`)}</p>
              <span className="inline-block mt-4 text-sky-500 font-semibold text-sm group-hover:text-sky-700 transition-colors">
                {t("learnMore")} &rarr;
              </span>
            </Link>
          ))}
        </div>

        <p className="text-center text-slate-500 mt-12">{t("cta")}</p>
      </section>

      <Footer />
    </main>
  );
}
