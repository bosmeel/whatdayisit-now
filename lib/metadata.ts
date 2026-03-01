type YearMetadataConfig = {
  metricLabel: string;          // "days" / "weeks"
  basePath: string;             // "how-many-days-left-in"
  descriptionTemplate?: string; // optional override
};

export function buildYearMetadata(config: YearMetadataConfig) {
  return async function generateMetadata(
    { params }: { params: Promise<{ year: string }> }
  ) {
    const { year } = await params;
    const numericYear = Number(year);

    const baseUrl = "https://whatdayisit.now";
    const fullUrl = `${baseUrl}/${config.basePath}/${numericYear}`;

    const title = `How many ${config.metricLabel} are left in ${numericYear}?`;
    const description =
      config.descriptionTemplate ??
      `See how many ${config.metricLabel} remain in ${numericYear}. Updated automatically.`;

    return {
      title,
      description,
      alternates: {
        canonical: fullUrl,
      },
      openGraph: {
        title,
        description,
        url: fullUrl,
        type: "website",
        images: [
          {
            url: `${fullUrl}/opengraph-image`,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  };
}