"use client";
import { useEffect, useRef } from "react";

/* Eligibility checklist for /for-riders.

   Card-less, like Steps: a two-column ledger of hairline-ruled rows rather than
   six bordered tiles. The ticks draw themselves in one after another as the
   section scrolls into view (see `.tick` in globals.css), so the list behaves
   like a checklist being worked through — which is exactly what a rider is
   doing mentally when they read it. */
export default function Checklist({ items }: { items: string[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((n) => n.classList.add("visible"));
          obs.unobserve(el);
        }
      },
      // Pre-trigger, matching ScrollReveal — see the note there.
      { threshold: 0, rootMargin: "0px 0px 300px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <ul ref={ref} className="grid sm:grid-cols-2 gap-x-10">
      {items.map((item, i) => (
        <li
          key={item}
          className="reveal group flex items-center gap-4 py-4 border-b border-line"
          style={{ transitionDelay: `${i * 45}ms` }}
        >
          <span className="shrink-0 w-7 h-7 rounded-full border border-brand/30 bg-brand/5 flex items-center justify-center transition-colors duration-300 group-hover:bg-brand group-hover:border-brand">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-brand transition-colors duration-300 group-hover:text-brand-ink"
              aria-hidden
            >
              <path className="tick" d="M2.5 8l3 3 8-6" />
            </svg>
          </span>
          <span className="text-sm text-ink font-medium transition-transform duration-300 group-hover:translate-x-0.5">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
