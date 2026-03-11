import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";

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

export default async function Page({ searchParams }: PageProps) {

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

    <main className="mx-auto max-w-4xl px-4 py-10">

      <Script
        id="born-day-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <h1 className="text-3xl font-bold mb-4">
        What Day Was I Born?
      </h1>

      <p className="mb-6">
        Enter your birth date to find out which day of the week you were born.
      </p>

      <form method="GET" className="space-y-4 mb-6">

        <input
          type="date"
          name="dob"
          defaultValue={dobParam}
          className="border rounded p-2 w-full"
        />

        <button
          type="submit"
          className="border px-4 py-2 rounded"
        >
          Calculate
        </button>

      </form>

      {error && (

        <div className="border border-red-300 bg-red-50 p-4 mb-6">
          {error}
        </div>

      )}

      {result && (

        <div className="border rounded p-6 mb-6">

          <h2 className="text-xl font-semibold mb-2">
            Your Birth Day
          </h2>

          <p>
            You were born on <strong>{result.day}</strong>.
          </p>

          <p className="mt-2">
            Date: <strong>{result.formattedDate}</strong>
          </p>

        </div>

      )}

      <section className="space-y-4 mb-8">

        <h2 className="text-2xl font-semibold">
          Birth Day Calculator
        </h2>

        <p>
          This calculator shows the exact weekday you were born on. Simply
          enter your birth date and the tool will determine whether you were
          born on a Monday, Tuesday, Wednesday, Thursday, Friday, Saturday or
          Sunday.
        </p>

        <p>
          Many people search for their birth weekday out of curiosity, for
          astrology, or to calculate recurring birthday patterns.
        </p>

      </section>

      <section>

        <h2 className="text-xl font-semibold mb-2">
          Related Tools
        </h2>

        <ul className="list-disc pl-6">

          <li>
            <Link href="/age-calculator">
              Age Calculator
            </Link>
          </li>

          <li>
            <Link href="/birthday-weekday">
              Birthday Weekday Calculator
            </Link>
          </li>

          <li>
            <Link href="/days-between">
              Days Between Dates
            </Link>
          </li>

        </ul>

      </section>

    </main>

  );
}