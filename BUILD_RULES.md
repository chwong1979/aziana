# Aziana site — BUILD RULES

This repo is the public Aziana marketing website. It is smaller and less mature than PortalOS / BrisaOS / ExpenseOS, so treat scaffolding carefully.

## Build discipline

1. Surface real forks before changing copy, layout, photos, menu links, order/reservation buttons, or SEO/schema data.
2. Cleanup is behavior-neutral: docs, archive pointers, or proven dead/stray files only.
3. Do not edit `public/index.html`, `public/styles.css`, `public/site-data.json`, menu PDFs, images, or `wrangler.jsonc` during cleanup unless Chin explicitly asks for a build/content change.
4. Do not delete a duplicate-looking file by name alone. First prove it is not referenced by `public/index.html`, CSS, site data, menu links, schema, or Cloudflare static asset paths.
5. Keep all paths relative unless a canonical URL is deliberately required for SEO/schema.
6. Keep Aziana's current factual contact details unless Chin changes them: `azianabv@gmail.com`, phone `+1 (721) 542-6988`, WhatsApp `+1 (721) 588-0022`, Bobby's Marina / Juancho Yrausquin Boulevard #22.
7. Online ordering/reservation IDs are live integration IDs; do not change them casually.
8. Visual/browser changes are MIXED until Chin eyeballs the live site. Do not claim full visual verification.

## Deploy discipline

- Cloudflare Workers Static Assets deploy from `public/` using `wrangler.jsonc`.
- No database, no Supabase, no env vars, no AIOS migration work in this repo right now.
- Pushing docs to `main` is safe but may still trigger a Cloudflare build depending on project settings.

## Cleanup pass proof

At the end of a cleanup pass, compare rollback branch → main. Safe cleanup should show only docs or proven stray-file removals, no `public/**`, no `wrangler.jsonc`, no version bump, and no visual/content changes.
