import Link from "next/link";
import type { Metadata } from "next";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

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

  const navLinks = [
    { href: "/days-between", label: "Days Between" },
    { href: "/days-until", label: "Days Until" },
    { href: "/days-since", label: "Days Since" },
    { href: "/age-calculator", label: "Age Calculator" },
    { href: "/business-days-between", label: "Business Days" },
    { href: "/business-days-until", label: "Business Days Until" },
    { href: "/birthday-weekday", label: "Birthday Weekday" },
    { href: "/weeks-between", label: "Weeks" },
    { href: "/months-between", label: "Months" },
  ];

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

            {/* Desktop navigation */}

            <nav className="main-nav" aria-label="Main navigation">
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile navigation */}

            <MobileNav links={navLinks} />

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