import { Suspense } from "react";
import type { Metadata } from "next";
import DateCalculatorsLink from "@/components/DateCalculatorsLink";
import TodayTools from "@/components/TodayTools";
import RelatedDateTools from "@/components/RelatedDateTools";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Days Since Date Calculator",
  description: "Calculate how many days have passed since a date.",
  alternates: { canonical: "/days-since" },
  openGraph: {
    title: "Days Since Date Calculator",
    description: "Find the number of days since a past date.",
    url: "/days-since",
    type: "website",
  },
};

export default function Page() {
  const year = new Date().getFullYear();
  const examples = [
    { label: "Days since January 1", url: `/days-since?date=${year}-01-01` },
    { label: "Days since 2000-01-01", url: `/days-since?date=2000-01-01` },
    { label: "Days since Christmas", url: `/days-since?date=${year}-12-25` },
  ];

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>Days Since Date</h1>
      <p style={{ marginTop: 10, lineHeight: 1.6 }}>
        Use this calculator to determine how many days have passed since a specific date.
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

      <RelatedDateTools />
      <DateCalculatorsLink />
    </main>
  );
}
