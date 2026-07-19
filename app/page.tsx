import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Gallery from "@/components/Gallery";
import HeroBackdrop from "@/components/HeroBackdrop";
import { PLAY_STORE_URL, APP_STORE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Seaton Swift — Ghana's Fastest Delivery Network",
  description: "Connect your shop to verified riders. Get anything delivered across Ghana in minutes.",
};

// Store links come from lib/site.ts — the single source of truth. This page
// previously declared its own local copies, which meant updating the real
// listing URLs in one place would have silently missed the biggest download
// CTA on the site. The QR (public/qr-download.svg) encodes the same target and
// must be regenerated when those URLs change.

function IconCheck({ stroke = "var(--brand)" }: { stroke?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 7l3 3 6-6" />
    </svg>
  );
}

/* Live delivery-network hero art — a map card with a shop hub, several
   destinations, drawn routes and travelling dots fanning out across the city,
   plus floating status chips. Fully theme-aware via tokens. */
function HeroArt() {
  const dots = [
    { path: "#r1", dur: "3.8s", begin: "0s" },
    { path: "#r2", dur: "4.6s", begin: "-1.6s" },
    { path: "#r3", dur: "4.2s", begin: "-2.8s" },
    { path: "#r4", dur: "4.0s", begin: "-3.4s" },
  ];
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      {/* soft brand glow */}
      <div className="absolute inset-0 rounded-full bg-brand/10 blur-3xl scale-90" aria-hidden />

      {/* map card */}
      <div className="absolute inset-4 rounded-[28px] glass overflow-hidden">
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="48%" r="62%">
              <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.10" />
              <stop offset="70%" stopColor="var(--brand)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* brand glow wash */}
          <rect x="0" y="0" width="400" height="400" fill="url(#mapGlow)" />

          {/* city blocks for depth */}
          <g fill="var(--canvas-deep)" stroke="var(--line)" strokeWidth="2">
            <rect x="24" y="26" width="60" height="46" rx="8" />
            <rect x="300" y="34" width="70" height="52" rx="8" />
            <rect x="308" y="250" width="66" height="60" rx="8" />
            <rect x="28" y="240" width="58" height="66" rx="8" />
          </g>
          {/* a green park */}
          <rect x="150" y="300" width="86" height="72" rx="12" fill="rgba(34,197,94,0.14)" stroke="rgba(34,197,94,0.28)" strokeWidth="2" />

          {/* streets */}
          <g stroke="var(--line)" strokeWidth="11" strokeLinecap="round">
            <path d="M-20 120 H420" /><path d="M-20 255 H420" />
            <path d="M120 -20 V420" /><path d="M285 -20 V420" />
          </g>
          <g stroke="var(--line)" strokeWidth="4" opacity="0.6">
            <path d="M-20 60 H420" /><path d="M-20 330 H420" />
            <path d="M55 -20 V420" /><path d="M355 -20 V420" />
          </g>

          {/* routes fanning out from the hub */}
          <g stroke="var(--brand)" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.9" strokeDasharray="7 11">
            <path id="r1" d="M200 205 C 150 168, 120 128, 82 92">
              <animate attributeName="stroke-dashoffset" from="180" to="0" dur="3s" repeatCount="indefinite" />
            </path>
            <path id="r2" d="M200 205 C 252 178, 292 150, 322 116">
              <animate attributeName="stroke-dashoffset" from="180" to="0" dur="3.4s" repeatCount="indefinite" />
            </path>
            <path id="r3" d="M200 205 C 250 250, 280 292, 300 322">
              <animate attributeName="stroke-dashoffset" from="180" to="0" dur="3.2s" repeatCount="indefinite" />
            </path>
            <path id="r4" d="M200 205 C 156 250, 122 288, 96 318">
              <animate attributeName="stroke-dashoffset" from="180" to="0" dur="3.6s" repeatCount="indefinite" />
            </path>
          </g>

          {/* destination pins */}
          {[
            { cx: 82, cy: 92 }, { cx: 322, cy: 116 }, { cx: 300, cy: 322 }, { cx: 96, cy: 318 },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.cx} cy={p.cy} r="8" fill="var(--brand)" />
              <circle cx={p.cx} cy={p.cy} r="3.4" fill="#fff" />
            </g>
          ))}

          {/* travelling riders */}
          {dots.map((d, i) => (
            <g key={i}>
              <circle r="6" fill="var(--brand)" />
              <circle r="6" fill="var(--brand)" opacity="0.35">
                <animate attributeName="r" from="6" to="15" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.6s" repeatCount="indefinite" />
              </circle>
              <animateMotion dur={d.dur} begin={d.begin} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath href={d.path} />
              </animateMotion>
            </g>
          ))}

          {/* shop hub */}
          <circle cx="200" cy="205" r="17" fill="var(--brand)" opacity="0.18">
            <animate attributeName="r" from="17" to="30" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.35" to="0" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="205" r="15" fill="var(--surface)" stroke="var(--brand)" strokeWidth="3.5" />
          <g transform="translate(200,205)" stroke="var(--brand)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M-6 -1l1-4h10l1 4M-5 -1v6h10v-6M-5 -1h10" />
          </g>
        </svg>
      </div>

      {/* live network pill */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-2">
        <div className="flex items-center gap-2 glass rounded-full px-3.5 py-1.5">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-70 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
          </span>
          <span className="text-[11px] font-bold text-ink tracking-wide">Live network</span>
        </div>
      </div>

      {/* floating status chips */}
      <div className="absolute left-0 top-16 animate-float">
        <div className="flex items-center gap-2.5 glass rounded-2xl px-3.5 py-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <div>
            <p className="text-[11px] font-bold text-ink leading-none">Rider assigned</p>
            <p className="text-[10px] text-muted mt-1 leading-none">Kwame · 4.9★</p>
          </div>
        </div>
      </div>
      <div className="absolute right-0 bottom-20 animate-float-slow">
        <div className="flex items-center gap-2.5 glass rounded-2xl px-3.5 py-2.5">
          <span className="w-7 h-7 rounded-lg bg-brand/12 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6M12 22v-6M2 12h6M22 12h-6" /></svg>
          </span>
          <div>
            <p className="text-[11px] font-bold text-ink leading-none">2 mins away</p>
            <p className="text-[10px] text-muted mt-1 leading-none">Arriving now</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    tag: "SWIFT",
    title: "Everyday parcels & food",
    desc: "Documents, meals, and small packages on motorbikes — matched to the nearest rider and delivered across town in minutes.",
    icon: <path d="M5.5 17.5a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0zM18.5 17.5a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0zM8 17.5h7M15 6h-3l-2 5h7l-1-3h-1M3 17l2-5h5" />,
  },
  {
    tag: "CARRY",
    title: "Bigger loads, aboboyaa & small trucks",
    desc: "Furniture, bulk stock, and market runs on motor-tricycles or small trucks — for everything too big for a bike.",
    icon: <path d="M1 3h13v13H1zM14 8h4l3 3v5h-7M5.5 19a2 2 0 100-4 2 2 0 000 4zM17.5 19a2 2 0 100-4 2 2 0 000 4z" />,
  },
  {
    tag: "MOVE",
    title: "Full moves with helpers",
    desc: "Relocating a home or office? Book a truck with optional trained helpers to load, move, and unload — all in one place.",
    icon: <path d="M3 9l2-5h10l2 5M3 9h16v8H3zM3 17h16M7 21a2 2 0 100-4 2 2 0 000 4zM15 21a2 2 0 100-4 2 2 0 000 4z" />,
  },
];

