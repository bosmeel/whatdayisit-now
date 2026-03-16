"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";
import { parseDateUTC } from "@/lib/date";

function calculateBusinessDays(start: Date, end: Date) {

  let count = 0;
  const current = new Date(start);

  while (current <= end) {

    const day = current.getUTCDay();

    if (day !== 0 && day !== 6) {
      count++;
    }

    current.setUTCDate(current.getUTCDate() + 1);
  }

  return count;
}

export default function BusinessDaysBetweenPage() {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const result = useMemo(() => {

    if (!startDate || !endDate) return null;

    const start = parseDateUTC(startDate);
    const end = parseDateUTC(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return null;
    }

    return Math.abs(calculateBusinessDays(start, end));

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

      <CalculatorLayout
        title="Business Days Between Dates"
        description="Calculate the number of working days between two dates, excluding weekends. Useful for project planning, delivery estimates, and work schedules."
      >

        <div className="date-field">
          <label className="date-label">Start date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
        </div>

        <div className="date-field">
          <label className="date-label">End date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
          />
        </div>

        {result !== null && (

          <div className="result-box">

            <div className="result-label">
              Business days between dates
            </div>

            <div className="result-number">
              {result}
            </div>

            <div className="result-sub">
              business days
            </div>

          </div>

        )}

      </CalculatorLayout>

      <section style={{ marginTop: 40 }}>

        <h2>Frequently Asked Questions</h2>

        <h3>Does this calculator include weekends?</h3>

        <p>
          No. The result excludes Saturdays and Sundays. Only standard working
          days (Monday through Friday) are counted.
        </p>

        <h3>Can I use past and future dates?</h3>

        <p>
          Yes. The calculator works with any valid dates in the past or future
          and measures the total number of business days between them.
        </p>

      </section>

      <SmartToolLinks />

      <RelatedTools />

    </div>
  );
}