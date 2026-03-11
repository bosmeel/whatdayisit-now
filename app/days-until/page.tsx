"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import DateInput from "@/components/DateInput";
import { EVENTS } from "@/lib/events";
import SeoLinks from "@/components/SeoLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";

export default function DaysUntilPage() {

  const [date, setDate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {

    if (!date) {
      setResult(null);
      return;
    }

    const target = new Date(date);

    if (Number.isNaN(target.getTime())) {
      setResult(null);
      return;
    }

    const today = new Date();
    const diff = target.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    setResult(days);

  }, [date]);

  const sortedEvents = useMemo(() => {
    return Object.entries(EVENTS).sort((a, b) =>
      a[1].name.localeCompare(b[1].name)
    );
  }, []);

  return (
    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Days Until Date" }
        ]}
      />

      <h1>Days Until Date</h1>

      <p>
        Calculate how many days remain until a specific date, or browse
        popular countdowns below.
      </p>

      <p>
        Use this countdown calculator to see how many days remain until a
        future date. It is commonly used for tracking holidays, birthdays,
        school events, travel plans, and other important deadlines.
      </p>

      <div className="calculator">

        <DateInput
          label="Target date"
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

      <section style={{ marginTop: 50 }}>

        <h2>Popular countdowns</h2>

        <div className="tool-grid">

          {[
            "christmas",
            "new-year",
            "halloween",
            "thanksgiving",
            "valentines-day",
            "first-day-of-summer",
            "back-to-school",
            "super-bowl",
            "christmas-eve",
          ]
            .filter((slug) => EVENTS[slug])
            .map((slug) => (

              <Link
                key={slug}
                href={`/days-until/${slug}`}
                className="tool-card"
              >

                <strong>{EVENTS[slug].name}</strong>

                <div>
                  {EVENTS[slug].month}/{EVENTS[slug].day}
                </div>

              </Link>

          ))}

        </div>

      </section>

      <section style={{ marginTop: 50 }}>

        <h2>All Event Countdowns</h2>

        <div className="tool-grid">

          {sortedEvents.map(([slug, event]) => (

            <Link
              key={slug}
              href={`/days-until/${slug}`}
              className="tool-card"
            >

              <strong>{event.name}</strong>

              <div>
                {event.month}/{event.day}
              </div>

            </Link>

          ))}

        </div>

      </section>

      <RelatedTools />

      <SeoLinks />

    </div>
  );
}