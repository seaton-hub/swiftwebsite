import { GENERAL_EMAIL, SERVICES, APP_LIST } from "./site";

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
     • No `MobileApplication` sitewide. It describes the apps, so it sits on
       /download, where the apps are actually on the page. Google demotes
       structured data describing something the page does not show. */

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
  // No `telephone` — email is the only published contact channel, and
  // structured data must not advertise a route the site itself does not offer.
  email: GENERAL_EMAIL,
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
  // sameAs is the entity claim: every profile listed is asserted to be the
  // same organisation as this site. The App Store listings were missing, which
  // left Google no corroboration of the brand name outside our own two domains,
  // and a brand nothing else vouches for does not win its own name in search.
  //
  // Play listings stay out while both apps are in closed testing: those URLs
  // 404 for anyone who is not an opted-in tester.
  sameAs: [
    "https://seatonlogistics.com",
    "https://www.facebook.com/share/1BHdFX9xVY/?mibextid=wwXIfr",
    "https://www.tiktok.com/@seatonlogistics",
    ...APP_LIST.map((a) => a.ios),
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

/** The two apps, for /download only.
 *
 *  Named app listings are a strong entity signal: they are an independent
 *  publisher asserting the same brand name, which is exactly what "Seaton Swift"
 *  has been short of. `offers` says free, which is true of both downloads.
 *
 *  No `aggregateRating`. We have no ratings to report, and inventing one is the
 *  fastest way to lose every rich result on the site.
 *
 *  `operatingSystem` is iOS alone on purpose. Both Play listings are in closed
 *  testing and their URLs 404 for the public, so claiming Android here would
 *  describe something a visitor cannot get. */
export const appsSchema = APP_LIST.map((a) => ({
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: a.name,
  description: a.blurb,
  applicationCategory: "BusinessApplication",
  operatingSystem: "iOS",
  url: a.ios,
  installUrl: a.ios,
  publisher: { "@id": ORG_ID },
  offers: { "@type": "Offer", price: "0", priceCurrency: "GHS" },
}));
