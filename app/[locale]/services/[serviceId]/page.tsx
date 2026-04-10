import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const SERVICE_IDS = ["installation", "repair", "maintenance", "commercial", "residential", "emergency"];

export function generateStaticParams() {
  const locales = ["en", "es"];
  return locales.flatMap((locale) =>
    SERVICE_IDS.map((serviceId) => ({ locale, serviceId }))
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; serviceId: string }>;
}) {
  const { locale, serviceId } = await params;
  setRequestLocale(locale);

  if (!SERVICE_IDS.includes(serviceId)) notFound();

  const t = await getTranslations("services");
  const shared = await getTranslations("shared");

  const features: string[] = [];
  for (let i = 0; i < 5; i++) {
    if (!t.has(`${serviceId}.features.${i}`)) break;
    features.push(t(`${serviceId}.features.${i}`));
  }

  const signs: string[] = [];
  for (let i = 0; i < 5; i++) {
    if (!t.has(`${serviceId}.signs.${i}`)) break;
    signs.push(t(`${serviceId}.signs.${i}`));
  }

  return (
    <main>
      <Navbar />
      <PageHeader
        label={t("label")}
        title={t(`${serviceId}.title`)}
        subtitle={t(`${serviceId}.desc`)}
        showCta
      />

      {/* Long description */}
      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-600 text-lg leading-relaxed mb-12">
            {t(`${serviceId}.longDesc`)}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Features */}
            <div>
              <h2 className="font-bold text-slate-900 text-xl mb-6" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
                {t("featuresTitle")}
              </h2>
              <ul className="space-y-3">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-sky-500 mt-0.5">&#x2713;</span>
                    <span className="text-slate-600 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Signs */}
            <div>
              <h2 className="font-bold text-slate-900 text-xl mb-6" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
                {t("signsTitle")}
              </h2>
              <ul className="space-y-3">
                {signs.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-amber-500 mt-0.5">&#x26A0;</span>
                    <span className="text-slate-600 text-sm">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose + CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-[#0c1e3e] py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-black text-white text-2xl mb-4" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
            {t("ctaTitle")}
          </h2>
          <p className="text-white/60 mb-8">{t("ctaDesc")}</p>
          <a
            href={`tel:${shared("phoneEnRaw")}`}
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            {t("ctaButton")}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
