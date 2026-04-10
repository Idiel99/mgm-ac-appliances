import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const SLUGS = ["maintenance-tips", "when-to-replace", "miami-climate-hvac"];

export function generateStaticParams() {
  const locales = ["en", "es"];
  return locales.flatMap((locale) =>
    SLUGS.map((slug) => ({ locale, slug }))
  );
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

  return (
    <main>
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
