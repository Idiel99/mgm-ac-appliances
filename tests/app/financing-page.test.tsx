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
    <div data-testid="page-header" data-title={props.title} data-label={props.label}>
      {props.subtitle}
    </div>
  ),
}));

describe.each(["en", "es"])("FinancingPage (%s)", (locale) => {
  beforeEach(() => {
    mockNextIntl(locale);
    mockNextNavigation();
  });

  async function renderPage() {
    const Page = (await import("@/app/[locale]/financing/page")).default;
    const element = await Page({ params: Promise.resolve({ locale }) });
    return render(element);
  }

  it("renders without crashing", async () => {
    await renderPage();
    expect(screen.getByTestId("navbar")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
  });

  it("has PageHeader", async () => {
    await renderPage();
    expect(screen.getByTestId("page-header")).toBeTruthy();
  });

  it("shows 5 benefits", async () => {
    const { container } = await renderPage();
    const listItems = container.querySelectorAll("ul li");
    expect(listItems.length).toBe(5);
  });

  it("has CTA section with phone link", async () => {
    const { container } = await renderPage();
    const phoneLink = container.querySelector('a[href^="tel:"]');
    expect(phoneLink).toBeTruthy();
  });
});
