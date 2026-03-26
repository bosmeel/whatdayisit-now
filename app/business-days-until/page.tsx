"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContent from "@/components/CalculatorContent";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";
import { parseDateUTC } from "@/lib/date";
import DateTextInput from "@/components/DateTextInput";

function calculateBusinessDaysUntil(target: Date) {
  const now = new Date();

  let count = 0;

  const current = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
  );

  while (current < target) {
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

    const target = parseDateUTC(date);

    if (Number.isNaN(target.getTime())) return null;

    return calculateBusinessDaysUntil(target);
  }, [date]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Business Days Until Date" },
        ]}
      />

      <CalculatorLayout
        title="Business Days Until Date"
        description="Calculate how many working days remain until a specific date, excluding weekends."
      >
        <p className="mt-3 text-neutral-600 leading-relaxed">
          This calculator shows how many business days remain until a chosen
          date. Weekends (Saturday and Sunday) are excluded, making it useful
          for planning work schedules, delivery timelines, and project
          deadlines.
        </p>

        <div className="calculator">
          <DateTextInput label="Target date" value={date} onChange={setDate} />

          {result !== null && (
            <div className="result-box">
              <div className="result-number">{result}</div>

              <div className="result-label">business days remaining</div>
            </div>
          )}
        </div>
      </CalculatorLayout>

      <CalculatorContent type="until" />

      <section className="content-section">
        <h2>How business days are calculated</h2>

        <p>
          This calculator counts only weekdays (Monday through Friday) and
          excludes weekends. Public holidays are not automatically removed.
        </p>

        <p>
          This provides a realistic estimate for working time between today and
          a future date.
        </p>
      </section>

      <SmartToolLinks />
      <RelatedTools />
    </div>
  );
}
