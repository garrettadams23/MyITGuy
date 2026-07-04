import { withSupabase } from "@supabase/server";

// Public read-only endpoint backing the testimonials section on index.html.
// Only returns submissions where the visitor opted in to publishing
// (allow_publish, from the contact-form checkbox) AND the owner approved
// them (approved, flipped manually in the Supabase dashboard). Never
// exposes emails, phone numbers, or unapproved messages.
export default withSupabase({ auth: "none" }, async (_req, ctx) => {
  try {
    const { data, error } = await ctx.supabaseAdmin
      .from("contact_submissions")
      .select("name, rating, message, created_at")
      .eq("allow_publish", true)
      .eq("approved", true)
      .not("rating", "is", null)
      .order("created_at", { ascending: false })
      .limit(9);

    if (error) throw error;

    return Response.json(
      { testimonials: data },
      { headers: { "Cache-Control": "public, max-age=300" } },
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to load testimonials", details: error.message },
      { status: 500 },
    );
  }
});
