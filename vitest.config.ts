import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: [
        "app/**/*.tsx",
        "components/**/*.tsx",
      ],
      exclude: [
        "components/IceParticles.tsx",
        "components/StatCounter.tsx",
        "components/ScrollReveal.tsx",
        "components/StickyCallBar.tsx",
        "components/ServiceAreaMap.tsx",
        "components/ServiceAreaMapLoader.tsx",
        "components/Navbar.tsx",
        "components/Logo.tsx",
        "components/Breadcrumb.tsx",
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
});
