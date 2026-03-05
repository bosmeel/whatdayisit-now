import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = "https://whatdayisit.now";

  const staticPages = [

    "",
    "/date-calculators",

    "/days-between",
    "/days-until",
    "/days-since",

    "/weeks-between",
    "/months-between",
    "/years-between",

    "/day-of-year",
    "/days-left-in-year",
    "/how-many-days-in-a-year",

  ];

  const now = new Date();

  const routes = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  return routes;
}