"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";
import Breadcrumbs from "@/components/Breadcrumbs";
import SeoLinks from "@/components/SeoLinks";
import RelatedTools from "@/components/RelatedTools";
import SiteLinks from "@/components/SiteLinks";

export default function AgeCalculatorPage() {

  const [birthDate, setBirthDate] = useState("");
  const [years, setYears] = useState<number | null>(null);
  const [months, setMonths] = useState<number | null>(null);
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {

    if (!birthDate) {
      setYears(null);
      setMonths(null);
      setDays(null);
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    if (Number.isNaN(birth.getTime())) return;

    let y = today.getFullYear() - birth.getFullYear();
    let m = today.getMonth() - birth.getMonth();
    let d = today.getDate() - birth.getDate();

    if (d < 0) {
      m--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      d += prevMonth.getDate();
    }

    if (m < 0) {
      y--;
      m += 12;
    }

    setYears(y);
    setMonths(m);
    setDays(d);

  }, [birthDate]);

  return (
    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Age Calculator" }
        ]}
      />

      <h1>Age Calculator</h1>

      <p>
        Calculate someone's exact age based on their birth date.
      </p>

      <p>
        This age calculator shows the precise age in years, months, and days.
        It can be used for personal records, official forms, age comparisons,
        or determining the exact time since a birth date.
      </p>

      <div className="calculator">

        <DateInput
          label="Birth date"
          value={birthDate}
          onChange={setBirthDate}
        />

        {years !== null && (
          <div className="result-box">
            <div className="result-number">{years}</div>
            <div className="result-label">years</div>

            <div style={{ marginTop: "8px", fontSize: "14px", color: "var(--muted)" }}>
              {months} months {days} days
            </div>
          </div>
        )}

      </div>

      <RelatedTools />

      <SeoLinks />
<SiteLinks />
    </div>
  );
}