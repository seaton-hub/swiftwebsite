"use client";
import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-[#2A2A2A] rounded-xl overflow-hidden bg-[#1A1A1A]"
        >
          <button
            className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-semibold text-white text-sm leading-snug">{item.q}</span>
            <span
              className={`shrink-0 w-6 h-6 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#9E9E9E] transition-transform duration-200 ${
                open === i ? "rotate-45 border-[#E8402A] text-[#E8402A]" : ""
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="1" x2="6" y2="11" />
                <line x1="1" y1="6" x2="11" y2="6" />
              </svg>
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open === i ? "max-h-64" : "max-h-0"
            }`}
          >
            <p className="px-6 pb-5 text-[#9E9E9E] text-sm leading-relaxed border-t border-[#2A2A2A] pt-4">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
