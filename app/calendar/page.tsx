import Link from "next/link";

export default function CalendarIndexPage() {

  const currentYear = new Date().getFullYear();

  const years = [
    currentYear - 1,
    currentYear,
    currentYear + 1,
    currentYear + 2,
  ];

  return (
    <div>

      <h1>Calendar by Year</h1>

      <p>
        Browse calendars by year including months, birthdays, holidays and
        notable historical dates.
      </p>

      {/* Primary year cards */}

      <div className="tool-grid">
        {years.map((year) => (
          <Link key={year} href={`/calendar/${year}`} className="tool-card">
            Calendar {year}
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

    </div>
  );
}