"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import DateRangeCalculator from "@/components/DateRangeCalculator";
import RelatedCalculators from "@/components/RelatedCalculators";

export default function WeeksBetweenPage() {

  return (

    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Weeks Between Dates" }
        ]}
      />

      <CalculatorLayout
        title="Weeks Between Two Dates"
        description="Calculate the number of full weeks between two dates."
      >

        <DateRangeCalculator
          unit="weeks"
          calculate={(start, end) => {

            const diff = end.getTime() - start.getTime();

            const days = diff / 86400000;

            return Math.floor(days / 7);

          }}
        />

      </CalculatorLayout>

      <RelatedCalculators current="weeks-between" />

    </div>

  );

}