export default function TodayTools() {
  const today = new Date()
  const y = today.getFullYear()
  const m = today.getMonth() + 1
  const d = today.getDate()

  const pad = (n: number) => String(n).padStart(2, "0")
  const iso = `${y}-${pad(m)}-${pad(d)}`

  const startOfYear = new Date(y, 0, 0)
  const diff = today.getTime() - startOfYear.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)

  const endOfYear = new Date(y, 11, 31)
  const daysLeft = Math.ceil((endOfYear.getTime() - today.getTime()) / oneDay)

  const day = today.getDay()
  const daysUntilWeekend = day === 6 ? 0 : (6 - day)

  return (
    <section style={{ marginTop: 30 }}>
      <h2>Today’s date tools</h2>

      <ul>
        <li>
          Today’s date: <strong>{iso}</strong>
        </li>

        <li>
          Day of year: <strong>{dayOfYear}</strong>{" "}
          (<a href="/day-of-year">view tool</a>)
        </li>

        <li>
          Days left in year: <strong>{daysLeft}</strong>{" "}
          (<a href="/days-left-in-year">view tool</a>)
        </li>

        <li>
          Days until weekend: <strong>{daysUntilWeekend}</strong>{" "}
          (<a href="/days-until-weekend">view tool</a>)
        </li>

        <li>
          Week number:{" "}
          <a href="/week-number">view tool</a>
        </li>
      </ul>
    </section>
  )
}