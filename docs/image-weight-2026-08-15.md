# Photograph weight — measured and halved, 2026-08-15

Chin: *"compact the pictures of template number one and make sure it can run properly,
because if it doesn't, it will not be used."*

## What was measured first

Live, on `aziana.sx`, cold-fetching every image the page references:

| | |
|---|---|
| Images referenced by the site | 22 JPEG, 3 WebP |
| `public/images` on disk | **5,310 KB** |
| Referenced photographs | **3,674 KB** |
| Loaded before any scrolling | 4 files, **1,136 KB** |
| Largest single file | `gallery-salt-pepper-shrimp.jpg`, 399 KB |
| Oversupplied for their display size | logo 3.2×, gallery images 2.2× |

The photographs were saved at near-maximum JPEG quality at 1,288–1,600 px wide, and displayed
at 360–600 CSS px.

## What changed

**Referenced photographs: 3,674 KB → 1,894 KB. 48% smaller, 1.78 MB saved.**

| File | Before | After | Saved |
|---|---|---|---|
| gallery-salt-pepper-shrimp.jpg | 399K | 111K | 72% |
| dish-snack-platter.jpg | 385K | 110K | 71% |
| gallery-babi-pangang.jpg | 376K | 106K | 72% |
| dish-dragon-roll.jpg | 343K | 224K | 35% |
| visit-aerial.jpg | 302K | 193K | 36% |
| setting.jpg | 297K | 187K | 37% |
| dish-sashimi-combo.jpg | 257K | 86K | 67% |
| bar.jpg | 206K | 137K | 34% |
| dish-seared-tuna.jpg | 201K | 122K | 39% |
| events.jpg | 171K | 112K | 35% |
| hero-mobile.jpg | 155K | 109K | 30% |
| hero.jpg | 152K | 96K | 37% |
| dish-grilled-salmon.jpg | 132K | 78K | 41% |
| events-square.jpg | 121K | 93K | 23% |
| gallery-nigiri-selection.jpg | 97K | 55K | 43% |
| story.jpg | 80K | 75K | 7% |

Capped at 1,200 px wide (every one of these displays at ≤ 600 CSS px, so 1,200 still covers a
2× screen), re-encoded with mozjpeg at quality 78, progressive, metadata stripped.

## Why nothing else changed

**Not one line of HTML or CSS was touched.** Same filenames, same aspect ratios, same markup —
so there is no layout to re-verify, and the only thing that moved is the number of bytes on the
wire. `BUILD_RULES` rule 8 says visual changes stay MIXED until Chin eyeballs the live site; a
pass that *cannot* change layout is a pass that cannot break it.

Two originals were compared against their replacements side by side at display size and are
indistinguishable — but per rule 8 that is **not** a claim of full visual verification. Chin
should look at the live site.

## Two things worth knowing

**`sips` was the first attempt and it made files bigger.** Resampling `dish-dragon-roll.jpg`
from 1,288 px to 1,200 px took it from 351 KB to **440 KB**, and a quality pass afterwards would
not bring it back. macOS's JPEG encoder is not fit for this. Measured, not assumed — the work
switched to libvips/mozjpeg. Anyone repeating this pass should not reach for `sips`.

**A guard is built into the script:** a file that comes out of the encoder *larger* than it went
in is left alone. Keeping the original is strictly better than "we optimised it".

## Found along the way, not fixed

- **`gallery-seared-tuna.jpg` is not a valid image.** Every decoder rejects it — `sips` reports
  0×0 and libvips reports an unsupported format. It is also referenced by nothing, so no visitor
  has ever been affected. **Left in place**: `BUILD_RULES` rule 4 is explicit that a file is not
  stray just because a scan says so, and deleting it is not what this pass was scoped to do.
- **Six unreferenced images**, 1,331 KB on disk: `cuisine-poke.jpg`, `cuisine-steak.jpg`,
  `cuisine-sushi.jpg`, `gallery-salmon-poke.jpg`, `gallery-seared-tuna.jpg`,
  `gallery-snack-platter.jpg`. They cost a visitor nothing because nothing downloads them, so
  they were neither re-encoded nor deleted. Proven unreferenced by scanning every `.html`,
  `.css`, `.json`, `.js`, `.txt` and `.xml` under `public/` — which satisfies rule 4's evidence
  bar, but the decision to remove them is Chin's.
- **The logo is served at 1,022×291 and displayed at 162×46** — about 3.2× more pixels than any
  screen uses. It is a PNG, so it was outside this JPEG pass. Worth its own small change.

## The bigger remaining win, which is not a code change

WebP would roughly halve these again, but delivering it properly means `<picture>` elements
across twelve HTML files — real layout risk for a site whose rules say visual changes need
Chin's eyes. **Cloudflare Polish** (Speed → Optimization → Image Optimization) converts to WebP
automatically at the edge with no markup change at all. That is a dashboard setting, not a
repo change, and it is the cheapest remaining improvement by a wide margin.
