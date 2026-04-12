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

describe("BlogPostPage (en, maintenance-tips)", () => {
  beforeEach(() => {
    mockNextIntl("en");
    mockNextNavigation();
  });

  async function renderPage(slug: string = "maintenance-tips") {
    const Page = (await import("@/app/[locale]/blog/[slug]/page")).default;
    const element = await Page({ params: Promise.resolve({ locale: "en", slug }) });
    return render(element);
  }

  it("renders for en with slug=maintenance-tips", async () => {
    await renderPage("maintenance-tips");
    expect(screen.getByTestId("navbar")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
    expect(screen.getByTestId("page-header")).toBeTruthy();
  });

  it("shows back-to-blog link with correct locale", async () => {
    const { container } = await renderPage("maintenance-tips");
    const backLink = container.querySelector('a[href="/en/blog"]');
    expect(backLink).toBeTruthy();
  });

  it("has article element with prose-custom class", async () => {
    const { container } = await renderPage("maintenance-tips");
    const article = container.querySelector("article.prose-custom");
    expect(article).toBeTruthy();
  });
});

describe("BlogPostPage (es, when-to-replace)", () => {
  beforeEach(() => {
    mockNextIntl("es");
    mockNextNavigation();
  });

  it("renders for es with slug=when-to-replace", async () => {
    const Page = (await import("@/app/[locale]/blog/[slug]/page")).default;
    const element = await Page({ params: Promise.resolve({ locale: "es", slug: "when-to-replace" }) });
    const { container } = render(element);
    expect(screen.getByTestId("navbar")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
    // Back link should use es locale
    const backLink = container.querySelector('a[href="/es/blog"]');
    expect(backLink).toBeTruthy();
  });
});

describe("BlogPostPage — invalid slug", () => {
  beforeEach(() => {
    mockNextIntl("en");
    mockNextNavigation();
  });

  it("calls notFound for invalid slug", async () => {
    const { notFound } = await import("next/navigation");
    const Page = (await import("@/app/[locale]/blog/[slug]/page")).default;
    await Page({ params: Promise.resolve({ locale: "en", slug: "nonexistent-post" }) });
    expect(notFound).toHaveBeenCalled();
  });
});
