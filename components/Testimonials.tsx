import { getTranslations } from "next-intl/server";

export default async function Testimonials() {
  const t = await getTranslations("testimonials");

  const reviews = [0, 1, 2, 3, 4, 5];

  return (
    <section className="bg-sky-50 py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold text-sky-600 uppercase tracking-[2px] mb-3">
          {t("label")}
        </p>
        <h2
          className="font-black text-slate-900 tracking-[-1px] mb-12"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">
                &ldquo;{t(`reviews.${i}.text`)}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800 text-sm">{t(`reviews.${i}.name`)}</span>
                <span className="text-slate-400 text-xs">{t(`reviews.${i}.date`)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
