export const EVENTS: Record<
  string,
  { name: string; month: number; day: number }
> = {
  christmas: { name: "Christmas", month: 12, day: 25 },
  "new-year": { name: "New Year", month: 1, day: 1 },
  halloween: { name: "Halloween", month: 10, day: 31 },
  thanksgiving: { name: "Thanksgiving", month: 11, day: 28 },
  easter: { name: "Easter", month: 3, day: 31 },

  "valentines-day": { name: "Valentine's Day", month: 2, day: 14 },
  "independence-day": { name: "Independence Day", month: 7, day: 4 },
  "black-friday": { name: "Black Friday", month: 11, day: 29 },
  "cyber-monday": { name: "Cyber Monday", month: 12, day: 2 },
  "mothers-day": { name: "Mother's Day", month: 5, day: 12 },
  "fathers-day": { name: "Father's Day", month: 6, day: 16 },
  "labor-day": { name: "Labor Day", month: 9, day: 2 },
  "veterans-day": { name: "Veterans Day", month: 11, day: 11 },
  "memorial-day": { name: "Memorial Day", month: 5, day: 27 },
  "st-patricks-day": { name: "St. Patrick's Day", month: 3, day: 17 },
  "april-fools-day": { name: "April Fool's Day", month: 4, day: 1 },
  "groundhog-day": { name: "Groundhog Day", month: 2, day: 2 },
  "cinco-de-mayo": { name: "Cinco de Mayo", month: 5, day: 5 },
  "new-years-eve": { name: "New Year's Eve", month: 12, day: 31 },
  "super-bowl": { name: "Super Bowl", month: 2, day: 11 },
  "earth-day": { name: "Earth Day", month: 4, day: 22 },
  "tax-day": { name: "Tax Day", month: 4, day: 15 },
};