import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Seaton Swift — Ghana's Fastest Delivery Network",
  description: "Connect your shop to verified riders. Get anything delivered across Ghana in minutes.",
};

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#E8402A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 7l3 3 6-6" />
    </svg>
  );
}

function HeroGraphic() {
  return (
    <svg viewBox="0 0 420 360" fill="none" className="w-full max-w-md mx-auto">
      <circle cx="210" cy="180" r="140" fill="#E8402A" fillOpacity="0.06" />
      <path d="M60 280 Q120 200 210 180 Q300 160 360 80" stroke="#E8402A" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
      <path d="M80 300 Q160 240 210 180 Q260 120 340 100" stroke="#E8402A" strokeWidth="1" strokeDasharray="4 6" opacity="0.25" />
      <circle cx="60" cy="280" r="8" fill="#E8402A" opacity="0.9" />
      <circle cx="60" cy="280" r="14" stroke="#E8402A" strokeWidth="1.5" opacity="0.3" />
      <circle cx="210" cy="180" r="10" fill="#E8402A" />
      <circle cx="210" cy="180" r="18" stroke="#E8402A" strokeWidth="1.5" opacity="0.35" />
      <circle cx="360" cy="80" r="8" fill="#E8402A" opacity="0.9" />
      <circle cx="360" cy="80" r="14" stroke="#E8402A" strokeWidth="1.5" opacity="0.3" />
      {/* Phone */}
      <rect x="155" y="90" width="110" height="190" rx="16" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1.5" />
      <rect x="163" y="102" width="94" height="160" rx="10" fill="#111111" />
      <rect x="175" y="110" width="30" height="4" rx="2" fill="#2A2A2A" />
      <rect x="212" y="110" width="20" height="4" rx="2" fill="#2A2A2A" />
      <rect x="163" y="122" width="94" height="60" rx="4" fill="#161616" />
      <path d="M175 150 Q190 140 210 152 Q230 164 250 148" stroke="#E8402A" strokeWidth="2" strokeDasharray="4 3" />
      <circle cx="175" cy="150" r="3" fill="#E8402A" />
      <circle cx="250" cy="148" r="3" fill="#4CAF50" />
      <rect x="170" y="192" width="80" height="20" rx="6" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1" />
      <circle cx="182" cy="202" r="5" fill="#E8402A" opacity="0.8" />
      <rect x="190" y="197" width="40" height="4" rx="2" fill="#2A2A2A" />
      <rect x="190" y="204" width="25" height="3" rx="1.5" fill="#1E1E1E" />
      <rect x="170" y="218" width="80" height="20" rx="6" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1" />
      <circle cx="182" cy="228" r="5" fill="#4CAF50" opacity="0.8" />
      <rect x="190" y="223" width="35" height="4" rx="2" fill="#2A2A2A" />
      <rect x="190" y="230" width="20" height="3" rx="1.5" fill="#1E1E1E" />
      <rect x="172" y="247" width="76" height="14" rx="7" fill="#E8402A" />
      {/* Floating badges */}
      <rect x="290" y="60" width="90" height="36" rx="10" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1" />
      <circle cx="306" cy="78" r="5" fill="#4CAF50" />
      <rect x="316" y="72" width="50" height="5" rx="2.5" fill="#2A2A2A" />
      <rect x="316" y="80" width="35" height="4" rx="2" fill="#1E1E1E" />
      <rect x="30" y="220" width="90" height="36" rx="10" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1" />
      <rect x="46" y="230" width="20" height="5" rx="2.5" fill="#E8402A" opacity="0.7" />
      <rect x="70" y="230" width="34" height="5" rx="2.5" fill="#2A2A2A" />
      <rect x="46" y="240" width="55" height="4" rx="2" fill="#1E1E1E" />
      <circle cx="210" cy="180" r="5" fill="white" opacity="0.95" />
    </svg>
  );
}

const businessTypes = [
  { icon: "🍽️", label: "Restaurants" },
  { icon: "💊", label: "Pharmacies" },
  { icon: "🛒", label: "Supermarkets" },
  { icon: "👗", label: "Fashion Shops" },
  { icon: "📦", label: "Online Sellers" },
  { icon: "🏪", label: "Any Business" },
];

