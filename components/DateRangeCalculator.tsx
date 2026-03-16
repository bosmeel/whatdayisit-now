"use client";

import { useMemo, useState } from "react";
import { parseDateUTC } from "@/lib/date";

type Props = {
  labelStart?: string;
  labelEnd?: string;
  unit: string;
  calculate: (start: Date, end: Date) => number;
};

function normalizeDate(value: string) {

  if (!value) return "";

  const parts = value.replace(/\//g,"-").split("-");

  if (parts.length !== 3) return value;

  const locale = typeof navigator !== "undefined" ? navigator.language : "en-US";

  if (locale.startsWith("en-US")) {

    const [m,d,y] = parts;

    if (y.length === 4) {
      return `${y}-${m.padStart(2,"0")}-${d.padStart(2,"0")}`;
    }

  } else {

    const [d,m,y] = parts;

    if (y.length === 4) {
      return `${y}-${m.padStart(2,"0")}-${d.padStart(2,"0")}`;
    }

  }

  return value;
}

export default function DateRangeCalculator({
  labelStart = "Start date",
  labelEnd = "End date",
  unit,
  calculate,
}: Props) {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const locale = typeof navigator !== "undefined" ? navigator.language : "en-US";
  const datePlaceholder = locale.startsWith("en-US") ? "MM-DD-YYYY" : "DD-MM-YYYY";

  const result = useMemo(() => {

    if (!startDate || !endDate) return null;

    const start = parseDateUTC(normalizeDate(startDate));
    const end = parseDateUTC(normalizeDate(endDate));

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return null;
    }

    return calculate(start,end);

  },[startDate,endDate,calculate]);

  return (

    <div className="calculator">

      <div className="date-field">

        <label className="date-label">{labelStart}</label>

        <input
          type="text"
          inputMode="numeric"
          placeholder={datePlaceholder}
          value={startDate}
          onChange={(e)=>setStartDate(e.target.value)}
          className="date-input"
        />

      </div>

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

      <div className="date-field">

        <label className="date-label">{labelEnd}</label>

        <input
          type="text"
          inputMode="numeric"
          placeholder={datePlaceholder}
          value={endDate}
          onChange={(e)=>setEndDate(e.target.value)}
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

        </div>

      )}

    </div>

  );

}