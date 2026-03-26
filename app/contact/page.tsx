import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact – WhatDayIsIt.now",
  description:
    "Contact WhatDayIsIt.now for questions, feedback, or suggestions about our calendar and date tools.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-neutral-500 mb-4">
          <Link href="/" className="underline">
            Home
          </Link>
          {" > "}
          <span>Contact</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-6">Contact</h1>

        <div className="prose max-w-none text-neutral-700">
          <section className="page-section">
            <h2>Feedback and corrections</h2>

            <p>If you notice an issue, please include:</p>

            <ul className="page-list">
              <li>The page URL</li>
              <li>The dates or inputs used</li>
              <li>A short explanation</li>
            </ul>
          </section>

          <section className="page-section">
            <h2>Suggestions</h2>
            <p>Ideas for improvements or new tools are welcome.</p>
          </section>

          <section className="page-section">
            <h2>Advertising</h2>
            <p>
              For partnerships or advertising inquiries, include relevant
              details.
            </p>
          </section>

          <section className="page-section">
            <h2>Response time</h2>
            <p>Messages are reviewed regularly.</p>
          </section>

          <h2 className="mt-10">Send a message</h2>

          <ContactForm />
        </div>
      </div>
    </main>
  );
}
