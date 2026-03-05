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

function normalizeSlug(slug: any): string {

  if (!slug) return "";

  if (Array.isArray(slug)) {
    return slug.join("-");
  }

  if (typeof slug === "string") {
    return slug;
  }

  return "";
}

function parseSlug(slugRaw: any) {

  const slug = normalizeSlug(slugRaw).toLowerCase();

  const parts = slug.split("-");

  const andIndex = parts.indexOf("and");

  if (andIndex === -1) return null;

  const month1 = parts[0];
  const day1 = Number(parts[1]);

  const month2 = parts[andIndex + 1];
  const day2 = Number(parts[andIndex + 2]);

  if (!(month1 in months)) return null;
  if (!(month2 in months)) return null;

  const year = new Date().getFullYear();

  const date1 = new Date(year, months[month1], day1);
  const date2 = new Date(year, months[month2], day2);

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