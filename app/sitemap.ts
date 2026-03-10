import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = "https://whatdayisit.now";
  const now = new Date().toISOString();

  return [
    {
      url: `${baseUrl}/sitemap-core.xml`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/sitemap-events.xml`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/sitemap-dates.xml`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/sitemap-weeks.xml`,
      lastModified: now,
    },
  ];

}