"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuickDateJump(){

  const [date,setDate] = useState("");
  const router = useRouter();

  function parseDate(value:string){

    const digits = value.replace(/\D/g,"");

    if(digits.length !== 8) return null;

    const day = digits.slice(0,2);
    const month = digits.slice(2,4);
    const year = digits.slice(4,8);

    return `${year}-${month}-${day}`;
  }

  function go(type:string){

    const formatted = parseDate(date);

    if(!formatted) return;

    if(type === "days-until"){
      router.push(`/days-until?target=${formatted}`);
    }

    if(type === "days-since"){
      router.push(`/days-since?start=${formatted}`);
    }

  }

  return (

    <div className="quick-date">

      <input
        type="text"
        inputMode="numeric"
        placeholder="DDMMYYYY"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
        className="quick-date-input"
      />

      <button onClick={()=>go("days-until")}>
        Until
      </button>

      <button onClick={()=>go("days-since")}>
        Since
      </button>

    </div>

  );

}