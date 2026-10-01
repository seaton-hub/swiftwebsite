import type { Metadata } from "next";
import Checklist from "@/components/Checklist";
import FAQAccordion from "@/components/FAQAccordion";
import JsonLd from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import Steps from "@/components/Steps";
import StoreButtons from "@/components/StoreButtons";
import Link from "next/link";
import { SERVICES, SUPPORT_EMAIL } from "@/lib/site";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";

const title = "Become a Delivery Rider in Ghana | Seaton Swift";
const description =
  "Turn your motorcycle into a business. Flexible hours, no boss, and you keep up to 90% of every fare, and commission starts at just 10%.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/for-riders" },
  openGraph: { title, description, url: "/for-riders", type: "website" },
  twitter: { title, description },
};

const perks = [
  {
    title: "Keep up to 90%",
    desc: "Commission starts at just 10% on Swift trips. No sign-up fee, no subscription, nothing hidden.",
    icon: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></>,
  },
  {
    title: "Your own hours",
    desc: "Go online when it suits you. No shifts, no minimum trips, no one calling to ask where you are.",
    icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  },
  {
    title: "Paid at every drop-off",
    desc: "You collect the delivery fee in cash or Mobile Money at hand-off. No waiting for a payout.",
    icon: <><rect x="2" y="6" width="20" height="13" rx="2.5" /><path d="M2 10h20M6 15h4" /></>,
  },
  {
    title: "Fair dispatch",
    desc: "Offers go to the closest rider first, but riders waiting longest get priority, never random.",
    icon: <><path d="M12 3v18M5 8h14M7 8l-3 6h6zM17 8l-3 6h6z" /></>,
  },
];

const joinSteps = [
  { title: "Download the App", desc: "Install Seaton Swift on Android or iPhone and tap 'Sign up as a Rider'." },
  { title: "Submit Your Documents", desc: "Upload your Ghana Card, valid riding licence, and a photo of your bike with its registration plate." },
  { title: "Get Verified", desc: "Our team reviews your documents within 24 hours. You'll get a notification once approved." },
  { title: "Attend a Brief Orientation", desc: "A short online or in-person session (under 1 hour) covering platform rules, safety, and handling deliveries." },
  { title: "Go Online and Start Earning", desc: "Tap 'Go Online', accept your first delivery, and collect your fee at drop-off." },
];

const requirements = [
  "Valid Ghana Card (National ID)",
  "Valid motorcycle riding licence",
  "Roadworthy motorcycle or vehicle",
  "A working Android or iPhone smartphone",
  "A Mobile Money wallet for weekly commission",
  "Minimum age: 18 years",
];

