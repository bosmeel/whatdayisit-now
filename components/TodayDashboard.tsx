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

    function updateNow(){
      setNow(new Date());
    }

    updateNow();

    const interval = setInterval(updateNow,60000);

    return () => clearInterval(interval);

  },[]);

  if(!now) return null;

  const weekNumber = getISOWeekNumber(now);
  const dayOfYear = getDayOfYear(now);
  const totalDays = getTotalDaysInYear(now.getFullYear());
  const daysLeft = getDaysLeftInYear(now);
  const quarter = getQuarter(now);
  const yearProgress = getYearProgressPercent(now);
  const weekend = getDaysUntilWeekend(now);

  /* new data */

  const dayName = now.toLocaleDateString("en-US",{weekday:"long"});

  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth()+1,
    0
  ).getDate();

  const dayOfMonth = now.getDate();

  const daysLeftMonth = daysInMonth - dayOfMonth;

  const monthProgress = Math.round(
    (dayOfMonth / daysInMonth) * 100
  );

  return (

    <section>

      <div className="dashboard-header">

        <h2>Today’s Key Stats</h2>

        <p>
          Quick facts about today, this week, and the current year.
        </p>

      </div>

      <div className="today-grid">

        <div className="today-card">
          <strong>Day of week</strong>
          <div>{dayName}</div>
        </div>

        <div className="today-card">
          <strong>Week number</strong>
          <div>{weekNumber}</div>
        </div>

        <div className="today-card">
          <strong>Day of year</strong>
          <div>{dayOfYear} / {totalDays}</div>
        </div>

        <div className="today-card">
          <strong>Days left in year</strong>
          <div>{daysLeft}</div>
        </div>

        <div className="today-card">
          <strong>Year progress</strong>

          <div>{yearProgress}%</div>

          <div className="year-progress-bar">
            <div
              className="year-progress-fill"
              style={{width:`${yearProgress}%`}}
            />
          </div>

        </div>

        <div className="today-card">
          <strong>Quarter</strong>
          <div>{quarter}</div>
        </div>

        <div className="today-card">
          <strong>Days until weekend</strong>
          <div>{weekend}</div>
        </div>

        <div className="today-card">
          <strong>Days left in month</strong>
          <div>{daysLeftMonth}</div>
        </div>

        <div className="today-card">
          <strong>Month progress</strong>

          <div>{monthProgress}%</div>

          <div className="year-progress-bar">
            <div
              className="year-progress-fill"
              style={{width:`${monthProgress}%`}}
            />
          </div>

        </div>

      </div>

    </section>

  );

}