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
- `db-test.js`: A placeholder endpoint for database connection testing.
- `submission-created.js`: Stores contact form submissions in Neon and sends an email notification.
- `supabase-example.js`: A template for authenticated endpoints using `@supabase/server` (see `.env.example` for required config).
