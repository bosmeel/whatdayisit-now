import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Birthday Calculators & Tools",
  description:
    "Explore birthday calculators including age calculator, birthday weekday calculator, and tools to discover interesting facts about your birthday.",
  alternates: {
    canonical: "https://whatdayisit.now/birthday-tools",
  },
  openGraph: {
    title: "Birthday Calculators & Tools",
    description:
      "Use our birthday tools to calculate your age, discover what weekday you were born on, and learn more about your birthday.",
    url: "https://whatdayisit.now/birthday-tools",
    siteName: "WhatDayIsIt.now",
    type: "website",
  },
};

const tools = [
  {
    title: "Age Calculator",
    description:
      "Calculate your exact age in years, months, and days from your birth date.",
    url: "/age-calculator",
  },
  {
    title: "What Day Was I Born?",
    description:
      "Find out which day of the week you were born.",
    url: "/what-day-was-i-born",
  },
  {
    title: "Birthday Weekday Calculator",
    description:
      "See what weekday your next birthday will fall on and view your birthday weekday distribution.",
    url: "/birthday-weekday-calculator",
  },
  {
    title: "Birthdays by Date",
    description:
      "Explore famous people and historical birthdays for every day of the year.",
    url: "/born-on",
  },
];

const weekdayPages = [
  { title: "Born on Monday", url: "/born-on-monday" },
  { title: "Born on Tuesday", url: "/born-on-tuesday" },
  { title: "Born on Wednesday", url: "/born-on-wednesday" },
  { title: "Born on Thursday", url: "/born-on-thursday" },
  { title: "Born on Friday", url: "/born-on-friday" },
  { title: "Born on Saturday", url: "/born-on-saturday" },
  { title: "Born on Sunday", url: "/born-on-sunday" },
];

const months = [
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

function formatMonth(m: string) {
  return m.charAt(0).toUpperCase() + m.slice(1);
}

export default function Page() {
  return (
    <main className="container">

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Birthday Tools" }
        ]}
      />

      <h1>Birthday Calculators & Tools</h1>

      <p>
        Discover useful birthday tools and calculators. These tools help you
        calculate your age, find out which weekday you were born on, see when
        your next birthday falls, and explore birthdays throughout the year.
      </p>

      {/* Core birthday tools */}

      <section style={{ marginTop: 40 }}>

        <div className="tool-grid">

          {tools.map((tool) => (

            <Link
              key={tool.url}
              href={tool.url}
              className="tool-card"
            >

              <strong>{tool.title}</strong>

              <div>
                {tool.description}
              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* Weekday cluster */}

      <section style={{ marginTop: 50 }}>

        <h2>Born on a Specific Weekday</h2>

        <p>
          Browse birthday pages by weekday to explore patterns and related
          birthday tools.
        </p>

        <div className="tool-grid">

          {weekdayPages.map((item) => (

            <Link
              key={item.url}
              href={item.url}
              className="tool-card"
            >

              <strong>{item.title}</strong>

              <div>
                Explore birthdays linked to this weekday
              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* Month cluster */}

      <section style={{ marginTop: 50 }}>

        <h2>Birthdays by Month</h2>

        <p>
          Browse birthdays by month to explore people born in the same month
          and discover related birthday facts.
        </p>

        <div className="tool-grid">

          {months.map((m) => (

            <Link
              key={m}
              href={`/born-in/${m}`}
              className="tool-card"
            >

              <strong>{formatMonth(m)} Birthdays</strong>

              <div>
                People born in {formatMonth(m)}
              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* Info section */}

      <section style={{ marginTop: 50 }}>

        <h2>Birthday Facts and Calculations</h2>

        <p>
          Birthday calculators are useful for answering fun and practical
          questions about your birth date. You can calculate your exact age,
          determine what weekday you were born on, or see which weekday your
          next birthday will fall on.
        </p>

        <p>
          Many people also explore birthdays to learn about famous people who
          share their birth date or to discover interesting patterns in
          birthdays across the calendar.
        </p>

      </section>

    </main>
    
  );
}