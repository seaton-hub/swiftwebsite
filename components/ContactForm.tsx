"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { GENERAL_EMAIL } from "@/lib/site";

/* The form posts to the API and we send the email server-side.

   It used to hand off to `mailto:`, which the site was stuck with while it had
   no backend to post to. That failed silently on any device with no mail client
   configured — most phones where mail lives in a web app — and truncated long
   messages at the URL length limit, so visitors believed they had written to us
   and had not. The static export still has no server of its own; the API does
   the sending.

   `mailto:` survives only as an explicit escape hatch shown when the send
   genuinely fails, alongside the plain address and a copy button, so a visitor
   is never left with nowhere to go. */

const API =
  process.env.NEXT_PUBLIC_API_URL || "https://api.seatonlogistics.com";

/* Stricter than <input type="email">, which accepts "kwame@localhost" — no dot,
   no TLD. That is valid per the HTML spec and useless to us: we cannot reply to
   it, so the visitor waits for an answer that can never arrive. The server
   applies the same rule; this copy just catches it before a round trip. */
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/* A rider app's "contact us", shown when a vehicle number is already on another
   rider's account, opens this page as /contact?vehicle=GR432126 (the server's
   plateSupportUrl). The message is written for them and the page opens at the
   form, so all that is left is their name and email. Letters and digits only:
   whatever is in the link only ever becomes part of the message. */
const readVehicle = () =>
  (new URLSearchParams(window.location.search).get("vehicle") || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 15);
const vehicleMessage = (plate: string) =>
  `My vehicle number ${plate} is registered to another rider. I bought this vehicle and have the registration document in my name. Please transfer it to me.`;
// The address never changes while the page is open: nothing to subscribe to.
const subscribeNever = () => () => {};

// The navbar is fixed: a floating island 12px from the top and 64px tall. The
// form starts 16px below it.
const NAV_CLEARANCE = 92;

type Status = "idle" | "sending" | "sent" | "error";
type Form = { name: string; email: string; message: string | null; company: string };

