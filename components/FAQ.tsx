"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function FAQ() {
  const t = useTranslations("faq");
  const [open, setOpen] = useState<number | null>(null);

  const items = Array.from({ length: 8 }, (_, i) => i);

  return (
    <section className="bg-white py-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold text-sky-600 uppercase tracking-[2px] mb-3">
          {t("label")}
        </p>
        <h2
          className="font-black text-slate-900 tracking-[-1px] mb-12"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {t("title")}
        </h2>
        <div className="space-y-3">
          {items.map((i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-sky-50/50 transition-colors cursor-pointer"
              >
                <span className="font-semibold text-slate-800 text-sm pr-4">
                  {t(`items.${i}.q`)}
                </span>
                <span className={`text-sky-500 text-xl transition-transform duration-200 flex-shrink-0 ${open === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-4">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {t(`items.${i}.a`)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
