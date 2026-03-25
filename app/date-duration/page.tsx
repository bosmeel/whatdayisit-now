"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import DateRangeCalculator from "@/components/DateRangeCalculator";
import CalculatorContent from "@/components/CalculatorContent";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";

export default function DateDurationPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Date Duration" },
        ]}
      />

      <CalculatorLayout
        title="Date Duration Calculator"
        description="Calculate the full duration between two dates in days, weeks, months, or years."
      >
        <p className="mt-3 text-neutral-600 leading-relaxed">
          This calculator helps you determine the full duration between two
          dates. It can be used for planning, tracking timelines, and
          understanding how long a period lasts across multiple units of time.
        </p>

        <DateRangeCalculator
          unit="days"
          calculate={(start, end) => {
            const diff = end.getTime() - start.getTime();
            return Math.floor(diff / 86400000);
          }}
        />
      </CalculatorLayout>

      <CalculatorContent type="between" />

      <section className="content-section">
        <h2>Understanding date duration</h2>

        <p>
          Date duration represents the total time between two dates. This is
          typically measured in days, but can also be interpreted as weeks,
          months, or years depending on the context.
        </p>

        <p>
          This makes the calculator useful for scheduling, planning projects,
          and analyzing timelines across different periods.
        </p>
      </section>

      <SmartToolLinks />
      <RelatedTools />
    </div>
  );
}
