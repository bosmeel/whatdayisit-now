import type { Metadata } from "next";
import TodayDashboard from "../components/TodayDashboard";
import Link from "next/link";
import TodayCountdowns from "../components/TodayCountdowns";
import TodayHero from "../components/TodayHero";

export const metadata: Metadata = {
  title: "What Day Is It Today? | WhatDayIsIt.now",
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

const birthdayLinks = [
  { href: "/born-on/may-1", label: "May 1 birthday" },
  { href: "/born-on/may-5", label: "May 5 birthday" },
  { href: "/born-on/may-10", label: "May 10 birthday" },
  { href: "/born-on/may-15", label: "May 15 birthday" },
  { href: "/born-on/may-20", label: "May 20 birthday" },
  { href: "/born-on/may-25", label: "May 25 birthday" },
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <TodayHero />
      <TodayDashboard />
      <TodayCountdowns />

      {/* TODAY TOOLS */}

      <section className="container">
        <h2>Today’s Date Tools</h2>

        <p>
          Tools related to today's date including week numbers and how many
          days or weeks remain in the current year.
        </p>

        <div className="tool-grid">
          <Link href="/what-week-is-it" className="tool-card">
            What Week Is It?
          </Link>

          <Link href={`/how-many-days-left-in/${year}`} className="tool-card">
            Days Left in {year}
          </Link>

          <Link href={`/how-many-weeks-left-in/${year}`} className="tool-card">
            Weeks Left in {year}
          </Link>

          <Link href="/date-calculators" className="tool-card">
            All Date Calculators
          </Link>
        </div>
      </section>

      {/* POPULAR DATE CALCULATORS */}

      <section className="container">
        <h2>Popular Date Calculators</h2>

        <p>
          The most commonly used tools for calculating date differences,
          counting days, and measuring time spans.
        </p>

        <div className="tool-grid">
          <Link href="/days-between" className="tool-card">
            Days Between Dates
          </Link>

          <Link href="/days-until" className="tool-card">
            Days Until Date
          </Link>

          <Link href="/days-since" className="tool-card">
            Days Since Date
          </Link>

          <Link href="/weeks-between" className="tool-card">
            Weeks Between Dates
          </Link>

          <Link href="/months-between" className="tool-card">
            Months Between Dates
          </Link>

          <Link href="/age-calculator" className="tool-card">
            Age Calculator
          </Link>

          <Link href="/date-tools" className="tool-card">
            Date Tools Hub
          </Link>
        </div>
      </section>

      {/* POPULAR COUNTDOWNS */}

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

      {/* DATE CALCULATORS */}

      <section className="container">
        <h2>Date Calculators</h2>

        <p>
          Use these calculators to compare dates, count weeks or months, and
          measure time spans between events.
        </p>

        <div className="tool-grid">
          <Link href="/days-between" className="tool-card">
            Days Between Dates
          </Link>

          <Link href="/weeks-between" className="tool-card">
            Weeks Between Dates
          </Link>

          <Link href="/months-between" className="tool-card">
            Months Between Dates
          </Link>

          <Link href="/years-between" className="tool-card">
            Years Between Dates
          </Link>

          <Link href="/business-days-between" className="tool-card">
            Business Days Between Dates
          </Link>

          <Link href="/date-calculators" className="tool-card">
            Browse All Date Calculators
          </Link>
        </div>
      </section>

      {/* BROWSE DATES */}

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

          <Link href="/birthday-tools" className="tool-card">
            Birthday Calculators
          </Link>
        </div>
      </section>

      {/* BIRTHDAY EXAMPLES */}

      <section className="container">
        <h2>Browse Birthdays by Date</h2>

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

      {/* CALENDAR */}

      <section className="container">
        <h2>Calendar Tools</h2>

        <p>
          Browse calendars and week numbers to plan your year and track
          important dates.
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