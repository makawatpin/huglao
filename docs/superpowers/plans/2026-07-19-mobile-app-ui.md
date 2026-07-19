# Mobile app-style UI redesign implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the site feel like a native mobile app on phones — persistent bottom tab bar for navigation/booking, and compact landscape cards instead of tall portrait sections, so users scroll less.

**Architecture:** All changes are mobile-only (`< 768px`, Tailwind's default `md` breakpoint) using Tailwind responsive classes (`md:hidden`, `hidden md:...`) so desktop markup and behavior stay untouched. One new client component (`BottomTabBar`) renders in the root layout; the rest of the work is adding a mobile-specific markup branch to four existing sections across three pages.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4. No new dependencies — icons are hand-written inline SVG (matches the codebase's existing no-icon-library convention).

**Reference spec:** `docs/superpowers/specs/2026-07-19-mobile-app-ui-design.md`

---

### Task 1: `BottomTabBar` component

**Files:**
- Create: `components/BottomTabBar.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINE_URL = "https://lin.ee/xudxWlE";

const TABS = [
  {
    label: "หน้าหลัก",
    href: "/",
    match: (path: string) => path === "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
      </svg>
    ),
  },
  {
    label: "จองรถ",
    href: "/van-vip",
    match: (path: string) => path.startsWith("/van"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="9" width="18" height="9" rx="2" />
        <path d="M5 9V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
        <circle cx="7.5" cy="18" r="1.5" />
        <circle cx="16.5" cy="18" r="1.5" />
      </svg>
    ),
  },
  {
    label: "บทความ",
    href: "/articles",
    match: (path: string) => path.startsWith("/articles"),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 0 4 23z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 1 2.5 2z" />
      </svg>
    ),
  },
] as const;

const LINE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="เมนูหลัก"
      className="md:hidden fixed inset-x-0 bottom-0 z-50 flex bg-deep-green-2"
      style={{
        borderTop: "0.5px solid rgba(227,189,99,.15)",
        paddingBottom: "calc(10px + env(safe-area-inset-bottom))",
      }}
    >
      {TABS.map((tab) => {
        const active = tab.match(pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 flex flex-col items-center gap-[3px] pt-2 text-[10px] no-underline"
            style={{ color: active ? "#e3bd63" : "#8a9c90" }}
          >
            <span className="w-5 h-5">{tab.icon}</span>
            {tab.label}
          </Link>
        );
      })}
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener"
        className="flex-1 flex flex-col items-center gap-[3px] pt-2 text-[10px] no-underline"
        style={{ color: "#8a9c90" }}
      >
        <span className="w-5 h-5">{LINE_ICON}</span>
        คุยทาง LINE
      </a>
    </nav>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors (component isn't wired into any page yet, but it must compile standalone)

- [ ] **Step 3: Commit**

```bash
git add components/BottomTabBar.tsx
git commit -m "Add BottomTabBar component for mobile navigation"
```

---

### Task 2: Wire `BottomTabBar` into the root layout

**Files:**
- Modify: `app/layout.tsx:1-98`

- [ ] **Step 1: Import the component and wrap body content**

In `app/layout.tsx`, add the import next to the other component imports:

```tsx
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BottomTabBar from "@/components/BottomTabBar";
```

Replace the `<body>` block:

```tsx
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
```

with:

```tsx
      <body>
        <SiteHeader />
        <div className="pb-[84px] md:pb-0">
          {children}
          <SiteFooter />
        </div>
        <BottomTabBar />
      </body>
