# Aziana — marketing website

Static marketing site for **Aziana**, Asian fusion dining at Bobby's Marina, Philipsburg, Sint Maarten.

## Start here

Read these files first:

1. `START_HERE.md` — lean current state and cleanup boundaries.
2. `BUILD_RULES.md` — safe-change rules for this public marketing site.
3. `HANDOFF.md` — current deploy/site state and follow-ups.
4. `wrangler.jsonc` — Cloudflare Workers Static Assets config.
5. `package.json` — deploy/check scripts and version pointer.

## Repo facts

- **Source of truth:** this repo. Pushes to `main` auto-deploy through Cloudflare Workers Builds.
- **Build:** none — self-contained static site deployed from `public/` with Workers Static Assets.
- **Entry:** `public/index.html`.
- **Assets:** `public/images/`, `public/menus/`, logo `public/Aziana_logo.png`.
- **Shared data:** `public/site-data.json`.
- **Version pointer:** `package.json` currently says `0.4.1`. Do not bump during cleanup.

## Deploy (Cloudflare Workers, Git-connected)

Cloudflare watches the production branch `main` and runs `npx wrangler deploy`. The static-assets configuration lives in `wrangler.jsonc`; no environment variables are required.

The production Worker is `aziana` at `aziana.chwong1979.workers.dev`. Custom domains are handled in Cloudflare.

## Cleanup rule of thumb

Cleanup is repo hygiene only: docs, archive pointers, and proven dead/stray files. Do not change public content, CSS, assets, menu PDFs, order/reservation IDs, SEO/schema facts, or Wrangler config during cleanup.
