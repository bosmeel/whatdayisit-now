import Link from "next/link";

export const dynamic = "force-dynamic";

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

function parseDatePart(text: string) {
  const parts = text.split("-");

  if (parts.length !== 2) return null;

  const month = monthMap[parts[0]];
  const day = Number(parts[1]);

  if (month === undefined || !day) return null;

  const year = new Date().getFullYear();

  return new Date(year, month, day);
}

function parseSlug(slug: string) {
  if (!slug) return null;

  const parts = slug.split("-and-");

  if (parts.length !== 2) return null;

  const d1 = parseDatePart(parts[0]);
  const d2 = parseDatePart(parts[1]);

  if (!d1 || !d2) return null;

  return { d1, d2 };
}

function daysBetween(a: Date, b: Date) {
  const MS = 86400000;
  return Math.round((b.getTime() - a.getTime()) / MS);
}

export default function Page({ params }: any) {

  const slug = params?.slug ?? "";

  const parsed = parseSlug(slug);

  if (!parsed) {
    return (
      <main className="max-w-2xl mx-auto py-12">

        <h1 className="text-3xl font-bold mb-6">
          Invalid comparison
        </h1>

        <Link
          href="/days-between"
          className="text-indigo-600"
        >
          Go to calculator
        </Link>

      </main>
    );
  }

  const { d1, d2 } = parsed;

  const days = daysBetween(d1, d2);

  const label1 = d1.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const label2 = d2.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <main className="max-w-2xl mx-auto py-12">

      <h1 className="text-4xl font-bold mb-6">
        Days between {label1} and {label2}
      </h1>

      <p className="text-3xl font-semibold mb-8">
        {days} days
      </p>

      <p className="text-neutral-600 mb-8">
        There are {days} days between {label1} and {label2}.
      </p>

      <Link
        href="/days-between"
        className="text-indigo-600"
      >
        Open calculator
      </Link>

    </main>
  );
}