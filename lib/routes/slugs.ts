// lib/routes/slugs.ts

export type MonthName =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

export const MONTHS: MonthName[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const MONTH_TO_INDEX: Record<MonthName, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

export function monthNameToNumber(month: string): number | null {
  const key = month.toLowerCase() as MonthName;
  return MONTH_TO_INDEX[key] ?? null;
}

export function monthNumberToName(month: number): MonthName | null {
  if (!Number.isInteger(month) || month < 1 || month > 12) return null;
  return MONTHS[month - 1] ?? null;
}

export function isValidDayInMonth(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  const dt = new Date(Date.UTC(year, month - 1, day));
  return (
    dt.getUTCFullYear() === year &&
    dt.getUTCMonth() === month - 1 &&
    dt.getUTCDate() === day
  );
}

export function parseWhatDayIsSlug(slug: string): { year: number; month: number; day: number } | null {
  // expects: "march-5-2026"
  const parts = slug.toLowerCase().split("-").filter(Boolean);
  if (parts.length !== 3) return null;

  const month = monthNameToNumber(parts[0]);
  const day = Number(parts[1]);
  const year = Number(parts[2]);

  if (!month) return null;
  if (!Number.isInteger(day) || !Number.isInteger(year)) return null;

  // allow a wide range, but reject nonsense
  if (year < 1600 || year > 2500) return null;

  if (!isValidDayInMonth(year, month, day)) return null;

  return { year, month, day };
}

export function buildWhatDayIsSlug(year: number, month: number, day: number): string {
  const m = monthNumberToName(month);
  if (!m) throw new Error("Invalid month");
  if (!isValidDayInMonth(year, month, day)) throw new Error("Invalid date");
  return `${m}-${day}-${year}`;
}

export function formatMonthDay(month: number, day: number): string {
  const m = monthNumberToName(month);
  if (!m) throw new Error("Invalid month");
  // "March 5"
  return `${m[0].toUpperCase()}${m.slice(1)} ${day}`;
}

export function formatISODateUTC(year: number, month: number, day: number): string {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}