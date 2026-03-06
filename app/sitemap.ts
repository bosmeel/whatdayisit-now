import { MetadataRoute } from "next";
import { EVENTS } from "@/lib/events";
import { DATE_PAIRS } from "@/lib/data/datePairs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://whatdayisit.now";
  const now = new Date();
  const currentYear = now.getFullYear();

  const staticRoutes = [
    "",
    "/days-until",
    "/days-between",
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

  const eventYearPages = Object.keys(EVENTS).map((slug) => ({
    url: `${baseUrl}/days-until/${slug}-${currentYear}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const daysBetweenHub = {
    url: `${baseUrl}/days-between`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.9,
  };

  const daysBetweenPages = DATE_PAIRS.map((pair) => ({
    url: `${baseUrl}/days-between/${pair.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    daysBetweenHub,
    ...eventPages,
    ...eventYearPages,
    ...daysBetweenPages,
  ];
}