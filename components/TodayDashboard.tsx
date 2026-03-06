"use client";

import Link from "next/link";
import ToolsNav from "./ToolsNav";
import CreatureWidget from "./CreatureWidget";

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
  const progress = getYearProgressPercent(now);
  const quarter = getQuarter(now);
  const daysUntilWeekend = getDaysUntilWeekend(now);

  return (
    <main className="container">
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 14, color: "#666" }}>Today is</p>

        <h1 style={{ fontSize: 40, fontWeight: 800 }}>{dayName}</h1>

        <p style={{ color: "#666" }}>{fullDate}</p>
      </div>

      <div className="today-grid">
        <div className="today-card">
          <div>Week number</div>
          <strong>{weekNumber}</strong>
        </div>

        <div className="today-card">
          <div>Day of year</div>
          <strong>
            {dayOfYear} / {totalDays}
          </strong>
        </div>

        <div className="today-card">
          <div>Year progress</div>
          <strong>{progress}%</strong>
        </div>

        <div className="today-card">
          <div>Days left this year</div>
          <strong>{daysLeft}</strong>
        </div>

        <div className="today-card">
          <div>Days until weekend</div>
          <strong>{daysUntilWeekend}</strong>
        </div>

        <div className="today-card">
          <div>Quarter</div>
          <strong>{quarter}</strong>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div
          style={{
            width: "100%",
            height: 6,
            background: "#e5e7eb",
            borderRadius: 6,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: 6,
              background: "#6366f1",
              borderRadius: 6,
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <ToolsNav />
      </div>

      <div style={{ marginTop: 50 }}>
        <CreatureWidget isoDate={now.toISOString().slice(0, 10)} />
      </div>

      <div style={{ marginTop: 50 }}>
        <h2>Popular date calculators</h2>

        <div className="tool-grid">
          <Link className="tool-card" href="/days-between">
            Days between dates
          </Link>

          <Link className="tool-card" href="/days-until">
            Days until date
          </Link>

          <Link className="tool-card" href="/days-until-my-birthday">
            Days until my birthday
          </Link>

          <Link className="tool-card" href="/days-since">
            Days since date
          </Link>

          <Link className="tool-card" href="/day-of-year">
            Day of year
          </Link>

          <Link className="tool-card" href="/days-left-in-year">
            Days left in year
          </Link>

          <Link className="tool-card" href="/date-calculators">
            All calculators
          </Link>

          <Link className="tool-card" href="/born-on">
            Browse birthdays by date
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 50 }}>
        <h2>Explore dates</h2>

        <ul style={{ lineHeight: 1.8 }}>
          <li>
            <Link href="/born-on">Browse birthdays by date</Link>
          </li>

          <li>
            <Link href="/famous-birthdays">Famous birthdays by date</Link>
          </li>

          <li>
            <Link href="/what-happened-on">Historical events by date</Link>
          </li>

          <li>
            <Link href="/how-many-days-until/january-1">
              How many days until a date
            </Link>
          </li>
        </ul>
      </div>

      <div style={{ marginTop: 50 }}>
        <h2>Popular countdowns</h2>

        <ul style={{ lineHeight: 1.8 }}>
          <li>
            <Link href="/days-until/christmas">Days until Christmas</Link>
          </li>

          <li>
            <Link href="/days-until/new-year">Days until New Year</Link>
          </li>

          <li>
            <Link href="/days-until/halloween">Days until Halloween</Link>
          </li>

          <li>
            <Link href="/days-until/thanksgiving">Days until Thanksgiving</Link>
          </li>

          <li>
            <Link href="/days-until/valentines-day">
              Days until Valentine's Day
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}