type Target = {
  slug: string;
  label: string;
  month: number;
  day: number;
  priority?: number;
};

export const DATE_TARGETS: Target[] = [
  /* 🔥 HIGH INTENT (top traffic) */

  { slug: "christmas", label: "Christmas", month: 12, day: 25, priority: 10 },
  { slug: "new-year", label: "New Year", month: 1, day: 1, priority: 10 },
  { slug: "halloween", label: "Halloween", month: 10, day: 31, priority: 10 },
  {
    slug: "valentines-day",
    label: "Valentine's Day",
    month: 2,
    day: 14,
    priority: 9,
  },
  {
    slug: "black-friday",
    label: "Black Friday",
    month: 11,
    day: 29,
    priority: 9,
  },

  /* 🇺🇸 US HOLIDAYS */

  { slug: "independence-day", label: "Independence Day", month: 7, day: 4 },
  { slug: "veterans-day", label: "Veterans Day", month: 11, day: 11 },
  { slug: "labor-day", label: "Labor Day", month: 9, day: 2 }, // approx
  { slug: "memorial-day", label: "Memorial Day", month: 5, day: 27 }, // approx
  { slug: "thanksgiving", label: "Thanksgiving", month: 11, day: 28 }, // approx

  /* 🌍 GLOBAL */

  { slug: "new-years-eve", label: "New Year's Eve", month: 12, day: 31 },
  { slug: "april-fools", label: "April Fools' Day", month: 4, day: 1 },
  { slug: "earth-day", label: "Earth Day", month: 4, day: 22 },
  { slug: "mothers-day", label: "Mother's Day", month: 5, day: 12 }, // approx
  { slug: "fathers-day", label: "Father's Day", month: 6, day: 16 }, // approx

  /* 🎓 LIFE EVENTS */

  { slug: "summer", label: "Start of Summer", month: 6, day: 21 },
  { slug: "winter", label: "Start of Winter", month: 12, day: 21 },
  { slug: "spring", label: "Start of Spring", month: 3, day: 20 },
  { slug: "autumn", label: "Start of Autumn", month: 9, day: 22 },

  /* 🎯 RANDOM HIGH SEARCH */

  { slug: "my-birthday", label: "My Birthday", month: 1, day: 1 },
  { slug: "weekend", label: "Next Weekend", month: 1, day: 6 },

  /* 📅 MONTH STARTS */

  { slug: "next-month", label: "Next Month", month: 1, day: 1 },
  { slug: "end-of-year", label: "End of Year", month: 12, day: 31 },
];
