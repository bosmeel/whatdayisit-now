"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";
import { parseDateUTC } from "@/lib/date";

export default function YearsBetweenPage() {

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

    let years = end.getUTCFullYear() - start.getUTCFullYear();
    const monthDiff = end.getUTCMonth() - start.getUTCMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && end.getUTCDate() < start.getUTCDate())
    ) {
      years--;
    }

    setResult(Math.abs(years));

  }, [startDate, endDate]);

  return (
    <div>

     
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Years Between Dates" }
        ]}
      />

      <h1>Years Between Dates</h1>

      <p>
        Calculate the number of full years between two dates.
      </p>

      <p>
        This calculator determines the number of complete years between two
        calendar dates. It is useful for calculating age differences,
        employment durations, long-term contracts, and historical timelines.
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

            <div className="result-number">
              {result}
            </div>

            <div className="result-label">
              years
            </div>

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