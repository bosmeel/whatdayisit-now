import Link from "next/link";

const months = [
  { name: "january", days: 31 },
  { name: "february", days: 29 },
  { name: "march", days: 31 },
  { name: "april", days: 30 },
  { name: "may", days: 31 },
  { name: "june", days: 30 },
  { name: "july", days: 31 },
  { name: "august", days: 31 },
  { name: "september", days: 30 },
  { name: "october", days: 31 },
  { name: "november", days: 30 },
  { name: "december", days: 31 },
];

export default function BornOnWeekday({ weekday }: { weekday: string }) {

  return (

    <main className="container">

      <h1>Born on {weekday}</h1>

      <p>
        Many people are curious about the weekday they were born on. If you
        were born on a {weekday}, you share that birth weekday with millions
        of people around the world.
      </p>

      <p>
        Use our birthday tools to find out what weekday you were born on and
        when your next birthday will fall.
      </p>

      <section style={{ marginTop: 40 }}>

        <h2>Birthday Tools</h2>

        <ul>

          <li>
            <Link href="/what-day-was-i-born">
              What Day Was I Born
            </Link>
          </li>

          <li>
            <Link href="/birthday-weekday">
              Birthday Weekday Calculator
            </Link>
          </li>

          <li>
            <Link href="/age-calculator">
              Age Calculator
            </Link>
          </li>

        </ul>

      </section>

      <section style={{ marginTop: 40 }}>

        <h2>Browse Birthdays by Date</h2>

        <div className="tool-grid">

          {months.map((month) =>

            Array.from({ length: month.days }).map((_, i) => {

              const day = i + 1;

              return (

                <Link
                  key={`${month.name}-${day}`}
                  href={`/born-on/${month.name}-${day}`}
                  className="tool-card"
                >
                  {month.name} {day}
                </Link>

              );

            })

          )}

        </div>

      </section>

    </main>

  );
}