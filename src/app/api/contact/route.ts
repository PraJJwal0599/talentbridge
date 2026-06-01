import { Resend } from "resend";
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

    const html = `
      <div style="font-family:sans-serif;color:#111;max-width:600px">
        <h2 style="margin-bottom:16px">New enquiry — TalentBridge</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${location ? `<p><strong>Location:</strong> ${location}</p>` : ""}
        <p style="margin-top:12px"><strong>Goals / Interests:</strong></p>
        <p style="padding-left:12px">${interests}</p>
        <p style="margin-top:24px;font-size:12px;color:#888">Submitted via the TalentBridge contact form.</p>
      </div>
    `;

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "TalentBridge <onboarding@resend.dev>",
      to: [process.env.RESEND_TO_EMAIL!],
      subject: `New enquiry from ${name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact route error:", error);
    return NextResponse.json({ error: error?.message ?? String(error) }, { status: 500 });
  }
}
