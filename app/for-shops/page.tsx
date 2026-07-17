import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "For Shops — Seaton Swift",
  description: "Stop worrying about delivery. Post a delivery, get matched to a verified rider, and track it live. GHS 5 base + GHS 2/km.",
};

const steps = [
  { n: "01", title: "Download the App", desc: "Install Seaton Swift from Google Play and create your shop account in under 2 minutes." },
  { n: "02", title: "Add Your Shop", desc: "Enter your shop name, address, and the types of items you typically deliver." },
  { n: "03", title: "Post a Delivery", desc: "Enter the pickup location, drop-off address, package description, and recipient contact." },
  { n: "04", title: "Get Matched to a Rider", desc: "Within 2 minutes, a verified nearby rider accepts your delivery and heads to your pickup point." },
  { n: "05", title: "Track and Confirm", desc: "Watch the delivery live on the map — your customer gets an SMS when the rider collects, and you're notified the moment it's delivered." },
];

const faq: { q: string; a: string }[] = [
  { q: "How much does a delivery cost?", a: "Standard (Swift) deliveries cost GHS 5 as a base fee, plus GHS 2.50 per kilometre — a 5 km delivery is GHS 17.50. Bigger packages (Carry) and large items (Move) have their own rates. You always see the full price before confirming." },
  { q: "How quickly will a rider arrive?", a: "In most parts of Kumasi, a rider will be matched within 2 minutes and arrive at your pickup within 10–15 minutes, depending on traffic." },
  { q: "What types of items can I send?", a: "Food, medicine, clothing, parcels, documents, and most everyday goods. Items that are illegal, hazardous, or require special handling are not permitted." },
  { q: "What if the delivery fails or the item is damaged?", a: "We take responsibility seriously. If a delivery fails due to a rider error, you are not charged. Rider accounts are suspended for verified damage or misconduct." },
  { q: "Is there a minimum number of deliveries per month?", a: "No. Seaton Swift is pay-per-delivery with no subscriptions, no minimums, and no hidden fees. Use it as often or as seldom as you need." },
];

export default function ForShopsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8402A] opacity-[0.06] rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 text-center relative">
          <span className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-4 py-1.5 text-xs font-medium text-[#9E9E9E] mb-6">
            For Shop Owners
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            Stop worrying about <span className="text-[#E8402A]">delivery.</span>
          </h1>
          <p className="text-[#9E9E9E] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Your customers expect fast delivery. Seaton Swift gives you access to a fleet of verified riders on demand — no contracts, no monthly fees, no phone calls.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="bg-[#E8402A] hover:bg-[#d13520] text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors text-center">
              Download the App
            </a>
            <Link href="/contact" className="border border-[#2A2A2A] text-white hover:border-[#E8402A] font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors text-center">
              Talk to Us First
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING CALLOUT */}
      <section className="py-6 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#E8402A]/10 border border-[#E8402A]/30 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest mb-1">Simple Pricing</p>
              <p className="text-white font-bold text-lg">GHS 5 base + GHS 2 per km</p>
              <p className="text-[#9E9E9E] text-sm mt-0.5">No subscriptions. No hidden fees. Pay only when you deliver.</p>
            </div>
            <div className="flex gap-6 text-center">
              {[["GHS 15", "5 km delivery"], ["GHS 25", "10 km delivery"], ["GHS 35", "15 km delivery"]].map(([price, label]) => (
                <div key={label}>
                  <p className="text-white font-extrabold text-xl">{price}</p>
                  <p className="text-[#9E9E9E] text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest">Getting Started</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">From sign-up to first delivery</h2>
              <p className="text-[#9E9E9E] mt-3">Five simple steps to your first delivery.</p>
            </div>
          </ScrollReveal>
          <div className="flex flex-col gap-5 max-w-3xl mx-auto">
            {steps.map((s) => (
              <ScrollReveal key={s.n}>
                <div className="flex gap-5 items-start bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#E8402A]/30 transition-colors">
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-[#E8402A] text-white font-extrabold text-sm flex items-center justify-center">{s.n}</span>
                  <div>
                    <h3 className="font-bold text-white mb-1">{s.title}</h3>
                    <p className="text-[#9E9E9E] text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-[#0D0D0D] scroll-mt-24">
        <div className="max-w-3xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest">FAQ</span>
              <h2 className="text-3xl font-extrabold mt-2">Shop owner questions</h2>
            </div>
          </ScrollReveal>
          <FAQAccordion items={faq} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to start delivering?</h2>
          <p className="text-[#9E9E9E] mb-8">Download Seaton Swift and post your first delivery in under 5 minutes.</p>
          <a href="#" className="inline-flex items-center gap-2 bg-[#E8402A] hover:bg-[#d13520] text-white font-semibold px-8 py-4 rounded-xl transition-colors">
            Download the App
          </a>
        </div>
      </section>
    </>
  );
}
