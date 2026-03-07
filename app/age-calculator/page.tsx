"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";

export default function AgeCalculatorPage() {

  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {

    if (!birthDate) {
      setResult(null);
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    if (!Number.isNaN(age)) {
      setResult(age);
    }

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

        {result !== null && (
          <div className="result-box">
            {result} years
          </div>
        )}

      </div>

    </div>
  );
}