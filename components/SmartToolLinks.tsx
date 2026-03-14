import Link from "next/link";

type Tool = {
  href: string;
  title: string;
  desc: string;
};

const TOOLS: Tool[] = [
  {
    href: "/days-between",
    title: "Days Between Dates",
    desc: "Calculate the number of days between two dates",
  },
  {
    href: "/weeks-between",
    title: "Weeks Between Dates",
    desc: "See the number of weeks between two dates",
  },
  {
    href: "/months-between",
    title: "Months Between Dates",
    desc: "Calculate full months between two dates",
  },
  {
    href: "/years-between",
    title: "Years Between Dates",
    desc: "Calculate full years between two dates",
  },
  {
    href: "/business-days-between",
    title: "Business Days Between",
    desc: "Count weekdays between two dates",
  },
  {
    href: "/days-until",
    title: "Days Until Date",
    desc: "Countdown to a future date",
  },
  {
    href: "/date-duration",
    title: "Date Duration Calculator",
    desc: "Exact duration in years, months and days",
  },
];

export default function SmartToolLinks() {
  return (
    <section className="homepage-section">
      <h2>Related Calculators</h2>

      <div className="tool-grid">
        {TOOLS.map((tool) => (
          <Link key={tool.href} href={tool.href} className="tool-card">
            <strong>{tool.title}</strong>
            <div>{tool.desc}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}