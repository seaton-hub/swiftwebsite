import Link from "next/link";

export default function Logo({ height = 42 }: { height?: number }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/final logo 2.png"
        alt="Seaton Logistics"
        style={{ height, width: "auto" }}
      />
      <span className="font-bold text-[15px] tracking-tight border-l border-[#2A2A2A] pl-2.5">
        <span className="text-white">Swift</span>
      </span>
    </Link>
  );
}
