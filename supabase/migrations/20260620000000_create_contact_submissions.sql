create table if not exists contact_submissions (
  id bigint generated always as identity primary key,
  name text,
  subject text,
  email text,
  phone text,
  location text,
  rating integer,
  message text,
  created_at timestamptz not null default now()
);

-- No policies are defined, so only the service-role client (ctx.supabaseAdmin
-- in netlify/functions/submission-created.js and db-test.js) can read/write
-- this table; anon/authenticated requests are denied by default.
alter table contact_submissions enable row level security;
