import type { MetadataRoute } from "next";

// Generated to a static /robots.txt at build (compatible with output: export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // /t?c=CODE is a customer's own delivery-tracking link. It carries a
    // delivery address behind its token, so it must never be crawled: a
    // tracking URL in a search result hands out the token itself.
    //
    // Both patterns are needed, and the "/t" this replaces was wrong.
    // robots.txt matches by PREFIX, not by path segment, so "/t" disallowed
    // every URL beginning with that letter. It silently blocked
    // /terms-of-service and /twitter-image.jpg, and Search Console refused to
    // index the Terms with "Page cannot be crawled: Blocked by robots.txt".
    //
    //   /t$  anchors the end of the URL, so it matches /t and nothing longer
    //   /t?  matches the real tracking links. ? is a literal here, not a
    //        wildcard, and no other route begins "/t?"
    //
    // The page carries its own noindex as well, which is the control that
    // survives someone pasting a tracking link somewhere public.
    rules: { userAgent: "*", allow: "/", disallow: ["/t$", "/t?"] },
    sitemap: "https://swift.seatonlogistics.com/sitemap.xml",
  };
}
