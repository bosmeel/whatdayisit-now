"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";
import SeoLinks from "@/components/SeoLinks";

export default function BusinessDaysUntilPage() {

  const [date, setDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {

    if (!date) {
      setResult(null);
      return;
    }

    const start = new Date();
    const end = new Date(date);

    if (Number.isNaN(end.getTime())) {
      setResult(null);
      return;
    }

    let count = 0;
    const current = new Date(start);

    while (current <= end) {
      const day = current.getDay();

      if (day !== 0 && day !== 6) {
        count++;
      }

      current.setDate(current.getDate() + 1);
    }

    setResult(count);

  }, [date]);

  return (
    <div>

      <h1>Business Days Until Date</h1>

      {result !== null && (
        <div className="result-box">
          <div className="result-number">{result}</div>
          <div className="result-label">business days</div>
        </div>
      )}

      <div className="calculator">

        <DateInput
          label="Target date"
          value={date}
          onChange={setDate}
        />

      </div>

      <SeoLinks />

    </div>
  );
}