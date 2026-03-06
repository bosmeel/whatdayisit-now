import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Age Calculator – How Old Am I?",
  description:
    "Free age calculator to calculate exact age in years, months, and days from a date of birth.",
  alternates: {
    canonical: "https://whatdayisit.now/age-calculator",
  },
  openGraph: {
    title: "Age Calculator – How Old Am I?",
    description:
      "Free age calculator to calculate exact age in years, months, and days from a date of birth.",
    url: "https://whatdayisit.now/age-calculator",
    siteName: "WhatDayIsIt.now",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Age Calculator – How Old Am I?",
    description:
      "Free age calculator to calculate exact age in years, months, and days from a date of birth.",
  },
};

type PageProps = {
  searchParams?: Promise<{
    dob?: string;
  }>;
};

function isValidDateInput(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function calculateAgeParts(dob: Date, today: Date) {
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    days += daysInPreviousMonth;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

function calculateTotalDays(dob: Date, today: Date) {
  const dobUtc = Date.UTC(dob.getFullYear(), dob.getMonth(), dob.getDate());
  const todayUtc = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return Math.floor((todayUtc - dobUtc) / 86400000);
}

export default async function AgeCalculatorPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const dobParam = params.dob ?? "";

  const today = new Date();
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  let error = "";
  let result:
    | {
        years: number;
        months: number;
        days: number;
        totalDays: number;
        formattedDob: string;
      }
    | null = null;

  if (dobParam) {
    if (!isValidDateInput(dobParam)) {
      error = "Enter a valid date of birth.";
    } else {
      const dob = new Date(`${dobParam}T00:00:00`);

      if (Number.isNaN(dob.getTime())) {
        error = "Enter a valid date of birth.";
      } else if (dob > todayOnly) {
        error = "Date of birth cannot be in the future.";
      } else {
        const parts = calculateAgeParts(dob, todayOnly);
        const totalDays = calculateTotalDays(dob, todayOnly);

        result = {
          ...parts,
          totalDays,
          formattedDob: dob.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        };
      }
    }
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Age Calculator",
    applicationCategory: "CalculatorApplication",
    operatingSystem: "Web",
    url: "https://whatdayisit.now/age-calculator",
    description:
      "Free age calculator to calculate exact age in years, months, and days from a date of birth.",
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Script
        id="age-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Age Calculator
          </h1>
          <p className="text-base text-neutral-700 dark:text-neutral-300">
            Calculate exact age in years, months, and days from a date of birth.
          </p>
        </header>

        <section className="rounded-2xl border p-5 shadow-sm sm:p-6">
          <form method="GET" className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="dob" className="block text-sm font-medium">
                Date of birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                defaultValue={dobParam}
                max={todayOnly.toISOString().split("T")[0]}
                className="w-full rounded-xl border px-3 py-2 outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl border px-4 py-2 font-medium transition hover:opacity-90"
            >
              Calculate age
            </button>
          </form>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {result ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border p-5">
                <h2 className="text-xl font-semibold">Your age</h2>
                <p className="mt-2 text-lg">
                  {result.years} years, {result.months} months, {result.days}{" "}
                  days
                </p>
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                  Based on birth date: {result.formattedDob}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border p-4">
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Years
                  </div>
                  <div className="mt-1 text-2xl font-bold">{result.years}</div>
                </div>

                <div className="rounded-2xl border p-4">
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Months
                  </div>
                  <div className="mt-1 text-2xl font-bold">{result.months}</div>
                </div>

                <div className="rounded-2xl border p-4">
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Days
                  </div>
                  <div className="mt-1 text-2xl font-bold">{result.days}</div>
                </div>
              </div>

              <div className="rounded-2xl border p-4">
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Total days lived
                </div>
                <div className="mt-1 text-2xl font-bold">
                  {result.totalDays.toLocaleString("en-US")}
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">How this age calculator works</h2>
          <p>
            This calculator compares your date of birth with today’s date and
            returns the difference in full years, months, and days.
          </p>
          <p>
            It also shows the total number of days lived. The calculation takes
            different month lengths and leap years into account.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Related tools</h2>
          <div className="flex flex-col gap-2">
            <Link className="underline" href="/days-until-birthday">
              Days Until Birthday
            </Link>
            <Link className="underline" href="/what-day-was-i-born">
              What Day Was I Born
            </Link>
            <Link className="underline" href="/days-between-dates">
              Days Between Dates
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}