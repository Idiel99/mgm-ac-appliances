"use client";

import { useRef, useState, useCallback } from "react";

interface ReviewCard {
  name: string;
  date: string;
  text: string;
}

export default function TestimonialsCarousel({ cards }: { cards: ReviewCard[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scroll = useCallback((dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width ?? 300;
    el.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
  }, []);

  return (
    <div>
      {/* Scroll area */}
      <div className="relative lg:mx-14">
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="
                min-w-[80vw] max-w-[80vw]
                sm:min-w-[60vw] sm:max-w-[60vw]
                lg:min-w-[360px] lg:max-w-[380px]
                shrink-0 snap-start
                bg-white rounded-2xl p-6 border border-slate-100 shadow-sm
                hover:-translate-y-1 hover:shadow-md transition-all duration-200
              "
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="text-amber-400 text-sm">&#x2605;</span>
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">
                &ldquo;{card.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800 text-sm">{card.name}</span>
                <span className="text-slate-400 text-xs">{card.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-6 lg:w-8 bg-gradient-to-r from-sky-50 to-transparent pointer-events-none transition-opacity duration-200 ${canScrollLeft ? "opacity-100" : "opacity-0"}`} />
        <div className={`absolute right-0 top-0 bottom-0 w-6 lg:w-8 bg-gradient-to-l from-sky-50 to-transparent pointer-events-none transition-opacity duration-200 ${canScrollRight ? "opacity-100" : "opacity-0"}`} />

        {/* Desktop (lg+) arrows — flanking the scroll area */}
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className={`
            absolute -left-14 top-1/2 -translate-y-1/2
            w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md
            items-center justify-center
            text-slate-600 hover:text-sky-500 hover:border-sky-300 active:scale-95
            transition-all duration-200
            hidden lg:flex
            ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className={`
            absolute -right-14 top-1/2 -translate-y-1/2
            w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md
            items-center justify-center
            text-slate-600 hover:text-sky-500 hover:border-sky-300 active:scale-95
            transition-all duration-200
            hidden lg:flex
            ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Mobile + tablet arrows — centered below cards */}
      <div className="flex justify-center gap-3 mt-5 lg:hidden">
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className={`
            w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md
            flex items-center justify-center
            text-slate-600 hover:text-sky-500 hover:border-sky-300 active:scale-95
            transition-all duration-200
            ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className={`
            w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md
            flex items-center justify-center
            text-slate-600 hover:text-sky-500 hover:border-sky-300 active:scale-95
            transition-all duration-200
            ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
