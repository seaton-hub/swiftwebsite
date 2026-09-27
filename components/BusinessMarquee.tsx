"use client";
import { useState } from "react";

/* The endless strip of business types on the home page.

   Two identical copies and a -50% translate make the loop seamless (see
   .marquee-track in globals.css). The second copy is aria-hidden, so a screen
   reader hears the list once, not twice.

   Text that moves on its own has to be stoppable (WCAG 2.2.2). Hovering holds
   it still; the button stops it for anyone, keyboard included; and reduced
   motion stops it before it starts. */
export default function BusinessMarquee({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false);

  const copy = (hidden: boolean) =>
    items.map((b) => (
      <span
        key={`${hidden ? "b" : "a"}-${b}`}
        aria-hidden={hidden || undefined}
        className="mx-3 inline-flex items-center gap-2.5 bg-surface border border-line rounded-full px-6 py-3 whitespace-nowrap"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden />
        <span className="text-sm font-semibold text-ink">{b}</span>
      </span>
    ));

  return (
    <>
      <div className="marquee relative w-full" data-paused={paused}>
        {/* fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-canvas to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-canvas to-transparent pointer-events-none" />
        <div className="marquee-track">
          {copy(false)}
          {copy(true)}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-ink px-3 py-1.5 rounded-full border border-line transition-colors"
        >
          {paused ? (
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M7 4l14 8-14 8z" /></svg>
          ) : (
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
          )}
          {paused ? "Resume scrolling" : "Pause scrolling"}
        </button>
      </div>
    </>
  );
}
