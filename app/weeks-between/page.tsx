"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import DateRangeCalculator from "@/components/DateRangeCalculator";
import CalculatorContent from "@/components/CalculatorContent";
import RelatedCalculators from "@/components/RelatedCalculators";

export default function WeeksBetweenPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Weeks Between Dates" },
        ]}
      />

      <CalculatorLayout
        title="Weeks Between Two Dates"
        description="Calculate the number of full weeks between two dates. Useful for planning timelines, schedules, and longer-term durations."
      >
        {/* 🔥 Intro */}
        <p className="mt-3 text-neutral-600 leading-relaxed">
          This calculator shows how many full weeks exist between two dates. It
          is useful for planning schedules, tracking durations over longer
          periods, and understanding time in weekly intervals rather than days.
        </p>

        <DateRangeCalculator
          unit="weeks"
          calculate={(start, end) => {
            const diff = end.getTime() - start.getTime();
            const days = diff / 86400000;

            return Math.floor(days / 7);
          }}
        />
      </CalculatorLayout>

      {/* 🔥 SEO + AdSense content */}
      <CalculatorContent type="between" />

      <section className="content-section">
        <h2>Understanding weeks between dates</h2>

        <p>
          This calculator counts full weeks between two dates. A full week
          consists of 7 consecutive days. Partial weeks are not included in the
          result.
        </p>

        <p>
          This makes it especially useful for planning schedules, tracking work
          periods, or understanding durations in a simplified, week-based
          format.
        </p>
      </section>

      <RelatedCalculators current="weeks-between" />
    </div>
  );
}