```

(`pb-[84px]` reserves space so the fixed tab bar never covers the last bit of content on mobile; `md:pb-0` removes it on desktop where the bar is hidden.)

- [ ] **Step 2: Typecheck and build**

Run: `npx tsc --noEmit`
Expected: no errors

Run: `npx next build`
Expected: build succeeds, same route list as before (no new routes)

- [ ] **Step 3: Manual verification**

Start the dev server preview, open at mobile width (375×812):
- Confirm the tab bar is visible and pinned to the bottom on `/`, `/van-vip`, `/van/vientiane`, `/articles`, and `/articles/van-rental-laos`.
- Confirm "หน้าหลัก" is gold/active only on `/`.
- Confirm "จองรถ" is gold/active on `/van-vip` and every `/van/[city]` page.
- Confirm "บทความ" is gold/active on `/articles` and article detail pages.
- Confirm tapping "คุยทาง LINE" opens `https://lin.ee/xudxWlE` in a new tab.
- Scroll to the very bottom of `/van-vip` — confirm the final contact section/CTA is not covered by the bar.

Resize to desktop width (1280×800):
- Confirm the tab bar is not rendered/visible anywhere.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "Render BottomTabBar globally on mobile breakpoints"
```

---

### Task 3: Homepage hero — cap height on mobile

**Files:**
- Modify: `app/page.tsx` (hero section, currently around line 80-88)

- [ ] **Step 1: Replace the inline height style with responsive Tailwind classes**

Find:

```tsx
      <section
        id="top"
        className="relative overflow-hidden flex items-center justify-center text-center"
        style={{
          height: "100vh",
          minHeight: 620,
          background: "linear-gradient(#bcd9ec,#dfeaf0)",
        }}
      >
```

Replace with:

```tsx
      <section
        id="top"
        className="relative overflow-hidden flex items-center justify-center text-center h-[70vh] min-h-[480px] md:h-screen md:min-h-[620px]"
        style={{
          background: "linear-gradient(#bcd9ec,#dfeaf0)",
        }}
      >
```

- [ ] **Step 2: Typecheck and build**

Run: `npx tsc --noEmit && npx next build`
Expected: no errors

- [ ] **Step 3: Manual verification**

At 375×812: confirm the hero section is noticeably shorter than before (roughly 70% of viewport height) and the parallax layers (which are `inset:0`) still fill it with no gaps or overflow.
At 1280×800: confirm the hero is still full-screen height, unchanged from before this task.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "Cap homepage hero height on mobile"
```

---

### Task 4: Homepage `DESTINATIONS` — compact landscape cards on mobile

**Files:**
- Modify: `app/page.tsx` (`#explore` section, `DESTINATIONS.map` block currently around line 285-329)

- [ ] **Step 1: Add a mobile-only compact row layout alongside the existing desktop grid**

Find the existing grid wrapper and map:

```tsx
          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
            {DESTINATIONS.map((dest, i) => {
              const cardClass =
                "relative rounded-[20px] overflow-hidden flex flex-col justify-end p-[26px] text-white shadow-[0_20px_44px_rgba(10,31,20,.16)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(10,31,20,.26)] transition-all";
              const cardContent = (
                <>
                  {dest.image && (
                    <Image src={dest.image} alt={dest.name} fill sizes="(max-width: 900px) 100vw, 33vw" className="object-cover" />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: dest.image
                        ? "linear-gradient(to top,rgba(8,22,13,.9),rgba(8,22,13,.2) 58%,rgba(8,22,13,.4))"
                        : undefined,
                      backgroundImage: dest.image ? undefined : "repeating-linear-gradient(45deg,rgba(227,189,99,.1) 0 2px,transparent 2px 13px)",
                    }}
                  />
                  {dest.tag && (
                    <div
                      className="absolute top-5 left-5 z-[2] text-[.74rem] tracking-[.18em] rounded-full px-3 py-1.5"
                      style={{ color: "#e3bd63", background: "rgba(10,31,20,.5)", border: "1px solid rgba(227,189,99,.3)" }}
                    >
                      {dest.tag}
                    </div>
                  )}
                  <div className="relative">
                    <h3 className="m-0 font-serif-th font-semibold text-[1.5rem]">{dest.name}</h3>
                    <p className="mt-2 text-[#d8d2c0] text-[.94rem] leading-[1.6]">{dest.desc}</p>
                  </div>
                </>
              );
              return (
                <Reveal key={dest.name} delay={0.1 * (i % 3 + 1)}>
                  {dest.citySlug ? (
                    <Link href={`/van/${dest.citySlug}`} className={`${cardClass} no-underline`} style={{ minHeight: 340, background: dest.gradient }}>
                      {cardContent}
                    </Link>
                  ) : (
                    <article className={cardClass} style={{ minHeight: 340, background: dest.gradient }}>
                      {cardContent}
                    </article>
                  )}
                </Reveal>
              );
            })}
          </div>
```

