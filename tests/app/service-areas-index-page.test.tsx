import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockNextIntl, mockNextNavigation } from "../mocks/next-intl";

vi.mock("@/components/Navbar", () => ({
  default: () => <nav data-testid="navbar" />,
}));
vi.mock("@/components/Footer", () => ({
  default: () => <footer data-testid="footer" />,
}));
vi.mock("@/components/PageHeader", () => ({
  default: (props: any) => (
    <div data-testid="page-header" data-title={props.title} />
  ),
}));
vi.mock("@/components/ServiceAreaMapLoader", () => ({
  default: () => <div data-testid="map-loader" />,
}));

describe.each(["en", "es"])("ServiceAreasPage (%s)", (locale) => {
  beforeEach(() => {
    mockNextIntl(locale);
    mockNextNavigation();
  });

  async function renderPage() {
    const Page = (await import("@/app/[locale]/service-areas/page")).default;
    const element = await Page({ params: Promise.resolve({ locale }) });
    return render(element);
  }

  it("renders 16 city links", async () => {
    const { container } = await renderPage();
    const links = container.querySelectorAll("a[href*='/service-areas/']");
    expect(links.length).toBe(16);
  });

  it("each city card shows name and description", async () => {
    const { container } = await renderPage();
    const links = container.querySelectorAll("a[href*='/service-areas/']");
    links.forEach((link) => {
      const h3 = link.querySelector("h3");
      const p = link.querySelector("p");
      expect(h3).toBeTruthy();
      expect(h3!.textContent).toBeTruthy();
      expect(p).toBeTruthy();
      expect(p!.textContent).toBeTruthy();
    });
  });

  it("all city links use correct locale prefix", async () => {
    const { container } = await renderPage();
    const links = container.querySelectorAll("a[href*='/service-areas/']");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      expect(href).toMatch(new RegExp(`^/${locale}/service-areas/`));
    });
  });

  it("map loader is present", async () => {
    await renderPage();
    expect(screen.getByTestId("map-loader")).toBeTruthy();
  });

  it("has CTA text", async () => {
    const { container } = await renderPage();
    // The CTA is a <p> in the city cards section
    const cta = container.querySelector("p.text-center");
    expect(cta).toBeTruthy();
    expect(cta!.textContent!.length).toBeGreaterThan(0);
  });
});
