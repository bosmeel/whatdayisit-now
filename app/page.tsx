import CreatureWidget from "../components/CreatureWidget";
import ToolsNav from "../components/ToolsNav";
import Link from "next/link";
import { getDailyChallenge } from "../lib/dailyChallenge";
import {
  getDayOfYear,
  getTotalDaysInYear,
  getISOWeekNumber,
  getQuarter,
  getDaysLeftInYear,
  getYearProgressPercent,
  getDaysUntilWeekend,
} from "../lib/date";

export const metadata = {
  title: "What day is it today? Live date dashboard",
  description:
    "Live date dashboard showing today's date, week number, day of year, year progress and countdown tools.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
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
  const challenge = getDailyChallenge(now);
  const isoDate = now.toISOString().slice(0, 10);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* HERO */}
        <div className="mb-14 text-center">
          <p className="text-sm tracking-wide text-neutral-500 uppercase">
            Live Calendar Dashboard
          </p>
          <h1 className="text-6xl font-semibold mt-2 mb-3">
            {dayName}
          </h1>
          <p className="text-lg text-neutral-600">
            {fullDate}
          </p>
        </div>

        {/* METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">

          <Card label="Week Number" value={weekNumber} />
          <Card label="Day of Year" value={`${dayOfYear} / ${totalDays}`} />
          <Card label="Year Progress" value={`${progress}%`} />
          <Card label="Days Left This Year" value={daysLeft} />
          <Card label="Days Until Weekend" value={daysUntilWeekend} />
          <Card label="Quarter" value={quarter} />

        </div>

        {/* PROGRESS BAR */}
        <div className="mb-14">
          <div className="w-full bg-neutral-200 h-3 rounded-full">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* CREATURE */}
        <div className="mb-14 text-center">
          <CreatureWidget isoDate={isoDate} />
        </div>

        {/* DAILY CHALLENGE */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-14">
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
            Today’s Tiny Challenge
          </p>
          <p className="text-neutral-700">{challenge}</p>
        </div>

        {/* NAVIGATION */}
        <div className="mb-16">
          <ToolsNav />
        </div>

        {/* POPULAR COUNTDOWNS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Popular Countdowns
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-indigo-600">
            <li><Link href="/days-until/christmas">Days until Christmas</Link></li>
            <li><Link href="/days-until/new-year">Days until New Year</Link></li>
            <li><Link href="/days-until/halloween">Days until Halloween</Link></li>
            <li><Link href="/days-until/thanksgiving">Days until Thanksgiving</Link></li>
            <li><Link href="/days-until/valentines-day">Days until Valentine's Day</Link></li>
            <li><Link href="/days-until/easter">Days until Easter</Link></li>
          </ul>
        </div>

      </div>
    </main>
  );
}

/* Reusable Card Component */
function Card({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <p className="text-sm text-neutral-500 mb-1">{label}</p>
      <p className="text-2xl font-semibold text-neutral-900">{value}</p>
    </div>
  );
}