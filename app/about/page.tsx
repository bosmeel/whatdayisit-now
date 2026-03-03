import Link from "next/link";

export const metadata = {
  title: "About WhatDayIsIt.now – Live date & calendar tools",
  description:
    "Learn about WhatDayIsIt.now, how our date tools work, and the purpose behind our calendar and countdown calculators.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <nav className="text-sm text-neutral-500 mb-4">
          <Link href="/" className="underline">Home</Link>
          {" > "}
          <span>About</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-6">
          About WhatDayIsIt.now
        </h1>

        <div className="prose max-w-none text-neutral-700">

          <p>
            WhatDayIsIt.now is an independent calendar and date reference website.
            It provides live tools for checking today’s date, week number,
            day of year, year progress, and countdowns to upcoming events.
          </p>

          <h2>Purpose of this website</h2>
          <p>
            The goal of this site is simple: provide accurate, fast, and easy-to-understand
            date information without unnecessary clutter. Many online tools
            focus only on calculation. This website combines live tools with
            clear explanations of how calendar systems work.
          </p>

          <p>
            In addition to live counters, we publish educational pages explaining
            leap years, ISO week numbers, year length, and date calculation methods.
            This helps visitors understand not just the result, but the logic behind it.
          </p>

          <h2>How calculations work</h2>
          <p>
            All calculations on this site are based on the Gregorian calendar
            and standard ISO-8601 date rules. Date differences are calculated
            using precise timestamp comparisons. Countdown tools automatically
            adjust to the next upcoming occurrence of an event.
          </p>

          <h2>Accuracy and updates</h2>
          <p>
            The tools update automatically based on the current date.
            Because calculations are generated dynamically, the displayed
            values remain accurate without manual updates.
          </p>

          <h2>Independence</h2>
          <p>
            WhatDayIsIt.now is independently operated and is not affiliated
            with any government agency, calendar authority, or event organizer.
          </p>

          <h2>Advertising</h2>
          <p>
            This website may display advertising to support hosting,
            development, and ongoing improvements. Advertisements are clearly
            marked and do not influence calculation results or content.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions, feedback, or suggestions,
            please visit the <Link href="/contact" className="underline">contact page</Link>.
          </p>

        </div>
      </div>
    </main>
  );
}