import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { generatePageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const SLUGS = ["maintenance-tips", "when-to-replace", "miami-climate-hvac", "what-is-the-5000-rule", "ac-repair-cost-miami", "ac-not-working-what-to-check", "repair-vs-replace-ac", "new-ac-cost-florida", "best-ac-temperature-florida", "hurricane-season-ac-prep-miami", "central-ac-vs-mini-split-florida", "why-ac-struggles-july-august", "lower-fpl-bill-summer", "ac-duct-cleaning-miami", "what-seer-rating-2026"];

export function generateStaticParams() {
  const locales = ["en", "es"];
  return locales.flatMap((locale) =>
    SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  if (!SLUGS.includes(slug)) return {};

  return generatePageMetadata({
    title: t(`posts.${slug}.title`),
    description: t(`posts.${slug}.title`),
    locale,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!SLUGS.includes(slug)) notFound();

  const t = await getTranslations("blog");

  const contentParagraphs: string[] = [];
  for (let i = 0; i < 10; i++) {
    if (!t.has(`posts.${slug}.content.${i}`)) break;
    contentParagraphs.push(t(`posts.${slug}.content.${i}`));
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t(`posts.${slug}.title`),
    datePublished: t(`posts.${slug}.date`),
    inLanguage: locale === "es" ? "es-US" : "en-US",
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/blog/${slug}`,
    },
  };

  return (
    <main>
      <JsonLd data={articleSchema} />
      <Navbar />
      <PageHeader
        label={t("label")}
        title={t(`posts.${slug}.title`)}
        subtitle={t(`posts.${slug}.date`)}
      />

      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-1 text-sky-500 hover:text-sky-700 text-sm font-medium mb-8 transition-colors"
          >
            ← {t("backToBlog")}
          </Link>

          <article className="prose-custom">
            {contentParagraphs.map((p, i) => {
              const parts = p.split(/(\*\*.*?\*\*)/g);
              return (
                <p key={i} className="text-slate-600 text-base leading-relaxed mb-6">
                  {parts.map((part, j) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return (
                        <strong key={j} className="text-slate-800 font-semibold">
                          {part.slice(2, -2)}
                        </strong>
                      );
                    }
                    return <span key={j}>{part}</span>;
                  })}
                </p>
              );
            })}
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
