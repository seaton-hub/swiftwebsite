"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

/* Customer delivery tracking + issue reporting.

   Reached only from the link in the pickup SMS: swift.seatonlogistics.com/t?c=<token>
   The token is the sole credential — the end customer has no account — so this
   view shows exactly what the backend chooses to return and asks for nothing.

   A query parameter rather than a /t/[code] path because the site is a static
   export (next.config.ts sets output: "export"): a dynamic segment would need
   generateStaticParams, and tracking tokens cannot be enumerated at build time.

   Deliberately NOT an embedded map. Doing that needs either a Google Maps key
   shipped in public JavaScript (billable, and abusable by anyone who reads the
   bundle) or OpenStreetMap tiles, whose usage policy does not cover a
   commercial delivery product. Distance-to-you updating live answers the
   question people actually have — "how far away are they" — and "Open in Maps"
   hands the coordinates to the map app already on their phone. */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const POLL_MS = 20_000;

type LatLng = { latitude: number; longitude: number };

type Tracking = {
  trip_id: number;
  status: string;
  is_live: boolean;
  recipient_first_name: string | null;
  delivery_address: string;
  package_description: string | null;
  delivery_fee: string | number | null;
  product_value: string | number | null;
  is_prepaid: boolean;
  eta_mins: number | null;
  picked_up_at: string | null;
  delivered_at: string | null;
  destination: LatLng;
  shop: { name: string };
  rider: { name: string; code: string; vehicle_type: string | null } | null;
  rider_location: (LatLng & { updated_at: string | null }) | null;
  complaint: { open: boolean; shop_name: string; rider_name: string | null; rider_code: string | null };
};

const STEPS = [
  { key: "accepted", label: "Rider assigned" },
  { key: "picked_up", label: "Collected from shop" },
  { key: "delivering", label: "On the way to you" },
  { key: "delivered", label: "Delivered" },
];

// Where each status sits on the four-step strip above.
const STEP_INDEX: Record<string, number> = {
  pending: 0, accepted: 0, picking_up: 0,
  picked_up: 1, delivering: 2, delivered: 3,
};

