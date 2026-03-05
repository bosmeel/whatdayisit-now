import Link from "next/link";
import { EVENTS } from "@/lib/events";

export const dynamic = "force-dynamic";

const months: Record<string, number> = {
  jan: 0, january: 0,
  feb: 1, february: 1,
  mar: 2, march: 2,
  apr: 3, april: 3,
  may: 4,
  jun: 5, june: 5,
  jul: 6, july: 6,
  aug: 7, august: 7,
  sep: 8, sept: 8, september: 8,
  oct: 9, october: 9,
  nov: 10, november: 10,
  dec: 11, december: 11,
};

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysBetween(a: Date, b: Date) {
  const MS = 86400000;
  const a0 = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const b0 = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return Math.round((b0 - a0) / MS);
}

function parseMonthDay(token: string, year: number): Date | null {
  // token: "january-1" or "jan-1" or "12-31"
  const parts = token.split("-").filter(Boolean);
  if (parts.length < 2) return null;

  // numeric month-day
  if (/^\d{1,2}$/.test(parts[0]) && /^\d{1,2}$/.test(parts[1])) {
    const m = Number(parts[0]);
    const d = Number(parts[1]);
    if (m < 1 || m > 12 || d < 1 || d > 31) return null;
    return new Date(year, m - 1, d);
  }

  const mKey = parts[0].toLowerCase();
  const m = months[mKey];
  const d = Number(parts[1]);
  if (m === undefined || !Number.isFinite(d) || d < 1 || d > 31) return null;

  return new Date(year, m, d);
}

function parseSide(raw: string, anchorYear: number): { date: Date; label: string } | null {
  const token = raw.toLowerCase().trim();

  // today
  if (token === "today") {
    const now = new Date();
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return { date: d, label: d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) };
  }

  // year only: "2024"
  if (/^\d{4}$/.test(token)) {
    const y = Number(token);
    const d = new Date(y, 0, 1);
    return { date: d, label: `January 1, ${y}` };
  }

  // event slug (christmas, valentines-day, etc.)
  const ev = EVENTS[token];
  if (ev) {
    const d = new Date(anchorYear, ev.month - 1, ev.day);
    return { date: d, label: ev.name };
  }

  // month-day (full/short/numeric)
  const md = parseMonthDay(token, anchorYear);
  if (md) {
    return { date: md, label: md.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) };
  }

  return null;
}

function parseBetweenSlug(slugAny: any) {

  // supports both string and array slug
  const slug = Array.isArray(slugAny) ? slugAny.join("-") : String(slugAny ?? "");
  const cleaned = slug.toLowerCase();

  if (!cleaned.includes("-and-")) return null;

  const [leftRaw, rightRaw] = cleaned.split("-and-");
  if (!leftRaw || !rightRaw) return null;

  // default year: current
  const baseYear = new Date().getFullYear();

  let left = parseSide(leftRaw, baseYear);
  let right = parseSide(rightRaw, baseYear);

  if (!left || !right) return null;

  // If one side is an explicit year (e.g. 2020) and the other isn't, keep them as parsed.
  // If one side is "today" and the other is an event/month-day, align year to current (already baseYear).

  return {
    date1: left.date,
    date2: right.date,
    label1: left.label,
    label2: right.label,
  };
}

export default function Page({ params }: any) {

  const parsed = parseBetweenSlug(params?.slug);

  if (!parsed) {
    return (
      <main className="max-w-2xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6">Invalid comparison</h1>
        <p className="text-neutral-600 mb-6">
          Supported formats:
          <br />• january-1-and-december-31
          <br />• jan-1-and-dec-31
          <br />• today-and-christmas
          <br />• valentines-day-and-christmas
          <br />• 2020-and-2025
        </p>
        <Link href="/days-between" className="text-indigo-600 hover:underline">
          Go to calculator
        </Link>
      </main>
    );
  }

  const { date1, date2, label1, label2 } = parsed;

  const diff = daysBetween(date1, date2);
  const abs = Math.abs(diff);
  const weeks = Math.floor(abs / 7);
  const remDays = abs % 7;

  return (
    <main className="max-w-2xl mx-auto py-12">

      <h1 className="text-4xl font-bold mb-6">
        Days between {label1} and {label2}
      </h1>

      <p className="text-3xl font-semibold mb-2">
        {abs} days
      </p>

      <p className="text-neutral-600 mb-8">
        About {weeks} weeks and {remDays} days.
      </p>

      <div className="flex gap-6 flex-wrap">
        <Link
          href={`/days-between?start=${toISO(date1)}&end=${toISO(date2)}`}
          className="text-indigo-600 hover:underline"
        >
          Open these dates in the calculator
        </Link>

        <Link href="/date-calculators" className="text-indigo-600 hover:underline">
          All calculators
        </Link>
      </div>

    </main>
  );
}