# MetaOrbit agency website — hero review stage

A dependency-free, eight-page static website. The homepage hero and shared navigation are the current visual review checkpoint. Inner pages have distinct original content in restrained layouts; the new hero direction has not been rolled out to every page.

## Run locally

Node.js 22 or later (24 LTS recommended). No npm install, credentials or external services are required.

```sh
npm run dev
```

Open `http://localhost:4173`. The development command builds all pages, watches `src/` and `scripts/`, and rebuilds after edits. Refresh the browser to see changes. Use the existing checkout; no extra worktree is required.

```sh
npm run build
npm run preview
```

Stop the development server before previewing: both use port 4173. An alternative port can be set with the `PORT` environment variable. The production output is `dist/`.

## Static routes

- `/` — Home: positioning, the logo-derived hero, and routes into the site
- `/services/` — Services overview: choose a starting point by business problem
- `/services/websites-ecommerce/` — scope, buying journeys, inputs and handover
- `/services/ai-workflow-automation/` — n8n/Make, practical AI, access and exceptions
- `/services/crm-sales-funnels/` — Zoho CRM, enquiry ownership and pipeline handoffs
- `/portfolio/` — explicitly labeled placeholders and future case-study requirements
- `/about/` — focus, delivery approach and white-label agency support
- `/contact/` — briefing guidance and an honest preview-only form

Each URL has a real `index.html` file in its directory. Direct visits and refreshes do not need a JavaScript router, rewrite rule or SPA fallback. A future Hostinger upload should put the **contents** of `dist/` in the web root (usually `public_html`), retaining all directories. Assets use root-relative paths; this build is intended for the host's document root. Do not open the HTML via `file://`. Nothing has been deployed.

## Content and shared navigation

- `src/index.html` — homepage body content
- `scripts/pages.mjs` — seven inner pages with distinct purposes and original copy
- `scripts/site.mjs` — shared header/footer, document metadata and route list
- `src/styles.css` — baseline typography, controls and palette
- `src/site.css` — shared navigation and restrained inner-page layouts
- `src/home.css` and `src/home-motion.js` — homepage-only expressive hero, scroll transitions and service illustrations; neither file is loaded by an inner page
- `src/app.js` — menu, keyboard controls, safe preview form, homepage-only renderer loading
- `scripts/build.mjs` — static page generation and unchanged asset copying

The header and footer use the **complete original transparent PNG**, unaltered. The root-level original logo from main is also preserved. Orange `#F59A2C` was sampled from the original logo.

## Original orbital symbol

`src/orbit.js` renders a volumetric extrusion of the orange symbol's raster silhouette, including its negative spaces. It uses the numeric signed-distance field in `src/assets/orbit-symbol.sdf`, with provenance and original-source SHA256 in `orbit-symbol.json`. The front/back, deeper side surfaces and soft bevel are part of a 3D field; no rectangular logo plane, generic rings or sphere is used.

The PNG is sufficient for a recognizable silhouette. It is not vector artwork: fine edge detail is raster-derived and will not be as clean as an approved vector source. No different shape was substituted. The static fallback clips and colour-isolates the unchanged PNG at render time, excluding all lettering. Header/footer images receive no such processing.

`python3 scripts/derive-symbol.py` optionally regenerates the numeric geometry (requires Pillow, NumPy and SciPy). These are asset-authoring dependencies only; they are not needed to build, host or run the website.

The homepage review uses controlled pointer response, a scroll-driven camera turn, and a shrinking/drifting symbol handoff into the introduction. Studio-style metallic key/fill/reflection lighting keeps the mark recognisable. The numerical silhouette is stored at 16-bit precision to reduce lighting banding; it still comes from the original PNG, not a substitute shape. The renderer settles and stops requesting frames when idle, pauses offscreen, and uses a fixed front-facing pose under reduced motion. Without WebGL, or on load/context failure, the original-symbol fallback stays visible. Important content and navigation work without JavaScript.

## Review limitations

The overall visual direction is **not approved**. Hero review comes before extending this treatment across inner pages. Portfolio entries are placeholders, not completed work or claimed results. The contact form validates locally and explicitly says nothing is sent or saved; it remains disabled without JavaScript. Before launch it needs a real delivery endpoint, spam handling, privacy information and delivery verification. No team size, office, certification, client result, testimonial or partnership is invented.

No merge or deployment is part of this review. Work continues on `feat/metaorbit-homepage` / PR #1.

## Homepage refinement checkpoint

The three homepage service illustrations explain a buying journey, connected actions from one enquiry, and a lead moving through a CRM pipeline. They respond to native scroll; mobile shows them inline with a lower rendering budget, while reduced motion uses fixed/completed diagrams and a static hero pose. Offscreen scenes avoid unnecessary updates. The seven generated inner-page HTML files remain byte-identical to the prior review version. This homepage direction is still awaiting design approval; it has not been extended across the remaining pages.

## Approved hybrid homepage checkpoint

The homepage now combines the approved directions: a full-bleed cinematic symbol composition with readable live typography and reduced bloom; a layered website/workflow/CRM service stage; and a separate bright editorial device showcase. Only homepage files and its assets changed visually. All seven inner-page HTML outputs remain unchanged pending homepage review.

`STILL / OBJECTS` is an original **concept project**, not client work. No approved client-project assets were available. Its 96 KB WebP photograph is an original generated homeware still life; the website itself is real HTML generated by `scripts/project-study.mjs`. The desktop and mobile layouts come from the same content, not flattened website images. Project names, object descriptions and interface controls are illustrative; no results or completed client work are claimed.

The laptop and phone have independent `overflow: hidden` screen viewports and real proportional layouts. On desktop a short native CSS sticky stage holds the frames for roughly 620px of page scrolling. JavaScript maps that section's progress to each content element's measured `scrollHeight - clientHeight`, with different starting positions for desktop and phone. Only screen contents translate; device frames stay in place during the sticky interval. Images, font loading and viewport resizing trigger remeasurement.

At 900px and below, only the phone is shown, the sticky interval is removed, and its contents follow the short normal-scroll section. Reduced motion removes sticky device choreography and uses fixed screen positions, static service layers and a fixed hero pose. Device illustrations are excluded from the accessibility tree because their store controls are illustrative; the section heading, explanation and portfolio link are accessible live HTML. Main navigation and page links remain normal keyboard-accessible anchors.

Review validation includes the production build, all eight route/asset checks, measured frame stability versus changing internal transforms, viewport clipping, desktop/mobile layout widths, reduced motion, keyboard navigation and actual browser recordings. No merge or deployment is included. Further inner-page visual work waits for homepage review.
