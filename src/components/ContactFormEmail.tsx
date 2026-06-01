import React from "react";

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  interests: string;
}

export default function ContactFormEmail({
  name,
  email,
  phone,
  location,
  interests,
}: ContactFormEmailProps) {
  return (
    <div style={{ fontFamily: "sans-serif", color: "#111" }}>
      <h2 style={{ marginBottom: 16 }}>New enquiry — TalentBridge</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      {phone && <p><strong>Phone:</strong> {phone}</p>}
      {location && <p><strong>Location:</strong> {location}</p>}
      <p style={{ marginTop: 12 }}><strong>Goals / Interests:</strong></p>
      <p style={{ paddingLeft: 12 }}>{interests}</p>
      <p style={{ marginTop: 24, fontSize: 12, color: "#888" }}>
        Submitted via the TalentBridge contact form.
      </p>
    </div>
  );
}
