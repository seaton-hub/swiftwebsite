"use client";
import { useEffect, useRef } from "react";

/* Shared step timeline for the "Getting Started" sections on /for-shops and
   /for-riders.

   Deliberately card-less: the steps sit straight on the canvas so the section
   reads as one continuous journey rather than five stacked boxes. The rail is
   brand-tinted where it begins and fades out past the last node, giving the
   sequence a visible start and finish.

   The nodes are `bg-canvas` so they punch a clean hole through the rail — if
   this is ever used on a `bg-canvas-deep` section, that fill needs to follow. */
export default function Steps({ items }: { items: { title: string; desc: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);

  // Same pattern as ScrollReveal, but staggered: revealing the whole list at
  // once loses the sense of sequence, so each node trails the one above it.
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
    <ol ref={ref} className="relative max-w-2xl mx-auto">
      {/* Rail, pinned to the node centre line (left-6 = half of the 48px node). */}
      <div
        className="absolute left-6 top-6 bottom-6 w-px -translate-x-1/2"
        style={{
          background:
            "linear-gradient(to bottom, var(--brand), var(--line) 16%, var(--line) 76%, transparent)",
        }}
        aria-hidden
      />

      {items.map((s, i) => (
        <li
          key={s.title}
          className="reveal group relative flex gap-6 pb-10 last:pb-0"
          style={{ transitionDelay: `${i * 55}ms` }}
        >
          <span className="relative shrink-0 w-12 h-12 rounded-full bg-canvas border border-line flex items-center justify-center transition-colors duration-300 group-hover:border-brand/50">
            {/* Halo blooms out of the node on hover — the only "fill" in the
                section, so the row you're reading is obvious without a box. */}
            <span
              className="absolute inset-0 rounded-full bg-brand/10 scale-50 opacity-0 transition-all duration-300 group-hover:scale-[1.45] group-hover:opacity-100"
              aria-hidden
            />
            <span className="relative text-sm font-bold tabular-nums text-muted transition-colors duration-300 group-hover:text-brand">
              {i + 1}
            </span>
          </span>

          <div className="pt-2.5 transition-transform duration-300 group-hover:translate-x-1">
            <h3 className="font-bold text-ink mb-1.5 transition-colors duration-300 group-hover:text-brand">
              {s.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed max-w-md">{s.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
