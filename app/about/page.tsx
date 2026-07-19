import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";

const title = "About Seaton Swift — Built in Ghana, for Ghana";
const description =
  "Seaton Swift is a product of Seaton Logistics — Ghana's trusted import and logistics company. Our mission is to make last-mile delivery reliable, affordable, and trackable for every Ghanaian business.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about", type: "website" },
  twitter: { title, description },
};

const values = [
  {
    title: "Reliability",
    desc: "We show up. Every delivery, every time. Our riders are trained and our platform is built to deliver on its promise.",
    icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>,
  },
  {
    title: "Transparency",
    desc: "You see the price before you confirm. You see the rider. You track the delivery live. No surprises, ever.",
    icon: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
  },
  {
    title: "Community",
    desc: "We are building income for Ghanaian riders and helping Ghanaian businesses grow. Every delivery supports the local economy.",
    icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></>,
  },
  {
    title: "Speed",
    desc: "Our name says it all. We are obsessed with matching faster, delivering faster, and improving constantly.",
    icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="Our Story"
        title="Built in Ghana."
        accent="Built for Ghana."
        subtitle="Seaton Swift was born from a simple observation: Ghanaian businesses needed a fast, reliable, affordable way to reach their customers — and no existing platform was built with them in mind."
        image="/gallery/carry1.webp"
        imageAlt="A Seaton Swift tricycle carrying bulk goods through a Ghanaian market street"
        chip={{ label: "Serving", value: "Ashanti" }}
      />

      {/* ── STORY ── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-5">
          <ScrollReveal>
            <div className="bg-surface border border-line rounded-3xl p-8 sm:p-10 space-y-5 shadow-[var(--shadow-md)]">
              <span className="text-brand text-xs font-semibold uppercase tracking-widest">How it started</span>
              <h2 className="text-2xl font-extrabold !mt-2">The problem we kept hearing</h2>
              <p className="text-muted leading-relaxed">
                Seaton Logistics has spent years helping Ghanaian businesses import cars, machinery, parts, and equipment from around the world. During that time we heard the same challenge over and over: <em className="text-ink not-italic font-medium">&quot;I can get the product here — but getting it to my customer on time is the problem.&quot;</em>
              </p>
              <p className="text-muted leading-relaxed">
                We saw restaurants losing orders. Pharmacies struggling to deliver medicine. Online sellers watching customers cancel because delivery was too slow or too expensive. The problem was never a lack of riders — Ghana has thousands of motorcycle riders. The problem was the absence of a reliable, connected platform.
              </p>
              <p className="text-muted leading-relaxed">
                Seaton Swift is our answer: a delivery marketplace connecting shops directly to verified, trained riders — with live tracking, transparent pricing, and riders paid at every drop-off. We launched first in the Ashanti Region, and we are building the infrastructure for last-mile delivery across Ghana.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── MISSION / VISION ── */}
      <section className="py-20 bg-canvas-deep">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                tag: "Mission",
                title: "Make last-mile delivery reliable for every Ghanaian business.",
                desc: "We exist to remove the delivery barrier for Ghanaian shops, restaurants, pharmacies, and online sellers — giving them a fleet of verified riders on demand, at prices that make business sense.",
                icon: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
              },
              {
                tag: "Vision",
                title: "Become the delivery backbone of West Africa.",
                desc: "We are starting in Kumasi and growing to every major city in Ghana, and ultimately across West Africa. Every shop, every rider, every delivery — on one trusted platform.",
                icon: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></>,
              },
            ].map((item) => (
              <ScrollReveal key={item.tag}>
                <div className="bg-surface border border-line rounded-2xl p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[var(--shadow-md)]">
                  <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center mb-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                  </div>
                  <span className="text-brand text-xs font-semibold uppercase tracking-widest">{item.tag}</span>
                  <h3 className="text-xl font-bold mt-2 mb-4 leading-snug">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-brand text-xs font-semibold uppercase tracking-widest">What We Stand For</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Our values</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <ScrollReveal key={v.title}>
                <div className="flex gap-5 bg-surface border border-line rounded-2xl p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[var(--shadow-md)]">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-brand/10 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{v.icon}</svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEATON LOGISTICS TIE-IN ── */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-surface border border-line rounded-3xl p-10 md:p-14 flex flex-col md:flex-row gap-10 items-center shadow-[var(--shadow-md)]">
              <div className="shrink-0 w-20 h-20 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 001 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l2-1.14" />
                  <path d="M16.5 9.4L7.55 4.24M3.29 7L12 12l8.71-5M12 22V12" />
                  <path d="M18 21a3 3 0 100-6 3 3 0 000 6z" /><path d="M22 22l-1.5-1.5" />
                </svg>
              </div>
              <div>
                <span className="text-brand text-xs font-semibold uppercase tracking-widest">Part of Seaton Logistics</span>
                <h2 className="text-2xl font-extrabold mt-2 mb-3">Backed by years of logistics experience</h2>
                <p className="text-muted leading-relaxed text-sm mb-5">
                  Seaton Swift is built on the foundation of Seaton Logistics — a company that has helped hundreds of Ghanaian businesses import vehicles, machinery, parts, and equipment from around the world. That deep understanding of how goods move, how trust is built, and how to serve Ghanaian businesses informs everything we do.
                </p>
                <a href="https://seatonlogistics.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-brand text-sm font-semibold hover:gap-2.5 transition-all">
                  Visit Seaton Logistics
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10" /></svg>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-brand rounded-3xl p-10 md:p-14 text-center relative overflow-hidden sheen">
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink mb-3">Be part of the network</h2>
                <p className="text-brand-ink/85 mb-8 max-w-md mx-auto">Whether you run a shop or ride a bike, there&apos;s a place for you on Seaton Swift.</p>
                <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
                  <Link href="/for-shops" className="inline-flex items-center justify-center bg-[#14161C] hover:bg-[#23262E] text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors border border-white/15">
                    Get Started as a Shop
                  </Link>
                  <Link href="/for-riders" className="inline-flex items-center justify-center border border-white/40 bg-white/10 hover:bg-white/20 text-brand-ink font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors">
                    Become a Rider
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

