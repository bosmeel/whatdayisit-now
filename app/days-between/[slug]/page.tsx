import Link from "next/link";
import type { Metadata } from "next";
import { parseBetweenSlug } from "@/lib/parseDateSlug";
import { getDaysBetween, getWeeksBetween, getMonthsBetween, getYearsBetween } from "@/lib/dateDifference";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params?: { slug?: string } }): Metadata {

  const slug = params?.slug ?? "";

  const title = slug
    ? `Days between ${slug.replaceAll("-", " ")}`
    : "Days between dates";

  return {
    title,
    description: "Calculate the number of days between two dates.",
    alternates: { canonical: slug ? `/days-between/${slug}` : "/days-between" },
  };
}

export default function Page({ params }: { params?: { slug?: string } }) {

  const slug = params?.slug;

  if (!slug) {
    return (
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800 }}>Invalid comparison</h1>
        <p style={{ marginTop: 10 }}>
          <Link href="/days-between">Go to days between calculator</Link>
        </p>
      </main>
    );
  }

  const parsed = parseBetweenSlug(slug);

  if (!parsed) {
    return (
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800 }}>Invalid date comparison</h1>
        <p style={{ marginTop: 10 }}>Use the main calculator instead.</p>
        <p style={{ marginTop: 10 }}>
          <Link href="/days-between">Go to days between calculator</Link>
        </p>
      </main>
    );
  }

  const { date1, date2 } = parsed;

  const days = getDaysBetween(date1, date2);
  const weeks = getWeeksBetween(date1, date2);
  const months = getMonthsBetween(date1, date2);
  const years = getYearsBetween(date1, date2);

  const label1 = date1.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const label2 = date2.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

      <h1 style={{ fontSize: 36, fontWeight: 800 }}>
        Days between {label1} and {label2}
      </h1>

      <p style={{ marginTop: 10, lineHeight: 1.6 }}>
        There are <strong>{days}</strong> days between {label1} and {label2}.
      </p>

      <ul style={{ marginTop: 14, lineHeight: 1.8 }}>
        <li>{weeks} full weeks (approx.)</li>
        <li>{months} full months (calendar months)</li>
        <li>{years} full years (approx.)</li>
      </ul>

      <p style={{ marginTop: 18 }}>
        <Link href={`/days-between?start=${date1.toISOString().slice(0, 10)}&end=${date2.toISOString().slice(0, 10)}`}>
          Open these dates in the calculator
        </Link>
      </p>

      <p style={{ marginTop: 10 }}>
        <Link href="/date-calculators">All date calculators</Link>
      </p>

    </main>
  );
}