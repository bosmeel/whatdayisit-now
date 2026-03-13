import Link from "next/link";

type Props = {
  current?: string;
};

const calculators = [
  { slug: "days-between", title: "Days Between Dates" },
  { slug: "days-until", title: "Days Until Date" },
  { slug: "days-since", title: "Days Since Date" },
  { slug: "weeks-between", title: "Weeks Between Dates" },
  { slug: "months-between", title: "Months Between Dates" },
  { slug: "years-between", title: "Years Between Dates" },
  { slug: "business-days-between", title: "Business Days Between Dates" },
  { slug: "age-calculator", title: "Age Calculator" },
];

export default function RelatedCalculators({ current }: Props) {

  const filtered = calculators
    .filter((c) => c.slug !== current)
    .slice(0, 6);

  return (
    <section style={{ marginTop: 50 }}>

      <h2>Related Calculators</h2>

      <div className="tool-grid">

        {filtered.map((tool) => (

          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="tool-card"
          >

            <strong>{tool.title}</strong>

            <div>
              Use this calculator
            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}