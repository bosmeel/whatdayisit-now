import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";
import ToolsNav from "@/components/ToolsNav";

export const metadata: Metadata = {
  metadataBase: new URL("https://whatdayisit.now"),

  title: {
    default: "What Day Is It Today? | Date, Day, Week & Year Progress",
    template: "%s | WhatDayIsIt.now",
  },

  description:
    "Instantly see what day it is today, the day of the year, week number, days left in the year, and countdowns to popular holidays.",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },

  openGraph: {
    type: "website",
    url: "https://whatdayisit.now",
    siteName: "WhatDayIsIt.now",
    title: "What Day Is It Today?",
    description:
      "See today's date, day of the year, week number, and how many days are left in the year.",
  },

  twitter: {
    card: "summary_large_image",
    title: "What Day Is It Today?",
    description:
      "Today's date, day number, week number, and year progress instantly.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>

        <header className="site-header">
          <div className="container header-inner">

            <div className="logo">
              <Link href="/" className="logo-link">
                <img
                  src="/icon.svg"
                  alt="WhatDayIsIt icon"
                  className="logo-icon"
                  width="18"
                  height="18"
                />
                <span>WhatDayIsIt.now</span>
              </Link>
            </div>

            <nav className="main-nav" aria-label="Main navigation">
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

          <ToolsNav />
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