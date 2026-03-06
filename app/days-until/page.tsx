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
    <main className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-semibold mb-6">
        Days Until Calculator
      </h1>

      <p className="mb-6">
        Enter a date to see how many days remain until that day.
      </p>

      <div className="border rounded-lg p-6 max-w-sm mb-10">

        <DateInput
          label="Target date"
          value={date}
          onChange={setDate}
        />

        <button
          onClick={calculate}
          style={{ backgroundColor: "#111" }}
          className="mt-3 px-4 py-2 rounded text-white"
        >
          Calculate
        </button>

        {result !== null && (
          <p className="mt-4 font-semibold">
            {result} days
          </p>
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
            className="border rounded-lg p-4 hover:bg-neutral-50"
          >
            Days until {event.name}
          </Link>
        ))}

      </div>

    </main>
  );
}