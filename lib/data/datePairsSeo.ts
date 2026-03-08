type DateSpec = {
  year: number;
  month: number;
  day: number;
  label: string;
};

export type DatePairSeo = {
  slug: string;
  category: "year" | "month" | "holiday" | "monthpair";
  title: string;
  intro: string;
  start: DateSpec;
  end: DateSpec;
};

const CURRENT_YEAR = new Date().getUTCFullYear();

const MONTHS = [
  { short: "jan", long: "January" },
  { short: "feb", long: "February" },
  { short: "mar", long: "March" },
  { short: "apr", long: "April" },
  { short: "may", long: "May" },
  { short: "jun", long: "June" },
  { short: "jul", long: "July" },
  { short: "aug", long: "August" },
  { short: "sep", long: "September" },
  { short: "oct", long: "October" },
  { short: "nov", long: "November" },
  { short: "dec", long: "December" },
] as const;

const HOLIDAYS = [
  { slug: "new-years-day", label: "New Year's Day", month: 1, day: 1 },
  { slug: "valentines-day", label: "Valentine's Day", month: 2, day: 14 },
  { slug: "st-patricks-day", label: "St. Patrick's Day", month: 3, day: 17 },
  { slug: "earth-day", label: "Earth Day", month: 4, day: 22 },
  { slug: "mothers-day", label: "Mother's Day", month: 5, day: 11 },
  { slug: "independence-day", label: "Independence Day", month: 7, day: 4 },
  { slug: "halloween", label: "Halloween", month: 10, day: 31 },
  { slug: "thanksgiving", label: "Thanksgiving", month: 11, day: 27 },
  { slug: "christmas-day", label: "Christmas Day", month: 12, day: 25 },
  { slug: "new-years-eve", label: "New Year's Eve", month: 12, day: 31 },
] as const;

function lastDayOfMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function monthShort(month: number) {
  return MONTHS[month - 1].short;
}

function monthLong(month: number) {
  return MONTHS[month - 1].long;
}

function buildYearPairs(): DatePairSeo[] {
  const years = Array.from({ length: 12 }, (_, i) => CURRENT_YEAR - 5 + i);
  const pairs: DatePairSeo[] = [];

  for (let i = 0; i < years.length; i++) {
    for (let j = i + 1; j < years.length; j++) {

      const startYear = years[i];
      const endYear = years[j];

      pairs.push({
        slug: `${startYear}-and-${endYear}`,
        category: "year",
        title: `Days between ${startYear} and ${endYear}`,
        intro: `See how many days fall between the start of ${startYear} and the start of ${endYear}.`,
        start: {
          year: startYear,
          month: 1,
          day: 1,
          label: `January 1, ${startYear}`,
        },
        end: {
          year: endYear,
          month: 1,
          day: 1,
          label: `January 1, ${endYear}`,
        },
      });

    }
  }

  return pairs;
}

function buildMonthPairs(): DatePairSeo[] {
  const pairs: DatePairSeo[] = [];

  for (let month = 1; month <= 12; month++) {

    const endDay = lastDayOfMonth(CURRENT_YEAR, month);

    pairs.push({
      slug: `${monthShort(month)}-1-and-${monthShort(month)}-${endDay}`,
      category: "month",
      title: `Days between ${monthLong(month)} 1 and ${monthLong(month)} ${endDay}`,
      intro: `See the number of days between the first and last day of ${monthLong(month)} ${CURRENT_YEAR}.`,
      start: {
        year: CURRENT_YEAR,
        month,
        day: 1,
        label: `${monthLong(month)} 1, ${CURRENT_YEAR}`,
      },
      end: {
        year: CURRENT_YEAR,
        month,
        day: endDay,
        label: `${monthLong(month)} ${endDay}, ${CURRENT_YEAR}`,
      },
    });

  }

  return pairs;
}

function buildHolidayPairs(): DatePairSeo[] {

  const pairs: DatePairSeo[] = [];

  for (let i = 0; i < HOLIDAYS.length; i++) {
    for (let j = i + 1; j < HOLIDAYS.length; j++) {

      const start = HOLIDAYS[i];
      const end = HOLIDAYS[j];

      pairs.push({
        slug: `${start.slug}-and-${end.slug}`,
        category: "holiday",
        title: `Days between ${start.label} and ${end.label}`,
        intro: `See how many days are between ${start.label} and ${end.label} in ${CURRENT_YEAR}.`,
        start: {
          year: CURRENT_YEAR,
          month: start.month,
          day: start.day,
          label: `${start.label}, ${CURRENT_YEAR}`,
        },
        end: {
          year: CURRENT_YEAR,
          month: end.month,
          day: end.day,
          label: `${end.label}, ${CURRENT_YEAR}`,
        },
      });

    }
  }

  return pairs;
}

/* NEW — month to month SEO pages */

function buildMonthToMonthPairs(): DatePairSeo[] {

  const pairs: DatePairSeo[] = [];

  for (let i = 1; i <= 12; i++) {
    for (let j = i + 1; j <= 12; j++) {

      pairs.push({
        slug: `${monthShort(i)}-1-and-${monthShort(j)}-1`,
        category: "monthpair",
        title: `Days between ${monthLong(i)} 1 and ${monthLong(j)} 1`,
        intro: `Calculate how many days fall between the start of ${monthLong(i)} and the start of ${monthLong(j)}.`,
        start: {
          year: CURRENT_YEAR,
          month: i,
          day: 1,
          label: `${monthLong(i)} 1, ${CURRENT_YEAR}`,
        },
        end: {
          year: CURRENT_YEAR,
          month: j,
          day: 1,
          label: `${monthLong(j)} 1, ${CURRENT_YEAR}`,
        },
      });

    }
  }

  return pairs;
}

export const DATE_PAIRS_SEO: DatePairSeo[] = [
  ...buildYearPairs(),
  ...buildMonthPairs(),
  ...buildHolidayPairs(),
  ...buildMonthToMonthPairs(),
].slice(0, 450);

export const DATE_PAIR_SEO_MAP: Record<string, DatePairSeo> =
  Object.fromEntries(DATE_PAIRS_SEO.map((p) => [p.slug, p]));