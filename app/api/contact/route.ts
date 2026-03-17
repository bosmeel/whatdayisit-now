import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {

  const { email, message } = await req.json();

  try {

    await resend.emails.send({
      from: "WhatDayIsIt <noreply@whatdayisit.now>",
      to: "contact@whatdayisit.now",
      subject: "Website message",
      reply_to: email,
      text: message
    });

    return NextResponse.json({ success: true });

  } catch (error) {

    return NextResponse.json({ success: false });

  }

}