const features = [
  {
    title: "Verified Riders",
    desc: "Every rider is ID-verified, trained, and rated. You know exactly who handles your delivery.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8402A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Live Tracking",
    desc: "Watch your delivery move in real time. Share the tracking link with your customer in one tap.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8402A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
  {
    title: "Transparent Pricing",
    desc: "GHS 5 base + GHS 2/km. No hidden fees, no surge pricing. Know your cost before posting.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8402A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: "Instant Matching",
    desc: "Post a delivery and get matched to the nearest available rider in under 2 minutes.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8402A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8402A] opacity-[0.07] rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E8402A] opacity-[0.04] rounded-full blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto px-5 py-20 w-full grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-4 py-1.5 text-xs font-medium text-[#9E9E9E] mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Now available in Ashanti Region 🇬🇭
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-5">
              Ghana&apos;s Fastest<br />
              <span className="text-[#E8402A]">Delivery Network</span>
            </h1>
            <p className="text-[#9E9E9E] text-lg leading-relaxed mb-8 max-w-lg">
              Connect your shop to verified riders. Get anything delivered across Ghana in minutes — tracked, reliable, and affordable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/for-shops" className="bg-[#E8402A] hover:bg-[#d13520] text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors text-center">
                Get Started as a Shop
              </Link>
              <Link href="/for-riders" className="border border-[#E8402A] text-[#E8402A] hover:bg-[#E8402A] hover:text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors text-center">
                Become a Rider
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-xs text-[#9E9E9E]">
              {["No setup fee", "Match in 2 mins", "Live tracking"].map((t) => (
                <span key={t} className="flex items-center gap-1.5"><IconCheck /> {t}</span>
              ))}
            </div>
          </div>
          <div className="hidden lg:block"><HeroGraphic /></div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#E8402A]">
        <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-3 divide-x divide-[#FF6B55]">
          {[
            { num: "500+", label: "Deliveries Completed" },
            { num: "50+", label: "Verified Riders" },
            { num: "4.8★", label: "Average Rating" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-2 px-4 text-white">
              <span className="text-3xl sm:text-4xl font-extrabold">{s.num}</span>
              <span className="text-xs sm:text-sm font-medium opacity-80 mt-1 text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest">Simple Process</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">How Seaton Swift Works</h2>
              <p className="text-[#9E9E9E] mt-3 max-w-lg mx-auto">Three steps between you and a completed delivery. No calls, no waiting, no guessing.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Post a Delivery", desc: "Open the app, enter pickup and drop-off locations, describe your package, and confirm the price.", icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg> },
              { step: "02", title: "Get Matched", desc: "Our system instantly matches you with the nearest verified rider. They accept and head straight to you.", icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="2.5" /><circle cx="18.5" cy="17.5" r="2.5" /><path d="M8 17.5h7M15 6h-3l-2 5h7l-1-3h-1" /><path d="M3 17l2-5h5" /></svg> },
              { step: "03", title: "Track Live", desc: "Follow your delivery on a live map. Get notified when picked up, in transit, and delivered.", icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg> },
            ].map((item) => (
              <ScrollReveal key={item.step}>
                <div className="flex flex-col items-center text-center bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 hover:border-[#E8402A]/40 transition-colors h-full">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8402A]/10 border border-[#E8402A]/20 flex items-center justify-center text-[#E8402A] mb-5">
                    {item.icon}
                  </div>
                  <span className="text-[#E8402A] text-[11px] font-bold tracking-widest mb-2">STEP {item.step}</span>
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-[#9E9E9E] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS TYPES */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest">Built for Everyone</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Built for every Ghanaian business</h2>
              <p className="text-[#9E9E9E] mt-3 max-w-md mx-auto">If you sell it, we deliver it. Any product, any size, anywhere in the city.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {businessTypes.map((b) => (
              <ScrollReveal key={b.label}>
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-[#E8402A]/40 hover:bg-[#1E1E1E] transition-all group text-center">
                  <span className="text-3xl">{b.icon}</span>
                  <span className="text-sm font-semibold text-white group-hover:text-[#E8402A] transition-colors">{b.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest">Why Seaton Swift</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Why shops choose Seaton Swift</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <ScrollReveal key={f.title}>
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-7 hover:border-[#E8402A]/30 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-[#E8402A]/10 flex items-center justify-center mb-5">{f.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-[#9E9E9E] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOR RIDERS */}
      <section className="py-10 px-5">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-3xl p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest">For Riders</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4">Turn your bike into a business</h2>
                <p className="text-[#9E9E9E] leading-relaxed mb-8">Join verified riders already earning on Seaton Swift. Work your own hours, set your own pace, and keep the majority of every fare.</p>
                <div className="flex flex-col gap-3 mb-8">
                  {[
                    { stat: "GHS 75+/day", label: "Average daily earnings (5 trips)" },
                    { stat: "You keep 85%", label: "Of every completed delivery" },
                    { stat: "Flexible hours", label: "Work whenever you want" },
                  ].map((e) => (
                    <div key={e.stat} className="flex items-center gap-4 bg-[#111111] rounded-xl p-4 border border-[#2A2A2A]">
                      <span className="text-[#E8402A] font-extrabold text-lg whitespace-nowrap">{e.stat}</span>
                      <span className="text-[#9E9E9E] text-sm">{e.label}</span>
                    </div>
                  ))}
                </div>
                <Link href="/for-riders" className="inline-flex items-center gap-2 bg-[#E8402A] hover:bg-[#d13520] text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors">
                  Learn How to Join
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
              <div className="flex justify-center">
                <div className="relative w-52 h-52">
                  <div className="absolute inset-0 rounded-full bg-[#E8402A]/10" />
                  <div className="absolute inset-4 rounded-full bg-[#E8402A]/15" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-[#E8402A] flex items-center justify-center shadow-[0_0_60px_rgba(232,64,42,0.35)]">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="5.5" cy="17.5" r="2.5" /><circle cx="18.5" cy="17.5" r="2.5" />
                        <path d="M8 17.5h7M15 6h-3l-2 5h7l-1-3h-1" /><path d="M3 17l2-5h5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* APP DOWNLOAD */}
      <section id="download" className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="bg-[#E8402A] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                  <circle cx="50" cy="50" r="80" stroke="white" strokeWidth="1" fill="none" />
                  <circle cx="350" cy="250" r="100" stroke="white" strokeWidth="1" fill="none" />
                  <circle cx="350" cy="50" r="60" stroke="white" strokeWidth="0.8" fill="none" />
                </svg>
              </div>
              <div className="relative">
                <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">Now Available</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Download Seaton Swift</h2>
                <p className="text-white/80 text-lg mb-10 max-w-md mx-auto">Start posting deliveries or start earning today. Available on Android.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a href="#" className="flex items-center gap-3 bg-black text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#111] transition-colors border border-white/20 min-w-[180px] justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.18 23.76a2 2 0 001.61-.43l.08-.07L14.69 13l-3.4-3.4-8.11 14.16zM20.49 10.6L18 9.11l-3.71 3.71 3.73 3.73 2.49-1.51a1.96 1.96 0 000-3.44zM1.5.5A2 2 0 001 1.98V21.9a2 2 0 00.5 1.48l.07.07L12.25 13 1.57.43 1.5.5zM14.69 11.88L4.87.21 4.79.14A2 2 0 003.18.5l10.11 10.11 1.4 1.27z" />
                    </svg>
                    <span><span className="block text-[10px] font-normal opacity-75">Get it on</span>Google Play</span>
                  </a>
                  <div className="flex items-center gap-3 bg-white/10 text-white/50 px-6 py-3.5 rounded-xl font-semibold text-sm border border-white/20 min-w-[180px] justify-center cursor-not-allowed select-none">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <span><span className="block text-[10px] font-normal">Coming Soon</span>App Store</span>
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
