"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";

export default function WeeksBetweenPage() {

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

    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));

    if (!Number.isNaN(weeks)) {
      setResult(Math.abs(weeks));
    }

  }, [startDate, endDate]);

  return (
    <div>

      <h1>Weeks Between Dates</h1>

      <p>
        Calculate the number of weeks between two dates.
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
            {result} weeks
          </div>
        )}

      </div>

    </div>
  );
}