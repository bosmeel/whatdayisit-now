"use client";

import { useState } from "react";

export default function ContactForm() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("feedback");
  const [website, setWebsite] = useState(""); // honeypot

  async function submit(e: any) {
    e.preventDefault();

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message, type, website }),
    });

    alert("Message sent");
    setEmail("");
    setMessage("");
    setType("feedback");
    setWebsite("");
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-4 not-prose">

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border border-neutral-300 rounded px-3 py-2"
      >
        <option value="wrong-calculation">Wrong calculation</option>
        <option value="bug">Bug</option>
        <option value="feedback">General feedback</option>
        <option value="suggestion">Suggestion</option>
        <option value="advertising">Advertising / partnership</option>
      </select>

      <input
        type="email"
        placeholder="Email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-neutral-300 rounded px-3 py-2"
      />

      <textarea
        required
        placeholder="Describe your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border border-neutral-300 rounded px-3 py-2 h-32"
      />

      {/* Honeypot field (hidden for users, visible to bots) */}
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        autoComplete="off"
        tabIndex={-1}
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-neutral-800"
      >
        Send message
      </button>

    </form>
  );
}