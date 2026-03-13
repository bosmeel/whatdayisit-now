import TodayHero from "@/components/TodayHero";
import TodayDashboard from "@/components/TodayDashboard";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>

      {/* HERO */}

      <TodayHero />

      {/* TODAY DASHBOARD */}

      <TodayDashboard />

      {/* MAIN CALCULATORS */}

      <section style={{ marginTop: 50 }}>

        <h2>Main Date Calculators</h2>

        <div className="tool-grid">

          <Link href="/days-between" className="tool-card">
            <strong>Days Between Dates</strong>
            <div>Calculate the number of days between two dates</div>
          </Link>

          <Link href="/days-until" className="tool-card">
            <strong>Days Until Date</strong>
            <div>Countdown to a future date</div>
          </Link>

          <Link href="/days-since" className="tool-card">
            <strong>Days Since Date</strong>
            <div>See how many days have passed</div>
          </Link>

          <Link href="/age-calculator" className="tool-card">
            <strong>Age Calculator</strong>
            <div>Calculate age from a birth date</div>
          </Link>

          <Link href="/business-days-between" className="tool-card">
            <strong>Business Days Between</strong>
            <div>Count weekdays between two dates</div>
          </Link>

          <Link href="/date-duration" className="tool-card">
            <strong>Date Duration</strong>
            <div>Difference in years, months and days</div>
          </Link>

        </div>

      </section>

      {/* MORE CALCULATORS */}

      <section style={{ marginTop: 50 }}>

        <h2>More Date Calculators</h2>

        <div className="tool-grid">

          <Link href="/weeks-between" className="tool-card">
            <strong>Weeks Between Dates</strong>
          </Link>

          <Link href="/months-between" className="tool-card">
            <strong>Months Between Dates</strong>
          </Link>

          <Link href="/years-between" className="tool-card">
            <strong>Years Between Dates</strong>
          </Link>

        </div>

      </section>

    </div>
  );
}