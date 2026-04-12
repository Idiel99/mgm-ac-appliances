import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockNextIntl, mockNextNavigation } from "../mocks/next-intl";

describe.each(["en", "es"])("Footer (%s)", (locale) => {
  beforeEach(() => {
    mockNextIntl(locale);
    mockNextNavigation();
  });

  async function renderFooter() {
    const Component = (await import("@/components/Footer")).default;
    const element = await Component();
    return render(element);
  }

  it("renders without crashing", async () => {
    await renderFooter();
  });

  it("contains a footer element", async () => {
    const { container } = await renderFooter();
    const footer = container.querySelector("footer");
    expect(footer).toBeTruthy();
  });

  it("shows company name MGM and A/C", async () => {
    const { container } = await renderFooter();
    expect(container.textContent).toContain("MGM");
    expect(container.textContent).toContain("A/C");
  });

  it("shows phone links (tel: links)", async () => {
    const { container } = await renderFooter();
    const telLinks = container.querySelectorAll('a[href^="tel:"]');
    expect(telLinks.length).toBeGreaterThanOrEqual(2);
  });

  it("shows email link (mailto:)", async () => {
    const { container } = await renderFooter();
    const mailtoLinks = container.querySelectorAll('a[href^="mailto:"]');
    expect(mailtoLinks.length).toBe(1);
  });

  it("contains all quick links", async () => {
    const { container } = await renderFooter();
    const quickLinkPaths = [
      `/${locale}/about`,
      `/${locale}/service-areas`,
      `/${locale}/financing`,
      `/${locale}/coupons`,
      `/${locale}/warranty`,
      `/${locale}/blog`,
    ];
    for (const path of quickLinkPaths) {
      const link = container.querySelector(`a[href="${path}"]`);
      expect(link, `expected quick link to ${path}`).toBeTruthy();
    }
  });

  it("contains service links for all 5 services", async () => {
    const { container } = await renderFooter();
    const serviceIds = [
      "installation",
      "repair",
      "maintenance",
      "commercial",
      "emergency",
    ];
    for (const id of serviceIds) {
      const link = container.querySelector(
        `a[href="/${locale}/services/${id}"]`
      );
      expect(link, `expected service link for ${id}`).toBeTruthy();
    }
  });

  it("shows copyright text", async () => {
    const { container } = await renderFooter();
    expect(container.textContent).toMatch(/©|copyright/i);
  });

  it("shows license info", async () => {
    const { container } = await renderFooter();
    expect(container.textContent).toMatch(/licen/i);
  });

  it("has privacy link", async () => {
    const { container } = await renderFooter();
    const privacyLink = container.querySelector(`a[href="/${locale}/privacy"]`);
    expect(privacyLink).toBeTruthy();
  });

  it("all internal links use the correct locale prefix", async () => {
    const { container } = await renderFooter();
    const allLinks = container.querySelectorAll("a[href^='/']");
    const wrongLocaleLinks = Array.from(allLinks).filter(
      (a) => !a.getAttribute("href")!.startsWith(`/${locale}/`)
    );
    expect(wrongLocaleLinks.length).toBe(0);
  });
});
