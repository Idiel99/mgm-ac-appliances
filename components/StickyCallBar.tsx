"use client";

import { useTranslations } from "next-intl";

export default function StickyCallBar() {
  const t = useTranslations("nav");
  const shared = useTranslations("shared");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-sky-500 border-t border-sky-400 safe-area-bottom">
      <a
        href={`tel:${shared("phoneEnRaw")}`}
        className="flex items-center justify-center gap-2 py-3.5 text-white font-bold text-sm"
      >
        📞 {t("callNow")} · {shared("phoneEn")}
      </a>
    </div>
  );
}
