import { EVENTS } from "@/lib/events";

function monthNameToNumber(name: string): number | null {
  const map: Record<string, number> = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  };
  return map[name] ?? null;
}

function parseToken(token: string): Date | null {
  const t = token.trim().toLowerCase();

  if (t === "today") return new Date();

  // year only: 2026 -> Jan 1
  if (/^\d{4}$/.test(t)) return new Date(Number(t), 0, 1);

  // yyyy-mm-dd
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
    const d = new Date(t);
    return isNaN(d.getTime()) ? null : d;
  }

  // month-day: jan-1 / january-1
  const md = t.match(/^([a-z]+)-(\d{1,2})$/);
  if (md) {
    const m = monthNameToNumber(md[1]);
    const day = Number(md[2]);
    if (m === null || day < 1 || day > 31) return null;
    const now = new Date();
    return new Date(now.getFullYear(), m, day);
  }

  // event slug
  if (t in EVENTS) {
    const { month, day } = EVENTS[t];
    const now = new Date();
    return new Date(now.getFullYear(), month - 1, day);
  }

  return null;
}

export function parseBetweenSlug(slug: string): { date1: Date; date2: Date } | null {
  const parts = slug.toLowerCase().split("-and-");
  if (parts.length !== 2) return null;

  const d1 = parseToken(parts[0]);
  const d2 = parseToken(parts[1]);
  if (!d1 || !d2) return null;

  return { date1: d1, date2: d2 };
}
