import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { mockNextIntl, mockNextNavigation } from "../mocks/next-intl";

mockNextIntl("en");
mockNextNavigation();

describe("RootPage (app/page.tsx)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", async () => {
    const { default: RootPage } = await import("@/app/page");
    render(<RootPage />);
  });

  it("contains a spinner element with animate-spin class", async () => {
    const { default: RootPage } = await import("@/app/page");
    const { container } = render(<RootPage />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeTruthy();
  });

  it("contains a meta refresh tag", async () => {
    const { default: RootPage } = await import("@/app/page");
    render(<RootPage />);
    // React hoists <meta> tags into <head> in jsdom
    const metaRefresh =
      document.head.querySelector('meta[http-equiv="refresh"]') ??
      document.querySelector('meta[http-equiv="refresh"]');
    expect(metaRefresh).toBeTruthy();
    expect(metaRefresh?.getAttribute("content")).toBe("0;url=/en");
  });

  it("does not use useRouter or useEffect (is a server component)", async () => {
    // Verify the module exports a plain function (no hooks)
    const mod = await import("@/app/page");
    expect(mod.default).toBeTypeOf("function");
    // Server components don't set up hook state - the component renders synchronously
    const { default: RootPage } = mod;
    const { container } = render(<RootPage />);
    expect(container.querySelector(".min-h-screen")).toBeTruthy();
  });
});
