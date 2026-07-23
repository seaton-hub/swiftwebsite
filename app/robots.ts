import type { MetadataRoute } from "next";

// Generated to a static /robots.txt at build (compatible with output: export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // /t is a customer's own delivery-tracking link. It carries a delivery
    // address behind a token, so it must never be crawled or indexed —
    // a tracking URL in a search result is a leaked address.
    rules: { userAgent: "*", allow: "/", disallow: "/t" },
    sitemap: "https://swift.seatonlogistics.com/sitemap.xml",
  };
}
