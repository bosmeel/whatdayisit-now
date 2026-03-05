import Link from "next/link";

export default function Page() {

  const years:number[] = [];

  for (let y = 2020; y <= 2030; y++) {
    years.push(y);
  }

  const months = [
    "january","february","march","april","may","june",
    "july","august","september","october","november","december"
  ];

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>

      <h1>What Day Is It?</h1>

      <p>
        Find the weekday for any calendar date.
      </p>

      <h2>Browse by year</h2>

      <ul>
        {years.map((y) => (
          <li key={y}>
            <Link href={`/what-day-is/january-1-${y}`}>
              Dates in {y}
            </Link>
          </li>
        ))}
      </ul>

      <h2>Browse by month</h2>

      <ul>
        {months.map((m) => (
          <li key={m}>
            <Link href={`/what-day-is/${m}-1-2026`}>
              Dates in {m.charAt(0).toUpperCase()+m.slice(1)}
            </Link>
          </li>
        ))}
      </ul>

      <h2>Popular examples</h2>

      <ul>
        <li>
          <Link href="/what-day-is/january-1-2025">
            What day is January 1, 2025?
          </Link>
        </li>

        <li>
          <Link href="/what-day-is/july-4-2026">
            What day is July 4, 2026?
          </Link>
        </li>

        <li>
          <Link href="/what-day-is/december-25-2027">
            What day is December 25, 2027?
          </Link>
        </li>
      </ul>

    </main>
  );
}