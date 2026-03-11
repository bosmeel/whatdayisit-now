"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuickDateJump() {

  const [date,setDate] = useState("");
  const router = useRouter();

  function go(type:string){

    if(!date) return;

    router.push(`/${type}?date=${date}`);
  }

  return (

    <div className="flex items-center gap-2 flex-wrap">

      <input
        type="date"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
      />

      <button
        onClick={()=>go("days-until")}
        className="border rounded px-2 py-1 text-sm"
      >
        Until
      </button>

      <button
        onClick={()=>go("days-since")}
        className="border rounded px-2 py-1 text-sm"
      >
        Since
      </button>

    </div>

  );
}