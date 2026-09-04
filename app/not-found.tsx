import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-5 py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand opacity-[0.06] rounded-full blur-[120px] pointer-events-none" aria-hidden />
      <div className="text-center relative">
        <p className="text-brand text-7xl sm:text-8xl font-extrabold tracking-tight">404</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold mt-4 mb-3">This route went off the map</h1>
        <p className="text-muted max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors shadow-(--shadow-brand)">
            Back to Home
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center border border-line bg-surface hover:border-brand/50 hover:text-brand text-ink font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
