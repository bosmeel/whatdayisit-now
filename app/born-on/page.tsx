import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Birthdays by Date",
  description:
    "Explore birthdays for every day of the year. Discover famous people, zodiac signs and historical events for each date.",
};

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const daysPerMonth: Record<string, number> = {
  january: 31,
  february: 29,
  march: 31,
  april: 30,
  may: 31,
  june: 30,
  july: 31,
  august: 31,
  september: 30,
  october: 31,
  november: 30,
  december: 31,
};

function formatMonth(m: string) {
  return m.charAt(0).toUpperCase() + m.slice(1);
}

export default function Page() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>

      <h1>Browse Birthdays by Date</h1>

      <p>
        Explore birthdays for every day of the year. Each page shows famous
        people born on that date, zodiac information and historical events.
      </p>

      {months.map((month) => (
        <section key={month} style={{ marginTop: 40 }}>
          <h2>{formatMonth(month)} birthdays</h2>

          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              padding: 0,
              listStyle: "none",
            }}
          >
            {Array.from({ length: daysPerMonth[month] }, (_, i) => i + 1).map(
              (day) => (
                <li key={day}>
                  <Link
                    href={`/born-on/${month}-${day}`}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      padding: "4px 8px",
                      fontSize: "14px",
                      display: "inline-block",
                    }}
                  >
                    {formatMonth(month)} {day}
                  </Link>
                </li>
              )
            )}
          </ul>
        </section>
      ))}
    </main>
  );
}