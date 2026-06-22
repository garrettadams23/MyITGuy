# MyITGuy LLC

This is a website for a freelance IT services business.

## Website Architecture

The site is built with a static frontend and a serverless backend.

- **DNS & Hosting**: Netlify
- **Analytics**: Google Analytics for cookie collection (user data).
- **Code Repository**: GitHub

## Technology Stack

- **Frontend**: Standard HTML, CSS, and JavaScript.
- **Backend**: Serverless functions deployed on Netlify.

### Backend Functions

The following serverless functions are available in the `/netlify/functions` directory:

- `health.js`: A simple health-check endpoint.
- `db-test.js`: Verifies the Supabase database connection by counting rows in `contact_submissions`.
- `submission-created.js`: Stores contact form submissions in Supabase Postgres and sends an email notification.
- `supabase-example.js`: A template for authenticated endpoints using `@supabase/server` (see `.env.example` for required config).

### Infrastructure as Code

- **Database & Auth & project config (Supabase)**: `supabase/config.toml` is the committed source of truth for Supabase Auth settings (including the Resend SMTP server), and `supabase/migrations/*.sql` defines the database schema (e.g. `contact_submissions`). Edit either and run the manually-triggered `.github/workflows/supabase-config-push.yml` workflow to push changes to the live project — no dashboard needed. See `.env.example` for the secrets/variables it requires.
