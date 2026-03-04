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
  const progress = getYearProgressPercent(now