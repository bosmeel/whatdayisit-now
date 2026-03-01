export const dynamic = "force-dynamic";

import Link from "next/link";
import { getDaysUntilDate } from "@/lib/calculations";

export default async function DaysUntilPage(
  { params }: { params: Promise<{ year: string; month: string; day: string }> }
) {
  const { year, month, day } = await params;

  const numericYear = Number(year);
  const numericMonth = Number(month);
  const numericDay = Number(day);

  if (
    Number.isNaN(numericYear) ||
    Number.isNaN(numericMonth) ||
    Number.isNaN(numericDay) ||
    numericMonth < 1 ||
    numericMonth > 12 ||
    numericDay < 1 ||
    numericDay > 31
  ) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Invalid date.</p>
      </main>
    );
  }

  const daysUntil = getDaysUntilDate(
    numericYear,
    numericMonth,
    numericDay
  );

  const dateObj = new Date(numericYear, numericMonth - 1, numericDay);

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-neutral-500 mb-4">
          <Link href="/" className="underline">Home</Link>
          {" > "}
          <span>Days until</span>
          {" > "}
          <span>{formattedDate}</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-4">
          How many days until {formattedDate}?
        </h1>

        <p className="text-xl mb-6">
          There are <strong>{daysUntil}</strong> days until {formattedDate}.
        </p>
      </div>
    </main>
  );
}