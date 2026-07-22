# City Root Routes + Laos Travel Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move city van-landing pages from `/van/[city]` to root `/[city]`, add a new `/laos-travel` hub listing the 4 primary cities (Vientiane, Muang Feuang, Vang Vieng, Luang Prabang) while keeping Pakse/Xieng Khuang/Boten hidden from navigation, and wire Contentful (reusing the existing `article` content type plus a new `city` field) so each city page can list and serve its own sub-articles at `/[city]/[slug]`.

**Architecture:** `data/cities.ts` gains a `hidden` flag and a new Muang Feuang entry. The existing `app/van/[city]/page.tsx` becomes `app/[city]/page.tsx` (root dynamic segment — safe because Next.js resolves static routes like `/about` and `/van-vip` before dynamic ones). The old `/van/[city]` path is kept alive as a thin `noindex` + meta-refresh redirect stub (the site is live; static export can't do server-side 301s). `lib/contentful.ts` gets `getArticlesByCity`/`getArticleByCitySlug`, and the existing `article` list/detail queries are filtered to exclude city-tagged entries so an article is never reachable at two URLs. A new `app/[city]/[slug]/page.tsx` (modeled on `app/articles/[slug]/page.tsx`) renders city sub-articles. `app/laos-travel/page.tsx` is a new static hub page.

**Tech Stack:** Next.js 16 App Router, static export (`output: "export"`), Contentful (`contentful` SDK + `@contentful/rich-text-react-renderer`), TypeScript, Tailwind.

---

## Manual step (do this in the Contentful web UI before Task 7)

Open the `article` content type in Contentful → add a new field:
- **Field ID:** `city`
- **Type:** Short text
- **Validation:** "Accept only specified values" → `vientiane`, `vangvieng`, `luangprabang`, `muangfeuang`, `pakse`
- **Required:** No (leave blank for general `/articles` posts that aren't tied to a city)

This field's value must match a `slug` in `data/cities.ts` exactly (lowercase, no spaces) — that's what the code below queries against.

---

### Task 1: Add `hidden` flag + Muang Feuang city data

**Files:**
- Modify: `data/cities.ts:22-38` (interface), `data/cities.ts:144-177` (pakse entry + end of array)

- [ ] **Step 1: Add `hidden` to the `City` interface**

In `data/cities.ts`, update the interface (around line 22):

```typescript
export interface City {
  /** ใช้เป็น path /[slug] (เดิม /van/[slug]) */
  slug: string;
  /** ชื่อเมืองภาษาไทย เช่น "เวียงจันทน์" — ใช้ match กับ pricingGroups ด้วย getPricingGroupsForCity */
  name: string;
  tagline: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  /** ย่อหน้าเนื้อหาเฉพาะเมือง (unique content) */
  intro: string[];
  attractions: CityAttraction[];
  /** ข้อมูลระยะทาง/เวลาเดินทางจากด่าน สนามบิน หรือเมืองใกล้เคียง */
  logistics: string;
  programs: CityProgram[];
  faqs: CityFaq[];
  /** true = ยังไม่โชว์ในหน้ารวมเมือง (homepage, /laos-travel) แต่ URL ยังเข้าได้ตรง ๆ */
  hidden?: boolean;
}
```

- [ ] **Step 2: Mark Pakse as hidden**

In the Pakse object (starts at `data/cities.ts:144`), add `hidden: true` right after `slug: "pakse",`:

```typescript
  {
    slug: "pakse",
    hidden: true,
    name: "ปากเซ",
```

- [ ] **Step 3: Add the Muang Feuang city entry**

Insert this new object into the `cities` array, right after the closing `},` of the Pakse entry (still before the array's closing `];` at `data/cities.ts:178`):

```typescript
  {
    slug: "muangfeuang",
    name: "เมืองเฟือง",
    tagline: "เมืองเล็กริมภูเขาหินปูน เงียบสงบกว่าวังเวียง เหมาะกับสายชิลตัวจริง",
    heroImage: "/assets/dest-vangvieng.webp",
    metaTitle: "รถตู้เมืองเฟือง พร้อมคนขับ | เช่ารถตู้ VIP เที่ยวเมืองเฟือง ลาว | Huglao",
    metaDescription:
      "รถตู้เมืองเฟืองพร้อมคนขับมืออาชีพ พาเที่ยวถ้ำ น้ำตก และภูเขาหินปูนรอบเมืองเฟือง เมืองเล็กเงียบสงบใกล้วังเวียง เหมาะกับทริปพักผ่อนแบบไม่พลุกพล่าน ทักแชทขอใบเสนอราคา",
    intro: [
      "เมืองเฟืองเป็นเมืองเล็กที่อยู่ไม่ไกลจากวังเวียง แต่บรรยากาศเงียบสงบกว่ามาก เหมาะกับนักท่องเที่ยวที่อยากสัมผัสภูเขาหินปูนและถ้ำแบบไม่ต้องเจอฝูงนักท่องเที่ยวจำนวนมากเหมือนวังเวียง ถนนเข้าเมืองเป็นทางลาดยางส่วนใหญ่แต่บางช่วงแคบ การมีคนขับที่ชำนาญเส้นทางช่วยให้เดินทางสบายขึ้นมาก",
      "จุดท่องเที่ยวหลักของเมืองเฟืองกระจายอยู่รอบตัวเมือง เดินทางระหว่างจุดใช้เวลาไม่นาน จึงสามารถจัดโปรแกรมแบบวันเดียวหรือผสมกับทริปวังเวียงในทริปเดียวกันได้สะดวก",
    ],
    attractions: [
      { name: "ถ้ำเจียง (Tham Chang)", desc: "ถ้ำขนาดใหญ่มีน้ำพุใสไหลออกจากปากถ้ำ บรรยากาศร่มรื่น" },
      { name: "ภูเขาหินปูนรอบเมือง", desc: "ทิวเขาหินปูนสวยงามรอบเมืองเฟือง เหมาะถ่ายรูปยามเช้าที่มีหมอกลอยตัว" },
      { name: "หมู่บ้านชาวลาวริมเขา", desc: "สัมผัสวิถีชีวิตท้องถิ่นที่ยังไม่พลุกพล่านนักท่องเที่ยว" },
      { name: "จุดชมวิวภูเขาหินปูน", desc: "จุดถ่ายรูปพระอาทิตย์ตกที่คนไปน้อยกว่าวังเวียง บรรยากาศเงียบสงบ" },
    ],
    logistics:
      "จากวังเวียงมาเมืองเฟืองใช้เวลาประมาณ 30-45 นาที ถนนส่วนใหญ่ลาดยางแต่บางช่วงแคบ เหมาะจัดเป็นทริปครึ่งวันแวะระหว่างทางไปวังเวียง หรือแยกเป็นทริปเดี่ยวสำหรับผู้ที่อยากพักผ่อนแบบเงียบสงบจริง ๆ",
    programs: [
      { title: "เมืองเฟืองครึ่งวัน", duration: "ครึ่งวัน", body: "เหมาะแวะระหว่างทางไป-กลับวังเวียง เที่ยวถ้ำเจียงและจุดชมวิวหลัก" },
      { title: "เมืองเฟือง 1 คืน 2 วัน", duration: "1 คืน 2 วัน", body: "พักค้างคืนสัมผัสบรรยากาศเงียบสงบ เหมาะกับสายชิลที่อยากหนีความพลุกพล่าน" },
    ],
    faqs: [
      { q: "เมืองเฟืองต่างจากวังเวียงยังไง", a: "เมืองเฟืองเงียบสงบกว่ามาก นักท่องเที่ยวน้อยกว่า เหมาะกับผู้ที่อยากพักผ่อนแบบไม่พลุกพล่าน" },
      { q: "จากวังเวียงมาเมืองเฟืองไกลไหม", a: "ใช้เวลาประมาณ 30-45 นาที ถนนส่วนใหญ่ลาดยาง" },
      { q: "เที่ยวเมืองเฟืองครึ่งวันพอไหม", a: "พอสำหรับจุดหลักอย่างถ้ำเจียงและจุดชมวิว แต่ถ้าอยากพักผ่อนเต็มที่แนะนำค้างคืน 1 คืน" },
      { q: "รวมทริปเมืองเฟืองกับวังเวียงในทริปเดียวได้ไหม", a: "ได้ครับ เป็นเส้นทางยอดนิยม ทีมงานจัดโปรแกรมรวมสองเมืองในทริปเดียวให้ได้" },
    ],
  },
```

> Note: `heroImage` reuses `/assets/dest-vangvieng.webp` as a temporary placeholder — flag to the project owner that a real Muang Feuang photo should replace it before this page is promoted/linked externally.

- [ ] **Step 4: Verify it builds**

Run: `npm run build`
Expected: build succeeds, no TypeScript errors, and `out/van/muangfeuang/index.html` and `out/muangfeuang/index.html` do **not** exist yet (routes not moved/created until later tasks — at this point only `/van/[city]` exists, so expect `out/van/muangfeuang/index.html` to now be generated since `generateStaticParams` in `app/van/[city]/page.tsx` iterates over all `cities`).

- [ ] **Step 5: Commit**

```bash
git add data/cities.ts
git commit -m "feat: add hidden flag and Muang Feuang city data"
```

---

### Task 2: Move city landing page from `/van/[city]` to root `/[city]`

**Files:**
- Create: `app/[city]/page.tsx` (moved + edited from `app/van/[city]/page.tsx`)
- Delete (content replaced in Task 3): none yet — old file is repurposed, not deleted

- [ ] **Step 1: Create `app/[city]/page.tsx`**

Copy the full contents of `app/van/[city]/page.tsx` into a new file `app/[city]/page.tsx`, then apply these text replacements inside the new file:

1. `generateMetadata` — replace the `canonical`/`url` values:
```typescript
    alternates: { canonical: `/${city.slug}` },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `/${city.slug}`,
      type: "website",
      images: [{ url: city.heroImage }],
    },
```
(was `` `/van/${city.slug}` `` in both places)

2. Add a `robots: { index: !city.hidden }` entry to the returned `Metadata` object so hidden cities (Pakse) aren't indexed while still being reachable by direct URL:
```typescript
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    robots: { index: !city.hidden },
    alternates: { canonical: `/${city.slug}` },
    ...
```

3. Breadcrumb block — replace:
```tsx
      <BreadcrumbStructuredData
        items={[
          { name: "หน้าแรก", href: "/" },
          { name: "รถตู้ VIP เที่ยวลาว", href: "/van-vip" },
          { name: `รถตู้${city.name}`, href: `/${city.slug}` },
        ]}
      />
```

4. Breadcrumb nav JSX — replace the `Link href="/van-vip"` breadcrumb's sibling span; the city itself has no href already (correct), no change needed there.

5. "INTERNAL LINKS" section — replace `href={`/van/${c.slug}`}` with `href={`/${c.slug}`}` and filter out hidden cities from `otherCities`:
```tsx
  const otherCities = cities.filter((c) => c.slug !== city.slug && !c.hidden);
```
and:
```tsx
          {otherCities.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
            >
              รถตู้{c.name} →
            </Link>
          ))}
```

6. `generateStaticParams` stays as-is (`return cities.map((c) => ({ city: c.slug }));`) — this generates a page for every city including hidden ones, which is intended (URL still works, just `noindex` + absent from nav).

- [ ] **Step 2: Add the Contentful city-articles section to `app/[city]/page.tsx`**

This depends on `getArticlesByCity` from Task 7. Add the import and a new section — place it right before the `{/* ===== FAQ ===== */}` section:

```tsx
import { getArticlesByCity } from "@/lib/contentful";
```

Change the component to fetch articles (it's already `async`):

```tsx
export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const pricingGroups = getPricingGroupsForCity(city.name);
  const otherCities = cities.filter((c) => c.slug !== city.slug && !c.hidden);
  const cityArticles = await getArticlesByCity(city.slug);
```

New section (insert before the FAQ section):

```tsx
      {/* ===== ARTICLES ===== */}
      {cityArticles.length > 0 && (
        <section id="articles" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
          <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">บทความ</span>
          <h2 className="mt-3 mb-4 md:mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
            บทความเกี่ยวกับ{city.name}
          </h2>
          <div className="grid gap-3 md:gap-[22px] md:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
            {cityArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/${city.slug}/${a.slug}`}
                className="no-underline block bg-white border border-border rounded-2xl p-4 md:p-[26px] hover:border-gold-light transition-colors"
              >
                <h3 className="m-0 mb-1.5 md:mb-2 text-[.96rem] md:text-[1.05rem] text-deep-green-2">{a.title}</h3>
                <p className="m-0 text-text-muted text-[.86rem] md:text-[.94rem] leading-[1.6] md:leading-[1.7]">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
```

- [ ] **Step 3: Delete the old `app/van/[city]/page.tsx` full implementation** (its replacement, a redirect stub, is written in Task 3 — don't leave both the full page and a stub at the same path)

This step is a placeholder marker only — actual file content replacement happens in Task 3, Step 1. Do not run `rm` yet.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: build succeeds; `out/vientiane/index.html`, `out/vangvieng/index.html`, `out/luangprabang/index.html`, `out/pakse/index.html`, `out/muangfeuang/index.html` all exist. `out/van/vientiane/index.html` etc. also still exist (old page not yet replaced — that's Task 3).

- [ ] **Step 5: Commit**

```bash
git add app/[city]/page.tsx
git commit -m "feat: add root-level city landing pages at /[city]"
```

---

### Task 3: Turn `/van/[city]` into a noindex redirect stub

**Files:**
- Modify: `app/van/[city]/page.tsx` (replace entire file content)

- [ ] **Step 1: Replace `app/van/[city]/page.tsx` with a redirect stub**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "@/data/cities";

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: city.metaTitle,
    robots: { index: false, follow: true },
    alternates: { canonical: `/${city.slug}` },
  };
}

/** หน้านี้เก็บไว้เพราะ URL /van/[city] เคย live มาก่อน — เปลี่ยนที่อยู่ถาวรไปเป็น /[city] แล้ว */
export default async function OldCityVanRedirect({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const target = `/${city.slug}`;

  return (
    <html lang="th">
      <head>
        <meta httpEquiv="refresh" content={`0;url=${target}`} />
      </head>
      <body style={{ fontFamily: "sans-serif", padding: "40px", textAlign: "center" }}>
        <p>
          หน้านี้ย้ายไปที่{" "}
          <Link href={target}>{target}</Link>
        </p>
      </body>
    </html>
  );
}
```

> This intentionally renders its own `<html>`/`<body>` instead of using the root layout (no header/footer/nav needed for a transient redirect page). Next.js App Router allows a leaf `page.tsx` to do this since it's still inside `app/layout.tsx`'s `<html>`/`<body>` — **actually it is not allowed to nest `<html>` twice.** Use this simpler version instead (no nested `<html>`/`<body>`, relies on root layout):

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "@/data/cities";

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: `${city.metaTitle} (ย้ายที่อยู่แล้ว)`,
    robots: { index: false, follow: true },
    alternates: { canonical: `/${city.slug}` },
    other: { "refresh": `0;url=/${city.slug}` },
  };
}

export default async function OldCityVanRedirect({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const target = `/${city.slug}`;

  return (
    <div style={{ maxWidth: 640, margin: "80px auto", padding: 24, textAlign: "center" }}>
      <p>
        หน้านี้ย้ายไปที่{" "}
        <Link href={target} className="text-gold-dark font-semibold underline">
          {target}
        </Link>
      </p>
    </div>
  );
}
```

Metadata's `other: { refresh: "0;url=/vientiane" }` renders as `<meta name="refresh" content="0;url=/vientiane">` which browsers do **not** honor (browsers only act on `<meta http-equiv="refresh">`, not `name="refresh"`). Since Next.js `generateMetadata` has no built-in `http-equiv` meta option, add the actual redirect meta tag directly in the page body instead — replace the returned JSX with:

```tsx
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <div style={{ maxWidth: 640, margin: "80px auto", padding: 24, textAlign: "center" }}>
        <p>
          หน้านี้ย้ายไปที่{" "}
          <Link href={target} className="text-gold-dark font-semibold underline">
            {target}
          </Link>
        </p>
      </div>
    </>
  );
```

Remove the `other: { refresh: ... }` line from `generateMetadata` (dead weight now that the real tag is in the body).

- [ ] **Step 2: Verify build and manually confirm the redirect**

Run: `npm run build && npx serve out -l 4000` (or any static file server)
Then open `http://localhost:4000/van/vientiane/` in a browser.
Expected: page briefly shows "หน้านี้ย้ายไปที่ /vientiane" then auto-navigates to `http://localhost:4000/vientiane/`.

- [ ] **Step 3: Commit**

```bash
git add "app/van/[city]/page.tsx"
git commit -m "fix: turn /van/[city] into a noindex redirect stub pointing to /[city]"
```

---

### Task 4: Update homepage destination links + add Muang Feuang, hide Pakse

**Files:**
- Modify: `app/page.tsx:36-41` (destinations data), `app/page.tsx:319`, `app/page.tsx:364`

- [ ] **Step 1: Update the destinations array**

Find the destinations array (around `app/page.tsx:36-41`) and replace it with (adds Muang Feuang, removes Pakse's `citySlug` so it stops linking — matching how Xieng Khuang/Boten are already handled):

```typescript
  { name: "เวียงจันทน์", citySlug: "vientiane", tag: "เมืองหลวง", desc: "พระธาตุหลวง · ประตูชัย · วัดสีเมือง · ตลาดกลางคืนริมโขง", gradient: "linear-gradient(165deg,#2c5a3c,#123524)", image: "/assets/dest-vientiane.webp" },
  { name: "หลวงพระบาง", citySlug: "luangprabang", tag: "มรดกโลก", desc: "วัดเชียงทอง · ตักบาตรข้าวเหนียว · น้ำตกตาดกวางสี · พูสี", gradient: "linear-gradient(165deg,#a87815,#7a5510)", image: "/assets/dest-luangprabang.webp" },
  { name: "วังเวียง", citySlug: "vangvieng", tag: "ผจญภัย", desc: "บลูลากูน · ล่องเรือแม่น้ำซอง · บอลลูน · ถ้ำปูคำ", gradient: "linear-gradient(165deg,#1b4a32,#0a1f14)", image: "/assets/dest-vangvieng.webp" },
  { name: "เมืองเฟือง", citySlug: "muangfeuang", tag: null, desc: "ถ้ำเจียง · ภูเขาหินปูน · เงียบสงบกว่าวังเวียง", gradient: "linear-gradient(165deg,#2c5a3c,#123524)", image: "/assets/dest-vangvieng.webp" },
  { name: "ปากเซ · โบโลเวน", citySlug: null, tag: null, desc: "ที่ราบสูงไร่กาแฟ · น้ำตกตาดฟาน · ปราสาทวัดพู", gradient: "linear-gradient(165deg,#2c5a3c,#123524)", image: "/assets/dest-pakse.webp" },
  { name: "เชียงขวาง", citySlug: null, tag: null, desc: "ทุ่งไหหิน · ประวัติศาสตร์ · ธรรมชาติบนที่สูง", gradient: "linear-gradient(165deg,#a87815,#7a5510)", image: "/assets/dest-xiengkhouang.webp" },
  { name: "บ่อเต็น (ชายแดนจีน)", citySlug: null, tag: null, desc: "ปลายทางรถไฟลาว–จีน · เขตการค้าชายแดน", gradient: "linear-gradient(165deg,#1b4a32,#0a1f14)", image: "/assets/dest-boten.webp" },
```

- [ ] **Step 2: Update the two `Link` hrefs from `/van/${dest.citySlug}` to `/${dest.citySlug}`**

At `app/page.tsx:319`:
```tsx
                <Link key={dest.name} href={`/${dest.citySlug}`} className={rowClass}>
```

At `app/page.tsx:364`:
```tsx
                  {dest.citySlug ? (
                    <Link href={`/${dest.citySlug}`} className={`${cardClass} no-underline`} style={{ minHeight: 340, background: dest.gradient }}>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds, homepage shows Muang Feuang card and no longer links Pakse.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: point homepage destination links at root city URLs, add Muang Feuang, hide Pakse link"
```

---

### Task 5: Update `/articles/[slug]` related-service links to root city URLs

**Files:**
- Modify: `app/articles/[slug]/page.tsx:11-15`

- [ ] **Step 1: Update `getRelatedServices`**

```typescript
function getRelatedServices(tags: string[]): { label: string; href: string }[] {
  if (tags.some((t) => t.includes("รถไฟ"))) {
    return [
      { label: "รถตู้รับจากสถานีรถไฟวังเวียง", href: "/vangvieng" },
      { label: "รถตู้รับจากสถานีรถไฟหลวงพระบาง", href: "/luangprabang" },
    ];
  }
  return [{ label: "ดูรถตู้ VIP เที่ยวลาวทั้งหมด", href: "/van-vip" }];
}
```

- [ ] **Step 2: Commit**

```bash
git add app/articles/\[slug\]/page.tsx
git commit -m "fix: update related-service links to root city URLs"
```

---

### Task 6: Extend `lib/contentful.ts` with city-scoped queries and exclude city articles from `/articles`

**Files:**
- Modify: `lib/contentful.ts` (entire file)

- [ ] **Step 1: Rewrite `lib/contentful.ts`**

```typescript
import { createClient } from "contentful";
import type { Document } from "@contentful/rich-text-types";

export type Article = {
  title: string;
  slug: string;
  cover: string | null;
  author: string;
  publishDate: string;
  tags: string[];
  excerpt: string;
  content: Document;
  city: string | null;
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toArticle(entry: any): Article {
  const fields = entry.fields;
  const coverFile = fields.cover?.fields?.file;
  return {
    title: fields.title ?? "",
    slug: fields.slug ?? "",
    cover: coverFile ? `https:${coverFile.url}` : null,
    author: fields.author ?? "",
    publishDate: fields.publishDate ?? "",
    tags: String(fields.category ?? "")
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean),
    excerpt: fields.excerpt ?? "",
    content: fields.content,
    city: fields.city ?? null,
  };
}

/** บทความทั่วไปสำหรับ /articles — ไม่รวมบทความที่ผูกกับเมือง (ผูกแล้วให้ไปอยู่ที่ /[city]/[slug] แทน กัน duplicate content) */
export async function getAllArticles(): Promise<Article[]> {
  const res = await client.getEntries({
    content_type: "article",
    "fields.city[exists]": false,
    order: ["-fields.publishDate"],
  });
  return res.items.map(toArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const res = await client.getEntries({
    content_type: "article",
    "fields.city[exists]": false,
    "fields.slug": slug,
    limit: 1,
  });
  if (!res.items.length) return null;
  return toArticle(res.items[0]);
}

/** บทความที่ผูกกับเมือง ใช้กับหน้า /[city] และ /[city]/[slug] — citySlug ต้องตรงกับ data/cities.ts (เช่น "vientiane") */
export async function getArticlesByCity(citySlug: string): Promise<Article[]> {
  const res = await client.getEntries({
    content_type: "article",
    "fields.city": citySlug,
    order: ["-fields.publishDate"],
  });
  return res.items.map(toArticle);
}

export async function getArticleByCitySlug(
  citySlug: string,
  articleSlug: string
): Promise<Article | null> {
  const res = await client.getEntries({
    content_type: "article",
    "fields.city": citySlug,
    "fields.slug": articleSlug,
    limit: 1,
  });
  if (!res.items.length) return null;
  return toArticle(res.items[0]);
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds (with `CONTENTFUL_SPACE_ID`/`CONTENTFUL_ACCESS_TOKEN` set in `.env.local`, same as before — no schema change required on the Contentful side to keep building, since `city` is optional and unset articles just pass the new `"fields.city[exists]": false` filter).

- [ ] **Step 3: Commit**

```bash
git add lib/contentful.ts
git commit -m "feat: add city-scoped Contentful queries, exclude city articles from /articles"
```

---

### Task 7: Add `app/[city]/[slug]/page.tsx` for city sub-articles

**Files:**
- Create: `app/[city]/[slug]/page.tsx` (adapted from `app/articles/[slug]/page.tsx`)

- [ ] **Step 1: Create the file**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { cities, getCityBySlug } from "@/data/cities";
import { getArticleByCitySlug, getArticlesByCity } from "@/lib/contentful";

export async function generateStaticParams() {
  const params: { city: string; slug: string }[] = [];
  for (const city of cities) {
    const articles = await getArticlesByCity(city.slug);
    for (const a of articles) {
      params.push({ city: city.slug, slug: a.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}): Promise<Metadata> {
  const { city: citySlug, slug } = await params;
  const city = getCityBySlug(citySlug);
  const article = city ? await getArticleByCitySlug(citySlug, slug) : null;
  if (!city || !article) return {};
  return {
    title: `${article.title} | HUGLAO GROUP`,
    description: article.excerpt,
    robots: { index: !city.hidden },
    alternates: { canonical: `/${city.slug}/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.cover ? [article.cover] : undefined,
      type: "article",
    },
  };
}

