import { getDailyChallenge } from "../lib/dailyChallenge";
import ToolsNav from "../components/ToolsNav";
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
  title: "What day is it today?",
  description:
    "See today’s date, week number, day of year, year progress and days left in the year instantly.",
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

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-sm text-neutral-500 mb-2">Today is</p>
          <h1 className="text-5xl font-semibold mb-2">{dayName}</h1>
          <p className="text-lg text-neutral-600">{fullDate}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
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
          </div>

          <div>
            <p className="text-neutral-500">Days until weekend</p>
            <p className="text-lg font-medium">{daysUntilWeekend}</p>
          </div>

          <div>
            <p className="text-neutral-500">Quarter</p>
            <p className="text-lg font-medium">{quarter}</p>
          </div>
        </div>

        <div className="mt-10">
          <div className="w-full bg-neutral-200 h-3 rounded-full">
            <div
              className="bg-blue-600 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-6">
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">
            Today’s tiny challenge
          </p>
          <p className="text-sm text-neutral-700">{challenge}</p>
        </div>

        <div className="mt-10">
          <ToolsNav />
        </div>
      </div>
    </main>
  );
}