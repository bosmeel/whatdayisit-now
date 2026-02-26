export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function getTotalDaysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

export function getISOWeekNumber(date: Date): number {
  const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = tempDate.getUTCDay() || 7;
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
  return Math.ceil(((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function getQuarter(date: Date): string {
  const month = date.getMonth();
  if (month < 3) return "Q1";
  if (month < 6) return "Q2";
  if (month < 9) return "Q3";
  return "Q4";
}

export function getDaysLeftInYear(date: Date): number {
  const total = getTotalDaysInYear(date.getFullYear());
  const currentDay = getDayOfYear(date);
  return total - currentDay;
}

export function getYearProgressPercent(date: Date): number {
  const total = getTotalDaysInYear(date.getFullYear());
  const currentDay = getDayOfYear(date);
  return parseFloat(((currentDay / total) * 100).toFixed(1));
}

export function getDaysUntilWeekend(date: Date): number {
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  const saturday = 6;
  if (day === saturday) return 0;
  return (saturday - day + 7) % 7;
}