export default function ContactForm() {
  const vehicle = useSyncExternalStore(subscribeNever, readVehicle, () => "");
  // message stays null until the visitor types, and shows the vehicle message meanwhile.
  const [form, setForm] = useState<Form>({ name: "", email: "", message: null, company: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const message = form.message ?? (vehicle ? vehicleMessage(vehicle) : "");
  const bodyText = () => `Name: ${form.name}\nEmail: ${form.email}\n\n${message}`;

  // Opened for a vehicle: start at the form, not the top of the page.
  useEffect(() => {
    const card = cardRef.current;
    if (!vehicle || !card) return;
    const align = () => {
      // offsetTop is the laid-out position, so the reveal's slide-in doesn't count.
      let top = 0;
      for (let n: HTMLElement | null = card; n; n = n.offsetParent as HTMLElement | null) top += n.offsetTop;
      window.scrollTo({ top: Math.max(0, top - NAV_CLEARANCE), behavior: "instant" });
    };
    align();
    // Anything above the form that arrives late (help search, the web font)
    // pushes it down. Follow it until the visitor moves the page, or 2.5 s pass.
    const follow = new ResizeObserver(align);
    follow.observe(document.body);
    const moves = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    const timer = window.setTimeout(() => stop(), 2500);
    function stop() {
      follow.disconnect();
      window.clearTimeout(timer);
      moves.forEach((t) => window.removeEventListener(t, stop));
    }
    moves.forEach((t) => window.addEventListener(t, stop, { passive: true }));
    return stop;
  }, [vehicle]);

  function validateEmail(value: string) {
    if (!value) return "";
    return EMAIL_RE.test(value) ? "" : "Enter a complete email address, like kwame@example.com";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailProblem = validateEmail(form.email) || (form.email ? "" : "Enter your email address");
    if (emailProblem) {
      setEmailError(emailProblem);
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "We could not send your message.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not send your message.");
      setStatus("error");
    }
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(bodyText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const field =
    "w-full bg-canvas border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all";
  const fieldBad =
    "w-full bg-canvas border border-red-500/70 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all";

  if (status === "sent") {
    return (
      <div className="bg-surface border border-line rounded-3xl p-8 shadow-(--shadow-md) h-full flex flex-col items-center justify-center text-center py-16">
        <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mb-5">
          <svg aria-hidden width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Message sent</h3>
        <p className="text-muted text-sm max-w-xs">
          Thanks {form.name.split(" ")[0] || "for writing"}, we&apos;ll reply to{" "}
          <span className="text-ink font-semibold wrap-break-word">{form.email}</span> within one business day.
        </p>
        <button
          // message "" (not null): the vehicle message has been sent, so it doesn't come back.
          onClick={() => { setForm({ name: "", email: "", message: "", company: "" }); setStatus("idle"); }}
          className="mt-5 text-sm font-semibold text-muted hover:text-ink transition-colors"
        >
          ← Write another message
        </button>
      </div>
    );
  }

  return (
    <div ref={cardRef} className="bg-surface border border-line rounded-3xl p-8 shadow-(--shadow-md)">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <div>
          <h2 className="text-xl font-bold">Send us a message</h2>
          <p className="text-muted text-sm mt-1">We reply to the address you give us, usually within one business day.</p>
        </div>

        <div>
          <label htmlFor="name" className="text-xs text-muted font-semibold block mb-1.5">Full Name</label>
          <input
            id="name" type="text" required value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Kwame Mensah" className={field} autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-xs text-muted font-semibold block mb-1.5">Email Address</label>
          <input
            id="email" type="email" required value={form.email}
            onChange={(e) => { setForm({ ...form, email: e.target.value }); if (emailError) setEmailError(validateEmail(e.target.value)); }}
            onBlur={(e) => setEmailError(validateEmail(e.target.value))}
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "email-error" : undefined}
            placeholder="kwame@example.com" className={emailError ? fieldBad : field} autoComplete="email"
          />
          {emailError && (
            <p id="email-error" role="alert" className="text-danger-text text-xs mt-1.5 font-medium">{emailError}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="text-xs text-muted font-semibold block mb-1.5">Message</label>
          <textarea
            id="message" required rows={5} maxLength={5000} value={message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell us how we can help…" className={`${field} resize-none`}
          />
        </div>

        {/* Honeypot: hidden from people, irresistible to bots. Not `display:none`,
            which some bots skip — off-screen and untabbable instead. */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
          <label htmlFor="company">Company (leave blank)</label>
          <input id="company" type="text" tabIndex={-1} autoComplete="off" value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })} />
        </div>

        {status === "error" && (
          <div role="alert" className="rounded-xl border border-red-500/40 bg-red-500/5 px-4 py-3">
            <p className="text-sm text-ink font-semibold">{error}</p>
            <p className="text-muted text-xs mt-1.5">
              You can email us directly at{" "}
              <a href={`mailto:${GENERAL_EMAIL}`} className="text-brand-text font-semibold hover:underline wrap-break-word">{GENERAL_EMAIL}</a>.
            </p>
            <button
              type="button" onClick={copyMessage}
              className="mt-2.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-line text-muted hover:text-ink hover:border-brand/40 transition-colors"
            >
              {copied ? "Message copied ✓" : "Copy my message"}
            </button>
          </div>
        )}

        <button
          type="submit" disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-2 bg-brand-fill hover:bg-brand-fill-hover text-brand-ink font-semibold py-3.5 rounded-xl text-sm transition-all shadow-(--shadow-brand) hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending…" : status === "error" ? "Try again" : "Send message"}
          {status !== "sending" && (
            <svg aria-hidden width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          )}
        </button>

        {/* What happens to what they typed, said before they send it. A notice
            rather than a tick-box: replying to someone who wrote to us is the
            whole point of the form, so there is nothing extra to consent to. */}
        <p className="text-muted text-xs text-center -mt-1">
          We use your name and email only to reply to you. See our{" "}
          <a href="/privacy-policy" className="text-brand-text font-semibold hover:underline">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
}
