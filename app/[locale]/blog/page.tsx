import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/seo";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const POSTS = ["maintenance-tips", "when-to-replace", "miami-climate-hvac"] as const;

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
    title: t("blog.title"),
    description: t("blog.description"),
    locale,
    path: "/blog",
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  return (
    <main>
      <Navbar />
      <PageHeader label={t("label")} title={t("title")} subtitle={t("subtitle")} />

      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {POSTS.map((slug) => (
            <Link
              key={slug}
              href={`/${locale}/blog/${slug}`}
              className="group bg-sky-50/50 border border-slate-100 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg hover:border-sky-200 transition-all duration-200"
            >
              <span className="text-xs text-slate-400 font-medium">
                {t(`posts.${slug}.date`)}
              </span>
              <h3
                className="font-bold text-slate-900 text-lg mt-2 mb-3 group-hover:text-sky-600 transition-colors"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                {t(`posts.${slug}.title`)}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {t(`posts.${slug}.excerpt`)}
              </p>
              <span className="text-sky-500 font-semibold text-sm group-hover:text-sky-700 transition-colors">
                {t("readMore")} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
