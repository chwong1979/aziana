# Aziana — marketing website

Static marketing site for **Aziana**, Asian fusion dining at Bobby's Marina, Philipsburg, Sint Maarten.

- **Source of truth:** this repo. Pushes to `main` auto-deploy via a Git-connected Cloudflare Pages project.
- **Build:** none — self-contained static site. Pages **output directory = repository root**.
- **Entry:** `index.html` (inline CSS, Google Fonts via CDN). Assets in `images/`, menu in `menus/`, logo `Aziana_logo.png`. All asset paths are relative.
- **Version:** v0.4.0 (see the `VERSION:` comment in `index.html`).

## Deploy (Cloudflare Pages, Git-connected)

Connect this repo - Production branch `main` - Framework preset: **None** - Build command: *(empty)* - Build output directory: **`/`**. No environment variables.

Previously served by the standalone `aziana` Cloudflare Worker (`aziana.chwong1979.workers.dev`); migrated to Git-connected Pages so deploys come from GitHub like the rest of the suite.
