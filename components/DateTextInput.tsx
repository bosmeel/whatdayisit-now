"use client";

import { useRef } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function formatIsoToDisplay(iso: string): string {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return "";
  return `${day}-${month}-${year}`;
}

function formatDisplayToIso(display: string): string {
  const clean = display.replace(/[^\d-]/g, "");
  const parts = clean.split("-");

  if (parts.length !== 3) return "";

  const [day, month, year] = parts;

  if (day.length !== 2 || month.length !== 2 || year.length !== 4) return "";

  return `${year}-${month}-${day}`;
}

function autoFormatDisplay(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
}

export default function DateTextInput({ label, value, onChange }: Props) {
  const isoValue = formatDisplayToIso(value);
  const pickerRef = useRef<HTMLInputElement>(null);

  function openPicker() {
    if (!pickerRef.current) return;

    // moderne browsers (Chrome/Edge/Safari)
    if (pickerRef.current.showPicker) {
      pickerRef.current.showPicker();
    } else {
      // fallback
      pickerRef.current.focus();
      pickerRef.current.click();
    }
  }

  return (
    <div className="date-field">
      <label className="date-label">{label}</label>

      <div className="date-input-wrap">
        {/* TEXT INPUT */}
        <input
          type="text"
          inputMode="numeric"
          placeholder="dd-mm-yyyy"
          value={value}
          onChange={(e) => onChange(autoFormatDisplay(e.target.value))}
          className="date-input-text"
        />

        {/* CALENDAR BUTTON */}
        <button
          type="button"
          className="date-picker-button"
          onClick={openPicker}
          aria-label={`Open calendar for ${label}`}
        >
          <span className="calendar-icon">📅</span>
        </button>

        {/* HIDDEN NATIVE INPUT */}
        <input
          ref={pickerRef}
          type="date"
          value={isoValue}
          onChange={(e) => onChange(formatIsoToDisplay(e.target.value))}
          className="date-input-native"
        />
      </div>
    </div>
  );
}
