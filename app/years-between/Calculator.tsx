"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getYearsBetween } from "@/lib/dateDifference";

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function Calculator() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    const s = searchParams.get("start");
    const e = searchParams.get("end");
    if (s) setStart(s);
    if (e) setEnd(e);
  }, [searchParams]);

  useEffect(() => {
    if (!start || !end) return;
    const params = new URLSearchParams();
    params.set("start", start);
    params.set("end", end);
    router.replace(`/years-between?${params.toString()}`);
  }, [start, end, router]);

  function setTodayToEndOfYear() {
    const today = todayISO();
    const year = new Date().getFullYear();
    const endOfYear = `${year}-12-31`;
    setStart(today);
    setEnd(endOfYear);
  }

  const result = start && end ? getYearsBetween(new Date(start), new Date(end)) : null;

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 420 }}>
      <label>
        Start date
        <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
      </label>
      <label>
        End date
        <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
      </label>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={setTodayToEndOfYear}>Today → End of year</button>
      </div>
      {result !== null && (
        <div>
          <h2 style={{ marginTop: 10 }}>{result} years</h2>
        </div>
      )}
    </div>
  );
}
