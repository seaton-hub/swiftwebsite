import type { ReactNode } from "react";
import Link from "next/link";
import LegalToc from "./LegalToc";
import ReadingProgress from "./ReadingProgress";
import { slugify } from "@/lib/site";

/* Shared shell for the legal pages: ambient header, a sticky scroll-spy table
   of contents on desktop, and the document body in a readable surface card.
   The legal wording itself lives in each page — this only handles presentation. */
export default function LegalPage({
  title,
  updated,
  sections,
  children,
}: {
  title: string;
  updated: string;
  sections: string[];
  children: ReactNode;
}) {
  return (
    <>
      <ReadingProgress />

      {/* header */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="hidden sm:block absolute top-0 right-0 w-[520px] h-[520px] bg-brand opacity-[0.06] rounded-full blur-[130px] -translate-y-1/2 translate-x-1/3" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(var(--hero-grid) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse at top, black 10%, transparent 65%)",
              WebkitMaskImage: "radial-gradient(ellipse at top, black 10%, transparent 65%)",
            }}
          />
        </div>
        <div className="max-w-5xl mx-auto px-5 relative">
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-muted mb-5">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">{title}</h1>
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="inline-flex items-center gap-1.5 bg-surface border border-line rounded-full px-3 py-1.5 text-muted">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              Last updated {updated}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-surface border border-line rounded-full px-3 py-1.5 text-muted">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              Governed by the laws of Ghana
            </span>
          </div>
        </div>
      </section>

      {/* body */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-5 grid lg:grid-cols-[220px_1fr] gap-10 items-start">
          <aside className="hidden lg:block sticky top-28">
            <LegalToc sections={sections} />
          </aside>

          <div className="min-w-0">
            {/* No card. A legal document should read like a document — the text
                sits on the page and the clause rules do the structuring. */}
            <article className="text-muted text-[15px] leading-[1.75] space-y-10">
              {children}
            </article>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line pt-8">
              <div>
                <p className="text-ink font-semibold text-sm">Still have a question?</p>
                <p className="text-muted text-xs mt-0.5">Our team is happy to walk you through any of this.</p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-1.5 bg-brand hover:bg-brand-hover text-brand-ink text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                Contact us
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** One numbered clause. The id lets the contents list jump/scroll-spy to it.
    Titles arrive as "6. Commission and Payment"; the leading ordinal is split
    out and set in brand red so the heading reads as a title rather than a list
    item. The id still hashes the full original string, so the contents list and
    any existing deep links keep working. */
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  const match = title.match(/^(\d+)\.\s*(.+)$/);
  const [, ordinal, label] = match ?? [, null, title];

  return (
    <section
      id={slugify(title)}
      className="scroll-mt-28 border-t border-line pt-9 first:border-t-0 first:pt-0"
    >
      <h2 className="flex items-baseline gap-3 mb-4">
        {ordinal && (
          <span className="shrink-0 text-brand text-sm font-extrabold tabular-nums">{ordinal}</span>
        )}
        <span className="text-ink text-xl font-bold tracking-tight leading-snug">{label}</span>
      </h2>
      <div className="space-y-3.5">{children}</div>
    </section>
  );
}
