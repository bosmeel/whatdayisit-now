"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";

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

      <h1>Age Calculator</h1>

      <p>
        Calculate someone's age based on their birth date.
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

            <div style={{marginTop:"8px",fontSize:"14px",color:"var(--muted)"}}>
              {months} months {days} days
            </div>
          </div>
        )}

      </div>

    </div>
  );
}