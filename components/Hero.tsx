import { getTranslations } from "next-intl/server";
import IceParticles from "./IceParticles";
import StatCounter from "./StatCounter";
import Logo from "./Logo";

export default async function Hero() {
  const t = await getTranslations("hero");
  const shared = await getTranslations("shared");

  const stats = [
    { num: t("stat1Number"), label: t("stat1Label"), delay: 0 },
    { num: t("stat2Number"), label: t("stat2Label"), delay: 200 },
    { num: t("stat3Number"), label: t("stat3Label"), delay: 400 },
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-[#0c1e3e] to-[#0a3255] min-h-[92vh] flex items-center overflow-hidden px-4 md:px-8 py-16">
      {/* Glow effects */}
      <div className="absolute -top-48 -right-48 w-[700px] h-[700px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-36 -left-36 w-[500px] h-[500px] bg-sky-200/5 rounded-full blur-3xl pointer-events-none" />

      {/* Airflow lines */}
      <div className="airflow-line" style={{ top: "20%", "--duration": "7s", "--delay": "0s" } as React.CSSProperties} />
      <div className="airflow-line" style={{ top: "40%", "--duration": "9s", "--delay": "2s" } as React.CSSProperties} />
      <div className="airflow-line" style={{ top: "65%", "--duration": "8s", "--delay": "4s" } as React.CSSProperties} />
      <div className="airflow-line" style={{ top: "85%", "--duration": "11s", "--delay": "1s" } as React.CSSProperties} />

      {/* Floating ice particles */}
      <IceParticles />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="flex items-start gap-6 md:gap-8 mb-2">
          {/* Logo icon */}
          <div className="hidden sm:block flex-shrink-0 mt-2">
            <Logo size={90} className="md:w-[110px] md:h-[110px]" />
          </div>

          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-sky-500/15 border border-sky-500/30 text-sky-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
              ❄️ {t("badge")}
            </div>

            {/* Headline */}
            <h1
              className="font-black text-white leading-[1.05] tracking-[-2px] mb-6"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {t("h1Line1")}{" "}
              <span className="frost-text">
                {t("h1Highlight")}
              </span>
              <br />
              {t("h1Line2")}
            </h1>
          </div>
        </div>

        {/* Body */}
        <p className="text-white/65 text-lg leading-relaxed max-w-xl mb-10">
          {t("body")}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 items-center">
          <a
            href={`tel:${shared("phoneEnRaw")}`}
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-4 rounded-xl text-base shadow-[0_8px_32px_rgba(14,165,233,0.35)] hover:shadow-[0_12px_40px_rgba(14,165,233,0.45)] hover:-translate-y-0.5 transition-all"
          >
            📞 {t("ctaCall")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold px-8 py-4 rounded-xl text-base border border-white/15 backdrop-blur-sm transition-all"
          >
            ✉️ {t("ctaForm")}
          </a>
        </div>

        {/* Stats with animated reveal */}
        <StatCounter stats={stats} />
      </div>
    </section>
  );
}
