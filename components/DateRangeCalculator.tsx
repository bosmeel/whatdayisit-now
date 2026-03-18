"use client";

import { useMemo, useState } from "react";
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

  const result = useMemo(() => {

    if (!startDate || !endDate) return null;

    const start = parseDateUTC(startDate);
    const end = parseDateUTC(endDate);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return null;
    }

    return calculate(start, end);

  }, [startDate, endDate, calculate]);

  function handleReport() {
    const url = window.location.href;

    const message = encodeURIComponent(
      `Incorrect result on:\n${url}\n\nStart date: ${startDate}\nEnd date: ${endDate}\nResult: ${result} ${unit}\n\nDescribe the issue:`
    );

    const link = `/contact?type=wrong-calculation&message=${message}`;

    window.location.href = link;
  }

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

      <div className="date-quick">

        <button
          type="button"
          onClick={() => {
            const d = new Date();
            setStartDate(d.toISOString().slice(0, 10));
          }}
        >
          Today
        </button>

        <button
          type="button"
          onClick={() => {
            const d = new Date();
            d.setDate(d.getDate() + 7);
            setEndDate(d.toISOString().slice(0, 10));
          }}
        >
          +7 days
        </button>

        <button
          type="button"
          onClick={() => {
            const d = new Date();
            d.setDate(d.getDate() + 30);
            setEndDate(d.toISOString().slice(0, 10));
          }}
        >
          +30 days
        </button>

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

        <div className="result-box">

          <div className="result-number">
            {result}
          </div>

          <div className="result-label">
            {unit}
          </div>

          <button
            onClick={handleReport}
            className="text-sm text-red-600 underline mt-3 hover:text-red-800"
          >
            Report incorrect result
          </button>

        </div>

      )}

    </div>

  );

}