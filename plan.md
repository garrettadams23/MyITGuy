# Improvement Plan for MyITGuy Website

## Phase 1: Reliability & Asset Management
- [x] **Localize External Assets**: Currently, the site relies on Dropbox and Sololearn links for images and videos. These should be downloaded and stored locally in the `Img/` directory to prevent broken links and improve load times.
- [x] **Fix Broken/Fragile Links**: Audit all `href` and `src` attributes.
- [x] **SEO & Accessibility**: 
  - Ensure all `<img>` tags have descriptive `alt` attributes.
  - Verify semantic HTML usage (headings hierarchy).
  - Add `meta` description and keywords.

## Phase 2: Codebase Standardization & Backend
- [x] **Fix Netlify Functions Module Type**: 
  - The project is set to `"type": "module"` in `package.json`.
  - **Action**: Standardized all functions to ESM (`export async function handler...`) to match the project configuration.
- [x] **Database Integration**:
  - Finalized the `db-test.js` connection to Neon.
  - Cleaned up the mixed/commented-out code in `db-test.js`.
- [x] **Contact Form Handling**:
  - **Action**: Enabled Netlify Forms on the contact form to handle submissions automatically. Added missing `name` attributes to inputs.

## Phase 3: Performance & Modernization
- [x] **Remove jQuery Dependency (Optional)**: The current `Script.js` relies heavily on jQuery. Refactoring to vanilla JavaScript would reduce bundle size and improve performance.
- [x] **Optimize Images**: Convert PNG/JPG assets to WebP where supported.
- [x] **Lazy Loading**: Implemented `loading="lazy"` and `decoding="async"` for all images and `preload="none"` for the video element.
- [x] **Bug Fixes**: Fixed a `SyntaxError` in `script.js` caused by duplicate `const` declarations.

## Phase 4: Future Enhancements
- [x] **Business Card Integration**: Better integrate `Business Card.html` into the main navigation flow, potentially as a modal or a styled sub-page. (Integrated as a flipping interactive card section)
- [x] **Dark/Light Mode Toggle**: Since the site already uses CSS variables (`:root`), implementing a theme toggler would be a nice UX addition.
- [x] **CI/CD Pipeline**: Verify Netlify build settings to ensure dependencies are installed correctly for the functions.
