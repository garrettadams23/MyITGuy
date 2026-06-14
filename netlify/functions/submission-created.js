import { neon } from "@neondatabase/serverless";

// Netlify automatically invokes this function for every submission to any
// Netlify Form on the site (the "contact" form in index.html).
export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const data = (body.payload || body).data || {};

    const {
      name = "",
      subject = "",
      email = "",
      phone = "",
      location = "",
      rating = null,
      message = "",
    } = data;

    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);

      await sql`
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id SERIAL PRIMARY KEY,
          name TEXT,
          subject TEXT,
          email TEXT,
          phone TEXT,
          location TEXT,
          rating INTEGER,
          message TEXT,
          created_at TIMESTAMPTZ DEFAULT now()
        )
      `;

      await sql`
        INSERT INTO contact_submissions (name, subject, email, phone, location, rating, message)
        VALUES (${name}, ${subject}, ${email}, ${phone}, ${location}, ${rating ? parseInt(rating, 10) : null}, ${message})
      `;
    }

    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.NOTIFY_FROM_EMAIL || "MyITGuy Contact Form <onboarding@resend.dev>",
          to: process.env.NOTIFY_TO_EMAIL || "garrettadams1010@gmail.com",
          subject: `New contact form message: ${subject || "No subject"}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Location: ${location}`,
            `Rating: ${rating}`,
            "",
            message,
          ].join("\n"),
        }),
      });
    }

    return { statusCode: 200, body: "ok" };
  } catch (error) {
    console.error("submission-created error:", error);
    return { statusCode: 200, body: "ok" };
  }
}
