"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContent from "@/components/CalculatorContent";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";
import { parseDateUTC } from "@/lib/date";

export default function DaysSincePage() {
  const [date, setDate] = useState("");

  const result = useMemo(() => {
    if (!date) return null;

    const start = parseDateUTC(date);

    if (Number.isNaN(start.getTime())) return null;

    const now = new Date();

    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

    const diff = today - start.getTime();

    return Math.floor(diff / 86400000);
  }, [date]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Days Since Date" },
        ]}
      />

      <CalculatorLayout
        title="Days Since Date"
        description="Calculate how many days have passed since a specific date. Useful for tracking progress, milestones, and time elapsed."
      >
        {/* 🔥 Intro (AdSense + UX) */}
        <p className="mt-3 text-neutral-600 leading-relaxed">
          This calculator shows how many days have passed since a given date. It
          is useful for tracking progress, measuring time since an event, and
          understanding durations between past milestones.
        </p>

        {/* Calculator */}
        <div className="calculator">
          <div className="date-field">
            <label className="date-label">Start date</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="date-input"
            />
          </div>

          {result !== null && (
            <div className="result-box">
              <div className="result-number">{result}</div>

              <div className="result-label">days passed</div>
            </div>
          )}
        </div>
      </CalculatorLayout>

      {/* 🔥 Reusable SEO blocks */}
      <CalculatorContent type="since" />

      <SmartToolLinks />
      <RelatedTools />
    </div>
  );
}
