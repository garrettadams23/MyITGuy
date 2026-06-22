import { withSupabase } from "@supabase/server";

// Template showing how to wire @supabase/server into a Netlify Function.
// Netlify Functions v2 use the Web-standard Request/Response signature,
// which is exactly what withSupabase's returned handler expects — so it
// can be the default export directly (no { fetch: ... } wrapper needed,
// that pattern is for Deno/Bun/Cloudflare Workers module workers).
//
// This site has no sign-in flow yet, so there's no JWT to send as
// "Authorization: Bearer <token>" — calling this as-is will be rejected.
// Swap "auth: 'user'" for "auth: 'none'" or "auth: 'secret'" if you need
// an endpoint that doesn't require a signed-in user (see
// node_modules/@supabase/server/docs/auth-modes.md).
export default withSupabase({ auth: "user" }, async (_req, ctx) => {
  // ctx.supabase is RLS-scoped to the calling user.
  // ctx.supabaseAdmin bypasses RLS - only use it for operations that
  // intentionally need full access regardless of caller.
  return Response.json({ user: ctx.userClaims });
});
