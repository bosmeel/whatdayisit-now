"use client";

import {
  getISOWeekNumber,
  getDayOfYear,
  getTotalDaysInYear
} from "@/lib/date";

export default function StickyTimeBar() {

  const now = new Date();

  const week = getISOWeekNumber(now);
  const dayOfYear = getDayOfYear(now);
  const totalDays = getTotalDaysInYear(now.getFullYear());
  const daysLeft = totalDays - dayOfYear;

  return (
    <div className="time-bar">
      <div className="time-bar-inner">
        <span>
          <strong>Today</strong>
        </span>

        <span>
          Week {week}
        </span>

        <span>
          Day {dayOfYear}
        </span>

        <span>
          {daysLeft} days left in {now.getFullYear()}
        </span>
      </div>
    </div>
  );
}
