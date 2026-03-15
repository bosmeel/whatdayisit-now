"use client";

import { useEffect, useState } from "react";
import {
  getDayOfYear,
  getTotalDaysInYear,
  getYearProgressPercent,
} from "@/lib/date";

export default function TodayHero() {

  const [now,setNow] = useState<Date | null>(null);

  useEffect(()=>{

    function updateNow(){
      setNow(new Date());
    }

    updateNow();

    const interval = setInterval(updateNow,60000);

    return ()=>clearInterval(interval);

  },[]);

  if(!now) return null;

  const weekday = now.toLocaleDateString("en-US",{ weekday:"long" });

  const fullDate = now.toLocaleDateString("en-US",{
    year:"numeric",
    month:"long",
    day:"numeric"
  });

  const dayOfYear = getDayOfYear(now);
  const totalDays = getTotalDaysInYear(now.getFullYear());
  const yearProgress = getYearProgressPercent(now);

  return (

    <section className="today-hero">

      <h1>What Day Is It Today?</h1>

      <div className="today-date">
        {weekday}, {fullDate}
      </div>

      <p className="today-subtitle">
        Today is day <strong>{dayOfYear}</strong> of {totalDays}.
        The year is <strong>{yearProgress}%</strong> complete.
      </p>

    </section>

  );

}