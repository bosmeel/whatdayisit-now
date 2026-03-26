"use client";

import { useEffect, useState } from "react";
import {
  getDayOfYear,
  getTotalDaysInYear,
  getYearProgressPercent,
} from "@/lib/date";

export default function TodayHero() {
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

  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });

  const date = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayOfYear = getDayOfYear(now);
  const totalDays = getTotalDaysInYear(now.getFullYear());
  const progress = getYearProgressPercent(now);

  return (
    <section className="today-hero">
      {/* 🔥 H1 = vraag (SEO + UX) */}
      <h1 className="today-question">What day is it today?</h1>

      {/* 🔥 antwoord (visueel dominant) */}
      <div className="today-answer">
        <span className="today-weekday">{weekday}</span>, {date}
      </div>

      {/* 🔥 context (klein) */}
      <div className="today-meta">
        Day {dayOfYear} of {totalDays} • {progress}% of the year passed
      </div>
    </section>
  );
}
