import Link from "next/link";

export default function SeoLinks() {
  return (
    <section className="container mt-10">

      <h2>Related Date Tools</h2>

      <p>
        Explore more tools to compare dates, calculate time differences,
        and browse calendars.
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

        <Link href="/age-calculator" className="tool-card">
          Age Calculator
        </Link>

      </div>

      <h2 className="mt-10">Browse Dates</h2>

      <div className="tool-grid">

        <Link href="/born-on" className="tool-card">
          Birthdays by Date
        </Link>

        <Link href="/what-happened-on" className="tool-card">
          Historical Events by Date
        </Link>

        <Link href="/calendar/2026" className="tool-card">
          2026 Calendar
        </Link>

        <Link href="/week-number/2026" className="tool-card">
          Week Numbers
        </Link>

      </div>

    </section>
  );
}