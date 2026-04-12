import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { mockNextIntl, mockNextNavigation } from "../mocks/next-intl";

describe("FAQ", () => {
  beforeEach(() => {
    mockNextIntl("en");
    mockNextNavigation();
  });

  async function renderFAQ() {
    const Component = (await import("@/components/FAQ")).default;
    return render(<Component />);
  }

  it("renders without crashing", async () => {
    await renderFAQ();
  });

  it("shows all 8 question texts", async () => {
    const { container } = await renderFAQ();
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(8);
    for (const btn of Array.from(buttons)) {
      expect(btn.textContent!.trim().length).toBeGreaterThan(0);
    }
  });

  it("clicking a question reveals the answer", async () => {
    const { container } = await renderFAQ();
    const buttons = container.querySelectorAll("button");
    const firstButton = buttons[0];

    // Answer should not be visible initially
    let answers = container.querySelectorAll("div.px-6.pb-4 p");
    expect(answers.length).toBe(0);

    // Click first question
    fireEvent.click(firstButton);

    // Answer should now be visible
    answers = container.querySelectorAll("div.px-6.pb-4 p");
    expect(answers.length).toBe(1);
    expect(answers[0].textContent!.trim().length).toBeGreaterThan(0);
  });

  it("clicking again hides the answer", async () => {
    const { container } = await renderFAQ();
    const buttons = container.querySelectorAll("button");
    const firstButton = buttons[0];

    // Open
    fireEvent.click(firstButton);
    let answers = container.querySelectorAll("div.px-6.pb-4 p");
    expect(answers.length).toBe(1);

    // Close
    fireEvent.click(firstButton);
    answers = container.querySelectorAll("div.px-6.pb-4 p");
    expect(answers.length).toBe(0);
  });

  it("only one answer is open at a time", async () => {
    const { container } = await renderFAQ();
    const buttons = container.querySelectorAll("button");

    // Open first question
    fireEvent.click(buttons[0]);
    let answers = container.querySelectorAll("div.px-6.pb-4 p");
    expect(answers.length).toBe(1);

    // Open second question — first should close
    fireEvent.click(buttons[1]);
    answers = container.querySelectorAll("div.px-6.pb-4 p");
    expect(answers.length).toBe(1);

    // The visible answer should be for the second question
    expect(answers[0].textContent).toContain("installation");
  });
});
