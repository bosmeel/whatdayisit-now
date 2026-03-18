import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    const data = await resend.emails.send({
      from: "WhatDayIsIt <onboarding@resend.dev>",
      to: "contact@whatdayisit.now",
      subject: "New message from website",
     replyTo: email || undefined,
      text: message,
    });

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}