import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Famous Birthdays by Month",
  description:
    "Browse famous people and notable birthdays by month.",
  alternates: {
    canonical: "https://whatdayisit.now/born-in",
  },
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

function format(m: string) {
  return m.charAt(0).toUpperCase() + m.slice(1);
}

export default function Page() {

  return (

    <main className="container">

      <h1>Famous Birthdays by Month</h1>

      <p>
        Browse famous people and notable birthdays organized by month.
      </p>

      <div className="tool-grid">

        {months.map((m) => (

          <Link
            key={m}
            href={`/born-in/${m}`}
            className="tool-card"
          >
            Famous people born in {format(m)}
          </Link>

        ))}

      </div>

    </main>

  );
}