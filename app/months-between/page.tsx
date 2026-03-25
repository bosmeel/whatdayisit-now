"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import DateRangeCalculator from "@/components/DateRangeCalculator";
import CalculatorContent from "@/components/CalculatorContent";
import RelatedCalculators from "@/components/RelatedCalculators";

export default function MonthsBetweenPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Months Between Dates" },
        ]}
      />

      <CalculatorLayout
        title="Months Between Two Dates"
        description="Calculate the number of months between two dates. Useful for long-term planning, contracts, and tracking durations over time."
      >
        {/* 🔥 Intro */}
        <p className="mt-3 text-neutral-600 leading-relaxed">
          This calculator shows how many months exist between two dates. It is
          useful for long-term planning, financial calculations, contracts, and
          tracking durations that are better understood in months rather than
          days or weeks.
        </p>

        <DateRangeCalculator
          unit="months"
          calculate={(start, end) => {
            const years = end.getUTCFullYear() - start.getUTCFullYear();
            const months = end.getUTCMonth() - start.getUTCMonth();

            return years * 12 + months;
          }}
        />
      </CalculatorLayout>

      {/* 🔥 SEO + AdSense content */}
      <CalculatorContent type="between" />

      <section className="content-section">
        <h2>How months between dates are calculated</h2>

        <p>
          This calculator determines the number of full months between two dates
          by comparing the year and month values. It does not count partial
          months as full months.
        </p>

        <p>
          This approach provides a clear and practical way to understand longer
          time periods, especially for financial agreements, subscriptions, and
          long-term planning scenarios.
        </p>
      </section>

      <RelatedCalculators current="months-between" />
    </div>
  );
}
