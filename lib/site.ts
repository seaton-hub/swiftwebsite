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

/* Email is the ONLY contact channel published on this site — deliberate.
   No phone number, no WhatsApp, no `tel:` links anywhere. If you are adding a
   way for people to reach us, it is an address on seatonlogistics.com or it
   does not ship.

   These are real Zoho mailboxes on the domain and both RECEIVE mail. (Resend
   still handles transactional sending from noreply@ — that is send-only and is
   unrelated to the addresses below.) */
export const GENERAL_EMAIL = "hello@seatonlogistics.com";
export const SUPPORT_EMAIL = "support@seatonlogistics.com";

/* ── The two apps ──────────────────────────────────────────────────────────
   There are TWO products, not one, and the site used to have a single
   "Download the app" button for both. A shop owner and a rider need different
   downloads, so every store link on this site now names which app it is.

   Play links are withheld rather than guessed. Both apps are in closed testing,
   and a closed-testing listing URL returns a 404 to anyone who is not an
   opted-in tester — worse than an honest "coming soon". Flip the flag below on
   the day each listing goes public and the buttons light up everywhere.

   The QR codes in public/ deliberately do NOT encode these URLs. They point at
   /download on our own domain, so a printed sticker keeps working when a store
   link changes, and one code serves iPhone and Android alike. */

const RIDER_ON_PLAY = false;
const SHOP_ON_PLAY = false;

const playUrl = (pkg: string) => `https://play.google.com/store/apps/details?id=${pkg}`;

export type AppKey = "rider" | "shop";

export interface StoreApp {
  key: AppKey;
  /** The name as it appears on the store listing. */
  name: string;
  audience: string;
  blurb: string;
  ios: string;
  /** null until the Play listing is public. */
  android: string | null;
  androidPackage: string;
  /** Printable code that lands on /download anchored at this app. */
  qr: string;
}

export const APPS: Record<AppKey, StoreApp> = {
  shop: {
    key: "shop",
    name: "Swift Merchant",
    audience: "For shops",
    blurb: "Post a delivery, watch it move on the map, and settle one commission a week.",
    ios: "https://apps.apple.com/gh/app/swift-merchant/id6804503568",
    android: SHOP_ON_PLAY ? playUrl("com.seatonlogistics.merchant") : null,
    androidPackage: "com.seatonlogistics.merchant",
    qr: "/qr-merchant.svg",
  },
  rider: {
    key: "rider",
    name: "Seaton Swift",
    audience: "For riders",
    blurb: "Take deliveries near you, follow your earnings, and get paid every week.",
    ios: "https://apps.apple.com/gh/app/seaton-swift/id6804503774",
    android: RIDER_ON_PLAY ? playUrl("com.seatonlogistics.swift") : null,
    androidPackage: "com.seatonlogistics.swift",
    qr: "/qr-swift.svg",
  },
};

/** Shops first: they are the paying side, and the site sells to them. */
export const APP_LIST: StoreApp[] = [APPS.shop, APPS.rider];

export type ServiceKey = "swift" | "carry" | "move";

export const SERVICES: Record<ServiceKey, { label: string; blurb: string; commission: number }> = {
  swift: { label: "Swift", blurb: "Parcels, food & documents on a motorbike", commission: 10 },
  carry: { label: "Carry", blurb: "Bulk loads on an aboboyaa or small truck", commission: 12 },
  move:  { label: "Move",  blurb: "Full relocations by truck, helpers optional", commission: 12 },
};

/** "6. Commission and Payment" → "6-commission-and-payment" (anchor ids). */
export const slugify = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
