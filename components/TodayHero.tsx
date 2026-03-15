"use client";

import { useEffect, useState } from "react";
import { getDayOfYear, getTotalDaysInYear } from "@/lib/date";

export default function TodayHero() {

  const [now,setNow] = useState<Date | null>(null);

  useEffect(()=>{

    function update(){
      setNow(new Date());
    }

    update();

    const interval = setInterval(update,60000);

    return ()=>clearInterval(interval);

  },[]);

  if(!now) return null;

  const dayName = now.toLocaleDateString("en-US",{weekday:"long"});

  const fullDate = now.toLocaleDateString("en-US",{
    year:"numeric",
    month:"long",
    day:"numeric"
  });

  const dayOfYear = getDayOfYear(now);
  const totalDays = getTotalDaysInYear(now.getFullYear());

  return (

    <section className="today-hero">

      <h1>
        What Day Is It Today?
      </h1>

      <div className="today-date">

        {dayName}, {fullDate}

      </div>

      <p className="today-subtitle">

        Today is day <strong>{dayOfYear}</strong> of {totalDays}.
        Instantly see today's date, week number,
        and how much of the year has passed.

      </p>

    </section>

  );

}