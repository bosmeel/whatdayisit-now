"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DateInput from "@/components/DateInput";

function formatDate(dateString: string) {
  const d = new Date(dateString);

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function isValidIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export default function DaysBetweenPage() {
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const start = searchParams.get("start") ?? "";
    const end = searchParams.get("end") ?? "";

    if (isValidIsoDate(start)) {
      setStartDate(start);
    }

    if (isValidIsoDate(end)) {
      setEndDate(end);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!startDate || !endDate) {
      setResult(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      setResult(null);
      return;
    }

    const diff = end.getTime() - start.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    setResult(Math.abs(days));
  }, [startDate, endDate]);

  const startLabel = startDate ? formatDate(startDate) : "";
  const endLabel = endDate ? formatDate(endDate) : "";

  return (
    <div>
      <h1>Days Between Dates</h1>

      <p>Calculate the number of days between two dates.</p>

      {result !== null && (
        <>
          <div className="result-box">
            <div className="result-number">{result}</div>
            <div className="result-label">days</div>
          </div>

          <p className="seo-hidden">
            Days between {startLabel} and {endLabel}: {result} days.
          </p>
        </>
      )}

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
      </div>
    </div>
  );
}