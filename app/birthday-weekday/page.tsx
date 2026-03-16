"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import Script from "next/script";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function BirthdayWeekdayPage() {

  const [birthDate, setBirthDate] = useState("");
  const [nextBirthday, setNextBirthday] = useState<string | null>(null);
  const [weekday, setWeekday] = useState<string | null>(null);
  const [distribution, setDistribution] = useState<number[] | null>(null);

  function calculate(dateStr: string) {

    setBirthDate(dateStr);

    if (!dateStr) return;

    const birth = new Date(dateStr + "T00:00:00");
    if (Number.isNaN(birth.getTime())) return;

    const now = new Date();

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    let next = new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );

    if (next < today) {
      next = new Date(
        today.getFullYear() + 1,
        birth.getMonth(),
        birth.getDate()
      );
    }

    setNextBirthday(next.toDateString());
    setWeekday(weekdays[next.getDay()]);

    const counts = [0,0,0,0,0,0,0];

    for (let y = birth.getFullYear(); y < birth.getFullYear() + 80; y++) {

      const d = new Date(y, birth.getMonth(), birth.getDate());
      counts[d.getDay()]++;

    }

    setDistribution(counts);
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Birthday Weekday Calculator",
    description: "Find the weekday of your next birthday and see how your birthdays are distributed across the week.",
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
          { name: "Birthday Weekday Calculator" }
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

        <div className="date-field">
          <label className="date-label">Birth date</label>

          <input
            type="date"
            value={birthDate}
            onChange={(e)=>calculate(e.target.value)}
            className="date-input"
          />
        </div>

        {weekday && nextBirthday && (

          <div className="result-box">

            <div className="result-number">
              {weekday}
            </div>

            <div className="result-sub">
              Next birthday: {nextBirthday}
            </div>

          </div>

        )}

      </div>

      {distribution && (

        <section style={{ marginTop: 40 }}>

          <h2>Birthday weekday distribution</h2>

          <ul style={{ lineHeight: 1.8 }}>

            {weekdays.map((day, i) => (

              <li key={day}>
                {day}: {distribution[i]}
              </li>

            ))}

          </ul>

        </section>

      )}

      {/* SEO SECTION */}

      <section style={{ marginTop: 40 }}>

        <h2>What day will my birthday be on?</h2>

        <p>
          Many people wonder what day of the week their birthday will fall on
          each year. Because the calendar shifts every year, your birthday
          moves through different weekdays over time.
        </p>

        <p>
          This birthday weekday calculator quickly determines the weekday of
          your next birthday and shows how your birthdays are distributed
          across the days of the week throughout your life.
        </p>

      </section>

      <section style={{ marginTop: 40 }}>

        <h2>Related birthday tools</h2>

        <ul>

          <li>
            <Link href="/what-day-was-i-born">
              What day was I born?
            </Link>
          </li>

          <li>
            <Link href="/age-calculator">
              Age calculator
            </Link>
          </li>

          <li>
            <Link href="/born-on">
              Famous birthdays by date
            </Link>
          </li>

        </ul>

      </section>

    </div>

  );
}