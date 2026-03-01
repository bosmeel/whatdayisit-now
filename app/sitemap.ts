import { EVENTS } from "@/lib/events";

export default function sitemap() {
  const baseUrl = "https://whatdayisit.now";
  const currentYear = new Date().getFullYear();

  const staticRoutes = [
    "",
    "/days-until",
    `/how-many-days-left-in/${currentYear}`,
    `/how-many-weeks-left-in/${currentYear}`,
  ];

  const eventRoutes = Object.keys(EVENTS).flatMap((slug) => [
    {
      url: `${baseUrl}/days-until/${slug}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/days-until/${slug}/${currentYear}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/days-until/${slug}/${currentYear + 1}`,
      lastModified: new Date(),
    },
  ]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...eventRoutes,
  ];
}