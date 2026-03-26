"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContent from "@/components/CalculatorContent";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";
import DateRangeCalculator from "@/components/DateRangeCalculator";

function calculateBusinessDays(start: Date, end: Date) {
  let count = 0;
  const current = new Date(start);

  while (current <= end) {
    const day = current.getUTCDay();

    if (day !== 0 && day !== 6) {
      count++;
    }

    current.setUTCDate(current.getUTCDate() + 1);
  }

  return count;
}

export default function BusinessDaysBetweenPage() {
  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Business Days Between Dates" },
        ]}
      />

      <CalculatorLayout
        title="Business Days Between Dates"
        description="Calculate the number of working days between two dates, excluding weekends. Useful for project planning, delivery estimates, and work schedules."
      >
        <p className="mt-3 text-neutral-600 leading-relaxed">
          This calculator shows the number of business days between two dates,
          excluding Saturdays and Sundays. It is useful for planning work
          schedules, estimating delivery times, and measuring project timelines
          in standard working days instead of total calendar days.
        </p>

        {/* 🔥 NIEUWE INPUT + LOGICA */}
        <DateRangeCalculator
          unit="business days"
          calculate={(start, end) =>
            Math.abs(calculateBusinessDays(start, end))
          }
        />
      </CalculatorLayout>

      <CalculatorContent type="between" />

      <section className="content-section">
        <h2>Business day rules</h2>

        <p>
          This calculator counts Monday through Friday as working days and
          excludes weekends. Public holidays are not removed automatically, so
          the result reflects standard business days only.
        </p>

        <p>
          For many planning and scheduling situations, this gives a practical
          estimate of working time between two dates.
        </p>
      </section>

      <section className="content-section">
        <h2>Frequently Asked Questions</h2>

        <h3>Does this calculator include weekends?</h3>
        <p>
          No. Saturdays and Sundays are excluded from the result. Only standard
          working days from Monday through Friday are counted.
        </p>

        <h3>Can I use past and future dates?</h3>
        <p>
          Yes. The calculator works with valid dates in both the past and the
          future and measures the number of business days between them.
        </p>

        <h3>Are holidays excluded?</h3>
        <p>
          No. This version excludes weekends only. Public holidays are not
          removed automatically.
        </p>
      </section>

      <SmartToolLinks />
      <RelatedTools />
    </div>
  );
}
