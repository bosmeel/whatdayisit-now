import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default function BirthdayCalculatorPage() {

  return (

    <div>

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Birthday Calculators" }
        ]}
      />

      <h1>Birthday Calculators</h1>

      <p>
        Explore tools related to birthdays and age. Use these calculators to
        find out what weekday your birthday falls on or to calculate your
        exact age.
      </p>

      <div className="tool-grid">

        <Link href="/birthday-weekday" className="tool-card">

          <strong>Birthday Weekday Calculator</strong>

          <div>
            See which weekday your next birthday will fall on and view the
            distribution of your birthdays across the week.
          </div>

        </Link>

        <Link href="/age-calculator" className="tool-card">

          <strong>Age Calculator</strong>

          <div>
            Calculate your exact age in years, months and days from your
            birth date.
          </div>

        </Link>

      </div>

      <section style={{ marginTop: 40 }}>

        <h2>About Birthday Calculators</h2>

        <p>
          Birthday calculators help answer common questions about age and
          calendar dates. You can calculate how old someone is, determine
          which weekday their birthday falls on, and explore interesting
          patterns across years.
        </p>

      </section>

    </div>

  );

}
