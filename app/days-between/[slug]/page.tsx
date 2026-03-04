import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Params = {
  params: {
    slug: string;
  };
};

const monthMap: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function parseDatePart(text: string): Date | null {
  const parts = text.split("-");

  if (parts.length !== 2) return null;

  const monthName = parts[0];
  const day = Number(parts[1]);

  const month = monthMap[monthName];

  if (month === undefined || !day) return null;

  const year = new Date().getFullYear();

  return new Date(year, month, day);
}

function parseSlug(slug: string) {
  const parts = slug.split("-and-");

  if (parts.length !== 2) return null;

  const date1 = parseDatePart(parts[0]);
  const date2 = parseDatePart(parts[1]);

  if (!date1 || !date2) return null;

  return { date1, date2 };
}

function getDaysBetween(a: Date, b: Date) {
  const MS = 86400000;
  return Math.round((b.getTime() - a.getTime()) / MS);
}

export function generateMetadata({ params }: Params): Metadata {
  const readable = params.slug.replaceAll("-", " ");

  return {
    title: `Days between ${readable}`,
    description: `Calculate how many days are between ${readable}.`,
  };
}

export default function Page({ params }: Params) {
  const parsed = parseSlug(params.slug);

  if (!parsed) {
    return (
      <main className="max-w-2xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">
          Invalid date comparison
        </h1>

        <Link href="/days-between" className="text-indigo-600">
          Go to calculator
        </Link>
      </main>
    );
  }

  const { date1, date2 } = parsed;

  const days = getDaysBetween(date1, date2);

  const label1 = date1.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const label2 = date2.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <main className="max-w-2xl mx-auto py-12">

      <h1 className="text-4xl font-bold mb-6">
        Days between {label1} and {label2}
      </h1>

      <p className="text-3xl font-semibold mb-6">
        {days} days
      </p>

      <p className="text-neutral-600 mb-8">
        There are {days} days between {label1} and {label2}.
      </p>

      <Link
        href={`/days-between`}
        className="text-indigo-600"
      >
        Open calculator
      </Link>

    </main>
  );
}