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
- `src/site.css` — current hero, navigation and restrained inner-page layouts
- `src/app.js` — menu, keyboard controls, safe preview form, homepage-only renderer loading
- `scripts/build.mjs` — static page generation and unchanged asset copying

The header and footer use the **complete original transparent PNG**, unaltered. The root-level original logo from main is also preserved. Orange `#F59A2C` was sampled from the original logo.

## Original orbital symbol

`src/orbit.js` renders a volumetric extrusion of the orange symbol's raster silhouette, including its negative spaces. It uses the numeric signed-distance field in `src/assets/orbit-symbol.sdf`, with provenance and original-source SHA256 in `orbit-symbol.json`. The front/back, shallow side surfaces and small bevel are part of a 3D field; no rectangular logo plane, generic rings or sphere is used.

The PNG is sufficient for a recognizable silhouette. It is not vector artwork: fine edge detail is raster-derived and will not be as clean as an approved vector source. No different shape was substituted. The static fallback clips and colour-isolates the unchanged PNG at render time, excluding all lettering. Header/footer images receive no such processing.

`python3 scripts/derive-symbol.py` optionally regenerates the numeric geometry (requires Pillow, NumPy and SciPy). These are asset-authoring dependencies only; they are not needed to build, host or run the website.

Motion is limited to small pointer and scroll responses. The renderer settles and stops requesting frames when idle, pauses offscreen, and uses a fixed front-facing pose under reduced motion. Without WebGL, or on load/context failure, the original-symbol fallback stays visible. Important content and navigation work without JavaScript.

## Review limitations

The overall visual direction is **not approved**. Hero review comes before extending this treatment across inner pages. Portfolio entries are placeholders, not completed work or claimed results. The contact form validates locally and explicitly says nothing is sent or saved; it remains disabled without JavaScript. Before launch it needs a real delivery endpoint, spam handling, privacy information and delivery verification. No team size, office, certification, client result, testimonial or partnership is invented.

No merge or deployment is part of this review. Work continues on `feat/metaorbit-homepage` / PR #1.
