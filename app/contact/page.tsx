"use client";

import Link from "next/link";
import { useState } from "react";

export const metadata = {
  title: "Contact – WhatDayIsIt.now",
  description:
    "Contact WhatDayIsIt.now for questions, feedback, or suggestions about our calendar and date tools.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function submit(e: any) {
    e.preventDefault();

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message }),
    });

    alert("Message sent");
    setEmail("");
    setMessage("");
  }

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
            If you have questions, suggestions, or notice any inaccuracies,
            please feel free to get in touch.
          </p>

          <h2>General inquiries</h2>
          <p>
            For general questions about how date calculations work,
            calendar systems, or feature suggestions, you can reach us at:
          </p>

          <p>
            <strong>Email:</strong> contact@whatdayisit.now
          </p>

          <h2>Corrections</h2>
          <p>
            If you believe a calculation or explanation is incorrect,
            please include the specific page URL and a short explanation.
            We review all feedback carefully.
          </p>

          <h2>Advertising</h2>
          <p>
            For advertising or partnership inquiries,
            please use the same email address above and include
            “Advertising” in the subject line.
          </p>

          <h2>Response time</h2>
          <p>
            We aim to respond within a reasonable timeframe.
            Please note that this is an independently operated website.
          </p>

          <h2 className="mt-10">Send a message</h2>

          <form onSubmit={submit} className="mt-4 space-y-4 not-prose">

            <input
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-neutral-300 rounded px-3 py-2"
            />

            <textarea
              required
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-neutral-300 rounded px-3 py-2 h-32"
            />

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-800"
            >
              Send message
            </button>

          </form>

        </div>
      </div>
    </main>
  );
}