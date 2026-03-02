import { EVENTS } from "@/lib/events";

export default function sitemap() {
  const baseUrl = "https://whatdayisit.now";
  const currentYear = new Date().getFullYear();

  const urls: {
    url: string;
    lastModified: Date;
  }[] = [];

  // Homepage
  urls.push({
    url: `${baseUrl}`,
    lastModified: new Date(),
  });

  // Core pages
  urls.push({
    url: `${baseUrl}/days-until`,
    lastModified: new Date(),
  });

  urls.push({
    url: `${baseUrl}/how-many-days-left-in/${currentYear}`,
    lastModified: new Date(),
  });

  urls.push({
    url: `${baseUrl}/how-many-weeks-left-in/${currentYear}`,
    lastModified: new Date(),
  });

  // Event pages + year pages
  Object.keys(EVENTS).forEach((slug) => {
    urls.push({
      url: `${baseUrl}/days-until/${slug}`,
      lastModified: new Date(),
    });

    urls.push({
      url: `${baseUrl}/days-until/${slug}/${currentYear}`,
      lastModified: new Date(),
    });

    urls.push({
      url: `${baseUrl}/days-until/${slug}/${currentYear + 1}`,
      lastModified: new Date(),
    });
  });

  // 365 static month/day pages
  for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= 31; day++) {
      urls.push({
        url: `${baseUrl}/days-until-date/${month}/${day}`,
        lastModified: new Date(),
      });
    }
  }

  return urls;
}