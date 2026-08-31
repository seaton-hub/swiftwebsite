import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema, servicesSchema } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://swift.seatonlogistics.com"),
  title: "Seaton Swift — Ghana's Fastest Delivery Network",
  description:
    "Connect your shop to verified riders. Get anything delivered across Ghana in minutes. Seaton Swift is the delivery platform built for Ghanaian businesses.",
  keywords: "delivery Ghana, Kumasi delivery, Seaton Swift, motorcycle delivery, last-mile delivery Ghana",
  // Static export writes both /about.html and /about/index.html for each route.
  // Without a canonical, that is two crawlable URLs for one page — the classic
  // way to split your own ranking signal. Each page overrides this with its own.
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "Seaton Swift — Delivered. Swift.",
    description: "Ghana's fastest delivery network. Connect your shop to verified riders.",
    type: "website",
    locale: "en_GH",
    siteName: "Seaton Swift",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seaton Swift — Delivered. Swift.",
    description: "Ghana's fastest delivery network.",
  },
};

// Runs before first paint so the theme is applied with no flash. Static export
// can't use cookies, so the visitor's explicit choice lives in localStorage.
//
// Three states, not two. A stored 'dark' or 'light' is an explicit choice and
// always wins. With nothing stored the visitor has never chosen, and we follow
// the operating system — this used to default to light regardless, so anyone
// browsing with their device in dark mode got a bright white page.
//
// The matchMedia listener only applies while no explicit choice exists, so a
// visitor who picked light keeps light when their Mac flips at sunset. It is
// registered here rather than in a component so it survives on pages that
// render no React island.
const themeScript = `(function(){try{
  var stored=null;try{stored=localStorage.getItem('theme')}catch(e){}
  var mq=window.matchMedia('(prefers-color-scheme: dark)');
  var apply=function(dark){document.documentElement.classList.toggle('dark',dark)};
  apply(stored?stored==='dark':mq.matches);
  var onChange=function(e){var s=null;try{s=localStorage.getItem('theme')}catch(err){}if(!s)apply(e.matches)};
  if(mq.addEventListener)mq.addEventListener('change',onChange);else if(mq.addListener)mq.addListener(onChange);
}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={[organizationSchema, websiteSchema, servicesSchema]} />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject
          data-* attributes onto <body> before React hydrates. Harmless — this
          only silences the mismatch on body's own attributes, not its children. */}
      <body className="bg-canvas text-ink min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
