import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { mockNextIntl, mockNextNavigation } from "../mocks/next-intl";

// Mock all child components to isolate page-level behavior
vi.mock("@/components/Navbar", () => ({
  default: () => <nav data-testid="navbar" />,
}));
vi.mock("@/components/Hero", () => ({
  default: () => <div data-testid="hero" />,
}));
vi.mock("@/components/SpecialOffers", () => ({
  default: () => <div data-testid="special-offers" />,
}));
vi.mock("@/components/Services", () => ({
  default: () => <div data-testid="services" />,
}));
vi.mock("@/components/WhyUs", () => ({
  default: () => <div data-testid="why-us" />,
}));
vi.mock("@/components/Testimonials", () => ({
  default: () => <div data-testid="testimonials" />,
}));
vi.mock("@/components/FAQ", () => ({
  default: () => <div data-testid="faq" />,
}));
vi.mock("@/components/Contact", () => ({
  default: () => <div data-testid="contact" />,
}));
vi.mock("@/components/Footer", () => ({
  default: () => <footer data-testid="footer" />,
}));
vi.mock("@/components/StickyCallBar", () => ({
  default: () => <div data-testid="sticky-call-bar" />,
}));
vi.mock("@/components/ScrollReveal", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="scroll-reveal">{children}</div>
  ),
}));
vi.mock("@/components/JsonLd", () => ({
  default: () => null,
}));

mockNextNavigation();

describe("Home page (app/[locale]/page.tsx)", () => {
  describe("locale=en", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockNextIntl("en");
    });
    it("renders without crashing", async () => {
      const Page = (await import("@/app/[locale]/page")).default;
      const element = await Page({ params: Promise.resolve({ locale: "en" }) });
      render(element);
    });

    it("contains a main element with correct class", async () => {
      const Page = (await import("@/app/[locale]/page")).default;
      const element = await Page({ params: Promise.resolve({ locale: "en" }) });
      render(element);

      const main = screen.getByRole("main");
      expect(main).toBeTruthy();
      expect(main.classList.contains("pb-14")).toBe(true);
    });

    it("renders Navbar", async () => {
      const Page = (await import("@/app/[locale]/page")).default;
      const element = await Page({ params: Promise.resolve({ locale: "en" }) });
      render(element);

      expect(screen.getByTestId("navbar")).toBeTruthy();
    });

    it("renders Hero", async () => {
      const Page = (await import("@/app/[locale]/page")).default;
      const element = await Page({ params: Promise.resolve({ locale: "en" }) });
      render(element);

      expect(screen.getByTestId("hero")).toBeTruthy();
    });

    it("renders all major sections", async () => {
      const Page = (await import("@/app/[locale]/page")).default;
      const element = await Page({ params: Promise.resolve({ locale: "en" }) });
      render(element);

      expect(screen.getByTestId("navbar")).toBeTruthy();
      expect(screen.getByTestId("hero")).toBeTruthy();
      expect(screen.getByTestId("special-offers")).toBeTruthy();
      expect(screen.getByTestId("services")).toBeTruthy();
      expect(screen.getByTestId("why-us")).toBeTruthy();
      expect(screen.getByTestId("testimonials")).toBeTruthy();
      expect(screen.getByTestId("faq")).toBeTruthy();
      expect(screen.getByTestId("contact")).toBeTruthy();
      expect(screen.getByTestId("footer")).toBeTruthy();
      expect(screen.getByTestId("sticky-call-bar")).toBeTruthy();
    });

    it("wraps sections in ScrollReveal", async () => {
      const Page = (await import("@/app/[locale]/page")).default;
      const element = await Page({ params: Promise.resolve({ locale: "en" }) });
      render(element);

      const scrollReveals = screen.getAllByTestId("scroll-reveal");
      expect(scrollReveals.length).toBeGreaterThanOrEqual(7);
    });
  });

  describe("locale=es", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockNextIntl("es");
    });

    it("renders without crashing", async () => {
      const Page = (await import("@/app/[locale]/page")).default;
      const element = await Page({ params: Promise.resolve({ locale: "es" }) });
      render(element);
    });

    it("contains a main element with correct class", async () => {
      const Page = (await import("@/app/[locale]/page")).default;
      const element = await Page({ params: Promise.resolve({ locale: "es" }) });
      render(element);

      const main = screen.getByRole("main");
      expect(main).toBeTruthy();
      expect(main.classList.contains("pb-14")).toBe(true);
    });

    it("renders all major sections", async () => {
      const Page = (await import("@/app/[locale]/page")).default;
      const element = await Page({ params: Promise.resolve({ locale: "es" }) });
      render(element);

      expect(screen.getByTestId("navbar")).toBeTruthy();
      expect(screen.getByTestId("hero")).toBeTruthy();
      expect(screen.getByTestId("special-offers")).toBeTruthy();
      expect(screen.getByTestId("services")).toBeTruthy();
      expect(screen.getByTestId("why-us")).toBeTruthy();
      expect(screen.getByTestId("testimonials")).toBeTruthy();
      expect(screen.getByTestId("faq")).toBeTruthy();
      expect(screen.getByTestId("contact")).toBeTruthy();
      expect(screen.getByTestId("footer")).toBeTruthy();
      expect(screen.getByTestId("sticky-call-bar")).toBeTruthy();
    });
  });
});
