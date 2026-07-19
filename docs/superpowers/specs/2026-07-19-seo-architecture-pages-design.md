# SEO Architecture: Routes / Services / Guides Pages — Design

Date: 2026-07-19
Source brief: `huglao-seo-architecture-spec.md` (user-provided, Part 0–7)

## Context

The site (`huglao-site`, Next.js App Router) already implements the "city" tier of the
hub-and-spoke plan at `/van/[city]/page.tsx`, driven by static data in `data/cities.ts`
(not Contentful). It already satisfies the spec's Part 0 principles: real URLs, transparent
"starting from" pricing, unique per-city content, breadcrumb + internal links, FAQ JSON-LD.

Contentful is used only for `article` content (`lib/contentful.ts`, `/articles/[slug]`),
per the original site handoff (`README.md`). This design keeps that boundary: Contentful is
not introduced for city/route/service/guide content. Everything new follows the existing
static-data pattern instead, to avoid rebuilding infrastructure that already works and to
keep content editable directly in the repo (single operator, per spec Part 6).

## Decisions (confirmed with user)

1. City tier: keep `/van/[city]/` as-is. Do not migrate to Contentful.
2. `/cities/` is a hub-only page — a grid of cards linking to the existing `/van/[slug]`
   URLs. No new `/cities/[slug]` route is created (avoids duplicate/competing URLs for the
   same content).
3. Phase 1 scope matches the spec in full: 3 hubs (`/routes/`, `/services/`, `/cities/`) +
   5 route pages + 4 new service pages + 3 guide pages.
4. Copy for all new pages is drafted now (Thai, unique per page, following the voice and
   structure of `data/cities.ts`), using `data/pricing.ts` as the source of truth for any
   price that already exists there. Any price without an existing match is marked with a
   `// TODO: confirm price` comment rather than invented, per the spec's own instruction not
   to fabricate numbers. The user reviews/corrects content after it's built.

## Data Layer

New files under `huglao-site/data/`, same shape/spirit as `data/cities.ts`:

### `data/routes.ts`
```ts
export interface RoutePriceRow { label: string; price: number; note?: string; }
export interface RouteFaq { q: string; a: string; }
export interface Route {
  slug: string;
  title: string;          // H1
  fromCity: string;
  toCity: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  intro: string[];
  distanceKm?: number;
  durationText?: string;
  priceTable: { currency: "THB"; rows: RoutePriceRow[]; disclaimer: string };
  included: string[];       // "รวมอะไรบ้าง" bullets
  excluded: string[];       // explicit "ไม่รวม" bullets (transparency principle)
  crossBorderNote?: string; // rich text as string[] paragraphs; links to /guides/cross-border-nongkhai where relevant
  sampleTimeline: { time: string; activity: string }[];
  faqs: RouteFaq[];
  relatedRouteSlugs: string[];
  relatedCitySlugs: string[];   // matches data/cities.ts slugs
}
export const routes: Route[] = [ /* 5 entries */ ];
export const getRouteBySlug = (slug: string) => routes.find(r => r.slug === slug);
```

Routes to author, each with real content unique to that leg (not a from/to template swap):

- `nongkhai-vientiane` — priced from `data/pricing.ts` "หน้าด่านลาว → ตัวเมืองเวียงจันทน์" (600฿) and related rows
- `vientiane-vangvieng` — priced from the "เหมาเที่ยววังเวียง" group (7,500฿ 1คืน2วัน / 10,000฿ 2คืน3วัน)
- `vangvieng-luangprabang` — no existing price row → `TODO: confirm price`
- `vientiane-airport-hotel` — point-to-point; price not in `pricing.ts` → `TODO: confirm price`
- `vientiane-train-station` — priced from "ตัวเมืองเวียงจันทน์ → สถานีรถไฟ" (800฿) and "หน้าด่านลาว → สถานีรถไฟลาว" (1,000฿)

### `data/services.ts`
```ts
export interface ServiceFaq { q: string; a: string; }
export interface Service {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  intro: string[];
  priceFrom?: number;        // TODO: confirm price where not established
  features: string[];
  faqs: ServiceFaq[];
  relatedCitySlugs: string[];
}
export const services: Service[] = [ /* 4 entries below */ ];
```
- `airport-transfer` — reuses existing airport-related pricing/content threads from `data/cities.ts` (Vientiane logistics mentions Wattay airport)
- `private-driver`
- `train-ticket` — ties into the Laos–China train guide
- `guide` (นำเที่ยว/ไกด์) — distinct from the `/guides/` info hub; naming collision flagged below

