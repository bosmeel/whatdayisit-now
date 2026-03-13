"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import { getDateDuration } from "@/lib/date";

export default function DateDurationPage() {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [years, setYears] = useState<number | null>(null);
  const [months, setMonths] = useState<number | null>(null);
  const [days, setDays] = useState<number | null>(null);
  const [totalDays, setTotalDays] = useState<number | null>(null);
  const [totalWeeks, setTotalWeeks] = useState<number | null>(null);

  useEffect(() => {

    if (!startDate || !endDate) {
      setYears(null);
      setMonths(null);
      setDays(null);
      setTotalDays(null);
      setTotalWeeks(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return;

    const result = getDateDuration(start, end);

    setYears(result.years);
    setMonths(result.months);
    setDays(result.days);
    setTotalDays(result.totalDays);
    setTotalWeeks(result.totalWeeks);

  }, [startDate, endDate]);

  return (
    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Date Duration Calculator" }
        ]}
      />

      <h1>Date Duration Calculator</h1>

      <p>
        Calculate the exact time between two dates. This calculator shows the
        duration in years, months, weeks, and total days.
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

        {years !== null && (
          <div className="result-box">

            <div className="result-number">
              {years}y {months}m {days}d
            </div>

            <div className="result-label">
              Duration
            </div>

            <div style={{ marginTop: "10px", fontSize: "14px", color: "var(--muted)" }}>
              {totalWeeks} weeks<br />
              {totalDays} days
            </div>

          </div>
        )}

      </div>

      <RelatedTools />

    </div>
  );
}