import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const MEMBER_IDS = ["member1", "member2", "member3"] as const;

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
    title: t("team.title"),
    description: t("team.description"),
    locale,
    path: "/team",
  });
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("team");

  return (
    <main>
      <Navbar />
      <PageHeader
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MEMBER_IDS.map((id) => (
            <Link
              key={id}
              href={`/${locale}/team/${id}`}
              className="group bg-sky-50/50 border border-slate-100 rounded-2xl p-8 text-center hover:-translate-y-1 hover:shadow-lg hover:border-sky-200 transition-all duration-200"
            >
              {/* Placeholder person icon */}
              <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-slate-200 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-slate-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
              <h3
                className="font-bold text-slate-900 text-xl mb-1 group-hover:text-sky-600 transition-colors"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                {t(`members.${id}.name`)}
              </h3>
              <p className="text-sky-600 font-medium text-sm mb-3">
                {t(`members.${id}.role`)}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t(`members.${id}.bio`)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
