"use client";
import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      // Fire 300px BEFORE the element scrolls into view so its transition has
      // finished by the time you actually see it.
      //
      // This previously used `threshold: 0.12` with no rootMargin, meaning a
      // block only STARTED fading in once 12% of it was already on screen —
      // then took 600ms to arrive. On a phone, where everything is stacked in
      // one column and scrolling is fast, that reads as the page building
      // itself in front of you. Pre-triggering costs nothing and removes the
      // wait entirely.
      { threshold: 0, rootMargin: "0px 0px 300px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
