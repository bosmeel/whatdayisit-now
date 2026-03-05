import type { Metadata } from "next"
import Link from "next/link"
import TodayTools from "@/components/TodayTools"

export const metadata: Metadata = {
  title: "Date Calculators",
  description:
    "Collection of online date calculators including days between dates, days until a date, day of year, and more.",
  alternates: {
    canonical: "/date-calculators",
  },
  openGraph: {
    title: "Date Calculators",
    description:
      "Explore multiple tools to calculate date differences, days remaining, and other calendar calculations.",
    url: "/date-calculators",
    type: "website",
  },
}

const tools = [
  {
    title: "Days Between Dates",
    description: "Calculate the number of days between two calendar dates.",
    url: "/days-between",
  },
  {
    title: "Days Until Date",
    description: "Find how many days remain until a specific date.",
    url: "/days-until",
  },
  {
    title: "Days Since Date",
    description: "Find how many days have passed since a specific date.",
    url: "/days-since",
  },
  {
    title: "Day of Year",
    description: "Determine which day of the year a specific date falls on.",
    url: "/day-of-year",
  },
  {
    title: "Days Left in Year",
    description: "See how many days remain until the end of the year.",
    url: "/days-left-in-year",
  },
  {
    title: "How Many Days in a Year",
    description: "Check whether a year has 365 or 366 days.",
    url: "/how-many-days-in-a-year",
  },
]

export default function Page() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

      <h1 style={{ fontSize: 36, fontWeight: 800 }}>
        Date Calculators
      </h1>

      <p style={{ marginTop: 10, lineHeight: 1.6 }}>
        Explore a collection of online date calculators designed to help you
        quickly calculate differences between dates, determine calendar values,
        and answer common date-related questions.
      </p>

      <TodayTools />

      <section style={{ marginTop: 30 }}>

        <div
          style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >

          {tools.map((tool) => (

            <Link
              key={tool.url}
              href={tool.url}
              style={{
                display: "block",
                padding: 18,
                border: "1px solid #e5e5e5",
                borderRadius: 10,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <h3 style={{ margin: 0 }}>{tool.title}</h3>

              <p style={{ marginTop: 6 }}>
                {tool.description}
              </p>

            </Link>

          ))}

        </div>

      </section>

      <section style={{ marginTop: 40 }}>

        <h2>Why use date calculators?</h2>

        <p>
          Date calculators make it easy to answer questions about time,
          schedules, deadlines, and planning. Whether you want to know how many
          days remain until an event or how many days are between two dates,
          these tools provide instant answers.
        </p>

      </section>

    </main>
  )
}