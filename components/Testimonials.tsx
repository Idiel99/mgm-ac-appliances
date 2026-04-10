import { getTranslations } from "next-intl/server";
import TestimonialsCarousel from "./TestimonialsCarousel";

export default async function Testimonials() {
  const t = await getTranslations("testimonials");

  const reviews = [0, 1, 2, 3, 4, 5];

  const cards = reviews.map((i) => ({
    name: t(`reviews.${i}.name`),
    date: t(`reviews.${i}.date`),
    text: t(`reviews.${i}.text`),
  }));

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
        <TestimonialsCarousel cards={cards} />
      </div>
    </section>
  );
}
