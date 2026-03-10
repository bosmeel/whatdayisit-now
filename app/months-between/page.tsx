"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";
import SeoLinks from "@/components/SeoLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default function MonthsBetweenPage() {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {

    if (!startDate || !endDate) {
      setResult(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    let months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    if (end.getDate() < start.getDate()) {
      months--;
    }

    if (!Number.isNaN(months)) {
      setResult(Math.abs(months));
    }

  }, [startDate, endDate]);

  return (
    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Months Between Dates" }
        ]}
      />

      <h1>Months Between Dates</h1>

      <p>
        Calculate the number of full months between two dates.
      </p>
<p>
  This calculator determines the number of complete months between two
  calendar dates. It can be helpful for tracking contract durations,
  financial periods, subscription timelines, and long-term planning.
</p>
      <div className="calculator">

        <DateInput
          label="Start date"
          value={startDate}
          onChange={setStartDate}
        />

        <DateInput
          label="End date"
          value={endDate}
          onChange={setEndDate}
        />

        {result !== null && (
          <div className="result-box">
            {result} months
          </div>
        )}

      </div>
<section style={{ marginTop: 40 }}>

  <h2>Related Date Calculators</h2>

  <ul style={{ lineHeight: 1.9 }}>
    <li><Link href="/days-between">Days Between Dates</Link></li>
    <li><Link href="/weeks-between">Weeks Between Dates</Link></li>
    <li><Link href="/years-between">Years Between Dates</Link></li>
    <li><Link href="/business-days-between">Business Days Between Dates</Link></li>
    <li><Link href="/age-calculator">Age Calculator</Link></li>
  </ul>

</section>
      <SeoLinks />

    </div>
  );
}