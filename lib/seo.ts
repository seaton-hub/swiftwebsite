import { GENERAL_EMAIL, PHONE_DISPLAY, SERVICES } from "./site";

/* Structured data (JSON-LD) — what Google reads to understand *what* this site
   is, as opposed to merely indexing its words. Feeds knowledge-panel entries,
   FAQ rich results and breadcrumb trails in search listings.

   ⚠️ Everything here must be true and verifiable on the page itself. Google
   penalises structured data that contradicts visible content. Two deliberate
   omissions:
     • No `LocalBusiness` / `PostalAddress` — we have no verified street address
       to publish. Inventing one is exactly the kind of thing that gets a site
       demoted. Add it (and claim a Google Business Profile) once there's a real
       registered address; that is the single biggest local-search unlock.
     • No `MobileApplication` — the store URLs are still placeholders. Add it
       when the real Play Store / App Store listings exist. */

export const SITE_URL = "https://swift.seatonlogistics.com";

const ORG_ID = `${SITE_URL}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Seaton Swift",
  legalName: "Seaton Swift",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.png`,
  image: `${SITE_URL}/opengraph-image.jpg`,
  description:
    "Seaton Swift is a Ghanaian last-mile delivery marketplace connecting shops to verified motorcycle, tricycle and truck riders, with live tracking and a price shown before you confirm.",
  email: GENERAL_EMAIL,
  telephone: PHONE_DISPLAY,
  parentOrganization: {
    "@type": "Organization",
    name: "Seaton Logistics",
    url: "https://seatonlogistics.com",
  },
  areaServed: [
    { "@type": "Country", name: "Ghana" },
    { "@type": "City", name: "Kumasi" },
    { "@type": "AdministrativeArea", name: "Ashanti Region" },
  ],
  sameAs: [
    "https://seatonlogistics.com",
    "https://www.facebook.com/share/1BHdFX9xVY/?mibextid=wwXIfr",
    "https://www.tiktok.com/@seatonlogistics",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Seaton Swift",
  inLanguage: "en-GH",
  publisher: { "@id": ORG_ID },
};

/** The three delivery tiers, so search engines can surface what we actually do. */
export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: Object.entries(SERVICES).map(([key, s], i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: `Seaton ${s.label}`,
      description: s.blurb,
      serviceType: "Last-mile delivery",
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "Country", name: "Ghana" },
      url: `${SITE_URL}/for-shops#${key}`,
    },
  })),
};

/** FAQ rich results — the accordion answers, verbatim, as Google requires. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Breadcrumb trail shown under the result title in search listings. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}
