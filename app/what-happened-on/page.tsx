import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historical events by date",
  description:
    "Browse historical events that happened on every day of the year.",
  alternates: {
    canonical: "https://whatdayisit.now/what-happened-on",
  },
};

const months = [
  { name: "january", days: 31 },
  { name: "february", days: 29 },
  { name: "march", days: 31 },
  { name: "april", days: 30 },
  { name: "may", days: 31 },
  { name: "june", days: 30 },
  { name: "july", days: 31 },
  { name: "august", days: 31 },
  { name: "september", days: 30 },
  { name: "october", days: 31 },
  { name: "november", days: 30 },
  { name: "december", days: 31 },
];

function formatMonth(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">

      <nav className="mb-6 text-sm">
        <Link href="/">Home</Link>
        {" / "}
        Historical Events
      </nav>

      <h1 className="text-3xl font-bold mb-6">
        Historical events by date
      </h1>

      <p className="mb-10">
        Explore important historical events that happened on every day of the year.
        Select a date to see what happened on that day in history.
      </p>

      {months.map((month) => (
        <section key={month.name} className="mb-8">

          <h2 className="text-xl font-semibold mb-3">
            {formatMonth(month.name)}
          </h2>

          <div className="flex flex-wrap gap-2">

            {Array.from({ length: month.days }, (_, i) => {
              const day = i + 1;
              const slug = `${month.name}-${day}`;

              return (
                <Link
                  key={slug}
                  href={`/what-happened-on/${slug}`}
                  className="border rounded px-2 py-1 text-sm hover:bg-neutral-100"
                >
                  {day}
                </Link>
              );
            })}

          </div>

        </section>
      ))}

    </main>
  );
}