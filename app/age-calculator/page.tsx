"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

function diffYMD(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days };
}

export default function Page() {
  const [birth, setBirth] = useState("");

  const result = useMemo(() => {
    if (!birth) return null;
    const b = new Date(birth);
    if (isNaN(b.getTime())) return null;
    const now = new Date();
    return diffYMD(b, now);
  }, [birth]);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>Age Calculator</h1>
      <p style={{ marginTop: 10, lineHeight: 1.6 }}>Enter a birth date to calculate age in years, months, and days.</p>

      <section style={{ marginTop: 30, maxWidth: 420, display: "grid", gap: 14 }}>
        <label>
          Birth date
          <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />
        </label>

        {result && (
          <div>
            <h2 style={{ marginTop: 10 }}>{result.years} years</h2>
            <p>
              {result.months} months and {result.days} days
            </p>
          </div>
        )}

        <p style={{ marginTop: 10 }}>
          <Link href="/date-calculators">All date calculators</Link>
        </p>
      </section>
    </main>
  );
}
