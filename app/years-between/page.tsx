"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";
import SeoLinks from "@/components/SeoLinks";

export default function YearsBetweenPage() {

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

    let years = end.getFullYear() - start.getFullYear();

    const monthDiff = end.getMonth() - start.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && end.getDate() < start.getDate())
    ) {
      years--;
    }

    if (!Number.isNaN(years)) {
      setResult(Math.abs(years));
    }

  }, [startDate, endDate]);

  return (
    <div>

      <h1>Years Between Dates</h1>

      <p>
        Calculate the number of full years between two dates.
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
            {result} years
          </div>
        )}

      </div>
<SeoLinks />
    </div>
  );
}