Note: `van-vip` is intentionally *not* duplicated here — the hub links directly to the
existing `/van-vip` page instead of creating a competing `/services/van-vip`.

### `data/guides.ts`
```ts
export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  body: string[];            // paragraphs; longer-form than route/service intros
  faqs: { q: string; a: string }[];
  relatedCitySlugs: string[];
  relatedRouteSlugs: string[];
}
export const guides: Guide[] = [ /* 3 entries */ ];
```
- `cross-border-nongkhai` — net-new content (checkpoint steps, documents, timing)
- `laos-money` — check `/articles` first for existing source material to extend rather than duplicate
- `laos-china-train` — same check against `/articles`

## Routing

```
app/cities/page.tsx                  (hub — cards → /van/[slug])
app/routes/page.tsx                  (hub — cards → /routes/[slug])
app/routes/[slug]/page.tsx
app/services/page.tsx                (hub — cards → /services/[slug], + /van-vip card)
app/services/[slug]/page.tsx
app/guides/page.tsx                  (hub — cards → /guides/[slug])
app/guides/[slug]/page.tsx
```

Each `[slug]/page.tsx` follows the structural pattern already established in
`app/van/[city]/page.tsx`: `generateStaticParams`, `generateMetadata` (title/description/
canonical/OG per spec Part 4 title patterns), hero with breadcrumb, content sections, FAQ
accordion, related-links strip, contact CTA section. Reuses existing components:
`Reveal`, `PricingTable` (route pages), `BreadcrumbStructuredData`.

Hub pages (`/cities`, `/routes`, `/services`, `/guides`) are simple server components:
grid of cards from `getAll*()`-style data accessors, no dynamic params.

## JSON-LD

- Every new page: `BreadcrumbList` via existing `<BreadcrumbStructuredData>`.
- Route and service detail pages: `Service` schema (per spec Part 4 example) with
  `areaServed`, `provider`, `offers.priceSpecification` sourced from the page's price data.
- Any page with a `faqs` array: `FAQPage` schema, same inline-script pattern already used in
  `app/van/[city]/page.tsx`.
- `Organization` JSON-LD already lives in the root layout — no change needed there.

## Internal Linking

- City page (`/van/[slug]`) already links to other cities; extend its "related links" strip
  to also include matching routes/services/guides via slug arrays, mirroring the pattern
  route/service/guide pages use for `relatedCitySlugs`.
- Route/service/guide detail pages link back to their related cities and to each other via
  the `related*Slugs` arrays.
- Hub pages link down to every child page (no orphans).
- Homepage and footer: any card/link still pointing at `#anchor` for a destination that now
  has a real route/service/guide page gets updated to the real `href`. Anchors for sections
  that remain single-page (e.g. `#process`, `#faq` on van-vip) are left as-is.

## Sitemap & Robots

Extend `app/sitemap.ts` to enumerate `routes`, `services`, and `guides` slugs alongside the
existing articles/cities entries. `app/robots.ts` needs no change (already points at
`sitemap.xml`).

## Naming Note

The spec's service list includes an item called "guide" (ไกด์นำเที่ยว, a bookable service)
which collides in name with the `/guides/` *content hub* (info-intent guides like
cross-border crossing). These are different things — `/services/guide` is a bookable
add-on service, `/guides/*` are informational pages. Both are built as specified; the naming
collision is inherent to the source spec and is called out here so it isn't mistaken for a
duplicate.

## Testing / Verification

- `npm run build` must succeed with no type errors and all `generateStaticParams` resolving.
- Visually spot-check `/routes/nongkhai-vientiane`, `/services/airport-transfer`,
  `/guides/cross-border-nongkhai` in the dev server preview (per repo convention of
  reusing `/van/[city]`'s visual template, no new styling risk expected, but verify anyway).
- Confirm `/sitemap.xml` includes all new URLs.
- Confirm no remaining `#explore`/`#anchor` links on the homepage/footer for destinations
  that now have real pages (spec Part 7, Step 6 acceptance criterion).

## Out of Scope (this design)

- Contentful migration for city/route/service/guide (spec Part 2, Step 2) — not applicable,
  static data is used instead per user decision.
- `/cities/[slug]` as a distinct route — hub links to `/van/[slug]` instead.
- Phase 2–4 of the spec's Part 6 build order (E-E-A-T, expanded articles, secondary
  cities/routes) — future work, not this pass.
