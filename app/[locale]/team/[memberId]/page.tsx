import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { generatePageMetadata, SITE_NAME } from "@/lib/seo";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const MEMBER_IDS = ["member1", "member2", "member3"];

export function generateStaticParams() {
  const locales = ["en", "es"];
  return locales.flatMap((locale) =>
    MEMBER_IDS.map((memberId) => ({ locale, memberId }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; memberId: string }>;
}): Promise<Metadata> {
  const { locale, memberId } = await params;
  const t = await getTranslations({ locale, namespace: "team" });

  if (!MEMBER_IDS.includes(memberId)) return {};

  const name = t(`members.${memberId}.name`);
  const role = t(`members.${memberId}.role`);

  return generatePageMetadata({
    title: `${name} — ${role} | ${SITE_NAME}`,
    description: t(`members.${memberId}.bio`),
    locale,
    path: `/team/${memberId}`,
  });
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ locale: string; memberId: string }>;
}) {
  const { locale, memberId } = await params;
  setRequestLocale(locale);

  if (!MEMBER_IDS.includes(memberId)) notFound();

  const t = await getTranslations("team");

  const specialties: string[] = [];
  for (let i = 0; i < 5; i++) {
    if (!t.has(`members.${memberId}.specialties.${i}`)) break;
    specialties.push(t(`members.${memberId}.specialties.${i}`));
  }

  return (
    <main>
      <Navbar />
      <PageHeader
        label={t("label")}
        title={t(`members.${memberId}.name`)}
        subtitle={t(`members.${memberId}.role`)}
      />

      <section className="bg-white py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${locale}/team`}
            className="inline-flex items-center gap-1 text-sky-500 hover:text-sky-700 text-sm font-medium mb-10 transition-colors"
          >
            ← {t("backToTeam")}
          </Link>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Placeholder person icon */}
            <div className="w-48 h-48 shrink-0 rounded-2xl bg-slate-200 flex items-center justify-center mx-auto md:mx-0">
              <svg
                className="w-24 h-24 text-slate-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>

            <div className="flex-1">
              {/* Quote */}
              <blockquote className="border-l-4 border-sky-500 pl-5 mb-8">
                <p className="text-slate-700 text-lg italic leading-relaxed">
                  &ldquo;{t(`members.${memberId}.quote`)}&rdquo;
                </p>
              </blockquote>

              {/* Long bio */}
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                {t(`members.${memberId}.longBio`)}
              </p>

              {/* Specialties */}
              {specialties.length > 0 && (
                <div>
                  <h2
                    className="font-bold text-slate-900 text-lg mb-4"
                    style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                  >
                    {t("specialtiesTitle")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((s, i) => (
                      <span
                        key={i}
                        className="bg-sky-50 text-sky-700 text-sm font-medium px-4 py-2 rounded-full border border-sky-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
