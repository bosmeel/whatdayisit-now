"use client";

import { useState } from "react";
import DateInput from "@/components/DateInput";

export default function DaysSincePage() {

  const [date, setDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function calculate() {

    if (!date) return;

    const start = new Date(date);
    const now = new Date();

    const diff = now.getTime() - start.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    setResult(days);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">

      <h1 className="text-3xl font-bold mb-6">
        Days Since
      </h1>

      <p className="mb-6">
        Find out how many days have passed since a specific date.
      </p>

      <DateInput
        label="Start date"
        value={date}
        onChange={setDate}
      />

      <button
        onClick={calculate}
        style={{
          marginTop: 10,
          padding: "10px 16px",
          borderRadius: 6,
          border: "none",
          background: "#111",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Calculate
      </button>

      {result !== null && (
        <p style={{ marginTop: 20, fontWeight: 600 }}>
          {result} days
        </p>
      )}

    </main>
  );
}