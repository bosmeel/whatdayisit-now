import { EVENTS } from "@/lib/events";
import { DATE_PAIRS } from "@/lib/data/datePairs";
import { generateDatePages } from "@/lib/data/datePages";

export default function sitemap() {

  const baseUrl = "https://whatdayisit.now";
  const now = new Date();
  const currentYear = now.getFullYear();

  const staticRoutes = [
    "",
    "/days-until",
    "/days-between",
    "/days-left-in-year",
    "/days-since",
    "/weeks-between",
    "/months-between",
    "/years-between",
    "/age-calculator",
    "/week-number",
    "/what-day-is-it",
    "/what-week-is-it",
    "/year-progress",
    "/what-is-a-leap-year",
    `/how-many-days-left-in/${currentYear}`,
    `/how-many-weeks-left-in/${currentYear}`,
    "/privacy-policy",
    "/terms",
    "/contact",
    "/about",
  ];

  const staticEntries = staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changefreq: "daily" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const eventRoutes = Object.keys(EVENTS).flatMap((slug) => {

    const baseEvent = {
      url: `${baseUrl}/days-until/${slug}`,
      lastModified: now,
      changefreq: "daily" as const,
      priority: 0.8,
    };

    const yearly = Array.from({ length: 4 }).map((_, i) => {
      const year = currentYear + i;

      return {
        url: `${baseUrl}/days-until/${slug}/${year}`,
        lastModified: now,
        changefreq: "daily" as const,
        priority: 0.6,
      };
    });

    return [baseEvent, ...yearly];
  });

  const daysBetweenRoutes = DATE_PAIRS.map((p) => ({
    url: `${baseUrl}/days-between/${p.slug}`,
    lastModified: now,
    changefreq: "weekly" as const,
    priority: 0.6,
  }));

  const datePages = generateDatePages(2020,2030);

  const whatDayIsRoutes = datePages.map((p) => ({
    url: `${baseUrl}/what-day-is/${p.slug}`,
    lastModified: now,
    changefreq: "yearly" as const,
    priority: 0.4,
  }));

  return [
    ...staticEntries,
    ...eventRoutes,
    ...daysBetweenRoutes,
    ...whatDayIsRoutes
  ];

}