import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DATE_PAIRS } from "@/lib/data/datePairs";
import { DATE_PAIRS_SEO } from "@/lib/data/datePairsSeo";
import { EVENTS } from "@/lib/events";
import Link from "next/link";
import Script from "next/script";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ pair: string }>;
};

type BasePair = {
  slug: string;
  label: string;
};

type SeoPair = {
  slug: string;
  title: string;
  start: { year: number; month: number; day: number; label: string };
  end: { year: number; month: number; day: number; label: string };
};

function findPair(slug: string): BasePair | SeoPair | undefined {
  return (
    DATE_PAIRS_SEO.find((p) => p.slug === slug) ||
    DATE_PAIRS.find((p) => p.slug === slug)
  );
}

function getLabel(data: BasePair | SeoPair) {
  return "label" in data ? data.label : data.title;
}

function calculateDays(start: Date, end: Date) {
  const diff = Math.abs(end.getTime() - start.getTime());
  return Math.round(diff / 86400000);
}

function resolveEventPair(slug: string) {
  const parts = slug.split("-and-");
  if (parts.length !== 2) return null;

  const a = EVENTS[parts[0]];
  const b = EVENTS[parts[1]];

  if (!a || !b) return null;

  const year = new Date().getFullYear();

  const start = new Date(year, a.month - 1, a.day);
  const end = new Date(year, b.month - 1, b.day);

  return {
    start,
    end,
    startLabel: `${a.name}, ${year}`,
    endLabel: `${b.name}, ${year}`,
  };
}

function resolveMonthDayPair(slug: string) {
  const parts = slug.split("-and-");
  if (parts.length !== 2) return null;

  const months = [
    "january","february","march","april","may","june",
    "july","august","september","october","november","december"
  ];

  const parse = (text: string) => {
    const [month, day] = text.split("-");
    const monthIndex = months.indexOf(month);

    if (monthIndex === -1) return null;

    const d = parseInt(day, 10);
    if (Number.isNaN(d)) return null;

    return new Date(new Date().getFullYear(), monthIndex, d);
  };

  const start = parse(parts[0]);
  const end = parse(parts[1]);

  if (!start || !end) return null;

  return {
    start,
    end,
    startLabel: parts[0].replace("-", " "),
    endLabel: parts[1].replace("-", " "),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const data = findPair(pair);

  if (!data) return {};

  const label = getLabel(data);

  return {
    title: `Days Between ${label}`,
    description: `Find how many days are between ${label}.`,
    alternates: {
      canonical: `https://whatdayisit.now/days-between/${pair}`,
    },
  };
}

export default async function DaysBetweenPairPage({ params }: Props) {
  const { pair } = await params;

  const data = findPair(pair);

  if (!data) {
    notFound();
  }

  const label = getLabel(data);

  let result: number | null = null;
  let startLabel: string | null = null;
  let endLabel: string | null = null;

  /* 1 SEO pairs */

  if ("start" in data && "end" in data) {
    const startDate = new Date(
      data.start.year,
      data.start.month - 1,
      data.start.day
    );

    const endDate = new Date(
      data.end.year,
      data.end.month - 1,
      data.end.day
    );

    result = calculateDays(startDate, endDate);
    startLabel = data.start.label;
    endLabel = data.end.label;

  } else {

    /* 2 event pairs */

    const eventPair = resolveEventPair(pair);

    if (eventPair) {
      result = calculateDays(eventPair.start, eventPair.end);
      startLabel = eventPair.startLabel;
      endLabel = eventPair.endLabel;

    } else {

      /* 3 month-day pairs */

      const monthPair = resolveMonthDayPair(pair);

      if (monthPair) {
        result = calculateDays(monthPair.start, monthPair.end);
        startLabel = monthPair.startLabel;
        endLabel = monthPair.endLabel;
      }

    }

  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `Days Between ${label}`,
    applicationCategory: "CalculatorApplication",
    operatingSystem: "Any",
    url: `https://whatdayisit.now/days-between/${pair}`,
  };

  const related = DATE_PAIRS.filter((p) => p.slug !== pair).slice(0, 8);

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <Script
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <h1>Days Between {label}</h1>

      {result !== null && (
        <div style={{ marginTop: 20, fontSize: 28, fontWeight: 700 }}>
          {result} days
        </div>
      )}

      {startLabel && endLabel && (
        <p style={{ marginTop: 10 }}>
          Between <strong>{startLabel}</strong> and{" "}
          <strong>{endLabel}</strong>.
        </p>
      )}

      <p style={{ marginTop: 30 }}>
        Use our main calculator if you want to compare custom dates.
      </p>

      <p style={{ marginTop: 20 }}>
        <Link href="/days-between" prefetch={false}>
          ← Back to days between calculator
        </Link>
      </p>

      <h2 style={{ marginTop: 50 }}>Popular date comparisons</h2>

      <ul style={{ lineHeight: 1.9 }}>
        {related.map((p) => (
          <li key={p.slug}>
            <Link href={`/days-between/${p.slug}`} prefetch={false}>
              Days between {p.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}