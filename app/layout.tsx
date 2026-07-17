import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Seaton Swift — Ghana's Fastest Delivery Network",
  description:
    "Connect your shop to verified riders. Get anything delivered across Ghana in minutes. Seaton Swift is the delivery platform built for Ghanaian businesses.",
  keywords: "delivery Ghana, Kumasi delivery, Seaton Swift, motorcycle delivery, last-mile delivery Ghana",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#111111] text-white min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
