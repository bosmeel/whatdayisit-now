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
    url: "/birthday-weekday",
  },
  {
    title: "Birthdays by Date",
    description:
      "Explore famous people and historical birthdays for every day of the year.",
    url: "/born-on",
  },
];

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