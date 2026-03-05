import Link from "next/link";
import { DATE_PAIRS } from "@/lib/data/datePairs";

export const revalidate = 86400;

export default function DaysBetweenIndexPage() {
  const sorted = [...DATE_PAIRS].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1>Days Between Dates</h1>

      <p>Select a popular date pair:</p>

      <ul style={{ lineHeight: 1.9 }}>
        {sorted.map((p) => (
          <li key={p.slug}>
            <Link href={`/days-between/${p.slug}`}>Days between {p.label}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}