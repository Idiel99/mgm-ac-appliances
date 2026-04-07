"use client";

import { useEffect, useRef } from "react";

type Animation = "fade-up" | "fade-left" | "fade-right" | "zoom-in";

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  staggerChildren = false,
  staggerInterval = 100,
  className = "",
}: {
  children: React.ReactNode;
  animation?: Animation;
  delay?: number;
  staggerChildren?: boolean;
  staggerInterval?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (staggerChildren) {
            const children = el.querySelectorAll(":scope > *");
            children.forEach((child, i) => {
              setTimeout(() => {
                (child as HTMLElement).classList.add("scroll-visible");
              }, delay + i * staggerInterval);
            });
          } else {
            setTimeout(() => {
              el.classList.add("scroll-visible");
            }, delay);
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, staggerChildren, staggerInterval]);

  const classes = staggerChildren
    ? `scroll-stagger scroll-${animation} ${className}`
    : `scroll-hidden scroll-${animation} ${className}`;

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
