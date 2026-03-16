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
          { name: "Days Between Dates" }
        ]}
      />

      <CalculatorLayout
        title="Days Between Two Dates"
        description="Calculate the exact number of calendar days between two dates. Useful for planning, travel, deadlines, and comparing important events."
      >

        <DateRangeCalculator
          unit="days"
          calculate={(start, end) => {

            const startUTC = Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            );

            const endUTC = Date.UTC(
              end.getUTCFullYear(),
              end.getUTCMonth(),
              end.getUTCDate()
            );

            const diff = endUTC - startUTC;

            return Math.round(diff / 86400000);

          }}
        />

      </CalculatorLayout>

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

      <RelatedCalculators current="days-between" />

    </div>

  );

}