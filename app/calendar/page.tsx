import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";


export const metadata: Metadata = {
  title: "Calendar by Year",
  description:
    "Browse calendars by year including months, birthdays, holidays and notable historical dates.",
  alternates: {
    canonical: "https://whatdayisit.now/calendar",
  },
};

export default function CalendarIndexPage() {

  const currentYear = new Date().getFullYear();

  const years = [
    currentYear - 1,
    currentYear,
    currentYear + 1,
    currentYear + 2,
  ];

  return (
    <main className="container">

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Calendar" }
        ]}
      />

      <h1>Calendar by Year</h1>

      <p>
        Browse calendars by year including months, birthdays, holidays and
        notable historical dates.
      </p>

      {/* Primary year cards */}

      <div className="tool-grid">

        {years.map((year) => (

          <Link
            key={year}
            href={`/calendar/${year}`}
            className="tool-card"
          >

            <strong>Calendar {year}</strong>

            <div>
              View the full calendar for {year}
            </div>

          </Link>

        ))}

      </div>

      {/* SEO year list */}

      <section style={{ marginTop: 40 }}>

        <h2>Browse Calendar by Year</h2>

        <ul style={{ lineHeight: 1.9 }}>

          <li><Link href="/calendar/2023">Calendar 2023</Link></li>
          <li><Link href="/calendar/2024">Calendar 2024</Link></li>
          <li><Link href="/calendar/2025">Calendar 2025</Link></li>
          <li><Link href="/calendar/2026">Calendar 2026</Link></li>
          <li><Link href="/calendar/2027">Calendar 2027</Link></li>
          <li><Link href="/calendar/2028">Calendar 2028</Link></li>
          <li><Link href="/calendar/2029">Calendar 2029</Link></li>
          <li><Link href="/calendar/2030">Calendar 2030</Link></li>

        </ul>

      </section>

      {/* Related calendar tools */}

      <section style={{ marginTop: 50 }}>

        <h2>Related Calendar Tools</h2>

        <div className="tool-grid">

          <Link
            href="/week-number"
            className="tool-card"
          >

            <strong>Week Number Tool</strong>

            <div>
              Find the current ISO week number
            </div>

          </Link>

          <Link
            href={`/week-number/${currentYear}`}
            className="tool-card"
          >

            <strong>Week Numbers {currentYear}</strong>

            <div>
              See all week numbers for {currentYear}
            </div>

          </Link>

          <Link
            href="/what-week-is-it"
            className="tool-card"
          >

            <strong>What Week Is It?</strong>

            <div>
              See the current week of the year
            </div>

          </Link>

        </div>

      </section>

    </main>
    

  );
}