// The whole rider FAQ lives here. The app's own FAQ screen is frozen and links
// to this page, so a new question is added here and nowhere else.
const faq: { q: string; a: string }[] = [
  { q: "How and when do I get paid?", a: "You are paid on every trip. You collect the delivery fee directly at drop-off and keep it. Your only cost is the platform commission, which you settle each Monday via Mobile Money from the app's Earnings tab." },
  { q: "How much can I earn per delivery?", a: "It varies by trip, and that works in your favour. A fare grows with distance, Carry and Move jobs pay more than a bike delivery, and busy periods add a surge bonus. Rather than promise a figure we cannot guarantee, the app shows you the exact fee for every job before you accept it, so you decide whether it is worth your time." },
  { q: "Do I have to work set hours?", a: "No. You go online and offline whenever you choose. There are no minimum hours or shift requirements." },
  { q: "How are deliveries assigned?", a: "Offers go to the nearest available rider first. Among riders who are equally close, whoever has waited longest since their last trip gets the offer, so work is shared fairly rather than handed out at random." },
  { q: "What happens if a customer disputes a delivery?", a: "All deliveries are tracked and time-stamped. If you followed the correct process, you are protected. Disputes are reviewed by our support team within 24 hours." },
  { q: "What do I need to sign up?", a: "Your Ghana Card and its number, your licence number if your vehicle needs a licence, a photo of your vehicle and its registration number, and a photo of yourself holding your Ghana Card. The last one is checked once, by our team, to confirm you are the person on the card. It is never shown to shops or customers." },
  { q: "Can I register more than one account?", a: "No. One Ghana Card, one rider account. A vehicle registration number can also only sit on one account at a time. If you own more than one vehicle you do not need another account. Add them all to the same one and switch between them in My Vehicles." },
  { q: "I bought a vehicle that is already registered to another rider. What do I do?", a: "Contact us with the registration document in your name and we will transfer the number to you. You do not need the previous owner to do anything, though they can also remove it from their own account." },
  { q: "Is there a weekly commission or subscription fee?", a: `There are no upfront fees or subscriptions. Riders pay a commission of ${SERVICES.swift.commission}% of each delivery fee on Swift deliveries (${SERVICES.carry.commission}% on Carry and Move). It adds up during the week and is due every Monday by 8:00 AM. You pay it via Mobile Money from the Earnings tab, and you can pay at any time during the week.` },
  { q: "What happens if I don't pay commission on time?", a: "You get a reminder on Friday, Saturday and Sunday, and a final warning, including an SMS, early on Monday morning. If your commission is still unpaid at 8:00 AM on Monday, your account is suspended: you cannot go online or accept trips. You can still sign in. Open the Earnings tab and pay via Mobile Money, and your account is reactivated as soon as the full balance is cleared." },
  { q: "How do I go online and start receiving trips?", a: "On the Home tab, tap the large round button to go online. Your account must be approved and all your documents uploaded first." },
  { q: "What is the pickup code?", a: "Every trip you accept comes with its own code, shown on your trip screen. When you arrive at the shop, tell them the code. They check it matches the one on their screen before handing over the package. Then tap Confirm Package Collected in your app and head to the delivery address." },
  { q: "How much do I collect from the customer?", a: "After you tap Confirm Delivered, the app shows a collection summary: the delivery fee, plus the price of the item if it was not paid for in advance. Collect exactly that amount from the recipient and nothing more." },
  { q: "How are bundle trips different?", a: "A bundle is several deliveries grouped into one route, usually from the same shop or from shops close together. You earn the fee for every stop, and your trip screen lists all the stops." },
  { q: "How do I renew my documents?", a: "When your Ghana Card or licence expires, a banner appears on your Home and Profile screens. Tap it, or open Profile, then Vehicles & Documents, and tap Renew. Upload a photo of the new document. Our team reviews it and updates your record." },
  { q: "What are rewards, and can I withdraw them?", a: "A reward is credit against the commission you owe, and nothing else. It cannot be withdrawn, transferred or paid out to you. Open Rewards from the Home tab to see what you have and apply it to your bill. If you forget, we apply it for you on Monday morning before commission falls due." },
  { q: "How do I earn a referral reward?", a: "Share the code on your Rewards screen. When a new rider signs up with it, the reward is added to your rewards once they are approved, have completed the number of deliveries shown on your Rewards screen, and have paid a week of commission. They have 90 days from creating their account to do all three. There is no limit on how many riders you can refer. Your code works while you are delivering: if you stop for a long stretch, it is refused at signup until you are back on the road." },
  { q: "The referral code I typed was refused. What now?", a: "Clear the field and finish signing up. Your account is not affected, and a refused code is better than an accepted one that was never going to pay anybody. Tap the i beside the field to see why it was refused: either it is not a real code, no rider has it, or it belongs to a rider who has stopped delivering. Check the code with the rider who gave it to you, because it can only be entered while you are creating your account and cannot be added afterwards." },
  { q: "Why has my referral not paid yet?", a: "All three things have to be true for the rider you referred: their account is approved, they have completed the number of deliveries shown on your Rewards screen, and they have paid a week of commission. The last one is usually what is outstanding, because commission weeks close on Sunday and fall due on Monday. Deliveries that ended in a dispute do not count. If they have not done all three within 90 days of creating their account, the referral lapses and no reward is paid for it." },
  { q: "Why did my reward disappear?", a: "Rewards expire. Each one shows its own use-by date on the Rewards screen, and an expired reward is removed. Apply what you have rather than saving it up. A reward can also be removed if it turns out not to have been earned, and if that happens you are sent a message explaining why." },
  { q: "What happens to my rewards if I delete my account?", a: "Rewards you have not used are cancelled with your account. They are not paid out, and they do not come back if you sign up again. Rewards already applied to your commission stay applied. You cannot delete your account while you owe commission, so you can apply your rewards to what you owe first and pay the rest." },
  { q: "What happens to a referral if one of us deletes their account?", a: "If the rider you referred deletes their account before the reward is earned, the referral ends and nobody is rewarded for it. If they delete it after the reward was added to your rewards, you keep it, and it still expires on its use-by date. If you delete your account, every referral you made ends with it: the riders you brought in keep their accounts, but no reward is paid for them, to you or to anyone else. Anyone can sign up again on the same Ghana Card, but a referral code used then earns nobody a reward, and there is no second joining reward." },
  { q: "How do I contact support?", a: `Open Profile, then Help & Support, and tap Message support to start a ticket. Our team replies right in the app. You can also email us at ${SUPPORT_EMAIL}.` },
];

