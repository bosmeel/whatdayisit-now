import Link from "next/link";

export const dynamic = "force-dynamic";

const months: Record<string, number> = {
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
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function parseDate(part: string) {

  const pieces = part.split("-");

  if (pieces.length !== 2) return null;

  const month = months[pieces[0]];

  const day = Number(pieces[1]);

  if (month === undefined || !day) return null;

  const year = new Date().getFullYear();

  return new Date(year, month, day);
}

function parseSlug(slug: any) {

  const text = Array.isArray(slug)
    ? slug.join("-")
    : slug;

  if (!text) return null;

  const parts = text.split("-and-");

  if (parts.length !== 2) return null;

  const date1 = parseDate(parts[0]);
  const date2 = parseDate(parts[1]);

  if (!date1 || !date2) return null;

  return { date1, date2 };
}

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export default function Page({ params }: any) {

  const parsed = parseSlug(params?.slug);

  if (!parsed) {
    return (
      <main className="max-w-2xl mx-auto py-12">

        <h1 className="text-4xl font-bold mb-6">
          Invalid comparison
        </h1>

        <p className="mb-6">
          Example: january-1-and-december-31
        </p>

        <Link href="/days-between" className="text-indigo-600">
          Go to calculator
        </Link>

      </main>
    );
  }

  const { date1, date2 } = parsed;

  const diff = daysBetween(date1, date2);

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

      <p className="text-3xl font-semibold mb-8">
        {diff} days
      </p>

      <p className="text-neutral-600 mb-8">
        There are {diff} days between {label1} and {label2}.
      </p>

      <Link href="/days-between" className="text-indigo-600">
        Open calculator
      </Link>

    </main>
  );
}