import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { generatePageMetadata, SITE_NAME } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const CITY_IDS = [
  "miami", "miamiBeach", "hialeah", "miamiGardens", "aventura",
  "coralGables", "doral", "kendall", "homestead", "theKeys",
  "fortLauderdale", "hollywood", "bocaraton", "westPalmBeach",
  "naples", "fortMyers",
];

export function generateStaticParams() {
  const locales = ["en", "es"];
  return locales.flatMap((locale) =>
    CITY_IDS.map((cityId) => ({ locale, cityId }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; cityId: string }>;
}): Promise<Metadata> {
  const { locale, cityId } = await params;
  const t = await getTranslations({ locale, namespace: "serviceArea" });

  if (!CITY_IDS.includes(cityId)) return {};

  const cityName = t(`cities.${cityId}.name`);
  const title = locale === "es"
    ? `Servicios de Aire Acondicionado en ${cityName}, FL | ${SITE_NAME}`
    : `AC Services in ${cityName}, FL | ${SITE_NAME}`;
  const description = t(`cities.${cityId}.desc`);

  return generatePageMetadata({
    title,
    description,
    locale,
    path: `/service-areas/${cityId}`,
  });
}

export default async function CityDetailPage({
  params,
}: {
  params: Promise<{ locale: string; cityId: string }>;
}) {
  const { locale, cityId } = await params;
  setRequestLocale(locale);

  if (!CITY_IDS.includes(cityId)) notFound();

  const t = await getTranslations("serviceArea");
  const shared = await getTranslations("shared");

  const neighborhoods: string[] = [];
  for (let i = 0; i < 10; i++) {
    if (!t.has(`cities.${cityId}.neighborhoods.${i}`)) break;
    neighborhoods.push(t(`cities.${cityId}.neighborhoods.${i}`));
  }

  return (
    <main>
      <Navbar />
      <PageHeader
        label={t("label")}
        title={t(`cities.${cityId}.name`)}
        subtitle={t(`cities.${cityId}.desc`)}
        showCta
      />

      {/* Long description */}
      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-600 text-lg leading-relaxed mb-12">
            {t(`cities.${cityId}.longDesc`)}
          </p>

          {/* Neighborhoods */}
          <div>
            <h2 className="font-bold text-slate-900 text-xl mb-6" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
              {t(`cities.${cityId}.name`)} — {t("neighborhoodsTitle")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {neighborhoods.map((n, i) => (
                <div
                  key={i}
                  className="bg-sky-50/50 border border-slate-100 rounded-lg px-4 py-3 text-sm text-slate-700 text-center"
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-[#0c1e3e] py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-white text-2xl mb-4" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
            {t(`cities.${cityId}.name`)} — {t("cityCtaTitle")}
          </h2>
          <p className="text-white/60 mb-8">{t("cta")}</p>
          <a
            href={`tel:${shared("phoneEnRaw")}`}
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            {t("cityCtaButton")}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
