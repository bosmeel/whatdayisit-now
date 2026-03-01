export function getDaysLeftInYear(year: number) {
  const now = new Date();
  const currentYear = now.getFullYear();

  if (year < currentYear) return 0;

  if (year > currentYear) {
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31);
    const diff =
      (endOfYear.getTime() - startOfYear.getTime()) /
      (1000 * 60 * 60 * 24);
    return Math.floor(diff) + 1;
  }

  const endOfYear = new Date(year, 11, 31);
  const diff =
    (endOfYear.getTime() - now.getTime()) /
    (1000 * 60 * 60 * 24);

  return Math.ceil(diff);
}
export function getWeeksLeftInYear(year: number): string {
  const now = new Date();
  const currentYear = now.getFullYear();

  if (year < currentYear) return "0.00";

  const endOfYear = new Date(year, 11, 31, 23, 59, 59);

  if (year > currentYear) {
    const startOfYear = new Date(year, 0, 1);
    const diffMs = endOfYear.getTime() - startOfYear.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return (diffDays / 7).toFixed(2);
  }

  const diffMs = endOfYear.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return (diffDays / 7).toFixed(2);
}
export function getDaysLeftInMonth(year: number, month: number) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const lastDayOfMonth = new Date(year, month, 0);

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return 0;
  }

  if (year > currentYear || month > currentMonth) {
    return lastDayOfMonth.getDate();
  }

  const diff =
    (lastDayOfMonth.getTime() - now.getTime()) /
    (1000 * 60 * 60 * 24);

  return Math.ceil(diff);
}
export function getDaysUntilDate(year: number, month: number, day: number) {
  const now = new Date();
  const target = new Date(year, month - 1, day, 23, 59, 59);

  const diffMs = target.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 0) return 0;

  return Math.ceil(diffDays);
}
export function getDaysUntil(month: number, day: number) {
  const now = new Date();
  const currentYear = now.getFullYear();

  let target = new Date(currentYear, month - 1, day);

  if (target.getTime() < now.getTime()) {
    target = new Date(currentYear + 1, month - 1, day);
  }

  const diff =
    (target.getTime() - now.getTime()) /
    (1000 * 60 * 60 * 24);

  return Math.ceil(diff);
}