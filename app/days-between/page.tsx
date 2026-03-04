import { Suspense } from "react"
import DateCalculatorsLink from "@/components/DateCalculatorsLink"
import TodayTools from "@/components/TodayTools"
import RelatedDateTools from "@/components/RelatedDateTools"
import Calculator from "./Calculator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Days Between Dates Calculator",
  description:
    "Calculate the exact number of days between two dates instantly. Includes inclusive counting and weeks + days breakdown.",
  alternates: {
    canonical: "/days-between",
  },
  openGraph: {
    title: "Days Between Dates Calculator",
    description:
      "Find the exact number of days between two calendar dates instantly.",
    url: "/days-between",
    type: "website",
  },
}

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
          "By default the calculation excludes the start date. Enabling inclusive counting includes both dates.",
      },
    },
  ],
}

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
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
}

export default function Page() {

  const year = new Date().getFullYear()

  const examples = [
    {
      label: "Days between January 1 and December 31",
      url: `/days-between?start=${year}-01-01&end=${year}-12-31`,
    },
    {
      label: "Days between January 1 and Christmas",
      url: `/days-between?start=${year}-01-01&end=${year}-12-25`,
    },
    {
      label: "Days between July 4 and New Year's Eve",
      url: `/days-between?start=${year}-07-04&end=${year}-12-31`,
    },
    {
      label: "Days between Valentine's Day and Christmas",
      url: `/days-between?start=${year}-02-14&end=${year}-12-25`,
    },
  ]

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

      <h1 style={{ fontSize: 36, fontWeight: 800 }}>
        Days Between Dates
      </h1>

      <p style={{ marginTop: 10, lineHeight: 1.6 }}>
        Use this calculator to quickly determine the exact number of days
        between two calendar dates.
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
              <a href={ex.url}>{ex.label}</a>
            </li>
          ))}
        </ul>

      </section>

      <section style={{ marginTop: 40 }}>
        <h2>How the calculator works</h2>

        <p>
          The calculator subtracts the start date from the end date to determine
          the total number of calendar days between them.
        </p>

        <p>
          You can optionally enable inclusive counting to include both the
          start and end date.
        </p>

      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Related date calculators</h2>

        <ul>
          <li>
            <a href="/days-until-date">Days Until Date</a>
          </li>
          <li>
            <a href="/day-of-year">Day of Year</a>
          </li>
          <li>
            <a href="/days-left-in-year">Days Left in Year</a>
          </li>
          <li>
            <a href="/how-many-days-in-a-year">How Many Days in a Year</a>
          </li>
        </ul>

      </section>

      <RelatedDateTools />

      <DateCalculatorsLink />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />

    </main>
  )
}