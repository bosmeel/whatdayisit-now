const MS_PER_DAY = 86400000;

export function normalizeToUTC(date: Date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

export function getDaysBetween(date1: Date, date2: Date) {
  const a = normalizeToUTC(date1).getTime();
  const b = normalizeToUTC(date2).getTime();
  return Math.round(Math.abs(b - a) / MS_PER_DAY);
}

export function getWeeksBetween(date1: Date, date2: Date) {
  return Math.floor(getDaysBetween(date1, date2) / 7);
}

export function getMonthsBetween(date1: Date, date2: Date) {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), 1);
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), 1);
  const years = d2.getFullYear() - d1.getFullYear();
  const months = d2.getMonth() - d1.getMonth();
  return Math.abs(years * 12 + months);
}

export function getYearsBetween(date1: Date, date2: Date) {
  return Math.floor(getMonthsBetween(date1, date2) / 12);
}
