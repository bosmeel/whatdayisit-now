import Link from "next/link";

export default function DateToolsHub() {

  return (

    <main className="container">

      <h1>Date Tools</h1>

      <p>
        Explore calculators, countdowns, and date comparison tools.
      </p>

      <div className="tool-grid">

        <Link href="/days-between" className="tool-card">
          <strong>Days Between Dates</strong>
          <div>Calculate days between any two dates</div>
        </Link>

        <Link href="/days-until" className="tool-card">
          <strong>Days Until Date</strong>
          <div>Countdown to any future date</div>
        </Link>

        <Link href="/days-since" className="tool-card">
          <strong>Days Since Date</strong>
          <div>See how many days have passed</div>
        </Link>

        <Link href="/age-calculator" className="tool-card">
          <strong>Age Calculator</strong>
          <div>Calculate age in years months and days</div>
        </Link>

      </div>

      <h2 style={{marginTop:50}}>Browse Date Pages</h2>

      <div className="tool-grid">

        <Link href="/born-on" className="tool-card">
          <strong>Birthdays by Date</strong>
        </Link>

        <Link href="/what-happened-on" className="tool-card">
          <strong>Historical Events</strong>
        </Link>

        <Link href="/days-until-date/january-1" className="tool-card">
          <strong>Days Until Any Date</strong>
        </Link>

        <Link href="/days-between-years/2000-and-2020" className="tool-card">
          <strong>Days Between Years</strong>
        </Link>

      </div>

    </main>

  );

}