"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DateInput from "@/components/DateInput";
import { DATE_PAIRS } from "@/lib/data/datePairs";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedCalculators from "@/components/RelatedCalculators";

/* More stable calculation (avoids timezone errors) */
function calculateDaysBetween(start: Date, end: Date) {

  const startUTC = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  const endUTC = Date.UTC(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );

  const diff = endUTC - startUTC;

  return Math.round(diff / 86400000);
}

export default function DaysBetweenPage() {

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

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      setResult(null);
      return;
    }

    const days = calculateDaysBetween(start, end);

    setResult(days);

  }, [startDate, endDate]);

  return (
    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Days Between Dates" }
        ]}
      />

      <h1>Days Between Two Dates</h1>

      <p>
        Calculate the exact number of calendar days between two dates.
      </p>

      <p>
        This date calculator helps determine the number of days separating
        two calendar dates. It is commonly used for project planning,
        travel preparation, deadline tracking, and comparing important
        events on the calendar.
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
            <div className="result-label">days</div>
          </div>
        )}

      </div>

      {/* HOW IT WORKS */}

      <section style={{ marginTop: 40 }}>

        <h2>How the Days Between Calculator Works</h2>

        <p>
          The days between dates calculator determines the total number of
          calendar days separating two dates. Simply enter a start date and
          an end date to instantly calculate the difference.
        </p>

        <p>
          The calculation automatically accounts for leap years and works
          for both past and future dates. This makes it useful for
          scheduling projects, calculating durations, or tracking time
          between milestones.
        </p>

      </section>

      {/* FAQ */}

      <section style={{ marginTop: 32 }}>

        <h2>Frequently Asked Questions</h2>

        <h3>Does the calculator include weekends?</h3>

        <p>
          Yes. The result includes all calendar days, including weekends
          and holidays. If you need to count only working days, use the
          business days calculator.
        </p>

        <h3>Can I calculate days between past dates?</h3>

        <p>
          Yes. The calculator works with any valid dates in the past or
          future.
        </p>

      </section>

      {/* POPULAR DATE PAIRS */}

      <section style={{ marginTop: 50 }}>

        <h2>Popular date comparisons</h2>

        <ul style={{ lineHeight: 1.9 }}>
          {DATE_PAIRS.slice(0, 20).map((pair) => (
            <li key={pair.slug}>
              <Link href={`/days-between/${pair.slug}`}>
                Days between {pair.label}
              </Link>
            </li>
          ))}
        </ul>

      </section>

      {/* RELATED TOOLS */}

      <section style={{ marginTop: 50 }}>

        <h2>Related Date Tools</h2>

        <div className="tool-grid">

          <Link href="/weeks-between" className="tool-card">
            Weeks Between Dates
          </Link>

          <Link href="/months-between" className="tool-card">
            Months Between Dates
          </Link>

          <Link href="/years-between" className="tool-card">
            Years Between Dates
          </Link>

          <Link href="/business-days-between" className="tool-card">
            Business Days Between Dates
          </Link>

          <Link href="/days-until" className="tool-card">
            Days Until Date
          </Link>

          <Link href="/days-since" className="tool-card">
            Days Since Date
          </Link>

        </div>

      </section>

      {/* RELATED CALCULATORS */}

      <RelatedCalculators current="days-between" />

       </div>
  );
}