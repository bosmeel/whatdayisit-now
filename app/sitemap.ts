import { EVENTS } from "@/lib/events";

export default function sitemap() {
  const baseUrl = "https://whatdayisit.now";
  const now = new Date();

  // Core pages
  const coreRoutes = [
    "",
    "/days-until",
    "/how-many-days-left-in/2025",
    "/how-many-weeks-left-in/2025",
  ];

  const core = coreRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Event pages
  const events = Object.keys(EVENTS).map((slug) => ({
    url: `${baseUrl}/days-until/${slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...core, ...events];
}