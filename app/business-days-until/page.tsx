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

export default function BusinessDaysUntilPage() {

  const [date, setDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {

    if (!date) {
      setResult(null);
      return;
    }

    const now = new Date();
    const today = new Date(Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ));

    const end = parseDateUTC(date);

    if (Number.isNaN(end.getTime())) {
      setResult(null);
      return;
    }

    const days = calculateBusinessDays(today, end);

    setResult(days);

  }, [date]);

  return (
    <div>

      <StickyTimeBar />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Business Days Until Date" }
        ]}
      />

      <h1>Business Days Until Date</h1>

      <p>
        Calculate how many working days remain until a specific date.
      </p>

      <p>
        This calculator counts the number of business days between today and a
        future date, excluding Saturdays and Sundays. It can help estimate
        delivery times, work deadlines, project schedules, and planning
        timelines based on working days.
      </p>

      <div className="calculator">

        <DateInput
          label="Target date"
          value={date}
          onChange={setDate}
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