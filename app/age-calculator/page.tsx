"use client";

import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";

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

        <div className="date-field">
  <label className="date-label">Birth date</label>

 <input
  type="date"
  value={birthDate}
  onChange={(e)=>setBirthDate(e.target.value)}
  className="date-input"
/>
</div>

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
<section style={{ marginTop: 40 }}>

  <h2>Frequently Asked Questions</h2>

  <h3>How accurate is this calculator?</h3>

  <p>
    The calculator uses standard calendar calculations and accounts for leap
    years where applicable. Results are based on UTC date calculations to
    avoid timezone errors.
  </p>

  <h3>Can I use past and future dates?</h3>

  <p>
    Yes. The calculator works for both past and future dates and can be used
    for planning, scheduling, and analyzing historical timelines.
  </p>

</section>
      {/* SMART CALCULATOR LINKS */}

      <SmartToolLinks />

      {/* RELATED TOOLS */}

      <RelatedTools />

    </div>
  );
}