Replace with (adds a `hidden md:grid` wrapper around the existing block, plus a new `md:hidden` mobile block before it):

```tsx
          <div className="flex md:hidden flex-col gap-3">
            {DESTINATIONS.map((dest) => {
              const rowInner = (
                <>
                  <div className="relative w-[110px] h-[78px] flex-shrink-0 rounded-xl overflow-hidden" style={{ background: dest.gradient }}>
                    {dest.image && <Image src={dest.image} alt={dest.name} fill sizes="110px" className="object-cover" />}
                  </div>
                  <div className="py-2 pr-3 min-w-0">
                    <h3 className="m-0 font-serif-th font-semibold text-deep-green-2 text-[.98rem] truncate">{dest.name}</h3>
                    <p className="m-0 mt-1 text-text-muted text-[.82rem] leading-[1.4] line-clamp-2">{dest.desc}</p>
                  </div>
                </>
              );
              const rowClass = "flex items-center gap-3 bg-white border border-border rounded-2xl overflow-hidden no-underline";
              return dest.citySlug ? (
                <Link key={dest.name} href={`/van/${dest.citySlug}`} className={rowClass}>
                  {rowInner}
                </Link>
              ) : (
                <div key={dest.name} className={rowClass}>
                  {rowInner}
                </div>
              );
            })}
          </div>
          <div className="hidden md:grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
            {DESTINATIONS.map((dest, i) => {
              const cardClass =
                "relative rounded-[20px] overflow-hidden flex flex-col justify-end p-[26px] text-white shadow-[0_20px_44px_rgba(10,31,20,.16)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(10,31,20,.26)] transition-all";
              const cardContent = (
                <>
                  {dest.image && (
                    <Image src={dest.image} alt={dest.name} fill sizes="(max-width: 900px) 100vw, 33vw" className="object-cover" />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: dest.image
                        ? "linear-gradient(to top,rgba(8,22,13,.9),rgba(8,22,13,.2) 58%,rgba(8,22,13,.4))"
                        : undefined,
                      backgroundImage: dest.image ? undefined : "repeating-linear-gradient(45deg,rgba(227,189,99,.1) 0 2px,transparent 2px 13px)",
                    }}
                  />
                  {dest.tag && (
                    <div
                      className="absolute top-5 left-5 z-[2] text-[.74rem] tracking-[.18em] rounded-full px-3 py-1.5"
                      style={{ color: "#e3bd63", background: "rgba(10,31,20,.5)", border: "1px solid rgba(227,189,99,.3)" }}
                    >
                      {dest.tag}
                    </div>
                  )}
                  <div className="relative">
                    <h3 className="m-0 font-serif-th font-semibold text-[1.5rem]">{dest.name}</h3>
                    <p className="mt-2 text-[#d8d2c0] text-[.94rem] leading-[1.6]">{dest.desc}</p>
                  </div>
                </>
              );
              return (
                <Reveal key={dest.name} delay={0.1 * (i % 3 + 1)}>
                  {dest.citySlug ? (
                    <Link href={`/van/${dest.citySlug}`} className={`${cardClass} no-underline`} style={{ minHeight: 340, background: dest.gradient }}>
                      {cardContent}
                    </Link>
                  ) : (
                    <article className={cardClass} style={{ minHeight: 340, background: dest.gradient }}>
                      {cardContent}
                    </article>
                  )}
                </Reveal>
              );
            })}
          </div>
```

