import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

const warrantyTypes = [
  { key: "labor", icon: "\u{1F6E1}\uFE0F" },
  { key: "parts", icon: "\u2699\uFE0F" },
  { key: "satisfaction", icon: "\u2705" },
] as const;

export default async function WarrantyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("warranty");

  return (
    <main>
      <Navbar />
      <PageHeader
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {warrantyTypes.map(({ key, icon }) => (
              <div
                key={key}
                className="bg-sky-50 rounded-2xl border border-slate-200 p-8 text-center hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="text-5xl mb-5">{icon}</div>
                <h3
                  className="text-xl font-bold text-slate-900 mb-3"
                  style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  {t(`types.${key}.title`)}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {t(`types.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-50 py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-2xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            {t("noteHeading")}
          </h2>
          <p className="text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {t("noteBody")}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
