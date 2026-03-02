import { EVENTS } from "@/lib/events";

export default function sitemap() {
  const baseUrl = "https://whatdayisit.now";
  const now = new Date();
  const currentYear = now.getFullYear();

  const staticRoutes = [
    "",
    "/days-until",
    `/how-many-days-left-in/${currentYear}`,
    `/how-many-weeks-left-in/${currentYear}`,
  ];

  const eventRoutes = Object.keys(EVENTS).flatMap((slug) => {
    const baseEvent = {
      url: `${baseUrl}/days-until/${slug}`,
      lastModified: now,
      changefreq: "daily" as const,
      priority: 0.7,
    };

    const yearVariants = Array.from({ length: 6 }).map((_, i) => ({
      url: `${baseUrl}/days-until/${slug}/${currentYear + i}`,
      lastModified: now,
      changefreq: "daily" as const,
      priority: 0.6,
    }));

    return [baseEvent, ...yearVariants];
  });

  return [
    ...staticRoutes.map((route, index) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changefreq: "daily" as const,
      priority: index === 0 ? 1 : 0.8,
    })),
    ...eventRoutes,
  ];
}