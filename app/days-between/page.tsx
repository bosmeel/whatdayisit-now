import { Suspense } from "react";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

import DateCalculatorsLink from "@/components/DateCalculatorsLink";
import TodayTools from "@/components/TodayTools";
import RelatedDateTools from "@/components/RelatedDateTools";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Days Between Dates Calculator",
  description:
    "Calculate the exact number of days between two dates instantly. Includes inclusive counting and weeks and days breakdown.",
  alternates: {
    canonical: "/days-between",
  },
  openGraph: {
    title: "Days Between Dates Calculator",
    description:
      "Find the exact number of days between two calendar dates instantly.",
    url: "https://whatdayisit.now/days-between",
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you calculate days between two dates?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The calculator subtracts the start date from the end date and returns the number of calendar days between them.",
      },
    },
    {
      "@type": "Question",
      name: "Does the calculator include both dates?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "By default the calculation excludes the start date. Enabling inclusive counting includes both the start and end date.",
      },
    },
  ],
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Days Between Dates Calculator",
  applicationCategory: "CalculatorApplication",
  operatingSystem: "Any",
  url: "https://whatdayisit.now/days-between",
  description:
    "Online calculator that determines the exact number of days between two dates.",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Calculate days between two dates",
    "Inclusive date counting",
    "Weeks and days breakdown",
  ],
};

export default function Page() {
  const examples = [
    {
      label: "Days between January 1 and December 31",
      url: `/days-between/january-1-and-december-31`,
    },
    {
      label: "Days between January 1 and Christmas",
      url: `/days-between/january-1-and-christmas`,
    },
    {
      label: "Days between July 4 and New Year's Eve",
      url: `/days-between/july-4-and-new-year`,
    },
    {
      label: "Days between Valentine's Day and Christmas",
      url: `/days-between/valentines-day-and-christmas`,
    },
  ];

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>
        Days Between Dates Calculator
      </h1>

      <p style={{ marginTop: 10, lineHeight: 1.6 }}>
        Use this calculator to quickly determine the exact number of days
        between two calendar dates. Simply choose a start date and end date
        to calculate the difference instantly.
      </p>

      <TodayTools />

      <section style={{ marginTop: 30 }}>
        <Suspense fallback={null}>
          <Calculator />
        </Suspense>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Example calculations</h2>

        <ul>
          {examples.map((ex) => (
            <li key={ex.url}>
              <Link href={ex.url}>{ex.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Popular date comparisons</h2>

        <ul>
          <li>
            <Link href="/days-between/january-1-and-december-31">
              Days between January 1 and December 31
            </Link>
          </li>

          <li>
            <Link href="/days-between/january-1-and-christmas">
              Days between January 1 and Christmas
            </Link>
          </li>

          <li>
            <Link href="/days-between/valentines-day-and-christmas">
              Days between Valentine's Day and Christmas
            </Link>
          </li>

          <li>
            <Link href="/days-between/halloween-and-christmas">
              Days between Halloween and Christmas
            </Link>
          </li>

          <li>
            <Link href="/days-between/july-4-and-new-year">
              Days between July 4 and New Year
            </Link>
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>How the calculator works</h2>

        <p>
          The calculator subtracts the start date from the end date to determine
          the total number of calendar days between them.
        </p>

        <p>
          You can optionally enable inclusive counting to include both the start
          and end date when calculating the difference.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Related date calculators</h2>

        <ul>
          <li>
            <Link href="/days-until">Days Until Date</Link>
          </li>

          <li>
            <Link href="/days-since">Days Since Date</Link>
          </li>

          <li>
            <Link href="/day-of-year">Day of Year</Link>
          </li>

          <li>
            <Link href="/days-left-in-year">Days Left in Year</Link>
          </li>

          <li>
            <Link href="/how-many-days-in-a-year">
              How Many Days in a Year
            </Link>
          </li>
        </ul>
      </section>

      <RelatedDateTools />

      <DateCalculatorsLink />

      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Script
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
    </main>
  );
}