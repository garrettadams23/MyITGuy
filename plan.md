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
