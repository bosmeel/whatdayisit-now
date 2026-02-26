import ToolsNav from "../../../components/ToolsNav";
import {
  getDayOfYear,
  getTotalDaysInYear,
  getISOWeekNumber,
  getQuarter,
  getDaysLeftInYear,
  getYearProgressPercent,
  getDaysUntilWeekend,
} from "../../../lib/date";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

function parseDate(slug: string): Date | null {
  const match = slug?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const [, year, month, day] = match;

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  if (date.getFullYear() !== Number(year)) return null;
  if (date.getMonth() !== Number(month) - 1) return null;
  if (date.getDate() !== Number(day)) return null;

  return date;
}

export default async function DatePage({ params }: Props) {
  const { slug } = await params;

  const date = parseDate(slug);
  if (!date) return notFound();

  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const weekNumber = getISOWeekNumber(date);
  const dayOfYear = getDayOfYear(date);
  const totalDays = getTotalDaysInYear(date.getFullYear());
  const daysLeft = getDaysLeftInYear(date);
  const progress = getYearProgressPercent(date);
  const quarter = getQuarter(date);
  const daysUntilWeekend = getDaysUntilWeekend(date);

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-sm text-neutral-500 mb-2">Date</p>
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
            <p className="text-neutral-500">Days left in that year</p>
            <p className="text-lg font-medium">{daysLeft}</p>
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