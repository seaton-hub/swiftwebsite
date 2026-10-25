"use client";
import { useId, useState } from "react";

/* A picture of one step: only the part of the phone's screen that matters,
   drawn at 3x (public/faq). w and h are its size in CSS pixels, so the page
   keeps its place while it loads. */
export interface FAQShot {
  text: string;
  img: string;
  alt: string;
  w: number;
  h: number;
}

/* Steps under an answer that tells someone how to set something on their
   phone (Richmond, 25 Oct 2026: "give screenshots on the steps"). The answer
   itself stays complete in words: search engines and the in-app help search
   read only the text (lib/seo faqSchema). */
export interface FAQSteps {
  title: string;
  numbered?: boolean;
  items: FAQShot[];
}

export interface FAQItem {
  q: string;
  a: string;
  steps?: FAQSteps[];
}

function StepGroup({ group }: { group: FAQSteps }) {
  const List = group.numbered ? "ol" : "ul";
  return (
    <div className="mt-5">
      <p className="text-ink text-sm font-semibold">{group.title}</p>
      <List className="mt-3 grid gap-5 sm:grid-cols-2 items-start">
        {group.items.map((step, i) => (
          <li key={step.img} className="flex flex-col gap-2.5">
            <p className="flex gap-2 text-muted text-sm leading-relaxed">
              {group.numbered && (
                <span className="shrink-0 grid place-items-center w-5 h-5 mt-px rounded-full bg-brand-fill text-brand-ink text-[11px] font-bold tabular-nums">
                  {i + 1}
                </span>
              )}
              <span>{step.text}</span>
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={step.img}
              alt={step.alt}
              width={step.w}
              height={step.h}
              loading="lazy"
              decoding="async"
              className="w-full max-w-90 h-auto rounded-xl border border-line"
            />
          </li>
        ))}
      </List>
    </div>
  );
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
                  isOpen ? "text-brand-text" : "text-ink hover:text-brand-text"
                }`}
              >
                <span className="font-semibold text-[15px] leading-snug">{item.q}</span>
                <svg
                  className={`shrink-0 mt-0.5 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-brand-text" : "text-muted group-hover:text-brand-text"
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
                <div className="border-l-2 border-brand/40 pl-4 pb-6">
                  <p className="text-muted text-sm leading-relaxed">{item.a}</p>
                  {item.steps?.map((group) => <StepGroup key={group.title} group={group} />)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
