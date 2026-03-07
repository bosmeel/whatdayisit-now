"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";

export default function DaysSincePage() {

  const [date, setDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {

    if (!date) {
      setResult(null);
      return;
    }

    const start = new Date(date);
    const today = new Date();

    const diff = today.getTime() - start.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (!Number.isNaN(days)) {
      setResult(days);
    }

  }, [date]);

  return (
    <div>

      <h1>Days Since Date</h1>

      <p>
        Calculate how many days have passed since a specific date.
      </p>

      {result !== null && (
        <div className="result-box">
          <div className="result-number">{result}</div>
          <div className="result-label">days</div>
        </div>
      )}

      <div className="calculator">

        <DateInput
          label="Start date"
          value={date}
          onChange={setDate}
        />

      </div>

    </div>
  );
}