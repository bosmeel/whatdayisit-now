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

    const diff = end.getTime() - start.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (!Number.isNaN(days)) {
      setResult(Math.abs(days));
    }

  }, [startDate, endDate]);

  return (
    <div>

      <h1>Days Between Dates</h1>

      <p>
        Calculate the number of days between two dates.
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
            {result} days
          </div>
        )}

      </div>

    </div>
  );
}