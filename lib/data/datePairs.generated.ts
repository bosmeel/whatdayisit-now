export type MonthDay = { month: number; day: number };

export type GeneratedPair = {
  slug: string;
  start: MonthDay;
  end: MonthDay;
  label: string;
  title: string;
  priority?: number;
};

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
] as const;

function monthName(m: number) {
  return MONTH_NAMES[m - 1] ?? "Month";
}

function toSlug(month: number, day: number) {
  return `${monthName(month).toLowerCase()}-${day}`;
}

function label(md: MonthDay) {
  return `${monthName(md.month)} ${md.day}`;
}

function title(start: MonthDay, end: MonthDay) {
  return `Days Between ${label(start)} and ${label(end)}`;
}

/* seeds */

const STARTS: MonthDay[] = [
  { month:1, day:1 }, { month:1, day:15 },
  { month:2, day:1 }, { month:2, day:14 },
  { month:3, day:1 }, { month:3, day:15 },
  { month:4, day:1 }, { month:4, day:15 },
  { month:5, day:1 }, { month:5, day:15 },
  { month:6, day:1 }, { month:6, day:15 },
  { month:7, day:1 }, { month:7, day:15 },
  { month:8, day:1 }, { month:8, day:15 },
  { month:9, day:1 }, { month:9, day:15 },
  { month:10, day:1 }, { month:10, day:15 },
  { month:11, day:1 }, { month:11, day:15 },
  { month:12, day:1 }, { month:12, day:15 }
];

const ENDS: MonthDay[] = [
  { month:12, day:31 },
  { month:12, day:25 },
  { month:11, day:30 },
  { month:10, day:31 },
  { month:9, day:30 },
  { month:8, day:31 },
  { month:7, day:31 },
  { month:6, day:30 },
  { month:5, day:31 },
  { month:4, day:30 },
  { month:3, day:31 },
  { month:2, day:29 }
];

function uniqBySlug(pairs: GeneratedPair[]) {
  const seen = new Set<string>();
  return pairs.filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

export function generateMonthDayPairs(): GeneratedPair[] {

  const pairs: GeneratedPair[] = [];

  for (const s of STARTS) {
    for (const e of ENDS) {

      const sKey = s.month * 100 + s.day;
      const eKey = e.month * 100 + e.day;

      if (eKey <= sKey) continue;

      const slug = `${toSlug(s.month, s.day)}-and-${toSlug(e.month, e.day)}`;

      pairs.push({
        slug,
        start: s,
        end: e,
        label: `${label(s)} and ${label(e)}`,
        title: title(s, e),
        priority: s.month === 1 && s.day === 1 && e.month === 12 && e.day === 31 ? 10 : 5
      });
    }
  }

  return uniqBySlug(pairs).sort((a,b)=>{
  const pa = a.priority ?? 0;
  const pb = b.priority ?? 0;
  return pb - pa;
});
}