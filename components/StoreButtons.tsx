import { APPS, type AppKey } from "@/lib/site";

/* App Store + Google Play badges for ONE of the two apps.

   The badges are the stores' own artwork, unaltered, from public/badges/:
   app-store.svg from developer.apple.com/app-store/marketing/guidelines, and
   google-play.png from play.google.com/intl/en_us/badges. Both stores allow
   their badge to link to a listing but require the official file; this used to
   draw its own pill with a hand-copied Apple logo and Play logo, which neither
   store permits.

   The Android badge is not a link while that app is still in closed testing.
   A closed-testing Play URL 404s for anybody who is not an opted-in tester, and
   Google's rules only allow its badge for an app that is actually on Google
   Play. So until the flag in lib/site.ts flips, a plain note stands in its
   place, with no Google logo on it. */

const BADGE_HEIGHT = "h-12";   // 48px: Apple's minimum on screen is 40px

/* The note needs two palettes. `--brand-ink` is white, so on the red download
   card everything is light-on-red and a token-driven muted grey would vanish;
   on a page surface the reverse is true in dark mode. Neither set can cover
   both, so the caller says which ground it is sitting on. */
const NOTE = `${BADGE_HEIGHT} inline-flex items-center gap-2 px-5 rounded-xl text-sm font-semibold border cursor-default select-none`;
const SOON: Record<"surface" | "brand", string> = {
  surface: `${NOTE} bg-line/50 text-muted border-line`,
  brand: `${NOTE} bg-black/25 text-white/70 border-white/25`,
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
    // flex-wrap: the containers these drop into are not always wide enough
    // for two. Wrapping is the correct failure; overflowing the card is not.
    <div className={`flex flex-wrap items-center gap-3.5 ${className}`}>
      <a href={a.ios} target="_blank" rel="noopener" className="inline-block rounded-[10px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/badges/app-store.svg" alt={`Download ${a.name} on the App Store`} width={144} height={48} className={`${BADGE_HEIGHT} w-auto`} />
      </a>

      {a.android ? (
        <a href={a.android} target="_blank" rel="noopener" className="inline-block rounded-[10px]">
          {/* Google's PNG carries its own transparent margin around the badge;
              the negative margin lets the visible badge line up at 48px. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/badges/google-play.png" alt={`Get ${a.name} on Google Play`} width={186} height={72} className="h-[72px] w-auto -my-3 -mx-2.5" />
        </a>
      ) : (
        <span className={SOON[tone]}>
          <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M11 18h2" />
          </svg>
          Android app coming soon
        </span>
      )}
    </div>
  );
}
