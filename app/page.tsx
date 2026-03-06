import type { Metadata } from "next";
import TodayDashboard from "../components/TodayDashboard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Day Is It Today? | Live Date, Week Number & Year Progress",
  description:
    "Instantly see today's exact date, day of the week, ISO week number, day of the year, and how many days are left in the year.",

  alternates: {
    canonical: "https://whatdayisit.now",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "What Day Is It Today?",
    description:
      "Live dashboard showing today's date, week number, day of the year and year progress.",
    url: "https://whatdayisit.now",
    siteName: "WhatDayIsIt.now",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "What Day Is It Today?",
    description:
      "Today's date, week number, day of year and year progress instantly.",
  },
};

const featuredLinks = [
  { href: "/days-between", label: "Days Between Dates Calculator" },
  { href: "/days-until", label: "Days Until Calculator" },
  { href: "/days-since", label: "Days Since Calculator" },
  { href: "/weeks-between", label: "Weeks Between Dates Calculator" },
  { href: "/months-between", label: "Months Between Dates Calculator" },
  { href: "/years-between", label: "Years Between Dates Calculator" },
  { href: "/age-calculator", label: "Age Calculator" },
  { href: "/birthday", label: "Birthday Tools" },
];

export default function Home() {
  return (
    <>
      <TodayDashboard />

      <section className="mx-auto max-w-5xl px-4 pb-8 pt-4">
        <div className="rounded-xl border p-6">
          <h2 className="mb-3 text-2xl font-semibold">Popular Date Calculators</h2>
          <p className="mb-5">
            Use these free online calculators to compare dates, count days, track
            time between events, and plan important deadlines.
          </p>

          <ul className="grid gap-3 sm:grid-cols-2">
            {featuredLinks.map((item) => (
              <li key={item.href} className="rounded-lg border p-4 transition hover:bg-neutral-50">
                <Link href={item.href} className="font-medium">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}