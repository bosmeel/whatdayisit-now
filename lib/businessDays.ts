import { normalizeToUTC } from "@/lib/dateDifference";

export function getBusinessDaysBetween(date1: Date, date2: Date) {
  let start = normalizeToUTC(date1);
  let end = normalizeToUTC(date2);

  if (start.getTime() > end.getTime()) {
    const tmp = start;
    start = end;
    end = tmp;
  }

  let count = 0;
  const cur = new Date(start);

  while (cur.getTime() <= end.getTime()) {
    const day = cur.getUTCDay();
    if (day !== 0 && day !== 6) count++;
    cur.setUTCDate(cur.getUTCDate() + 1);
  }

  return count;
}
