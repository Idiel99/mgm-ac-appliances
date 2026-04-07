import { getTranslations } from "next-intl/server";
import ScrollReveal from "./ScrollReveal";

const WHY_KEYS = ["family", "licensed", "bilingual"] as const;

const WHY_ICONS: Record<string, string> = {
  family: "👨‍👩‍👧‍👦",
  licensed: "✅",
  bilingual: "🗣️",
};

export default async function WhyUs() {
  const t = await getTranslations("whyUs");

  return (
    <section
      id="why-us"
      className="bg-gradient-to-br from-slate-900 to-[#0c1e3e] py-24 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold text-sky-200 uppercase tracking-[2px] mb-3">
          {t("label")}
        </p>
        <h2
          className="font-black text-white tracking-[-1px] mb-14"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {t("title")}
        </h2>

        <ScrollReveal animation="fade-right" staggerChildren staggerInterval={180} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_KEYS.map((key) => (
            <div
              key={key}
              className="bg-white/[0.12] border border-white/20 rounded-2xl p-8 backdrop-blur-md text-center cryo-glow"
            >
              <div className="text-4xl mb-4">{WHY_ICONS[key]}</div>
              <h3
                className="font-bold text-sky-200 text-lg mb-2"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                {t(`${key}.title`)}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">
                {t(`${key}.desc`)}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
