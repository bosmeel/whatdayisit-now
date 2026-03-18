import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, message, type, website } = await req.json();

    await resend.emails.send({
      from: "WhatDayIsIt <onboarding@resend.dev>",
      to: "contact@whatdayisit.now",
      subject: `Website message (${type})`,
      replyTo: email || undefined,
      text: message,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}