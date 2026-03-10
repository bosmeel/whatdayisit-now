import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = "https://whatdayisit.now";
  const now = new Date().toISOString();
  const currentYear = new Date().getFullYear();

  const routes = [
    "",
    "/days-until",
    "/days-between",
    "/days-since",
    "/weeks-between",
    "/months-between",
    "/years-between",
    "/business-days-between",
    "/age-calculator",
    "/born-on",
    "/what-happened-on",
    "/calendar",
    `/how-many-days-left-in/${currentYear}`,
    `/how-many-weeks-left-in/${currentYear}`,
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.9,
  }));

}