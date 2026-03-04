import Link from "next/link";
import type { Metadata } from "next";
import { MONTHS } from "@/lib/months";
import { getDaysBetween } from "@/lib/dateDifference";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { month: string; day: string } }): Metadata {
  return {
    title: `Days until ${params.month} ${params.day}`,
    description: "Calculate how many days are left until a date.",
    alternates: { canonical: `/days-until/${params.month}/${params.day}` },
  };
}

export default function Page({ params }: { params: { month: string; day: string } }) {
  const monthKey = params.month.toLowerCase();
  const monthIndex = MONTHS[monthKey];
  const day = Number(params.day);

  if (monthIndex === undefined || !Number.isFinite(day) || day < 1 || day > 31) {
    return (
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800 }}>Invalid date</h1>
        <p style={{ marginTop: 10 }}>
          <Link href="/days-until">Go to days until calculator</Link>
        </p>
      </main>
    );
  }

  const today = new Date();
  let target = new Date(today.getFullYear(), monthIndex, day);
  if (target.getTime() < today.getTime()) target = new Date(today.getFullYear() + 1, monthIndex, day);

  const days = getDaysBetween(today, target);
  const monthName = target.toLocaleDateString("en-US", { month: "long" });

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>Days until {monthName} {day}</h1>
      <p style={{ marginTop: 10, lineHeight: 1.6 }}>
        There are <strong>{days}</strong> days until {monthName} {day}.
      </p>
      <p style={{ marginTop: 18 }}>
        <Link href={`/days-until?month=${monthKey}&day=${day}`}>Open in calculator</Link>
      </p>
      <p style={{ marginTop: 10 }}>
        <Link href="/date-calculators">All date calculators</Link>
      </p>
    </main>
  );
}
