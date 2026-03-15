"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

    <section>

      <div className="dashboard-header">

        <h2>Today’s Key Stats</h2>

        <p>
          Quick facts about today, this week, and the current year.
        </p>

      </div>

      <div className="today-grid">

        <Link href="/weeks-between" className="today-card">
          <strong>Week number</strong>
          <div>{weekNumber}</div>
        </Link>

        <Link href={`/day-of-year`} className="today-card">
          <strong>Day of year</strong>
          <div>{dayOfYear} / {totalDays}</div>
        </Link>

        <Link href={`/how-many-days-left-in/${year}`} className="today-card">
          <strong>Days left in year</strong>
          <div>{daysLeft}</div>
        </Link>

        <Link href={`/year-progress`} className="today-card">

          <strong>Year progress</strong>

          <div>{yearProgress}%</div>

          <div className="year-progress-bar">
            <div
              className="year-progress-fill"
              style={{ width: `${yearProgress}%` }}
            />
          </div>

        </Link>

        <Link href="/days-until" className="today-card">
          <strong>Days until weekend</strong>
          <div>{weekend}</div>
        </Link>

        <Link href="/quarters-of-the-year" className="today-card">
          <strong>Quarter</strong>
          <div>{quarter}</div>
        </Link>

      </div>

    </section>

  );

}