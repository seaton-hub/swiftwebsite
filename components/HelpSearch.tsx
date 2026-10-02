"use client";
import { useEffect, useRef, useState } from "react";

/* Help search on the Contact page (AI roadmap, Phase 1).

   The same search the apps use, run on our own server over this website's
   FAQ, so an answer reads the same everywhere. It returns FAQ entries word
   for word and never writes text of its own, so it cannot quote a price.

   Renders nothing until the server says it is switched on: with it off, the
   Contact page is exactly what it was. Questions nobody has answered yet are
   kept on the server, without any name or address, so we know which FAQ to
   write next. */

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.seatonlogistics.com";
const MIN_CHARS = 2;
const PAUSE_MS = 450;

type Entry = { id: string; audience: "rider" | "shop"; question: string; answer: string; url: string };
type Reply = { success: boolean; enabled: boolean; answered: boolean; results: Entry[] };

const makeSid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;

async function ask(q: string, sid: string): Promise<Reply | null> {
  try {
    const params = new URLSearchParams({ q, audience: "all", source: "website", sid });
    const res = await fetch(`${API}/api/help/search?${params}`);
    if (!res.ok) return null;
    const data = (await res.json()) as Reply;
    return data?.success ? data : null;
  } catch {
    return null;
  }
}

function sendFeedback(sid: string, faqId: string | null, helpful: boolean) {
  fetch(`${API}/api/help/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sid, faqId, helpful }),
  }).catch(() => {});
}

const AUDIENCE_LABEL = { rider: "For riders", shop: "For shops" } as const;
const ALL_LINK = {
  rider: { href: "/for-riders#faq", text: "All questions for riders" },
  shop: { href: "/for-shops#faq", text: "All questions for shops" },
} as const;

export default function HelpSearch() {
  const sid = useRef("");
  const latest = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [query, setQuery] = useState("");
  const [found, setFound] = useState<{ answered: boolean; results: Entry[] } | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [rated, setRated] = useState<Record<string, boolean>>({});

  // An empty search only asks whether help search is switched on.
  useEffect(() => {
    sid.current = makeSid();
    let live = true;
    ask("", sid.current).then((r) => { if (live) setEnabled(!!r?.enabled); });
    return () => { live = false; };
  }, []);

  // Searches at each pause in typing; a late reply never replaces a newer one.
  useEffect(() => {
    const q = query.trim();
    if (!enabled || q.length < MIN_CHARS) {
      latest.current += 1;
      setFound(null);
      return;
    }
    const id = ++latest.current;
    const timer = setTimeout(async () => {
      const r = await ask(q, sid.current);
      if (id !== latest.current || !r) return;
      if (!r.enabled) { setEnabled(false); return; }
      setFound({ answered: r.answered, results: r.results || [] });
      setOpenId(r.results?.[0]?.id ?? null);
    }, PAUSE_MS);
    return () => clearTimeout(timer);
  }, [query, enabled]);

  if (!enabled) return null;

  const rate = (faqId: string, helpful: boolean) => {
    setRated((m) => ({ ...m, [faqId]: helpful }));
    sendFeedback(sid.current, faqId, helpful);
  };

  return (
    <section className="pb-10 px-5">
      <div className="max-w-3xl mx-auto bg-surface border border-line rounded-3xl p-6 sm:p-8 shadow-(--shadow-md)">
        <label htmlFor="help-search" className="text-lg font-bold block">Search our answers</label>
        <div className="relative mt-4">
          <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            id="help-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={200}
            autoComplete="off"
            placeholder="Ask a question, like how much does a delivery cost"
            className="w-full bg-canvas border border-line rounded-xl pl-11 pr-4 py-3.5 text-[15px] text-ink placeholder:text-muted focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
          />
        </div>

        <div aria-live="polite">
          {found && query.trim().length >= MIN_CHARS && (found.answered ? (
            <div className="mt-5 border-t border-line divide-y divide-line">
              {found.results.map((r) => {
                const open = r.id === openId;
                return (
                  <div key={r.id} className="py-4">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenId(open ? null : r.id)}
                      className={`w-full text-left flex items-start gap-3 transition-colors ${open ? "text-brand-text" : "text-ink hover:text-brand-text"}`}
                    >
                      <span className="shrink-0 mt-0.5 text-[11px] font-semibold text-muted bg-canvas-deep rounded-full px-2.5 py-0.5">
                        {AUDIENCE_LABEL[r.audience]}
                      </span>
                      <span className="flex-1 font-semibold text-[15px] leading-snug">{r.question}</span>
                      <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {open && (
                      <div className="mt-3">
                        <p className="border-l-2 border-brand/40 pl-4 text-muted text-sm leading-relaxed">{r.answer}</p>
                        <div className="mt-3 pl-4.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                          <a href={ALL_LINK[r.audience].href} className="text-brand-text font-semibold hover:underline">
                            {ALL_LINK[r.audience].text}
                          </a>
                          {rated[r.id] === undefined ? (
                            <span className="flex items-center gap-2 text-muted text-xs">
                              Did this answer it?
                              <button type="button" onClick={() => rate(r.id, true)} className="px-3 py-1.5 rounded-lg border border-line text-ink font-semibold hover:border-brand/40 transition-colors">Yes</button>
                              <button type="button" onClick={() => rate(r.id, false)} className="px-3 py-1.5 rounded-lg border border-line text-ink font-semibold hover:border-brand/40 transition-colors">No</button>
                            </span>
                          ) : (
                            <span className="text-muted text-xs">
                              {rated[r.id] ? "Glad it helped." : "Sorry about that. Send us a message below."}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-5 text-sm text-muted">
              <span className="text-ink font-semibold">No answer for that yet.</span> Send us a message below and we will reply.
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
