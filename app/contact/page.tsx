import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { WHATSAPP_NUMBER, PHONE_DISPLAY, GENERAL_EMAIL } from "@/lib/site";

const title = "Contact Seaton Swift — Kumasi, Ghana";
const description =
  "Questions, partnerships, or support? Chat with the Seaton Swift team on WhatsApp, call us, or send a message. Based in Kumasi, Ashanti Region.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact", type: "website" },
  twitter: { title, description },
};

const channels = [
  {
    label: "WhatsApp",
    value: PHONE_DISPLAY,
    note: "Fastest way to reach us",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Seaton Swift, I have a question.")}`,
    external: true,
    icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />,
    filled: true,
  },
  {
    label: "Phone",
    value: PHONE_DISPLAY,
    note: "Mon–Sat, 8am–7pm",
    href: `tel:+${WHATSAPP_NUMBER}`,
    icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.5 12.22 19.79 19.79 0 011.49 3.59 2 2 0 013.47 1.5h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9a16 16 0 006 6l.61-.61a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />,
  },
  {
    label: "Email",
    value: GENERAL_EMAIL,
    note: "We reply within 1 business day",
    href: `mailto:${GENERAL_EMAIL}`,
    icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
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
                  <div className="flex items-start gap-4 bg-surface border border-line rounded-2xl px-6 py-5 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand/30 group-hover:shadow-[var(--shadow-md)]">
                    <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center text-brand shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={c.filled ? "currentColor" : "none"} stroke={c.filled ? "none" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-muted text-xs mb-0.5">{c.label}</p>
                      <p className="text-ink font-semibold text-sm break-words">{c.value}</p>
                      <p className="text-muted text-xs mt-1">{c.note}</p>
                    </div>
                  </div>
                );
                return c.href ? (
                  <a key={c.label} href={c.href} className="group block" {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {inner}
                  </a>
                ) : (
                  <div key={c.label} className="group">{inner}</div>
                );
              })}

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Seaton Swift, I have a question.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-4 rounded-2xl transition-all hover:-translate-y-0.5"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Chat on WhatsApp
              </a>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal><ContactForm /></ScrollReveal>
        </div>
      </section>
    </>
  );
}
