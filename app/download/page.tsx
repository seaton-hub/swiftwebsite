import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import PageHero from "@/components/PageHero";
import StoreButtons from "@/components/StoreButtons";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, appsSchema } from "@/lib/seo";
import { APP_LIST } from "@/lib/site";

const title = "Download Seaton Swift | Ghana delivery app for shops and riders";
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
      <JsonLd data={[...appsSchema, breadcrumbSchema([{ name: "Download", path: "/download" }])]} />

      <PageHero
        title="Two apps, one"
        accent="delivery network."
        subtitle="Pick the one that matches what you do. Both are free, and you sign up inside the app."
      />

      {/* ── Why this section carries its own ground ─────────────────────────
          `--canvas` (#F3F3F3) and `--surface` (#F8F8F8) are five points apart,
          so a bg-surface card on the default canvas is very nearly invisible
          and the page read as flat grey nothing. Sitting the section on
          `canvas-deep` doubles the separation in light mode and triples it in
          dark, using the same alternating rhythm the home page already uses —
          and since the footer is canvas-deep too, the page now steps down once
          and stays there instead of stepping at the very last edge.

          The glow continues the hero's ambient language past the hero's bottom
          edge, which is where it used to stop dead. */}
      <section className="relative pt-16 pb-28 bg-canvas-deep overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[420px] bg-brand opacity-[0.06] rounded-full blur-[130px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-5">
          {/* Two apps, two columns: the layout itself says there is a choice to
              make. Stacked full-width rows said "here is a list".

              Two-up at lg, not md. The store pills carry a 180px minimum, so a
              pair plus their gap needs 374px of card interior; at md a
              half-width card only offers about 298px and the buttons burst out
              of the card. lg gives each card ~426px. */}
          <div className="grid lg:grid-cols-2 gap-5">
            {APP_LIST.map((app) => (
              <ScrollReveal key={app.key} className="h-full">
                <div
                  id={app.key}
                  className="scroll-mt-28 h-full flex flex-col bg-surface border border-line rounded-2xl p-7 shadow-(--shadow-md)"
                >
                  <span className="text-brand text-xs font-semibold uppercase tracking-widest">
                    {app.audience}
                  </span>
                  <h2 className="text-2xl font-extrabold mt-2 mb-2.5">{app.name}</h2>
                  <p className="text-muted text-[15px] leading-relaxed mb-7">{app.blurb}</p>

                  {/* mt-auto so both cards' buttons sit on the same baseline
                      however long the blurb above them runs. */}
                  <div className="mt-auto">
                    <StoreButtons app={app.key} />
                  </div>

                  <div className="flex items-center gap-4 mt-7 pt-6 border-t border-line">
                    {/* White is not decorative here. A QR wants maximum contrast
                        against a light ground, so the plate stays white in both
                        themes and is kept small enough not to shout. */}
                    <div className="shrink-0 bg-white rounded-lg p-2 ring-1 ring-black/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={app.qr}
                        alt={`QR code for ${app.name}`}
                        width={72}
                        height={72}
                        className="w-18 h-18 block"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Reading this on a computer?</p>
                      <p className="text-muted text-[13px] mt-0.5">
                        Scan to open {app.name} on your phone.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
