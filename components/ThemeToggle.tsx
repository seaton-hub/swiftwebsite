"use client";
import { useSyncExternalStore } from "react";

/* Light/dark switch.

   The theme is applied pre-paint by the inline script in layout.tsx, so the
   `.dark` class on <html> — not React state — is the source of truth. We
   subscribe to it with useSyncExternalStore rather than mirroring it into
   state from an effect: that keeps the icon correct even if the class is
   changed from elsewhere, and avoids a cascading render on mount. */

function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
// Light is the default, so the server always renders the light-mode icon.
const getServerSnapshot = () => false;

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative w-9 h-9 rounded-lg border border-line bg-surface text-ink/80 hover:text-brand hover:border-brand/40 transition-colors flex items-center justify-center ${className}`}
    >
      {dark ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
