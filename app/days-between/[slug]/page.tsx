import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Params = {
  params: {
    slug: string;
  };
};

function parseSlug(slug: string) {

  const parts = slug.split("-and-");

  if (parts.length !== 2) return null;

  const normalize = (text: string) => {
    return text.replaceAll("-", " ");
  };

  const a = new Date(normalize(parts[0]));
  const b = new Date(normalize(parts[1]));

  if (isNaN(a.getTime()) || isNaN(b.getTime())) return null;

  return { date1: a, date2: b };
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
    alternates: {
      canonical: `/days-between/${params.slug}`,
    },
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

        <p className="mb-6">
          Please use the main calculator.
        </p>

        <Link href="/days-between" className="text-indigo-600">
          Go to calculator
        </Link>

      </main>
    );
  }

  const { date1, date2 } = parsed;

  const days = getDaysBetween(date1, date2);

  const label1 = date1.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const label2 = date2.toLocaleDateString("en-US", {
    year: "numeric",
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
        href={`/days-between?start=${date1.toISOString().slice(0,10)}&end=${date2.toISOString().slice(0,10)}`}
        className="text-indigo-600"
      >
        Open in calculator
      </Link>

    </main>
  );
}