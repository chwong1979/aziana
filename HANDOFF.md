# Aziana site — Handoff

## Current state

Aziana is a static marketing website for the restaurant at Bobby's Marina, Philipsburg, Sint Maarten.

- Repo: `chwong1979/aziana`
- Deploy: Cloudflare Workers Static Assets from `public/`
- Version pointer: `package.json` = `0.4.2`
- Rollback branch for cleanup: `backup/pre-doc-trim-2026-06-23`
- **Azai chat widget LIVE (promoted 2026-06-27, v0.1.3):** `public/azi-chat.js` + one `<script>` line in `index.html`. Thin front-end; brain is AIOS `POST https://ai.odarius.com/public/advisor`. See START_HERE "Azai chat widget" section. Don't add AI logic here.

## Current deploy shape

Cloudflare watches `main` and deploys with Wrangler. Static assets come from `./public` per `wrangler.jsonc`.

Important deploy files:

- `wrangler.jsonc` — Worker/static-assets config.
- `package.json` — deploy/check scripts.
- `public/index.html` — homepage and main shell.

No server, DB, Supabase, or environment-variable work lives in this repo. The Azai widget calls the AIOS public advisor (`POST https://ai.odarius.com/public/advisor`) client-side only — the brain and any AI behaviour changes live in the `chwong1979/aios` repo, not here.

## Current public surfaces

- Homepage: `public/index.html`
- Azai chat widget: `public/azi-chat.js` (loaded by `index.html`; brain = AIOS public advisor)
- FAQ page: `public/faq.html`
- Sushi SEO page: `public/sushi-philipsburg.html`
- Seasonal/current page: `public/seasonal-campaigns.html`
- CSS: `public/styles.css`
- Shared data: `public/site-data.json`
- Images: `public/images/`
- Menu PDFs: `public/menus/`

## Cleanup pass notes

This cleanup added startup/rule/handoff docs only. It did not touch site content, visuals, CSS, assets, Wrangler config, or order/reservation integration IDs.

## Known follow-ups / possible future build work

- Review visual design and live responsiveness only when Chin asks.
- Keep `public/site-data.json` as the shared factual source for AI/SEO/help surfaces.
- Future SEO/content improvements should be handled as a build/content pass, not cleanup.
- Future image/menu changes need visual confirmation by Chin.

## Safety notes

Aziana is less mature than the larger app repos. Do not delete empty-looking or duplicate-looking files without proving they are not referenced by HTML, CSS, schema, menus, AI/SEO data, or Cloudflare static paths.
