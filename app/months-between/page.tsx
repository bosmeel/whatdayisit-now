"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import DateRangeCalculator from "@/components/DateRangeCalculator";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";

export default function MonthsBetweenPage() {

  return (
    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Months Between Dates" }
        ]}
      />

      <CalculatorLayout
        title="Months Between Dates"
        description="Calculate the number of full months between two dates. Useful for contracts, subscriptions, financial periods, and long-term planning."
      >

        <DateRangeCalculator
          unit="months"
          calculate={(start, end) => {

            let months =
              (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
              (end.getUTCMonth() - start.getUTCMonth());

            if (end.getUTCDate() < start.getUTCDate()) {
              months--;
            }

            return Math.abs(months);

          }}
        />

      </CalculatorLayout>

      <section style={{ marginTop: 40 }}>

        <h2>Frequently Asked Questions</h2>

        <h3>How accurate is this calculator?</h3>

        <p>
          The calculator uses standard calendar calculations and accounts for
          leap years where applicable. Results are based on UTC date
          calculations to avoid timezone errors.
        </p>

        <h3>Can I use past and future dates?</h3>

        <p>
          Yes. The calculator works for both past and future dates and can be
          used for planning, scheduling, and analyzing historical timelines.
        </p>

      </section>

      <SmartToolLinks />

      <RelatedTools />

    </div>
  );
}