"use client";

import { useState } from "react";

type Props = {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function DateInput({ label, value = "", onChange }: Props) {
  const [date, setDate] = useState(value);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setDate(v);
    if (onChange) onChange(v);
  }

  return (
    <div className="date-field">
      <label className="date-label">{label}</label>

      <input
        type="text"
        inputMode="numeric"
        placeholder="YYYY-MM-DD"
        value={date}
        onChange={handleChange}
        className="date-input"
      />
    </div>
  );
}