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
  const quarter = getQuarter(now);
  const yearProgress = getYearProgressPercent(now);
  const weekend = getDaysUntilWeekend(now);

  return (
    <section className="container">
      <h1>What Day Is It Today?</h1>

      <p>
        Today is <strong>{dayName}</strong>, {fullDate}.
      </p>

      <div className="today-grid">
        <div className="today-card">
          <strong>Week number</strong>
          <div>Week {weekNumber}</div>
        </div>

        <div className="today-card">
          <strong>Day of the year</strong>
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
          <div>{quarter}</div>
        </div>
      </div>
    </section>
  );
}