import Link from "next/link";
import type { Metadata } from "next";
import { getDaysBetween } from "@/lib/dateDifference";
import { parseBetweenSlug } from "@/lib/parseDateSlug";

export const dynamic = "force-dynamic";

function parseSingleSlug(slug: string): Date | null {
  const parsed = parseBetweenSlug(`${slug}-and-today`);
  return parsed ? parsed.date1 : null;
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return {
    title: `Days since ${params.slug.replaceAll("-", " ")}`,
    description: "Calculate how many days have passed since a date.",
    alternates: { canonical: `/days-since/${params.slug}` },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const date = parseSingleSlug(params.slug);
  if (!date) {
    return (
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800 }}>Invalid date</h1>
        <p style={{ marginTop: 10 }}>
          <Link href="/days-since">Go to days since calculator</Link>
        </p>
      </main>
    );
  }

  const today = new Date();
  const days = getDaysBetween(date, today);
  const label = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>Days since {label}</h1>
      <p style={{ marginTop: 10, lineHeight: 1.6 }}>
        There have been <strong>{days}</strong> days since {label}.
      </p>
      <p style={{ marginTop: 18 }}>
        <Link href={`/days-since?date=${date.toISOString().slice(0, 10)}`}>Open in calculator</Link>
      </p>
      <p style={{ marginTop: 10 }}>
        <Link href="/date-calculators">All date calculators</Link>
      </p>
    </main>
  );
}
