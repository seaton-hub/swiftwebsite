import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "For Riders — Seaton Swift",
  description: "Turn your motorcycle into a business. Join Seaton Swift and start earning today. Flexible hours — you keep every delivery fee.",
};

const joinSteps = [
  { n: "01", title: "Download the App", desc: "Install Seaton Swift from Google Play and tap 'Sign up as a Rider'." },
  { n: "02", title: "Submit Your Documents", desc: "Upload your Ghana Card, valid riding licence, and a photo of your bike with its registration plate." },
  { n: "03", title: "Get Verified", desc: "Our team reviews your documents within 24 hours. You'll receive a notification once approved." },
  { n: "04", title: "Attend a Brief Orientation", desc: "A short online or in-person orientation (under 1 hour) covers platform rules, safety, and how to handle deliveries." },
  { n: "05", title: "Go Online and Start Earning", desc: "Tap 'Go Online', accept your first delivery, and collect your delivery fee at drop-off — you're paid on every trip." },
];

const requirements = [
  "Valid Ghana Card (National ID)",
  "Valid motorcycle riding licence",
  "Roadworthy motorcycle or vehicle",
  "A working Android smartphone",
  "A Mobile Money wallet for weekly commission payments",
  "Minimum age: 18 years",
];

const faq: { q: string; a: string }[] = [
  { q: "How and when do I get paid?", a: "You are paid on every trip — you collect the delivery fee directly at drop-off and keep it. Your only cost is the weekly platform commission, which you pay each Monday via Mobile Money from the app's Earnings tab." },
  { q: "How much can I earn per delivery?", a: "Standard (Swift) deliveries start from a GHS 5 base fare plus GHS 2.50 per kilometre — a typical 5 km delivery pays GHS 17.50. Bigger packages (Carry) and large items (Move) pay higher rates, and busy periods add a surge bonus. You always see the exact fee before you accept." },
  { q: "Do I have to work set hours?", a: "No. You go online and offline whenever you choose. There are no minimum hours or shift requirements." },
  { q: "What happens if a customer disputes a delivery?", a: "All deliveries are tracked and time-stamped. If you followed the correct process, you are protected. Disputes are reviewed by our support team within 24 hours." },
  { q: "Is there a weekly commission or subscription fee?", a: "There are no upfront fees or subscriptions. Riders pay a commission of 10% on Swift deliveries (12% on Carry and Move). It adds up during the week and you pay it every Monday via Mobile Money from the Earnings tab." },
];

export default function ForRidersPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E8402A] opacity-[0.06] rounded-full blur-[120px] -translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 text-center relative">
          <span className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-4 py-1.5 text-xs font-medium text-[#9E9E9E] mb-6">
            For Riders
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            Turn your bike into a <span className="text-[#E8402A]">business.</span>
          </h1>
          <p className="text-[#9E9E9E] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Join Seaton Swift and earn on your own schedule. No boss, no fixed hours — just you, your bike, and reliable daily earnings from shops across Ghana.
          </p>
          <a href="#" className="inline-flex items-center gap-2 bg-[#E8402A] hover:bg-[#d13520] text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors">
            Apply to Ride
          </a>
        </div>
      </section>

      {/* EARNINGS */}
      <section className="py-16 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest">Earnings</span>
              <h2 className="text-3xl font-extrabold mt-2">What you can earn</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              { label: "Per delivery (avg 5 km)", value: "GHS 15.75" },
              { label: "Per day (5 deliveries)", value: "GHS 78.75" },
              { label: "Per month (22 working days)", value: "GHS 1,732" },
            ].map((e) => (
              <ScrollReveal key={e.label}>
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-7 text-center hover:border-[#E8402A]/30 transition-colors">
                  <p className="text-[#E8402A] text-3xl font-extrabold mb-2">{e.value}</p>
                  <p className="text-[#9E9E9E] text-sm">{e.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-center text-[#9E9E9E] text-xs">Estimates based on Swift deliveries at GHS 5 base + GHS 2.50/km, less 10% commission. Carry and Move trips pay higher rates. Actual earnings vary by location and trip distance.</p>
        </div>
      </section>

      {/* HOW TO JOIN */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest">Getting Started</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">How to join Seaton Swift</h2>
            </div>
          </ScrollReveal>
          <div className="flex flex-col gap-5 max-w-3xl mx-auto">
            {joinSteps.map((s) => (
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

      {/* REQUIREMENTS */}
      <section className="py-16 bg-[#0D0D0D]">
        <div className="max-w-3xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-extrabold">Requirements</h2>
              <p className="text-[#9E9E9E] mt-2 text-sm">What you need to ride with Seaton Swift</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-3">
            {requirements.map((r) => (
              <div key={r} className="flex items-center gap-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-5 py-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#E8402A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 8l3 3 8-6" /></svg>
                <span className="text-sm text-white">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest">FAQ</span>
              <h2 className="text-3xl font-extrabold mt-2">Rider questions</h2>
            </div>
          </ScrollReveal>
          <FAQAccordion items={faq} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to start earning?</h2>
          <p className="text-[#9E9E9E] mb-8">Download the app and apply in under 5 minutes. Get approved in 24 hours.</p>
          <a href="#" className="inline-flex items-center gap-2 bg-[#E8402A] hover:bg-[#d13520] text-white font-semibold px-8 py-4 rounded-xl transition-colors">
            Download and Apply
          </a>
        </div>
      </section>
    </>
  );
}
