export type EventItem = {
  name: string;
  month: number;
  day: number;
};

export const EVENTS: Record<string, EventItem> = {

  /* CORE HOLIDAYS */

  "new-year": { name: "New Year", month: 1, day: 1 },
  "valentines-day": { name: "Valentine's Day", month: 2, day: 14 },
  "st-patricks-day": { name: "St. Patrick's Day", month: 3, day: 17 },
  easter: { name: "Easter", month: 3, day: 31 },
  "april-fools-day": { name: "April Fool's Day", month: 4, day: 1 },
  "earth-day": { name: "Earth Day", month: 4, day: 22 },
  "cinco-de-mayo": { name: "Cinco de Mayo", month: 5, day: 5 },
  "mothers-day": { name: "Mother's Day", month: 5, day: 12 },
  "memorial-day": { name: "Memorial Day", month: 5, day: 27 },
  "fathers-day": { name: "Father's Day", month: 6, day: 16 },
  juneteenth: { name: "Juneteenth", month: 6, day: 19 },
  "independence-day": { name: "Independence Day", month: 7, day: 4 },
  "labor-day": { name: "Labor Day", month: 9, day: 2 },
  halloween: { name: "Halloween", month: 10, day: 31 },
  thanksgiving: { name: "Thanksgiving", month: 11, day: 28 },
  "black-friday": { name: "Black Friday", month: 11, day: 29 },
  "cyber-monday": { name: "Cyber Monday", month: 12, day: 2 },
  "christmas-eve": { name: "Christmas Eve", month: 12, day: 24 },
  christmas: { name: "Christmas", month: 12, day: 25 },
  "new-years-eve": { name: "New Year's Eve", month: 12, day: 31 },

  /* SEASONS */

  "first-day-of-spring": { name: "First Day of Spring", month: 3, day: 20 },
  "first-day-of-summer": { name: "First Day of Summer", month: 6, day: 21 },
  "first-day-of-fall": { name: "First Day of Fall", month: 9, day: 22 },
  "first-day-of-winter": { name: "First Day of Winter", month: 12, day: 21 },

  /* SHOPPING / CULTURE */

  "prime-day": { name: "Amazon Prime Day", month: 7, day: 15 },
  "christmas-shopping-season": { name: "Christmas Shopping Season", month: 12, day: 1 },

  /* SCHOOL / LIFE EVENTS */

  "back-to-school": { name: "Back to School", month: 8, day: 15 },
  "first-day-of-school": { name: "First Day of School", month: 9, day: 1 },
  graduation: { name: "Graduation Day", month: 6, day: 1 },
  "summer-break": { name: "Summer Break", month: 6, day: 10 },
  "winter-break": { name: "Winter Break", month: 12, day: 20 },

  /* US HOLIDAYS / CIVIC */

  "groundhog-day": { name: "Groundhog Day", month: 2, day: 2 },
  "presidents-day": { name: "Presidents' Day", month: 2, day: 19 },
  "martin-luther-king-day": { name: "Martin Luther King Jr. Day", month: 1, day: 15 },
  "tax-day": { name: "Tax Day", month: 4, day: 15 },
  "flag-day": { name: "Flag Day", month: 6, day: 14 },
  "columbus-day": { name: "Columbus Day", month: 10, day: 14 },
  "indigenous-peoples-day": { name: "Indigenous Peoples' Day", month: 10, day: 14 },
  "veterans-day": { name: "Veterans Day", month: 11, day: 11 },
  "veterans-eve": { name: "Veterans Day Eve", month: 11, day: 10 },

  /* SPORTS */

  "super-bowl": { name: "Super Bowl", month: 2, day: 11 },

};