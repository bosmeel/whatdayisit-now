"use client";

import { useState } from "react";
import DateInput from "@/components/DateInput";
import Breadcrumbs from "@/components/Breadcrumbs";

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

    const birth = new Date(dateStr);
    if (Number.isNaN(birth.getTime())) return;

    const today = new Date();

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

  return (

    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Birthday Tools", href: "/" },
          { name: "Birthday Weekday Calculator" }
        ]}
      />

      <h1>Birthday Weekday Calculator</h1>

      <p>
        Find out which weekday your next birthday will fall on and see the
        distribution of your birthdays across the week.
      </p>

      <div className="calculator">

        <DateInput
          label="Birth date"
          value={birthDate}
          onChange={calculate}
        />

      </div>

      {weekday && nextBirthday && (

        <div className="result-box">

          <div className="result-number">
            {weekday}
          </div>

          <div className="result-label">
            Next birthday: {nextBirthday}
          </div>

        </div>

      )}

      {distribution && (

        <section style={{ marginTop: 40 }}>

          <h2>Birthday weekday distribution</h2>

          <ul>

            {weekdays.map((day, i) => (

              <li key={day}>
                {day}: {distribution[i]}
              </li>

            ))}

          </ul>

        </section>

      )}

    </div>

  );
}