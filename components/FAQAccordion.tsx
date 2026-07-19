"use client";
import { useId, useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

/* Card-less accordion: one hairline-divided column instead of a stack of boxed
   panels, so a long FAQ reads as a single list rather than a wall of chips.

   The answer animates on grid-template-rows 0fr → 1fr, which expands to the
   content's natural height. The previous max-height approach needed a magic
   number (420px) that longer answers would have silently clipped. */
export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();

  return (
    <div className="border-y border-line divide-y divide-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                id={`${uid}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`group w-full text-left flex items-start justify-between gap-5 py-5 transition-colors duration-200 ${
                  isOpen ? "text-brand" : "text-ink hover:text-brand"
                }`}
              >
                <span className="font-semibold text-[15px] leading-snug">{item.q}</span>
                <svg
                  className={`shrink-0 mt-0.5 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-brand" : "text-muted group-hover:text-brand"
                  }`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </h3>

            <div
              id={`${uid}-a${i}`}
              role="region"
              aria-labelledby={`${uid}-q${i}`}
              // Collapsed answers stay in the DOM for the animation, so hide
              // them from screen readers explicitly. Safe here — the panel
              // holds no focusable content.
              aria-hidden={!isOpen}
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="border-l-2 border-brand/40 pl-4 pb-6 text-muted text-sm leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
