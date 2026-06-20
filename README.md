# Aziana — marketing website

Static marketing site for **Aziana**, Asian fusion dining at Bobby's Marina, Philipsburg, Sint Maarten.

- **Source of truth:** this repo. Pushes to `main` auto-deploy through Cloudflare Workers Builds.
- **Build:** none — self-contained static site deployed from `public/` with Workers Static Assets.
- **Entry:** `public/index.html` (inline CSS, Google Fonts via CDN). Assets in `public/images/`, menu in `public/menus/`, logo `public/Aziana_logo.png`. All browser asset paths are relative.
- **Version:** v0.4.0 (see the `VERSION:` comment in `index.html`).

## Deploy (Cloudflare Workers, Git-connected)

Cloudflare watches the production branch `main` and runs `npx wrangler deploy`. The static-assets configuration lives in `wrangler.jsonc`; no environment variables are required.

The production Worker is `aziana` at `aziana.chwong1979.workers.dev`.
