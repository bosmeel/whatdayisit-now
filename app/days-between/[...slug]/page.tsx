import Link from "next/link";
import type { Metadata } from "next";
import { EVENTS } from "@/lib/events";

export const dynamic = "force-dynamic";

type Parts = { y: number; m: number; d: number };

const MONTHS: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  sept: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toIso(p: Parts) {
  return `${p.y}-${pad2(p.m)}-${pad2(p.d)}`;
}

function isValidYMD(p: Parts) {
  if (p.m < 1 || p.m > 12) return false;
  if (p.d < 1 || p.d > 31) return false;

  // Validate by roundtrip
  const dt = new Date(Date.UTC(p.y, p.m - 1, p.d));
  return (
    dt.getUTCFullYear() === p.y &&
    dt.getUTCMonth() === p.m - 1 &&
    dt.getUTCDate() === p.d
  );
}

function daysBetweenUTC(a: Parts, b: Parts) {
  const ms = Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d);
  return Math.round(ms / 86400000);
}

function label(p: Parts) {
  const dt = new Date(Date.UTC(p.y, p.m - 1, p.d));
  return dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function normalizeSlug(slug: unknown): string {

  if (!slug) return "";

  if (Array.isArray(slug)) {

    const joined = slug.join("-");

    // split "january-1-and-december-31"
    if (joined.includes("and")) {
      return joined
        .replaceAll("-and-", "-and-")
        .toLowerCase();
    }

    return joined.toLowerCase();
  }

  if (typeof slug === "string") {
    return slug.toLowerCase();
  }

  return "";
}

function parseSide(raw: string, currentYear: number): Parts | null {
  const s = raw.trim().toLowerCase();

  // today
  if (s === "today") {
    const now = new Date();
    return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
  }

  // ISO date YYYY-MM-DD
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (iso) {
    const p = { y: Number(iso[1]), m: Number(iso[2]), d: Number(iso[3]) };
    return isValidYMD(p) ? p : null;
  }

  // Year only: 2020
  const yearOnly = /^(\d{4})$/.exec(s);
  if (yearOnly) {
    const y = Number(yearOnly[1]);
    const p = { y, m: 1, d: 1 };
    return isValidYMD(p) ? p : null;
  }

  // Known event slug in EVENTS
  if (EVENTS && EVENTS[s]) {
    const ev = EVENTS[s];
    const p = { y: currentYear, m: ev.month, d: ev.day };
    return isValidYMD(p) ? p : null;
  }

  // Month-day: january-1, jan-1, december-31, dec-31
  const md = /^([a-z]+)-(\d{1,2})$/.exec(s);
  if (md) {
    const monthKey = md[1];
    const day = Number(md[2]);
    const month = MONTHS[monthKey];
    if (!month) return null;
    const p = { y: currentYear, m: month, d: day };
    return isValidYMD(p) ? p : null;
  }

  return null;
}

function parseBetweenSlug(slug: unknown): { a: Parts; b: Parts } | null {
  const s = normalizeSlug(slug);
  if (!s) return null;

  // Split by "-and-" (single expected)
  const marker = "-and-";
  const idx = s.indexOf(marker);
  if (idx === -1) return null;

  const left = s.slice(0, idx);
  const right = s.slice(idx + marker.length);

  const year = new Date().getFullYear();
  const a = parseSide(left, year);
  const b = parseSide(right, year);
  if (!a || !b) return null;

  return { a, b };
}

export function generateMetadata({
  params,
}: {
  params: { slug: string[] | string };
}): Metadata {
  const slug = normalizeSlug(params.slug);
  const parsed = parseBetweenSlug(params.slug);

  const title = parsed
    ? `Days between ${label(parsed.a)} and ${label(parsed.b)}`
    : `Days between ${slug.replaceAll("-", " ")}`;

  return {
    title,
    description: "Calculate the number of days between two dates.",
    alternates: { canonical: `/days-between/${slug}` },
  };
}

export default function Page({
  params,
}: {
  params: { slug: string[] | string };
}) {
  const slug = normalizeSlug(params.slug);
  const parsed = parseBetweenSlug(params.slug);

  if (!parsed) {
    return (
      <main className="max-w-2xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-4">Invalid comparison</h1>
        <p className="text-neutral-600 mb-6">
          Example: <span className="font-medium">january-1-and-december-31</span>
        </p>

        <p className="text-neutral-600 mb-3">Supported formats:</p>
        <ul className="list-disc pl-6 text-neutral-600 mb-8 space-y-1">
          <li>january-1-and-december-31</li>
          <li>jan-1-and-dec-31</li>
          <li>today-and-christmas</li>
          <li>valentines-day-and-christmas</li>
          <li>2020-and-2025</li>
          <li>2026-01-01-and-2026-12-31</li>
        </ul>

        <Link href="/days-between" className="text-indigo-600 hover:underline">
          Go to calculator
        </Link>
      </main>
    );
  }

  const diff = daysBetweenUTC(parsed.a, parsed.b);
  const abs = Math.abs(diff);

  const aLabel = label(parsed.a);
  const bLabel = label(parsed.b);

  const startIso = toIso(parsed.a);
  const endIso = toIso(parsed.b);

  return (
    <main className="max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">
        Days between {aLabel} and {bLabel}
      </h1>

      <p className="text-3xl font-semibold mb-2">{abs} days</p>
      <p className="text-neutral-600 mb-8">
        {diff === 0
          ? "Both dates are the same."
          : diff > 0
          ? `${bLabel} is ${abs} days after ${aLabel}.`
          : `${bLabel} is ${abs} days before ${aLabel}.`}
      </p>

      <div className="flex flex-wrap gap-4">
        <Link
          href={`/days-between?start=${startIso}&end=${endIso}`}
          className="text-indigo-600 hover:underline"
        >
          Open in calculator
        </Link>
        <Link href="/days-between" className="text-indigo-600 hover:underline">
          Days between calculator
        </Link>
      </div>
    </main>
  );
}