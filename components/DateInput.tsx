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
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: "block",
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        {label}
      </label>

      <input
        type="date"
        value={date}
        onChange={handleChange}
        style={{
          padding: "10px 12px",
          borderRadius: 6,
          border: "1px solid #ccc",
          fontSize: 16,
          width: "100%",
          maxWidth: 260,
        }}
      />
    </div>
  );
}