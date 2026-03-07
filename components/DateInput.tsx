"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
};

function isoToDisplay(iso: string) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
  const [year, month, day] = iso.split("-");
  return `${day}-${month}-${year}`;
}

function displayToIso(display: string) {
  const cleaned = display.replace(/[^\d-]/g, "");
  const match = cleaned.match(/^(\d{2})-(\d{2})-(\d{4})$/);

  if (!match) return "";

  const [, day, month, year] = match;

  const dayNum = Number(day);
  const monthNum = Number(month);
  const yearNum = Number(year);

  if (monthNum < 1 || monthNum > 12) return "";
  if (dayNum < 1 || dayNum > 31) return "";

  const testDate = new Date(`${year}-${month}-${day}T00:00:00`);
  if (Number.isNaN(testDate.getTime())) return "";

  const isRealDate =
    testDate.getFullYear() === yearNum &&
    testDate.getMonth() + 1 === monthNum &&
    testDate.getDate() === dayNum;

  if (!isRealDate) return "";

  return `${year}-${month}-${day}`;
}

function formatDisplayInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
}

export default function DateInput({
  label,
  value = "",
  onChange,
}: Props) {
  const [displayValue, setDisplayValue] = useState(isoToDisplay(value));
  const nativeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDisplayValue(isoToDisplay(value));
  }, [value]);

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatDisplayInput(e.target.value);
    setDisplayValue(formatted);

    const isoValue = displayToIso(formatted);
    if (onChange) onChange(isoValue);
  }

  function handleNativeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isoValue = e.target.value;
    setDisplayValue(isoToDisplay(isoValue));
    if (onChange) onChange(isoValue);
  }

  function openPicker() {
    if (!nativeInputRef.current) return;

    if (typeof nativeInputRef.current.showPicker === "function") {
      nativeInputRef.current.showPicker();
    } else {
      nativeInputRef.current.focus();
      nativeInputRef.current.click();
    }
  }

  return (
    <div className="date-field">
      <label className="date-label">{label}</label>

      <div className="date-input-row">
        <input
          type="text"
          inputMode="numeric"
          placeholder="dd-mm-jjjj"
          value={displayValue}
          onChange={handleTextChange}
          className="date-input"
          aria-label={label}
        />

        <button type="button" onClick={openPicker} className="date-picker-button">
          Calendar
        </button>
      </div>

      <input
        ref={nativeInputRef}
        type="date"
        value={value}
        onChange={handleNativeChange}
        className="native-date-input"
        tabIndex={-1}
        aria-hidden="true"
      />

      <p className="date-help">Gebruik dd-mm-jjjj of kies een datum via kalender.</p>
    </div>
  );
}