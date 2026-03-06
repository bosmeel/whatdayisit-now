"use client";

import { useState } from "react";
import Link from "next/link";
import DateInput from "@/components/DateInput";
import { EVENTS } from "@/lib/events";

export default function DaysUntilIndex() {

  const sortedEvents = Object.entries(EVENTS).sort((a, b) =>
    a[1].name.localeCompare(b[1].name)
  );

  const [date, setDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function calculate() {

    if (!date) return;

    const target = new Date(date);
    const now = new Date();

    const diff = target.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    setResult(days);
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-semibold mb-6">
          Days Until Calculator
        </h1>

        <p className="text-neutral-600 mb-6">
          Enter a date to see how many days are left until that day.
        </p>

        <div className="border rounded-lg p-6 max-w-sm mb-10">

          <DateInput
            label="Target date"
            value={date}
            onChange={setDate}
          />

          <button
  onClick={calculate}
  className="mt-3 rounded px-4 py-2 text-white"
  style={{ backgroundColor: "#111111" }}
>
  Calculate
</button>

          {result !== null && (
            <div className="mt-4">
              <p className="font-semibold">
                {result} days
              </p>

              {date && (
                <Link
                  href={`/days-until/${date}`}
                  className="text-blue-600 underline text-sm"
                >
                  View full countdown page
                </Link>
              )}
            </div>
          )}

        </div>

        <h2 className="text-2xl font-semibold mb-6">
          Popular countdowns
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          {sortedEvents.map(([slug, event]) => (
            <Link
              key={slug}
              href={`/days-until/${slug}`}
              className="border rounded-lg p-4 hover:bg-neutral-50 transition"
            >
              <p className="font-medium text-blue-600">
                Days until {event.name}
              </p>
            </Link>
          ))}

        </div>

        <div className="mt-12 prose max-w-none text-neutral-700">

          <h2>About this countdown tool</h2>

          <p>
            This calculator shows how many days remain until a specific
            date. It is useful for planning holidays, events, travel,
            celebrations, or other important milestones.
          </p>

          <p>
            You can also explore popular countdown pages above for major
            holidays and seasonal events. Each event page automatically
            calculates the time remaining until the next occurrence.
          </p>

        </div>

      </div>

    </main>
  );
}