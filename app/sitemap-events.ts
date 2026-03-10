import { MetadataRoute } from "next";
import { EVENTS } from "@/lib/events";

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = "https://whatdayisit.now";
  const now = new Date().toISOString();

  return Object.keys(EVENTS).map((slug) => ({
    url: `${baseUrl}/days-until/${slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

}