"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContent from "@/components/CalculatorContent";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";
import { parseDateUTC } from "@/lib/date";

export default function DaysUntilPage() {
  const [date, setDate] = useState("");

  const result = useMemo(() => {
    if (!date) return null;

    const target = parseDateUTC(date);

    if (Number.isNaN(target.getTime())) return null;

    const now = new Date();

    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

    const diff = target.getTime() - today;

    return Math.ceil(diff / 86400000);
  }, [date]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Days Until Date" },
        ]}
      />

      <CalculatorLayout
        title="Days Until Date"
        description="Calculate how many days remain until a specific date. Perfect for countdowns, planning events, and tracking important upcoming milestones."
      >
        {/* 🔥 Intro (AdSense + UX) */}
        <p className="mt-3 text-neutral-600 leading-relaxed">
          This countdown calculator shows exactly how many days are left until a
          chosen date. It is useful for planning events, tracking deadlines, and
          building anticipation for important moments such as holidays,
          birthdays, or milestones.
        </p>

        {/* Calculator */}
        <div className="calculator">
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
              <div className="result-number">{result}</div>

              <div className="result-label">days remaining</div>
            </div>
          )}
        </div>
      </CalculatorLayout>

      {/* 🔥 Reusable SEO blocks */}
      <CalculatorContent type="until" />

      <SmartToolLinks />
      <RelatedTools />
    </div>
  );
}
