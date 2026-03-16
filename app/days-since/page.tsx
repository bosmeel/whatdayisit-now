"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import SmartToolLinks from "@/components/SmartToolLinks";
import { parseDateUTC } from "@/lib/date";

export default function DaysSincePage() {

  const [date, setDate] = useState("");

  const result = useMemo(() => {

    if (!date) return null;

    const start = parseDateUTC(date);

    if (Number.isNaN(start.getTime())) return null;

    const now = new Date();

    const today = Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const diff = today - start.getTime();

    return Math.floor(diff / 86400000);

  }, [date]);

  return (

    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Days Since Date" }
        ]}
      />

      <h1>Days Since Date</h1>

      <p>
        Calculate how many days have passed since a specific date.
      </p>

      <div className="calculator">

        <div className="date-field">

          <label className="date-label">Start date</label>

          <input
            type="date"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
            className="date-input"
          />

        </div>

        {result !== null && (

          <div className="result-box">

            <div className="result-number">
              {result}
            </div>

            <div className="result-label">
              days
            </div>

          </div>

        )}

      </div>

      <SmartToolLinks />
      <RelatedTools />

    </div>

  );

}