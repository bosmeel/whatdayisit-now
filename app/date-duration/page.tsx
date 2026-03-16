"use client";

import { useMemo, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";
import { getDateDuration, parseDateUTC } from "@/lib/date";

export default function DateDurationPage() {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const result = useMemo(() => {

    if (!startDate || !endDate) return null;

    const start = parseDateUTC(startDate);
    const end = parseDateUTC(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return null;
    }

    return getDateDuration(start, end);

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

      <CalculatorLayout
        title="Date Duration Calculator"
        description="Calculate the exact time between two dates. The duration is shown in years, months, weeks, and total days."
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

        {result && (

          <div className="result-box">

            <div className="result-number">
              {result.years}y {result.months}m {result.days}d
            </div>

            <div className="result-label">
              Duration
            </div>

            <div className="result-note">
              {result.totalWeeks} weeks • {result.totalDays} days
            </div>

          </div>

        )}

      </CalculatorLayout>

      <section style={{ marginTop: 40 }}>

        <h2>Frequently Asked Questions</h2>

        <h3>How accurate is this calculator?</h3>

        <p>
          The calculator uses standard calendar calculations and accounts for
          leap years where applicable. Results are based on UTC date
          calculations to avoid timezone errors.
        </p>

        <h3>Can I use past and future dates?</h3>

        <p>
          Yes. The calculator works for both past and future dates and can be
          used for planning, scheduling, and analyzing historical timelines.
        </p>

      </section>

      <SmartToolLinks />

      <RelatedTools />

    </div>
  );
}