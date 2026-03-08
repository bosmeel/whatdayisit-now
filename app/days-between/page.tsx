"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DateInput from "@/components/DateInput";
import { DATE_PAIRS } from "@/lib/data/datePairs";

function calculateDaysBetween(start: Date, end: Date) {
  const diff = end.getTime() - start.getTime();
  return Math.round(diff / 86400000);
}

export default function DaysBetweenPage() {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {

    if (!startDate || !endDate) {
      setResult(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      setResult(null);
      return;
    }

    const days = calculateDaysBetween(start, end);

    setResult(days);

  }, [startDate, endDate]);

  return (
    <div>

      <h1>Days Between Two Dates</h1>

      <p>
        Calculate the number of days between two calendar dates.
      </p>

      <div className="calculator">

        <DateInput
          label="Start date"
          value={startDate}
          onChange={setStartDate}
        />

        <DateInput
          label="End date"
          value={endDate}
          onChange={setEndDate}
        />

        {result !== null && (
          <div className="result-box">
            <div className="result-number">{result}</div>
            <div className="result-label">days</div>
          </div>
        )}

      </div>

      <section style={{ marginTop: 50 }}>
        <h2>Popular date comparisons</h2>

        <ul style={{ lineHeight: 1.9 }}>
          {DATE_PAIRS.slice(0, 20).map((pair) => (
            <li key={pair.slug}>
              <Link href={`/days-between/${pair.slug}`}>
                Days between {pair.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}