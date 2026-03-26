"use client";

import { useMemo, useState, useEffect } from "react";
import { parseDateUTC } from "@/lib/date";

type Props = {
  labelStart?: string;
  labelEnd?: string;
  unit: string;
  calculate: (start: Date, end: Date) => number;
};

export default function DateRangeCalculator({
  labelStart = "Start date",
  labelEnd = "End date",
  unit,
  calculate,
}: Props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [animate, setAnimate] = useState(false);

  const result = useMemo(() => {
    if (!startDate || !endDate) return null;

    const start = parseDateUTC(startDate);
    const end = parseDateUTC(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return null;
    }

    return calculate(start, end);
  }, [startDate, endDate, calculate]);

  // ✅ animation trigger (correcte plek, niet in useMemo)
  useEffect(() => {
    if (result !== null) {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 250);
      return () => clearTimeout(t);
    }
  }, [result]);

  return (
    <div className="calculator">
      <div className="date-field">
        <label className="date-label">{labelStart}</label>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="date-input"
        />
      </div>

      <div className="date-field">
        <label className="date-label">{labelEnd}</label>

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="date-input"
        />
      </div>

      {result !== null && (
        <div className={`result-box ${animate ? "result-animate" : ""}`}>
          <div className="result-number">{result}</div>

          <div className="result-label">{unit}</div>
        </div>
      )}
    </div>
  );
}
