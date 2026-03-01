import Link from "next/link";
import { getISOWeekNumber } from "../../lib/date";

export const metadata = {
  title: "What week is it?",
  description:
    "Find out what week number it is right now. See the current ISO week number instantly.",
};

export default function WhatWeekIsItPage() {
  const now = new Date();
  const weekNumber = getISOWeekNumber(now);
  const year = now.getFullYear();

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-semibold mb-4">
          What week is it?
        </h1>

        <p className="text-xl mb-6">
          We are currently in <strong>week {weekNumber}</strong> of {year}.
        </p>

        <div className="prose max-w-none text-neutral-700">
          <p>
            The current week number is based on the ISO-8601 standard,
            which defines week 1 as the first week with a Thursday in the new year.
            This system is widely used in business, project planning and logistics.
          </p>

          <p>
            Knowing the week number helps with reporting, planning deadlines,
            and coordinating across teams.
          </p>

          <p>
            Check the{" "}
            <Link href="/" className="underline">
              main dashboard
            </Link>{" "}
            for full date details.
          </p>
        </div>

      </div>
    </main>
  );
}