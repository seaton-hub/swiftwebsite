"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

const links = [
  { label: "For Shops", href: "/for-shops" },
  { label: "For Riders", href: "/for-riders" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#111111]/95 backdrop-blur-md border-b border-[#2A2A2A]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium text-[#9E9E9E] hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/for-shops"
          className="hidden md:inline-flex items-center bg-[#E8402A] hover:bg-[#d13520] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          Get Started
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-[5px]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`block w-5 h-[2px] bg-white transition-all duration-200 ${
              open ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-white transition-all duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-white transition-all duration-200 ${
              open ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-[#1A1A1A] border-t border-[#2A2A2A] px-5 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-white font-medium border-b border-[#2A2A2A] last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/for-shops"
            onClick={() => setOpen(false)}
            className="mt-3 bg-[#E8402A] hover:bg-[#d13520] text-white text-sm font-semibold px-5 py-3 rounded-lg text-center transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
