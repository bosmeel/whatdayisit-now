export const dynamic = "force-dynamic";

import Link from "next/link";
import { getDaysLeftInYear } from "@/lib/calculations";
import { buildYearMetadata } from "@/lib/metadata";
import { buildYearSchemas } from "@/lib/schema";

export const generateMetadata = buildYearMetadata({
  metricLabel: "days",
  basePath: "how-many-days-left-in",
});

export default async function DaysLeftPage(
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

  const daysLeft = getDaysLeftInYear(numericYear);

  const { faqSchema, breadcrumbSchema } = buildYearSchemas({
    metricLabel: "days",
    basePath: "how-many-days-left-in",
    year: numericYear,
    value: daysLeft,
  });

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-neutral-500 mb-4">
          <Link href="/" className="underline">Home</Link>
          {" > "}
          <span>Days left</span>
          {" > "}
          <span>{numericYear}</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-4">
          How many days are left in {numericYear}?
        </h1>

        <p className="text-xl mb-6">
          There are <strong>{daysLeft}</strong> days left in {numericYear}.
        </p>

        <div className="prose max-w-none text-neutral-700">
          <p>
            This page automatically calculates how many days remain
            in {numericYear}. The number updates daily based on the current date.
          </p>

          <p>
            Tracking the remaining days in a year can help with goal setting,
            project planning, budgeting, and personal milestones.
          </p>

          <p>
            Visit the{" "}
            <Link href="/" className="underline">
              main dashboard
            </Link>{" "}
            for full date information.
          </p>
        </div>

        {/* Expanded year linking */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3">Other years</h2>

          <div className="flex flex-wrap gap-3 text-sm text-blue-600">
            {Array.from({ length: 10 }).map((_, i) => {
              const year = numericYear - 5 + i;
              if (year < 1900 || year > 2100) return null;

              return (
                <Link
                  key={year}
                  href={`/how-many-days-left-in/${year}`}
                  className="underline hover:text-blue-800"
                >
                  {year}
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}