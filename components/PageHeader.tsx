import { getTranslations } from "next-intl/server";
import Breadcrumb from "./Breadcrumb";

type Props = {
  label: string;
  title: string;
  subtitle?: string;
  showCta?: boolean;
};

export default async function PageHeader({ label, title, subtitle, showCta = false }: Props) {
  const t = await getTranslations("pageHeader");
  const shared = await getTranslations("shared");

  return (
    <section className="bg-gradient-to-br from-slate-900 to-[#0c1e3e] pt-12 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Breadcrumb />
        <p className="text-xs font-bold text-sky-200 uppercase tracking-[2px] mb-3">
          {label}
        </p>
        <h1
          className="font-black text-white tracking-[-1px] mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">{subtitle}</p>
        )}
        {showCta && (
          <a
            href={`tel:${shared("phoneEnRaw")}`}
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg mt-6 transition-colors"
          >
            📞 {t("callCta")}
          </a>
        )}
      </div>
    </section>
  );
}
