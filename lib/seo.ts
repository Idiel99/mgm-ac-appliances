import type { Metadata } from "next";

export const SITE_URL = "https://mgm-ac-appliances.com";
export const SITE_NAME = "MGM A/C Appliances";

type PageMetadataOptions = {
  title: string;
  description: string;
  locale: string;
  path: string;
};

export function generatePageMetadata({
  title,
  description,
  locale,
  path,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "en-US": `${SITE_URL}/en${path}`,
        "es-US": `${SITE_URL}/es${path}`,
        "x-default": `${SITE_URL}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_US" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
