import { Suspense } from "react";
import type { Metadata } from "next";
import DateCalculatorsLink from "@/components/DateCalculatorsLink";
import TodayTools from "@/components/TodayTools";
import RelatedDateTools from "@/components/RelatedDateTools";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Months Between Dates Calculator",
  description: "Calculate the number of months between two dates.",
  alternates: { canonical: "/months-between" },
};

export default function Page() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>Months Between Dates</h1>
      <p style={{ marginTop: 10, lineHeight: 1.6 }}>Calculate how many months are between two dates.</p>

      <TodayTools />

      <section style={{ marginTop: 30 }}>
        <Suspense f"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";

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

      <h1>Months Between Dates</h1>

      <p>
        Calculate the number of full months between two dates.
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

    </div>
  );
}allback={null}>
          <Calculator />
        </Suspense>
      </section>

      <RelatedDateTools />
      <DateCalculatorsLink />
    </main>
  );
}
