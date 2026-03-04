import Link from "next/link";
import type { Metadata } from "next";
import { parseBetweenSlug } from "@/lib/parseDateSlug";
import { getDaysBetween } from "@/lib/dateDifference";

export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {

  const title = `Days between ${params.slug.replaceAll("-", " ")}`;

  return {
    title,
    description: "Calculate the number of days between two dates.",
    alternates: {
      canonical: `/days-between/${params.slug}`
    }
  };
}

export default function Page({ params }: { params: { slug: string } }) {

  const parsed = parseBetweenSlug(params.slug);

  if (!parsed) {
    return (
      <main className="max-w-2xl mx-auto py-12">

        <h1 className="text-3xl font-bold mb-6">
          Invalid comparison
        </h1>

        <p className="mb-6">
          Use the calculator instead.
        </p>

        <Link
          href="/days-between"
          className="text-indigo-600"
        >
          Go to days between calculator
        </Link>

      </main>
    );
  }

  const { date1, date2 } = parsed;

  const days = getDaysBetween(date1, date2);

  const label1 = date1.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const label2 = date2.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
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
        This calculator shows the exact number of days between {label1} and {label2}.
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