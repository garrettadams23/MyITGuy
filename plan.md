# Improvement Plan for MyITGuy Website

## Phase 1: Reliability & Asset Management

- [x] **Localize External Assets**: Downloaded and stored images/videos in `Img/`.
- [x] **Fix Broken/Fragile Links**: Audited all `href` and `src` attributes.
- [x] **SEO & Accessibility**: Added `alt` tags, verified hierarchy, and added meta tags.

## Phase 2: Codebase Standardization & Backend

- [x] **Fix Netlify Functions Module Type**: Standardized functions to ESM.
- [x] **Database Integration**: Finalized `db-test.js` connection to Neon.
- [x] **Contact Form Handling**: Enabled Netlify Forms.

## Phase 4: Modern UI/UX

- [x] **Business Card Integration**: Added interactive flipping card section.
- [x] **Dark/Light Mode Toggle**: Implemented theme switcher.
- [x] **CI/CD Pipeline**: Verified Netlify build settings.

## Phase 5: UI Polishing & Final Adjustments

- [x] **Fix Project Image Sizes**: Fixed CSS selector from `.swiper-slide .card` to `.swiper-slide.card` so styles correctly apply. Removed `min-width`/`min-height` constraints; images are now 150×150 circular with `max-width: 100%`.
- [x] **Align Contact Information**: Centered icons in a fixed-width container.
- [x] **Business Card Flip Stays in Place**: Moved perspective to the transform function (`perspective(2000px)`) for zero-shift flip animation.
- [x] **dot.Profile Layout**: Title now appears to the left of the avatar image; both are wrapped in a hyperlink to `https://dot.cards/garrettadams1010`.
- [x] **Remove Business Card Description**: Removed "Garrett Adams - Digital Business Card | My IT Guy | Washington, DC" from footer.
- [x] **Fix Word Sizing (Upper Parts)**: Added responsive font-size rules for `.text-1` at ≤500px and ≤380px breakpoints; reduced project card `.text` font at ≤500px.
- [x] **7th Project — Studies Repository**: Added project card linking to `https://garrettstudies.netlify.app/` using `Img/CySA+-png.png` as the image.
- [x] **Fix Embedded HTML**: Extracted accidentally embedded CompTIA reference HTML from inside index.html into `studies.html`; restored the broken ORCID link text.

## Phase 6: Badge Updates

- [x] **Convert CSAP_Certified.pdf to PNG**: Converted to `Img/local/CSAP_Certified.png` using ImageMagick at 300 DPI.
- [x] **Create WebP versions**: Created `Img/local/CSAP_Certified.webp` (66KB) and `Img/local/CySA+-png.webp` (19KB).
- [x] **Add two new badge entries**: Added CySA+ and CSAP badges to the `<!-- Badges Section -->` in `index.html`, matching the existing badge style.

## Phase 7: Branding, Bug Fixes & UI Upgrades

### Branding
- [x] **Logo: "Portfolio." → "MyITGuy"**: In `index.html` navbar, change `Portfo<span>lio.</span>` to `MyI<span>T</span>Guy`. The CSS already handles the color behavior correctly — at the top of the page the `<span>` (the "T") renders in red (primary color); once the user scrolls and `.navbar.sticky` activates, the span becomes white like the rest of the text. No CSS changes needed.

### Bug Fixes
- [x] **Badge animation rolls off screen**: The `@keyframes Rotate` in `style.css` animates badges using `margin-left` swinging from `-30%` → `50%` → `30%`. With four badges now on the page, the 50% peak pushes badges off the right edge of the viewport on smaller screens. Fix: replace `margin-left` animation with `transform: translateX()` using contained percentage values (e.g., `0%` → `15%` → `0%`) so each badge moves relative to itself rather than the parent container, keeping all four within bounds at any screen size.
- [x] **Business card flip scrolls the page**: When the card is clicked and flips, the page jumps/scrolls down instead of the card staying visually in place. Root cause: the `.card-container` height collapses or the click event triggers a scroll. Fix: set an explicit `min-height` on `.business-card` so the section height doesn't shift during the flip; add `e.preventDefault()` to the flip click handler in `script.js` to block any browser scroll-to-element behavior triggered by the toggle; and ensure `.card-container` has `overflow: hidden` so the back face never escapes the container bounds during the rotation.
- [x] **Calendly widget broken URL**: Updated `data-url` from the expired link `https://calendly.com/d/cvnt-6wp-psm` to the correct booking link `https://calendly.com/garrettadams1010/30min` in `index.html`.

