import type { ReactNode } from "react";

/* Shared hero for every inner page: brand glow + masked grid, a badge, a title
   with a brand-coloured accent, and optional actions. Pass `image` to get a
   two-column layout with a photo card; omit it for a centred hero. */
export default function PageHero({
  badge,
  title,
  accent,
  subtitle,
  actions,
  image,
  imageAlt,
  chip,
}: {
  badge: string;
  title: string;
  accent?: string;
  subtitle: string;
  actions?: ReactNode;
  image?: string;
  imageAlt?: string;
  chip?: { label: string; value: string };
}) {
  const split = Boolean(image);
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* ambient brand glow + grid, same language as the home page */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Hidden on phones: at 5–7% opacity these ambient glows are all but
            invisible on a small screen, but a 560px surface with a 130px blur
            is a costly texture to rasterise on low-end GPUs. */}
        <div className="hidden sm:block absolute top-0 right-0 w-[560px] h-[560px] bg-brand opacity-[0.07] rounded-full blur-[130px] -translate-y-1/3 translate-x-1/3" />
        <div className="hidden sm:block absolute bottom-0 left-0 w-[380px] h-[380px] bg-brand opacity-[0.05] rounded-full blur-[110px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--hero-grid) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 72%)",
          }}
        />
      </div>

      <div
        className={`mx-auto px-5 relative ${
          split ? "max-w-6xl grid lg:grid-cols-2 gap-12 items-center" : "max-w-4xl text-center"
        }`}
      >
        <div>
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-muted mb-6">
            {badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] mb-5">
            {title}
            {accent && (
              <>
                {" "}
                <span className="text-brand">{accent}</span>
              </>
            )}
          </h1>
          <p className={`text-muted text-lg leading-relaxed ${split ? "max-w-lg" : "max-w-2xl mx-auto"}`}>
            {subtitle}
          </p>
          {actions && (
            <div className={`flex flex-col sm:flex-row gap-3.5 mt-8 ${split ? "" : "justify-center"}`}>
              {actions}
            </div>
          )}
        </div>

        {split && (
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 rounded-full bg-brand/10 blur-3xl scale-90" aria-hidden />
            <div className="relative rounded-[28px] overflow-hidden border border-line shadow-[var(--shadow-md)] aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                srcSet={image?.endsWith(".webp") ? `${image.replace(/\.webp$/, "-800.webp")} 800w, ${image} 1280w` : undefined}
                sizes="(min-width: 1024px) 550px, 100vw"
                alt={imageAlt ?? ""}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mark.png" alt="" width={148} height={160} className="absolute bottom-5 right-5 h-7 w-auto opacity-75 drop-shadow-lg" />
            </div>
            {chip && (
              <div className="absolute -left-4 bottom-8 glass rounded-2xl px-4 py-3 animate-float">
                <p className="text-[10px] text-muted leading-none mb-1">{chip.label}</p>
                <p className="text-lg font-extrabold text-brand leading-none">{chip.value}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
