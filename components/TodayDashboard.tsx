"use client";

import { useEffect, useState } from "react";
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

    <section className="today-dashboard">

      <div className="dashboard-header">

        <h2>Today’s Key Stats</h2>

        <p>
          Quick facts about today, this week, and the current year.
        </p>

      </div>

      <div className="today-grid">

        <div className="today-card">
          <div className="today-label">Week number</div>
          <div className="today-value">{weekNumber}</div>
        </div>

        <div className="today-card">
          <div className="today-label">Day of year</div>
          <div className="today-value">{dayOfYear} / {totalDays}</div>
        </div>

        <div className="today-card">
          <div className="today-label">Days left in year</div>
          <div className="today-value">{daysLeft}</div>
        </div>

        <div className="today-card">

          <div className="today-label">Year progress</div>

          <div className="today-value">
            {yearProgress}%
          </div>

          <div className="year-progress-bar">
            <div
              className="year-progress-fill"
              style={{ width: `${yearProgress}%` }}
            />
          </div>

        </div>

        <div className="today-card">
          <div className="today-label">Days until weekend</div>
          <div className="today-value">{weekend}</div>
        </div>

        <div className="today-card">
          <div className="today-label">Quarter</div>
          <div className="today-value">{quarter}</div>
        </div>

      </div>

    </section>

  );

}