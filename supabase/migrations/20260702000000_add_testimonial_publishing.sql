-- Adds opt-in publishing flags so approved contact-form feedback can be
-- shown in the public testimonials section on index.html (served by
-- netlify/functions/testimonials.js).
alter table public.contact_submissions
  add column allow_publish boolean not null default false,
  add column approved boolean not null default false;

comment on column public.contact_submissions.allow_publish is
  'Visitor checked "you may publish my feedback" on the contact form.';
comment on column public.contact_submissions.approved is
  'Owner approved this row for the public testimonials section (flip manually in the Supabase dashboard).';
