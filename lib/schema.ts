type YearSchemaConfig = {
  metricLabel: string;
  basePath: string;
  year: number;
  value: string | number;
};

export function buildYearSchemas(config: YearSchemaConfig) {
  const baseUrl = "https://whatdayisit.now";
  const fullUrl = `${baseUrl}/${config.basePath}/${config.year}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How many ${config.metricLabel} are left in ${config.year}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `There are ${config.value} ${config.metricLabel} left in ${config.year}.`,
        },
      },
      {
        "@type": "Question",
        name: "Does this update automatically?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. The remaining amount is calculated daily based on the current date.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name:
          config.metricLabel === "days"
            ? "Days left"
            : "Weeks left",
        item: `${baseUrl}/${config.basePath}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${config.year}`,
        item: fullUrl,
      },
    ],
  };

  return { faqSchema, breadcrumbSchema };
}