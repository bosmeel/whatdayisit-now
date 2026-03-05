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

  useEffect(() => {

    if (!start || !end) return

    const params = new URLSearchParams()

    params.set("start", start)
    params.set("end", end)

    if (inclusive) params.set("inclusive", "1")

    router.replace(`/days-between?${params.toString()}`)

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

  if (result !== null && inclusive) result = result + 1

  let weeks = null
  let days = null

  if (result !== null) {
    const abs = Math.abs(result)
    weeks = Math.floor(abs / 7)
    days = abs % 7
  }

  return (
    <div style={{marginTop:20}}>

      <div style={{
        border:"1px solid #e5e7eb",
        borderRadius:8,
        padding:20,
        background:"#fafafa",
        maxWidth:460
      }}>

        <div style={{display:"grid",gap:14}}>

          <label>
            <div style={{fontSize:14,marginBottom:4}}>Start date</div>
            <input
              type="date"
              className="date-input"
              value={start}
              onChange={(e)=>setStart(e.target.value)}
            />
          </label>

          <label>
            <div style={{fontSize:14,marginBottom:4}}>End date</div>
            <input
              type="date"
              className="date-input"
              value={end}
              onChange={(e)=>setEnd(e.target.value)}
            />
          </label>

          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>

            <button className="tool-btn" onClick={swapDates}>
              Swap
            </button>

            <button className="tool-btn" onClick={setTodayToEndOfYear}>
              Today → End of year
            </button>

            <button className="tool-btn" onClick={setTodayToChristmas}>
              Today → Christmas
            </button>

          </div>

          <label style={{fontSize:14}}>
            <input
              type="checkbox"
              checked={inclusive}
              onChange={(e)=>setInclusive(e.target.checked)}
              style={{marginRight:6}}
            />
            Include both dates
          </label>

        </div>

      </div>

      {result !== null && (

        <div style={{marginTop:24}}>

          <h2 style={{fontSize:28,fontWeight:700}}>
            {result} days
          </h2>

          <p style={{color:"#666"}}>
            {weeks} weeks and {days} days
          </p>

        </div>

      )}

    </div>
  )
}