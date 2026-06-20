import { withSupabase } from "@supabase/server";

// Verifies the Supabase connection/credentials are working by counting rows
// in contact_submissions via ctx.supabaseAdmin (RLS has no policies, so only
// the service-role client can read it) without returning any row data.
export default withSupabase({ auth: "none" }, async (_req, ctx) => {
  try {
    const { count, error } = await ctx.supabaseAdmin
      .from("contact_submissions")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    return Response.json({
      message: "Database test successful",
      contact_submissions_count: count,
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to connect to database", details: error.message },
      { status: 500 },
    );
  }
});
