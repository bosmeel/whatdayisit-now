import Link from "next/link";

export default function RelatedDateTools() {
  const tools = [
    { title: "Days Between Dates", url: "/days-between" },
    { title: "Days Until Date", url: "/days-until" },
    { title: "Days Since Date", url: "/days-since" },
    { title: "Weeks Between Dates", url: "/weeks-between" },
    { title: "Months Between Dates", url: "/months-between" },
    { title: "Years Between Dates", url: "/years-between" },
    { title: "Business Days Between", url: "/business-days-between" },
    { title: "Age Calculator", url: "/age-calculator" },
    { title: "Day of Year", url: "/day-of-year" },
    { title: "Days Left in Year", url: "/days-left-in-year" },
    { title: "How Many Days in a Year", url: "/how-many-days-in-a-year" },
  ];

  return (
    <section style={{ marginTop: 50 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
        Related date tools
      </h2>

      <div className="tool-grid">
        {tools.map((tool) => (
          <Link key={tool.url} href={tool.url} className="tool-card">
            {tool.title}
          </Link>
        ))}
      </div>
    </section>
  );
}