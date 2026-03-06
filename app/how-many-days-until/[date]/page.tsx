import type { Metadata } from "next";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    date: string;
  }>;
};

const months = [
  { name: "january", days: 31, index: 0 },
  { name: "february", days: 29, index: 1 },
  { name: "march", days: 31, index: 2 },
  { name: "april", days: 30, index: 3 },
  { name: "may", days: 31, index: 4 },
  { name: "june", days: 30, index: 5 },
  { name: "july", days: 31, index: 6 },
  { name: "august", days: 31, index: 7 },
  { name: "september", days: 30, index: 8 },
  { name: "october", days: 31, index: 9 },
  { name: "november", days: 30, index: 10 },
  { name: "december", days: 31, index: 11 },
];

function formatSlug(slug: string) {
  const [month, day] = slug.split("-");
  const monthName = month.charAt(0).toUpperCase() + month.slice(1);
  return `${monthName} ${day}`;
}

function getMonthIndex(month: string) {
  const m = months.find((m) => m.name === month);
  return m ? m.index : 0;
}

function daysUntil(monthIndex: number, day: number) {
  const today = new Date();
  const year = today.getFullYear();

  let target = new Date(year, monthIndex, day);

  if (target < today) {
    target = new Date(year + 1, monthIndex, day);
  }

  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
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

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { date } = await params;
  const formatted = formatSlug(date);

  return {
    title: `How many days until ${formatted}?`,
    description: `See how many days remain until ${formatted}.`,
    alternates: {
      canonical: `https://whatdayisit.now/how-many-days-until/${date}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { date } = await params;

  const [monthSlug, dayStr] = date.split("-");
  const day = parseInt(dayStr);

  const formatted = formatSlug(date);
  const monthIndex = getMonthIndex(monthSlug);

  const remaining = daysUntil(monthIndex, day);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">

      <nav className="mb-6 text-sm">
        <Link href="/">Home</Link> / How many days until {formatted}
      </nav>

      <h1 className="text-3xl font-bold mb-6">
        How many days until {formatted}?
      </h1>

      <p className="mb-8">
        There are <strong>{remaining}</strong> days until {formatted}.
      </p>

      <p className="mb-10">
        You can also see the full countdown on the{" "}
        <Link href={`/days-until/${date}`}>
          days until {formatted}
        </Link>{" "}
        page.
      </p>

      <section className="border-t pt-8">

        <h2 className="text-xl font-semibold mb-4">
          Related tools
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link href="/days-until">Days until date</Link>
          </li>

          <li>
            <Link href="/days-since">Days since date</Link>
          </li>

          <li>
            <Link href="/day-of-year">Day of year calculator</Link>
          </li>
        </ul>

      </section>

    </main>
  );
}