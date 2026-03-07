"use client";

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
    <div>

      <h1>What Day Is It Today?</h1>

      <p>
        Today is <strong>{dayName}</strong>, {fullDate}.
      </p>

      <div className="today-grid">

        <div className="today-card">
          <strong>Day of the year</strong>
          <div>{dayOfYear} / {totalDays}</div>
        </div>

        <div className="today-card">
          <strong>Week number</strong>
          <div>Week {weekNumber}</div>
        </div>

        <div className="today-card">
          <strong>Quarter</strong>
          <div>Q{quarter}</div>
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

      </div>

      <h2>Popular date tools</h2>

      <div className="tool-grid">

        <Link className="tool-card" href="/days-between">
          Days Between Dates
        </Link>

        <Link className="tool-card" href="/days-since">
          Days Since Date
        </Link>

        <Link className="tool-card" href="/days-until">
          Days Until Date
        </Link>

        <Link className="tool-card" href="/weeks-between">
          Weeks Between Dates
        </Link>

        <Link className="tool-card" href="/months-between">
          Months Between Dates
        </Link>

        <Link className="tool-card" href="/years-between">
          Years Between Dates
        </Link>

        <Link className="tool-card" href="/age-calculator">
          Age Calculator
        </Link>

      </div>

    </div>
  );
}