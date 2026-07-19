"use client";
import { useEffect, useState } from "react";
import { slugify } from "@/lib/site";

/* Scroll-spy contents list for the long legal pages — highlights whichever
   section you're currently reading. Purely a navigation aid; the page is fully
   readable without it. */
export default function LegalToc({ sections }: { sections: string[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = sections.map(slugify);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Trigger once a heading clears the fixed navbar, ignoring the lower page.
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">On this page</p>
      <ul className="space-y-0.5 border-l border-line">
        {sections.map((s) => {
          const id = slugify(s);
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={`block py-1.5 pl-4 -ml-px border-l-2 transition-colors ${
                  isActive
                    ? "border-brand text-brand font-semibold"
                    : "border-transparent text-muted hover:text-ink hover:border-line"
                }`}
              >
                {s}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
