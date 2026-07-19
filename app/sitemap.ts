import type { MetadataRoute } from "next";

// Generated to a static /sitemap.xml at build (compatible with output: export).
export const dynamic = "force-static";

const BASE = "https://swift.seatonlogistics.com";

// Bump when page content genuinely changes. Deliberately NOT `new Date()`:
// stamping every route as "modified" on every deploy is a signal Google learns
// to ignore, which costs you the one time it actually matters.
const LAST_MODIFIED = new Date("2026-07-19");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0 },
    { path: "/for-shops", priority: 0.9 },
    { path: "/for-riders", priority: 0.9 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms-of-service", priority: 0.3 },
    { path: "/delete-account", priority: 0.3 },
  ];
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
