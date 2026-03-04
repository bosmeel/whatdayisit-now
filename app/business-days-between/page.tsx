import { Suspense } from "react";
import type { Metadata } from "next";
import DateCalculatorsLink from "@/components/DateCalculatorsLink";
import TodayTools from "@/components/TodayTools";
import RelatedDateTools from "@/components/RelatedDateTools";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Business Days Between Dates Calculator",
  description: "Calculate the number of business days between two dates (excludes weekends).",
  alternates: { canonical: "/business-days-between" },
};

export default function Page() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 800 }}>Business Days Between Dates</h1>
      <p style={{ marginTop: 10, lineHeight: 1.6 }}>
        Calculate how many business days (weekdays) are between two dates.
      </p>

      <TodayTools />

      <section style={{ marginTop: 30 }}>
        <Suspense fallback={null}>
          <Calculator />
        </Suspense>
      </section>

      <RelatedDateTools />
      <DateCalculatorsLink />
    </main>
  );
}
