import { notFound } from "next/navigation";
import { DATE_PAIRS } from "@/lib/data/datePairs";
import Breadcrumbs from "@/components/Breadcrumbs";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContent from "@/components/CalculatorContent";

/* ===============================
   FIND PAIR
================================ */

function getPair(slug: string) {
  return DATE_PAIRS.find((p) => p.slug === slug);
}

/* ===============================
   PAGE
================================ */

export default async function Page({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair: slug } = await params;

  const pair = getPair(slug);

  if (!pair) return notFound();

  if (!pair) return notFound();

  const start = new Date(pair.start);
  const end = new Date(pair.end);

  const diff =
    (Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) -
      Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) /
    86400000;

  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Days Between", href: "/days-between" },
          { name: pair.label },
        ]}
      />

      <CalculatorLayout
        title={`Days Between ${pair.label}`}
        description={`Calculate how many days there are between ${pair.label}.`}
      >
        <p className="mt-3 text-neutral-600 leading-relaxed">
          There are <strong>{diff}</strong> days between {pair.label}. This
          includes all calendar days and automatically accounts for leap years.
        </p>

        <div className="calculator">
          <div className="result-box">
            <div className="result-number">{diff}</div>

            <div className="result-label">days difference</div>
          </div>
        </div>
      </CalculatorLayout>

      <CalculatorContent type="between" />
    </div>
  );
}

/* ===============================
   STATIC PARAMS (CRUCIAAL)
================================ */

export function generateStaticParams() {
  return DATE_PAIRS.map((p) => ({
    pair: p.slug,
  }));
}

/* ===============================
   METADATA (FIX)
================================ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair: slug } = await params;

  const pair = getPair(slug);

  if (!pair) return {};

  return {
    title: `Days Between ${pair.label}`,
    description: `Find out how many days are between ${pair.label}.`,
  };
}
{
  const pair = getPair(params.pair);

  if (!pair) return {};

  return {
    title: `Days Between ${pair.label}`,
    description: `Find out how many days are between ${pair.label}.`,
  };
}
