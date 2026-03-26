"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import Script from "next/script";
import DateTextInput from "@/components/DateTextInput";
import { parseDateUTC } from "@/lib/date";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDateReadable(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function WhatDayWasIBornPage() {
  const [birthDate, setBirthDate] = useState("");
  const [weekday, setWeekday] = useState<string | null>(null);
  const [fullDate, setFullDate] = useState<string | null>(null);

  function calculate(dateStr: string) {
    setBirthDate(dateStr);

    if (!dateStr) return;

    const birth = parseDateUTC(dateStr);

    if (Number.isNaN(birth.getTime())) return;

    setWeekday(weekdays[birth.getUTCDay()]);
    setFullDate(formatDateReadable(birth));
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "What Day Was I Born",
    description: "Find out what day of the week you were born on.",
    applicationCategory: "CalculatorApplication",
    operatingSystem: "Web",
    url: "https://whatdayisit.now/what-day-was-i-born",
  };

  return (
    <div>
      <Script
        id="what-day-born-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "What Day Was I Born" }]}
      />

      <h1>What Day Was I Born?</h1>

      <p>
        Enter your birth date to find out what day of the week you were born.
        This tool instantly calculates your birth weekday and shows your full
        birth date in a readable format.
      </p>

      <div className="calculator">
        {/* 🔥 NIEUWE INPUT */}
        <DateTextInput
          label="Birth date"
          value={birthDate}
          onChange={calculate}
        />

        {weekday && fullDate && (
          <div className="result-box">
            <div className="result-number">{weekday}</div>

            <div className="result-sub">You were born on {fullDate}</div>
          </div>
        )}
      </div>

      {/* SEO SECTION */}

      <section className="content-section">
        <h2>How to find your birth weekday</h2>

        <p>
          Your birth weekday is determined by the calendar date on which you
          were born. Because calendars follow a repeating weekly cycle, every
          date corresponds to a specific day of the week.
        </p>

        <p>
          This calculator quickly determines your birth weekday and removes the
          need for manual calendar calculations.
        </p>
      </section>

      <section className="content-section">
        <h2>Related birthday tools</h2>

        <div className="tool-grid">
          <Link href="/birthday-weekday" className="tool-card">
            <strong>Birthday Weekday</strong>
            <div>Find your next birthday weekday</div>
          </Link>

          <Link href="/age-calculator" className="tool-card">
            <strong>Age Calculator</strong>
            <div>Calculate your exact age</div>
          </Link>

          <Link href="/born-on" className="tool-card">
            <strong>Famous Birthdays</strong>
            <div>Explore notable birthdays by date</div>
          </Link>
        </div>
      </section>
    </div>
  );
}
