import type { Metadata } from "next";
import LegalPage, { LegalSection as Section } from "@/components/LegalPage";
import { ADDRESS, GENERAL_EMAIL } from "@/lib/site";

const title = "Cookie Policy | Seaton Swift";
const description =
  "The Seaton Swift website sets no cookies and uses no analytics or tracking. Here is the one thing it does store, and why.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cookie-policy" },
  openGraph: { title, description, url: "/cookie-policy", type: "article" },
  twitter: { title, description },
};

/* Written from what the site actually does, and it must stay that way: the
   theme script in app/layout.tsx is the only thing that writes to the browser,
   the font is self-hosted by next/font, and nothing on the site loads a
   third-party script. If that ever changes (analytics, a pixel, an embed that
   sets cookies), this page changes with it, and so does the need for consent. */

const SECTIONS = [
  "1. The Short Version",
  "2. What the Website Stores",
  "3. What the Website Does Not Do",
  "4. Our Apps",
  "5. Links to Other Sites",
  "6. If This Changes",
  "7. Contact",
];

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" updated="27 September 2026" sections={SECTIONS}>
      <Section title="1. The Short Version">
        <p>The Seaton Swift website sets no cookies. It uses no analytics, advertising or tracking tools. There is nothing to accept or decline, which is why you will not see a cookie banner here.</p>
      </Section>

      <Section title="2. What the Website Stores">
        <p>One thing, and only if you ask for it: your choice of light or dark mode. When you press the light/dark button, the choice is saved in your browser&apos;s local storage under the name <code className="text-ink">theme</code>, so the next page you open looks the same. It stays on your device, is never sent to us, and lasts until you clear your browser&apos;s data. If you never press the button, nothing is stored and the site simply follows your device&apos;s setting.</p>
        <p>The page for following a delivery reads the tracking code from its own link and stores nothing on your device.</p>
      </Section>

      <Section title="3. What the Website Does Not Do">
        <ul className="list-disc pl-5 space-y-2">
          <li>No cookies of any kind, our own or anyone else&apos;s</li>
          <li>No analytics or visitor statistics</li>
          <li>No advertising, social media pixels or retargeting</li>
          <li>No fonts, scripts or embeds loaded from other companies. Our font is served from our own site, so opening a page does not contact Google or any other font service</li>
        </ul>
      </Section>

      <Section title="4. Our Apps">
        <p>The Seaton Swift and Swift Merchant apps do not use cookies. They keep your sign-in in your phone&apos;s secure storage so you stay signed in, and remember a few settings on the phone itself. They contain no analytics, advertising or crash-reporting software, as our <a href="/privacy-policy" className="text-brand-text hover:underline">Privacy Policy</a> explains.</p>
      </Section>

      <Section title="5. Links to Other Sites">
        <p>Links to the App Store, Google Play, Facebook, TikTok, Google Maps and Seaton Logistics take you to sites run by others, which have their own cookie policies. Nothing from those sites runs on ours until you follow the link.</p>
      </Section>

      <Section title="6. If This Changes">
        <p>If we ever add something that needs your permission, such as visitor analytics, we will ask before it runs and update this page first.</p>
      </Section>

      <Section title="7. Contact">
        <p>
          Questions about this policy:{" "}
          <a href={`mailto:${GENERAL_EMAIL}`} className="text-brand-text hover:underline">{GENERAL_EMAIL}</a>
        </p>
        <p>
          Seaton Swift, a product of Seaton Logistics<br />
          {ADDRESS.area}, {ADDRESS.city}, {ADDRESS.region}, {ADDRESS.country}<br />
          {ADDRESS.landmark}<br />
          Digital address: {ADDRESS.digital}
        </p>
      </Section>
    </LegalPage>
  );
}
