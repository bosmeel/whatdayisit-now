import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whatdayisit.now"),
  title: {
    default: "What Day Is It",
    template: "%s | WhatDayIsIt.now",
  },
  description: "Free online date calculators and calendar tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <header className="site-header">
          <div className="container header-inner">

            <div className="logo">
              <Link href="/">WhatDayIsIt.now</Link>
            </div>

            <nav className="main-nav">
              <Link href="/days-between">Days Between</Link>
              <Link href="/days-since">Days Since</Link>
              <Link href="/days-until">Days Until</Link>
              <Link href="/weeks-between">Weeks</Link>
              <Link href="/months-between">Months</Link>
              <Link href="/years-between">Years</Link>
              <Link href="/age-calculator">Age</Link>
            </nav>

          </div>
        </header>

        <main className="container main-content">
          {children}
        </main>

        <footer className="site-footer">
          <div className="container footer-inner">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </footer>

      </body>
    </html>
  );
}