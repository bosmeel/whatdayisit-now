import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import StickyTimeBar from "@/components/StickyTimeBar";

export const metadata: Metadata = {
  title: "What Day Was I Born?",
  description:
    "Find out what day of the week you were born. Enter your birth date to see if you were born on a Monday, Tuesday, or any other day.",
  alternates: {
    canonical: "https://whatdayisit.now/what-day-was-i-born",
  },
  openGraph: {
    title: "What Day Was I Born?",
    description:
      "Discover what day of the week you were born with this simple calculator.",
    url: "https://whatdayisit.now/what-day-was-i-born",
    siteName: "WhatDayIsIt.now",
    type: "website",
  },
};

type PageProps = {
  searchParams?: Promise<{
    dob?: string;
  }>;
};

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export default async function WhatDayWasIBornPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const dobParam = params.dob ?? "";

  let result:
    | {
        day: string;
        formattedDate: string;
      }
    | null = null;

  let error = "";

  if (dobParam) {
    if (!isValidDate(dobParam)) {
      error = "Enter a valid date.";
    } else {
      const dob = new Date(`${dobParam}T00:00:00`);

      if (Number.isNaN(dob.getTime())) {
        error = "Enter a valid date.";
      } else {
        const day = dob.toLocaleDateString("en-US", {
          weekday: "long",
        });

        const formattedDate = dob.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        result = { day, formattedDate };
      }
    }
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "What Day Was I Born Calculator",
    applicationCategory: "CalculatorApplication",
    operatingSystem: "Web",
    url: "https://whatdayisit.now/what-day-was-i-born",
  };

  return (
    <div>
      <StickyTimeBar />

      <Script
        id="born-day-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Birthday Tools", href: "/" },
          { name: "What Day Was I Born" },
        ]}
      />

      <h1>What Day Was I Born?</h1>

      <p>
        Enter your birth date to find out which day of the week you were born.
      </p>

      <form method="GET" className="calculator">
        <label className="date-label" htmlFor="dob">
          Birth date
        </label>

        <div className="date-input-row">
          <input
            id="dob"
            type="date"
            name="dob"
            defaultValue={dobParam}
            className="date-input"
          />

          <button type="submit">
            Calculate
          </button>
        </div>
      </form>

      {error && (
        <div className="result-box">
          <div className="result-label">{error}</div>
        </div>
      )}

      {result && (
        <div className="result-box">
          <div className="result-number">{result.day}</div>
          <div className="result-label">{result.formattedDate}</div>
        </div>
      )}

      <section style={{ marginTop: 40 }}>
        <h2>About the Birth Day Calculator</h2>

        <p>
          This calculator shows the exact weekday you were born on. Simply
          enter your birth date and the tool will determine whether you were
          born on a Monday, Tuesday, Wednesday, Thursday, Friday, Saturday or
          Sunday.
        </p>

        <p>
          Many people search for their birth weekday out of curiosity, for
          astrology, or to explore interesting patterns in the calendar.
        </p>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Related Tools</h2>

        <ul style={{ lineHeight: 1.8 }}>
          <li>
            <Link href="/birthday-weekday-calculator">
              Birthday Weekday Calculator
            </Link>
          </li>
          <li>
            <Link href="/age-calculator">
              Age Calculator
            </Link>
          </li>
          <li>
            <Link href="/days-between">
              Days Between Dates
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}