const businessTypes = ["Restaurants", "Pharmacies", "Supermarkets", "Fashion Shops", "Online Sellers", "Electronics", "Bakeries", "Florists", "Bookshops", "Any Business"];

const features = [
  {
    title: "Verified Riders",
    desc: "Every rider is ID-verified, trained, and rated. You always know exactly who is handling your delivery.",
    icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>,
  },
  {
    title: "Live Tracking",
    desc: "Watch your delivery move in real time. Share the tracking link with your customer in a single tap.",
    icon: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" /></>,
  },
  {
    title: "Transparent Pricing",
    desc: "The exact price is calculated up front and shown before you post. Whatever the conditions, what you see is what you pay.",
    icon: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></>,
  },
  {
    title: "Instant Matching",
    desc: "Post a delivery and get matched to the nearest available rider in under two minutes — fairly, never at random.",
    icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  },
  {
    title: "Pay Your Way",
    desc: "Collect on delivery by cash or Mobile Money — MTN, Telecel, and AT. Fares and payouts are tracked cleanly for you.",
    icon: <><rect x="2" y="6" width="20" height="13" rx="2.5" /><path d="M2 10h20M6 15h4" /></>,
  },
  {
    title: "Proof of Delivery",
    desc: "Every drop-off is confirmed and time-stamped, with two-way ratings — so trust is built into every single trip.",
    icon: <><path d="M9 12l2 2 4-4" /><path d="M12 3l7 3v6c0 4-3 6.5-7 9-4-2.5-7-5-7-9V6l7-3z" /></>,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* full-bleed photo slideshow + readability scrim */}
        <HeroBackdrop />

        <div className="max-w-6xl mx-auto px-5 py-20 w-full grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/25 rounded-full px-4 py-1.5 text-xs font-medium text-white mb-6">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-70 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
              </span>
              Now live in the Ashanti Region 🇬🇭
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.7rem] font-extrabold leading-[1.05] tracking-tight mb-5 text-white drop-shadow-sm">
              Anything, anywhere,<br />
              <span className="text-brand">delivered swiftly.</span>
            </h1>
            <p className="text-white/85 text-lg leading-relaxed mb-8 max-w-lg">
              Seaton Swift connects your shop to verified riders across Ghana. Post a delivery, get matched in minutes, and track every step — from pickup to doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5">
              <Link href="/for-shops" className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-brand-ink font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors shadow-[var(--shadow-brand)]">
                Get Started as a Shop
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/for-riders" className="inline-flex items-center justify-center border border-white/30 bg-white/10 backdrop-blur hover:bg-white/20 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors">
                Become a Rider
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/80">
              {["No setup fee", "Match in 2 mins", "Live tracking"].map((t) => (
                <span key={t} className="flex items-center gap-1.5"><IconCheck stroke="#fff" /> {t}</span>
              ))}
            </div>
          </div>
          {/* live network map, floating over the photo backdrop */}
          <div className="hidden lg:block"><HeroArt /></div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-brand sheen">
        <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-3 divide-x divide-white/20 relative">
          {[
            { num: "500+", label: "Deliveries Completed" },
            { num: "50+", label: "Verified Riders" },
            { num: "4.8★", label: "Average Rating" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-2 px-4 text-brand-ink">
              <span className="text-3xl sm:text-4xl font-extrabold">{s.num}</span>
              <span className="text-xs sm:text-sm font-medium opacity-90 mt-1 text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-brand text-xs font-semibold uppercase tracking-widest">One app, three ways to move</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">From a hot meal to a whole house</h2>
              <p className="text-muted mt-3 max-w-xl mx-auto">Whatever the size of the job, there&apos;s a Seaton Swift service for it — all in the same app.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <ScrollReveal key={s.tag}>
                <div className="group relative bg-surface border border-line rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[var(--shadow-md)]">
                  <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mb-6 group-hover:bg-brand group-hover:scale-105 transition-all">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:!stroke-white transition-colors">{s.icon}</svg>
                  </div>
                  <span className="text-brand text-[11px] font-bold tracking-widest">{s.tag}</span>
                  <h3 className="text-lg font-bold mt-1 mb-3">{s.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-canvas-deep">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-brand text-xs font-semibold uppercase tracking-widest">Simple Process</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">How Seaton Swift works</h2>
              <p className="text-muted mt-3 max-w-lg mx-auto">Three steps between you and a completed delivery. No calls, no waiting, no guessing.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Post a Delivery", desc: "Open the app, enter pickup and drop-off locations, describe your package, and confirm the price.", icon: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></> },
              { step: "02", title: "Get Matched", desc: "Our system instantly matches you with the nearest verified rider. They accept and head straight to you.", icon: <><circle cx="5.5" cy="17.5" r="2.5" /><circle cx="18.5" cy="17.5" r="2.5" /><path d="M8 17.5h7M15 6h-3l-2 5h7l-1-3h-1M3 17l2-5h5" /></> },
              { step: "03", title: "Track Live", desc: "Follow your delivery on a live map. Get notified when picked up, in transit, and delivered.", icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></> },
            ].map((item) => (
              <ScrollReveal key={item.step}>
                <div className="flex flex-col items-center text-center bg-surface border border-line rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[var(--shadow-md)] h-full">
                  <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-5">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                  </div>
                  <span className="text-brand text-[11px] font-bold tracking-widest mb-2">STEP {item.step}</span>
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY / IN MOTION ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <span className="text-brand text-xs font-semibold uppercase tracking-widest">Seaton Swift in motion</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4">A delivery network you can see</h2>
              <p className="text-muted leading-relaxed mb-6">
                Real riders, real shops, real streets. From the busiest market to a quiet neighbourhood, Seaton Swift keeps your city moving — and you always know where your package is.
              </p>
              <ul className="space-y-3">
                {["Trusted riders across the Ashanti Region", "Businesses of every size, one platform", "Every parcel tracked to the doorstep"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 shrink-0 rounded-full bg-brand/12 flex items-center justify-center"><IconCheck /></span>
                    <span className="text-ink font-medium">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <Gallery />
          </ScrollReveal>
        </div>
      </section>

      {/* ── BUSINESS TYPES (marquee) ── */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-brand text-xs font-semibold uppercase tracking-widest">Built for Everyone</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Built for every Ghanaian business</h2>
              <p className="text-muted mt-3 max-w-md mx-auto">If you sell it, we deliver it. Any product, any size, anywhere in the city.</p>
            </div>
          </ScrollReveal>
        </div>
        <div className="marquee relative w-full">
          {/* fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-canvas to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-canvas to-transparent pointer-events-none" />
          <div className="marquee-track">
            {/* two identical copies → a seamless, continuous, one-direction loop */}
            {[...businessTypes, ...businessTypes].map((b, i) => (
              <span key={i} className="mx-3 inline-flex items-center gap-2.5 bg-surface border border-line rounded-full px-6 py-3 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                <span className="text-sm font-semibold text-ink">{b}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-canvas-deep">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-brand text-xs font-semibold uppercase tracking-widest">Why Seaton Swift</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">More than delivery — peace of mind</h2>
              <p className="text-muted mt-3 max-w-xl mx-auto">Everything a growing Ghanaian business needs to move goods reliably, get paid, and keep customers coming back.</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <ScrollReveal key={f.title}>
                <div className="bg-surface border border-line rounded-2xl p-7 hover:border-brand/30 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] transition-all h-full">
                  <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR RIDERS ── */}
      <section className="py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="bg-surface border border-line rounded-3xl p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center shadow-[var(--shadow-md)]">
              <div>
                <span className="text-brand text-xs font-semibold uppercase tracking-widest">For Riders</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4">Turn your bike into a business</h2>
                <p className="text-muted leading-relaxed mb-8">Join verified riders already earning on Seaton Swift. Work your own hours, set your own pace, and keep up to <span className="text-ink font-semibold">90% of every fare</span> — our commission starts at just 10%, with no hidden cuts.</p>
                <div className="flex flex-col gap-3 mb-8">
                  {[
                    { stat: "Up to 90%", label: "Of every fare — commission starts at just 10%" },
                    { stat: "Paid per trip", label: "Collect your fare at every drop-off" },
                    { stat: "Your hours", label: "Go online whenever you want" },
                  ].map((e) => (
                    <div key={e.stat} className="flex items-center gap-4 bg-canvas-deep rounded-xl p-4 border border-line">
                      <span className="text-brand font-extrabold text-lg whitespace-nowrap">{e.stat}</span>
                      <span className="text-muted text-sm">{e.label}</span>
                    </div>
                  ))}
                </div>
                <Link href="/for-riders" className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-brand-ink font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors">
                  Learn How to Join
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
              <div className="flex justify-center">
                <div className="relative w-64 h-64">
                  {/* animated brand rings */}
                  <div className="absolute inset-0 rounded-full bg-brand/10 animate-float-slow" />
                  <div className="absolute inset-8 rounded-full bg-brand/15" />

                  {/* rider earnings mini-card */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-52 bg-surface border border-line rounded-2xl p-4 shadow-[var(--shadow-md)]">
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="w-9 h-9 rounded-full bg-brand flex items-center justify-center shrink-0">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8.5" r="3.3" /><path d="M5.5 19.5a6.5 6.5 0 0113 0" /></svg>
                        </span>
                        <div className="leading-tight min-w-0">
                          <p className="text-[12px] font-bold text-ink truncate">Kwame A.</p>
                          <p className="text-[10px] text-muted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online</p>
                        </div>
                        <span className="ml-auto text-[10px] font-bold text-brand shrink-0">4.9★</span>
                      </div>
                      <p className="text-[10px] text-muted leading-none">This week</p>
                      <p className="text-2xl font-extrabold text-ink leading-tight mt-1">34 trips</p>
                      <div className="flex items-end gap-1.5 h-10 mt-2.5">
                        {[35, 55, 45, 70, 52, 85, 100].map((h, i, a) => (
                          <span key={i} className={`flex-1 rounded-t ${i >= a.length - 2 ? "bg-brand" : "bg-brand/30"}`} style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* earnings badge */}
                  <div className="absolute -bottom-3 -right-2 glass rounded-2xl px-3.5 py-2">
                    <p className="text-[10px] text-muted leading-none mb-1">You keep up to</p>
                    <p className="text-xl font-extrabold text-brand leading-none">90%</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── APP DOWNLOAD ── */}
      <section id="download" className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="bg-brand rounded-3xl p-8 md:p-14 relative overflow-hidden sheen">
              <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
                <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                  <circle cx="50" cy="50" r="80" stroke="#fff" strokeWidth="1" fill="none" />
                  <circle cx="350" cy="250" r="100" stroke="#fff" strokeWidth="1" fill="none" />
                  <circle cx="350" cy="50" r="60" stroke="#fff" strokeWidth="0.8" fill="none" />
                </svg>
              </div>
              <div className="relative grid md:grid-cols-[1fr_auto] gap-10 items-center">
                {/* copy + store badges */}
                <div className="text-center md:text-left">
                  <span className="inline-block bg-white/20 text-brand-ink text-xs font-semibold px-3 py-1 rounded-full mb-4">Now available on iOS &amp; Android</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink mb-3">Download Seaton Swift</h2>
                  <p className="text-brand-ink/85 text-lg mb-8 max-w-md mx-auto md:mx-0">Start posting deliveries or start earning today — free to download on your phone.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    {/* Google Play */}
                    <a href={PLAY_STORE_URL} className="flex items-center gap-3 bg-black text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#111] transition-colors border border-white/15 min-w-[180px] justify-center">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.25.92-.59 1.19l-2.27 1.31L15.39 12l2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z" /></svg>
                      <span className="text-left leading-tight"><span className="block text-[10px] font-normal opacity-75">GET IT ON</span>Google Play</span>
                    </a>
                    {/* App Store */}
                    <a href={APP_STORE_URL} className="flex items-center gap-3 bg-black text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#111] transition-colors border border-white/15 min-w-[180px] justify-center">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                      <span className="text-left leading-tight"><span className="block text-[10px] font-normal opacity-75">Download on the</span>App Store</span>
                    </a>
                  </div>
                </div>
                {/* QR card */}
                <div className="mx-auto md:mx-0">
                  <div className="bg-white rounded-2xl p-5 shadow-[var(--shadow-md)] text-center w-[210px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/qr-download.svg" alt="Scan to download Seaton Swift" width={160} height={160} className="w-40 h-40 mx-auto" />
                    <p className="text-[#14161C] text-sm font-bold mt-3">Scan to download</p>
                    <p className="text-[#5A6472] text-[11px] mt-0.5">Point your camera — works on iPhone &amp; Android</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
