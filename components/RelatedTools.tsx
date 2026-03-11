import Link from "next/link";

export default function RelatedTools() {

  const tools = [
    { href: "/days-between", label: "Days Between Dates" },
    { href: "/days-until", label: "Days Until Date" },
    { href: "/days-since", label: "Days Since Date" },
    { href: "/weeks-between", label: "Weeks Between Dates" },
    { href: "/months-between", label: "Months Between Dates" },
    { href: "/years-between", label: "Years Between Dates" },
    { href: "/business-days-between", label: "Business Days Between Dates" },
    { href: "/age-calculator", label: "Age Calculator" }
  ];

  return (
    <section style={{marginTop:"50px"}}>

      <h2>Related Date Tools</h2>

      <div className="tool-grid">
        {tools.map((tool)=>(
          <Link
            key={tool.href}
            href={tool.href}
            className="tool-card"
          >
            {tool.label}
          </Link>
        ))}
      </div>

    </section>
  );
}