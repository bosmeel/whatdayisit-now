import Link from "next/link";

export default function SiteLinks() {

  return (

    <section style={{ marginTop: 50 }}>

      <h2>Explore More Date Tools</h2>

      <div className="tool-grid">

        <Link href="/date-calculators" className="tool-card">
          <strong>Date Calculators</strong>
          <div>Explore tools for calculating dates and time differences</div>
        </Link>

        <Link href="/birthday-tools" className="tool-card">
          <strong>Birthday Tools</strong>
          <div>Discover tools related to birthdays and age</div>
        </Link>

        <Link href="/events" className="tool-card">
          <strong>Historical Events</strong>
          <div>Browse historical events that happened on specific dates</div>
        </Link>

        <Link href="/calendar" className="tool-card">
          <strong>Calendar Tools</strong>
          <div>Explore calendars and week numbers</div>
        </Link>

      </div>

    </section>

  );

}