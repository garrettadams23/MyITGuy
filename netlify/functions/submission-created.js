import { withSupabase } from "@supabase/server";

// Netlify automatically invokes this function for every submission to any
// Netlify Form on the site (the "contact" form in index.html). Netlify
// calls this server-to-server with no Authorization header, so it runs in
// "none" auth mode and writes through ctx.supabaseAdmin (service role,
// bypasses RLS) since contact_submissions has RLS enabled with no policies.
export default withSupabase({ auth: "none" }, async (req, ctx) => {
  try {
    const body = await req.json();
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

    const { error } = await ctx.supabaseAdmin.from("contact_submissions").insert({
      name,
      subject,
      email,
      phone,
      location,
      rating: rating ? parseInt(rating, 10) : null,
      message,
    });

    if (error) {
      console.error("contact_submissions insert error:", error);
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

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("submission-created error:", error);
    return new Response("ok", { status: 200 });
  }
});
