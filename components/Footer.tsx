import Link from "next/link";
import Logo from "./Logo";

const cols = [
  {
    heading: "Platform",
    links: [
      { label: "For Shops", href: "/for-shops" },
      { label: "For Riders", href: "/for-riders" },
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

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#2A2A2A] pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-3 text-[#9E9E9E] text-sm leading-relaxed">
              Delivered. Swift.
            </p>
            <p className="mt-2 text-[#9E9E9E] text-xs leading-relaxed">
              Ghana&apos;s fastest delivery network — connecting shops to verified riders across the Ashanti Region.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://wa.me/233200577600"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#9E9E9E] hover:text-white hover:border-[#E8402A] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a
                href="https://www.facebook.com/share/1BHdFX9xVY/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#9E9E9E] hover:text-white hover:border-[#E8402A] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a
                href="https://www.tiktok.com/@seatonlogistics"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#9E9E9E] hover:text-white hover:border-[#E8402A] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="text-white text-sm font-semibold mb-4">{col.heading}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"external" in l && l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9E9E9E] hover:text-white text-sm transition-colors"
                      >
                        {l.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-[#9E9E9E] hover:text-white text-sm transition-colors"
                      >
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
        <div className="border-t border-[#2A2A2A] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9E9E9E]">
          <span>© {year} Seaton Swift. A product of Seaton Logistics™. All rights reserved.</span>
          <span>Kumasi, Ashanti Region, Ghana</span>
        </div>
      </div>
    </footer>
  );
}
