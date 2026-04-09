"use client";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumb() {
  const t = useTranslations("breadcrumb");
  const pathname = usePathname();

  const locale = pathname.startsWith("/es") ? "es" : "en";
  const segments = pathname.replace(/^\/(en|es)/, "").split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
      <Link href={`/${locale}`} className="hover:text-sky-500 transition-colors">
        {t("home")}
      </Link>
      {segments.map((segment, i) => {
        const href = `/${locale}/${segments.slice(0, i + 1).join("/")}`;
        const label = segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        const isLast = i === segments.length - 1;
        return (
          <span key={href} className="flex items-center gap-2">
            <span className="text-slate-600">›</span>
            {isLast ? (
              <span className="text-slate-300">{label}</span>
            ) : (
              <Link href={href} className="hover:text-sky-500 transition-colors">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
