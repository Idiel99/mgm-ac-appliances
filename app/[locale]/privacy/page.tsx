import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

const SECTION_COUNT = 6;

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <main>
      <Navbar />
      <PageHeader label={t("label")} title={t("title")} />

      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-slate-400 text-sm mb-8">{t("lastUpdated")}</p>
          <p className="text-slate-600 text-lg leading-relaxed mb-12 max-w-3xl">
            {t("intro")}
          </p>

          <div className="space-y-10 max-w-3xl">
            {Array.from({ length: SECTION_COUNT }, (_, i) => (
              <div key={i}>
                <h2
                  className="text-xl font-bold text-slate-900 mb-3"
                  style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  {t(`sections.${i}.title`)}
                </h2>
                <p className="text-slate-500 leading-relaxed">
                  {t(`sections.${i}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
