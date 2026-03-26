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

export default function BirthdayWeekdayPage() {
  const [birthDate, setBirthDate] = useState("");
  const [nextBirthday, setNextBirthday] = useState<string | null>(null);
  const [weekday, setWeekday] = useState<string | null>(null);
  const [distribution, setDistribution] = useState<number[] | null>(null);

  function calculate(dateStr: string) {
    setBirthDate(dateStr);

    if (!dateStr) return;

    const birth = parseDateUTC(dateStr);

    if (Number.isNaN(birth.getTime())) return;

    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let next = new Date(
      today.getFullYear(),
      birth.getUTCMonth(),
      birth.getUTCDate(),
    );

    if (next < today) {
      next = new Date(
        today.getFullYear() + 1,
        birth.getUTCMonth(),
        birth.getUTCDate(),
      );
    }

    setNextBirthday(formatDateReadable(next));
    setWeekday(weekdays[next.getDay()]);

    const counts = [0, 0, 0, 0, 0, 0, 0];

    for (let y = birth.getUTCFullYear(); y < birth.getUTCFullYear() + 80; y++) {
      const d = new Date(y, birth.getUTCMonth(), birth.getUTCDate());
      counts[d.getDay()]++;
    }

    setDistribution(counts);
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Birthday Weekday Calculator",
    description:
      "Find the weekday of your next birthday and see how your birthdays are distributed across the week.",
    applicationCategory: "CalculatorApplication",
    operatingSystem: "Web",
    url: "https://whatdayisit.now/birthday-weekday",
  };

  return (
    <div>
      <Script
        id="birthday-weekday-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Birthday Weekday Calculator" },
        ]}
      />

      <h1>Birthday Weekday Calculator</h1>

      <p>
        Use this birthday weekday calculator to find out what day of the week
        your next birthday will fall on. Enter your birth date to instantly see
        the weekday of your upcoming birthday and how your birthdays are
        distributed across the week over your lifetime.
      </p>

      <div className="calculator">
        {/* 🔥 NIEUWE INPUT */}
        <DateTextInput
          label="Birth date"
          value={birthDate}
          onChange={calculate}
        />

        {weekday && nextBirthday && (
          <div className="result-box">
            <div className="result-number">{weekday}</div>

            <div className="result-sub">Next birthday: {nextBirthday}</div>
          </div>
        )}
      </div>

      {distribution && (
        <section className="content-section">
          <h2>Birthday weekday distribution</h2>

          <ul className="page-list">
            {weekdays.map((day, i) => (
              <li key={day}>
                {day}: {distribution[i]}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="content-section">
        <h2>What day will my birthday be on?</h2>

        <p>
          Many people wonder what day of the week their birthday will fall on
          each year. Because the calendar shifts every year, your birthday moves
          through different weekdays over time.
        </p>

        <p>
          This birthday weekday calculator quickly determines the weekday of
          your next birthday and shows how your birthdays are distributed across
          the days of the week throughout your life.
        </p>
      </section>

      <section className="content-section">
        <h2>Related birthday tools</h2>

        <div className="tool-grid">
          <Link href="/what-day-was-i-born" className="tool-card">
            <strong>What Day Was I Born</strong>
            <div>Discover your exact birth weekday</div>
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
