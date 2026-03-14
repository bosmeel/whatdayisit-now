"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import StickyTimeBar from "@/components/StickyTimeBar";
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
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {

    if (!startDate || !endDate) {
      setResult(null);
      return;
    }

    const start = parseDateUTC(startDate);
    const end = parseDateUTC(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      setResult(null);
      return;
    }

    const days = calculateBusinessDays(start, end);

    setResult(Math.abs(days));

  }, [startDate, endDate]);

  return (
    <div>

      <StickyTimeBar />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Business Days Between Dates" }
        ]}
      />

      <h1>Business Days Between Dates</h1>

      <p>
        Calculate the number of working days between two dates (excluding weekends).
      </p>

      <p>
        This calculator counts the number of business days between two dates,
        excluding Saturdays and Sundays. It is useful for planning work schedules,
        estimating delivery times, tracking project timelines, and measuring
        deadlines based on working days.
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
            <div className="result-number">{result}</div>
            <div className="result-label">business days</div>
          </div>
        )}

      </div>
<section style={{ marginTop: 40 }}>

  <h2>Frequently Asked Questions</h2>

  <h3>How accurate is this calculator?</h3>

  <p>
    The calculator uses standard calendar calculations and accounts for leap
    years where applicable. Results are based on UTC date calculations to
    avoid timezone errors.
  </p>

  <h3>Can I use past and future dates?</h3>

  <p>
    Yes. The calculator works for both past and future dates and can be used
    for planning, scheduling, and analyzing historical timelines.
  </p>

</section>
      {/* SMART CALCULATOR LINKS */}

      <SmartToolLinks />

      {/* RELATED TOOLS */}

      <RelatedTools />

    </div>
  );
}