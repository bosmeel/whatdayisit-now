"use client";

import { useState } from "react";
import DateInput from "@/components/DateInput";

export default function Calculator() {

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [result, setResult] = useState<number | null>(null);

  function calculate() {

    if (!start || !end) return;

    const startDate = new Date(start);
    const endDate = new Date(end);

    const diff = endDate.getTime() - startDate.getTime();

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    setResult(days);
  }

  return (
    <div
      style={{
        marginTop: 20,
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
        maxWidth: 420
      }}
    >

      <DateInput
        label="Start date"
        value={start}
        onChange={setStart}
      />

      <DateInput
        label="End date"
        value={end}
        onChange={setEnd}
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
        <p style={{ marginTop: 16, fontWeight: 600 }}>
          {result} days
        </p>
      )}

    </div>
  );
}