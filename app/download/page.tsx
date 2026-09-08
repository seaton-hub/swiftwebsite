import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import StoreButtons from "@/components/StoreButtons";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { APP_LIST } from "@/lib/site";

const title = "Download Seaton Swift — Ghana delivery app for shops and riders";
const description =
  "Get the Seaton Swift apps on iPhone. Swift Merchant for shops sending deliveries, Seaton Swift for riders earning on their own schedule.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/download" },
  openGraph: { title, description, url: "/download", type: "website" },
  twitter: { title, description },
};

/* This page is the target of every printed QR code, which is why it exists as a
   route rather than living only as a section of the home page:

   - A sticker on a shop counter outlives any single store URL. The code points
     here, and this page decides where the visitor goes next.
   - One code works on iPhone and Android. Encoding an App Store link directly
     would hand every Android user an error page.
   - There are two apps. A scanner has to be able to pick, and the anchors
     (#shop, #rider) let a targeted sticker land on the right one. */

export default function DownloadPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Download", path: "/download" }])]} />

      <PageHero
        badge="Download"
        title="Two apps, one"
        accent="delivery network."
        subtitle="Pick the one that matches what you do. Both are free, and you sign up inside the app."
      />

      <section className="pb-24 px-5">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {APP_LIST.map((app) => (
            <ScrollReveal key={app.key}>
              <div
                id={app.key}
                className="scroll-mt-28 bg-surface border border-line rounded-2xl p-7 sm:p-9 grid md:grid-cols-[1fr_auto] gap-8 items-center"
              >
                <div className="text-center md:text-left">
                  <span className="text-brand text-xs font-semibold uppercase tracking-widest">
                    {app.audience}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-3">{app.name}</h2>
                  <p className="text-muted mb-7 max-w-md mx-auto md:mx-0">{app.blurb}</p>
                  <StoreButtons app={app.key} className="justify-center md:justify-start" />
                </div>

                {/* The QR encodes this page, anchored at this card, so a printed
                    sticker sends the scanner straight back to the right app. */}
                <div className="mx-auto md:mx-0">
                  <div className="bg-white rounded-2xl p-4 text-center w-[170px] border border-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={app.qr}
                      alt={`QR code linking to the ${app.name} download page`}
                      width={138}
                      height={138}
                      className="w-[138px] h-[138px] mx-auto"
                    />
                    <p className="text-[#14161C] text-xs font-bold mt-2.5">Scan on a phone</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <p className="text-muted text-sm text-center max-w-xl mx-auto">
              Android versions are in final testing and will appear on Google Play shortly.
              Nothing changes for you when they land, and your account works on either phone.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