### Wording Review
Corrections to apply across `index.html`:
- [x] **About paragraph**: "a self learner" → "a self-taught IT professional"; "IT skills in DoD, Enterprise, and freelancing" → "IT experience across DoD, enterprise environments, and freelance work"; "I aspire to be a cybersecurity architect." → "I aspire to become a cybersecurity architect."
- [x] **Skills intro text**: "My creative skills & experiences." → "My technical skills & experience." (IT work is not creative/design work.)
- [x] **Skills bars labels**: "Windows® Operation System" → "Windows® Operating System"; "Linux Operation Systems" → "Linux Operating Systems"; "Androids" → "Android."
- [x] **Skills paragraph**: "Full troubleshoot of Android, Windows® and Linux systems." → "Full troubleshooting of Android, Windows®, and Linux systems."
- [x] **Contact intro**: "Let me know if you need suggestions for projects or assistance. Feedback helps improve your experience." → "Feel free to reach out for IT help, project consultations, or general assistance. I welcome all feedback."
- [x] **About video caption**: "This video describes my work on different projects and eagerness to learn new skills." → "This video highlights my work on key projects and my drive to keep learning."

### UI Upgrades (from `ideas/` folder)
- [x] **Services section redesign** (`ideas/card-service-card.html`): Replace current three icon-only service cards with the styled card layout — `background:#222`, crimson hover fill, scaling `.box` on hover. Update the three service titles and descriptions to match the ideas card: "Troubleshooting Systems" (Android, Windows®, Linux — hardware and software), "Software Solutions" (Microsoft® Suite, zero-trust infrastructure, SIEM), "Excel & ServiceNow®" (custom worksheets, dashboards, account tracking). Swap icon `fa-chart-line` → `fa-shield` for the second card to match the ideas file.
- [x] **Skills section redesign** (`ideas/card-skill-bars.html`): Add a "Code across GitHub" subsection above the existing skill bars showing language breakdown bars (HTML 86.2% crimson, SQL 4.4%, CSS 4.4% teal, React 3.5%, JS 1.5% blue) with a source note listing the six repos. Below the existing bars, add a "Skill set" chip row using the pill-style tags from the ideas card: Windows®, Linux, Android, Hardware, Software, Cybersecurity, Networking, Active Directory, PowerShell, ServiceNow®, SQL, React. Style chips with a crimson border and fill-on-hover effect.
- [x] **Consent banner redesign** (`ideas/card-consent-banner.html`): Replace or restyle the current consent banner in `consent.js` with the dark-panel design — `background:#111`, rounded-12 card, "Cookies & Analytics" bold heading, descriptive paragraph, "Deny" (ghost) and "Accept" (blue filled) buttons. Wire the existing accept/deny logic to the new button elements.
- [x] **Contact form redesign** (`ideas/card-form-input.html`): Restyle the contact form to match the ideas card — Poppins font, small uppercase letter-spaced labels above each input, clean `1px lightgrey` border, `6px` border-radius, `border-color:#b3b3b3` on focus. Add a **Phone** field (`type="tel"`, name="phone") and a **Location** field (`type="text"`, name="location", placeholder "City, State") to the existing Name / Subject / Email / Message / Rating fields. **Keep the Subject field** (`name="subject"`). Use a 2-column grid for Name + Subject, Email + Phone, Location + Rating, and Message spanning full width — matching the ideas card layout.

## Phase 8: Mobile QA Pass (Screenshot Feedback)

- [x] **Fix Font Awesome conflict**: Removed the conflicting FA4 stylesheet and placeholder Font Awesome Kit script (`a076d05399`) and replaced both with a single FA6 CDN stylesheet. Fixes "tofu"/missing icons in the navbar (moon/bars), services section, contact rows, footer copyright symbol, and the sidebar LinkedIn icon (updated `fa fa-linkedin` → `fab fa-linkedin`).
- [x] **Fix invisible contact info**: `.contact .contact-content .info .sub-title` set `color: #333` on a `<div>`, but the actual `<a>` text inside inherited the global `a { color: var(--light-text) }` (white), making Name/Address/Email/Phone values white-on-white and invisible in light mode. Fixed by targeting `.sub-title a` directly with `color: var(--text-main)`.
- [x] **Fix broken Project 7 image**: `Img/CySA+-png.png` didn't exist (only `Img/local/CySA+-png.webp` does), so the card showed a crimson circle with the alt text "Studies Repository" instead of the badge image. Fixed the path.
- [x] **Footer cleanup**: Replaced the dead Stack Overflow flair badge (`stackoverflow.com/users/flair/...png`, no longer served) with a `fab fa-stack-overflow` icon + label. Restructured the SO badge, dot.Profile card, and ORCID link into a single `.footer-links` flex row with consistent `.badge-link` styling, keeping all existing links/data.
- [x] **Floating sidebar alignment**: Restructured `.divcont1/2/3` icons into fixed-size `.side-icon` containers and adjusted the peek width so only the icon shows in the collapsed state (text fully hidden until hover), making all three sidebar tabs behave consistently.
- [x] **Business card mobile fixes**: Added a `max-width: 600px` media query that gives `.card-container` a taller `aspect-ratio` (4/5) and scales down the front/back UI elements (logo SVGs, QR code, service icons/labels) so content isn't clipped by `overflow: hidden` on phones. Also fixed oversized back-face service icon SVGs (no explicit size, were rendering at default 300x150) and made the QR code responsive.

