"use client";

import { useState } from "react";
import DateInput from "@/components/DateInput";

export default function AgeCalculatorPage() {

  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function calculate() {

    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    const diff = today.getTime() - birth.getTime();

    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    setResult(age);
  }

  return (
    <div>

      <h1>Age Calculator</h1>

      <p>
        Find out how old someone is based on their birth date.
      </p>

      <div className="calculator">

        <DateInput
          label="Birth date"
          value={birthDate}
          onChange={setBirthDate}
        />

        <button onClick={calculate}>
          Calculate
        </button>

        {result !== null && (
          <div className="result-box">
            {result} years
          </div>
        )}

      </div>

    </div>
  );
}