import { vi } from "vitest";
import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";

type NestedRecord = { [key: string]: string | NestedRecord | unknown[] };

// Mutable locale that tests can change via setTestLocale()
let _testLocale = "en";

function getMessages(locale?: string): NestedRecord {
  const l = locale ?? _testLocale;
  return (l === "es" ? esMessages : enMessages) as unknown as NestedRecord;
}

function getNestedValue(obj: NestedRecord, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return path;
    current = (current as NestedRecord)[part];
  }
  return current ?? path;
}

function createTranslationFunction(
  msgs: NestedRecord,
  namespace: string
) {
  const base = getNestedValue(msgs, namespace) as NestedRecord;
  const t = (key: string): string => {
    const value = getNestedValue(base, key);
    if (typeof value === "string") return value;
    return `${namespace}.${key}`;
  };
  t.has = (key: string): boolean => {
    const value = getNestedValue(base, key);
    return value !== undefined && value !== `${namespace}.${key}`;
  };
  t.rich = t;
  t.raw = (key: string) => getNestedValue(base, key);
  return t;
}

/**
 * Call this in beforeEach to set the locale BEFORE the mock factories run.
 * The vi.mock calls are hoisted, so they always use the module-level _testLocale.
 */
export function mockNextIntl(locale: string = "en") {
  _testLocale = locale;
}

// These vi.mock calls are hoisted to the top of whichever file imports this module.
// They reference the module-level _testLocale via getMessages().
vi.mock("next-intl/server", () => ({
  getTranslations: vi.fn(
    async (
      nsOrOpts?: string | { locale: string; namespace: string }
    ) => {
      if (typeof nsOrOpts === "string") {
        return createTranslationFunction(getMessages(), nsOrOpts);
      }
      if (nsOrOpts && typeof nsOrOpts === "object") {
        return createTranslationFunction(
          getMessages(nsOrOpts.locale),
          nsOrOpts.namespace
        );
      }
      return createTranslationFunction(getMessages(), "");
    }
  ),
  setRequestLocale: vi.fn(),
  getLocale: vi.fn(async () => _testLocale),
  getMessages: vi.fn(async () => getMessages()),
}));

vi.mock("next-intl", () => ({
  useTranslations: vi.fn((namespace: string) =>
    createTranslationFunction(getMessages(), namespace)
  ),
  NextIntlClientProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => children,
}));

export function mockNextNavigation() {
  // This is also hoisted — fine since it has no dynamic dependencies
}

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  })),
  usePathname: vi.fn(() => "/en"),
  useSelectedLayoutSegment: vi.fn(() => null),
  notFound: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => {
    const React = require("react");
    return React.createElement("a", { href, className }, children);
  },
}));
