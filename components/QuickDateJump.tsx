"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuickDateJump() {

  const [date, setDate] = useState("");
  const router = useRouter();

  function go(type: "days-until" | "days-since") {

    if (!date) return;

    if (type === "days-until") {
      router.push(`/days-until?target=${date}`);
    }

    if (type === "days-since") {
      router.push(`/days-since?start=${date}`);
    }

  }

  return (

    <div className="quick-date">

      <label className="quick-date-label">
        Jump to a date
      </label>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="quick-date-input"
      />

      <div className="quick-date-buttons">

        <button
          onClick={() => go("days-until")}
          disabled={!date}
        >
          Days Until
        </button>

        <button
          onClick={() => go("days-since")}
          disabled={!date}
        >
          Days Since
        </button>

      </div>

    </div>

  );

}