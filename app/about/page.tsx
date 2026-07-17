import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About — Seaton Swift",
  description: "Seaton Swift is a product of Seaton Logistics — Ghana's trusted import and logistics company. Our mission is to make last-mile delivery reliable, affordable, and trackable for every Ghanaian business.",
};

const values = [
  { title: "Reliability", desc: "We show up. Every delivery, every time. Our riders are trained and our platform is built to deliver on its promise." },
  { title: "Transparency", desc: "You see the price before you confirm. You see the rider. You track the delivery live. No surprises." },
  { title: "Community", desc: "We are building income for Ghanaian riders and enabling Ghanaian businesses to grow. Every delivery supports the local economy." },
  { title: "Speed", desc: "Our name says it all. We are obsessed with matching faster, delivering faster, and improving constantly." },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8402A] opacity-[0.05] rounded-full blur-[140px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 text-center relative">
          <span className="inline-block bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-4 py-1.5 text-xs font-medium text-[#9E9E9E] mb-6">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            Built in Ghana.<br />
            <span className="text-[#E8402A]">Built for Ghana.</span>
          </h1>
          <p className="text-[#9E9E9E] text-lg leading-relaxed max-w-2xl mx-auto">
            Seaton Swift was born from a simple observation: Ghanaian businesses needed a fast, reliable, and affordable way to deliver to their customers — and no existing platform was built with them in mind.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-5">
          <ScrollReveal>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-3xl p-10 space-y-5">
              <h2 className="text-2xl font-extrabold">Our Story</h2>
              <p className="text-[#9E9E9E] leading-relaxed">
                Seaton Logistics has spent years helping Ghanaian businesses import cars, machinery, parts, and equipment from around the world. During that time, we heard the same challenge from customers over and over: <em className="text-white not-italic">&quot;I can get the product here — but getting it to my customer on time is the problem.&quot;</em>
              </p>
              <p className="text-[#9E9E9E] leading-relaxed">
                We saw restaurants losing orders. Pharmacies struggling to deliver medicine. Online sellers watching customers cancel because delivery was too slow or too expensive. The problem was not a lack of riders — Ghana has thousands of motorcycle riders. The problem was the absence of a reliable, connected platform.
              </p>
              <p className="text-[#9E9E9E] leading-relaxed">
                Seaton Swift is our answer. A dedicated delivery marketplace that connects shops directly to verified, trained riders — with live tracking, transparent pricing, and daily rider payouts. Launched first in the Ashanti Region, we are building the infrastructure for last-mile delivery across Ghana.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="py-16 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-5">
          {[
            {
              tag: "Mission",
              title: "Make last-mile delivery reliable for every Ghanaian business.",
              desc: "We exist to remove the delivery barrier for Ghanaian shops, restaurants, pharmacies, and online sellers — giving them access to a fleet of verified riders on demand, at prices that make business sense.",
            },
            {
              tag: "Vision",
              title: "Become the delivery backbone of West Africa.",
              desc: "We are starting in Kumasi and growing to every major city in Ghana, and ultimately across West Africa. Every shop, every rider, every delivery — on one trusted platform.",
            },
          ].map((item) => (
            <ScrollReveal key={item.tag}>
              <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 hover:border-[#E8402A]/30 transition-colors h-full">
                <span className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest">{item.tag}</span>
                <h3 className="text-xl font-bold mt-3 mb-4 leading-snug">{item.title}</h3>
                <p className="text-[#9E9E9E] text-sm leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest">What We Stand For</span>
              <h2 className="text-3xl font-extrabold mt-2">Our values</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <ScrollReveal key={v.title}>
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-7 hover:border-[#E8402A]/30 transition-colors">
                  <h3 className="text-lg font-bold text-[#E8402A] mb-3">{v.title}</h3>
                  <p className="text-[#9E9E9E] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEATON LOGISTICS TIE-IN */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-3xl p-10 md:p-14 flex flex-col md:flex-row gap-10 items-center">
              <div className="shrink-0 w-20 h-20 rounded-2xl bg-[#E8402A]/10 border border-[#E8402A]/20 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#E8402A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 001 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l2-1.14" />
                  <path d="M16.5 9.4L7.55 4.24M3.29 7L12 12l8.71-5M12 22V12" />
                  <path d="M18 21a3 3 0 100-6 3 3 0 000 6z" /><path d="M22 22l-1.5-1.5" />
                </svg>
              </div>
              <div>
                <span className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest">Part of Seaton Logistics</span>
                <h2 className="text-2xl font-extrabold mt-2 mb-3">Backed by years of logistics experience</h2>
                <p className="text-[#9E9E9E] leading-relaxed text-sm mb-5">
                  Seaton Swift is proudly built on the foundation of Seaton Logistics — a company that has helped hundreds of Ghanaian businesses import vehicles, machinery, parts, and equipment from around the world. That deep understanding of how goods move, how trust is built, and how to serve Ghanaian businesses informs everything we do at Seaton Swift.
                </p>
                <a
                  href="https://seatonlogistics.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#E8402A] text-sm font-semibold hover:underline"
                >
                  Visit Seaton Logistics ↗
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Be part of the network</h2>
          <p className="text-[#9E9E9E] mb-8">Whether you run a shop or ride a bike, there&apos;s a place for you on Seaton Swift.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/for-shops" className="bg-[#E8402A] hover:bg-[#d13520] text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors text-center">
              Get Started as a Shop
            </Link>
            <Link href="/for-riders" className="border border-[#2A2A2A] hover:border-[#E8402A] text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors text-center">
              Become a Rider
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
