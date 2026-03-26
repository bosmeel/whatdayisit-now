"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContent from "@/components/CalculatorContent";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";
import { parseDateUTC } from "@/lib/date";
import DateTextInput from "@/components/DateTextInput";

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");

  const age = useMemo(() => {
    if (!birthDate) return null;

    const birth = parseDateUTC(birthDate);

    if (Number.isNaN(birth.getTime())) return null;

    const now = new Date();

    let years = now.getFullYear() - birth.getUTCFullYear();
    let months = now.getMonth() - birth.getUTCMonth();
    let days = now.getDate() - birth.getUTCDate();

    if (days < 0) {
      months--;

      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);

      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }, [birthDate]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Age Calculator" },
        ]}
      />

      <CalculatorLayout
        title="Age Calculator"
        description="Calculate exact age based on a birth date, including years, months, and days."
      >
        {/* 🔥 Intro */}
        <p className="mt-3 text-neutral-600 leading-relaxed">
          This age calculator helps you determine a person’s exact age based on
          their birth date. It calculates age in years, months, and days, making
          it useful for both personal and official purposes.
        </p>

        {/* Calculator */}
        <div className="calculator">
          <DateTextInput
            label="Birth date"
            value={birthDate}
            onChange={setBirthDate}
          />

          {age && (
            <div className="result-box">
              <div className="result-number">{age.years}</div>

              <div className="result-label">years</div>

              <div className="result-sub">
                {age.months} months {age.days} days
              </div>
            </div>
          )}
        </div>
      </CalculatorLayout>

      {/* 🔥 Reusable SEO blocks */}
      <CalculatorContent type="age" />

      <SmartToolLinks />
      <RelatedTools />
    </div>
  );
}
