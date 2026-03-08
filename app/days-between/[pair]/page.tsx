import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DATE_PAIRS } from "@/lib/data/datePairs";
import { DATE_PAIRS_SEO } from "@/lib/data/datePairsSeo";
import Link from "next/link";
import Script from "next/script";

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
  const diff = end.getTime() - start.getTime();
  return Math.round(diff / 86400000);
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
      canonical: `https://whatdayisit.now/days-between/${data.slug}`,
    },
  };
}

export function generateStaticParams() {
  return [...DATE_PAIRS, ...DATE_PAIRS_SEO].map((pair) => ({
    pair: pair.slug,
  }));
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
  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `Days Between ${label}`,
    applicationCategory: "CalculatorApplication",
    operatingSystem: "Any",
    url: `https://whatdayisit.now/days-between/${data.slug}`,
  };

  const related = DATE_PAIRS.filter((p) => p.slug !== data.slug).slice(0, 8);

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