function haversineKm(a: LatLng, b: LatLng) {
  const R = 6371;
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
  const la1 = (a.latitude * Math.PI) / 180;
  const la2 = (b.latitude * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function money(v: string | number | null | undefined) {
  const n = typeof v === "string" ? parseFloat(v) : v ?? 0;
  return (n || 0).toFixed(2);
}

const CATEGORIES = [
  { value: "late_delivery", label: "It arrived late" },
  { value: "rider_conduct", label: "How I was treated" },
  { value: "damaged_item", label: "The item was damaged" },
  { value: "wrong_item", label: "Wrong item delivered" },
  { value: "overcharged", label: "I was overcharged" },
  { value: "other", label: "Something else" },
];

export default function TrackingView() {
  const params = useSearchParams();
  const code = (params.get("c") || "").trim();

  const [data, setData] = useState<Tracking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async () => {
    if (!code) {
      setError("This link is incomplete. Please open the full link from your SMS.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/track/${encodeURIComponent(code)}`);
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.message || "This tracking link is not valid.");
        setData(null);
      } else {
        setData(json.data as Tracking);
        setError(null);
      }
    } catch {
      setError("We couldn't reach Seaton Swift. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [code]);

  useEffect(() => { load(); }, [load]);

  // Poll only while the rider is actually moving. Once the trip is delivered
  // the picture cannot change, and polling a finished delivery is just battery
  // and data spent on someone else's behalf.
  useEffect(() => {
    if (!data?.is_live) return;
    timer.current = setTimeout(load, POLL_MS);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [data, load]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-line border-t-brand animate-spin" />
        <p className="text-muted text-sm">Finding your delivery…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-surface border border-line rounded-3xl p-8 text-center shadow-[var(--shadow-md)]">
        <div className="w-14 h-14 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-4">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 8v5M12 16.5v.5" /><circle cx="12" cy="12" r="9" />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Link not available</h2>
        <p className="text-muted text-sm max-w-sm mx-auto">{error}</p>
      </div>
    );
  }

  const stepIdx = STEP_INDEX[data.status] ?? 0;
  const cancelled = data.status === "cancelled";
  const delivered = data.status === "delivered";

  const distanceKm = data.rider_location
    ? haversineKm(data.rider_location, data.destination)
    : null;

  const pv = typeof data.product_value === "string" ? parseFloat(data.product_value) : data.product_value ?? 0;
  const fee = typeof data.delivery_fee === "string" ? parseFloat(data.delivery_fee) : data.delivery_fee ?? 0;
  const toPay = pv > 0 && !data.is_prepaid ? (pv || 0) + (fee || 0) : fee || 0;

  return (
    <div className="flex flex-col gap-5">

      {/* ── Status ─────────────────────────────────────────────────────────── */}
      <div className="bg-surface border border-line rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-md)]">
        <p className="text-xs text-muted font-semibold tracking-wide uppercase mb-1">
          {data.shop.name}
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {cancelled
            ? "This delivery was cancelled"
            : delivered
              ? "Delivered"
              : data.recipient_first_name
                ? `Hi ${data.recipient_first_name}, your order is on the way`
                : "Your order is on the way"}
        </h1>

        {!cancelled && (
          <>
            {/* Progress strip */}
            <div className="flex gap-1.5 mt-6" role="list">
              {STEPS.map((s, i) => (
                <div
                  key={s.key}
                  role="listitem"
                  aria-label={s.label}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${i <= stepIdx ? "bg-brand" : "bg-line"}`}
                />
              ))}
            </div>
            <p className="text-sm font-semibold mt-3">{STEPS[stepIdx]?.label}</p>

            {data.is_live && distanceKm !== null && (
              <p className="text-muted text-sm mt-1">
                Your rider is about{" "}
                <span className="text-ink font-semibold">
                  {distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1)} km`}
                </span>{" "}
                away
                {data.eta_mins ? <> · roughly {data.eta_mins} min for the whole trip</> : null}
              </p>
            )}
            {data.is_live && distanceKm === null && (
              <p className="text-muted text-sm mt-1">
                We&apos;ll show the rider&apos;s distance as soon as their location updates.
              </p>
            )}
            {data.is_live && (
              <p className="text-muted text-xs mt-3">Updating automatically every 20 seconds.</p>
            )}
          </>
        )}
      </div>

      {/* ── Rider ──────────────────────────────────────────────────────────── */}
      {data.rider && !cancelled && (
        <div className="bg-surface border border-line rounded-3xl p-6 shadow-[var(--shadow-md)]">
          <p className="text-xs text-muted font-semibold tracking-wide uppercase mb-3">Your rider</p>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-bold text-lg">{data.rider.name}</p>
              {/* The same ID printed in the SMS — the customer can check the
                  person at the door is the person we dispatched. */}
              <p className="text-muted text-sm">
                ID {data.rider.code}
                {data.rider.vehicle_type ? ` · ${data.rider.vehicle_type}` : ""}
              </p>
            </div>
            {data.rider_location && data.is_live && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${data.rider_location.latitude},${data.rider_location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-line hover:border-brand hover:text-brand rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
              >
                Open in Maps
              </a>
            )}
          </div>
        </div>
      )}

      {/* ── What to pay ────────────────────────────────────────────────────── */}
      {!cancelled && (
        <div className="bg-surface border border-line rounded-3xl p-6 shadow-[var(--shadow-md)]">
          <p className="text-xs text-muted font-semibold tracking-wide uppercase mb-3">
            {delivered ? "Amount due on this delivery" : "Have ready for the rider"}
          </p>
          <p className="text-3xl font-bold tracking-tight">GHS {money(toPay)}</p>
          <p className="text-muted text-sm mt-1">
            {pv > 0 && data.is_prepaid
              ? `Delivery GHS ${money(fee)} · item already paid to the shop`
              : pv > 0
                ? `Item GHS ${money(pv)} + delivery GHS ${money(fee)}`
                : "Delivery fee"}
          </p>
          {data.package_description && (
            <p className="text-muted text-sm mt-4 pt-4 border-t border-line">
              <span className="text-ink font-semibold">Item: </span>{data.package_description}
            </p>
          )}
          <p className="text-muted text-sm mt-2">
            <span className="text-ink font-semibold">Delivering to: </span>{data.delivery_address}
          </p>
        </div>
      )}

      {/* ── Report an issue ────────────────────────────────────────────────── */}
      {data.complaint.open && (
        showReport ? (
          <ReportForm code={code} complaint={data.complaint} onCancel={() => setShowReport(false)} />
        ) : (
          <button
            onClick={() => setShowReport(true)}
            className="bg-surface border border-line hover:border-brand rounded-3xl p-6 text-left transition-colors group"
          >
            <p className="font-bold group-hover:text-brand transition-colors">
              Something not right?
            </p>
            <p className="text-muted text-sm mt-1">
              Report a problem with this delivery and our team will look into it.
            </p>
          </button>
        )
      )}

      <p className="text-muted text-xs text-center px-4">
        Live location stops as soon as your delivery is completed. You can still report an
        issue on this link for 7 days.
      </p>
    </div>
  );
}

/* ── Complaint form ──────────────────────────────────────────────────────────
   Every identifier the report needs comes from the token in the URL, so the
   customer chooses only who and what, and types only what happened. This is
   also what makes the report trustworthy: nobody can file against a rider or
   shop they were not actually served by. */
function ReportForm({
  code,
  complaint,
  onCancel,
}: {
  code: string;
  complaint: Tracking["complaint"];
  onCancel: () => void;
}) {
  const [about, setAbout] = useState<"rider" | "shop">("rider");
  const [category, setCategory] = useState("late_delivery");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const field =
    "w-full bg-canvas border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (message.trim().length < 10) {
      setErr("Please describe what happened in a little more detail.");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`${API_URL}/api/track/${encodeURIComponent(code)}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ about, category, message: message.trim(), name: name.trim(), phone: phone.trim() }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setErr(json.message || "Could not submit your report.");
      } else {
        setDone(String(json.data?.reference ?? ""));
      }
    } catch {
      setErr("We couldn't reach Seaton Swift. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="bg-surface border border-line rounded-3xl p-8 text-center shadow-[var(--shadow-md)]">
        <div className="w-14 h-14 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mx-auto mb-4">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Report received</h3>
        <p className="text-muted text-sm max-w-sm mx-auto">
          Thank you. Our team has your report{done ? <> (reference <span className="text-ink font-semibold">#{done}</span>)</> : null} and
          will look into it.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-surface border border-line rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-md)] flex flex-col gap-5">
      <div>
        <h3 className="text-xl font-bold">Report a problem</h3>
        <p className="text-muted text-sm mt-1">
          You don&apos;t need any reference numbers — this link already identifies your delivery.
        </p>
      </div>

      <div>
        <span className="text-xs text-muted font-semibold block mb-1.5">This is about</span>
        <div className="grid grid-cols-2 gap-2">
          {([
            ["rider", complaint.rider_name ? `The rider (${complaint.rider_name})` : "The rider"],
            ["shop", `The shop (${complaint.shop_name})`],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setAbout(value)}
              aria-pressed={about === value}
              className={`rounded-xl px-4 py-3 text-sm font-semibold border transition-colors text-left ${
                about === value ? "border-brand text-brand bg-brand/5" : "border-line text-muted hover:border-brand/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="category" className="text-xs text-muted font-semibold block mb-1.5">What went wrong?</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={field}>
          {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-xs text-muted font-semibold block mb-1.5">Tell us what happened</label>
        <textarea
          id="message" required rows={5} value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={2000}
          placeholder="Describe the problem in your own words…"
          className={`${field} resize-none`}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="text-xs text-muted font-semibold block mb-1.5">Your name (optional)</label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Kwame Mensah" className={field} />
        </div>
        <div>
          <label htmlFor="phone" className="text-xs text-muted font-semibold block mb-1.5">Phone to reach you (optional)</label>
          <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="024 000 0000" className={field} />
        </div>
      </div>

      {err && <p className="text-brand text-sm font-medium">{err}</p>}

      <div className="flex gap-3">
        <button type="button" onClick={onCancel} className="flex-1 border border-line hover:border-brand rounded-xl py-3.5 text-sm font-semibold text-muted hover:text-ink transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={busy} className="flex-[2] bg-brand hover:bg-brand-hover disabled:opacity-60 text-brand-ink font-semibold py-3.5 rounded-xl text-sm transition-all shadow-[var(--shadow-brand)]">
          {busy ? "Sending…" : "Submit report"}
        </button>
      </div>
    </form>
  );
}
