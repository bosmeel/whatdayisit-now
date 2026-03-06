import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { famousBirthdays } from "@/lib/famous-birthdays";
import { eventsOnThisDay } from "@/lib/events-on-this-day";

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

function getDayOfYear(month: string, day: number) {
  let total = 0;
  for (const m of months) {
    if (m.name === month) break;
    total += m.days;
  }
  return total + day;
}

function getZodiac(month: number, day: number) {
  const signs: [string, number, number][] = [
    ["Capricorn", 1, 19],
    ["Aquarius", 2, 18],
    ["Pisces", 3, 20],
    ["Aries", 4, 19],
    ["Taurus", 5, 20],
    ["Gemini", 6, 20],
    ["Cancer", 7, 22],
    ["Leo", 8, 22],
    ["Virgo", 9, 22],
    ["Libra", 10, 22],
    ["Scorpio", 11, 21],
    ["Sagittarius", 12, 21],
    ["Capricorn", 12, 31],
  ];

  for (const [name, m, d] of signs) {
    if (month === m && day <= d) return name;
  }

  return "Capricorn";
}

function daysUntilNextBirthday(monthIndex: number, day: number) {
  const today = new Date();
  const year = today.getFullYear();

  let next = new Date(year, monthIndex, day);
  if (next < today) next = new Date(year + 1, monthIndex, day);

  const diff = next.getTime() - today.getTime();
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params;
  const formatted = formatSlug(date);

  return {
    title: `Born on ${formatted} – Birthday Facts`,
    description: `Discover famous birthdays, historical events and facts about ${formatted}.`,
    alternates: {
      canonical: `https://whatdayisit.now/born-on/${date}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { date } = await params;

  const [monthSlug, dayStr] = date.split("-");
  const day = parseInt(dayStr);

  const formatted = formatSlug(date);
  const monthIndex = getMonthIndex(monthSlug);

  const refYear = 2024;
  const dateObj = new Date(refYear, monthIndex, day);

  const weekday = dateObj.toLocaleDateString("en-US", { weekday: "long" });

  const dayOfYear = getDayOfYear(monthSlug, day);
  const zodiac = getZodiac(monthIndex + 1, day);
  const daysUntil = daysUntilNextBirthday(monthIndex, day);

  const famous = famousBirthdays[date] || [];
  const events = eventsOnThisDay[date] || [];

  const allDates: string[] = [];
  months.forEach((m) => {
    for (let d = 1; d <= m.days; d++) allDates.push(`${m.name}-${d}`);
  });

  const currentIndex = allDates.indexOf(date);

  const prevDate =
    currentIndex === 0 ? allDates[allDates.length - 1] : allDates[currentIndex - 1];

  const nextDate =
    currentIndex === allDates.length - 1 ? allDates[0] : allDates[currentIndex + 1];

  const relatedDates = allDates.slice(currentIndex + 2, currentIndex + 7);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Born on ${formatted}`,
    url: `https://whatdayisit.now/born-on/${date}`,
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Script
        id="schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <nav className="mb-6 text-sm">
        <Link href="/">Home</Link> /{" "}
        <Link href="/birthday">Birthday Tools</Link> /{" "}
        <Link href="/born-on">Browse birthdays</Link> / {formatted}
      </nav>

      <h1 className="text-3xl font-bold mb-6">
        Born on {formatted}
      </h1>

      <p className="mb-6">
        If you were born on {formatted}, your birthday falls on a <strong>{weekday}</strong>.
        It is the <strong>{dayOfYear}th day of the year</strong> and the zodiac sign for this
        date is <strong>{zodiac}</strong>. There are currently <strong>{daysUntil}</strong> days
        until the next {formatted}.
      </p>

      <p className="mb-6">
        See the live countdown on the{" "}
        <Link href={`/days-until/${monthSlug}-${day}`}>
          days until {formatted}
        </Link>{" "}
        page.
      </p>

      <p className="mb-8">
        View the complete list of{" "}
        <Link href={`/famous-birthdays/${date}`}>
          famous birthdays on {formatted}
        </Link>.
      </p>

      {famous.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            Famous people born on {formatted}
          </h2>

          <ul className="list-disc pl-6 space-y-1">
            {famous.map((p: string) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      )}

      {events.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3">
            Historical events on {formatted}
          </h2>

          <ul className="list-disc pl-6 space-y-1">
            {events.map((e: string) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">
          Birthday tools
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li><Link href="/age-calculator">Age calculator</Link></li>
          <li><Link href="/days-until-my-birthday">Days until my birthday</Link></li>
          <li><Link href="/what-day-was-i-born">What day was I born</Link></li>
        </ul>
      </section>

      <section className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">
          Related birthdays
        </h2>

        <div className="flex flex-wrap gap-3">
          {relatedDates.map((d) => (
            <Link
              key={d}
              href={`/born-on/${d}`}
              className="border rounded px-3 py-1 text-sm"
            >
              {formatSlug(d)}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-10 flex justify-between text-sm">
        <Link href={`/born-on/${prevDate}`}>← {formatSlug(prevDate)}</Link>
        <Link href={`/born-on/${nextDate}`}>{formatSlug(nextDate)} →</Link>
      </div>

    </main>
  );
}