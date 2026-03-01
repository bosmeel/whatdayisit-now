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
  title: "What day is it today? Live date, week number & year progress",
  description:
    "Find out what day it is today. See the full date, week number, day of year, year progress and popular countdowns. Updated live.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "What day is it today?",
    description:
      "Live dashboard with today's date, week number, year progress and countdown tools.",
    url: "/",
    type: "website",
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
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <header className="mb-10">
          <p className="text-sm text-neutral-500 mb-2">Today is</p>
          <h1 className="text-5xl font-semibold mb-2">{dayName}</h1>
          <p className="text-lg text-neutral-600">{fullDate}</p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-neutral-500">Week number</p>
            <p className="text-lg font-medium">{weekNumber}</p>
          </div>

          <div>
            <p className="text-neutral-500">Day of year</p>
            <p className="text-lg font-medium">
              {dayOfYear} / {totalDays}
            </p>
          </div>

          <div>
            <p className="text-neutral-500">Year progress</p>
            <p className="text-lg font-medium">{progress}%</p>
          </div>

          <div>
            <p className="text-neutral-500">Days left this year</p>
            <p className="text-lg font-medium">{daysLeft}</p>

            <p className="text-sm mt-2">
              <Link
                href={`/how-many-days-left-in/${now.getFullYear()}`}
                className="underline"
              >
                View detailed year page
              </Link>
            </p>
          </div>

          <div>
            <p className="text-neutral-500">Days until weekend</p>
            <p className="text-lg font-medium">{daysUntilWeekend}</p>
          </div>

          <div>
            <p className="text-neutral-500">Quarter</p>
            <p className="text-lg font-medium">{quarter}</p>
          </div>
        </section>

        <div className="mt-10">
          <div className="w-full bg-neutral-200 h-3 rounded-full">
            <div
              className="bg-blue-600 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <CreatureWidget isoDate={isoDate} />

        <section className="mt-12 border-t border-neutral-200 pt-6">
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
            Today’s tiny challenge
          </p>
          <p className="text-sm text-neutral-700">{challenge}</p>
        </section>

        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">
            Popular countdowns
          </h2>

          <ul className="space-y-2 text-blue-600">
  {Object.entries(require("@/lib/events").EVENTS)
    .slice(0, 10)
    .map(([slug, event]: any) => (
      <li key={slug}>
        <Link href={`/days-until/${slug}`}>
          Days until {event.name}
        </Link>
      </li>
    ))}
</ul>
        </section>

        <section className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">
            Countdown tools
          </h2>

          <ul className="space-y-2 text-blue-600">
            <li>
              <Link href="/days-until" className="underline">
                Days until any event
              </Link>
            </li>
            <li>
              <Link href={`/how-many-days-left-in/${now.getFullYear()}`} className="underline">
                How many days are left this year?
              </Link>
            </li>
            <li>
              <Link href={`/how-many-weeks-left-in/${now.getFullYear()}`} className="underline">
                How many weeks are left this year?
              </Link>
            </li>
          </ul>
        </section>

        <div className="mt-10">
          <ToolsNav />
        </div>

      </div>
    </main>
  );
}