import Link from "next/link";

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

function parseSlug(slug: string | undefined) {

  if (!slug) return null;

  const parts = slug.split("-and-");

  if (parts.length !== 2) return null;

  const [a, b] = parts;

  const [m1, d1] = a.split("-");
  const [m2, d2] = b.split("-");

  const month1 = months[m1];
  const month2 = months[m2];

  if (month1 === undefined || month2 === undefined) return null;

  const year = new Date().getFullYear();

  const date1 = new Date(year, month1, Number(d1));
  const date2 = new Date(year, month2, Number(d2));

  return { date1, date2 };
}

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export default function Page({ params }: any) {

  const slug = params?.slug;

  const parsed = parseSlug(slug);

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

      <Link href="/days-between" className="text-indigo-600">
        Open calculator
      </Link>

    </main>
  );
}