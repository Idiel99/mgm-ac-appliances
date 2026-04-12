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

describe.each(["en", "es"])("ServicesPage (%s)", (locale) => {
  beforeEach(() => {
    mockNextIntl(locale);
    mockNextNavigation();
  });

  async function renderPage() {
    const Page = (await import("@/app/[locale]/services/page")).default;
    const element = await Page({ params: Promise.resolve({ locale }) });
    return render(element);
  }

  it("renders without crashing", async () => {
    await renderPage();
    expect(screen.getByTestId("navbar")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
  });

  it("shows 6 service cards", async () => {
    const { container } = await renderPage();
    const links = container.querySelectorAll("a.group");
    expect(links.length).toBe(6);
  });

  it("links have correct locale prefix", async () => {
    const { container } = await renderPage();
    const links = container.querySelectorAll("a.group");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href!.startsWith(`/${locale}/services/`)).toBe(true);
    });
  });

  it("each card shows icon, title, and description", async () => {
    const { container } = await renderPage();
    const cards = container.querySelectorAll("a.group");
    cards.forEach((card) => {
      // icon is in a div with text-4xl
      const icon = card.querySelector(".text-4xl");
      expect(icon).toBeTruthy();
      // title is in an h3
      const title = card.querySelector("h3");
      expect(title).toBeTruthy();
      // description is in a <p>
      const desc = card.querySelector("p");
      expect(desc).toBeTruthy();
    });
  });
});
