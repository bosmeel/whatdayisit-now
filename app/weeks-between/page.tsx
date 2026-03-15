"use client";

import { useMemo, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";
import { parseDateUTC } from "@/lib/date";

export default function WeeksBetweenPage() {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const result = useMemo(() => {

    if (!startDate || !endDate) return null;

    const start = parseDateUTC(startDate);
    const end = parseDateUTC(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return null;
    }

    const diffMs = Math.abs(end.getTime() - start.getTime());
    const days = Math.floor(diffMs / 86400000);
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;

    return {
      weeks,
      days,
      remainingDays,
    };

  }, [startDate, endDate]);

  return (

    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Weeks Between Dates" },
        ]}
      />

      <h1>Weeks Between Dates</h1>

      <p>
        Calculate how many full weeks lie between two dates.
      </p>

      <p>
        Enter a start date and an end date to see the number of weeks between
        them. This is useful for schedules, project planning, deadlines,
        vacations, and timeline calculations.
      </p>

      <div className="calculator">

        <div className="date-field">
          <label htmlFor="weeks-start-date" className="date-label">
            Start date
          </label>

          <input
            id="weeks-start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
        </div>

        <div className="date-field">
          <label htmlFor="weeks-end-date" className="date-label">
            End date
          </label>

          <input
            id="weeks-end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
          />
        </div>

        {startDate && endDate && result !== null && (

          <div className="result-box">

            <div className="result-label">
              Weeks between dates
            </div>

            <div className="result-number">
              {result.weeks}
            </div>

            <div className="result-sub">
              full weeks
            </div>

            <div className="result-note">
              {result.days} total days
              {result.remainingDays > 0 ? ` • ${result.remainingDays} extra day${result.remainingDays === 1 ? "" : "s"}` : ""}
            </div>

          </div>

        )}

      </div>

      <section style={{ marginTop: 40 }}>

        <h2>Frequently Asked Questions</h2>

        <h3>How is the result calculated?</h3>

        <p>
          The calculator measures the total number of days between the two
          dates and converts that difference into full weeks.
        </p>

        <h3>Does it count partial weeks?</h3>

        <p>
          The main result shows full weeks only. Extra leftover days are shown
          below the main result when applicable.
        </p>

        <h3>Can I compare past and future dates?</h3>

        <p>
          Yes. The calculator works with any valid two dates and shows the
          absolute difference between them.
        </p>

      </section>

      <SmartToolLinks />

      <RelatedTools />

    </div>

  );

}