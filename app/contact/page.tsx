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
          <Link href="/" className="underline">Home</Link>
          {" > "}
          <span>Contact</span>
        </nav>

        <h1 className="text-4xl font-semibold mb-6">
          Contact
        </h1>

        <div className="prose max-w-none text-neutral-700">

          <p>
            If you notice incorrect calculations, have suggestions, or general questions,
            please use the form below.
          </p>

          <h2>Feedback and corrections</h2>
          <p>
            If you believe a calculation or explanation is incorrect, please include:
          </p>

          <ul>
            <li>The page URL</li>
            <li>The dates or inputs you used</li>
            <li>A short explanation of the issue</li>
          </ul>

          <p>
            This helps us quickly verify and improve the accuracy of the tools.
          </p>

          <h2>Suggestions</h2>
          <p>
            Ideas for new tools, improvements, or additional features are always welcome.
          </p>

          <h2>Advertising and partnerships</h2>
          <p>
            For collaboration or advertising inquiries, please use the form and include
            relevant details in your message.
          </p>

          <h2>Response time</h2>
          <p>
            Messages are reviewed regularly. Please note that this is an independently operated website.
          </p>

          <h2 className="mt-10">Send a message</h2>

          <ContactForm />

        </div>
      </div>
    </main>
  );
}