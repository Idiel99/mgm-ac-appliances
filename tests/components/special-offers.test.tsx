import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockNextIntl, mockNextNavigation } from "../mocks/next-intl";

describe("SpecialOffers", () => {
  beforeEach(() => {
    mockNextIntl("en");
    mockNextNavigation();
  });

  async function renderOffers() {
    const Component = (await import("@/components/SpecialOffers")).default;
    const element = await Component();
    return render(element);
  }

  it("renders without crashing", async () => {
    await renderOffers();
  });

  it("shows 2 offer cards (not 3 — offer3 was removed)", async () => {
    const { container } = await renderOffers();
    // Each offer card has a badge span as the first notable element
    const badges = container.querySelectorAll(
      "span.inline-block.bg-white.text-sky-600"
    );
    expect(badges.length).toBe(2);
  });

  it("each offer has a badge, title, and description", async () => {
    const { container } = await renderOffers();
    const cards = container.querySelectorAll(
      ".bg-white\\/15"
    );
    expect(cards.length).toBe(2);
    for (const card of Array.from(cards)) {
      // badge
      const badge = card.querySelector("span");
      expect(badge).toBeTruthy();
      expect(badge!.textContent!.trim().length).toBeGreaterThan(0);
      // title (h3)
      const title = card.querySelector("h3");
      expect(title).toBeTruthy();
      expect(title!.textContent!.trim().length).toBeGreaterThan(0);
      // description (p)
      const desc = card.querySelector("p");
      expect(desc).toBeTruthy();
      expect(desc!.textContent!.trim().length).toBeGreaterThan(0);
    }
  });

  it("has CTA phone links", async () => {
    const { container } = await renderOffers();
    const phoneLinks = container.querySelectorAll('a[href^="tel:"]');
    expect(phoneLinks.length).toBeGreaterThanOrEqual(2);
  });
});
