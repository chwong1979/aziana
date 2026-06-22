# Aziana Cloudflare domain routing handoff

Last updated: 2026-06-22

## Goal

Make `https://aziana.sx/` the canonical live domain for the new Aziana Worker site.

Expected final behavior:

- `https://aziana.sx/` serves the new Worker/static-assets site.
- `https://www.aziana.sx/` redirects with 301 to `https://aziana.sx/`.
- No route should redirect apex `aziana.sx` to `www.aziana.sx`.

## Current repo status

Repository: `chwong1979/aziana`

The repository is clean for Cloudflare deployment:

- `public/_redirects` was removed because Cloudflare Workers static assets rejected host-based redirects in that file.
- `wrangler.jsonc` uses Worker name `aziana` and assets directory `./public`.
- `public/index.html` has canonical and schema URLs pointing to `https://aziana.sx/`.
- `public/robots.txt` and `public/sitemap.xml` point to `https://aziana.sx/`.
- A deploy trigger commit was pushed: `17259118e96681f33bfbac78c7f64b36bb4634cc`.

## Cloudflare status observed in dashboard

Worker project: `aziana`

Custom domains shown attached to the Worker:

- `aziana.sx`
- `www.aziana.sx`
- `aziana.odarius.com`

Active deployment observed earlier:

- New deployment from commit `17259118` appeared in Cloudflare after GitHub push.

Correct Page Rule observed:

```text
www.aziana.sx/*
Forwarding URL: 301 Permanent Redirect
Destination: https://aziana.sx/$1
```

This Page Rule is correct and should stay enabled.

## Problem still suspected

Some external/public checks still saw:

```text
https://aziana.sx/ -> https://www.aziana.sx/ -> old 2018-2024 Aziana site
```

However, the user’s incognito browser showed the new site at:

```text
https://aziana.sx/
```

So the new Worker site is deployed and reachable, but some route/cache/redirect path may still be forcing visitors to `www.aziana.sx` or serving the old host.

## Things to inspect with Cloudflare API or dashboard

Check these Cloudflare areas for `aziana.sx`:

1. Redirect Rules
   - Delete/disable any rule that sends `aziana.sx` to `www.aziana.sx`.
   - Keep only redirects that send `www.aziana.sx` to `https://aziana.sx/$1`.

2. Bulk Redirects
   - Look for any list entry or rule redirecting apex `aziana.sx` to `www.aziana.sx`.
   - Delete/disable only that bad apex-to-www redirect.

3. Workers Routes
   - Check for routes such as `aziana.sx/*` or `www.aziana.sx/*`.
   - Remove any route pointing to an old Worker/service.
   - It is okay if there are no routes because custom domains are already attached to the Worker.

4. DNS records
   - There should be no old `www` A record pointing to `54.177.117.207`.
   - There should be no old `www` CNAME pointing to the legacy host.
   - Keep all Zoho mail records: MX, SPF, DKIM, DMARC, and Zoho verification.

5. Cache
   - Purge everything after route/redirect changes.

## Cloudflare API token permissions needed

Use a scoped API token, not the global API key.

Recommended permissions:

- Zone DNS Edit
- Zone Page Rules Edit
- Zone Rulesets Edit
- Zone Cache Purge Edit
- Zone Workers Routes Edit
- Account Workers Scripts Edit
- Account Workers Builds Configuration Edit, if available

Scope only to:

- Account: `3ac5d115eca6bbd45805f5578d924efc`
- Zone: `f67340323a744d934a63f567f9cf0f2d`

## Environment variables for another AI/Codex agent

```text
CLOUDFLARE_API_TOKEN=...
CLOUDFLARE_ACCOUNT_ID=3ac5d115eca6bbd45805f5578d924efc
CLOUDFLARE_ZONE_ID=f67340323a744d934a63f567f9cf0f2d
```

## Instruction for the next agent

Inspect Cloudflare DNS, Redirect Rules, Bulk Redirects, Page Rules, Workers Routes, Worker custom domains, and cache for `aziana.sx`. Fix any rule that redirects apex `aziana.sx` to `www.aziana.sx`. The canonical setup should be `www.aziana.sx/* -> https://aziana.sx/$1`, while `https://aziana.sx/` directly serves the `aziana` Worker.
