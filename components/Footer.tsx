import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");
  const shared = await getTranslations("shared");

  return (
    <footer className="bg-slate-900 border-t border-sky-500/15 py-12 px-4 text-center">
      <div
        className="font-black text-white text-xl mb-2"
        style={{ fontFamily: "var(--font-outfit), sans-serif" }}
      >
        MGM <span className="text-sky-500">A/C</span> Appliances
      </div>
      <p className="text-white/40 text-sm">
        {shared("phoneEn")} · {shared("phoneEs")} · {shared("email")}
      </p>
      <p className="text-white/30 text-xs mt-3">{t("copyright")}</p>
    </footer>
  );
}
