"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
};

function isoToDisplay(iso: string) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}

function displayToIso(display: string) {
  const digits = display.replace(/\D/g, "");

  if (digits.length !== 8) return "";

  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);

  return `${year}-${month}-${day}`;
}

function formatDisplay(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0,2)}-${digits.slice(2)}`;

  return `${digits.slice(0,2)}-${digits.slice(2,4)}-${digits.slice(4)}`;
}

export default function DateInput({ label, value = "", onChange }: Props) {

  const [displayValue, setDisplayValue] = useState("");
  const nativeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDisplayValue(isoToDisplay(value));
  }, [value]);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {

    const formatted = formatDisplay(e.target.value);
    setDisplayValue(formatted);

    const iso = displayToIso(formatted);

    if (onChange) onChange(iso);
  }

  function handleNativeChange(e: React.ChangeEvent<HTMLInputElement>) {

    const iso = e.target.value;

    if (onChange) onChange(iso);
  }

  function openCalendar() {

    const input = nativeRef.current;
    if (!input) return;

    input.focus();

    if (input.showPicker) {
      input.showPicker();
    }
  }

  return (
    <div className="date-field">

      <label className="date-label">
        {label}
      </label>

      <div className="date-input-row">

        <input
          type="text"
          inputMode="numeric"
          placeholder="dd-mm-yyyy"
          value={displayValue}
          onChange={handleTextChange}
          className="date-input"
        />

        <button
          type="button"
          className="date-picker-button"
          onClick={openCalendar}
        >
          Calendar
        </button>

        <input
          ref={nativeRef}
          type="date"
          value={value || ""}
          onChange={handleNativeChange}
          style={{
            width: "1px",
            height: "1px",
            opacity: 0,
            position: "absolute"
          }}
        />

      </div>

    </div>
  );
}