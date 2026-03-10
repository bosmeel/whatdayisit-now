import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = "https://whatdayisit.now";
  const now = new Date().toISOString();

  const pages: MetadataRoute.Sitemap = [];

  for (let year = 2020; year <= 2035; year++) {

    pages.push({
      url: `${baseUrl}/week-number/${year}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    });

    for (let week = 1; week <= 53; week++) {
      pages.push({
        url: `${baseUrl}/week-number/${year}/${week}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.7,
      });
    }

  }

  return pages;

}