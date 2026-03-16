"use client";

import { useMemo, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import RelatedTools from "@/components/RelatedTools";
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

  const result = useMemo(() => {

    if (!date) return null;

    const now = new Date();
    const today = new Date(Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ));

    const end = parseDateUTC(date);

    if (Number.isNaN(end.getTime())) {
      return null;
    }

    return calculateBusinessDays(today, end);

  }, [date]);

  return (
    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Business Days Until Date" }
        ]}
      />

      <CalculatorLayout
        title="Business Days Until Date"
        description="Calculate how many working days remain until a specific date. Weekends (Saturday and Sunday) are automatically excluded."
      >

        <div className="date-field">
          <label className="date-label">Target date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-input"
          />
        </div>

        {result !== null && (

          <div className="result-box">

            <div className="result-label">
              Business days until date
            </div>

            <div className="result-number">
              {result}
            </div>

            <div className="result-sub">
              business days
            </div>

          </div>

        )}

      </CalculatorLayout>

      <section style={{ marginTop: 40 }}>

        <h2>Frequently Asked Questions</h2>

        <h3>Does this include weekends?</h3>

        <p>
          No. The result excludes Saturdays and Sundays and only counts
          standard working days (Monday through Friday).
        </p>

        <h3>Can I calculate past dates?</h3>

        <p>
          Yes. If you enter a past date the calculator will still show the
          number of business days between today and that date.
        </p>

      </section>

      <SmartToolLinks />

      <RelatedTools />

    </div>
  );
}