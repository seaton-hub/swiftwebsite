"use client";
import { useEffect, useState } from "react";

/* ────────────────────────────────────────────────────────────────────────────
   Full-bleed hero background slideshow — FIVE image slots.

   SWAPPING THE PHOTOS
   -------------------
   Photos live in  website/public/hero/  and are wired to the `src` values below
   (e.g. src: "/hero/swift1.webp"). To change one, drop the new file in that
   folder and update its `src` — the path starts at /hero/, NOT /public/hero/.
   Prefer .webp (see scripts note in the README of public/) and keep five slides.
   If a `src` is left empty the slide falls back to its branded gradient `scene`.

   PERFORMANCE: every slide sits stacked in the viewport, so `loading="lazy"`
   would NOT defer them — the browser counts them all as visible. Instead we
   mount slides lazily: only the current image and the one queued next, so a
   first visit fetches two photos rather than five.

   Crucially, mounting only ever GROWS — a slide is never removed once shown.
   An earlier version computed the mounted set as `active || next`, which tore
   the outgoing photo out of the DOM the instant `active` changed, while its
   wrapper was still 1s into fading out. The result was a hard cut to black
   mid-transition. Keeping shown slides mounted costs nothing (they are already
   downloaded and cached) and is what makes the cross-fade actually cross-fade.
──────────────────────────────────────────────────────────────────────────── */

type Slide = { key: string; src?: string; scene: string };

// Ordered to tell the three-service story: Swift → Swift → riders → Carry → Move.
const slides: Slide[] = [
  { key: "s1", src: "/hero/swift1.webp", scene: "linear-gradient(135deg,#E8402A 0%,#B4291A 100%)" },
  { key: "s2", src: "/hero/swift5.webp", scene: "linear-gradient(135deg,#23262E 0%,#111318 100%)" },
  { key: "s3", src: "/hero/swift2.webp", scene: "linear-gradient(135deg,#E8402A 0%,#8F1F13 100%)" },
  { key: "s4", src: "/hero/carry1.webp", scene: "linear-gradient(135deg,#2A2D36 0%,#14161C 100%)" },
  { key: "s5", src: "/hero/move3.webp", scene: "linear-gradient(135deg,#C9331F 0%,#7E1B10 100%)" },
];

export default function HeroBackdrop() {
  const [active, setActive] = useState(0);

  // A timeout keyed on `active` rather than a fixed interval: tapping a dot
  // restarts the countdown, so the slide you asked for gets its full turn
  // instead of being auto-advanced a moment later.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActive((v) => (v + 1) % slides.length), 5500);
    return () => clearTimeout(id);
  }, [active]);

  // Only the visible slide and the one queued next are worth downloading — but
  // once a slide has been mounted it stays mounted, so a fading-out photo is
  // never yanked from under the transition. Adjusting state during render is
  // React's documented pattern for deriving state from a changed value.
  const next = (active + 1) % slides.length;
  const [mounted, setMounted] = useState(() => new Set([0, 1]));
  if (!mounted.has(active) || !mounted.has(next)) {
    setMounted(new Set(mounted).add(active).add(next));
  }

  return (
    <>
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {slides.map((s, i) => (
          <div
            key={s.key}
            className="hero-slide absolute inset-0"
            data-active={i === active}
            // The branded gradient always sits underneath the photo, so a slide
            // that hasn't finished decoding fades in over brand colour rather
            // than over nothing — which is what made the first change and any
            // dot-jump look like a flash.
            style={s.src ? { background: s.scene } : undefined}
          >
            {s.src ? (
              mounted.has(i) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.src}
                  alt=""
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <div className="w-full h-full relative" style={{ background: s.scene }}>
                <div className="absolute inset-0 opacity-[0.10]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "52px 52px" }} />
                <span className="absolute top-24 right-6 inline-flex items-center gap-1.5 bg-black/25 backdrop-blur text-white/90 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M21 15l-5-5-9 9" /></svg>
                  Photo {i + 1} / 5
                </span>
              </div>
            )}
          </div>
        ))}

        {/* readability scrim — keeps the headline legible over any photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />

        {/* Brand watermark. Sits ABOVE the scrim (so it isn't darkened) and only
            appears on real photos — placeholders don't need branding. */}
        {slides[active].src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/logo-mark.png" alt="" width={148} height={160} className="absolute bottom-8 left-6 h-9 w-auto opacity-75 drop-shadow-lg" />
        )}
      </div>

      {/* slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setActive(i)}
            aria-label={`Show hero image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/45 hover:bg-white/75"}`}
          />
        ))}
      </div>
    </>
  );
}
