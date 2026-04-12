import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockNextIntl, mockNextNavigation } from "../mocks/next-intl";

vi.mock("@/components/Breadcrumb", () => ({
  default: () => <nav data-testid="breadcrumb" />,
}));

describe("PageHeader", () => {
  beforeEach(() => {
    mockNextIntl("en");
    mockNextNavigation();
  });

  async function renderHeader(props: {
    label: string;
    title: string;
    subtitle?: string;
    showCta?: boolean;
  }) {
    const Component = (await import("@/components/PageHeader")).default;
    const element = await Component(props);
    return render(element);
  }

  it("renders with label and title", async () => {
    const { container } = await renderHeader({
      label: "Test Label",
      title: "Test Title",
    });
    expect(container.textContent).toContain("Test Label");
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Test Title"
    );
  });

  it("shows subtitle when provided", async () => {
    const { container } = await renderHeader({
      label: "Label",
      title: "Title",
      subtitle: "This is a subtitle",
    });
    expect(container.textContent).toContain("This is a subtitle");
  });

  it("does not show subtitle when not provided", async () => {
    const { container } = await renderHeader({
      label: "Label",
      title: "Title",
    });
    // The only p elements should be the label, not a subtitle
    const paragraphs = container.querySelectorAll("p");
    // Only the label paragraph should exist, not a subtitle paragraph
    for (const p of Array.from(paragraphs)) {
      expect(p.classList.contains("text-white/60")).toBe(false);
    }
  });

  it("shows CTA when showCta is true", async () => {
    const { container } = await renderHeader({
      label: "Label",
      title: "Title",
      showCta: true,
    });
    const ctaLink = container.querySelector('a[href^="tel:"]');
    expect(ctaLink).toBeTruthy();
  });

  it("does not show CTA when showCta is false (default)", async () => {
    const { container } = await renderHeader({
      label: "Label",
      title: "Title",
    });
    const ctaLink = container.querySelector('a[href^="tel:"]');
    expect(ctaLink).toBeNull();
  });
});
