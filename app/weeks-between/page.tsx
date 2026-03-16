"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";
import CalculatorLayout from "@/components/CalculatorLayout";
import DateRangeCalculator from "@/components/DateRangeCalculator";

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
        title="Weeks Between Dates"
        description="Enter two dates to calculate how many full weeks lie between them. Useful for schedules, planning, deadlines, travel, and timelines."
      >

        <DateRangeCalculator
          unit="weeks"
          calculate={(start, end) => {

            const diff = Math.abs(end.getTime() - start.getTime());
            const days = Math.floor(diff / 86400000);

            return Math.floor(days / 7);

          }}
        />

      </CalculatorLayout>

      <section style={{ marginTop: 40 }}>

        <h2>Frequently Asked Questions</h2>

        <h3>How is the result calculated?</h3>

        <p>
          The calculator measures the total number of days between the two
          dates and converts that difference into full weeks.
        </p>

        <h3>Does it count partial weeks?</h3>

        <p>
          The main result shows full weeks only. Extra leftover days are shown
          below the main result when applicable.
        </p>

        <h3>Can I compare past and future dates?</h3>

        <p>
          Yes. The calculator works with any valid two dates and shows the
          absolute difference between them.
        </p>

      </section>

      <SmartToolLinks />

      <RelatedTools />

    </div>

  );

}