"use client";

import Link from "next/link";
import ToolsNav from "./ToolsNav";
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
  const now = new Date();

  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });

  const fullDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const weekNumber = getISOWeekNumber(now);
  const dayOfYear = getDayOfYear(now);
  const totalDays = getTotalDaysInYear(now.getFullYear());
  const daysLeft = getDaysLeftInYear(now);
  const progress = getYearProgressPercent(now);
  const quarter = getQuarter(now);
  const daysUntilWeekend = getDaysUntilWeekend(now);

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">

      <div className="max-w-3xl mx-auto">

        {/* Title */}
        <div className="mb-12">
          <p className="text-sm text-neutral-500 mb-2">Today is</p>
          <h1 className="text-5xl font-semibold mb-2">{dayName}</h1>
          <p className="text-lg text-neutral-600">{fullDate}</p>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="today-grid">

          <div className="today-card">
            <p className="text-neutral-500 text-sm">Week number</p>
            <p className="text-xl font-semibold">{weekNumber}</p>
          </div>

          <div className="today-card">
            <p className="text-neutral-500 text-sm">Day of year</p>
            <p className="text-xl font-semibold">
              {dayOfYear} / {totalDays}
            </p>
          </div>

          <div className="today-card">
            <p className="text-neutral-500 text-sm">Year progress</p>
            <p className="text-xl font-semibold">{progress}%</p>
          </div>

          <div className="today-card">
            <p className="text-neutral-500 text-sm">Days left this year</p>
            <p className="text-xl font-semibold">{daysLeft}</p>
          </div>

          <div className="today-card">
            <p className="text-neutral-500 text-sm">Days until weekend</p>
            <p className="text-xl font-semibold">{daysUntilWeekend}</p>
          </div>

          <div className="today-card">
            <p className="text-neutral-500 text-sm">Quarter</p>
            <p className="text-xl font-semibold">{quarter}</p>
          </div>

        </div>

        {/* Progress bar */}
        <div className="mt-10">
          <div className="w-full bg-neutral-200 h-3 rounded-full">
            <div
              className="bg-indigo-500 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Tools navigation */}
        <div className="mt-12">
          <ToolsNav />
        </div>

        {/* Popular calculators */}
        <div className="mt-12 border-t pt-8">

          <h2 className="text-xl font-semibold mb-4">
            Popular date calculators
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-indigo-600">

            <Link href="/days-between">Days between dates</Link>
            <Link href="/days-until">Days until date</Link>
            <Link href="/days-since">Days since date</Link>
            <Link href="/day-of-year">Day of year</Link>
            <Link href="/days-left-in-year">Days left in year</Link>
            <Link href="/date-calculators">All calculators</Link>

          </div>

        </div>

        {/* Popular countdowns */}
        <div className="mt-12 border-t pt-8">

          <h2 className="text-xl font-semibold mb-4">
            Popular countdowns
          </h2>

          <ul className="space-y-2 text-indigo-600">
            <li><Link href="/days-until/christmas">Days until Christmas</Link></li>
            <li><Link href="/days-until/new-year">Days until New Year</Link></li>
            <li><Link href="/days-until/halloween">Days until Halloween</Link></li>
            <li><Link href="/days-until/thanksgiving">Days until Thanksgiving</Link></li>
            <li><Link href="/days-until/valentines-day">Days until Valentine's Day</Link></li>
          </ul>

        </div>

      </div>

    </main>
  );
}