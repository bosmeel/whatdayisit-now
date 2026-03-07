"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";

function calculateBusinessDays(start: Date, end: Date) {
  let count = 0;

  const current = new Date(start);

  while (current <= end) {
    const day = current.getDay();

    if (day !== 0 && day !== 6) {
      count++;
    }

    current.setDate(current.getDate() + 1);
  }

  return count;
}

export default function BusinessDaysUntilPage() {

  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {

    if (!endDate) {
      setResult(null);
      return;
    }

    const today = new Date();
    const end = new Date(endDate);

    if (Number.isNaN(end.getTime())) {
      setResult(null);
      return;
    }

    const days = calculateBusinessDays(today, end);

    setResult(days);

  }, [endDate]);

  return (
    <div>

      <h1>Business Days Until Date</h1>

      <p>
        Calculate how many working days remain from today until a selected date.
        Weekends are automatically excluded.
      </p>

      <div className="calculator">

        <DateInput
          label="End date"
          value={endDate}
          onChange={setEndDate}
        />

        {result !== null && (
          <div className="result-box">
            <div className="result-number">{result}</div>
            <div className="result-label">business days</div>
          </div>
        )}

      </div>

    </div>
  );
}