const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_2]: (_node: unknown, children: React.ReactNode) => (
      <h2 className="mt-9 mb-3 font-serif-th font-bold text-[1.5rem] text-deep-green-2">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: unknown, children: React.ReactNode) => (
      <h3 className="mt-7 mb-2.5 font-serif-th font-bold text-[1.2rem] text-deep-green-2">{children}</h3>
    ),
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: React.ReactNode) => (
      <p className="mb-[18px] text-[#3a3d33] text-[1.06rem] leading-[1.85]">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_node: unknown, children: React.ReactNode) => (
      <ul className="mb-[18px] pl-6 list-disc text-[#3a3d33] text-[1.06rem] leading-[1.85]">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: unknown, children: React.ReactNode) => (
      <ol className="mb-[18px] pl-6 list-decimal text-[#3a3d33] text-[1.06rem] leading-[1.85]">{children}</ol>
    ),
    [BLOCKS.TABLE]: (_node: unknown, children: React.ReactNode) => (
      <div className="overflow-x-auto mb-[18px]">
        <table className="w-full border-collapse text-[.95rem]">
          <tbody>{children}</tbody>
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (_node: unknown, children: React.ReactNode) => (
      <tr className="border-b border-border-2">{children}</tr>
    ),
    [BLOCKS.TABLE_CELL]: (_node: unknown, children: React.ReactNode) => (
      <td className="px-3 py-2 align-top">{children}</td>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (_node: unknown, children: React.ReactNode) => (
      <th className="px-3 py-2 text-left font-semibold text-deep-green-2">{children}</th>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
      <a href={node.data.uri} className="text-gold-dark font-semibold underline hover:text-gold">
        {children}
      </a>
    ),
  },
};

