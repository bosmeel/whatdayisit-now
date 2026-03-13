import TodayHero from "@/components/TodayHero";
import TodayDashboard from "@/components/TodayDashboard";
import Link from "next/link";
import RelatedTools from "@/components/RelatedTools";
import SeoLinks from "@/components/SeoLinks";
import SiteLinks from "@/components/SiteLinks";

export default function HomePage() {
  return (
    <div>

      {/* HERO */}

      <TodayHero />

      {/* TODAY DASHBOARD */}

      <TodayDashboard />

      {/* PRIMARY CALCULATORS */}

      <section style={{ marginTop: 50 }}>

        <h2>Popular Date Calculators</h2>

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

      {/* MORE DATE CALCULATORS */}

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

          <Link href="/business-days-until" className="tool-card">
            <strong>Business Days Until</strong>
          </Link>

        </div>

      </section>

      {/* TODAY TOOLS */}

      <section style={{ marginTop: 50 }}>

        <h2>Today Tools</h2>

        <div className="tool-grid">

          <Link href="/week-number" className="tool-card">
            <strong>Week Number</strong>
          </Link>

          <Link href="/day-of-year" className="tool-card">
            <strong>Day of Year</strong>
          </Link>

          <Link href="/year-progress" className="tool-card">
            <strong>Year Progress</strong>
          </Link>

          <Link href="/days-until-weekend" className="tool-card">
            <strong>Days Until Weekend</strong>
          </Link>

        </div>

      </section>

      {/* PERSONAL TOOLS */}

      <section style={{ marginTop: 50 }}>

        <h2>Birthday & Personal Tools</h2>

        <div className="tool-grid">

          <Link href="/what-day-was-i-born" className="tool-card">
            <strong>What Day Was I Born</strong>
          </Link>

          <Link href="/born-on" className="tool-card">
            <strong>Born On</strong>
          </Link>

        </div>

      </section>

      {/* RELATED TOOLS */}

      <RelatedTools />

      {/* SEO LINKS */}

      <SeoLinks />

      <SiteLinks />

    </div>
  );
}