## Phase 9: Badge Links, Mobile Menu & Sidebar Bar Fixes

- [x] **Badge hyperlinks**: `<img class="badge">` elements used a non-functional custom `hyperlink="..."` attribute (HTML has no such attribute on `<img>`). Wrapped each badge image in an `<a target="_blank" rel="noopener noreferrer">` using the current Credly public URLs supplied by the user, mapped by badge name: Security+ → `cc8065d2-...`, A+ → `cfa0e8d7-...`, CySA+ → `6b56a78d-...`, CSAP → `f41bb414-...`.
- [x] **Mobile hamburger menu not opening**: `script.js` selected `document.querySelector('.menu-btn')`, which matched the FIRST element with that class — a desktop nav `<a class="menu-btn">` link, not the hamburger `<div class="menu-btn" role="button">`. Toggle listener was bound to the wrong element, so tapping the bars icon did nothing. Fix: changed selector to `document.querySelector('div.menu-btn')` to target the hamburger button specifically.
- [x] **Floating sidebar gaps**: `.divcont1/2/3` had `top: 70px/125px/175px` but each div's rendered height (~variable, based on `<p>` padding `12px 14px 12px 4px` plus content) didn't evenly divide those offsets, leaving visible gaps between the three black slide-out tabs. Fix: gave each `.divcont` an explicit `height: 44px`, moved the `<p>` padding to horizontal-only (`0 14px 0 4px`) with `height: 100%` and flex centering, and set contiguous `top` values (`70px`, `114px`, `158px` — each exactly 44px apart) so the three tabs form one seamless black bar while still sliding out independently on hover.

## Phase 10: Business Card Flip Bug & Project 7 Image

- [x] **Business card back face mispositioned/covered when flipped**: `.card-front-ui, .card-back-ui` were `position: absolute` but had no `top`/`left` set, so `.card-back-ui` fell back to its "static position" — rendered ~430px BELOW the front face (overlapping the "Click to Flip" text and the Calendly inline widget below it) instead of stacking exactly on top of the front face. This caused the flipped card to appear mostly blank/empty with its content covered by the Calendly widget. Fix: added `top: 0; left: 0;` to `.card-front-ui, .card-back-ui` so both faces overlay the same position, fixing the flip and removing the dead space.
- [x] **Project 7 image replaced**: Swapped the "Studies Repository" project card image from the reused `Img/local/CySA+-png.webp` badge to a new `Img/local/studies-repo-thumb.webp`, cropped from a screenshot of the "Optimized Study Routine: 4 Pillars for Success" infographic on `garrettstudies.netlify.app` (square crop, resized to 400x400 for the circular card thumbnail).

## Phase 11: Contact Form Webhook → Database + Email Notification

- [x] **Contact form submission hook**: Added `netlify/functions/submission-created.js`, which Netlify automatically invokes for every submission to the `contact` form (`data-netlify="true"` in `index.html`). The function inserts each submission (name, subject, email, phone, location, rating, message, timestamp) into the `contact_submissions` table in Supabase Postgres, and emails a notification via the Resend API to `garrettadams1010@gmail.com` whenever `RESEND_API_KEY` is configured.
- [x] **Enable email notifications**: `RESEND_API_KEY`, `NOTIFY_FROM_EMAIL`, and `NOTIFY_TO_EMAIL` are set as GitHub secrets and synced to the live Netlify production site via the `sync-secrets-to-netlify.yml` workflow (fixed to pass `--context all` so `netlify env:set --secret` stops erroring, then re-run successfully). The contact form now emails a notification to `garrettadams1010@gmail.com` for every submission, independent of whether the Supabase insert below succeeds.

