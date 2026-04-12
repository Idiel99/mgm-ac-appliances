import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${SITE_NAME} — AC Services in South Florida`,
  description: "Family-owned AC installation, repair, and maintenance across South Florida. Available 24/7. Call (786) 352-0084.",
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: {
      "en-US": `${SITE_URL}/en`,
      "es-US": `${SITE_URL}/es`,
      "x-default": `${SITE_URL}/en`,
    },
  },
};

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/en" />
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
      </div>
    </>
  );
}
