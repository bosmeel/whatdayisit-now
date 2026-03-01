export const dynamic = "force-dynamic";

import Link from "next/link";
import { getWeeksLeftInYear } from "@/lib/calculations";
import { buildYearMetadata } from "@/lib/metadata";
import { buildYearSchemas } from "@/lib/schema";

export const generateMetadata = buildYearMetadata({
  metricLabel: "weeks",
  basePath: "how-many-weeks-left-in",
});

export default async function WeeksLeftPage(
  { params }: { params: Promise<{ year: string }> }
) {
  const { year } = await params;
  const numericYear = Number(year);

  if (Number.isNaN(numericYear) || numericYear < 1900 || numericYear > 2100) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Invalid year.</p>
      </main>
    );
  }

  const weeksLeft = getWeeksLeftInYear(numericYear);

  const { faqSchema, breadcrumbSchema } = buildYearSchemas({
    metricLabel: "weeks",
    basePath: "how-many-weeks-left-in",
    year: numericYear,
    value: weeksLeft,
  });

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-neutral-500 mb-4">
          <Link href="/" className="underline">Home</Link>
          {" > "}
          <Link href="/how-many-weeks-left-in" className="underline">
            Weeks left
          </Link>
          {" > "}
          <span>{numericYear}</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-4">
          How many weeks are left in {numericYear}?
        </h1>

        <p className="text-xl mb-6">
          There are <strong>{weeksLeft}</strong> weeks left in {numericYear}.
        </p>

        <div className="prose max-w-none text-neutral-700">
          <p>
            This page automatically calculates how many weeks remain in{" "}
            {numericYear}. The number updates daily based on the current date.
          </p>

          <p>
            Knowing how many weeks are left in a year helps with planning
            projects, deadlines, and long-term goals.
          </p>
        </div>

        <div className="mt-8 text-sm text-neutral-600">
          <p className="mb-2 font-medium">Other years:</p>

          <div className="flex gap-4 flex-wrap">
            {numericYear > 1900 && (
              <Link
                href={`/how-many-weeks-left-in/${numericYear - 1}`}
                className="underline"
              >
                {numericYear - 1}
              </Link>
            )}

            {numericYear < 2100 && (
              <Link
                href={`/how-many-weeks-left-in/${numericYear + 1}`}
                className="underline"
              >
                {numericYear + 1}
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}