import Link from "next/link"
import DateCalculatorsLink from "@/components/DateCalculatorsLink"

export default function Page() {

  const year = new Date().getFullYear()

  const examples = [
    { label: "Days until New Year's Day", month: 1, day: 1 },
    { label: "Days until Valentine's Day", month: 2, day: 14 },
    { label: "Days until St. Patrick's Day", month: 3, day: 17 },
    { label: "Days until Independence Day", month: 7, day: 4 },
    { label: "Days until Halloween", month: 10, day: 31 },
    { label: "Days until Christmas", month: 12, day: 25 },
  ]

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>
        Days Until Date
      </h1>

      <p style={{ marginTop: 10, lineHeight: 1.6 }}>
        Calculate how many days remain until a specific calendar date.
      </p>

      <section style={{ marginTop: 40 }}>
        <h2>Popular countdowns</h2>

        <ul>
          {examples.map((ex) => (
            <li key={ex.label}>
              <Link href={`/days-until-date/${ex.month}/${ex.day}`}>
                {ex.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>How this calculator works</h2>

        <p>
          The days until calculator determines the number of days between today
          and a future calendar date.
        </p>

        <p>
          This is useful for counting down to holidays, birthdays, events,
          deadlines, and other important dates.
        </p>

      </section>

      <DateCalculatorsLink />

    </main>
  )
}