## Phase 12: Scheduling Widget Swap

- [x] **Replace Calendly with Google Calendar Appointment Scheduling**: Swapped the Calendly inline widget on the business card section for a Google Calendar appointment scheduling `<iframe>` (`calendar.google.com/calendar/appointments/...`).

## Phase 13: Migrate Contact Form Storage to Supabase

- [x] **Replace Neon with Supabase Postgres**: `submission-created.js` and `db-test.js` now use `@supabase/server`'s `ctx.supabaseAdmin` instead of `@neondatabase/serverless`. The `contact_submissions` table (with RLS enabled and no policies, so only the service-role client can touch it) is defined in `supabase/migrations/20260620000000_create_contact_submissions.sql` and applied via the existing `supabase-config-push.yml` workflow's `db push` step, instead of the old request-time `CREATE TABLE IF NOT EXISTS`.
- [x] **Remove Neon entirely**: Deleted `.github/workflows/neon_workflow.yml` (branch-per-PR preview databases), removed `@neondatabase/serverless` from `package.json`, and dropped `NEON_DB_URL` from `.env.example` and `sync-secrets-to-netlify.yml`.
- [x] **Apply the migration and redeploy**: Ran the "Push Supabase config" workflow (`supabase-config-push.yml`) on `claude/fervent-ride-na83ue`. It originally hung (no `--yes` flag for its interactive CI prompt), then failed Auth validation (job env block never forwarded `RESEND_API_KEY`, so `config.toml`'s `pass = "env(RESEND_API_KEY)"` resolved empty). Fixed both; the workflow now runs clean end-to-end — "Push config" and "Push database migrations" both succeeded, so `contact_submissions` exists live in Supabase and the SMTP Auth settings are applied. The now-unused `NEON_DB_URL`/`NEON_API_KEY`/`NEON_PROJECT_ID` GitHub secrets/variables can be deleted now that this is confirmed working.

## Phase 14: Lead-Generation Loop (inspired by "Loop Engineering Prompts")

- [x] **IT-fit quiz lead magnet**: Added `quiz.html` — a standalone "Which IT Support Plan Fits You?" quiz (the first secondary HTML page in this repo; replicates `index.html`'s head boilerplate, consent banner, nav, and footer/script conventions). `quiz.js` asks 6 short multiple-choice questions, tallies answers into one of the three existing service categories (Troubleshooting Systems / Software Solutions / Excel & ServiceNow®), then shows an email-capture form (`quiz-leads` Netlify form) *before* revealing the personalized recommendation. `netlify/functions/submission-created.js` now branches on the submission's form name so `quiz-leads` and `contact` both write into the existing `contact_submissions` table (no new migration) with a tailored subject/message per form, and the Resend notification email is worded differently for quiz leads vs. contact messages. Styled with a new "QUIZ PAGE" block in `style.css` reusing existing CSS variables, the `.form-grid`/`.form-field` pattern, and a new `.quiz-btn`/`.quiz-option` set in the same crimson-accent style as the rest of the site.
- [x] **Recurring content-research pass**: Researched 2026 small-business IT pain points, the DC-area IT/cybersecurity competitive landscape, and evergreen troubleshooting search topics (direct Reddit access wasn't possible — Anthropic's web-search crawler is blocked by Reddit at the infrastructure level, same kind of block hit earlier with the Notion source for this phase). Wrote up a ranked shortlist of 8 content/FAQ ideas mapped to the three service categories in `marketing/content-ideas.md`, with a recommendation to start with 3 of them. No blog/FAQ section exists yet to publish into, so this is a shortlist to revisit, not a publishing commitment.
- [x] **Launch checklist for new lead magnets**: Audited `index.html` for placement — added a "Not sure which one you need?" CTA below the three service cards in the Services section (`.serv-cta`, linking to `quiz.html`) rather than the nav or footer, since visitors already evaluating services are the most qualified audience for the quiz. Drafted one LinkedIn launch post in `marketing/quiz-launch-post.md` (LinkedIn chosen over Instagram/Reddit as the better fit for a B2B freelance-IT audience).

## Future Ideas

- [ ] **garrettstudies.netlify.app symbol**: User asked for "a symbol" above the content on `garrettstudies.netlify.app` (photo 7 of mobile QA). This site does not appear to be part of the `garrettadams23/myitguy` repo (no `studies.html` found in this repo's history) — needs to be addressed in its own repo.
