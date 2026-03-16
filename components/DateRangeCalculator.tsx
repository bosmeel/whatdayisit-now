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

  return (

    <div className="calculator">

      {/* START DATE */}

      <div className="date-field">
        <label className="date-label">{labelStart}</label>

        <input
          type="text"
          inputMode="numeric"
          placeholder="YYYY-MM-DD"
          value={startDate}
          onChange={(e)=>setStartDate(e.target.value)}
          className="date-input"
        />
      </div>

      {/* QUICK BUTTONS */}

      <div className="date-quick">

        <button onClick={()=>{
          const d=new Date();
          setStartDate(d.toISOString().slice(0,10));
        }}>
          Today
        </button>

        <button onClick={()=>{
          const d=new Date();
          d.setDate(d.getDate()+7);
          setEndDate(d.toISOString().slice(0,10));
        }}>
          +7 days
        </button>

        <button onClick={()=>{
          const d=new Date();
          d.setDate(d.getDate()+30);
          setEndDate(d.toISOString().slice(0,10));
        }}>
          +30 days
        </button>

      </div>

      {/* END DATE */}

      <div className="date-field">
        <label className="date-label">{labelEnd}</label>

        <input
          type="text"
          inputMode="numeric"
          placeholder="YYYY-MM-DD"
          value={endDate}
          onChange={(e)=>setEndDate(e.target.value)}
          className="date-input"
        />
      </div>

      {/* RESULT */}

      {result !== null && (

        <div className="result-box">

          <div className="result-number">
            {result}
          </div>

          <div className="result-label">
            {unit}
          </div>

        </div>

      )}

    </div>

  );
}