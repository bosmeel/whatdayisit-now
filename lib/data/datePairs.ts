type Pair = {
  slug: string;
  label: string;
  start: string;
  end: string;
};

function formatMonth(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const months = [
  { name: "january", num: 1, days: 31 },
  { name: "february", num: 2, days: 29 },
  { name: "march", num: 3, days: 31 },
  { name: "april", num: 4, days: 30 },
  { name: "may", num: 5, days: 31 },
  { name: "june", num: 6, days: 30 },
  { name: "july", num: 7, days: 31 },
  { name: "august", num: 8, days: 31 },
  { name: "september", num: 9, days: 30 },
  { name: "october", num: 10, days: 31 },
  { name: "november", num: 11, days: 30 },
  { name: "december", num: 12, days: 31 },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const pairs: Pair[] = [];

/* 🔥 CORE: month start ↔ month end */

months.forEach((a) => {
  months.forEach((b) => {
    if (a.num >= b.num) return;

    pairs.push({
      slug: `${a.name}-1-and-${b.name}-${b.days}`,
      label: `${formatMonth(a.name)} 1 and ${formatMonth(b.name)} ${b.days}`,
      start: `2024-${pad(a.num)}-01`,
      end: `2024-${pad(b.num)}-${b.days}`,
    });
  });
});

/* 🔥 SAME MONTH (extra depth) */

months.forEach((m) => {
  pairs.push({
    slug: `${m.name}-1-and-${m.name}-15`,
    label: `${formatMonth(m.name)} 1 and ${formatMonth(m.name)} 15`,
    start: `2024-${pad(m.num)}-01`,
    end: `2024-${pad(m.num)}-15`,
  });

  pairs.push({
    slug: `${m.name}-15-and-${m.name}-${m.days}`,
    label: `${formatMonth(m.name)} 15 and ${formatMonth(m.name)} ${m.days}`,
    start: `2024-${pad(m.num)}-15`,
    end: `2024-${pad(m.num)}-${m.days}`,
  });
});

/* 🔥 HIGH VALUE FIXED */

pairs.push(
  {
    slug: "christmas-and-new-year",
    label: "Christmas and New Year",
    start: "2024-12-25",
    end: "2025-01-01",
  },
  {
    slug: "halloween-and-christmas",
    label: "Halloween and Christmas",
    start: "2024-10-31",
    end: "2024-12-25",
  },
  {
    slug: "jan-1-and-dec-31",
    label: "January 1 and December 31",
    start: "2024-01-01",
    end: "2024-12-31",
  },
);

export const DATE_PAIRS = pairs;
