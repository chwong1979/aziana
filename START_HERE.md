# Aziana site — START HERE

> **LATEST — v0.8.0 (2026-08-21): the people who send us customers are on the page.** A partner
> strip now sits in the footer of every page that has a footer (14 existing pages plus the new
> voucher page): Destinito, GoFastFerry, Bobby's Marina, SHTA, St Maarten Visit and St Maarten
> Boardwalk, each `target="_blank" rel="noopener noreferrer"`, each URL fetched live before it was
> written. Plain text links, not logos — the existing footer carries no third-party logo anywhere
> and four columns of plain text links, so logos would have been a new visual language. `/parking`
> is now the fifth item in the footer **Explore** list; it was previously reachable only from a
> printed bill. And `public/voucher.html` is new: `https://aziana.sx/voucher`, a deliberately dumb
> `<form method="get" action="https://pos.odarius.com/order/aziana/voucher">` so a printed gift
> ticket can carry Aziana's own domain. It does **not** validate the code, look it up, or call
> Supabase — the platform page answers wrong codes and non-existent codes identically on purpose.
> It works with JavaScript switched off; with JS the code is stripped of spaces and dashes,
> upper-cased and capped at 16 characters before it is sent. Roadmap rank 977, PR #23.
>
> ⚠ **Two version fields, and one of them was lying.** `package.json` and `worker/index.js`
> `VERSION` both exist and **only the worker constant reaches `/api/health`**. PRs #19–#22 bumped
> `package.json` and left the worker alone, so `/api/health` served `0.6.1` across four shipped
> releases — and `command.apps` "matched live" exactly, because both read the same stale source.
> Both fields are now `0.8.0`. **If you bump this repo, bump `worker/index.js`.**
>
> ⚠ **Known defect, roadmap rank 980.** Seven pages carry the day/night switch over an inline
> `<style>` block that has no `[data-theme="light"]` palette at all — `parking.html`, `faq.html`,
> `privacy.html`, `sushi-philipsburg.html`, `seasonal-campaigns.html`,
> `events-catering-sint-maarten.html`, `404.html`. The knob slides and the page stays dark. Only
> `index.html` (`styles.css`) and the six `landing.css` pages have the light palette;
> `voucher.html` ships with it and can be copied verbatim.

> **LATEST — v0.6.1 (2026-08-10): multilingual catering page.** The dedicated events and
> catering page now follows the homepage language preference and supports English, Dutch, French
> and Spanish as complete peer copy documents. Each locale carries the same offer in natural
> visitor-facing language, including inquiry templates and metadata. Contact facts, the menu URL,
> analytics attributes and event integration hooks remain unchanged. Tests enforce four-language
> document completeness. No native-speaker review is claimed.

> **LATEST — v0.6.0 (2026-08-10): natural multilingual website copy.** The existing
> English, Dutch, French and Spanish homepage now treats each language as a peer. Core visitor
> story blocks are written as complete, readable messages for that audience instead of being
> mechanically derived sentence by sentence from English. Names, dates, hours, contact details,
> order/reservation IDs, SEO metadata and the language selector remain unchanged. Tests enforce
> four-language block parity. No native-speaker review is claimed.

