"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const currentLocale = pathname.startsWith("/es") ? "es" : "en";

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(/^\/(en|es)/, `/${locale}`);
    router.push(newPath);
  };

  const isHome = pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`;

  const navLinks = [
    { href: isHome ? "#services" : `/${currentLocale}/services`, label: t("services") },
    { href: `/${currentLocale}/about`, label: t("about") },
    { href: `/${currentLocale}/service-areas`, label: t("serviceAreas") },
    { href: `/${currentLocale}/blog`, label: t("blog") },
    { href: isHome ? "#contact" : `/${currentLocale}/#contact`, label: t("contact") },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-sky-500/20">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-[68px] px-4 md:px-8">
        {/* Logo */}
        <Link
          href={`/${currentLocale}`}
          className="font-[var(--font-outfit)] font-black text-xl text-white tracking-tight"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          MGM <span className="text-sky-500">A/C</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.href.startsWith("#") ? (
                <a
                  href={link.href}
                  className="text-white/75 hover:text-sky-200 text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-white/75 hover:text-sky-200 text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex bg-white/[0.08] rounded-full p-[3px] border border-white/10">
            <button
              onClick={() => switchLocale("en")}
              className={`text-xs font-bold px-3 py-1 rounded-full transition-all cursor-pointer ${
                currentLocale === "en"
                  ? "bg-sky-500 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {t("langEn")}
            </button>
            <button
              onClick={() => switchLocale("es")}
              className={`text-xs font-bold px-3 py-1 rounded-full transition-all cursor-pointer ${
                currentLocale === "es"
                  ? "bg-sky-500 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {t("langEs")}
            </button>
          </div>

          {/* Call Now — desktop only */}
          <a
            href="tel:7863520084"
            className="hidden md:flex items-center gap-1.5 bg-sky-500 hover:bg-sky-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            📞 {t("callNow")}
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-white text-2xl p-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 py-4 px-4 bg-slate-900">
          <ul className="flex flex-col gap-4 list-none mb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("#") ? (
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-white/80 text-base font-medium"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-white/80 text-base font-medium"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <a
            href="tel:7863520084"
            className="flex items-center justify-center gap-2 bg-sky-500 text-white font-semibold py-3 rounded-lg w-full"
          >
            📞 {t("callNow")}
          </a>
        </div>
      )}
    </nav>
  );
}
