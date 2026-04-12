import { getTranslations } from "next-intl/server";

const OFFERS = ["offer1", "offer2"] as const;

export default async function SpecialOffers() {
  const t = await getTranslations("offers");
  const shared = await getTranslations("shared");

  return (
    <section className="bg-gradient-to-r from-sky-600 to-sky-500 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold text-sky-100 uppercase tracking-[2px] mb-2">
          {t("label")}
        </p>
        <h2
          className="font-black text-white tracking-[-1px] mb-10"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {OFFERS.map((key) => (
            <div key={key} className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-200">
              <span className="inline-block bg-white text-sky-600 font-black text-sm px-3 py-1 rounded-full mb-4">
                {t(`${key}.badge`)}
              </span>
              <h3 className="font-bold text-white text-lg mb-2" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
                {t(`${key}.title`)}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">{t(`${key}.desc`)}</p>
              <a
                href={`tel:${shared("phoneEnRaw")}`}
                className="inline-flex items-center gap-1.5 text-white font-semibold text-sm hover:text-sky-100 transition-colors"
              >
                📞 {t("cta")}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
