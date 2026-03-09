import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
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
  return `${month.charAt(0).toUpperCase() + month.slice(1)} ${day}`;
}

function getMonthIndex(month: string) {
  const index = months.findIndex((m) => m.name === month);
  return index === -1 ? 0 : index;
}

function getDayOfYear(month: string, day: number) {
  let total = 0;
  for (const m of months) {
    if (m.name === month) break;
    total += m.days;
  }
  return total + day;
}

function daysUntilNextBirthday(monthIndex: number, day: number) {
  const today = new Date();
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  let next = new Date(now.getFullYear(), monthIndex, day);

  if (next < now) {
    next = new Date(now.getFullYear() + 1, monthIndex, day);
  }

  const diff = next.getTime() - now.getTime();
  return Math.ceil(diff / 86400000);
}

function getZodiac(month: number, day: number) {
  const zodiac: [string, number, number][] = [
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

  for (const [name, m, d] of zodiac) {
    if (month === m && day <= d) return name;
  }

  return "Capricorn";
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

export default async function Page({ params }: PageProps) {

  const { date } = await params;

  const { famousBirthdays } = await import("@/lib/famous-birthdays");
  const { eventsOnThisDay } = await import("@/lib/events-on-this-day");

  const [monthSlug, dayStr] = date.split("-");
  const day = parseInt(dayStr, 10);

  const monthIndex = getMonthIndex(monthSlug);
  const formatted = formatSlug(date);

  const refDate = new Date(2024, monthIndex, day);
  const weekday = refDate.toLocaleDateString("en-US", { weekday: "long" });

  const dayOfYear = getDayOfYear(monthSlug, day);
  const zodiac = getZodiac(monthIndex + 1, day);
  const daysUntil = daysUntilNextBirthday(monthIndex, day);

  const famous = famousBirthdays[date] || [];
  const events = eventsOnThisDay[date] || [];

  const allDates = buildAllDates();
  const currentIndex = allDates.indexOf(date);

  const prevDate =
    currentIndex === 0 ? allDates[allDates.length - 1] : allDates[currentIndex - 1];

  const nextDate =
    currentIndex === allDates.length - 1 ? allDates[0] : allDates[currentIndex + 1];

  const relatedDates = [
    allDates[(currentIndex + 1) % allDates.length],
    allDates[(currentIndex + 2) % allDates.length],
    allDates[(currentIndex + 3) % allDates.length],
    allDates[(currentIndex + 4) % allDates.length],
    allDates[(currentIndex + 5) % allDates.length],
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Born on ${formatted}`,
    url: `https://whatdayisit.now/born-on/${date}`,
  };

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>

      <Script
        id="schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <h1>Born on {formatted}</h1>

      <p>
        If you were born on <strong>{formatted}</strong>, your birthday falls on a{" "}
        <strong>{weekday}</strong>. It is the{" "}
        <strong>{dayOfYear}th day of the year</strong>. The zodiac sign for this date is{" "}
        <strong>{zodiac}</strong>.
      </p>

      <p>
        There are currently <strong>{daysUntil}</strong> days until the next {formatted}.
      </p>

      <section style={{ marginTop: 30 }}>
        <h2>{formatted} birthday facts</h2>

        <p>
          People born on <strong>{formatted}</strong> belong to the{" "}
          <strong>{zodiac}</strong> zodiac sign. Many well known figures share a{" "}
          <strong>{formatted} birthday</strong>, and the date appears in many
          historical timelines.
        </p>

        <p>
          If you are researching <strong>{formatted} birthdays</strong>, this page
          lists notable people born on this date and important historical events
          that happened on {formatted}.
        </p>
      </section>

      {famous.length > 0 && (
        <section style={{ marginTop: 30 }}>
          <h2>Famous people born on {formatted}</h2>
          <ul>
            {famous.map((p: string) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      )}

      <section style={{ marginTop: 30 }}>
  <h2>Historical events on {formatted}</h2>

  {events.length > 0 ? (
    <ul>
      {events.map((e: string) => (
        <li key={e}>{e}</li>
      ))}
    </ul>
  ) : (
    <p>
      Historical records and notable events that happened on {formatted}
      are available on the full timeline page.
    </p>
  )}

  <p style={{ marginTop: 10 }}>
    <Link href={`/what-happened-on/${date}`}>
      View everything that happened on {formatted} →
    </Link>
  </p>
</section>

      <section style={{ marginTop: 40, borderTop: "1px solid #ddd", paddingTop: 20 }}>
        <h2>Related birthdays</h2>

        <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: 0, listStyle: "none" }}>
          {relatedDates.map((d) => (
            <li key={d}>
              <Link
                href={`/born-on/${d}`}
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
        <h2>More birthdays around {formatted}</h2>

        <ul>
          <li>
            <Link href={`/born-on/${prevDate}`}>
              People born on {formatSlug(prevDate)}
            </Link>
          </li>

          <li>
            <Link href={`/born-on/${date}`}>
              Famous birthdays on {formatted}
            </Link>
          </li>

          <li>
            <Link href={`/born-on/${nextDate}`}>
              People born on {formatSlug(nextDate)}
            </Link>
          </li>
        </ul>
      </section>

      <div style={{ marginTop: 40, display: "flex", justifyContent: "space-between" }}>
        <Link href={`/born-on/${prevDate}`}>← {formatSlug(prevDate)}</Link>
        <Link href={`/born-on/${nextDate}`}>{formatSlug(nextDate)} →</Link>
      </div>

    </main>
  );
}