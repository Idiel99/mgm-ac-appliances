import { getTranslations } from "next-intl/server";
import ScrollReveal from "./ScrollReveal";

const SERVICE_KEYS = [
  "installation",
  "repair",
  "maintenance",
  "commercial",
  "residential",
  "emergency",
] as const;

const SERVICE_ICONS: Record<string, string> = {
  installation: "🏗️",
  repair: "🔧",
  maintenance: "🛡️",
  commercial: "🏢",
  residential: "🏠",
  emergency: "🚨",
};

export default async function Services() {
  const t = await getTranslations("services");

  return (
    <section id="services" className="bg-sky-50 py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold text-sky-500 uppercase tracking-[2px] mb-3">
          {t("label")}
        </p>
        <h2
          className="font-black text-slate-900 tracking-[-1px] mb-4"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {t("title")}
        </h2>
        <p className="text-slate-600 max-w-xl leading-relaxed mb-14">
          {t("subtitle")}
        </p>

        <ScrollReveal animation="fade-up" staggerChildren staggerInterval={120} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_KEYS.map((key) => (
            <div
              key={key}
              className="group bg-white rounded-2xl p-8 border border-sky-500/10 shadow-sm hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(14,165,233,0.12)] hover:border-sky-500/30 transition-all duration-200 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-500 to-sky-200 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-[52px] h-[52px] bg-gradient-to-br from-sky-100 to-sky-200 rounded-[14px] flex items-center justify-center text-2xl mb-5">
                {SERVICE_ICONS[key]}
              </div>
              <h3
                className="font-bold text-slate-900 text-lg mb-2"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                {t(`${key}.title`)}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t(`${key}.desc`)}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
