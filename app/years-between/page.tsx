"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import DateRangeCalculator from "@/components/DateRangeCalculator";
import CalculatorContent from "@/components/CalculatorContent";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";

export default function YearsBetweenPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Years Between Dates" },
        ]}
      />

      <CalculatorLayout
        title="Years Between Dates"
        description="Calculate the number of full years between two dates. Useful for age differences, employment durations, contracts, and long-term timelines."
      >
        {/* 🔥 Intro */}
        <p className="mt-3 text-neutral-600 leading-relaxed">
          This calculator shows how many full years exist between two dates. It
          is commonly used for calculating age differences, employment
          durations, contracts, and long-term timelines where full years matter.
        </p>

        <DateRangeCalculator
          unit="years"
          calculate={(start, end) => {
            let years = end.getUTCFullYear() - start.getUTCFullYear();
            const monthDiff = end.getUTCMonth() - start.getUTCMonth();

            if (
              monthDiff < 0 ||
              (monthDiff === 0 && end.getUTCDate() < start.getUTCDate())
            ) {
              years--;
            }

            return Math.abs(years);
          }}
        />
      </CalculatorLayout>

      {/* 🔥 SEO + AdSense content */}
      <CalculatorContent type="between" />

      <section className="content-section">
        <h2>How years between dates are calculated</h2>

        <p>
          This calculator determines the number of full years between two dates.
          A year is only counted once the full year period has passed.
        </p>

        <p>
          This means partial years are not included in the result, making the
          calculation suitable for age differences, employment durations, and
          other long-term measurements.
        </p>
      </section>

      <section className="content-section">
        <h2>Frequently Asked Questions</h2>

        <h3>How accurate is this calculator?</h3>
        <p>
          The calculator uses standard calendar logic and accounts for leap
          years. UTC-based calculations ensure consistent results across time
          zones.
        </p>

        <h3>Can I use past and future dates?</h3>
        <p>
          Yes. The calculator works with both past and future dates and is
          suitable for planning, analysis, and historical comparisons.
        </p>
      </section>

      <SmartToolLinks />
      <RelatedTools />
    </div>
  );
}
