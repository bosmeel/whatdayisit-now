import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Birthday Calculators & Tools",
  description:
    "Birthday tools and calculators: age calculator, birthday countdown, and find the day you were born.",
  alternates: {
    canonical: "https://whatdayisit.now/birthday",
  },
};

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function formatMonth(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function BirthdayPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">

      <nav className="mb-6 text-sm">
        <Link href="/" className="underline">
          Home
        </Link>
        {" / "}
        Birthday Tools
      </nav>

      <h1 className="text-3xl font-bold mb-6">
        Birthday Calculators
      </h1>

      <p className="mb-8">
        Use these tools to calculate your age, find out what weekday you were
        born on, or see how many days remain until your next birthday.
      </p>

      <div className="grid gap-6 mb-10">

        <Link
          href="/age-calculator"
          className="border rounded-xl p-6 hover:bg-neutral-50"
        >
          <h2 className="text-xl font-semibold mb-2">
            Age Calculator
          </h2>
          <p>Calculate your exact age.</p>
        </Link>

        <Link
          href="/days-until-my-birthday"
          className="border rounded-xl p-6 hover:bg-neutral-50"
        >
          <h2 className="text-xl font-semibold mb-2">
            Days Until My Birthday
          </h2>
          <p>See how many days remain until your birthday.</p>
        </Link>

        <Link
          href="/what-day-was-i-born"
          className="border rounded-xl p-6 hover:bg-neutral-50"
        >
          <h2 className="text-xl font-semibold mb-2">
            What Day Was I Born
          </h2>
          <p>Find the weekday you were born.</p>
        </Link>

      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Browse Birthdays
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

        {months.map((m) => (
          <Link
            key={m}
            href={`/born-on/${m}-1`}
            className="border rounded-lg px-3 py-2 hover:bg-neutral-50"
          >
            Born on {formatMonth(m)} 1
          </Link>
        ))}

      </div>

    </main>
  );
}