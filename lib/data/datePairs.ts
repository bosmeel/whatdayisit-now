type Pair = {
  slug: string;
  label: string;
  start: string;
  end: string;
  priority?: number;
};

function formatMonth(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const fixedPairs: Pair[] = [
  {
    slug: "christmas-and-new-year",
    label: "Christmas and New Year",
    start: "2024-12-25",
    end: "2025-01-01",
    priority: 10,
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
    priority: 10,
  },
];

const months = [
  { name: "january", days: 31 },
  { name: "february", days: 29 },
  { name: "march", days: 31 },
  { name: "april", days: 30 },
  { name: "may", days: 31 },
  { name: "june", days: 30 },
  { name: "july", days: 31 },
  { name: "august", days: 31 },
  { name: "september", days: 30 },
  { name: "october", days: 31 },
  { name: "november", days: 30 },
  { name: "december", days: 31 },
];

const generatedPairs: Pair[] = [];

months.forEach((month) => {
  generatedPairs.push({
    slug: `${month.name}-1-and-${month.name}-${month.days}`,
    label: `${formatMonth(month.name)} 1 and ${formatMonth(month.name)} ${month.days}`,
    start: `2024-${String(months.indexOf(month) + 1).padStart(2, "0")}-01`,
    end: `2024-${String(months.indexOf(month) + 1).padStart(2, "0")}-${month.days}`,
  });
});

export const DATE_PAIRS: Pair[] = [...fixedPairs, ...generatedPairs];
