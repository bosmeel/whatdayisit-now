"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import DateRangeCalculator from "@/components/DateRangeCalculator";
import RelatedCalculators from "@/components/RelatedCalculators";

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
        title="Months Between Two Dates"
        description="Calculate the number of months between two dates."
      >

        <DateRangeCalculator
          unit="months"
          calculate={(start, end) => {

            const years = end.getUTCFullYear() - start.getUTCFullYear();
            const months = end.getUTCMonth() - start.getUTCMonth();

            return years * 12 + months;

          }}
        />

      </CalculatorLayout>

      <RelatedCalculators current="months-between" />

    </div>

  );

}