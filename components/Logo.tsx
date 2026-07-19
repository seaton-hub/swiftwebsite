import Link from "next/link";

export default function Logo({ height = 34 }: { height?: number }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* Hexagon mark is red-dominant, so it reads on both light and dark. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-mark.png"
        alt="Seaton Swift"
        width={148}
        height={160}
        style={{ height, width: "auto" }}
        className="transition-transform duration-300 group-hover:scale-105"
      />
      <span className="font-extrabold text-[17px] tracking-tight leading-none">
        <span className="text-ink">Seaton</span>
        <span className="text-brand"> Swift</span>
      </span>
    </Link>
  );
}
