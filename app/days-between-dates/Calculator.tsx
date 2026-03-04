"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

const MS_PER_DAY = 86400000

function daysBetween(start: string, end: string) {
  const a = Date.parse(start)
  const b = Date.parse(end)

  if (isNaN(a) || isNaN(b)) return null

  return Math.round((b - a) / MS_PER_DAY)
}

function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export default function Calculator() {

  const searchParams = useSearchParams()
  const router = useRouter()

  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [inclusive, setInclusive] = useState(false)

  useEffect(() => {

    const startParam = searchParams.get("start")
    const endParam = searchParams.get("end")
    const incParam = searchParams.get("inclusive")

    if (startParam) setStart(startParam)
    if (endParam) setEnd(endParam)
    if (incParam === "1") setInclusive(true)

  }, [searchParams])

  // update URL when values change
  useEffect(() => {

    if (!start || !end) return

    const params = new URLSearchParams()

    params.set("start", start)
    params.set("end", end)

    if (inclusive) {
      params.set("inclusive", "1")
    }

    router.replace(`/days-between-dates?${params.toString()}`)

  }, [start, end, inclusive, router])

  function swapDates() {
    setStart(end)
    setEnd(start)
  }

  function setTodayToEndOfYear() {
    const today = todayISO()
    const year = new Date().getFullYear()
    const endOfYear = `${year}-12-31`

    setStart(today)
    setEnd(endOfYear)
  }

  function setTodayToChristmas() {
    const today = todayISO()
    const year = new Date().getFullYear()
    const christmas = `${year}-12-25`

    setStart(today)
    setEnd(christmas)
  }

  let result = daysBetween(start, end)

  if (result !== null && inclusive) {
    result = result + 1
  }

  let weeks = null
  let days = null

  if (result !== null) {
    const abs = Math.abs(result)
    weeks = Math.floor(abs / 7)
    days = abs % 7
  }

  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 420 }}>

      <label>
        Start date
        <input
          type="date"
          value={start}
          onChange={(e)=>setStart(e.target.value)}
        />
      </label>

      <label>
        End date
        <input
          type="date"
          value={end}
          onChange={(e)=>setEnd(e.target.value)}
        />
      </label>

      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        <button onClick={swapDates}>
          Swap dates
        </button>

        <button onClick={setTodayToEndOfYear}>
          Today → End of year
        </button>

        <button onClick={setTodayToChristmas}>
          Today → Christmas
        </button>
      </div>

      <label>
        <input
          type="checkbox"
          checked={inclusive}
          onChange={(e)=>setInclusive(e.target.checked)}
        />
        Include both dates
      </label>

      {result !== null && (
        <div>

          <h2 style={{ marginTop: 10 }}>
            {result} days
          </h2>

          <p>
            {weeks} weeks and {days} days
          </p>

        </div>
      )}

    </div>
  )
}