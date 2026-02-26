import ToolsNav from "../../components/ToolsNav";
import {
  getISOWeekNumber,
  getDayOfYear,
  getTotalDaysInYear,
  getDaysLeftInYear,
  getYearProgressPercent,
  getQuarter,
  getDaysUntilWeekend,
} from "../../lib/date";

export const metadata = {
  title: "What week number is it?",
  description:
    "Find the current ISO week number instantly, including day of year, year progress and days left.",
};

export default function WeekNumberPage() {
  const now = new Date();

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

        <div className="mb-10">
          <p className="text-sm text-neutral-500 mb-2">
            Current ISO week number
          </p>
          <h1 className="text-5xl font-semibold mb-2">{weekNumber}</h1>
        </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          ...
        </div>

        <div className="mt-10">
          <ToolsNav />
        </div>

      </div>
    </main>
  );
}