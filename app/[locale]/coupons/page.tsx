import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import CouponsContent from "./CouponsContent";

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
    title: t("coupons.title"),
    description: t("coupons.description"),
    locale,
    path: "/coupons",
  });
}

export default async function CouponsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("coupons");

  const cards = (["c1", "c2"] as const).map((key) => ({
    key,
    badge: t(`cards.${key}.badge`),
    title: t(`cards.${key}.title`),
    desc: t(`cards.${key}.desc`),
    expires: t(`cards.${key}.expires`),
  }));

  return (
    <main>
      <Navbar />
      <PageHeader
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <CouponsContent
        cards={cards}
        printNote={t("printNote")}
        printButton={t("printButton")}
      />

      <Footer />
    </main>
  );
}
