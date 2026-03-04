export function parseBetweenSlug(slug: string) {

  const parts = slug.split("-and-");

  if (parts.length !== 2) return null;

  const date1 = parseDate(parts[0]);
  const date2 = parseDate(parts[1]);

  if (!date1 || !date2) return null;

  return { date1, date2 };
}

function parseDate(value: string): Date | null {

  if (value === "today") {
    return new Date();
  }

  if (value === "christmas") {
    const year = new Date().getFullYear();
    return new Date(`${year}-12-25`);
  }

  if (value === "new-year") {
    const year = new Date().getFullYear();
    return new Date(`${year}-01-01`);
  }

  const months: Record<string, number> = {
    jan:1,feb:2,mar:3,apr:4,may:5,jun:6,
    jul:7,aug:8,sep:9,oct:10,nov:11,dec:12
  };

  const parts = value.split("-");

  if (parts.length !== 2) return null;

  const month = months[parts[0]];
  const day = Number(parts[1]);

  if (!month || !day) return null;

  const year = new Date().getFullYear();

  return new Date(`${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`);
}