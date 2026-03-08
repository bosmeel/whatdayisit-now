"use client";

import { useState } from "react";
import DateInput from "@/components/DateInput";

function calculateDaysBetween(start: Date, end: Date) {
  const diff = end.getTime() - start.getTime();
  return Math.round(diff / 86400000);
}

export default function DaysBetweenPage() {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function handleCalculate() {

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
  }

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

        <button
          onClick={handleCalculate}
          className="calculate-button"
        >
          Calculate
        </button>

        {result !== null && (
          <div className="result-box">
            <div className="result-number">{result}</div>
            <div className="result-label">days</div>
          </div>
        )}

      </div>

    </div>
  );
}