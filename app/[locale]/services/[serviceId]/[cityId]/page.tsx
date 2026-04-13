import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { generatePageMetadata, SITE_NAME } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const SERVICE_IDS = ["installation", "repair", "maintenance"];
const CITY_IDS = ["miami", "miamiBeach", "hialeah", "coralGables", "doral"];

export function generateStaticParams() {
  const locales = ["en", "es"];
  return locales.flatMap((locale) =>
    SERVICE_IDS.flatMap((serviceId) =>
      CITY_IDS.map((cityId) => ({ locale, serviceId, cityId }))
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; serviceId: string; cityId: string }>;
}): Promise<Metadata> {
  const { locale, serviceId, cityId } = await params;
  const svc = await getTranslations({ locale, namespace: "services" });
  const area = await getTranslations({ locale, namespace: "serviceArea" });
  const combo = await getTranslations({ locale, namespace: "serviceCity" });

  if (!SERVICE_IDS.includes(serviceId) || !CITY_IDS.includes(cityId)) return {};

  const serviceName = svc(`${serviceId}.title`);
  const cityName = area(`cities.${cityId}.name`);

  return generatePageMetadata({
    title: combo("metaTitle", { service: serviceName, city: cityName }),
    description: combo("metaDesc", { service: serviceName, city: cityName }),
    locale,
    path: `/services/${serviceId}/${cityId}`,
  });
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ locale: string; serviceId: string; cityId: string }>;
}) {
  const { locale, serviceId, cityId } = await params;
  setRequestLocale(locale);

  if (!SERVICE_IDS.includes(serviceId) || !CITY_IDS.includes(cityId)) notFound();

  const svc = await getTranslations("services");
  const area = await getTranslations("serviceArea");
  const combo = await getTranslations("serviceCity");
  const shared = await getTranslations("shared");

  const serviceName = svc(`${serviceId}.title`);
  const cityName = area(`cities.${cityId}.name`);

  // Build content key — try specific combo first, fall back to generic
  const contentKey = `${serviceId}.${cityId}`;
  const hasSpecificContent = combo.has(`content.${contentKey}.intro`);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: {
      "@type": "HVACBusiness",
      name: "MGM A/C Appliances",
      telephone: "+17863520084",
    },
    areaServed: {
      "@type": "City",
      name: cityName,
    },
    description: hasSpecificContent
      ? combo(`content.${contentKey}.intro`)
      : svc(`${serviceId}.longDesc`),
    inLanguage: locale === "es" ? "es-US" : "en-US",
  };

  return (
    <main>
      <JsonLd data={serviceSchema} />
      <Navbar />
      <PageHeader
        label={svc("label")}
        title={combo("pageTitle", { service: serviceName, city: cityName })}
        subtitle={combo("pageSubtitle", { service: serviceName, city: cityName })}
        showCta
      />

      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb-style links */}
          <div className="flex flex-wrap gap-2 text-sm mb-10">
            <Link href={`/${locale}/services`} className="text-sky-500 hover:text-sky-700 transition-colors">
              {svc("label")}
            </Link>
            <span className="text-slate-300">/</span>
            <Link href={`/${locale}/services/${serviceId}`} className="text-sky-500 hover:text-sky-700 transition-colors">
              {serviceName}
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">{cityName}</span>
          </div>

          {/* Intro content */}
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            {hasSpecificContent
              ? combo(`content.${contentKey}.intro`)
              : combo("genericIntro", { service: serviceName, city: cityName })}
          </p>

          {/* Why choose section */}
          <h2 className="font-bold text-slate-900 text-xl mb-4" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
            {combo("whyChooseTitle", { city: cityName })}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            {hasSpecificContent
              ? combo(`content.${contentKey}.whyChoose`)
              : combo("genericWhyChoose", { service: serviceName, city: cityName })}
          </p>

          {/* Service features from parent service */}
          <h2 className="font-bold text-slate-900 text-xl mb-4" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
            {combo("whatWeOfferTitle")}
          </h2>
          <ul className="space-y-3 mb-10">
            {Array.from({ length: 5 }, (_, i) => {
              if (!svc.has(`${serviceId}.features.${i}`)) return null;
              return (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-sky-500 mt-0.5">&#x2713;</span>
                  <span className="text-slate-600">{svc(`${serviceId}.features.${i}`)}</span>
                </li>
              );
            })}
          </ul>

          {/* Cross-links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Link
              href={`/${locale}/services/${serviceId}`}
              className="bg-sky-50 border border-sky-200 rounded-xl p-5 hover:-translate-y-0.5 transition-all"
            >
              <p className="font-semibold text-slate-900 mb-1">{combo("allServicesLink", { service: serviceName })}</p>
              <p className="text-slate-500 text-sm">{combo("allServicesDesc")}</p>
            </Link>
            <Link
              href={`/${locale}/service-areas/${cityId}`}
              className="bg-sky-50 border border-sky-200 rounded-xl p-5 hover:-translate-y-0.5 transition-all"
            >
              <p className="font-semibold text-slate-900 mb-1">{combo("allCityLink", { city: cityName })}</p>
              <p className="text-slate-500 text-sm">{combo("allCityDesc", { city: cityName })}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-[#0c1e3e] py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-white text-2xl mb-4" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
            {combo("ctaTitle", { service: serviceName, city: cityName })}
          </h2>
          <p className="text-white/60 mb-8">{combo("ctaDesc")}</p>
          <a
            href={`tel:${shared("phoneEnRaw")}`}
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            {combo("ctaButton")}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
