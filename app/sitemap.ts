import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = "https://whatdayisit.now";
  const now = new Date();

  const routes = [

    "",
    "/date-calculators",

    "/days-between",
    "/days-until",
    "/days-since",

    "/weeks-between",
    "/months-between",
    "/years-between",

    "/day-of-year",
    "/days-left-in-year",
    "/how-many-days-in-a-year",

    "/how-many-days-until-christmas",
    "/how-many-days-until-new-year",
    "/how-many-days-until-halloween",

  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

}