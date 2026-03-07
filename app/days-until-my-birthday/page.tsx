"use client";

import { useState, useEffect } from "react";
import DateInput from "@/components/DateInput";

export default function DaysUntilBirthdayPage() {

  const [birthDate, setBirthDate] = useState("");

  const [days,setDays] = useState<number | null>(null);
  const [weeks,setWeeks] = useState<number | null>(null);
  const [months,setMonths] = useState<number | null>(null);
  const [extraDays,setExtraDays] = useState<number | null>(null);

  useEffect(()=>{

    if(!birthDate){
      setDays(null);
      setWeeks(null);
      setMonths(null);
      setExtraDays(null);
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    if(Number.isNaN(birth.getTime())) return;

    let nextBirthday = new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );

    if(nextBirthday < today){
      nextBirthday.setFullYear(today.getFullYear()+1);
    }

    const diff = nextBirthday.getTime() - today.getTime();

    const totalDays = Math.ceil(diff/(1000*60*60*24));

    const totalWeeks = Math.floor(totalDays/7);

    let m = nextBirthday.getMonth() - today.getMonth();
    let d = nextBirthday.getDate() - today.getDate();

    if(d < 0){
      m--;
      const prevMonth = new Date(
        nextBirthday.getFullYear(),
        nextBirthday.getMonth(),
        0
      );
      d += prevMonth.getDate();
    }

    if(m < 0){
      m += 12;
    }

    setDays(totalDays);
    setWeeks(totalWeeks);
    setMonths(m);
    setExtraDays(d);

  },[birthDate]);

  return (
    <div>

      <h1>Days Until My Birthday</h1>

      <p>
        Calculate how many days remain until your next birthday.
      </p>

      <div className="calculator">

        <DateInput
          label="Your birthday"
          value={birthDate}
          onChange={setBirthDate}
        />

        {days !== null && (
          <div className="result-box">

            <div className="result-number">{days}</div>
            <div className="result-label">days</div>

            <div style={{marginTop:"10px",fontSize:"14px",color:"var(--muted)"}}>
              {weeks} weeks
            </div>

            <div style={{fontSize:"14px",color:"var(--muted)"}}>
              {months} months {extraDays} days
            </div>

          </div>
        )}

      </div>

    </div>
  );
}