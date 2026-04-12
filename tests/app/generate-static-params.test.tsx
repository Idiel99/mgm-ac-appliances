import { describe, it, expect, beforeEach, vi } from "vitest";
import { mockNextIntl, mockNextNavigation } from "../mocks/next-intl";

beforeEach(() => {
  mockNextIntl("en");
  mockNextNavigation();
});

describe("generateStaticParams — locale-only pages", () => {
  const localeOnlyPages = [
    { name: "about", path: "@/app/[locale]/about/page" },
    { name: "financing", path: "@/app/[locale]/financing/page" },
    { name: "warranty", path: "@/app/[locale]/warranty/page" },
    { name: "privacy", path: "@/app/[locale]/privacy/page" },
    { name: "blog index", path: "@/app/[locale]/blog/page" },
    { name: "services index", path: "@/app/[locale]/services/page" },
    {
      name: "service-areas index",
      path: "@/app/[locale]/service-areas/page",
    },
    { name: "coupons", path: "@/app/[locale]/coupons/page" },
  ];

  it.each(localeOnlyPages)(
    "$name returns both en and es locales",
    async ({ path }) => {
      const mod = await import(path);
      const params = mod.generateStaticParams();
      expect(params).toEqual(
        expect.arrayContaining([{ locale: "en" }, { locale: "es" }])
      );
      expect(params.length).toBe(2);
    }
  );
});

describe("generateStaticParams — dynamic pages", () => {
  it("services/[serviceId] returns 12 entries (6 services x 2 locales)", async () => {
    const mod = await import("@/app/[locale]/services/[serviceId]/page");
    const params = mod.generateStaticParams();
    expect(params.length).toBe(12);

    const locales = [...new Set(params.map((p: any) => p.locale))];
    expect(locales).toEqual(expect.arrayContaining(["en", "es"]));

    const serviceIds = [
      ...new Set(params.map((p: any) => p.serviceId)),
    ];
    expect(serviceIds.length).toBe(6);

    // Every combination exists
    for (const locale of ["en", "es"]) {
      for (const serviceId of serviceIds) {
        expect(params).toContainEqual({ locale, serviceId });
      }
    }
  });

  it("service-areas/[cityId] returns 32 entries (16 cities x 2 locales)", async () => {
    const mod = await import(
      "@/app/[locale]/service-areas/[cityId]/page"
    );
    const params = mod.generateStaticParams();
    expect(params.length).toBe(32);

    const locales = [...new Set(params.map((p: any) => p.locale))];
    expect(locales).toEqual(expect.arrayContaining(["en", "es"]));

    const cityIds = [...new Set(params.map((p: any) => p.cityId))];
    expect(cityIds.length).toBe(16);

    for (const locale of ["en", "es"]) {
      for (const cityId of cityIds) {
        expect(params).toContainEqual({ locale, cityId });
      }
    }
  });

  it("blog/[slug] returns 30 entries (15 slugs x 2 locales)", async () => {
    const mod = await import("@/app/[locale]/blog/[slug]/page");
    const params = mod.generateStaticParams();
    expect(params.length).toBe(30);

    const locales = [...new Set(params.map((p: any) => p.locale))];
    expect(locales).toEqual(expect.arrayContaining(["en", "es"]));

    const slugs = [...new Set(params.map((p: any) => p.slug))];
    expect(slugs.length).toBe(15);

    for (const locale of ["en", "es"]) {
      for (const slug of slugs) {
        expect(params).toContainEqual({ locale, slug });
      }
    }
  });
});
