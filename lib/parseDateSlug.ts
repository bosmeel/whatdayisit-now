import { EVENTS } from "@/lib/events";

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getNextEventDate(month: number, day: number) {
  const now = new Date();
  const year = now.getFullYear();

  let target = new Date(year, month - 1, day);
  target = startOfDay(target);

  const today = startOfDay(now);

  if (target < today) {
    target = new Date(year + 1, month - 1, day);
  }

  return target;
}

function parseToken(token: string): Date | null {

  const t = token.toLowerCase();

  if (t === "today") {
    return startOfDay(new Date());
  }

  if (EVENTS[t]) {
    const { month, day } = EVENTS[t];
    return getNextEventDate(month, day);
  }

  if (/^\d{4}$/.test(t)) {
    return new Date(Number(t), 0, 1);
  }

  const parts = t.split("-");

  if (parts.length === 2) {

    const monthNames: Record<string, number> = {
      jan: 0, january: 0,
      feb: 1, february: 1,
      mar: 2, march: 2,
      apr: 3, april: 3,
      may: 4,
      jun: 5, june: 5,
      jul: 6, july: 6,
      aug: 7, august: 7,
      sep: 8, september: 8,
      oct: 9, october: 9,
      nov: 10, november: 10,
      dec: 11, december: 11,
    };

    const month = monthNames[parts[0]];
    const day = Number(parts[1]);

    if (month !== undefined && day) {
      const year = new Date().getFullYear();
      return new Date(year, month, day);
    }
  }

  return null;
}

export function parseBetweenSlug(slug: string) {

  const parts = slug.split("-and-");

  if (parts.length !== 2) {
    return null;
  }

  const date1 = parseToken(parts[0]);
  const date2 = parseToken(parts[1]);

  if (!date1 || !date2) {
    return null;
  }

  return { date1, date2 };
}