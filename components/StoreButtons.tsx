import { APPS, type AppKey } from "@/lib/site";

/* App Store + Google Play badges for ONE of the two apps.

   The Android badge is not a link while that app is still in closed testing.
   A closed-testing Play URL 404s for anybody who is not an opted-in tester, so
   linking it would send a shop owner to an error page with our name on it. It
   renders as a plain, obviously-inert pill instead, and becomes a real link the
   moment the flag in lib/site.ts flips. */

function AppleMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.25.92-.59 1.19l-2.27 1.31L15.39 12l2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z" />
    </svg>
  );
}

const PILL =
  "flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-sm border min-w-[180px] justify-center transition-colors";
const LIVE = `${PILL} bg-[#14161C] text-white border-white/15 hover:bg-[#23262E]`;

/* The inert pill needs two palettes. `--brand-ink` is white, so on the red
   download card everything is light-on-red and a token-driven muted grey would
   vanish; on a page surface the reverse is true in dark mode. Neither set can
   cover both, so the caller says which ground it is sitting on. */
const SOON: Record<"surface" | "brand", string> = {
  surface: `${PILL} bg-line/50 text-muted border-line cursor-default select-none`,
  brand: `${PILL} bg-black/25 text-white/70 border-white/25 cursor-default select-none`,
};

export default function StoreButtons({
  app,
  tone = "surface",
  className = "",
}: {
  app: AppKey;
  tone?: "surface" | "brand";
  className?: string;
}) {
  const a = APPS[app];
  return (
    // flex-wrap, because these pills hold a 180px minimum and get dropped into
    // containers that are not always wide enough for two of them. Wrapping is
    // the correct failure; overflowing the card is not.
    <div className={`flex flex-col sm:flex-row sm:flex-wrap gap-3.5 ${className}`}>
      <a href={a.ios} className={LIVE} target="_blank" rel="noopener">
        <AppleMark />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-normal opacity-75">Download on the</span>
          App Store
        </span>
      </a>

      {a.android ? (
        <a href={a.android} className={LIVE} target="_blank" rel="noopener">
          <PlayMark />
          <span className="text-left leading-tight">
            <span className="block text-[10px] font-normal opacity-75">GET IT ON</span>
            Google Play
          </span>
        </a>
      ) : (
        <span className={SOON[tone]} aria-label={`${a.name} is coming soon to Google Play`}>
          <PlayMark />
          <span className="text-left leading-tight">
            <span className="block text-[10px] font-normal opacity-75">COMING SOON TO</span>
            Google Play
          </span>
        </span>
      )}
    </div>
  );
}
