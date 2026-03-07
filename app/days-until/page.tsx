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
    const today = new Date();

    const diff = target.getTime() - today.getTime();

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (!Number.isNaN(days)) {
      setResult(days);
    }

  }, [date]);

  return (
    <div>

      <h1>Days Until Date</h1>

      <p>
        Calculate how many days remain until a specific date.
      </p>

      <div className="calculator">

        <DateInput
          label="Target date"
          value={date}
          onChange={setDate}
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