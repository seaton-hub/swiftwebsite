"use client";
import { useEffect, useRef } from "react";

/* Thin brand rule across the top of the long legal documents, filling as you
   read. A 15-clause Terms of Service gives no sense of how much is left; this
   does, and it makes an otherwise static page feel responsive.

   Writes the width straight to the DOM inside a rAF rather than through state —
   a scroll handler that re-renders React on every frame is the classic way to
   make a page feel heavier than it is. */
export default function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      el.style.transform = `scaleX(${pct})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] pointer-events-none" aria-hidden>
      <div ref={ref} className="h-full bg-brand origin-left scale-x-0" />
    </div>
  );
}
