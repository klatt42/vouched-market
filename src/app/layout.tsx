import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VouchedMarket — Your Reputation, Portable",
  description:
    "A trust network for marketplace buyers and sellers. Your reputation travels with you — verified by real transactions, backed by people who vouch for you.",
  keywords: [
    "marketplace",
    "trust",
    "reputation",
    "Facebook Marketplace",
    "eBay",
    "scam prevention",
  ],
  openGraph: {
    title: "VouchedMarket — Your Reputation, Portable",
    description:
      "We're building a network where your reputation travels with you. Verified by real transactions, backed by people who vouch for you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