export default function ForRidersPage() {
  return (
    <>
      <JsonLd data={[faqSchema(faq), breadcrumbSchema([{ name: "For Riders", path: "/for-riders" }])]} />

      <PageHero
        badge="For Riders"
        title="Turn your bike into a"
        accent="business."
        subtitle="Earn on your own schedule. No boss, no fixed hours. Just you, your bike, and steady work from shops across Ghana."
        image="/gallery/page-riders.webp"
        imageAlt="A smiling Seaton Swift rider on his red motorbike on a Kumasi street, checking his phone"
        chip={{ label: "You keep up to", value: "90%" }}
        actions={
          <>
            {/* To /download rather than straight to the App Store: a rider on
                an Android phone would otherwise land on a listing they cannot
                install from. */}
            <Link href="/download#rider" className="inline-flex items-center justify-center gap-2 bg-brand-fill hover:bg-brand-fill-hover text-brand-ink font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors shadow-(--shadow-brand)">
              Apply to Ride
              <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <a href="#earnings" className="inline-flex items-center justify-center border border-line bg-surface hover:border-brand/50 hover:text-brand-text text-ink font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors">
              See What You Could Earn
            </a>
          </>
        }
      />

      {/* ── PERKS ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-brand-text text-xs font-semibold uppercase tracking-widest">Why ride with us</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Built to be worth your time</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {perks.map((p) => (
              <ScrollReveal key={p.title}>
                <div className="flex gap-5 bg-surface border border-line rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-(--shadow-md)">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-brand/10 flex items-center justify-center">
                    <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p.icon}</svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EARNINGS CALCULATOR ── */}
      <section id="earnings" className="py-24 bg-canvas-deep scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-brand-text text-xs font-semibold uppercase tracking-widest">Earnings</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">How your earnings work</h2>
              <p className="text-muted mt-3 max-w-xl mx-auto">We will not promise you a number, because anyone who does is guessing. Here is how a fare is built, and exactly what reaches your pocket.</p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <ScrollReveal>
              <div className="bg-surface border border-line rounded-3xl p-7 sm:p-9 h-full shadow-(--shadow-md)">
                <h3 className="font-bold text-lg mb-5">What lifts a fare</h3>
                <div className="space-y-4">
                  {[
                    { t: "Longer trips", d: "Every kilometre adds to the fare, so distance works for you." },
                    { t: "Bigger jobs", d: "Carry and Move pay more than a standard bike delivery." },
                    { t: "Busy periods", d: "When demand outpaces available riders, a surge bonus is added." },
                    { t: "Tough conditions", d: "Late nights and heavy rain are priced to make the trip worth taking." },
                  ].map((r) => (
                    <div key={r.t} className="flex gap-4">
                      <span className="w-8 h-8 shrink-0 rounded-lg bg-brand/10 flex items-center justify-center">
                        <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                      </span>
                      <div>
                        <p className="font-semibold text-ink text-sm">{r.t}</p>
                        <p className="text-muted text-sm leading-relaxed mt-0.5">{r.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-brand-fill rounded-3xl p-7 sm:p-9 h-full text-brand-ink relative overflow-hidden sheen">
                <div className="relative flex flex-col h-full">
                  <p className="text-xs uppercase tracking-widest font-semibold opacity-95 mb-2">What you keep</p>
                  <p className="text-6xl font-extrabold leading-none mb-2">90%</p>
                  <p className="text-sm opacity-95 mb-7">of every Swift fare, commission starts at just {SERVICES.swift.commission}%</p>

                  <div className="space-y-3 border-t border-white/25 pt-6 mt-auto">
                    {[
                      "You see the exact fee before you accept, every job, no exceptions",
                      "You collect the fare at drop-off, in cash or Mobile Money",
                      "No sign-up fee, no subscription, no deductions you did not agree to",
                      `Commission is settled once a week, ${SERVICES.carry.commission}% on Carry and Move`,
                    ].map((t) => (
                      <div key={t} className="flex gap-3 text-sm">
                        <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d="M20 6L9 17l-5-5" /></svg>
                        <span className="opacity-90 leading-relaxed">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── HOW TO JOIN ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-brand-text text-xs font-semibold uppercase tracking-widest">Getting Started</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">How to join Seaton Swift</h2>
              <p className="text-muted mt-3">Approved in about 24 hours.</p>
            </div>
          </ScrollReveal>
          <Steps items={joinSteps} />
        </div>
      </section>

      {/* ── REQUIREMENTS ── */}
      <section className="py-20 bg-canvas-deep">
        <div className="max-w-3xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-brand-text text-xs font-semibold uppercase tracking-widest">Checklist</span>
              <h2 className="text-3xl font-extrabold mt-2">What you need to ride</h2>
            </div>
          </ScrollReveal>
          <Checklist items={requirements} />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-brand-text text-xs font-semibold uppercase tracking-widest">FAQ</span>
              <h2 className="text-3xl font-extrabold mt-2">Rider questions</h2>
            </div>
          </ScrollReveal>
          <FAQAccordion items={faq} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-brand-fill rounded-3xl p-10 md:p-14 text-center relative overflow-hidden sheen">
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink mb-3">Ready to start earning?</h2>
                <p className="text-brand-ink mb-8 max-w-md mx-auto">Download the app and apply in under 5 minutes. Most riders are approved within 24 hours.</p>
                <StoreButtons app="rider" tone="brand" className="justify-center" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

