import type { Metadata } from "next"
import Link from "next/link"
import Breadcrumbs from "@/components/Breadcrumbs"
import TodayTools from "@/components/TodayTools"

export const metadata: Metadata = {
  title: "Date Calculators",
  description:
    "Collection of online date calculators including days between dates, days until a date, age calculator, and more.",
  alternates: {
    canonical: "/date-calculators",
  },
  openGraph: {
    title: "Date Calculators",
    description:
      "Explore tools to calculate date differences, age, business days, and other calendar calculations.",
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
    title: "Weeks Between Dates",
    description: "Calculate the number of weeks between two dates.",
    url: "/weeks-between",
  },
  {
    title: "Months Between Dates",
    description: "Calculate the number of months between two dates.",
    url: "/months-between",
  },
  {
    title: "Years Between Dates",
    description: "Calculate the number of years between two dates.",
    url: "/years-between",
  },
  {
    title: "Business Days Between Dates",
    description: "Count the number of working days between two dates.",
    url: "/business-days-between",
  },
  {
    title: "Age Calculator",
    description: "Calculate someone's exact age in years, months, and days.",
    url: "/age-calculator",
  },
  {
    title: "Date Duration Calculator",
    description:
      "Calculate the exact duration between two dates in years, months, weeks, and days.",
    url: "/date-duration",
  },
]

export default function Page() {

  return (
    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Date Calculators" }
        ]}
      />

      <h1>Date Calculators</h1>

      <p>
        Explore our collection of online date calculators designed to help you
        quickly calculate differences between dates, determine calendar values,
        and answer common time-related questions.
      </p>

      <TodayTools />

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

        <h2>Why use date calculators?</h2>

        <p>
          Date calculators make it easy to answer questions about schedules,
          deadlines, and time differences. Whether you want to know how many
          days remain until an event, calculate someone’s age, or compare two
          calendar dates, these tools provide instant results.
        </p>

      </section>

    </div>
  )
}