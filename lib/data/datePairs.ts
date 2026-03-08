type Pair = {
  slug: string;
  label: string;
  priority?: number;
};

const fixedPairs: Pair[] = [
  { slug: "christmas-and-new-year", label: "Christmas and New Year", priority: 10 },
  { slug: "halloween-and-christmas", label: "Halloween and Christmas", priority: 9 },
  { slug: "thanksgiving-and-christmas", label: "Thanksgiving and Christmas", priority: 9 },
  { slug: "new-year-and-valentines-day", label: "New Year and Valentine's Day", priority: 8 },
  { slug: "valentines-day-and-halloween", label: "Valentine's Day and Halloween", priority: 7 },
  { slug: "jan-1-and-dec-31", label: "January 1 and December 31", priority: 10 },
  { slug: "birthday-and-christmas", label: "Birthday and Christmas", priority: 9 },
  { slug: "2024-and-2025", label: "2024 and 2025", priority: 8 },
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

function formatMonth(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const generatedPairs: Pair[] = [];

/* same-month combinations */

months.forEach((month) => {

  const first = `${month.name}-1`;
  const middle = `${month.name}-15`;
  const last = `${month.name}-${month.days}`;

  generatedPairs.push({
    slug: `${first}-and-${middle}`,
    label: `${formatMonth(month.name)} 1 and ${formatMonth(month.name)} 15`,
  });

  generatedPairs.push({
    slug: `${middle}-and-${last}`,
    label: `${formatMonth(month.name)} 15 and ${formatMonth(month.name)} ${month.days}`,
  });

  generatedPairs.push({
    slug: `${first}-and-${last}`,
    label: `${formatMonth(month.name)} 1 and ${formatMonth(month.name)} ${month.days}`,
  });

});

/* cross-month combinations */

months.forEach((a) => {
  months.forEach((b) => {

    if (a.name === b.name) return;

    generatedPairs.push({
      slug: `${a.name}-1-and-${b.name}-1`,
      label: `${formatMonth(a.name)} 1 and ${formatMonth(b.name)} 1`,
    });

    generatedPairs.push({
      slug: `${a.name}-15-and-${b.name}-15`,
      label: `${formatMonth(a.name)} 15 and ${formatMonth(b.name)} 15`,
    });

  });
});

/* month-range combinations */

for (let i = 0; i < months.length; i++) {

  for (let j = i + 1; j < months.length; j++) {

    const a = months[i];
    const b = months[j];

    generatedPairs.push({
      slug: `${a.name}-1-and-${b.name}-${b.days}`,
      label: `${formatMonth(a.name)} 1 and ${formatMonth(b.name)} ${b.days}`,
    });

  }

}

export const DATE_PAIRS: Pair[] = [
  ...fixedPairs,
  ...generatedPairs,
];