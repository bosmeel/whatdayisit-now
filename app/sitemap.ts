import { EVENTS } from "@/lib/events";
import { POPULAR_COMBINATIONS } from "@/lib/programmaticDaysBetween";
import { POPULAR_DAYS_SINCE } from "@/lib/programmaticDaysSince";
import { POPULAR_DATES } from "@/lib/popularDates";

export default function sitemap() {
  const baseUrl = "https://whatdayisit.now";
  const now = new Date();
  const currentYear = now.getFullYear();

  const staticRoutes = [
    "",
    "/date-calculators",

    "/days-between",
    "/days-until",
    "/days-since",

    "/weeks-between",
    "/months-between",
    "/years-between",
    "/business-days-between",
    "/age-calculator",

    "/day-of-year",
    "/days-left-in-year",
    "/how-many-days-in-a-year",

    `/how-many-days-left-in/${currentYear}`,
    `/how-many-weeks-left-in/${currentYear}`,
  ];

  const eventRoutes = Object.keys(EVENTS).flatMap((slug) => {
    const baseEvent = {
      url: `${baseUrl}/days-until/${slug}`,
      lastModified: now,
      changefreq: "daily" as const,
      priority: 0.7,
    };

    const yearVariants = Array.from({ length: 6 }).map((_, i) => ({
      url: `${baseUrl}/days-until/${slug}/${currentYear + i}`,
      lastModified: now,
      changefreq: "daily" as const,
      priority: 0.6,
    }));

    return [baseEvent, ...yearVariants];
  });

  const programmaticBetween = POPULAR_COMBINATIONS.map((slug) => ({
    url: `${baseUrl}/days-between/${slug}`,
    lastModified: now,
    changefreq: "daily" as const,
    priority: 0.6,
  }));

  const programmaticSince = POPULAR_DAYS_SINCE.map((slug) => ({
    url: `${baseUrl}/days-since/${slug}`,
    lastModified: now,
    changefreq: "daily" as const,
    priority: 0.5,
  }));

  const programmaticUntilDates = POPULAR_DATES.map(({ month, day }) => ({
    url: `${baseUrl}/days-until/${month}/${day}`,
    lastModified: now,
    changefreq: "daily" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes.map((route, index) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changefreq: "daily" as const,
      priority: index === 0 ? 1 : 0.8,
    })),
    ...eventRoutes,
    ...programmaticBetween,
    ...programmaticSince,
    ...programmaticUntilDates,
  ];
}
