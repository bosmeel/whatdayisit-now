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
};

function createDate(month: string, day: number) {
  if (!(month in months)) return null;
  if (!day || isNaN(day)) return null;

  const year = new Date().getFullYear();

  return new Date(year, months[month], day);
}

function parseSlug(slug: any) {

  if (!slug) return null;

  // Next sometimes passes array
  if (Array.isArray(slug)) {
    slug = slug.join("-");
  }

  if (typeof slug !== "string") return null;

  slug = slug.toLowerCase();

  // split at "-and-"
  const parts = slug.split("-and-");

  if (parts.length !== 2) return null;

  const first = parts[0].split("-");
  const second = parts[1].split("-");

  if (first.length < 2 || second.length < 2) return null;

  const m1 = first[0];
  const d1 = Number(first[1]);

  const m2 = second[0];
  const d2 = Number(second[1]);

  const date1 = createDate(m1, d1);
  const date2 = createDate(m2, d2);

  if (!date1 || !date2) return null;

  return { date1, date2 };
}

function daysBetween(a: Date, b: Date) {
  const MS = 86400000;
  return Math.round((b.getTime() - a.getTime()) / MS);
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
          The requested date comparison could not be parsed.
        </p>

        <Link
          href="/days-between"
          className="text-indigo-600"
        >
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

      <Link
        href="/days-between"
        className="text-indigo-600"
      >
        Open calculator
      </Link>

    </main>
  );
}