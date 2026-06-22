# Aziana site — Handoff

## Current state

Aziana is a static marketing website for the restaurant at Bobby's Marina, Philipsburg, Sint Maarten.

- Repo: `chwong1979/aziana`
- Deploy: Cloudflare Workers Static Assets from `public/`
- Version pointer: `package.json` = `0.4.1`
- Rollback branch for cleanup: `backup/pre-doc-trim-2026-06-23`

## Current deploy shape

Cloudflare watches `main` and deploys with Wrangler. Static assets come from `./public` per `wrangler.jsonc`.

Important deploy files:

- `wrangler.jsonc` — Worker/static-assets config.
- `package.json` — deploy/check scripts.
- `public/index.html` — homepage and main shell.

No runtime DB, Supabase, AIOS, or environment-variable work is active in this repo.

## Current public surfaces

- Homepage: `public/index.html`
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
