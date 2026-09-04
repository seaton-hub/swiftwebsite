"use client";
import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────────────────────
   Seaton Swift photo slideshow.

   SWAPPING THE PHOTOS
   -------------------
   Photos live in `website/public/gallery/` and are wired to the `image` values
   below (e.g. image: "/gallery/swift4.webp"). To change one, drop the new file
   in that folder and update its `image` — the path starts at /gallery/, NOT
   /public/gallery/. A slide with no `image` falls back to a branded gradient
   `scene`, so the section never breaks. Add or remove slides freely.

   PERFORMANCE: this section sits below the fold, so images are lazy-loaded and
   only the current + next slide are mounted. A first visit downloads none of
   them; scrolling here fetches one. Each photo also has an 800px variant
   (`<name>-800.webp`) offered via srcset, which is what most screens actually
   use — roughly half the bytes of the full-size file.
──────────────────────────────────────────────────────────────────────────── */

type Slide = {
  key: string;
  title: string;
  caption: string;
  image?: string;
  scene?: string;
  icon?: React.ReactNode;
};

// Walks the full journey and all three services: pickup → doorstep → the rider
// fleet → Carry (tricycle/small truck) → Move (full relocations).
const slides: Slide[] = [
  { key: "shop-pickup", image: "/gallery/swift4.webp", title: "Picked up from your shop", caption: "Your rider arrives, collects the order, and is on the road in minutes." },
  { key: "food", image: "/gallery/swift1.webp", title: "Hot food, still hot", caption: "Meals and everyday parcels delivered straight to the customer's door." },
  { key: "doorstep", image: "/gallery/swift5.webp", title: "Right to the doorstep", caption: "Fast, safe hand-offs your customers can count on, every time." },
  { key: "riders", image: "/gallery/swift2.webp", title: "Riders on every street", caption: "Verified riders online and ready across the Ashanti Region, all day." },
  { key: "bulky-bike", image: "/gallery/swift3.webp", title: "More than a small parcel", caption: "Awkward, bulky orders strapped down and moved safely on two wheels." },
  { key: "market", image: "/gallery/carry1.webp", title: "Market runs, sorted", caption: "Aboboyaa tricycles hauling sacks and bulk stock across town." },
  { key: "small-truck", image: "/gallery/carry2.webp", title: "Small trucks for bigger loads", caption: "When it's too big for a bike, Carry brings a truck to your door." },
  { key: "home-move", image: "/gallery/move1.webp", title: "Full moves with helpers", caption: "Trained helpers load, move, and unload your home or office." },
  { key: "moving-day", image: "/gallery/move3.webp", title: "Moving day made easy", caption: "Hostel, home, or office — Move handles all the heavy lifting." },
];

/** "/gallery/x.webp" → "/gallery/x-800.webp 800w, /gallery/x.webp 1280w" */
const srcSetFor = (image: string) =>
  `${image.replace(/\.webp$/, "-800.webp")} 800w, ${image} 1280w`;

export default function Gallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((v) => (v + 1) % slides.length), 4800);
    return () => clearInterval(id);
  }, [paused]);

  const go = (n: number) => setActive((n + slides.length) % slides.length);
  const next = (active + 1) % slides.length;
  const shouldLoad = (i: number) => i === active || i === next;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-3xl overflow-hidden border border-line shadow-(--shadow-md) bg-canvas-deep">
        {slides.map((s, idx) => (
          <div
            key={s.key}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${idx === active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            aria-hidden={idx !== active}
          >
            {s.image ? (
              shouldLoad(idx) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.image}
                  srcSet={srcSetFor(s.image)}
                  sizes="(min-width: 1024px) 550px, 100vw"
                  alt={s.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )
            ) : (
              <div className="absolute inset-0" style={{ background: s.scene ?? "linear-gradient(135deg,#E8402A,#B4291A)" }}>
                <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <svg className="absolute -right-6 -bottom-6 w-56 h-56 opacity-20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/15 backdrop-blur text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M21 15l-5-5-9 9" /></svg>
                  Photo slot
                </span>
              </div>
            )}
            {/* legibility gradient + caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute left-0 bottom-0 p-6 sm:p-8">
              <h3 className="text-white text-xl sm:text-2xl font-extrabold drop-shadow">{s.title}</h3>
              <p className="text-white/85 text-sm mt-1.5 max-w-sm">{s.caption}</p>
            </div>
            {/* Brand watermark — only on real photos, clear of the caption. */}
            {s.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/logo-mark.png" alt="" width={148} height={160} loading="lazy" className="absolute bottom-6 right-6 h-8 w-auto opacity-75 drop-shadow-lg" />
            )}
          </div>
        ))}

        {/* Arrows */}
        <button onClick={() => go(active - 1)} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur text-white flex items-center justify-center transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button onClick={() => go(active + 1)} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur text-white flex items-center justify-center transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {slides.map((s, idx) => (
          <button
            key={s.key}
            onClick={() => go(idx)}
            aria-label={`Show ${s.title}`}
            className={`h-2 rounded-full transition-all duration-300 ${idx === active ? "w-7 bg-brand" : "w-2 bg-line hover:bg-muted"}`}
          />
        ))}
      </div>
    </div>
  );
}
