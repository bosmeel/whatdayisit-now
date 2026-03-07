import type { Metadata } from "next";
import TodayDashboard from "../components/TodayDashboard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Day Is It Today? | Live Date, Week Number & Year Progress",
  description:
    "Instantly see today's exact date, day of the week, ISO week number, day of the year, and how many days are left in the year.",

  alternates: {
    canonical: "https://whatdayisit.now",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "What Day Is It Today?",
    description:
      "Live dashboard showing today's date, week number, day of the year and year progress.",
    url: "https://whatdayisit.now",
    siteName: "WhatDayIsIt.now",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "What Day Is It Today?",
    description:
      "Today's date, week number, day of year and year progress instantly.",
  },
};

const featuredLinks = [
  { href: "/days-between", label: "Days Between Dates" },
  { href: "/days-until", label: "Days Until Date" },
  { href: "/days-since", label: "Days Since Date" },
  { href: "/weeks-between", label: "Weeks Between Dates" },
  { href: "/months-between", label: "Months Between Dates" },
  { href: "/years-between", label: "Years Between Dates" },
  { href: "/age-calculator", label: "Age Calculator" },
  { href: "/days-until-my-birthday", label: "Birthday Tools" },
];

export default function Home() {
  return (
    <>
      <TodayDashboard />

      {/* Popular calculators */}

      <section className="container">
        <h2>Popular Date Calculators</h2>

        <p>
          Use these free online calculators to compare dates, count days,
          track time between events, and plan important deadlines.
        </p>

        <div className="tool-grid">
          {featuredLinks.map((item) => (
            <Link key={item.href} href={item.href} className="tool-card">
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Popular date comparisons */}

      <section className="container">
        <h2>Popular Date Comparisons</h2>

        <p>
          Quickly calculate the number of days between common dates and
          well-known events.
        </p>

        <div className="tool-grid">

          <Link
            className="tool-card"
            href="/days-between?start=2024-01-01&end=2025-01-01"
          >
            Days between Jan 1 2024 and Jan 1 2025
          </Link>

          <Link
            className="tool-card"
            href="/days-between?start=2024-12-25&end=2025-01-01"
          >
            Days between Christmas and New Year
          </Link>

          <Link
            className="tool-card"
            href="/days-between?start=2024-01-01&end=2024-12-31"
          >
            Days between Jan 1 and Dec 31
          </Link>

          <Link
            className="tool-card"
            href="/days-between?start=2024-07-04&end=2024-12-25"
          >
            Days between July 4 and Christmas
          </Link>

        </div>
      </section>

      {/* Calendar */}

      <section className="container">
        <h2>Calendar by Year</h2>

        <p>
          Browse calendars by year including months, holidays, birthdays and
          notable historical events.
        </p>

        <div className="tool-grid">

          <Link href="/calendar" className="tool-card">
            View Year Calendars
          </Link>

        </div>
      </section>

    </>
  );
}