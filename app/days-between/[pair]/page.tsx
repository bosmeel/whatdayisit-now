import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { DATE_PAIRS, getDatePairBySlug } from "@/lib/data/datePairs";

type Props = {
  params: Promise<{
    pair: string;
  }>;
};

function daysBetweenDates(start: Date, end: Date) {
  const diff = end.getTime() - start.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export async function generateStaticParams() {
  return DATE_PAIRS.map((p) => ({
    pair: p.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { pair } = await params;
  const data = getDatePairBySlug(pair);

  if (!data) {
    return { title: "Days Between Dates" };
  }

  const title = `Days Between ${data.label}`;
  const description = `Find out how many days are between ${data.label}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://whatdayisit.now/days-between/${data.slug}`,
    },
  };
}

function getRelatedPairs(currentSlug: string) {
  const sorted = [...DATE_PAIRS].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  const others = sorted.filter((p) => p.slug !== currentSlug);
  return others.slice(0, 8);
}

export default async function Page({ params }: Props) {
  const { pair: pairSlug } = await params;

  const pair = getDatePairBySlug(pairSlug);
  if (!pair) notFound();

  let days = 0;

  if (pair.kind === "md-md") {
    const year = new Date().getFullYear();
    const start = new Date(year, pair.start.month - 1, pair.start.day);
    const end = new Date(year, pair.end.month - 1, pair.end.day);
    days = daysBetweenDates(start, end);
  } else {
    const start = new Date(pair.startYear, 0, 1);
    const end = new Date(pair.endYear, 0, 1);
    days = daysBetweenDates(start, end);
  }

  const related = getRelatedPairs(pair.slug);

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `Days Between ${pair.label}`,
    applicationCategory: "CalculatorApplication",
    description: `Calculate how many days are between ${pair.label}.`,
    url: `https://whatdayisit.now/days-between/${pair.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How many days are between ${pair.label}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `There are ${days} days between ${pair.label}.`,
        },
      },
      {
        "@type": "Question",
        name: "How is the number of days calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The calculation counts the total calendar days between the start date and the end date.",
        },
      },
    ],
  };

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>

      <Script
        id="jsonld-days-between"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />

      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <h1>Days Between {pair.label}</h1>

      <p>
        There are <strong>{days}</strong> days between {pair.label}.
      </p>

      <p>
        Want to calculate another date range?  
        <Link href="/days-between"> Try another days-between calculation</Link>.
      </p>

      <h2>How the calculation works</h2>

      <p>
        The days between calculation counts the total number of calendar days
        from the start date to the end date.
      </p>

      <p>
        This is commonly used for planning events, project timelines,
        travel planning, and tracking deadlines.
      </p>

      <hr style={{ margin: "28px 0" }} />

      <h2>Other date calculators</h2>

      <ul>
        <li><Link href="/days-since">Days Since Calculator</Link></li>
        <li><Link href="/weeks-between">Weeks Between Dates</Link></li>
        <li><Link href="/months-between">Months Between Dates</Link></li>
        <li><Link href="/years-between">Years Between Dates</Link></li>
        <li><Link href="/age-calculator">Age Calculator</Link></li>
      </ul>

      <hr style={{ margin: "28px 0" }} />

      <h2>Related calculations</h2>

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