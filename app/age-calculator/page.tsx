"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";
import { parseDateUTC } from "@/lib/date";

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

      const prevMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        0
      );

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
          { name: "Age Calculator" }
        ]}
      />

      <h1>Age Calculator</h1>

      <p>
        Calculate someone's exact age based on their birth date.
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

        {age && (

          <div className="result-box">

            <div className="result-number">
              {age.years}
            </div>

            <div className="result-label">
              years
            </div>

            <div className="result-sub">
              {age.months} months {age.days} days
            </div>

          </div>

        )}

      </div>

      <section style={{ marginTop: 40 }}>

        <h2>Frequently Asked Questions</h2>

        <h3>How accurate is this calculator?</h3>

        <p>
          The calculator uses standard calendar calculations and accounts for
          leap years where applicable.
        </p>

        <h3>Can I use past and future dates?</h3>

        <p>
          Yes. The calculator works for both past and future dates.
        </p>

      </section>

      <SmartToolLinks />
      <RelatedTools />

    </div>

  );

}