"use client";

import { useState } from "react";

export default function ContactForm() {

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
  );
}