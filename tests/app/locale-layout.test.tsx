import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockNextIntl, mockNextNavigation } from "../mocks/next-intl";

describe("LocaleLayout", () => {
  describe("generateStaticParams", () => {
    beforeEach(() => {
      mockNextIntl("en");
      mockNextNavigation();
    });

    it("returns both en and es locales", async () => {
      const { generateStaticParams } = await import(
        "@/app/[locale]/layout"
      );
      const params = generateStaticParams();
      expect(params).toEqual([{ locale: "en" }, { locale: "es" }]);
    });
  });

  describe("generateMetadata", () => {
    beforeEach(() => {
    });

    it("returns correct title for en", async () => {
      mockNextIntl("en");
      mockNextNavigation();
      const { generateMetadata } = await import("@/app/[locale]/layout");
      const metadata = await generateMetadata({
        children: null as any,
        params: Promise.resolve({ locale: "en" }),
      });
      // title is now an object with default + template
      const title = metadata.title as { default: string; template: string };
      expect(title.default).toBe(
        "MGM A/C Appliances — AC Services in South Florida"
      );
      expect(title.template).toBe("%s | MGM A/C Appliances");
    });

    it("returns correct title for es", async () => {
      mockNextIntl("es");
      mockNextNavigation();
      const { generateMetadata } = await import("@/app/[locale]/layout");
      const metadata = await generateMetadata({
        children: null as any,
        params: Promise.resolve({ locale: "es" }),
      });
      const title = metadata.title as { default: string; template: string };
      expect(title.default).toBe(
        "MGM A/C Appliances — Servicios de A/C en South Florida"
      );
    });

    it("includes canonical as a full URL and language alternates with en-US/es-US keys", async () => {
      mockNextIntl("en");
      mockNextNavigation();
      const { generateMetadata } = await import("@/app/[locale]/layout");
      const metadata = await generateMetadata({
        children: null as any,
        params: Promise.resolve({ locale: "en" }),
      });
      expect(metadata.alternates).toBeDefined();
      // canonical should be a full URL
      expect(metadata.alternates!.canonical).toMatch(/^https:\/\//);
      expect(metadata.alternates!.canonical).toContain("/en");
      // language keys should be en-US/es-US/x-default, not bare en/es
      expect(metadata.alternates!.languages).toHaveProperty("en-US");
      expect(metadata.alternates!.languages).toHaveProperty("es-US");
      expect(metadata.alternates!.languages).toHaveProperty("x-default");
      expect(metadata.alternates!.languages).not.toHaveProperty("en");
      expect(metadata.alternates!.languages).not.toHaveProperty("es");
    });

    it("includes metadataBase", async () => {
      mockNextIntl("en");
      mockNextNavigation();
      const { generateMetadata } = await import("@/app/[locale]/layout");
      const metadata = await generateMetadata({
        children: null as any,
        params: Promise.resolve({ locale: "en" }),
      });
      expect(metadata.metadataBase).toBeDefined();
      expect(metadata.metadataBase?.toString()).toContain("mgm-ac-appliances.com");
    });

    it("includes openGraph metadata", async () => {
      mockNextIntl("en");
      mockNextNavigation();
      const { generateMetadata } = await import("@/app/[locale]/layout");
      const metadata = await generateMetadata({
        children: null as any,
        params: Promise.resolve({ locale: "en" }),
      });
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.type).toBe("website");
      expect(metadata.openGraph?.siteName).toBe("MGM A/C Appliances");
    });

    it("includes twitter card metadata", async () => {
      mockNextIntl("en");
      mockNextNavigation();
      const { generateMetadata } = await import("@/app/[locale]/layout");
      const metadata = await generateMetadata({
        children: null as any,
        params: Promise.resolve({ locale: "en" }),
      });
      expect(metadata.twitter).toBeDefined();
      expect(metadata.twitter?.card).toBe("summary_large_image");
    });

    it("includes robots metadata", async () => {
      mockNextIntl("en");
      mockNextNavigation();
      const { generateMetadata } = await import("@/app/[locale]/layout");
      const metadata = await generateMetadata({
        children: null as any,
        params: Promise.resolve({ locale: "en" }),
      });
      expect(metadata.robots).toBeDefined();
    });
  });
});
