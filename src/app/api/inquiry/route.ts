import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectDB from "@/lib/db";
import Inquiry from "@/models/Inquiry";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { patient, age, address, timing, service, problem } = body;

    // Save to database
    await connectDB();
    await Inquiry.create({ patient, age, address, timing, service: service || "General", problem });

    // You will need to set these environment variables to send emails
    // E.g., using Gmail SMTP or AWS SES
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, INQUIRY_EMAIL_TO } = process.env;

    if (SMTP_HOST && SMTP_USER && SMTP_PASSWORD && INQUIRY_EMAIL_TO) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASSWORD,
        },
      });

      const textMessage = `New Doctor Home Visit Inquiry:

Patient: ${patient}
Age: ${age}
Location: ${address}
Symptoms: ${problem}
Service: ${service || "General"}
When: ${timing}
`;

      await transporter.sendMail({
        from: SMTP_USER,
        to: INQUIRY_EMAIL_TO,
        subject: `New Doctor Home Visit Request - ${address}`,
        text: textMessage,
      });
    } else {
      console.warn("SMTP environment variables are missing. Email was not sent.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending inquiry email:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
