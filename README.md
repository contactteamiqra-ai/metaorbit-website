# MetaOrbit homepage

A dependency-free static homepage for MetaOrbit. Important copy is rendered in HTML, with progressive enhancements for motion, navigation and an original WebGL orbital sculpture.

## Local development

Requires Node.js 22 or later. No package installation, credentials, or external services are needed.

```sh
npm run dev
```

The local server uses port 4173. Use the existing checkout; no additional worktree is needed.

## Production

```sh
npm run build
npm run preview
```

The build writes `dist/`. For a future Hostinger static deployment, upload the **contents** of `dist/` into the configured web root (typically `public_html`). No Node server is needed in production. Nothing has been deployed by this implementation.

## Editing

- `src/index.html`: page copy, section structure, FAQs, portfolio placeholders and contact form.
- `src/content.js`: editable service data. Keep the corresponding HTML service copy synchronized so it remains correct without JavaScript.
- `src/styles.css`: palette, typography, responsive layout and transitions.
- `src/orbit.js`: original WebGL geometry, lighting, pointer response and scroll-driven camera/zoom. The inline SVG remains visible when WebGL fails. Reduced motion disables ongoing motion; the sculpture remains static.
- `src/experience.js` and `src/experience.css`: native-scroll chapter selection, hero handoff, website/workflow/pipeline scenes, portfolio clip/depth reveals, headline masks and process-path drawing. Desktop uses a sticky service stage at 1000px and above; smaller screens show inline scenes. Reduced motion shows static inline scenes at every width. No wheel/touch interception or scroll hijacking.
- `src/assets/metaorbit_logo_white_HD.png`: the original 3064 × 912 transparent logo, fetched from `main` without merging or resetting local work. Header and footer use the unchanged PNG with proportional CSS sizing (240px desktop, 170px mobile).
- The dark palette uses `#f59a2c` (RGB 245, 154, 44), the most frequent opaque orange pixel in the uploaded logo. It is defined once as `--orange`, read by WebGL, and used by the SVG fallback. The build copies assets without transforming them.

There are no remote fonts, images, scripts, analytics, or runtime dependencies.

## Contact and portfolio limitations

The contact form is a **preview only**. Its button validates fields locally; no request is sent, no message is delivered, and details are not saved. With JavaScript disabled the button is disabled. Before launch, connect an approved contact endpoint, add suitable spam protection and privacy information, and verify actual delivery. No business email address was invented.

The two original visual studies are clearly labeled project placeholders. Replace them with approved project assets and descriptions before presenting them as selected client work. No client results, logos, testimonials, partnerships or certifications are claimed.

## Validation

Production build and Chromium checks cover desktop/mobile layouts (320, 375, 390, 768, 1024, 1440 and 1920px), section targets, mobile menu, FAQ expansion, contact feedback, JavaScript-free HTML, reduced motion and unavailable-WebGL fallback. Screenshots are saved locally in ignored `artifacts/`.

Reference sites were not inspected during implementation. Initial remote Git checks failed inside the command sandbox. A subsequent read-only `git ls-remote origin HEAD` using the approved execution permission path succeeded through the existing configured proxy; GitHub is already permitted by the enforced package-manager network preset. No network settings or credentials need changing for repository reads. No network controls were bypassed. No code has been pushed, published or deployed.

## Immersive redesign review

The redesign keeps the original logo and #F59A2C accent. Its motion explains a connected customer journey: first impression and purchase, connected automation, then enquiry progression. Portfolio previews remain original labeled visual studies. Live desktop/mobile browser recordings are provided separately for review; they are not production assets. Noomo was unavailable through the enforced network policy (HTTP 403), so no reference assets or layouts were inspected or copied.
