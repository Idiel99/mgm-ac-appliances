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
    <div data-testid="page-header" data-title={props.title}>
      {props.subtitle}
    </div>
  ),
}));
vi.mock("@/components/JsonLd", () => ({ default: () => null }));

describe("CityDetailPage (en, miami)", () => {
  beforeEach(() => {
    mockNextIntl("en");
    mockNextNavigation();
  });

  async function renderPage(cityId: string = "miami") {
    const Page = (await import("@/app/[locale]/service-areas/[cityId]/page")).default;
    const element = await Page({ params: Promise.resolve({ locale: "en", cityId }) });
    return render(element);
  }

  it("renders for en with cityId=miami — shows neighborhoods", async () => {
    const { container } = await renderPage("miami");
    expect(screen.getByTestId("navbar")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
    // Neighborhoods grid
    const grid = container.querySelector(".grid.grid-cols-2");
    expect(grid).toBeTruthy();
  });

  it("contains the translated 'neighborhoodsTitle' text", async () => {
    const { container } = await renderPage("miami");
    expect(container.textContent).toContain("Neighborhoods We Serve");
  });

  it("contains the translated 'cityCtaButton' text", async () => {
    const { container } = await renderPage("miami");
    expect(container.textContent).toContain("Call for Free Estimate");
  });

  it("has CTA section with phone link", async () => {
    const { container } = await renderPage("miami");
    const phoneLink = container.querySelector('a[href^="tel:"]');
    expect(phoneLink).toBeTruthy();
  });
});

describe("CityDetailPage (es, hialeah)", () => {
  beforeEach(() => {
    mockNextIntl("es");
    mockNextNavigation();
  });

  it("renders for es with cityId=hialeah", async () => {
    const Page = (await import("@/app/[locale]/service-areas/[cityId]/page")).default;
    const element = await Page({ params: Promise.resolve({ locale: "es", cityId: "hialeah" }) });
    const { container } = render(element);
    expect(screen.getByTestId("navbar")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
    expect(container.querySelector('a[href^="tel:"]')).toBeTruthy();
  });
});

describe("CityDetailPage — invalid cityId", () => {
  beforeEach(() => {
    mockNextIntl("en");
    mockNextNavigation();
  });

  it("calls notFound for invalid cityId", async () => {
    const { notFound } = await import("next/navigation");
    const Page = (await import("@/app/[locale]/service-areas/[cityId]/page")).default;
    await Page({ params: Promise.resolve({ locale: "en", cityId: "bogus-city" }) });
    expect(notFound).toHaveBeenCalled();
  });
});
