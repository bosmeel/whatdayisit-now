"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";

export default function DaysUntilBirthdayPage() {

  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {

    if (!birthDate) {
      setResult(null);
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    const nextBirthday = new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );

    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diff = nextBirthday.getTime() - today.getTime();

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (!Number.isNaN(days)) {
      setResult(days);
    }

  }, [birthDate]);

  return (
    <div>

      <h1>Days Until My Birthday</h1>

      <p>
        Calculate how many days remain until your next birthday.
      </p>

      <div className="calculator">

        <DateInput
          label="Your birthday"
          value={birthDate}
          onChange={setBirthDate}
        />

        {result !== null && (
          <div className="result-box">
            {result} days
          </div>
        )}

      </div>

    </div>
  );
}