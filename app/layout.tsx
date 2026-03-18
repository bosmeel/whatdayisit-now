import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";
import "./styles/calculator.css";
import Header from "@/components/Header";

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

        <Header />

        {/* MAIN CONTAINER FIX */}
        <main className="main-content">
          <div className="container">
            {children}
          </div>
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