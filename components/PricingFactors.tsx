import { SERVICES } from "@/lib/site";

/* Explains HOW a delivery price is formed, without publishing figures.
   Fares move with demand, zone, time and weather, so any number printed here
   would go stale and contradict the app. The promise we can always make is:
   you see the exact price before you confirm, and it does not change after. */

const factors = [
  {
    title: "Distance",
    desc: "How far the package travels between pickup and drop-off.",
    icon: <><path d="M9 20l-5.4 2.3A1 1 0 013 21.4V6.6a1 1 0 01.6-.9L9 3.4M9 20l6-2.6M9 20V3.4M15 17.4l5.4 2.3a1 1 0 001.6-.9V4.6a1 1 0 00-.6-.9L15 1.4M15 17.4V1.4M15 1.4L9 3.4" /></>,
  },
  {
    title: "Service type",
    desc: "A bike, a tricycle or small truck, or a full truck with helpers.",
    icon: <><circle cx="5.5" cy="17.5" r="2.5" /><circle cx="18.5" cy="17.5" r="2.5" /><path d="M8 17.5h7M15 6h-3l-2 5h7l-1-3h-1M3 17l2-5h5" /></>,
  },
  {
    title: "Demand right now",
    desc: "Busy periods with more orders than riders cost a little more; quiet periods less.",
    icon: <><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></>,
  },
  {
    title: "Where you are",
    desc: "Rates are set by zone, so they reflect the realities of each area and region.",
    icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>,
  },
  {
    title: "Time of day",
    desc: "Late nights and peak rush hours are priced differently from a quiet morning.",
    icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  },
  {
    title: "Weather",
    desc: "Heavy rain makes riding harder and slower, and that is reflected in the fare.",
    icon: <><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" /></>,
  },
];

export default function PricingFactors() {
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {factors.map((f) => (
          <div
            key={f.title}
            className="bg-surface border border-line rounded-2xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[var(--shadow-md)]"
          >
            <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
            </div>
            <h3 className="font-bold mb-1.5">{f.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* the promise that replaces a price list */}
      <div className="mt-8 bg-brand rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden sheen">
        <div className="relative">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-brand-ink mx-auto mb-4 opacity-90">
            <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" />
          </svg>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mb-3">You always see the price first</h3>
          <p className="text-brand-ink/85 max-w-lg mx-auto leading-relaxed">
            Enter your pickup and drop-off, and the app shows the exact amount before you confirm
            anything. Accept it or walk away — the price never changes after you have agreed to it,
            and you are never charged if no rider accepts.
          </p>
        </div>
      </div>

      {/* relative positioning of the three services, no figures */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        {(Object.keys(SERVICES) as (keyof typeof SERVICES)[]).map((k, i) => (
          <div key={k} className="bg-surface border border-line rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-brand text-[11px] font-bold tracking-widest uppercase">{SERVICES[k].label}</span>
              <span className="flex gap-0.5" aria-hidden>
                {[0, 1, 2].map((d) => (
                  <span key={d} className={`w-1.5 h-1.5 rounded-full ${d <= i ? "bg-brand" : "bg-line"}`} />
                ))}
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">{SERVICES[k].blurb}</p>
          </div>
        ))}
      </div>
      <p className="text-muted text-xs text-center mt-4">
        Bigger vehicles and heavier jobs cost more than a bike — the dots show the relative order, not a rate.
      </p>
    </>
  );
}
