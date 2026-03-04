export default function RelatedDateTools() {
  const tools = [
    {
      title: "Days Between Dates",
      url: "/days-between-dates",
    },
    {
      title: "Days Until Date",
      url: "/days-until-date",
    },
    {
      title: "Day of Year",
      url: "/day-of-year",
    },
    {
      title: "Days Left in Year",
      url: "/days-left-in-year",
    },
    {
      title: "How Many Days in a Year",
      url: "/how-many-days-in-a-year",
    },
  ];

  return (
    <section style={{ marginTop: 40 }}>
      <h2>Related date tools</h2>

      <ul>
        {tools.map((tool) => (
          <li key={tool.url}>
            <a href={tool.url}>{tool.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}