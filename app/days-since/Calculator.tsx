"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getDaysBetween } from "@/lib/dateDifference";

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
  const [inclusive, setInclusive] = useState(false);

  useEffect(() => {
    const startParam = searchParams.get("date");
    const incParam = searchParams.get("inclusive");
    if (startParam) setStart(startParam);
    if (incParam === "1") setInclusive(true);
  }, [searchParams]);

  useEffect(() => {
    if (!start) return;
    const params = new URLSearchParams();
    params.set("date", start);
    if (inclusive) params.set("inclusive", "1");
    router.replace(`/days-since?${params.toString()}`);
  }, [start, inclusive, router]);

  const end = todayISO();
  const result = start ? getDaysBetween(new Date(start), new Date(end)) + (inclusive ? 1 : 0) : null;

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 420 }}>
      <label>
        Date
        <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
      </label>

      <label>
        <input type="checkbox" checked={inclusive} onChange={(e) => setInclusive(e.target.checked)} />
        Include both dates
      </label>

      {result !== null && (
        <div>
          <h2 style={{ marginTop: 10 }}>{result} days</h2>
          <p>Since {start} (to today)</p>
        </div>
      )}
    </div>
  );
}
