type Props = {
  type: "between" | "until" | "since" | "age";
};

export default function CalculatorContent({ type }: Props) {
  const content = {
    between: {
      title: "Common use cases",
      items: [
        "Planning trips, holidays, or events",
        "Tracking time between important life moments",
        "Managing deadlines and project timelines",
        "Comparing durations between two dates",
      ],
      faq2: "Can I calculate days between past dates?",
      faq2Answer:
        "Yes, the calculator works with any valid dates in the past or future. It can be used for historical comparisons as well as future planning.",
    },
    until: {
      title: "Why use this countdown",
      items: [
        "Counting down to holidays or birthdays",
        "Planning upcoming deadlines",
        "Tracking important future events",
        "Staying motivated toward a goal date",
      ],
      faq2: "Can I count down to future dates only?",
      faq2Answer:
        "Yes. This calculator is designed for upcoming dates and helps you see how many days remain until a chosen day.",
    },
    since: {
      title: "Why track past dates",
      items: [
        "Measuring how much time has passed",
        "Tracking progress since an event",
        "Looking back at milestones",
        "Calculating elapsed time for projects or goals",
      ],
      faq2: "Can I use this for older dates?",
      faq2Answer:
        "Yes. The calculator works with recent and older past dates, as long as the date entered is valid.",
    },
    age: {
      title: "Common use cases",
      items: [
        "Calculating exact age from a birth date",
        "Checking age for forms or official use",
        "Tracking birthdays and milestones",
        "Understanding age in years, months, and days",
      ],
      faq2: "Is the age calculation accurate?",
      faq2Answer:
        "Yes. The calculator uses standard calendar-based date calculations and accounts for leap years and month length differences.",
    },
  }[type];

  return (
    <>
      <section className="content-section">
        <h2>{content.title}</h2>

        <ul className="content-list">
          {content.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="content-section">
        <h2>How this calculator works</h2>

        <p>
          This calculator uses standardized calendar calculations based on UTC
          date values, which helps ensure consistent and accurate results across
          devices and time zones.
        </p>

        <p>
          It automatically accounts for leap years, different month lengths, and
          both past and future dates where relevant.
        </p>
      </section>

      <section className="content-section">
        <h2>Accuracy and reliability</h2>

        <p>
          The calculation logic is designed to produce reliable and consistent
          results in standard use cases. Edge cases such as leap years and
          calendar differences are handled automatically.
        </p>

        <p>
          This makes the tool suitable for both personal and professional use,
          including planning, scheduling, and date comparisons.
        </p>
      </section>

      <section className="content-section">
        <h2>Frequently Asked Questions</h2>

        <h3>Are the results accurate?</h3>
        <p>
          Yes. The calculator uses reliable date logic and standard calendar
          rules to provide consistent results.
        </p>

        <h3>{content.faq2}</h3>
        <p>{content.faq2Answer}</p>
      </section>
    </>
  );
}
