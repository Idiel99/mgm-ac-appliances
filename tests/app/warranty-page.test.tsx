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

describe.each(["en", "es"])("WarrantyPage (%s)", (locale) => {
  beforeEach(() => {
    mockNextIntl(locale);
    mockNextNavigation();
  });

  async function renderPage() {
    const Page = (await import("@/app/[locale]/warranty/page")).default;
    const element = await Page({ params: Promise.resolve({ locale }) });
    return render(element);
  }

  it("renders without crashing", async () => {
    await renderPage();
    expect(screen.getByTestId("navbar")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
  });

  it("shows 3 warranty cards", async () => {
    const { container } = await renderPage();
    const grid = container.querySelector(".grid.grid-cols-1.md\\:grid-cols-3");
    expect(grid).toBeTruthy();
    const cards = grid!.querySelectorAll(":scope > div");
    expect(cards.length).toBe(3);
  });

  it("has note section", async () => {
    const { container } = await renderPage();
    // The note section is in bg-sky-50 with text-center
    const noteSection = container.querySelector("section.bg-sky-50");
    expect(noteSection).toBeTruthy();
    const heading = noteSection!.querySelector("h2");
    expect(heading).toBeTruthy();
    const body = noteSection!.querySelector("p");
    expect(body).toBeTruthy();
  });
});
