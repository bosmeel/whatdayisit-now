import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DATE_PAIRS } from "@/lib/data/datePairs";
import Link from "next/link";
import Script from "next/script";

type Props = {
  params: Promise<{ pair: string }>;
};

function findPair(slug: string) {
  return DATE_PAIRS.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const data = findPair(pair);

  if (!data) return {};

  const title = `Days Between ${data.label}`;
  const description = `Calculate the number of days between ${data.label}. Free online days between dates calculator.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://whatdayisit.now/days-between/${data.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://whatdayisit.now/days-between/${data.slug}`,
      siteName: "WhatDayIsIt.now",
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return DATE_PAIRS.map((pair) => ({
    pair: pair.slug,
  }));
}

export default async function DaysBetweenPairPage({ params }: Props) {
  const { pair } = await params;
  const data = findPair(pair);

  if (!data) {
    notFound();
  }

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `Days Between ${data.label}`,
    applicationCategory: "CalculatorApplication",
    operatingSystem: "Any",
    url: `https://whatdayisit.now/days-between/${data.slug}`,
    description: `Calculator for the number of days between ${data.label}.`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How many days between ${data.label}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Use this calculator to find the number of days between ${data.label}.`,
        },
      },
      {
        "@type": "Question",
        name: "How many weeks are between these dates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The number of weeks can be calculated by dividing the total days by 7.",
        },
      },
      {
        "@type": "Question",
        name: "How many months are between these dates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The number of months depends on the exact calendar dates and month lengths.",
        },
      },
    ],
  };

  const related = DATE_PAIRS.filter((p) => p.slug !== data.slug).slice(0, 8);

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <Script
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1>Days Between {data.label}</h1>

      <p>
        This page calculates the number of days between{" "}
        <strong>{data.label}</strong>.
      </p>

      <p style={{ marginTop: 20 }}>
        Use our main calculator if you want to compare custom dates.
      </p>

      <p style={{ marginTop: 20 }}>
        <Link href="/days-between">
          ← Back to days between calculator
        </Link>
      </p>

      <h2 style={{ marginTop: 50 }}>Popular date comparisons</h2>

      <ul style={{ lineHeight: 1.9 }}>
        {related.map((p) => (
          <li key={p.slug}>
            <Link href={`/days-between/${p.slug}`}>
              Days between {p.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}