- [ ] **Step 2: Typecheck and build**

Run: `npx tsc --noEmit && npx next build`
Expected: no errors

- [ ] **Step 3: Manual verification**

At 375×812: confirm the `#explore` section now shows 6 compact horizontal rows (~90px tall each, landscape thumbnail + text) instead of 6 tall tiles. Confirm เวียงจันทน์/หลวงพระบาง/วังเวียง/ปากเซ rows still link to their `/van/[slug]` page; เชียงขวาง/บ่อเต็น rows are plain (not links).
At 1280×800: confirm the section looks exactly as before this task (tall tile grid, unchanged).

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "Add compact landscape destination cards on mobile"
```

---

### Task 5: `/van-vip` `CITIES` section — compact landscape cards on mobile

**Files:**
- Modify: `app/van-vip/page.tsx:60-146` (the `CITIES` const) and `app/van-vip/page.tsx:356-384` (the render section)

- [ ] **Step 1: Add a one-line `blurb` field to each `CITIES` entry**

The `CITIES` const (starting at line 60) has `title`, `image`, `paragraphs` (and `reverse` for two of them) per city. Add a `blurb: string` field to each of the 4 entries — a plain-text one-liner for the mobile card (the existing `paragraphs` are JSX with `<strong>` tags, not usable as plain text). Insert `blurb` right after `image` in each entry:

```tsx
  {
    title: "รถตู้เที่ยวเวียงจันทน์",
    image: "/assets/dest-vientiane.webp",
    blurb: "ประตูชัย · พระธาตุหลวง · วัดสีสะเกด · ตลาดกลางคืนริมโขง",
    paragraphs: [
```

```tsx
  {
    title: "รถตู้เที่ยววังเวียง",
    image: "/assets/dest-vangvieng.webp",
    blurb: "Blue Lagoon · ถ้ำนางฟ้า · คายัค · บอลลูน",
    reverse: true,
    paragraphs: [
```

```tsx
  {
    title: "รถตู้เที่ยวหลวงพระบาง",
    image: "/assets/dest-luangprabang.webp",
    blurb: "น้ำตกกวางสี · พระธาตุพูสี · ตลาดมืด · ตักบาตรข้าวเหนียว",
    paragraphs: [
```

```tsx
  {
    title: "รถตู้เที่ยวปากเซ",
    image: "/assets/dest-pakse.webp",
    blurb: "โบลาเวน · คอนพะเพ็ง · วัดพู",
    reverse: true,
    paragraphs: [
```

(Match each block by its existing `title` string — insert `blurb` as a new line, don't change anything else in the object.)

- [ ] **Step 2: Add the mobile compact row layout**

Find the render block:

```tsx
        <div className="flex flex-col gap-14">
          {CITIES.map((city) => (
            <Reveal key={city.title}>
              <article
                className="grid gap-7 items-center"
                style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}
              >
                <div style={{ order: city.reverse ? 2 : 1 }}>
                  <h3 className="mt-0 mb-3 font-serif-th font-bold text-deep-green-2 text-[1.5rem]">{city.title}</h3>
                  {city.paragraphs.map((p, i) => (
                    <p key={i} className="text-[#3c3e33] text-[1rem] leading-[1.85] mb-3.5 last:mb-0">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3", order: city.reverse ? 1 : 2 }}>
                  <Image src={city.image} alt={city.title} fill sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
```

Replace with:

```tsx
        <div className="flex md:hidden flex-col gap-3">
          {CITIES.map((city) => (
            <div key={city.title} className="flex items-center gap-3 bg-white border border-border rounded-2xl overflow-hidden">
              <div className="relative w-[110px] h-[78px] flex-shrink-0">
                <Image src={city.image} alt={city.title} fill sizes="110px" className="object-cover" />
              </div>
              <div className="py-2 pr-3 min-w-0">
                <h3 className="m-0 font-serif-th font-semibold text-deep-green-2 text-[.98rem] truncate">{city.title}</h3>
                <p className="m-0 mt-1 text-text-muted text-[.82rem] leading-[1.4] line-clamp-2">{city.blurb}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:flex flex-col gap-14">
          {CITIES.map((city) => (
            <Reveal key={city.title}>
              <article
                className="grid gap-7 items-center"
                style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}
              >
                <div style={{ order: city.reverse ? 2 : 1 }}>
                  <h3 className="mt-0 mb-3 font-serif-th font-bold text-deep-green-2 text-[1.5rem]">{city.title}</h3>
                  {city.paragraphs.map((p, i) => (
                    <p key={i} className="text-[#3c3e33] text-[1rem] leading-[1.85] mb-3.5 last:mb-0">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3", order: city.reverse ? 1 : 2 }}>
                  <Image src={city.image} alt={city.title} fill sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
```

- [ ] **Step 3: Typecheck and build**

Run: `npx tsc --noEmit && npx next build`
Expected: no errors (the `blurb` field is additive, so the `CITIES` type — inferred, not a named interface — still satisfies the render code)

- [ ] **Step 4: Manual verification**

At 375×812 on `/van-vip`: confirm the `#cities` section shows 4 compact rows with the new one-line blurbs instead of the alternating 2-column image+2-paragraph layout.
At 1280×800: confirm `#cities` is unchanged from before this task (full paragraphs, alternating layout).

- [ ] **Step 5: Commit**

```bash
git add app/van-vip/page.tsx
git commit -m "Add compact landscape city cards on mobile for /van-vip"
```

---

### Task 6: `/van-vip` `HIGHLIGHTS` fleet photos — single landscape image on mobile

**Files:**
- Modify: `app/van-vip/page.tsx` (the two-photo grid inside `#highlights`, currently around line 330-353)

- [ ] **Step 1: Hide the second photo and adjust aspect ratio on mobile**

Find:

```tsx
        <div className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_44px_rgba(10,31,20,.16)]" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/assets/van-vip-fleet.jpg"
                alt="รถตู้ VIP Toyota Commuter สองคัน จอดรอบริการเที่ยวลาว"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_44px_rgba(10,31,20,.16)]" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/assets/van-vip-interior.jpg"
                alt="เบาะหนัง VIP กว้างขวางภายในรถตู้ Huglao"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Reveal>
        </div>
```

Replace with (first photo gets a responsive `aspect-[16/9] md:aspect-auto` class so it's shorter/landscape on mobile and keeps the original 4:3 inline style at `md:` and up; second photo is hidden below `md`):

```tsx
        <div className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          <Reveal>
            <div
              className="relative rounded-2xl overflow-hidden shadow-[0_20px_44px_rgba(10,31,20,.16)] aspect-[16/9] md:aspect-auto"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src="/assets/van-vip-fleet.jpg"
                alt="รถตู้ VIP Toyota Commuter สองคัน จอดรอบริการเที่ยวลาว"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08} className="hidden md:block">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_44px_rgba(10,31,20,.16)]" style={{ aspectRatio: "4/3" }}>
              <Image
                src="/assets/van-vip-interior.jpg"
                alt="เบาะหนัง VIP กว้างขวางภายในรถตู้ Huglao"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </Reveal>
        </div>
```

(`Reveal` already accepts a `className` prop — see `components/Reveal.tsx` — so `hidden md:block` passed to the second `Reveal` hides its wrapper `<div>` on mobile without touching the component itself. Tailwind's `aspect-[16/9]` utility overrides the inline `aspectRatio: "4/3"` via source order/specificity on mobile; `md:aspect-auto` hands control back to the inline style at `md:` and up.)

- [ ] **Step 2: Typecheck and build**

Run: `npx tsc --noEmit && npx next build`
Expected: no errors

- [ ] **Step 3: Manual verification**

At 375×812 on `/van-vip`: confirm only one photo shows in `#highlights`, in a wide/short 16:9 shape (not tall 4:3).
At 1280×800: confirm both photos show side by side in 4:3, unchanged from before this task.

- [ ] **Step 4: Commit**

```bash
git add app/van-vip/page.tsx
git commit -m "Show single landscape fleet photo on mobile for /van-vip"
```

---

### Task 7: `/van/[city]` attraction hero image — shorter on mobile

**Files:**
- Modify: `app/van/[city]/page.tsx` (the `#attractions` hero image container)

- [ ] **Step 1: Make the aspect ratio more landscape (shorter) on mobile**

Find:

```tsx
        <div className="relative rounded-2xl overflow-hidden mb-9" style={{ aspectRatio: "16/7" }}>
          <Image src={city.heroImage} alt={`รถตู้${city.name} พร้อมคนขับ`} fill sizes="100vw" className="object-cover" />
        </div>
```

Replace with:

```tsx
        <div className="relative rounded-2xl overflow-hidden mb-9 aspect-[16/6] md:aspect-auto" style={{ aspectRatio: "16/7" }}>
          <Image src={city.heroImage} alt={`รถตู้${city.name} พร้อมคนขับ`} fill sizes="100vw" className="object-cover" />
        </div>
```

(Same technique as Task 6: `aspect-[16/6]` is shorter relative to width than `16/7`, applied only below `md`; `md:aspect-auto` restores the original inline `16/7` at `md:` and up.)

- [ ] **Step 2: Typecheck and build**

Run: `npx tsc --noEmit && npx next build`
Expected: no errors; all 4 static `/van/[city]` routes still generate

- [ ] **Step 3: Manual verification**

At 375×812 on `/van/vientiane`: confirm the attraction image is visibly shorter/more panoramic than before.
At 1280×800: confirm it's unchanged (16:7, same as before this task).

- [ ] **Step 4: Commit**

```bash
git add "app/van/[city]/page.tsx"
git commit -m "Shorten attraction hero image on mobile for city pages"
```

---

### Task 8: Full-site verification pass

**Files:** none (verification only)

- [ ] **Step 1: Full build**

Run: `npx tsc --noEmit && npx next build`
Expected: clean build, all 18 routes generate (same route list as before this plan — no routes were added or removed)

- [ ] **Step 2: Mobile pass (375×812)**

Visit each of: `/`, `/van-vip`, `/van/vientiane`, `/van/vangvieng`, `/van/luangprabang`, `/van/pakse`, `/articles`, `/articles/van-rental-laos`. For each:
- Bottom tab bar visible, correct tab highlighted gold, no content hidden behind it at the bottom of the page.
- No horizontal scroll/overflow introduced by any of the new mobile-only blocks.
- Homepage hero and `#explore` cards, `/van-vip` `#highlights` and `#cities`, and the city page attraction image all match the shorter/landscape treatment from Tasks 3-7.

- [ ] **Step 3: Desktop pass (1280×800)**

Visit the same URLs. Confirm every page is pixel-equivalent to before this plan (bottom tab bar absent, hero full height, destination/city cards in their original tall/alternating layouts, both fleet photos visible, attraction image at 16:7).

- [ ] **Step 4: Push**

```bash
git push origin nextjs-source
```

---

## Self-review notes

- **Spec coverage:** §1 bottom tab bar → Tasks 1-2. §2a destinations → Task 4. §2b hero → Task 3. §2c cities → Task 5. §2d fleet photos → Task 6. §2e city attraction image → Task 7. Testing/verification → Task 8. All spec sections covered.
- **Type consistency:** `BottomTabBar`'s `TABS` array and the `LINE_URL`/`LINE_ICON` names are only used within `components/BottomTabBar.tsx` — no cross-file references to keep in sync. `CITIES`' new `blurb` field is read only where added (Task 5, same file).
- **Scope:** matches the spec exactly — no multi-vehicle-type work, no SEO/schema changes, desktop untouched.
