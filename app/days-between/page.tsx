"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import DateRangeCalculator from "@/components/DateRangeCalculator";
import RelatedCalculators from "@/components/RelatedCalculators";
import { DATE_PAIRS } from "@/lib/data/datePairs";

export default function DaysBetweenPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Days Between Dates" },
        ]}
      />

      <CalculatorLayout
        title="Days Between Two Dates"
        description="Calculate the exact number of calendar days between two dates. Useful for planning, travel, deadlines, and comparing important events."
      >
        {/* 🔥 Intro (AdSense fix) */}
        <p className="mt-3 text-neutral-600 leading-relaxed">
          The days between dates calculator helps you quickly determine the
          exact number of days separating two specific dates. This is useful for
          planning trips, tracking project timelines, calculating durations, or
          comparing important life events.
        </p>

        <DateRangeCalculator
          unit="days"
          calculate={(start, end) => {
            const startUTC = Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate(),
            );

            const endUTC = Date.UTC(
              end.getUTCFullYear(),
              end.getUTCMonth(),
              end.getUTCDate(),
            );

            const diff = endUTC - startUTC;

            return Math.round(diff / 86400000);
          }}
        />
      </CalculatorLayout>

      {/* ===============================
          USE CASES (nieuw)
      =============================== */}

      <section className="content-section">
        <h2>Common use cases</h2>

        <ul className="content-list">
          <li>Planning trips, holidays, or events</li>
          <li>Tracking time between important life moments</li>
          <li>Managing deadlines and project timelines</li>
          <li>Comparing durations between two dates</li>
        </ul>
      </section>

      {/* ===============================
          HOW IT WORKS (uitgebreid)
      =============================== */}

      <section className="content-section">
        <h2>How the Days Between Calculator Works</h2>

        <p>
          This calculator determines the total number of calendar days between
          two dates. Simply enter a start date and an end date to instantly
          calculate the difference.
        </p>

        <p>
          The calculation is based on UTC date values, ensuring consistent
          results regardless of your time zone or location. This avoids common
          issues that can occur when local time differences are involved.
        </p>

        <p>
          The calculator automatically accounts for leap years, varying month
          lengths, and both past and future dates. This makes it reliable for a
          wide range of use cases, from simple planning to more complex date
          comparisons.
        </p>
      </section>

      {/* ===============================
          TRUST BLOCK (cruciaal)
      =============================== */}

      <section className="content-section">
        <h2>Accuracy and reliability</h2>

        <p>
          This tool uses standardized calendar calculations to ensure accurate
          and consistent results. It is designed to handle edge cases such as
          leap years and different month lengths automatically.
        </p>

        <p>
          The calculation method is based on widely accepted date arithmetic,
          making it suitable for both personal and professional use. Results are
          reliable across different devices and time zones.
        </p>
      </section>

      {/* ===============================
          FAQ (uitgebreid)
      =============================== */}

      <section className="content-section">
        <h2>Frequently Asked Questions</h2>

        <h3>Does the calculator include weekends and holidays?</h3>
        <p>
          Yes, the result includes all calendar days, including weekends and
          holidays. If you need to count only working days, you can use the
          business days calculator.
        </p>

        <h3>Can I calculate days between past dates?</h3>
        <p>
          Yes, the calculator works with any valid dates in the past or future.
          It can be used for historical comparisons as well as future planning.
        </p>

        <h3>Is the result always accurate?</h3>
        <p>
          Yes, the calculator uses reliable date calculations and accounts for
          leap years and calendar variations, ensuring accurate results in all
          standard cases.
        </p>
      </section>

      {/* ===============================
          POPULAR COMPARISONS
      =============================== */}

      <section className="content-section">
        <h2>Popular date comparisons</h2>

        <ul className="content-list">
          {DATE_PAIRS.slice(0, 20).map((pair) => (
            <li key={pair.slug}>
              <Link href={`/days-between/${pair.slug}`}>
                Days between {pair.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ===============================
          RELATED TOOLS
      =============================== */}

      <section className="content-section">
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

      <RelatedCalculators current="days-between" />
    </div>
  );
}
