import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";
import { DATE_PAIRS } from "@/lib/data/datePairs";

export const metadata: Metadata = {
  title: "Days Between Dates Calculator",
  description:
    "Calculate the exact number of days between two dates. Free online days between dates calculator.",
  alternates: {
    canonical: "https://whatdayisit.now/days-between",
  },
};

export default function DaysBetweenIndexPage() {

  const sorted = [...DATE_PAIRS].sort(
    (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
  );

  const featured = sorted.slice(0, 10);
  const all = sorted.slice(10);

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>

      <h1>Days Between Dates</h1>

      <p>
        Use the calculator below to find the number of days between two dates.
      </p>

      <Calculator />

      <h2 style={{ marginTop: 50 }}>Popular date pairs</h2>

      <ul style={{ lineHeight: 1.9 }}>
        {featured.map((p) => (
          <li key={p.slug}>
            <Link href={`/days-between/${p.slug}`}>
              Days between {p.label}
            </Link>
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: 40 }}>All date comparisons</h2>

      <ul style={{ columns: 2, lineHeight: 1.8 }}>
        {all.map((p) => (
          <li key={p.slug}>
            <Link href={`/days-between/${p.slug}`}>
              {p.label}
            </Link>
          </li>
        ))}
      </ul>

    </main>
  );
}