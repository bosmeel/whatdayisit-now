"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";

export default function DaysUntilPage() {

  const [date, setDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {

    if (!date) {
      setResult(null);
      return;
    }

    const target = new Date(date);

    if (Number.isNaN(target.getTime())) {
      setResult(null);
      return;
    }

    const today = new Date();

    const diff = target.getTime() - today.getTime();

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    setResult(days);

  }, [date]);

  return (
    <div>

      <h1>Days Until Date</h1>

      <p>
        Calculate how many days remain until a specific date.
      </p>

      {result !== null && (
        <div className="result-box">
          <div className="result-number">{result}</div>
          <div className="result-label">days</div>
        </div>
      )}

      <div className="calculator">

        <DateInput label="Target date" value={date} onChange={setDate} />

      </div>

    </div>
  );
}