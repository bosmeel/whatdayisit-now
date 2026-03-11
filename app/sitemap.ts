import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = "https://whatdayisit.now";
  const now = new Date();

  return [
    {
      url: `${baseUrl}/sitemap-core`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/sitemap-events`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/sitemap-dates`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/sitemap-weeks`,
      lastModified: now,
    },
  ];
}