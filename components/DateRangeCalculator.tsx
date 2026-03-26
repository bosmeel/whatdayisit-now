"use client";

import { useMemo, useState, useEffect } from "react";
import { parseDateUTC } from "@/lib/date";
import DateTextInput from "@/components/DateTextInput";

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

  useEffect(() => {
    if (result !== null) {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 250);
      return () => clearTimeout(t);
    }
  }, [result]);

  return (
    <div className="calculator">
      <DateTextInput
        label={labelStart}
        value={startDate}
        onChange={setStartDate}
      />

      <DateTextInput label={labelEnd} value={endDate} onChange={setEndDate} />

      {result !== null && (
        <div className={`result-box ${animate ? "result-animate" : ""}`}>
          <div className="result-number">{result}</div>

          <div className="result-label">{unit}</div>
        </div>
      )}
    </div>
  );
}
