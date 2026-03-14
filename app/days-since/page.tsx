"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import StickyTimeBar from "@/components/StickyTimeBar";
import SmartToolLinks from "@/components/SmartToolLinks";
import { parseDateUTC } from "@/lib/date";

export default function DaysSincePage() {

  const [date, setDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {

    if (!date) {
      setResult(null);
      return;
    }

    const start = parseDateUTC(date);

    if (Number.isNaN(start.getTime())) {
      setResult(null);
      return;
    }

    const now = new Date();
    const today = new Date(Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ));

    const diff = today.getTime() - start.getTime();
    const days = Math.floor(diff / 86400000);

    setResult(days);

  }, [date]);

  return (
    <div>

      <StickyTimeBar />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Days Since Date" }
        ]}
      />

      <h1>Days Since Date</h1>

      <p>
        Calculate how many days have passed since a specific date.
      </p>

      <p>
        This calculator shows how many days have passed since a given date.
        It can be used to track milestones, anniversaries, project timelines,
        or the number of days since an important event.
      </p>

      <div className="calculator">

        <DateInput
          label="Start date"
          value={date}
          onChange={setDate}
        />

        {result !== null && (
          <div className="result-box">
            <div className="result-number">{result}</div>
            <div className="result-label">days</div>
          </div>
        )}

      </div>

      {/* SMART CALCULATOR LINKS */}

      <SmartToolLinks />

      {/* RELATED TOOLS */}

      <RelatedTools />

    </div>
  );
}