import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function getDaysUntil(month: number, day: number) {
  const now = new Date();
  const currentYear = now.getFullYear();

  let target = new Date(currentYear, month - 1, day);

  if (target < now) {
    target = new Date(currentYear + 1, month - 1, day);
  }

  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default async function DaysUntilDatePage({
  params,
}: {
  params: Promise<{ month: string; day: string }>;
}) {
  const { month, day } = await params;

  const numericMonth = Number(month);
  const numericDay = Number(day);

  if (
    Number.isNaN(numericMonth) ||
    Number.isNaN(numericDay) ||
    numericMonth < 1 ||
    numericMonth > 12 ||
    numericDay < 1 ||
    numericDay > 31
  ) {
    notFound();
  }

  const days = getDaysUntil(numericMonth, numericDay);

  const targetDate = new Date(
    new Date().getFullYear(),
    numericMonth - 1,
    numericDay
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-neutral-500 mb-4">
          <Link href="/" className="underline">
            Home
          </Link>{" "}
          &gt; Days until {targetDate}
        </nav>

        <h1 className="text-4xl font-semibold mb-4">
          How many days until {targetDate}?
        </h1>

        <p className="text-xl mb-6">
          There are <strong>{days}</strong> days until {targetDate}.
        </p>
        <div className="mt-8 border-t pt-6">
  <h2 className="text-lg font-semibold mb-3">
    Popular countdowns
  </h2>

  <ul className="space-y-2 text-blue-600">
    <li><Link href="/days-until/christmas">Days until Christmas</Link></li>
    <li><Link href="/days-until/new-year">Days until New Year</Link></li>
    <li><Link href="/days-until/halloween">Days until Halloween</Link></li>
    <li><Link href="/days-until/thanksgiving">Days until Thanksgiving</Link></li>
    <li><Link href="/days-until/valentines-day">Days until Valentine's Day</Link></li>
  </ul>
</div>
      </div>
    </main>
  );
}