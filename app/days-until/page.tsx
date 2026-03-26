"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContent from "@/components/CalculatorContent";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";
import { parseDateUTC } from "@/lib/date";
import DateTextInput from "@/components/DateTextInput";

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
          <DateTextInput label="Target date" value={date} onChange={setDate} />

          {result !== null && (
            <div className="result-box">
              <div className="result-number">{result}</div>

              <div className="result-label">days remaining</div>
            </div>
          )}
        </div>
      </CalculatorLayout>

      <section className="content-section">
        <h2>Popular countdowns</h2>

        <ul className="content-list">
          <li>
            <a href="/days-until/christmas">Days until Christmas</a>
          </li>
          <li>
            <a href="/days-until/new-year">Days until New Year</a>
          </li>
          <li>
            <a href="/days-until/halloween">Days until Halloween</a>
          </li>
          <li>
            <a href="/days-until/valentines-day">Days until Valentine's Day</a>
          </li>
          <li>
            <a href="/days-until/black-friday">Days until Black Friday</a>
          </li>
        </ul>
      </section>

      {/* 🔥 Reusable SEO blocks */}
      <CalculatorContent type="until" />

      <SmartToolLinks />
      <RelatedTools />
    </div>
  );
}
