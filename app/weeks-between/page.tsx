"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";
import { parseDateUTC } from "@/lib/date";

export default function WeeksBetweenPage() {

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

    const diff = end.getTime() - start.getTime();
    const weeks = Math.floor(diff / (86400000 * 7));

    setResult(Math.abs(weeks));

  }, [startDate, endDate]);

  return (
    <div>

           <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Weeks Between Dates" }
        ]}
      />

      <h1>Weeks Between Dates</h1>

      <p>
        Calculate the number of weeks between two dates.
      </p>

      <p>
        This calculator helps you determine the number of full weeks between
        two calendar dates. It is useful for planning schedules, tracking
        project durations, and understanding time spans measured in weeks.
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
            <div className="result-label">weeks</div>
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