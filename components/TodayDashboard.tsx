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

  const dayName = now.toLocaleDateString("en-US",{ weekday:"long" });

  const fullDate = now.toLocaleDateString("en-US",{
    year:"numeric",
    month:"long",
    day:"numeric",
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
          <div className="result-number">{weekNumber}</div>
          <div className="result-label">Week number</div>
        </div>

        <div className="today-card">
          <div className="result-number">{dayOfYear}</div>
          <div className="result-label">Day of year</div>
        </div>

        <div className="today-card">
          <div className="result-number">{daysLeft}</div>
          <div className="result-label">Days left in year</div>
        </div>

        <div className="today-card">
          <div className="result-number">{yearProgress}%</div>
          <div className="result-label">Year progress</div>
        </div>

        <div className="today-card">
          <div className="result-number">{weekend}</div>
          <div className="result-label">Days until weekend</div>
        </div>

        <div className="today-card">
          <div className="result-number">Q{quarter}</div>
          <div className="result-label">Quarter</div>
        </div>

      </div>

    </section>
  );
}