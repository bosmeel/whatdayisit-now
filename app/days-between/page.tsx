"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";

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

    const diff = end.getTime() - start.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    setResult(Math.abs(days));

  }, [startDate, endDate]);

  return (
    <div>

      <h1>Days Between Dates</h1>

      <p>
        Calculate the number of days between two dates.
      </p>

      {result !== null && (
        <div className="result-box">
          <div className="result-number">{result}</div>
          <div className="result-label">days</div>
        </div>
      )}

      <div className="calculator">

        <DateInput label="Start date" value={startDate} onChange={setStartDate} />
        <DateInput label="End date" value={endDate} onChange={setEndDate} />

      </div>

    </div>
  );
}