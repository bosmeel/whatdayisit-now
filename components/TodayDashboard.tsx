"use client";

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
  const now = new Date();

  const weekNumber = getISOWeekNumber(now);
  const dayOfYear = getDayOfYear(now);
  const totalDays = getTotalDaysInYear(now.getFullYear());
  const daysLeft = getDaysLeftInYear(now);
  const quarter = getQuarter(now);
  const yearProgress = getYearProgressPercent(now);
  const weekend = getDaysUntilWeekend(now);

  return (
    <section className="container">
      <h2>Today’s Key Stats</h2>
      <p>Quick facts about today, this week, and the current year.</p>

      <div className="today-grid">
        <div className="today-card">
          <strong>Week number</strong>
          <div>Week {weekNumber}</div>
        </div>

        <div className="today-card">
          <strong>Day of year</strong>
          <div>
            {dayOfYear} / {totalDays}
          </div>
        </div>

        <div className="today-card">
          <strong>Days left in year</strong>
          <div>{daysLeft}</div>
        </div>

        <div className="today-card">
          <strong>Year progress</strong>
          <div>{yearProgress}%</div>
        </div>

        <div className="today-card">
          <strong>Days until weekend</strong>
          <div>{weekend}</div>
        </div>

        <div className="today-card">
          <strong>Quarter</strong>
          <div>Q{quarter}</div>
        </div>
      </div>
    </section>
  );
}