import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

const benefitKeys = ["b1", "b2", "b3", "b4", "b5"] as const;

export default async function FinancingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("financing");
  const shared = await getTranslations("shared");

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
          <p className="text-slate-600 text-lg leading-relaxed mb-12 max-w-3xl">
            {t("body")}
          </p>

          <div className="bg-sky-50 rounded-2xl border border-slate-200 p-8 mb-12 max-w-2xl">
            <h2
              className="text-2xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {t("benefitsHeading")}
            </h2>
            <ul className="space-y-4">
              {benefitKeys.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span className="text-sky-500 mt-1 shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-slate-600 leading-relaxed">
                    {t(`benefits.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-[#0c1e3e] rounded-2xl p-8 text-center max-w-2xl">
            <h3
              className="text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {t("ctaTitle")}
            </h3>
            <p className="text-white/60 mb-6">{t("ctaDesc")}</p>
            <a
              href={`tel:${shared("phoneEnRaw")}`}
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              {t("ctaButton")}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
