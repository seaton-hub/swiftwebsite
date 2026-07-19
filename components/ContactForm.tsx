"use client";
import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/site";

/* Static export has no backend to POST to, so the form hands off to WhatsApp
   (Seaton's real support channel) with the message pre-filled. Reliable in
   Ghana and needs no server or third-party form service. */
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Hello Seaton Swift,\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const field =
    "w-full bg-canvas border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all";

  if (sent) {
    return (
      <div className="bg-surface border border-line rounded-3xl p-8 shadow-[var(--shadow-md)] h-full flex flex-col items-center justify-center text-center py-16">
        <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Opening WhatsApp…</h3>
        <p className="text-muted text-sm max-w-xs">
          Send the pre-filled message and we&apos;ll reply as soon as we can. If nothing opened, chat us on{" "}
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-brand font-semibold hover:underline">WhatsApp</a>.
        </p>
        <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-muted hover:text-ink transition-colors">
          ← Write another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-line rounded-3xl p-8 shadow-[var(--shadow-md)]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <h2 className="text-xl font-bold">Send us a message</h2>
          <p className="text-muted text-sm mt-1">It opens in WhatsApp, so you get a reply on your phone.</p>
        </div>
        <div>
          <label htmlFor="name" className="text-xs text-muted font-semibold block mb-1.5">Full Name</label>
          <input id="name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Kwame Mensah" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="text-xs text-muted font-semibold block mb-1.5">Email Address</label>
          <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="kwame@example.com" className={field} />
        </div>
        <div>
          <label htmlFor="message" className="text-xs text-muted font-semibold block mb-1.5">Message</label>
          <textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help…" className={`${field} resize-none`} />
        </div>
        <button type="submit" className="group inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-brand-ink font-semibold py-3.5 rounded-xl text-sm transition-all shadow-[var(--shadow-brand)] hover:-translate-y-0.5">
          Send via WhatsApp
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </form>
    </div>
  );
}
