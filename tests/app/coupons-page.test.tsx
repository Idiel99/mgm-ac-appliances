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

// Mock CouponsContent for the server-component page tests
vi.mock("@/app/[locale]/coupons/CouponsContent", () => ({
  default: (props: any) => (
    <div data-testid="coupons-content" data-card-count={props.cards?.length}>
      {props.cards?.map((c: any) => (
        <div key={c.key} data-testid={`card-${c.key}`}>
          {c.title}
        </div>
      ))}
      <span data-testid="print-button">{props.printButton}</span>
      <span data-testid="print-note">{props.printNote}</span>
    </div>
  ),
}));

describe("CouponsPage (en)", () => {
  beforeEach(() => {
    mockNextIntl("en");
    mockNextNavigation();
  });

  async function renderPage() {
    const Page = (await import("@/app/[locale]/coupons/page")).default;
    const element = await Page({ params: Promise.resolve({ locale: "en" }) });
    return render(element);
  }

  it("renders for en — passes cards to CouponsContent", async () => {
    await renderPage();
    expect(screen.getByTestId("navbar")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
    const content = screen.getByTestId("coupons-content");
    expect(content).toBeTruthy();
    expect(content.getAttribute("data-card-count")).toBe("2");
  });

  it("passes c1 and c2 cards", async () => {
    await renderPage();
    expect(screen.getByTestId("card-c1")).toBeTruthy();
    expect(screen.getByTestId("card-c2")).toBeTruthy();
  });
});

describe("CouponsPage (es)", () => {
  beforeEach(() => {
    mockNextIntl("es");
    mockNextNavigation();
  });

  it("renders for es", async () => {
    const Page = (await import("@/app/[locale]/coupons/page")).default;
    const element = await Page({ params: Promise.resolve({ locale: "es" }) });
    render(element);
    expect(screen.getByTestId("navbar")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
    expect(screen.getByTestId("coupons-content")).toBeTruthy();
  });
});

