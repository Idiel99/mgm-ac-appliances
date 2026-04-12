import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { mockNextIntl, mockNextNavigation } from "../mocks/next-intl";

describe("CouponsContent", () => {
  beforeEach(() => {
    mockNextIntl("en");
    mockNextNavigation();
  });

  const sampleCards = [
    {
      key: "coupon1",
      badge: "HOT DEAL",
      title: "$50 Off",
      desc: "Any new installation",
      expires: "Expires 12/31/2026",
    },
    {
      key: "coupon2",
      badge: "SAVE NOW",
      title: "Free Diagnostic",
      desc: "With any repair service",
      expires: "Expires 06/30/2026",
    },
  ];

  async function renderCoupons(
    props?: Partial<{
      cards: typeof sampleCards;
      printNote: string;
      printButton: string;
    }>
  ) {
    const Component = (
      await import("@/app/[locale]/coupons/CouponsContent")
    ).default;
    return render(
      <Component
        cards={props?.cards ?? sampleCards}
        printNote={props?.printNote ?? "Print this page for savings"}
        printButton={props?.printButton ?? "Print Coupons"}
      />
    );
  }

  it("renders cards with badge, title, desc, expires", async () => {
    await renderCoupons();
    for (const card of sampleCards) {
      expect(screen.getByText(card.badge)).toBeTruthy();
      expect(screen.getByText(card.title)).toBeTruthy();
      expect(screen.getByText(card.desc)).toBeTruthy();
      expect(screen.getByText(card.expires)).toBeTruthy();
    }
  });

  it("shows print note", async () => {
    await renderCoupons({ printNote: "Remember to print!" });
    expect(screen.getByText("Remember to print!")).toBeTruthy();
  });

  it("shows print button with correct text", async () => {
    await renderCoupons({ printButton: "Print All" });
    expect(screen.getByText("Print All")).toBeTruthy();
    expect(screen.getByText("Print All").tagName).toBe("BUTTON");
  });

  it("print button calls window.print on click", async () => {
    const printSpy = vi.fn();
    window.print = printSpy;

    await renderCoupons();
    const button = screen.getByText("Print Coupons");
    fireEvent.click(button);

    expect(printSpy).toHaveBeenCalledTimes(1);
  });
});
