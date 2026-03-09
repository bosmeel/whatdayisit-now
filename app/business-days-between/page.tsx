"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";
import SeoLinks from "@/components/SeoLinks";
import Breadcrumbs from "@/components/Breadcrumbs";

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

export default function BusinessDaysBetweenPage() {

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

    const days = calculateBusinessDays(start, end);

    if (!Number.isNaN(days)) {
      setResult(Math.abs(days));
    }

  }, [startDate, endDate]);

  return (
    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Business Days Between Dates" }
        ]}
      />

      <h1>Business Days Between Dates</h1>

      <p>
        Calculate the number of working days between two dates
        (excluding weekends).
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
            {result} business days
          </div>
        )}

      </div>

      <SeoLinks />

    </div>
  );
}