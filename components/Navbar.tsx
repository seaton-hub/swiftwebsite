"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Shops", href: "/for-shops" },
  { label: "Riders", href: "/for-riders" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile sheet on navigation (including browser back/forward).
  // Adjusting state during render rather than in an effect avoids a cascading
  // re-render — React's recommended "reset state when a prop changes" pattern.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4">
      {/* Always a frosted floating island: the home hero sits behind a dark photo
          slideshow, so a transparent bar with themed (dark) text would be
          unreadable there. Glass keeps it legible on every page and theme. */}
      <nav className="mx-auto max-w-6xl rounded-2xl mt-3 glass transition-all duration-300">
        {/* Natural flex flow — the link group is centred in the space left between
            the logo and the actions (mx-auto), so the gaps stay balanced at every
            width instead of being absolutely positioned against the bar. */}
        <div className="h-16 pl-4 pr-3 sm:pl-5 sm:pr-4 flex items-center gap-4">
          <Logo />

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1.5 mx-auto">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      active
                        ? "text-brand bg-brand/10"
                        : "text-muted hover:text-ink hover:bg-surface-hover"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <ThemeToggle className="!rounded-full" />
            <Link
              href="/for-shops"
              // sheen + cta-pulse: a light sweep across the pill and a slow ring
              // breathing outward. The shadow utility is intentionally absent —
              // ctaPulse animates box-shadow, so it would just be overridden.
              className="group sheen cta-pulse inline-flex items-center gap-1.5 bg-brand hover:bg-brand-hover text-brand-ink text-sm font-semibold pl-5 pr-4 py-2.5 rounded-full transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            <ThemeToggle className="!rounded-full" />
            <button
              className="w-10 h-10 flex flex-col justify-center items-center gap-[5px] rounded-full border border-line bg-surface"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className={`block w-4 h-[2px] bg-ink rounded-full transition-all duration-200 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-4 h-[2px] bg-ink rounded-full transition-all duration-200 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-[2px] bg-ink rounded-full transition-all duration-200 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile sheet — expands the island */}
        <div className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-3 pb-3.5 pt-1.5 flex flex-col gap-1 border-t border-line">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-colors ${
                    active ? "text-brand bg-brand/10" : "text-ink hover:bg-surface-hover"
                  }`}
                >
                  {l.label}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? "opacity-100" : "opacity-30"}><path d="M9 6l6 6-6 6" /></svg>
                </Link>
              );
            })}
            <Link
              href="/for-shops"
              onClick={() => setOpen(false)}
              className="mt-2 sheen inline-flex items-center justify-center gap-1.5 bg-brand hover:bg-brand-hover text-brand-ink text-sm font-semibold px-5 py-3 rounded-xl text-center transition-colors shadow-[var(--shadow-brand)]"
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
