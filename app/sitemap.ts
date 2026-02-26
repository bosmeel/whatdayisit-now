import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://whatdayisit.now";

  const staticPages = [
    "",
    "/week-number",
    "/day-of-year",
    "/days-left-in-year",
    "/year-progress",
    "/days-until-weekend",
  ];

  const staticUrls = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  // Generate date pages (2000–2035)
  const startYear = 2000;
  const endYear = 2035;

  const dateUrls: MetadataRoute.Sitemap = [];

  for (let year = startYear; year <= endYear; year++) {
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const slug = date.toISOString().split("T")[0];

        dateUrls.push({
          url: `${baseUrl}/date/${slug}`,
          lastModified: new Date(),
        });
      }
    }
  }

  return [...staticUrls, ...dateUrls];
}