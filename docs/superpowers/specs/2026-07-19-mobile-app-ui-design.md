# Mobile app-style UI redesign — design spec

**Date:** 2026-07-19
**Scope:** Mobile/tablet breakpoint only (< 768px). Desktop layout is unchanged.

## Goal

Make the site feel more like a native mobile app on phones: less vertical
scrolling to reach content and calls-to-action, and a persistent way to
navigate/book without scrolling back to the top.

## Out of scope

- Any change to desktop layout (≥768px keeps the existing `SiteHeader` nav).
- Multi-vehicle-type booking (SUV, MPV, minibus, bus). The user has a real
  vehicle network beyond VIP vans, but that's a separate future project
  (new IA, new data source, possibly a `/fleet` hub page). This spec's
  "จองรถ" tab links straight to the existing `/van-vip` page.
- Any SEO/schema/routing change — this is presentation-layer only. All
  routes, metadata, and JSON-LD from the SEO plan (Phases 1-3) stay as-is.

## 1. Bottom tab bar

A new `BottomTabBar` component, rendered once in `app/layout.tsx` (so it
appears on every page), visible only below the `md` breakpoint (Tailwind
`md:hidden`).

**Tabs** (4, fixed — not derived from any data file, this is chrome, not
content):

| Tab | Icon | Destination | Active match |
|---|---|---|---|
| หน้าหลัก | home | `/` | `pathname === "/"` |
| จองรถ | van | `/van-vip` | `pathname.startsWith("/van")` |
| บทความ | book | `/articles` | `pathname.startsWith("/articles")` |
| คุยทาง LINE | chat | `https://lin.ee/xudxWlE` (external, `target="_blank"`) | never active (external action, not a page) |

**Style:** background `var(--deep-green-2)`, hairline top border
`rgba(227,189,99,.15)`, inactive icon+label `#8a9c90`, active icon+label
`var(--gold-light)`. Icon above label, ~10px label text. `position: sticky;
bottom: 0`, full width, `z-index` above page content.

**Layout impact:** the last section of every page currently ends with
`padding-bottom` sized for normal scroll-to-end. Add extra bottom padding
(~72px, the tab bar's height) on mobile only, so the tab bar never
overlaps the final CTA/footer content. Apply via a wrapper in `layout.tsx`
rather than editing every page's last section individually.

**Active state:** needs the current pathname, so this is a Client
Component (`"use client"`, `usePathname()` from `next/navigation`), unlike
the rest of the mostly-static site.

## 2. Portrait-heavy sections → compact landscape cards (mobile only)

Applies only inside a `max-[767px]:` / mobile-specific style; desktop
markup and classes are untouched where feasible (prefer Tailwind
responsive prefixes over duplicating JSX).

### 2a. Homepage — `DESTINATIONS` cards (`app/page.tsx`, `#explore` section)

Current: each card is a `min-height: 340px` full-bleed background-image
tile, stacked full-width on mobile — 6 cards × 340px is a lot of scroll.

New (mobile only): horizontal card — landscape thumbnail (~110×78, using
the same `dest.image`) on the left, name/tag/desc on the right, in a
bordered row ~90px tall. Desktop keeps the existing tall tile grid
unchanged (`md:` prefixed original classes).

### 2b. Homepage — hero (`HeroParallax` section)

Current: `height: 100vh` fixed section on all breakpoints.

New: on mobile, cap height at `70vh` (via a mobile-specific class/media
query on the section, parallax layers scale with it since they're
`inset: 0`). Desktop stays `100vh`.

### 2c. `/van-vip` — `CITIES` section

Current: each city is a 2-column grid (image 4:3 alternating left/right +
2 paragraphs of text), collapsing to 1 column stacked on mobile — image
then ~2 paragraphs, repeated 4 times.

New (mobile only): same horizontal compact-card treatment as 2a — landscape
thumbnail + condensed single-line description (not the full 2-paragraph
body — mobile users tap through to `/van/[city]` for the full text, which
already exists and has unique content per Task 2.1). Desktop keeps the
existing alternating 2-column layout with full paragraphs.

### 2d. `/van-vip` — `HIGHLIGHTS` section fleet photos

Current: two `aspect-ratio: 4/3` images side by side, which stack to two
tall 4:3 images on mobile.

New (mobile only): show a single landscape (`16/9`) image instead of two
stacked portrait-ish ones. (Which one photo to keep, or whether to make it
a 2-photo horizontal strip, is an implementation-plan detail — this spec
fixes the direction: one row, landscape, not two stacked squares.)

### 2e. `/van/[city]` hero image

Already `aspect-ratio: 16/7` (landscape) — no aspect change needed. Only
reduce the section's vertical padding/height slightly on mobile to match
the tighter feel of the rest of the redesign.

## Testing / verification

- `next build` + `tsc --noEmit` must stay clean.
- Manually verify in the browser preview at mobile width (375×812) and
  desktop width (1280×800) that:
  - Tab bar shows only on mobile, all 4 destinations navigate correctly,
    active tab highlights match the current route.
  - No content is hidden behind the tab bar on any page (scroll to the
    very bottom of `/`, `/van-vip`, a `/van/[city]` page, `/articles`, and
    an article page).
  - Desktop layout is pixel-for-pixel unchanged from before this work
    (spot-check hero heights, destination card grid, city section layout).
