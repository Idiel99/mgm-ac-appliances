import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

const values = [
  { key: "honesty", icon: "\u{1F4B0}" },
  { key: "quality", icon: "\u2B50" },
  { key: "community", icon: "\u{1F3D8}\uFE0F" },
  { key: "bilingual", icon: "\u{1F5E3}\uFE0F" },
] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <main>
      <Navbar />
      <PageHeader
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Story Section */}
      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-black text-slate-900 mb-8 tracking-[-0.5px]"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            {t("storyHeading")}
          </h2>
          <div className="space-y-5 text-slate-600 leading-relaxed text-lg max-w-3xl">
            <p>{t("story.p1")}</p>
            <p>{t("story.p2")}</p>
            <p>{t("story.p3")}</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-sky-50 py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-black text-slate-900 mb-12 tracking-[-0.5px] text-center"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            {t("valuesHeading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ key, icon }) => (
              <div
                key={key}
                className="bg-white rounded-2xl border border-slate-100 p-6 text-center hover:-translate-y-1 transition-transform duration-200 shadow-sm"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3
                  className="text-lg font-bold text-slate-900 mb-2"
                  style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  {t(`values.${key}.title`)}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t(`values.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {(["years", "customers", "services", "satisfaction"] as const).map(
              (key) => (
                <div key={key}>
                  <div
                    className="text-4xl font-black text-sky-500 mb-1"
                    style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                  >
                    {t(`stats.${key}`)}
                  </div>
                  <div className="text-slate-500 text-sm font-medium">
                    {t(`stats.${key}Label`)}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
