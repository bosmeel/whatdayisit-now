import ToolsNav from "../../components/ToolsNav";
import {
  getYearProgressPercent,
  getDayOfYear,
  getTotalDaysInYear,
  getDaysLeftInYear,
  getISOWeekNumber,
  getQuarter,
  getDaysUntilWeekend,
} from "../../lib/date";

export const metadata = {
  title: "How far through the year are we?",
  description:
    "See the current year progress percentage, plus day of year, week number and days left.",
};

export default function YearProgressPage() {
  const now = new Date();

  const progress = getYearProgressPercent(now);
  const dayOfYear = getDayOfYear(now);
  const totalDays = getTotalDaysInYear(now.getFullYear());
  const daysLeft = getDaysLeftInYear(now);
  const weekNumber = getISOWeekNumber(now);
  const quarter = getQuarter(now);
  const daysUntilWeekend = getDaysUntilWeekend(now);

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-sm text-neutral-500 mb-2">Year progress</p>
          <h1 className="text-5xl font-semibold mb-2">{progress}%</h1>

          <div className="mt-6">
            <div className="w-full bg-neutral-200 h-3 rounded-full">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-neutral-500">Day of year</p>
            <p className="text-lg font-medium">
              {dayOfYear} / {totalDays}
            </p>
          </div>
          <div>
            <p className="text-neutral-500">Days left this year</p>
            <p className="text-lg font-medium">{daysLeft}</p>
          </div>
          <div>
            <p className="text-neutral-500">Week number</p>
            <p className="text-lg font-medium">{weekNumber}</p>
          </div>
          <div>
            <p className="text-neutral-500">Quarter</p>
            <p className="text-lg font-medium">{quarter}</p>
          </div>
          <div>
            <p className="text-neutral-500">Days until weekend</p>
            <p className="text-lg font-medium">{daysUntilWeekend}</p>
          </div>
        </div>

        <div className="mt-10">
          <ToolsNav />
        </div>
      </div>
    </main>
  );
}