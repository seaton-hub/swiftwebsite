import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";
import JsonLd from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import PricingFactors from "@/components/PricingFactors";
import Steps from "@/components/Steps";
import StoreButtons from "@/components/StoreButtons";
import { PLAY_STORE_URL } from "@/lib/site";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";

const title = "Delivery for Shops in Ghana — Seaton Swift";
const description =
  "Stop worrying about delivery. Post a delivery, get matched to a verified rider, and track it live. See the exact price before you confirm — no contracts, no monthly fees.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/for-shops" },
  openGraph: { title, description, url: "/for-shops", type: "website" },
  twitter: { title, description },
};

const benefits = [
  {
    title: "No contracts, no monthly fees",
    desc: "Pay per delivery. Use it ten times a day or twice a month — the price is the same.",
    icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M9 15l2 2 4-4" /></>,
  },
  {
    title: "A fleet without the payroll",
    desc: "Verified riders on demand. No hiring, no fuel, no bikes to maintain, no idle staff.",
    icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></>,
  },
  {
    title: "Your customer stays informed",
    desc: "They get an SMS when the rider collects, and a live link to follow the delivery.",
    icon: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></>,
  },
  {
    title: "Proof on every drop-off",
    desc: "Each delivery is confirmed and time-stamped, so disputes are settled with facts.",
    icon: <><path d="M9 12l2 2 4-4" /><path d="M12 3l7 3v6c0 4-3 6.5-7 9-4-2.5-7-5-7-9V6l7-3z" /></>,
  },
];

const steps = [
  { title: "Download the App", desc: "Install Seaton Swift on Android or iPhone and create your shop account in under 2 minutes." },
  { title: "Add Your Shop", desc: "Enter your shop name, address, and the types of items you typically deliver." },
  { title: "Post a Delivery", desc: "Enter the pickup location, drop-off address, package description, and recipient contact." },
  { title: "Get Matched to a Rider", desc: "Within about 2 minutes a verified nearby rider accepts and heads to your pickup point." },
  { title: "Track and Confirm", desc: "Watch the delivery live on the map — your customer gets an SMS at pickup, and you're notified the moment it's delivered." },
];

const faq: { q: string; a: string }[] = [
  { q: "How much does a delivery cost?", a: "It depends on the distance, the service you choose, and conditions at the time — how busy your area is, the time of day, and the weather. Rather than quote a figure that would be wrong half the time, the app calculates the exact price the moment you enter your pickup and drop-off, and shows it before you confirm anything." },
  { q: "How quickly will a rider arrive?", a: "In most parts of Kumasi a rider is matched within about 2 minutes and arrives at your pickup within 10–15 minutes, depending on traffic." },
  { q: "What types of items can I send?", a: "Food, medicine, clothing, parcels, documents, and most everyday goods. Items that are illegal, hazardous, or require special handling are not permitted." },
  { q: "What if the delivery fails or the item is damaged?", a: "We take responsibility seriously. If a delivery fails due to a rider error, you are not charged. Rider accounts are suspended for verified damage or misconduct." },
  { q: "Is there a minimum number of deliveries per month?", a: "No. Seaton Swift is pay-per-delivery with no subscriptions, no minimums, and no hidden fees. Use it as often or as seldom as you need." },
  { q: "Why does the price change between deliveries?", a: "The same trip can cost differently at different times. Prices respond to live demand, the zone you are in, the time of day, and the weather — the same reasons a taxi costs more in a downpour or at rush hour. Whatever the conditions, the amount you see before confirming is the amount you pay." },
  { q: "Could I be charged more than I was quoted?", a: "For a Swift delivery, no. The price shown before you confirm is fixed and does not move afterwards, even if conditions change while the rider is on the way. Carry and Move work slightly differently: trucks are fewer and further apart, so if the nearest one has to travel a long way to reach you, a travel fee is added. The app tells you the most it can come to before you book, and the final price is settled the moment a driver accepts. If no rider accepts, you are not charged at all." },
  { q: "What is the travel fee on Carry and Move?", a: "Trucks are spread much further apart than bikes, so a driver may have to cover real distance just to reach your pickup. Rather than let those jobs go unaccepted, we pay the driver for that leg and show you the ceiling before you book. Nothing is added when a truck is already close by." },
];

export default function ForShopsPage() {
  return (
    <>
      {/* FAQ rich results + a breadcrumb trail under the search listing. */}
      <JsonLd data={[faqSchema(faq), breadcrumbSchema([{ name: "For Shops", path: "/for-shops" }])]} />

      <PageHero
        badge="For Shop Owners"
        title="Stop worrying about"
        accent="delivery."
        subtitle="Your customers expect fast delivery. Seaton Swift gives you a fleet of verified riders on demand — no contracts, no monthly fees, no phone calls."
        image="/gallery/swift4.webp"
        imageAlt="A shop owner handing a packed order to a Seaton Swift rider"
        chip={{ label: "Matched in", value: "~2 min" }}
        actions={
          <>
            <a href={PLAY_STORE_URL} className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-brand-ink font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors shadow-[var(--shadow-brand)]">
              Download the App
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center border border-line bg-surface hover:border-brand/50 hover:text-brand text-ink font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors">
              Talk to Us First
            </Link>
          </>
        }
      />

      {/* ── BENEFITS ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-brand text-xs font-semibold uppercase tracking-widest">Why shops switch</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Delivery, without the headache</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((b) => (
              <ScrollReveal key={b.title}>
                <div className="flex gap-5 bg-surface border border-line rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[var(--shadow-md)]">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-brand/10 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{b.icon}</svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{b.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING + CALCULATOR ── */}
      <section id="pricing" className="py-24 bg-canvas-deep scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-brand text-xs font-semibold uppercase tracking-widest">Transparent Pricing</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Know the price before you post</h2>
              <p className="text-muted mt-3 max-w-xl mx-auto">There is no fixed price list, because no two deliveries are the same. Here is exactly what shapes what you pay — and the promise that comes with it.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal><PricingFactors /></ScrollReveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-brand text-xs font-semibold uppercase tracking-widest">Getting Started</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">From sign-up to first delivery</h2>
              <p className="text-muted mt-3">Five simple steps. Most shops are live the same day.</p>
            </div>
          </ScrollReveal>
          <Steps items={steps} />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 bg-canvas-deep scroll-mt-24">
        <div className="max-w-3xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-brand text-xs font-semibold uppercase tracking-widest">FAQ</span>
              <h2 className="text-3xl font-extrabold mt-2">Shop owner questions</h2>
            </div>
          </ScrollReveal>
          <FAQAccordion items={faq} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-brand rounded-3xl p-10 md:p-14 text-center relative overflow-hidden sheen">
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink mb-3">Ready to start delivering?</h2>
                <p className="text-brand-ink/85 mb-8 max-w-md mx-auto">Download Seaton Swift and post your first delivery in under 5 minutes.</p>
                <StoreButtons className="justify-center" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

