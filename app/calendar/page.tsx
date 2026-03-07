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

      <div className="tool-grid">
        {years.map((year) => (
          <Link key={year} href={`/calendar/${year}`} className="tool-card">
            Calendar {year}
          </Link>
        ))}
      </div>
    </div>
  );
}