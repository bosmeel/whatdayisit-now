"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DateInput from "@/components/DateInput";
import { DATE_PAIRS } from "@/lib/data/datePairs";
import SeoLinks from "@/components/SeoLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import SiteLinks from "@/components/SiteLinks";
import RelatedCalculators from "@/components/RelatedCalculators";

function calculateDaysBetween(start: Date, end: Date) {
  const diff = end.getTime() - start.getTime();
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
        Calculate the number of days between two calendar dates.
      </p>

      <p>
        This calculator helps you find the exact number of days between two
        dates. It can be useful for project planning, travel, deadlines, and
        comparing important events on the calendar.
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

      {/* SEO cluster links */}

      <SeoLinks />

      {/* RELATED CALCULATORS */}

      <RelatedCalculators current="days-between" />

      {/* SITE HUB LINKS */}

      <SiteLinks />

    </div>
  );
}