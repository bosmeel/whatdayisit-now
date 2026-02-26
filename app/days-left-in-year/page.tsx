import ToolsNav from "../../components/ToolsNav";
import {
  getDaysLeftInYear,
  getTotalDaysInYear,
  getDayOfYear,
  getISOWeekNumber,
  getYearProgressPercent,
  getQuarter,
  getDaysUntilWeekend,
} from "../../lib/date";

export const metadata = {
  title: "How many days are left in the year?",
  description:
    "See how many days are left in the current year, plus day of year, week number and year progress.",
};

export default function DaysLeftInYearPage() {
  const now = new Date();

  const daysLeft = getDaysLeftInYear(now);
  const dayOfYear = getDayOfYear(now);
  const totalDays = getTotalDaysInYear(now.getFullYear());
  const weekNumber = getISOWeekNumber(now);
  const progress = getYearProgressPercent(now);
  const quarter = getQuarter(now);
  const daysUntilWeekend = getDaysUntilWeekend(now);

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-sm text-neutral-500 mb-2">Days left this year</p>
          <h1 className="text-5xl font-semibold mb-2">{daysLeft}</h1>
          <p className="text-lg text-neutral-600">
            Day {dayOfYear} of {totalDays} in {now.getFullYear()}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-neutral-500">Week number</p>
            <p className="text-lg font-medium">{weekNumber}</p>
          </div>
          <div>
            <p className="text-neutral-500">Year progress</p>
            <p className="text-lg font-medium">{progress}%</p>
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