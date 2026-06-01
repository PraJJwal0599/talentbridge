import { Resend } from "resend";
import ContactFormEmail from "@/components/ContactFormEmail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, location, interests } = body;

    if (!name || !email || !interests) {
      return NextResponse.json(
        { error: "Name, email, and interests are required" },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "TalentBridge <onboarding@resend.dev>",
      to: [process.env.RESEND_TO_EMAIL!],
      subject: `New enquiry from ${name}`,
      react: ContactFormEmail({ name, email, phone, location, interests }),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact route error:", error);
    return NextResponse.json({ error: error?.message ?? String(error) }, { status: 500 });
  }
}
