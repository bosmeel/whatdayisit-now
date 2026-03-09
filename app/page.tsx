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
  { href: "/business-days-between", label: "Business Days Between Dates" },
  { href: "/business-days-until", label: "Business Days Until Date" },
  { href: "/age-calculator", label: "Age Calculator" },
  { href: "/days-until-my-birthday", label: "Birthday Tools" },
];

const birthdayLinks = [
  { href: "/born-on/may-1", label: "May 1 birthday" },
  { href: "/born-on/may-5", label: "May 5 birthday" },
  { href: "/born-on/may-10", label: "May 10 birthday" },
  { href: "/born-on/may-15", label: "May 15 birthday" },
  { href: "/born-on/may-20", label: "May 20 birthday" },
  { href: "/born-on/may-25", label: "May 25 birthday" },
];

export default function Home() {
  return (
    <>
      <TodayDashboard />

      <section className="container">
        <h2>Popular Date Calculators</h2>

        <p>
          Use these free online calculators to compare dates, count days, track
          time between events, and plan important deadlines.
        </p>

        <div className="tool-grid">
          {featuredLinks.map((item) => (
            <Link key={item.href} href={item.href} className="tool-card">
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      {/* NEW SEO SECTION */}

      <section className="container">
        <h2>Popular Countdowns</h2>

        <p>
          See how many days remain until popular holidays and upcoming events.
        </p>

        <div className="tool-grid">
          <Link href="/days-until/christmas" className="tool-card">
            Days Until Christmas
          </Link>

          <Link href="/days-until/new-year" className="tool-card">
            Days Until New Year
          </Link>

          <Link href="/days-until/halloween" className="tool-card">
            Days Until Halloween
          </Link>

          <Link href="/days-until/valentines-day" className="tool-card">
            Days Until Valentine’s Day
          </Link>
        </div>
      </section>

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

      <section className="container">
        <h2>Browse Dates</h2>

        <p>
          Explore birthdays and historical events for every day of the year.
        </p>

        <div className="tool-grid">
          <Link href="/born-on" className="tool-card">
            Birthdays by Date
          </Link>

          <Link href="/what-happened-on" className="tool-card">
            Historical Events by Date
          </Link>
        </div>
      </section>

      <section className="container">
        <h2>Browse Birthdays by Date</h2>

        <p>
          Discover famous people born on any day of the year, plus zodiac
          information and notable historical events.
        </p>

        <div className="tool-grid">
          <Link href="/born-on" className="tool-card">
            Browse all birthdays
          </Link>

          {birthdayLinks.map((item) => (
            <Link key={item.href} href={item.href} className="tool-card">
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      {/* NEW SEO SECTION */}

      <section className="container">
        <h2>Calendar Tools</h2>

        <p>
          Browse calendars and week numbers to plan your year and track dates.
        </p>

        <div className="tool-grid">
          <Link href="/calendar/2026" className="tool-card">
            2026 Calendar
          </Link>

          <Link href="/week-number/2026" className="tool-card">
            Week Numbers for 2026
          </Link>

          <Link href="/what-week-is-it" className="tool-card">
            What Week Is It?
          </Link>
        </div>
      </section>
    </>
  );
}