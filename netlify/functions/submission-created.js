import { withSupabase } from "@supabase/server";

// Netlify automatically invokes this function for every submission to any
// Netlify Form on the site - currently the "contact" form (index.html) and
// the "quiz-leads" form (quiz.html). Netlify calls this server-to-server
// with no Authorization header, so it runs in "none" auth mode and writes
// through ctx.supabaseAdmin (service role, bypasses RLS) since
// contact_submissions has RLS enabled with no policies. Both forms share
// the same contact_submissions table rather than getting their own.
export default withSupabase({ auth: "none" }, async (req, ctx) => {
  try {
    const body = await req.json();
    const submission = body.payload || body;
    const data = submission.data || {};
    const formName = submission.form_name || data["form-name"] || "contact";

    let insertRow;
    let emailSubject;
    let emailText;

    if (formName === "quiz-leads") {
      const { name = "", email = "", result = "" } = data;

      insertRow = {
        name,
        subject: `IT Quiz Lead: ${result || "Unknown result"}`,
        email,
        phone: "",
        location: "",
        rating: null,
        message: `Lead captured from the "Which IT Support Plan Fits You?" quiz on quiz.html. Recommended plan: ${result || "Unknown"}.`,
      };

      emailSubject = `New quiz lead: ${result || "Unknown result"}`;
      emailText = [
        `Name: ${name || "(not provided)"}`,
        `Email: ${email}`,
        `Quiz result: ${result || "Unknown"}`,
      ].join("\n");
    } else {
      const {
        name = "",
        subject = "",
        email = "",
        phone = "",
        location = "",
        rating = null,
        message = "",
      } = data;

      insertRow = {
        name,
        subject,
        email,
        phone,
        location,
        rating: rating ? parseInt(rating, 10) : null,
        message,
      };

      emailSubject = `New contact form message: ${subject || "No subject"}`;
      emailText = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Location: ${location}`,
        `Rating: ${rating}`,
        "",
        message,
      ].join("\n");
    }

    const { error } = await ctx.supabaseAdmin.from("contact_submissions").insert(insertRow);

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
          subject: emailSubject,
          text: emailText,
        }),
      });
    }

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("submission-created error:", error);
    return new Response("ok", { status: 200 });
  }
});
