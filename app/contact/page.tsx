import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { GENERAL_EMAIL, SUPPORT_EMAIL } from "@/lib/site";

const title = "Contact Seaton Swift — Kumasi, Ghana";
const description =
  "Questions, partnerships, or support? Email the Seaton Swift team and we reply within one business day. Based in Kumasi, Ashanti Region.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact", type: "website" },
  twitter: { title, description },
};

/* Email only — no phone number, no WhatsApp, no `tel:` links. See lib/site.ts. */
const channels: { label: string; value: string; note: string; href?: string; icon: React.ReactNode }[] = [
  {
    label: "General enquiries",
    value: GENERAL_EMAIL,
    note: "Partnerships, press and anything else",
    href: `mailto:${GENERAL_EMAIL}`,
    icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
  },
  {
    label: "Support",
    value: SUPPORT_EMAIL,
    note: "We reply within 1 business day",
    href: `mailto:${SUPPORT_EMAIL}`,
    icon: <><circle cx="12" cy="12" r="9" /><path d="M9.1 9a3 3 0 015.8 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
  },
  {
    label: "Location",
    value: "Kumasi, Ashanti Region",
    note: "Ghana",
    icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact Us"
        title="We'd love to"
        accent="hear from you."
        subtitle="Questions about the platform, partnership enquiries, or just want to say hello — we're here and we reply fast."
      />

      <section className="pb-24 px-5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-start">
          {/* Channels */}
          <ScrollReveal>
            <div className="flex flex-col gap-4">
              {channels.map((c) => {
                const inner = (
                  <div className="flex items-start gap-4 bg-surface border border-line rounded-2xl px-6 py-5 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand/30 group-hover:shadow-(--shadow-md)">
                    <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center text-brand shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-muted text-xs mb-0.5">{c.label}</p>
                      <p className="text-ink font-semibold text-sm break-words">{c.value}</p>
                      <p className="text-muted text-xs mt-1">{c.note}</p>
                    </div>
                  </div>
                );
                return c.href ? (
                  <a key={c.label} href={c.href} className="group block">
                    {inner}
                  </a>
                ) : (
                  <div key={c.label} className="group">{inner}</div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal><ContactForm /></ScrollReveal>
        </div>
      </section>
    </>
  );
}
