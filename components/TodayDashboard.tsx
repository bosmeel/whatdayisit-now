"use client";

import { useEffect, useState } from "react";
import {
  getDayOfYear,
  getTotalDaysInYear,
  getISOWeekNumber,
  getQuarter,
  getDaysLeftInYear,
  getYearProgressPercent,
  getDaysUntilWeekend,
} from "../lib/date";

export default function TodayDashboard() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    function updateNow() {
      setNow(new Date());
    }

    updateNow();

    const interval = setInterval(updateNow, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!now) return null;

  const year = now.getFullYear();

  const weekNumber = getISOWeekNumber(now);
  const dayOfYear = getDayOfYear(now);
  const totalDays = getTotalDaysInYear(year);
  const daysLeft = getDaysLeftInYear(now);
  const quarter = getQuarter(now);
  const yearProgress = getYearProgressPercent(now);
  const weekend = getDaysUntilWeekend(now);

  return (
    <section className="mt-10">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-neutral-900">
          Today’s Key Stats
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Quick facts about today, this week, and the current year.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

        {/* Week number */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm border-t-2 border-t-indigo-500 transition hover:shadow-md">
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-semibold text-neutral-900">
              {weekNumber}
            </div>
            <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Week number
            </div>
          </div>
        </div>

        {/* Day of year */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm border-t-2 border-t-indigo-500 transition hover:shadow-md">
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-semibold text-neutral-900">
              {dayOfYear} / {totalDays}
            </div>
            <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Day of year
            </div>
          </div>
        </div>

        {/* Days left */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm border-t-2 border-t-indigo-500 transition hover:shadow-md">
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-semibold text-neutral-900">
              {daysLeft}
            </div>
            <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Days left in year
            </div>
          </div>
        </div>

        {/* Year progress */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm border-t-2 border-t-indigo-500 transition hover:shadow-md">
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-semibold text-neutral-900">
              {yearProgress}%
            </div>
            <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Year progress
            </div>

            <div className="mt-3 h-2 w-full rounded-full bg-neutral-200">
              <div
                className="h-2 rounded-full bg-indigo-500"
                style={{ width: `${yearProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Weekend */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm border-t-2 border-t-indigo-500 transition hover:shadow-md">
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-semibold text-neutral-900">
              {weekend}
            </div>
            <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Days until weekend
            </div>
          </div>
        </div>

        {/* Quarter */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm border-t-2 border-t-indigo-500 transition hover:shadow-md">
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-semibold text-neutral-900">
              {quarter}
            </div>
            <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Quarter
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}