export default async function CityArticlePage({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}) {
  const { city: citySlug, slug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  const article = await getArticleByCitySlug(citySlug, slug);
  if (!article) notFound();

  const cityArticles = await getArticlesByCity(citySlug);
  const related = cityArticles.filter((a) => a.slug !== article.slug).slice(0, 3);
  const publishedIso = article.publishDate ? new Date(article.publishDate).toISOString() : undefined;

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: article.cover ?? undefined,
            author: { "@type": "Organization", name: article.author || "HUGLAO GROUP" },
            publisher: {
              "@type": "Organization",
              name: "บริษัท ฮักลาว กรุ๊ป จำกัด",
              logo: { "@type": "ImageObject", url: "https://huglao.com/assets/huglao-emblem.png" },
            },
            datePublished: publishedIso,
            dateModified: publishedIso,
            mainEntityOfPage: `https://huglao.com/${city.slug}/${article.slug}`,
          }),
        }}
      />
      <div className="relative bg-deep-green-2" style={{ aspectRatio: "16/8" }}>
        {article.cover && (
          <Image src={article.cover} alt={article.title} fill sizes="100vw" className="object-cover" priority />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(8,18,11,.55),transparent 55%)" }} />
      </div>

      <div className="max-w-[760px] mx-auto px-[clamp(22px,5vw,56px)] pt-[clamp(26px,4vw,44px)] pb-[clamp(40px,5vw,60px)]">
        <nav aria-label="breadcrumb" className="text-[.85rem] mb-4 text-text-muted">
          <Link href="/" className="no-underline hover:text-gold-dark">หน้าแรก</Link>{" "}
          / <Link href={`/${city.slug}`} className="no-underline hover:text-gold-dark">{city.name}</Link>{" "}
          / <span className="text-gold-dark">{article.title}</span>
        </nav>
        <h1 className="m-0 font-serif-th font-bold text-deep-green-2 leading-[1.25]" style={{ fontSize: "clamp(1.6rem,3.6vw,2.4rem)" }}>
          {article.title}
        </h1>
        <div className="flex items-center gap-2.5 mt-4 pb-[22px] border-b border-border-2 text-[#8a8474] text-[.92rem]">
          <span className="text-gold-dark font-semibold">{article.author}</span>
          <span className="opacity-50">·</span>
          <span>{article.publishDate}</span>
        </div>

        <div className="mt-6">
          {article.content ? documentToReactComponents(article.content, richTextOptions) : null}
        </div>

        <div className="mt-[30px] pt-6 border-t border-border-2">
          <Link href={`/${city.slug}`} className="no-underline text-gold-dark font-semibold text-[.95rem] hover:text-gold">
            → ดูรถตู้{city.name}และโปรแกรมเที่ยวทั้งหมด
          </Link>
        </div>

        {related.length > 0 && (
          <div className="mt-[30px] pt-6 border-t border-border-2">
            <p className="m-0 mb-3.5 font-bold text-deep-green-2 text-base">บทความอื่นเกี่ยวกับ{city.name}</p>
            <div className="flex flex-col gap-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/${city.slug}/${r.slug}`} className="no-underline text-gold-dark font-semibold text-[.95rem] hover:text-gold">
                  → {r.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        <a
          href="https://lin.ee/xudxWlE"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 mt-[30px] px-7 py-3.5 rounded-full font-bold no-underline text-deep-green shadow-[0_12px_28px_rgba(168,120,21,.4)] hover:-translate-y-0.5 transition-transform"
          style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" }}
        >
          วางแผนทริปลาวกับเรา →
        </a>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds. If no Contentful entries have `city` set yet, `generateStaticParams` returns `[]` and no pages are generated under `/[city]/[slug]` — that's expected until an editor tags an article with a city in Contentful.

- [ ] **Step 3: Commit**

```bash
git add app/\[city\]/\[slug\]/page.tsx
git commit -m "feat: add /[city]/[slug] route for city-scoped Contentful articles"
```

---

### Task 8: Add the `/laos-travel` hub page

**Files:**
- Create: `app/laos-travel/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { cities } from "@/data/cities";

export const metadata: Metadata = {
  title: "เที่ยวลาว: เวียงจันทน์ เมืองเฟือง วังเวียง หลวงพระบาง | Huglao Group",
  description:
    "รวมเมืองเที่ยวลาวยอดนิยม เวียงจันทน์ เมืองเฟือง วังเวียง หลวงพระบาง พร้อมรถตู้ VIP พร้อมคนขับ เลือกเมืองที่สนใจเพื่อดูสถานที่เที่ยว โปรแกรม และราคา",
  alternates: { canonical: "/laos-travel" },
  openGraph: {
    title: "เที่ยวลาว: เวียงจันทน์ เมืองเฟือง วังเวียง หลวงพระบาง",
    description: "รวมเมืองเที่ยวลาวยอดนิยมพร้อมรถตู้ VIP พร้อมคนขับ",
    type: "website",
  },
};

/** เฉพาะเมืองที่ต้องการโชว์ในหน้ารวมนี้ — ปากเซและเมืองอื่นที่ hidden ยังไม่โชว์ตรงนี้ */
const featuredOrder = ["vientiane", "muangfeuang", "vangvieng", "luangprabang"];

export default function LaosTravelPage() {
  const featuredCities = featuredOrder
    .map((slug) => cities.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c) && !c!.hidden);

  return (
    <div>
      <BreadcrumbStructuredData
        items={[
          { name: "หน้าแรก", href: "/" },
          { name: "เที่ยวลาว", href: "/laos-travel" },
        ]}
      />

      <section
        className="relative overflow-hidden py-16 md:py-[clamp(112px,15vw,152px)] px-[clamp(20px,5vw,48px)] pb-6 md:pb-[clamp(48px,7vw,72px)]"
        style={{ background: "linear-gradient(165deg,#0a1f14,#123524)", color: "#fbf7ec" }}
      >
        <div className="relative max-w-[1180px] mx-auto">
          <nav aria-label="breadcrumb" className="text-[.85rem] mb-[18px]" style={{ color: "#b7b29d" }}>
            <Link href="/" className="no-underline hover:text-gold-light" style={{ color: "#b7b29d" }}>
              หน้าแรก
            </Link>{" "}
            / <span className="text-gold-light">เที่ยวลาว</span>
          </nav>
          <div className="max-w-[820px]">
            <span className="inline-block text-gold-light font-bold tracking-[.2em] text-[.8rem] uppercase">
              เที่ยวลาว
            </span>
            <h1
              className="mt-4 font-serif-th font-bold leading-[1.2]"
              style={{ fontSize: "clamp(2rem,5.6vw,3.4rem)", letterSpacing: "-.01em" }}
            >
              เลือกเมืองที่อยากไปเที่ยวลาว
            </h1>
            <p className="mt-5 max-w-[64ch]" style={{ color: "#cfc9b6", fontSize: "clamp(1rem,2vw,1.2rem)", lineHeight: 1.75 }}>
              เวียงจันทน์ เมืองเฟือง วังเวียง หลวงพระบาง — แต่ละเมืองมีรถตู้ VIP พร้อมคนขับ โปรแกรมแนะนำ และราคาให้เลือกดูก่อนตัดสินใจ
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)] pb-14 md:pb-[clamp(80px,10vw,120px)]">
        <div className="grid gap-4 md:gap-[22px] md:grid-cols-2">
          {featuredCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="no-underline block bg-white border border-border rounded-2xl overflow-hidden hover:border-gold-light transition-colors"
            >
              <div className="relative aspect-[16/9]">
                <Image src={city.heroImage} alt={city.name} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-4 md:p-[26px]">
                <h2 className="m-0 mb-1.5 font-serif-th font-bold text-[1.2rem] text-deep-green-2">{city.name}</h2>
                <p className="m-0 text-text-muted text-[.9rem] leading-[1.7]">{city.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds; `out/laos-travel/index.html` exists and shows 4 city cards (Vientiane, Muang Feuang, Vang Vieng, Luang Prabang) — no Pakse card.

- [ ] **Step 3: Commit**

```bash
git add app/laos-travel/page.tsx
git commit -m "feat: add /laos-travel hub page listing the 4 featured cities"
```

---

### Task 9: Update `sitemap.ts`

**Files:**
- Modify: `app/sitemap.ts` (entire file)

- [ ] **Step 1: Rewrite `app/sitemap.ts`**

```typescript
import type { MetadataRoute } from "next";
import { getAllArticles, getArticlesByCity } from "@/lib/contentful";
import { cities } from "@/data/cities";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://huglao.com";
  const articles = await getAllArticles();
  const visibleCities = cities.filter((c) => !c.hidden);

  const cityArticleEntries: MetadataRoute.Sitemap = [];
  for (const city of visibleCities) {
    const cityArticles = await getArticlesByCity(city.slug);
    for (const a of cityArticles) {
      cityArticleEntries.push({
        url: `${base}/${city.slug}/${a.slug}`,
        lastModified: a.publishDate ? new Date(a.publishDate) : new Date(),
      });
    }
  }

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/van-vip`, lastModified: new Date() },
    { url: `${base}/laos-travel`, lastModified: new Date() },
    ...visibleCities.map((c) => ({
      url: `${base}/${c.slug}`,
      lastModified: new Date(),
    })),
    ...cityArticleEntries,
    { url: `${base}/articles`, lastModified: new Date() },
    ...articles.map((a) => ({
      url: `${base}/articles/${a.slug}`,
      lastModified: a.publishDate ? new Date(a.publishDate) : new Date(),
    })),
  ];
}
```

Note: hidden cities (Pakse) and the old `/van/[city]` stub URLs are intentionally left out of the sitemap — they're `noindex` and shouldn't be submitted for crawling.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds; `out/sitemap.xml` contains `/vientiane`, `/muangfeuang`, `/vangvieng`, `/luangprabang`, `/laos-travel`, but not `/pakse` or any `/van/...` path.

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: update sitemap for root city URLs, laos-travel hub, and city articles"
```

---

### Task 10: Full verification pass

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: no errors.

- [ ] **Step 2: Manual smoke test with a static server**

Run: `npx serve out -l 4000`

Check in a browser:
- `http://localhost:4000/vientiane/` → loads the Vientiane city page, no `/van/` in the URL
- `http://localhost:4000/muangfeuang/` → loads new Muang Feuang page with pricing table (should show the "เหมาเที่ยววังเวียง / เมืองเฟือง" + "รับ–ส่ง" pricing groups) and correct FAQ/attractions
- `http://localhost:4000/van/vientiane/` → redirects (via meta-refresh) to `/vientiane/`
- `http://localhost:4000/laos-travel/` → shows 4 cards: Vientiane, Muang Feuang, Vang Vieng, Luang Prabang — **no Pakse card**
- `http://localhost:4000/` → destinations section links go to `/vientiane`, `/muangfeuang`, etc. (not `/van/...`), and the Pakse row/card is no longer a clickable link
- `http://localhost:4000/articles/` → unaffected, still lists general articles
- `http://localhost:4000/sitemap.xml` → contains the new URLs, excludes Pakse and `/van/...`

- [ ] **Step 3: Report to project owner (outside this plan)**

Manually note for the project owner:
1. Add the `city` field to the `article` content type in Contentful (see "Manual step" at the top of this plan).
2. Replace the placeholder Muang Feuang hero image (`/assets/dest-vangvieng.webp` reused temporarily) with a real photo at `public/assets/dest-muangfeuang.webp`, then update `heroImage` in `data/cities.ts`.
