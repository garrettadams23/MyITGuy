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
