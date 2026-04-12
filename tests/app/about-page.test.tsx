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

describe.each(["en", "es"])("AboutPage (%s)", (locale) => {
  beforeEach(() => {
    mockNextIntl(locale);
    mockNextNavigation();
  });

  async function renderPage() {
    const Page = (await import("@/app/[locale]/about/page")).default;
    const element = await Page({ params: Promise.resolve({ locale }) });
    return render(element);
  }

  it("renders without crashing", async () => {
    await renderPage();
    expect(screen.getByTestId("navbar")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
  });

  it("has PageHeader with correct title", async () => {
    await renderPage();
    const header = screen.getByTestId("page-header");
    expect(header).toBeTruthy();
    expect(header.getAttribute("data-title")).toBeTruthy();
  });

  it("contains 4 value cards", async () => {
    const { container } = await renderPage();
    // Values section is in bg-sky-50; each card is a div inside the grid
    const grid = container.querySelector(".grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4");
    expect(grid).toBeTruthy();
    const cards = grid!.querySelectorAll(":scope > div");
    expect(cards.length).toBe(4);
  });

  it("has story section with 3 paragraphs", async () => {
    const { container } = await renderPage();
    const storyDiv = container.querySelector(".space-y-5");
    expect(storyDiv).toBeTruthy();
    const paragraphs = storyDiv!.querySelectorAll("p");
    expect(paragraphs.length).toBe(3);
  });

  it("has stats section with 4 stats", async () => {
    const { container } = await renderPage();
    const statsGrid = container.querySelector(".grid.grid-cols-2.lg\\:grid-cols-4");
    expect(statsGrid).toBeTruthy();
    const stats = statsGrid!.querySelectorAll(":scope > div");
    expect(stats.length).toBe(4);
  });
});
