# Aziana site — Handoff

## Current state

Aziana is a static marketing website for the restaurant at Bobby's Marina, Philipsburg, Sint Maarten.

- Repo: `chwong1979/aziana`
- Deploy: Cloudflare Workers Static Assets from `public/`
- Version pointer: `package.json` = `0.6.0`
- Rollback branch for cleanup: `backup/pre-doc-trim-2026-06-23`
- **Azai chat widget source v0.1.5:** `public/azi-chat.js` + one `<script>` line in `index.html`. Thin front-end; brain remains AIOS through Aziana's same-origin `/api/advisor` proxy. The widget shows one inline safety sentence and a Privacy link—no popup/checkbox—and sends a random per-tab session ID that AIOS hashes before transcript storage. See START_HERE "Azai chat widget" section. Don't add AI logic here.

## Current deploy shape

Cloudflare watches `main` and deploys with Wrangler. Static assets come from `./public` per `wrangler.jsonc`.

Important deploy files:

- `wrangler.jsonc` — Worker/static-assets config.
- `package.json` — deploy/check scripts.
- `public/index.html` — homepage and main shell.

The Worker owns three routes: `GET /api/health`, `POST /api/visitor`, and `POST /api/advisor`; all other traffic delegates to static assets. The advisor route transparently proxies AIOS, so the brain and any AI behavior changes remain in `chwong1979/aios`. Successful signals call the secret-authenticated `public.emit_aziana_suite_alert` RPC from `db/0001_aziana_suite_alert_rpc.sql`. The RPC accepts no question text, history, raw session ID, IP, or page data.

Required runtime binding: Cloudflare secret `AZIANA_SUITE_TOKEN`. The Supabase URL and publishable key in `wrangler.jsonc` are non-secret. Delivery is fail-soft: missing notification configuration cannot break the site or Azai.

## Current public surfaces

- Homepage: `public/index.html`
- Worker API: `worker/index.js` (`GET /api/health`, `POST /api/visitor`, `POST /api/advisor`)
- Azai chat widget: `public/azi-chat.js` (loaded by `index.html`; brain = AIOS public advisor)
- Privacy disclosure: `public/privacy.html` (linked from Azai and the homepage footer)
- FAQ page: `public/faq.html`
- Sushi SEO page: `public/sushi-philipsburg.html`
- Seasonal/current page: `public/seasonal-campaigns.html`
- CSS: `public/styles.css`
- Shared data: `public/site-data.json`
- Images: `public/images/`
- Menu PDFs: `public/menus/`

## Multilingual website copy — 2026-08-10

The homepage supports English, Dutch, French and Spanish. `public/localized-copy.js` owns the
visitor story as peer, block-level locale documents, so Dutch, French and Spanish can express the
same message naturally instead of inheriting English sentence structure. The earlier inline catalog
continues to cover compact navigation and action labels. Facts and integration identifiers remain in
`public/index.html`; no native-speaker review has been claimed. `worker/localized-copy.test.js`
enforces catalog completeness and wiring.

## Cleanup pass notes

The 2026-07-13 Suite slice adds generic, owner-scoped, deduplicated PortalOS notifications for active visitors and successful Azai questions. It changes no visual content, CSS, images, order/reservation IDs, SEO facts, or AI behavior.

## Known follow-ups / possible future build work

- Review visual design and live responsiveness only when Chin asks.
- Keep `public/site-data.json` as the shared factual source for AI/SEO/help surfaces.
- Future SEO/content improvements should be handled as a build/content pass, not cleanup.
- Future image/menu changes need visual confirmation by Chin.

## Safety notes

Aziana is less mature than the larger app repos. Do not delete empty-looking or duplicate-looking files without proving they are not referenced by HTML, CSS, schema, menus, AI/SEO data, or Cloudflare static paths.
