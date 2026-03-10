"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";
import SeoLinks from "@/components/SeoLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default function DaysSincePage() {

  const [date, setDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {

    if (!date) {
      setResult(null);
      return;
    }

    const start = new Date(date);

    if (Number.isNaN(start.getTime())) {
      setResult(null);
      return;
    }

    const today = new Date();

    const diff = today.getTime() - start.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    setResult(days);

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
      <p>
  This calculator shows how many days have passed since a given date.
  It can be used to track milestones, anniversaries, project timelines,
  or the number of days since an important event.
</p>

      {result !== null && (
        <div className="result-box">
          <div className="result-number">{result}</div>
          <div className="result-label">days</div>
        </div>
      )}

      <div className="calculator">

        <DateInput
          label="Start date"
          value={date}
          onChange={setDate}
        />

      </div>
<section style={{ marginTop: 40 }}>

  <h2>Related Date Calculators</h2>

  <ul style={{ lineHeight: 1.9 }}>
    <li><Link href="/days-between">Days Between Dates</Link></li>
    <li><Link href="/days-until">Days Until Date</Link></li>
    <li><Link href="/weeks-between">Weeks Between Dates</Link></li>
    <li><Link href="/months-between">Months Between Dates</Link></li>
    <li><Link href="/years-between">Years Between Dates</Link></li>
  </ul>

</section>
      <SeoLinks />

    </div>
  );
}