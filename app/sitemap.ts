import { MetadataRoute } from "next";
import { EVENTS } from "@/lib/events";
import { DATE_PAIRS } from "@/lib/data/datePairs";
import { DATE_PAIRS_SEO } from "@/lib/data/datePairsSeo";

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

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = "https://whatdayisit.now";
  const now = new Date();
  const currentYear = now.getFullYear();

  const staticRoutes = [
    "",
    "/days-until",
    "/days-between",
    "/born-on",
    "/what-happened-on",
    `/how-many-days-left-in/${currentYear}`,
    `/how-many-weeks-left-in/${currentYear}`,
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const eventPages = Object.keys(EVENTS).map((slug) => ({
    url: `${baseUrl}/days-until/${slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));
const weekNumberPages: MetadataRoute.Sitemap = [];

for (let year = 2020; year <= 2035; year++) {

  weekNumberPages.push({
    url: `${baseUrl}/week-number/${year}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  });

  for (let week = 1; week <= 53; week++) {

    weekNumberPages.push({
      url: `${baseUrl}/week-number/${year}/${week}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    });

  }

}

  const daysBetweenPages = [
    ...DATE_PAIRS,
    ...DATE_PAIRS_SEO,
  ].map((pair) => ({
    url: `${baseUrl}/days-between/${pair.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const bornOnPages: MetadataRoute.Sitemap = [];
  const happenedPages: MetadataRoute.Sitemap = [];
  const daysUntilDatePages: MetadataRoute.Sitemap = [];

  months.forEach((m) => {
    for (let d = 1; d <= m.days; d++) {

      bornOnPages.push({
        url: `${baseUrl}/born-on/${m.name}-${d}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.6,
      });

      happenedPages.push({
        url: `${baseUrl}/what-happened-on/${m.name}-${d}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.6,
      });

      daysUntilDatePages.push({
        url: `${baseUrl}/days-until-date/${m.name}-${d}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.6,
      });

    }
  });

  return [
    ...staticPages,
    ...eventPages,
    ...daysBetweenPages,
    ...bornOnPages,
    ...happenedPages,
    ...daysUntilDatePages,
    ...weekNumberPages,
  ];
}