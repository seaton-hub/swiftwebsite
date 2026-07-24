import type { Metadata } from "next";
import { Suspense } from "react";
import TrackingView from "@/components/TrackingView";

/* Customer-facing delivery tracking, reached from the link in the pickup SMS.

   noindex/nofollow, and /t is disallowed in robots.ts: a tracking URL carries a
   delivery address behind its token, and one of these in a search result is a
   leaked address. */
export const metadata: Metadata = {
  title: "Track your delivery — Seaton Swift",
  description: "Follow your Seaton Swift delivery and report any issue with your order.",
  robots: { index: false, follow: false },
};

export default function TrackPage() {
  return (
    // pt clears the FIXED floating navbar (mt-3 + h-16 ≈ 76px). The old py-10
    // (40px) left the first content — the shop name at the top of the status
    // card — tucked behind the bar on load. Matches PageHero's pt-32 so the
    // offset is consistent with the rest of the site.
    <main className="min-h-screen px-4 pt-28 sm:pt-32 pb-12 sm:pb-16">
      <div className="max-w-lg mx-auto">
        {/* useSearchParams client-side renders the tree up to the nearest
            Suspense boundary. Without this the static export fails to
            prerender the route at all. */}
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-line border-t-brand animate-spin" />
              <p className="text-muted text-sm">Finding your delivery…</p>
            </div>
          }
        >
          <TrackingView />
        </Suspense>
      </div>
    </main>
  );
}
