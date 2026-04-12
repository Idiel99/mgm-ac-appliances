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

describe.each(["en", "es"])("BlogPage (%s)", (locale) => {
  beforeEach(() => {
    mockNextIntl(locale);
    mockNextNavigation();
  });

  async function renderPage() {
    const Page = (await import("@/app/[locale]/blog/page")).default;
    const element = await Page({ params: Promise.resolve({ locale }) });
    return render(element);
  }

  it("renders without crashing", async () => {
    await renderPage();
    expect(screen.getByTestId("navbar")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
  });

  it("shows 3 post cards", async () => {
    const { container } = await renderPage();
    const links = container.querySelectorAll("a.group");
    expect(links.length).toBe(3);
  });

  it("links have correct locale prefix", async () => {
    const { container } = await renderPage();
    const links = container.querySelectorAll("a.group");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href!.startsWith(`/${locale}/blog/`)).toBe(true);
    });
  });

  it("each post shows date, title, and excerpt", async () => {
    const { container } = await renderPage();
    const cards = container.querySelectorAll("a.group");
    cards.forEach((card) => {
      // date is in a <span> with text-xs
      const dateSpan = card.querySelector("span.text-xs");
      expect(dateSpan).toBeTruthy();
      // title is in an h3
      const title = card.querySelector("h3");
      expect(title).toBeTruthy();
      // excerpt is in a <p>
      const excerpt = card.querySelector("p");
      expect(excerpt).toBeTruthy();
    });
  });
});
