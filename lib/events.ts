export type EventItem = {
  name: string;
  month: number;
  day: number;
};

export const EVENTS: Record<string, EventItem> = {

  christmas: { name: "Christmas", month: 12, day: 25 },

  "new-year": { name: "New Year", month: 1, day: 1 },

  "new-years-eve": { name: "New Year's Eve", month: 12, day: 31 },

  halloween: { name: "Halloween", month: 10, day: 31 },

  thanksgiving: { name: "Thanksgiving", month: 11, day: 28 },

  easter: { name: "Easter", month: 3, day: 31 },

  "valentines-day": { name: "Valentine's Day", month: 2, day: 14 },

  "independence-day": { name: "Independence Day", month: 7, day: 4 },

  "labor-day": { name: "Labor Day", month: 9, day: 2 },

  "memorial-day": { name: "Memorial Day", month: 5, day: 27 },

  "veterans-day": { name: "Veterans Day", month: 11, day: 11 },

  "black-friday": { name: "Black Friday", month: 11, day: 29 },

  "cyber-monday": { name: "Cyber Monday", month: 12, day: 2 },

  "prime-day": { name: "Amazon Prime Day", month: 7, day: 15 },

  "first-day-of-spring": { name: "First Day of Spring", month: 3, day: 20 },

  "first-day-of-summer": { name: "First Day of Summer", month: 6, day: 21 },

  "first-day-of-fall": { name: "First Day of Fall", month: 9, day: 22 },

  "first-day-of-winter": { name: "First Day of Winter", month: 12, day: 21 },

  "back-to-school": { name: "Back to School", month: 8, day: 15 },

  "first-day-of-school": { name: "First Day of School", month: 9, day: 1 },

  graduation: { name: "Graduation Day", month: 6, day: 1 },

  "super-bowl": { name: "Super Bowl", month: 2, day: 11 },

  "st-patricks-day": { name: "St. Patrick's Day", month: 3, day: 17 },

  "april-fools-day": { name: "April Fool's Day", month: 4, day: 1 },

  "cinco-de-mayo": { name: "Cinco de Mayo", month: 5, day: 5 },

  "earth-day": { name: "Earth Day", month: 4, day: 22 },

  "tax-day": { name: "Tax Day", month: 4, day: 15 },

};