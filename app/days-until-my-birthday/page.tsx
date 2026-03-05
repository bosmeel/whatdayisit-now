"use client";

import { useMemo, useState } from "react";

export const metadata = {
  title: "Days Until My Birthday",
  description: "Enter your birthdate to see how many days until your next birthday and your age in multiple formats.",
};

function toMidday(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, 0);
}

function parseFlexibleBirthdate(raw: string) {
  const v = raw.trim();
  if (!v) return null;

  let dd: number, mm: number, yyyy: number;

  if (/^\d{8}$/.test(v)) {
    dd = Number(v.slice(0, 2));
    mm = Number(v.slice(2, 4));
    yyyy = Number(v.slice(4, 8));
  } else {
    const parts = v.split(/[-/.]/);
    if (parts.length !== 3) return null;
    dd = Number(parts[0]);
    mm = Number(parts[1]);
    yyyy = Number(parts[2]);
  }

  if (!Number.isInteger(dd) || !Number.isInteger(mm) || !Number.isInteger(yyyy)) return null;
  if (yyyy < 1900 || yyyy > 2100) return null;
  if (mm < 1 || mm > 12) return null;

  const maxDay = new Date(yyyy, mm, 0).getDate();
  if (dd < 1 || dd > maxDay) return null;

  return { dd, mm, yyyy };
}

function daysUntilNextBirthday(b: { dd: number; mm: number; yyyy: number }) {
  const now = toMidday(new Date());
  const year = now.getFullYear();

  let next = new Date(year, b.mm - 1, b.dd, 12, 0, 0, 0);
  if (next.getTime() < now.getTime()) {
    next = new Date(year + 1, b.mm - 1, b.dd, 12, 0, 0, 0);
  }

  const diff = next.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function ageInDays(b: { dd: number; mm: number; yyyy: number }) {
  const birth = toMidday(new Date(b.yyyy, b.mm - 1, b.dd));
  const now = toMidday(new Date());
  const diff = now.getTime() - birth.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function ageYMD(b: { dd: number; mm: number; yyyy: number }) {
  const birth = new Date(b.yyyy, b.mm - 1, b.dd, 12, 0, 0, 0);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0);

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += prevMonthLastDay;
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days };
}

function weeksDays(totalDays: number) {
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  return { weeks, days };
}

function buildYearsMonthsWeeksDays(b: { dd: number; mm: number; yyyy: number }) {
  const { years, months } = ageYMD(b);

  const start = new Date(b.yyyy, b.mm - 1, b.dd, 12, 0, 0, 0);
  const afterYM = new Date(start);
  afterYM.setFullYear(afterYM.getFullYear() + years);
  afterYM.setMonth(afterYM.getMonth() + months);

  const now = toMidday(new Date());
  const diffDays = Math.floor((now.getTime() - afterYM.getTime()) / (1000 * 60 * 60 * 24));
  const { weeks, days } = weeksDays(Math.max(0, diffDays));

  return { years, months, weeks, days };
}

export default function Page() {
  const [birthdate, setBirthdate] = useState("");

  const result = useMemo(() => {
    const b = parseFlexibleBirthdate(birthdate);
    if (!b) return null;

    const until = daysUntilNextBirthday(b);
    const totalDays = ageInDays(b);

    const ymd = ageYMD(b);
    const totalMonths = ymd.years * 12 + ymd.months;

    const wdTotal = weeksDays(totalDays);
    const ymwd = buildYearsMonthsWeeksDays(b);

    return {
      until,
      years: ymwd.years,
      months: ymwd.months,
      weeks: ymwd.weeks,
      days: ymwd.days,
      totalDays,
      totalMonths,
      monthsDays: ymd.days,
      totalWeeks: wdTotal.weeks,
      weeksDays: wdTotal.days,
    };
  }, [birthdate]);

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1>Days Until My Birthday</h1>

      <p>Enter your birthdate (dd-mm-yyyy) or type numbers (ddmmyyyy):</p>

      <input
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        placeholder="e.g. 22-08-1964 or 22081964"
        inputMode="numeric"
        style={{ padding: 10, width: "100%", maxWidth: 360 }}
      />

      {birthdate.trim().length > 0 && !result && (
        <p style={{ marginTop: 14 }}>
          Invalid date. Examples: <strong>22-08-1964</strong> or <strong>22081964</strong>.
        </p>
      )}

      {result && (
        <div style={{ marginTop: 20 }}>
          <p>
            Days until your next birthday: <strong>{result.until}</strong>
          </p>

          <h2>Your age now</h2>

          <ul>
            <li>
              <strong>
                {result.years} years, {result.months} months, {result.weeks} weeks and {result.days} days
              </strong>
            </li>
            <li>
              <strong>{result.totalDays}</strong> days
            </li>
            <li>
              <strong>{result.totalMonths}</strong> months and <strong>{result.monthsDays}</strong> days
            </li>
            <li>
              <strong>{result.totalWeeks}</strong> weeks and <strong>{result.weeksDays}</strong> days
            </li>
          </ul>
        </div>
      )}
    </main>
  );
}