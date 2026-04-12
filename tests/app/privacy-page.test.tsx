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

describe.each(["en", "es"])("PrivacyPage (%s)", (locale) => {
  beforeEach(() => {
    mockNextIntl(locale);
    mockNextNavigation();
  });

  async function renderPage() {
    const Page = (await import("@/app/[locale]/privacy/page")).default;
    const element = await Page({ params: Promise.resolve({ locale }) });
    return render(element);
  }

  it("renders without crashing", async () => {
    await renderPage();
    expect(screen.getByTestId("navbar")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
  });

  it("has 6 section headings", async () => {
    const { container } = await renderPage();
    const sectionsWrapper = container.querySelector(".space-y-10");
    expect(sectionsWrapper).toBeTruthy();
    const headings = sectionsWrapper!.querySelectorAll("h2");
    expect(headings.length).toBe(6);
  });

  it("shows intro text", async () => {
    const { container } = await renderPage();
    // intro paragraph is the second <p> in the section (first is lastUpdated)
    const section = container.querySelector("section.bg-white");
    expect(section).toBeTruthy();
    const paragraphs = section!.querySelectorAll(":scope > div > p");
    // First p is lastUpdated, second is intro
    expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  });
});
