export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import InternalDateLinks from "@/components/InternalDateLinks";

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

type Props = {
  params: Promise<{ date: string }>;
};

function parseDate(slug?: string) {

  if (!slug) return null;

  const parts = slug.split("-");
  if (parts.length !== 2) return null;

  const [monthSlug, dayStr] = parts;

  const monthIndex = months.findIndex((m) => m.name === monthSlug);
  if (monthIndex === -1) return null;

  const day = parseInt(dayStr, 10);

  if (Number.isNaN(day)) return null;
  if (day < 1 || day > months[monthIndex].days) return null;

  return { monthIndex, day, monthSlug };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { date } = await params;

  const parsed = parseDate(date);
  if (!parsed) return {};

  const monthName =
    parsed.monthSlug.charAt(0).toUpperCase() + parsed.monthSlug.slice(1);

  const label = `${monthName} ${parsed.day}`;

  return {
    title: `Days Until ${label}`,
    description: `See how many days remain until ${label}.`,
    alternates: {
      canonical: `https://whatdayisit.now/days-until-date/${date}`,
    },
  };
}

export default async function Page({ params }: Props) {

  const { date } = await params;

  const parsed = parseDate(date);
  if (!parsed) return notFound();

  const now = new Date();
  const year = now.getFullYear();

  let target = new Date(year, parsed.monthIndex, parsed.day);

  if (target < now) {
    target = new Date(year + 1, parsed.monthIndex, parsed.day);
  }

  const diff = target.getTime() - now.getTime();
  const days = Math.ceil(diff / 86400000);

  const monthName =
    parsed.monthSlug.charAt(0).toUpperCase() + parsed.monthSlug.slice(1);

  return (
    <main className="container">

      <h1>Days Until {monthName} {parsed.day}</h1>

      <div className="result-box">
        <div className="result-number">{days}</div>
        <div className="result-label">days</div>
      </div>

      <p style={{ marginTop: 20 }}>
        There are <strong>{days}</strong> days until {monthName} {parsed.day}.
      </p>

      <InternalDateLinks />

    </main>
  );
}