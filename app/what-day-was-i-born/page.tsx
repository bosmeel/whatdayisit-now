
import Script from "next/script";
import type { Metadata } from "next";
import Link from "next/link";
import DateInput from "@/components/DateInput";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedTools from "@/components/RelatedTools";

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

export default function WhatDayWasIBornPage() {

  const [date, setDate] = useState("");
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {

    if (!date) {
      setResult(null);
      return;
    }

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
      setResult(null);
      return;
    }

    const day = d.toLocaleDateString("en-US", {
      weekday: "long",
    });

    setResult(day);

  }, [date]);

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
          { name: "What Day Was I Born" }
        ]}
      />

      <h1>What Day Was I Born?</h1>

      <p>
        Enter your birth date to find out which day of the week you were born.
      </p>

      <div className="calculator">

        <DateInput
          label="Birth date"
          value={date}
          onChange={setDate}
        />

        {result && (

          <div className="result-box">

            <div className="result-number">
              {result}
            </div>

            <div className="result-label">
              weekday
            </div>

          </div>

        )}

      </div>

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

      <RelatedTools />

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