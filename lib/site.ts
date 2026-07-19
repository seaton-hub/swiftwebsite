/* ────────────────────────────────────────────────────────────────────────────
   Single source of truth for site-wide facts.

   ⚠️ NO FARE FIGURES ON THE WEBSITE — deliberate.
   Delivery prices are dynamic: they vary with distance, service type, live
   demand/surge, pricing zone, time of day and weather. Publishing a base fare
   or a per-km rate would date instantly and contradict what the app quotes, so
   the site explains HOW a price is formed and points people to the app for the
   exact amount. Do not reintroduce GHS amounts here.

   Commission percentages ARE published: they are a contractual promise to
   riders (and are stated in the Terms of Service), not a market price.
   They mirror `commission_rate` / `carry_commission_rate` / `move_commission_rate`
   in backend/src/models/createTables.js.
──────────────────────────────────────────────────────────────────────────── */

export const WHATSAPP_NUMBER = "233200577600";
export const PHONE_DISPLAY = "+233 20 057 7600";

// ⚠️ Resend is send-only — these addresses cannot RECEIVE mail until real
// mailboxes exist on seatonlogistics.com. WhatsApp is the working channel.
export const GENERAL_EMAIL = "hello@seatonlogistics.com";
export const SUPPORT_EMAIL = "support@seatonlogistics.com";

// Store listings. Both platforms at launch — swap for the real listing URLs
// once published (the QR in public/qr-download.svg encodes the same target).
export const PLAY_STORE_URL = "https://swift.seatonlogistics.com/#download";
export const APP_STORE_URL = "https://swift.seatonlogistics.com/#download";

export type ServiceKey = "swift" | "carry" | "move";

export const SERVICES: Record<ServiceKey, { label: string; blurb: string; commission: number }> = {
  swift: { label: "Swift", blurb: "Parcels, food & documents on a motorbike", commission: 10 },
  carry: { label: "Carry", blurb: "Bulk loads on an aboboyaa or small truck", commission: 12 },
  move:  { label: "Move",  blurb: "Full relocations by truck, helpers optional", commission: 12 },
};

/** "6. Commission and Payment" → "6-commission-and-payment" (anchor ids). */
export const slugify = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
