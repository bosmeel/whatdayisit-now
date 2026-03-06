import type { Metadata } from "next";
import Link from "next/link";
import { famousBirthdays } from "@/lib/famous-birthdays";

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

export function generateStaticParams() {
  const routes: { date: string }[] = [];

  months.forEach((month) => {
    for (let d = 1; d <= month.days; d++) {
      routes.push({
        date: `${month.name}-${d}`,
      });
    }
  });

  return routes;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {

  const { date } = await params;
  const formatted = formatSlug(date);

  return {
    title: `Famous birthdays on ${formatted}`,
    description: `Discover famous people born on ${formatted}.`,
    alternates: {
      canonical: `https://whatdayisit.now/famous-birthdays/${date}`,
    },
  };
}

export default async function Page({ params }: PageProps) {

  const { date } = await params;

  const formatted = formatSlug(date);

  const people = famousBirthdays[date] || [];

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
        <Link href="/famous-birthdays">Famous Birthdays</Link>
        {" / "}
        {formatted}
      </nav>

      <h1 className="text-3xl font-bold mb-6">
        Famous birthdays on {formatted}
      </h1>

      <p className="mb-8">
        Here are well-known people who were born on {formatted}.
      </p>

      {people.length > 0 ? (

        <ul className="list-disc pl-6 space-y-2 mb-10">

          {people.map((person) => (
            <li key={person}>
              {person}
            </li>
          ))}

        </ul>

      ) : (

        <p className="mb-10">
          No famous birthdays recorded for this date yet.
        </p>

      )}

      <section className="mt-10 border-t pt-8">

        <h2 className="text-xl font-semibold mb-4">
          Learn more about this date
        </h2>

        <ul className="list-disc pl-6 space-y-2">

          <li>
            <Link href={`/born-on/${date}`}>
              Birthday facts for {formatted}
            </Link>
          </li>

          <li>
            <Link href={`/what-happened-on/${date}`}>
              Historical events on {formatted}
            </Link>
          </li>

        </ul>

      </section>

      <section className="mt-10 border-t pt-8">

        <h2 className="text-xl font-semibold mb-4">
          Related famous birthdays
        </h2>

        <div className="flex flex-wrap gap-2">

          {related.map((d) => (
            <Link
              key={d}
              href={`/famous-birthdays/${d}`}
              className="border rounded px-2 py-1 text-sm"
            >
              {formatSlug(d)}
            </Link>
          ))}

        </div>

      </section>

      <div className="mt-10 flex justify-between text-sm">

        <Link href={`/famous-birthdays/${prev}`}>
          ← {formatSlug(prev)}
        </Link>

        <Link href={`/famous-birthdays/${next}`}>
          {formatSlug(next)} →
        </Link>

      </div>

    </main>
  );
}