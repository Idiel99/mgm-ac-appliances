"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  num: string;
  label: string;
  delay: number;
};

export default function StatCounter({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-wrap gap-8 md:gap-12 mt-16 pt-8 border-t border-white/[0.08]"
    >
      {stats.map(({ num, label, delay }) => (
        <div key={label}>
          <div
            className={visible ? "stat-reveal" : "opacity-0"}
            style={
              {
                "--delay": `${delay}ms`,
                fontFamily: "var(--font-outfit), sans-serif",
              } as React.CSSProperties
            }
          >
            <span className="font-black text-sky-200 leading-none text-4xl">
              {num}
            </span>
          </div>
          <div
            className={`text-white/45 text-xs uppercase tracking-wide mt-1 ${
              visible ? "stat-reveal" : "opacity-0"
            }`}
            style={{ "--delay": `${delay + 150}ms` } as React.CSSProperties}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
