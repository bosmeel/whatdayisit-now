"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import DateInput from "@/components/DateInput";
import { EVENTS } from "@/lib/events";
import SeoLinks from "@/components/SeoLinks";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function DaysUntilPage() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (!date) {
      setResult(null);
      return;
    }

    const target = new Date(date);

    if (Number.isNaN(target.getTime())) {
      setResult(null);
      return;
    }

    const today = new Date();
    const diff = target.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    setResult(days);
  }, [date]);

  const sortedEvents = useMemo(() => {
    return Object.entries(EVENTS).sort((a, b) =>
      a[1].name.localeCompare(b[1].name)
    );
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Days Until Date" }
        ]}
      />

      <h1 className="mb-4 text-3xl font-bold">Days Until Date</h1>

      <p className="mb-8 text-lg">
        Calculate how many days remain until a specific date, or browse popular
        countdowns below.
      </p>

      <section className="mb-12 rounded-2xl border p-6">
        <h2 className="mb-4 text-2xl font-semibold">Custom date countdown</h2>

        <div className="max-w-md">
          <DateInput label="Target date" value={date} onChange={setDate} />
        </div>

        {result !== null && (
          <div className="mt-6 rounded-2xl border p-6 text-center">
            <div className="text-4xl font-bold">{result}</div>
            <div className="mt-1 text-sm uppercase tracking-wide">days</div>
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Popular countdowns</h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "christmas",
            "new-year",
            "halloween",
            "thanksgiving",
            "valentines-day",
            "first-day-of-summer",
            "back-to-school",
            "super-bowl",
            "christmas-eve",
          ]
            .filter((slug) => EVENTS[slug])
            .map((slug) => (
              <Link
                key={slug}
                href={`/days-until/${slug}`}
                className="rounded-xl border p-4 transition hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <div className="font-medium">{EVENTS[slug].name}</div>
                <div className="mt-1 text-sm opacity-75">
                  {EVENTS[slug].month}/{EVENTS[slug].day}
                </div>
              </Link>
            ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">All event countdowns</h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedEvents.map(([slug, event]) => (
            <Link
              key={slug}
              href={`/days-until/${slug}`}
              className="rounded-xl border p-4 transition hover:bg-gray-50 dark:hover:bg-white/5"
            >
              <div className="font-medium">{event.name}</div>
              <div className="mt-1 text-sm opacity-75">
                {event.month}/{event.day}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SeoLinks />

    </main>
  );
}