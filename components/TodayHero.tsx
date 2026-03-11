export default function TodayHero() {
  const now = new Date();

  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });

  const fullDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="container today-hero">
      <h1>What Day Is It Today?</h1>

      <p>
        Today is <strong>{dayName}</strong>, {fullDate}.
      </p>

      <p>
        Instantly see today's date, day of the week, week number, and how far
        we are through the year.
      </p>
    </section>
  );
}