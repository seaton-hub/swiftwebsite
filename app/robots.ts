import type { MetadataRoute } from "next";

// Generated to a static /robots.txt at build (compatible with output: export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://swift.seatonlogistics.com/sitemap.xml",
  };
}
