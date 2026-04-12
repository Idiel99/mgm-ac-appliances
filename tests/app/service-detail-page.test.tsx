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

describe("ServiceDetailPage (en, repair)", () => {
  beforeEach(() => {
    mockNextIntl("en");
    mockNextNavigation();
  });

  async function renderPage(serviceId: string = "repair") {
    const Page = (await import("@/app/[locale]/services/[serviceId]/page")).default;
    const element = await Page({ params: Promise.resolve({ locale: "en", serviceId }) });
    return render(element);
  }

  it("renders for en with serviceId=repair — shows features and signs", async () => {
    await renderPage("repair");
    expect(screen.getByTestId("navbar")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
    expect(screen.getByTestId("page-header")).toBeTruthy();
  });

  it("shows features list with checkmark character", async () => {
    const { container } = await renderPage("repair");
    const checkmarks = container.querySelectorAll("span");
    const checks = Array.from(checkmarks).filter((el) => el.textContent === "✓");
    expect(checks.length).toBeGreaterThan(0);
  });

  it("shows signs list with warning character", async () => {
    const { container } = await renderPage("repair");
    const spans = container.querySelectorAll("span");
    const warnings = Array.from(spans).filter((el) => el.textContent === "⚠");
    expect(warnings.length).toBeGreaterThan(0);
  });

  it("has CTA section with phone link", async () => {
    const { container } = await renderPage("repair");
    const phoneLink = container.querySelector('a[href^="tel:"]');
    expect(phoneLink).toBeTruthy();
  });
});

describe("ServiceDetailPage (es, installation)", () => {
  beforeEach(() => {
    mockNextIntl("es");
    mockNextNavigation();
  });

  it("renders for es with serviceId=installation", async () => {
    const Page = (await import("@/app/[locale]/services/[serviceId]/page")).default;
    const element = await Page({ params: Promise.resolve({ locale: "es", serviceId: "installation" }) });
    const { container } = render(element);
    expect(screen.getByTestId("navbar")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
    expect(container.querySelector('a[href^="tel:"]')).toBeTruthy();
  });
});

describe("ServiceDetailPage — invalid serviceId", () => {
  beforeEach(() => {
    mockNextIntl("en");
    mockNextNavigation();
  });

  it("calls notFound for invalid serviceId", async () => {
    const { notFound } = await import("next/navigation");
    const Page = (await import("@/app/[locale]/services/[serviceId]/page")).default;
    await Page({ params: Promise.resolve({ locale: "en", serviceId: "bogus-service" }) });
    expect(notFound).toHaveBeenCalled();
  });
});
