"use client";

import { useEffect, useState } from "react";

const items = [
  "Small steps today lead to big results tomorrow.",
  "Consistency beats intensity.",
  "Focus on progress, not perfection.",
  "Time is your most valuable asset.",
  "Do something today your future self will thank you for.",
  "Momentum builds with action.",
  "Every day counts.",
  "Start before you're ready.",
  "Clarity comes from doing.",
  "One step is enough.",
];

export default function DailyBlock() {
  const [text, setText] = useState("");

  useEffect(() => {
    const day = new Date().getDate();
    setText(items[day % items.length]);
  }, []);

  if (!text) return null;

  return (
    <div className="daily-block">
      <p>{text}</p>
    </div>
  );
}
