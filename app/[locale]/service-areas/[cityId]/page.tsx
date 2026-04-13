import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
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
  const svcT = await getTranslations("services");

  const neighborhoods: string[] = [];
  for (let i = 0; i < 10; i++) {
    if (!t.has(`cities.${cityId}.neighborhoods.${i}`)) break;
    neighborhoods.push(t(`cities.${cityId}.neighborhoods.${i}`));
  }

  const commonIssues: string[] = [];
  for (let i = 0; i < 6; i++) {
    if (!t.has(`cities.${cityId}.commonIssues.${i}`)) break;
    commonIssues.push(t(`cities.${cityId}.commonIssues.${i}`));
  }

  const hasExpandedContent = t.has(`cities.${cityId}.housingInfo`);

  return (
    <main>
      <Navbar />
      <PageHeader
        label={t("label")}
        title={t(`cities.${cityId}.name`)}
        subtitle={t(`cities.${cityId}.desc`)}
        showCta
        path={`/service-areas/${cityId}`}
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

      {/* Local AC Challenges */}
      {hasExpandedContent && (
        <section className="bg-slate-50 py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-bold text-slate-900 text-2xl mb-4" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
              {t("localChallengesTitle")}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {t(`cities.${cityId}.climateChallenge`)}
            </p>
            {commonIssues.length > 0 && (
              <ul className="space-y-3">
                {commonIssues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-sky-500 block" />
                    </span>
                    <span className="text-slate-700">{issue}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* Housing & HVAC */}
      {hasExpandedContent && (
        <section className="bg-white py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-bold text-slate-900 text-2xl mb-4" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
              {t("housingTitle")} {t(`cities.${cityId}.name`)}
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {t(`cities.${cityId}.housingInfo`)}
            </p>
          </div>
        </section>
      )}

      {/* Pro Tip */}
      {hasExpandedContent && (
        <section className="bg-sky-500 py-12 px-4 md:px-8">
          <div className="max-w-4xl mx-auto flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white text-xl">
              💡
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-2" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
                {t("localTipTitle")}
              </h3>
              <p className="text-white/90 leading-relaxed">
                {t(`cities.${cityId}.localTip`)}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {hasExpandedContent && (
        <section className="bg-slate-50 py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-bold text-slate-900 text-2xl mb-8" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
              {t("testimonialTitle")}
            </h2>
            <blockquote className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-slate-700 text-lg leading-relaxed italic mb-6">
                &ldquo;{t(`cities.${cityId}.testimonial.text`)}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-sm">
                  {t(`cities.${cityId}.testimonial.name`).charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{t(`cities.${cityId}.testimonial.name`)}</p>
                  <p className="text-slate-500 text-sm">{t(`cities.${cityId}.name`)} · {t(`cities.${cityId}.testimonial.date`)}</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* Our Services */}
      <section className="bg-sky-50 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-slate-900 text-xl mb-6" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
            {t("servicesInCity", { city: t(`cities.${cityId}.name`) })}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["installation", "repair", "maintenance", "commercial", "residential", "emergency"].map((svcId) => (
              <Link
                key={svcId}
                href={`/${locale}/services/${svcId}`}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-slate-900 mb-1" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
                  {svcT(`${svcId}.title`)}
                </h3>
                <p className="text-slate-500 text-sm">{svcT(`${svcId}.desc`)}</p>
              </Link>
            ))}
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
