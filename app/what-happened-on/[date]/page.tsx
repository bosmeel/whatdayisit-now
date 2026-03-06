import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    date: string;
  }>;
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

function formatSlug(slug: string) {
  const [month, day] = slug.split("-");
  const monthName = month.charAt(0).toUpperCase() + month.slice(1);
  return `${monthName} ${day}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params;
  const formatted = formatSlug(date);

  return {
    title: `What happened on ${formatted}?`,
    description: `Historical events that happened on ${formatted}.`,
    alternates: {
      canonical: `https://whatdayisit.now/what-happened-on/${date}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { date } = await params;

  const { eventsOnThisDay } = await import("@/lib/events-on-this-day");

  const formatted = formatSlug(date);

  const events = eventsOnThisDay[date] || [];

  const allDates: string[] = [];

  months.forEach((m) => {
    for (let d = 1; d <= m.days; d++) {
      allDates.push(`${m.name}-${d}`);
    }
  });

  const index = allDates.indexOf(date);

  const prev =
    index === 0 ? allDates[allDates.length - 1] : allDates[index - 1];

  const next =
    index === allDates.length - 1 ? allDates[0] : allDates[index + 1];

  const related = allDates.slice(index + 2, index + 7);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <nav className="mb-6 text-sm">
        <Link href="/">Home</Link>
        {" / "}
        <Link href="/what-happened-on">Historical Events</Link>
        {" / "}
        {formatted}
      </nav>

      <h1 className="text-3xl font-bold mb-6">
        What happened on {formatted}?
      </h1>

      <p className="mb-8">
        Here are historical events that happened on {formatted}.
      </p>

      {events.length > 0 ? (
        <ul className="list-disc pl-6 space-y-2 mb-10">
          {events.map((event: string) => (
            <li key={event}>{event}</li>
          ))}
        </ul>
      ) : (
        <p className="mb-10">
          No events available for this date yet.
        </p>
      )}

      <section className="mt-10 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">
          Famous birthdays on this day
        </h2>

        <Link
          href={`/born-on/${date}`}
          className="underline"
        >
          See people born on {formatted}
        </Link>
      </section>

      <section className="mt-10 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">
          Related historical dates
        </h2>

        <div className="flex flex-wrap gap-2">
          {related.map((d) => (
            <Link
              key={d}
              href={`/what-happened-on/${d}`}
              className="border rounded px-2 py-1 text-sm"
            >
              {formatSlug(d)}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-10 flex justify-between text-sm">
        <Link href={`/what-happened-on/${prev}`}>
          ← {formatSlug(prev)}
        </Link>

        <Link href={`/what-happened-on/${next}`}>
          {formatSlug(next)} →
        </Link>
      </div>
    </main>
  );
}