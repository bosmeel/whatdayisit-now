import Link from "next/link";
import type { Metadata } from "next";
import { EVENTS } from "@/lib/events";

export const dynamic = "force-dynamic";

type Parsed = { date1: Date; date2: Date; label1: string; label2: string };

const MONTHS: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function isoDateUTC(d: Date) {
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
}

function startOfTodayUTC() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function daysBetweenUTC(a: Date, b: Date) {
  const MS = 86400000;
  const ua = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
  const ub = Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
  return Math.round((ub - ua) / MS);
}

function formatLong(d: Date) {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

function parseMonthDayToken(token: string, year: number): Date | null {
  // token: "january-1" or "jan-1" or "12-25"
  const parts = token.split("-").filter(Boolean);
  if (parts.length < 2) return null;

  // numeric month-day
  if (/^\d{1,2}$/.test(parts[0]) && /^\d{1,2}$/.test(parts[1])) {
    const m = Number(parts[0]);
    const d = Number(parts[1]);
    if (m < 1 || m > 12 || d < 1 || d > 31) return null;
    return new Date(Date.UTC(year, m - 1, d));
  }

  const mKey = parts[0].toLowerCase();
  const m = MONTHS[mKey];
  const d = Number(parts[1]);
  if (!m || !Number.isFinite(d) || d < 1 || d > 31) return null;
  return new Date(Date.UTC(year, m - 1, d));
}

function parseSide(tokenRaw: string, anchorYear: number): { date: Date; label: string } | null {
  const token = tokenRaw.trim().toLowerCase();

  // today
  if (token === "today") {
    const d = startOfTodayUTC();
    return { date: d, label: "today" };
  }

  // plain year e.g. "2024"
  if (/^\d{4}$/.test(token)) {
    const y = Number(token);
    const d = new Date(Date.UTC(y, 0, 1));
    return { date: d, label: `January 1, ${y}` };
  }

  // event slug
  const ev = EVENTS[token];
  if (ev) {
    const y = anchorYear;
    const d = new Date(Date.UTC(y, ev.month - 1, ev.day));
    return { date: d, label: ev.name };
  }

  // month-day
  const md = parseMonthDayToken(token, anchorYear);
  if (md) return { date: md, label: formatLong(md) };

  return null;
}

function parseBetweenSlug(slug: string): Parsed | null {
  // expected: "<left>-and-<right>"
  if (!slug || !slug.includes("-and-")) return null;

  const [leftRaw, rightRaw] = slug.split("-and-");
  if (!leftRaw || !rightRaw) return null;

  const baseYear = new Date().getUTCFullYear();

  // first pass: parse with current year as anchor
  let left = parseSide(leftRaw, baseYear);
  let right = parseSide(rightRaw, baseYear);
  if (!left || !right) return null;

  // If one side is "today", prefer the other side’s year (if other side is a fixed date in another year)
  // (light heuristic for year correctness)
  const leftIsToday = left.label === "today";
  const rightIsToday = right.label === "today";
  if (leftIsToday && !rightIsToday) {
    const y = right.date.getUTCFullYear();
    left = parseSide(leftRaw, y) ?? left;
  }
  if (rightIsToday && !leftIsToday) {
    const y = left.date.getUTCFullYear();
    right = parseSide(rightRaw, y) ?? right;
  }

  const label1 = left.label === "today" ? formatLong(left.date) : left.label;
  const label2 = right.label === "today" ? formatLong(right.date) : right.label;

  return { date1: left.date, date2: right.date, label1, label2 };
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const parsed = parseBetweenSlug(params.slug);
  if (!parsed) {
    return {
      title: "Days between dates",
      description: "Calculate the number of days between two dates.",
      alternates: { canonical: "/days-between" },
    };
  }

  const title = `Days between ${parsed.label1} and ${parsed.label2}`;
  return {
    title,
    description: `Calculate the exact number of days between ${parsed.label1} and ${parsed.label2}.`,
    alternates: { canonical: `/days-between/${params.slug}` },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const parsed = parseBetweenSlug(params.slug);

  if (!parsed) {
    return (
      <main className="max-w-2xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-4">Invalid comparison</h1>
        <p className="text-neutral-600 mb-6">
          This URL format should look like: <span className="font-medium">month-day-and-month-day</span> (example:{" "}
          <span className="font-medium">january-1-and-december-31</span>).
        </p>
        <Link href="/days-between" className="text-indigo-600 hover:underline">
          Go to calculator
        </Link>
      </main>
    );
  }

  const { date1, date2, label1, label2 } = parsed;

  const diff = daysBetweenUTC(date1, date2);
  const abs = Math.abs(diff);
  const weeks = Math.floor(abs / 7);
  const days = abs % 7;

  const startISO = isoDateUTC(date1);
  const endISO = isoDateUTC(date2);

  return (
    <main className="max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Days between {label1} and {label2}</h1>

      <p className="text-3xl font-semibold mb-2">{abs} days</p>
      <p className="text-neutral-600 mb-8">
        That is about <span className="font-medium">{weeks}</span> weeks and <span className="font-medium">{days}</span>{" "}
        days.
      </p>

      {diff < 0 && (
        <p className="text-sm text-neutral-500 mb-8">
          Note: the end date is before the start date. The value above is shown as an absolute difference.
        </p>
      )}

      <div className="flex flex-wrap gap-4">
        <Link
          href={`/days-between?start=${startISO}&end=${endISO}`}
          className="text-indigo-600 hover:underline"
        >
          Open these dates in the calculator
        </Link>

        <Link href="/date-calculators" className="text-indigo-600 hover:underline">
          All date calculators
        </Link>
      </div>
    </main>
  );
}