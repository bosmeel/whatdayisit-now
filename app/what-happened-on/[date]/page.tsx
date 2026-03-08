import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ date: string }>;
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

function buildAllDates() {
  const arr: string[] = [];
  months.forEach((m) => {
    for (let d = 1; d <= m.days; d++) {
      arr.push(`${m.name}-${d}`);
    }
  });
  return arr;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { date } = await params;
  const formatted = formatSlug(date);

  return {
    title: `What happened on ${formatted}?`,
    description: `Historical events and notable moments that happened on ${formatted}.`,
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

  const allDates = buildAllDates();
  const index = allDates.indexOf(date);

  const prev =
    index === 0 ? allDates[allDates.length - 1] : allDates[index - 1];

  const next =
    index === allDates.length - 1 ? allDates[0] : allDates[index + 1];

  const related = [
    allDates[(index + 1) % allDates.length],
    allDates[(index + 2) % allDates.length],
    allDates[(index + 3) % allDates.length],
    allDates[(index + 4) % allDates.length],
    allDates[(index + 5) % allDates.length],
  ];

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>

      <nav style={{ marginBottom: 20 }}>
        <Link href="/">Home</Link> /{" "}
        <Link href="/what-happened-on">Historical Events</Link> / {formatted}
      </nav>

      <h1>What happened on {formatted}?</h1>

      <p>
        Here are historical events and notable moments that happened on{" "}
        <strong>{formatted}</strong>.
      </p>

      {events.length > 0 ? (
        <ul style={{ marginTop: 20 }}>
          {events.map((event: string) => (
            <li key={event}>{event}</li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: 20 }}>
          Historical records for {formatted} are still being compiled.
        </p>
      )}

      <section style={{ marginTop: 40 }}>
        <h2>People born on {formatted}</h2>

        <p>
          See famous people and notable birthdays that fall on this date.
        </p>

        <Link href={`/born-on/${date}`}>
          View birthdays on {formatted} →
        </Link>
      </section>
<section style={{ marginTop: 40 }}>
  <h2>People born on {formatted}</h2>

  <p>
    See famous people and notable birthdays that fall on this date.
  </p>

  <Link href={`/born-on/${date}`}>
    View birthdays on {formatted} →
  </Link>

  <p style={{ marginTop: 10 }}>
    You can also explore nearby birthday pages like{" "}
    <Link href={`/born-on/${prev}`}>{formatSlug(prev)}</Link>{" "}
    and{" "}
    <Link href={`/born-on/${next}`}>{formatSlug(next)}</Link>.
  </p>
</section>
      <section style={{ marginTop: 40, borderTop: "1px solid #ddd", paddingTop: 20 }}>
        <h2>Related historical dates</h2>

        <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: 0, listStyle: "none" }}>
          {related.map((d) => (
            <li key={d}>
              <Link
                href={`/what-happened-on/${d}`}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  fontSize: "14px",
                  display: "inline-block",
                }}
              >
                {formatSlug(d)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Explore nearby dates</h2>

        <ul>
          <li>
            <Link href={`/what-happened-on/${prev}`}>
              Events on {formatSlug(prev)}
            </Link>
          </li>

          <li>
            <Link href={`/what-happened-on/${date}`}>
              Historical events on {formatted}
            </Link>
          </li>

          <li>
            <Link href={`/what-happened-on/${next}`}>
              Events on {formatSlug(next)}
            </Link>
          </li>
        </ul>
      </section>

      <div style={{ marginTop: 40, display: "flex", justifyContent: "space-between" }}>
        <Link href={`/what-happened-on/${prev}`}>← {formatSlug(prev)}</Link>
        <Link href={`/what-happened-on/${next}`}>{formatSlug(next)} →</Link>
      </div>

    </main>
  );
}