import Link from "next/link";
import Logo from "./Logo";
import { GENERAL_EMAIL } from "@/lib/site";

const cols = [
  {
    heading: "Platform",
    links: [
      { label: "Shops", href: "/for-shops" },
      { label: "Riders", href: "/for-riders" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Download App", href: "/#download" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Seaton Logistics", href: "https://seatonlogistics.com", external: true },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Delete Account", href: "/delete-account" },
    ],
  },
];

/* Email replaces the WhatsApp link that used to sit here — email is the only
   contact channel this site publishes. See lib/site.ts.

   `stroke: true` because the brand glyphs below are solid silhouettes while an
   envelope needs its flap drawn as a line; rendering this path filled would
   collapse it into a plain rectangle. */
const socials: { label: string; href: string; path: string; stroke?: boolean }[] = [
  { label: "Email", href: `mailto:${GENERAL_EMAIL}`, stroke: true, path: "M4 5h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2zm-1.4.6L12 12.5l9.4-6.9" },
  { label: "Facebook", href: "https://www.facebook.com/share/1BHdFX9xVY/?mibextid=wwXIfr", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  { label: "TikTok", href: "https://www.tiktok.com/@seatonlogistics", path: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-canvas-deep border-t border-line pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-ink text-sm font-semibold">Delivered. Swift.</p>
            <p className="mt-2 text-muted text-xs leading-relaxed">
              Ghana&apos;s fastest delivery network — connecting shops to verified riders across the Ashanti Region.
            </p>
            <div className="flex gap-2.5 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-surface border border-line flex items-center justify-center text-muted hover:text-brand hover:border-brand/40 transition-colors"
                >
                  <svg
                    width="16" height="16" viewBox="0 0 24 24"
                    fill={s.stroke ? "none" : "currentColor"}
                    stroke={s.stroke ? "currentColor" : "none"}
                    strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="text-ink text-sm font-semibold mb-4">{col.heading}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"external" in l && l.external ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-brand text-sm transition-colors">
                        {l.label} ↗
                      </a>
                    ) : (
                      <Link href={l.href} className="text-muted hover:text-brand text-sm transition-colors">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <span>© {year} Seaton Swift. A product of Seaton Logistics™. All rights reserved.</span>
          <span>Kumasi, Ashanti Region, Ghana</span>
        </div>
      </div>
    </footer>
  );
}
