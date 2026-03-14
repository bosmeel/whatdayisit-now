"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import DateInput from "@/components/DateInput";
import { EVENTS } from "@/lib/events";
import SeoLinks from "@/components/SeoLinks";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";
import SiteLinks from "@/components/SiteLinks";

const monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export default function DaysUntilPage() {

  const [date, setDate] = useState("");

  /* read date from URL once */

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const urlDate = params.get("date");

    if (urlDate) {
      setDate(urlDate);
    }

  }, []);

  /* calculate result */

  const result = useMemo(() => {

    if (!date) return null;

    const target = new Date(date);

    if (Number.isNaN(target.getTime())) return null;

    const today = new Date();

    const diff = target.getTime() - today.getTime();

    return Math.ceil(diff / (1000 * 60 * 60 * 24));

  }, [date]);

  const sortedEvents = useMemo(() => {
    return Object.entries(EVENTS).sort((a, b) =>
      a[1].name.localeCompare(b[1].name)
    );
  }, []);

  const datePages = useMemo(() => {

    const pages: { slug: string; label: string }[] = [];

    monthNames.forEach((month, monthIndex) => {

      const daysInMonth =
        month === "february"
          ? 29
          : [3, 5, 8, 10].includes(monthIndex)
          ? 30
          : 31;

      for (let day = 1; day <= daysInMonth; day++) {

        pages.push({
          slug: `${month}-${day}`,
          label: `${month.charAt(0).toUpperCase() + month.slice(1)} ${day}`,
        });

      }

    });

    return pages;

  }, []);

  return (
    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators", href: "/" },
          { name: "Days Until Date" },
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

        <h2>Days Until Any Date</h2>

        <p>
          Browse countdown pages for every calendar date of the year.
        </p>

        <div className="tool-grid">

          {datePages.slice(0, 24).map((item) => (
            <Link
              key={item.slug}
              href={`/days-until-date/${item.slug}`}
              className="tool-card"
            >
              <strong>{item.label}</strong>
              <div>See how many days remain</div>
            </Link>
          ))}

        </div>

        <p style={{ marginTop: 20 }}>
          <Link href="/days-until-date/january-1">
            Start browsing all date countdowns
          </Link>
        </p>

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

      <SiteLinks />

    </div>
  );
}
