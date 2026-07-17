"use client";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      {/* HERO */}
      <section className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <span className="inline-block bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-4 py-1.5 text-xs font-medium text-[#9E9E9E] mb-6">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            We&apos;d love to <span className="text-[#E8402A]">hear from you.</span>
          </h1>
          <p className="text-[#9E9E9E] text-lg leading-relaxed">
            Questions about the platform, partnership enquiries, or just want to say hello — we&apos;re here.
          </p>
        </div>
      </section>

      <section className="py-10 px-5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

          {/* Contact info */}
          <div className="flex flex-col gap-5">
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
                label: "Email",
                value: "hello@seatonswift.com",
                href: "mailto:hello@seatonswift.com",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.5 12.22 19.79 19.79 0 011.49 3.59 2 2 0 013.47 1.5h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9a16 16 0 006 6l.61-.61a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>,
                label: "Phone",
                value: "+233 20 057 7600",
                href: "tel:+233200577600",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
                label: "Location",
                value: "Kumasi, Ashanti Region, Ghana",
                href: undefined,
              },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl px-6 py-5">
                <div className="w-10 h-10 rounded-xl bg-[#E8402A]/10 flex items-center justify-center text-[#E8402A] shrink-0">
                  {c.icon}
                </div>
                <div>
                  <p className="text-[#9E9E9E] text-xs mb-0.5">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="text-white font-semibold text-sm hover:text-[#E8402A] transition-colors">{c.value}</a>
                  ) : (
                    <p className="text-white font-semibold text-sm">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/233200577600?text=Hello%20Seaton%20Swift%2C%20I%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-4 rounded-2xl transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#E8402A]/10 border border-[#E8402A]/20 flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8402A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Message sent!</h3>
                <p className="text-[#9E9E9E] text-sm">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="text-xl font-bold mb-1">Send us a message</h2>
                <div>
                  <label className="text-xs text-[#9E9E9E] font-medium block mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Kwame Mensah"
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#9E9E9E] focus:outline-none focus:border-[#E8402A] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#9E9E9E] font-medium block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="kwame@example.com"
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#9E9E9E] focus:outline-none focus:border-[#E8402A] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#9E9E9E] font-medium block mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-[#111111] border border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#9E9E9E] focus:outline-none focus:border-[#E8402A] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#E8402A] hover:bg-[#d13520] text-white font-semibold py-3.5 rounded-xl text-sm transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