> **LATEST — v0.5.2 (2026-07-23): readable language menu.** The homepage language selector and its opened option list now use Aziana's dark panel and light text colors, with the browser's dark-control color scheme enabled. This fixes the white dropdown that made the language names unreadable. Worker `VERSION` 0.5.1→0.5.2; frontend styling only.
>
> **v0.5.1 (2026-07-22): customer language dropdown (i18n).** A language selector (English · Nederlands · Français · Español) is added to the top nav; the full homepage copy translates for customers — device-local (localStorage `aziana.lang`, defaults to the browser language), no login/kernel (customers aren't suite users). Implemented as a single injected `<script>` before `</body>` in `public/index.html`: a DOM text-node engine that caches each node's English original and swaps it by an EN→{nl,fr,es} catalog (99 entries). NOT translated by design: dish names (Babi Pangang, Dragon Roll, etc.), place/brand names (Bobby's Marina, Philipsburg, Aziana BV), the address, phone and hours numerals, the GloriaFood order widget (its own language), and the SEO landing pages (English-keyword-tuned). Translations are MACHINE-DRAFTED — native review pending before treating as final brand copy. `<html lang>` updates on switch.

**Repo:** `chwong1979/aziana`  
**Site:** Aziana marketing website  
**Primary domain:** `https://aziana.sx`  
**Odarius domain:** `https://aziana.odarius.com`  
**Worker fallback:** `aziana.chwong1979.workers.dev`  
**Current version pointer:** `package.json` = `0.8.0` **and** `worker/index.js` `VERSION` = `0.8.0` — these two must be bumped together; only the worker constant reaches `/api/health`.
**Rollback branch for this cleanup:** `backup/pre-doc-trim-2026-06-23`

## Azai chat widget (LIVE — promoted 2026-06-27)

- File: `public/azi-chat.js` is loaded by one line in `public/index.html` before `</body>`: `<script src="azi-chat.js" defer></script>`. (The script file is named `azi-chat.js`; only the on-screen persona changed to "Azai".)
- It is a self-contained IIFE (bottom-right bubble → panel) with scoped `azi-*` styles — a thin FRONT-END only. **The brain stays in AIOS:** it POSTs to Aziana's same-origin `/api/advisor`, which transparently proxies `https://ai.odarius.com/public/advisor` (no login; `app` forced to `aziana`; Haiku-pinned; per-IP 25/day; reply `{ok,source,text,...}`). Do NOT add AI logic to the widget — change brain behaviour in the `chwong1979/aios` repo.
- Current version **v0.1.4** (in the file's top comment): adds the quiet inline warning “Please don’t share payment or sensitive personal information.” with a Privacy link, plus a cryptographically random per-tab session identifier sent to AIOS. The browser never sends the identifier to Supabase directly; AIOS stores only its SHA-256 hash. There is no privacy popup or checkbox. Prior v0.1.3 renamed Azi→**Azai**, kept contacts email-first, and refined the panel sizing.
- `public/privacy.html` explains the purpose, administrator-only access, 90-day raw retention, hashed session identity, service providers, sensitive-data warning, and privacy contact. It is linked from the chat and homepage footer.
- Deploy = push to `main` (Cloudflare Workers Builds auto-deploys). Byte-verify the live file at `https://aziana.sx/azi-chat.js` after a push.
- Polish DONE 2026-06-27 (v0.4.3): the homepage "waterfront" overuse was trimmed — the two pure body-prose repeats (bar lede + footer tagline) were reworded, while every SEO-load-bearing instance was deliberately KEPT (meta description, OG tag, JSON-LD schema, the hero H1 `.wf` span, the "Waterfront Restaurant in Philipsburg" eyebrow, the "Waterfront Dining"/"Waterfront Evenings" section labels, alt text, the `.waterfront-night` CSS class + `gallery-waterfront-night.webp` filename). The dedicated SEO landing page `public/waterfront-restaurant-philipsburg.html` and the AI/SEO data files (`ai-knowledge.json`, `llms.txt`, `campaign-config.json`, `sitemap.xml`, `site-index.json`) were left entirely untouched. SUNDAY HOURS CONFIRMED by Chin 2026-06-27: Aziana is NOT open Sundays — the "Sunday | Closed" copy (index.html visit section, `site-data.json`, `ai-knowledge.json`, `llms.txt`) is correct as written; no change needed.
- Health proof DONE 2026-07-02 (v0.4.4): added a tiny Worker wrapper for `GET /api/health` so CommandOS Suite Truth can prove the deployed Aziana version. It delegates all non-health traffic to the existing static assets binding and does not change public content, SEO copy, images, ordering/reservation IDs, or the Azai widget.
- Suite notifications DONE 2026-07-13 (v0.5.0): `/api/visitor` emits at most one global active-visitor alert per UTC hour; successful `/api/advisor` calls emit at most one generic question alert per hashed session per UTC day. The Worker sends only the event and SHA-256 hash to a secret-authenticated Supabase RPC. Question text, history, raw session ID, IP, and page data are excluded.


## Read order

1. `START_HERE.md` — this lean state pointer.
2. `README.md` — repo/deploy map.
3. `BUILD_RULES.md` — safe-change rules for this marketing site.
4. `HANDOFF.md` — current state, risks, and next work.
5. `wrangler.jsonc` — Cloudflare Workers Static Assets config.
6. `package.json` — deploy/check commands and package version.

There is no heavy app runtime here. Treat the site as a static marketing website deployed from `public/`.

## Deploy shape

- Cloudflare Workers Static Assets.
- Production branch: `main`.
- Static asset directory: `./public` from `wrangler.jsonc`.
- Deploy command: `wrangler deploy` / Cloudflare Workers Builds.
- Runtime API routes are `/api/health`, `/api/visitor`, and `/api/advisor`; all other traffic delegates to the static-assets binding. Suite alert delivery requires the `AZIANA_SUITE_TOKEN` Worker secret and the non-secret Supabase URL/publishable-key vars in `wrangler.jsonc`.

## Important files

- `public/index.html` — homepage / main site shell.
- `public/styles.css` — site CSS.
- `public/site-data.json` — shared business/contact/hours/template data.
- `public/images/` — gallery and hero assets.
- `public/menus/Marina_Menu_2026.pdf` — live menu PDF.
- `public/Aziana_logo.png` — logo.

## Cleanup boundaries

Cleanup is behavior-neutral. Allowed cleanup only:

- lean docs/startup pointers;
- archive/pointer docs if needed;
- proven dead/stray files only after checking references.

Do **not** touch during cleanup:

- `public/index.html` content/layout;
- `public/styles.css` visual styling;
- `public/site-data.json` business facts;
- image/menu assets;
- `wrangler.jsonc` deploy config;
- SEO/schema copy, online-order buttons, or reservation/order IDs.

Aziana is a less-mature marketing site, so empty-looking pages, data files, or placeholders may be intentional SEO/AI scaffolding. Do not delete by appearance alone.

## Current known follow-ups

- Confirm live custom domains in browser only when Chin asks; do not claim full visual verification.
- Keep `site-data.json` as the shared factual data source for future AI/SEO surfaces.
- Any content/visual change is a build/refactor, not cleanup.

## Cleanup gate proof

At the end of a cleanup pass, compare `backup/pre-doc-trim-2026-06-23` → `main` and confirm:

- no site version bump unless the scoped work changes deploy/runtime behavior;
- no `public/**` content/asset changes unless explicitly scoped;
- no `wrangler.jsonc` change unless the scoped work changes deploy/runtime behavior;
- no visual/content/layout change;
- only docs changed, unless a stray file was proven safe to remove.
