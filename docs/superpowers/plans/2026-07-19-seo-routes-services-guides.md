# Routes / Services / Guides Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/routes/`, `/services/`, `/guides/`, and `/cities/` hub pages to `huglao-site`, each with real crawlable content, following the design in `docs/superpowers/specs/2026-07-19-seo-architecture-pages-design.md`.

**Architecture:** Static-data-driven pages (same pattern as `data/cities.ts` + `app/van/[city]/page.tsx`), reusing `Reveal`, `PricingTable`, `BreadcrumbStructuredData`. No Contentful for this content. `PricingTable` and `data/pricing.ts` are reused as-is (see Deviation note below) rather than introducing a parallel price-table shape.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind. No test runner is configured in this repo (`package.json` has no `test` script) — verification steps use `npm run build` and `npm run lint` instead of unit tests, matching how `/van/[city]` was verified.

**Deviation from the design spec:** the spec's Part 2.2 defines a per-route custom `priceTable` JSON. Since `PricingTable` (`components/PricingTable.tsx`) already renders `data/pricing.ts`'s `PriceGroup[]` shape and the design doc says to reuse `PricingTable` directly, routes reference pricing by `pricingGroupTitles: string[]` (titles into `data/pricing.ts`) instead of carrying their own price rows. This avoids a second, parallel price data source. Two routes need pricing that doesn't exist yet (`vangvieng-luangprabang`, `vientiane-airport-hotel`) — new groups are added to `data/pricing.ts` with prices marked as reference-rate estimates for the user to confirm, consistent with how `data/pricing.ts`'s own header comment already documents its rates as sourced from a reference network.

---

## File Structure

```
data/pricing.ts          MODIFY — add 2 new PriceGroup entries + getPricingGroupsByTitles()
data/routes.ts           CREATE — Route type + 5 entries + getRouteBySlug/getAllRoutes
data/services.ts         CREATE — Service type + 4 entries + getServiceBySlug/getAllServices
data/guides.ts           CREATE — Guide type + 3 entries + getGuideBySlug/getAllGuides

app/cities/page.tsx          CREATE — hub, cards -> /van/[slug]
app/routes/page.tsx          CREATE — hub, cards -> /routes/[slug]
app/routes/[slug]/page.tsx   CREATE — detail template
app/services/page.tsx        CREATE — hub, cards -> /services/[slug] + /van-vip
app/services/[slug]/page.tsx CREATE — detail template
app/guides/page.tsx          CREATE — hub, cards -> /guides/[slug]
app/guides/[slug]/page.tsx   CREATE — detail template

app/van/[city]/page.tsx  MODIFY — extend related-links strip with routes/services/guides
app/sitemap.ts            MODIFY — add routes/services/guides/cities URLs
components/SiteFooter.tsx MODIFY — "บริการ" links -> real /services/[slug]; add /routes/ link
components/SiteHeader.tsx MODIFY — nav "บริการ" -> /services
```

---

## Task 1: Extend `data/pricing.ts` with missing route price groups

**Files:**
- Modify: `huglao-site/data/pricing.ts`

- [ ] **Step 1: Add two new price groups and a lookup helper**

Insert into the `pricingGroups` array (after the existing "เหมาเที่ยววังเวียง / เมืองเฟือง" group, before the closing `];`):

```ts
  {
    title: "วังเวียง → หลวงพระบาง",
    routes: [
      {
        // TODO: confirm price before publishing — reference-rate estimate, not yet a Huglao-confirmed price
        route: "รถตู้ วังเวียง → หลวงพระบาง (นั่งตรง ทางถนน)",
        duration: "-",
        price: 2500,
        unit: "ต่อเที่ยว",
        note: "ราคาอ้างอิงตลาด โปรดยืนยันก่อนเผยแพร่",
      },
      {
        // TODO: confirm price before publishing
        route: "รับจากสถานีรถไฟวังเวียง → ส่งสถานีรถไฟหลวงพระบาง",
        duration: "-",
        price: 500,
        unit: "ต่อเที่ยว",
        note: "กรณีนั่งรถไฟความเร็วสูงแล้วต่อรถตู้ในเมือง — ราคาอ้างอิง โปรดยืนยันก่อนเผยแพร่",
      },
    ],
  },
  {
    title: "เวียงจันทน์ สนามบิน/ที่พัก",
    routes: [
      {
        // TODO: confirm price before publishing
        route: "สนามบินวัตไต → ที่พักในตัวเมืองเวียงจันทน์",
        duration: "-",
        price: 400,
        unit: "ต่อเที่ยว",
        note: "ราคาอ้างอิงตลาด โปรดยืนยันก่อนเผยแพร่",
      },
      {
        // TODO: confirm price before publishing
        route: "ที่พักในตัวเมืองเวียงจันทน์ → สนามบินวัตไต",
        duration: "-",
        price: 400,
        unit: "ต่อเที่ยว",
        note: "ราคาอ้างอิงตลาด โปรดยืนยันก่อนเผยแพร่",
      },
    ],
  },
```

Then add this helper function after `getPricingGroupsForCity`:

```ts
/** ดึงกลุ่มราคาตาม title ที่ระบุ (ใช้กับหน้า /routes/[slug]) */
export const getPricingGroupsByTitles = (titles: string[]): PriceGroup[] =>
  pricingGroups.filter((g) => titles.includes(g.title));
```

- [ ] **Step 2: Verify the file compiles**

Run: `npm run build` (from `huglao-site/`)
Expected: build succeeds (or fails only on later missing files not yet created in this task — confirm no errors reference `data/pricing.ts`).

- [ ] **Step 3: Commit**

```bash
git add data/pricing.ts
git commit -m "feat: add route price groups for vangvieng-luangprabang and airport transfer"
```

---

## Task 2: Create `data/routes.ts`

**Files:**
- Create: `huglao-site/data/routes.ts`

- [ ] **Step 1: Write the full file**

```ts
// data/routes.ts
// Single source of truth สำหรับหน้า /routes/[slug]
// ราคาอ้างอิงจาก data/pricing.ts ผ่าน pricingGroupTitles (ดู getPricingGroupsByTitles)
// สำคัญ: ห้ามก๊อปเนื้อหาระหว่างเส้นทางแล้วเปลี่ยนแค่ชื่อเมือง (duplicate content โดน Google ลงโทษ)

export interface RouteFaq {
  q: string;
  a: string;
}

export interface RouteTimelineStop {
  time: string;
  activity: string;
}

export interface Route {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  fromCity: string;
  toCity: string;
  durationText: string;
  intro: string[];
  included: string[];
  excluded: string[];
  crossBorderNote?: string[];
  sampleTimeline: RouteTimelineStop[];
  faqs: RouteFaq[];
  /** titles ที่ match กับ data/pricing.ts pricingGroups */
  pricingGroupTitles: string[];
  relatedRouteSlugs: string[];
  relatedCitySlugs: string[];
}

export const routes: Route[] = [
  {
    slug: "nongkhai-vientiane",
    title: "รถตู้ หนองคาย → เวียงจันทน์ (รับส่งข้ามด่าน)",
    metaTitle: "รถตู้ หนองคาย-เวียงจันทน์ ราคาเริ่ม 600 บาท | จองผ่าน LINE | HUGLAO",
    metaDescription:
      "เช่ารถตู้ VIP รับจากด่านหนองคายส่งถึงเวียงจันทน์ ราคาชัดเจน คนขับท้องถิ่น ทีมไทย-ลาวดูแล จองง่ายผ่าน LINE @huglao",
    heroImage: "/assets/dest-vientiane.webp",
    fromCity: "หนองคาย",
    toCity: "เวียงจันทน์",
    durationText: "≈ 30-45 นาที",
    intro: [
      "เดินทางจากหนองคายเข้าเวียงจันทน์แบบไม่ต้องเปลี่ยนรถหลายต่อ HUGLAO จัดหารถตู้ VIP พร้อมคนขับท้องถิ่นที่ชำนาญเส้นทางด่านมิตรภาพ–ตัวเมืองเวียงจันทน์ รับได้ทั้งที่ด่าน สนามบิน หรือสถานีรถไฟลาว-จีน ราคาบอกชัดก่อนเดินทาง ไม่มีบวกเพิ่มทีหลัง",
      "เส้นทางนี้เป็นจุดเริ่มต้นของนักท่องเที่ยวไทยส่วนใหญ่ที่ข้ามสะพานมิตรภาพเข้าลาว คนขับของเรารอรับตั้งแต่หน้าด่านจึงตัดปัญหาการต่อแท็กซี่หรือรถสองแถวในพื้นที่ที่ไม่คุ้นเคย",
    ],
    included: ["ค่ารถตู้ VIP + คนขับ", "น้ำมันตลอดเส้นทาง", "น้ำดื่มและ USB charger บนรถ"],
    excluded: ["ค่าธรรมเนียมข้ามแดน", "ค่าเข้าสถานที่ท่องเที่ยว", "ค่าที่พัก"],
    crossBorderNote: [
      "ก่อนขึ้นรถ ลูกค้าต้องผ่านขั้นตอนตรวจคนเข้าเมืองที่ด่านหนองคายและด่านฝั่งลาวด้วยตนเอง (ใช้เวลาประมาณ 15-30 นาทีขึ้นอยู่กับคิว) คนขับของเรารอรับที่จุดนัดหมายฝั่งลาวหลังผ่านด่านเรียบร้อย ดูขั้นตอนละเอียดได้ที่ /guides/cross-border-nongkhai",
    ],
    sampleTimeline: [
      { time: "08:00", activity: "รับที่จุดนัดหมายฝั่งลาว หลังผ่านด่านหนองคาย" },
      { time: "08:45", activity: "ถึงตัวเมืองเวียงจันทน์ แวะพระธาตุหลวง" },
      { time: "10:00", activity: "ประตูชัย" },
      { time: "12:00", activity: "ส่งที่พักหรือสถานีรถไฟลาว-จีน" },
    ],
    faqs: [
      { q: "จองล่วงหน้ากี่วัน", a: "แนะนำจองล่วงหน้าอย่างน้อย 1-2 วัน โดยเฉพาะช่วงเทศกาลที่คิวรถแน่น" },
      { q: "ราคานี้ต่อคันหรือต่อคน", a: "เป็นราคาต่อคัน (สูงสุด 10 ท่าน) ไม่ใช่ราคาต่อคน" },
      { q: "รับที่สถานีรถไฟลาว-จีนได้ไหม", a: "รับได้ครับ แจ้งจุดรับ-ส่งตอนจองเพื่อให้คนขับวางแผนเวลาได้ถูกต้อง" },
    ],
    pricingGroupTitles: ["รับ–ส่ง (จุดต่อจุด)"],
    relatedRouteSlugs: ["vientiane-train-station"],
    relatedCitySlugs: ["vientiane"],
  },
  {
    slug: "vientiane-vangvieng",
    title: "รถตู้ เวียงจันทน์ → วังเวียง",
    metaTitle: "รถตู้ เวียงจันทน์-วังเวียง ราคาเริ่ม 7,500 บาท | HUGLAO",
    metaDescription:
      "เช่ารถตู้ VIP จากเวียงจันทน์ไปวังเวียง พาเที่ยว Blue Lagoon ถ้ำนางฟ้า โปรแกรมค้างคืนเริ่มต้น 7,500 บาท ทีมงานวางแผนเส้นทางให้ครบ",
    heroImage: "/assets/dest-vangvieng.webp",
    fromCity: "เวียงจันทน์",
    toCity: "วังเวียง",
    durationText: "≈ 3.5-4 ชั่วโมง (ทางถนน)",
    intro: [
      "วังเวียงมีจุดท่องเที่ยวกระจายตัวรอบเมืองและไม่มีระบบขนส่งสาธารณะเชื่อมระหว่างจุดต่าง ๆ การเช่ารถตู้พร้อมคนขับจากเวียงจันทน์จึงคุ้มกว่าการต่อรถหลายทอด เพราะรถคันเดียวพาไปได้ทั้งทริป ไม่ต้องเรียกรถเพิ่มระหว่างวัน",
      "ถนนช่วงเวียงจันทน์-วังเวียงเป็นทางภูเขาคดโค้งในบางจุด คนขับของเราคุ้นเคยเส้นทางนี้เป็นอย่างดีและมีจุดแวะพักระหว่างทางให้ผู้โดยสารได้ยืดเส้นยืดสาย",
    ],
    included: ["ค่ารถตู้ VIP + คนขับตลอดโปรแกรม", "น้ำมันและค่าทางด่วน (ถ้ามี)", "น้ำดื่มบนรถ"],
    excluded: ["ค่าที่พักที่วังเวียง", "ค่ากิจกรรม (Blue Lagoon, คายัค, บอลลูน)", "ค่าอาหาร"],
    sampleTimeline: [
      { time: "07:00", activity: "รับที่ตัวเมืองเวียงจันทน์" },
      { time: "10:30", activity: "แวะจุดชมวิวระหว่างทาง" },
      { time: "11:30", activity: "ถึงวังเวียง เช็คอินที่พัก" },
      { time: "13:00", activity: "เริ่มโปรแกรม Blue Lagoon / ถ้ำนางฟ้า" },
    ],
    faqs: [
      { q: "รถรอที่วังเวียงระหว่างเที่ยวไหม", a: "ตามแพ็กเกจที่เลือก บางโปรแกรมรถรอรับส่งระหว่างจุดท่องเที่ยวแต่ละวัน แจ้งความต้องการตอนจองได้" },
      { q: "ไปกลับวันเดียวได้ไหม", a: "ทำได้แต่ไม่แนะนำเพราะเวลาบนรถรวมไปกลับเกือบ 8 ชั่วโมง เหลือเวลาเที่ยวน้อยมาก" },
      { q: "ราคารวมค่าทางด่วนหรือยัง", a: "รวมแล้วครับ ไม่มีค่าใช้จ่ายเพิ่มเติมนอกเหนือจากที่ระบุใน \"ไม่รวม\"" },
    ],
    pricingGroupTitles: ["เหมาเที่ยววังเวียง / เมืองเฟือง"],
    relatedRouteSlugs: ["vangvieng-luangprabang"],
    relatedCitySlugs: ["vientiane", "vangvieng"],
  },
  {
    slug: "vangvieng-luangprabang",
    title: "รถตู้ วังเวียง → หลวงพระบาง",
    metaTitle: "รถตู้ วังเวียง-หลวงพระบาง | เช่ารถตู้ VIP นั่งตรงหรือต่อรถไฟ | HUGLAO",
    metaDescription:
      "เช่ารถตู้ VIP จากวังเวียงไปหลวงพระบาง เลือกได้ทั้งนั่งรถตรงหรือต่อรถไฟความเร็วสูง คนขับท้องถิ่นดูแลตลอดทาง ทักแชทขอใบเสนอราคา",
    heroImage: "/assets/dest-luangprabang.webp",
    fromCity: "วังเวียง",
    toCity: "หลวงพระบาง",
    durationText: "≈ 4-5 ชั่วโมง (ทางถนน) หรือ ≈ 1 ชั่วโมง (รถไฟ + ต่อรถตู้)",
    intro: [
      "จากวังเวียงไปหลวงพระบางมีสองทางเลือกหลัก คือนั่งรถตู้ตรงบนถนนภูเขาคดโค้งซึ่งใช้เวลานานกว่าแต่ได้ชมวิวเต็มที่ หรือนั่งรถไฟความเร็วสูงลาว-จีนจากสถานีวังเวียงแล้วให้รถตู้ไปรับต่อที่สถานีหลวงพระบาง ซึ่งเร็วกว่ามาก",
      "เพราะทั้งสองสถานีรถไฟอยู่นอกตัวเมือง การมีรถตู้นัดรับที่สถานีพอดีเวลาขบวนถึงจึงช่วยตัดปัญหาการรอแท็กซี่หรือต่อรถหลายต่อในพื้นที่ที่ไม่คุ้นเคย",
    ],
    included: ["ค่ารถตู้ VIP + คนขับ", "น้ำมันตลอดเส้นทาง", "น้ำดื่มบนรถ"],
    excluded: ["ค่าตั๋วรถไฟ (กรณีเลือกเส้นทางต่อรถไฟ)", "ค่าที่พัก", "ค่าอาหารระหว่างทาง"],
    sampleTimeline: [
      { time: "08:00", activity: "รับที่ตัวเมืองวังเวียง หรือสถานีรถไฟวังเวียง" },
      { time: "08:15", activity: "(กรณีนั่งรถไฟ) ขึ้นขบวนรถไฟความเร็วสูงลาว-จีน" },
      { time: "09:15", activity: "ถึงสถานีหลวงพระบาง รถตู้รอรับ" },
      { time: "09:45", activity: "ส่งเข้าที่พักในตัวเมืองหลวงพระบาง" },
    ],
    faqs: [
      { q: "แบบไหนคุ้มกว่ากัน นั่งรถตรงหรือต่อรถไฟ", a: "ถ้าเน้นเวลา รถไฟเร็วกว่ามาก ถ้าอยากชมวิวภูเขาตลอดทาง นั่งรถตรงก็เป็นตัวเลือกที่ดีแต่ใช้เวลานานกว่า" },
      { q: "ราคารถตู้ต่อรถไฟรวมค่าตั๋วรถไฟไหม", a: "ไม่รวมครับ ราคาที่แสดงเป็นค่ารถตู้รับส่งเชื่อมสถานีเท่านั้น ตั๋วรถไฟซื้อแยก" },
      { q: "ต้องจองล่วงหน้ากี่วัน", a: "แนะนำอย่างน้อย 2-3 วัน โดยเฉพาะช่วงที่ตั๋วรถไฟความเร็วสูงขายหมดเร็ว" },
    ],
    pricingGroupTitles: ["วังเวียง → หลวงพระบาง"],
    relatedRouteSlugs: ["vientiane-vangvieng"],
    relatedCitySlugs: ["vangvieng", "luangprabang"],
  },
  {
    slug: "vientiane-airport-hotel",
    title: "รถรับส่ง สนามบินวัตไต ↔ ที่พักในเวียงจันทน์",
    metaTitle: "รถรับส่ง สนามบินวัตไต-ที่พักเวียงจันทน์ | HUGLAO",
    metaDescription:
      "รถตู้รับส่งสนามบินนานาชาติวัตไตถึงที่พักในตัวเมืองเวียงจันทน์ คนขับรอรับตรงเวลา ราคาชัดเจน จองง่ายผ่าน LINE @huglao",
    heroImage: "/assets/dest-vientiane.webp",
    fromCity: "สนามบินวัตไต",
    toCity: "ที่พักในเวียงจันทน์",
    durationText: "≈ 15-20 นาที",
    intro: [
      "สนามบินนานาชาติวัตไตอยู่ห่างจากตัวเมืองเวียงจันทน์เพียงไม่กี่กิโลเมตร แต่สำหรับผู้ที่มาถึงดึกหรือมีกระเป๋าเยอะ การมีรถตู้รอรับหน้าสนามบินช่วยตัดปัญหาการต่อรองราคาแท็กซี่หรือรอรถแชร์",
      "คนขับของเราติดตามเที่ยวบินแบบเรียลไทม์และรอรับที่จุดนัดหมายแม้เที่ยวบินจะดีเลย์ จึงมั่นใจได้ว่าจะมีรถรออยู่เสมอเมื่อถึงจุดหมาย",
    ],
    included: ["ค่ารถตู้ VIP + คนขับ", "ติดตามเที่ยวบินและรอรับแม้ดีเลย์", "น้ำดื่มบนรถ"],
    excluded: ["ค่าธรรมเนียมจอดรถพิเศษของสนามบิน (ถ้ามี)", "ค่าสัมภาระเกินขนาดพิเศษ"],
    sampleTimeline: [
      { time: "ตามเวลาเที่ยวบิน", activity: "คนขับรอรับที่จุดนัดหมายผู้โดยสารขาออก" },
      { time: "+15 นาที", activity: "ถึงที่พักในตัวเมืองเวียงจันทน์" },
    ],
    faqs: [
      { q: "ถ้าเที่ยวบินดีเลย์ต้องแจ้งใหม่ไหม", a: "ไม่ต้องครับ คนขับติดตามเที่ยวบินแบบเรียลไทม์และปรับเวลารอให้อัตโนมัติ" },
      { q: "รับได้กี่คน กี่กระเป๋า", a: "รถตู้ VIP รับได้สูงสุด 10 ท่านพร้อมกระเป๋าเดินทางมาตรฐาน" },
      { q: "จองล่วงหน้าก่อนเดินทางกี่วัน", a: "แนะนำจองล่วงหน้าอย่างน้อย 1 วันเพื่อยืนยันคิวรถ" },
    ],
    pricingGroupTitles: ["เวียงจันทน์ สนามบิน/ที่พัก"],
    relatedRouteSlugs: ["vientiane-train-station"],
    relatedCitySlugs: ["vientiane"],
  },
  {
    slug: "vientiane-train-station",
    title: "รถรับส่ง เวียงจันทน์ ↔ สถานีรถไฟลาว-จีน",
    metaTitle: "รถรับส่ง เวียงจันทน์-สถานีรถไฟลาว-จีน ราคาเริ่ม 800 บาท | HUGLAO",
    metaDescription:
      "รถตู้รับส่งจากตัวเมืองเวียงจันทน์ถึงสถานีรถไฟลาว-จีน (เวียงจันทน์ใต้) ราคาเริ่มต้น 800 บาท เผื่อเวลาต่อขบวนสบาย ๆ",
    heroImage: "/assets/dest-vientiane.webp",
    fromCity: "ตัวเมืองเวียงจันทน์",
    toCity: "สถานีรถไฟลาว-จีน",
    durationText: "≈ 30-40 นาที",
    intro: [
      "สถานีรถไฟลาว-จีน (เวียงจันทน์ใต้) อยู่นอกตัวเมืองค่อนข้างไกลและไม่มีระบบขนส่งสาธารณะที่สะดวก การนั่งรถตู้จากที่พักในเมืองไปสถานีจึงเป็นวิธีที่แน่นอนที่สุดสำหรับผู้ที่ต้องต่อขบวนรถไฟไปวังเวียงหรือหลวงพระบาง",
      "คนขับของเราคำนวณเวลาเผื่อสำหรับขั้นตอนเช็คอินและตรวจกระเป๋าที่สถานี เพื่อให้ถึงก่อนเวลาขบวนออกอย่างสบาย ไม่เร่งรีบ",
    ],
    included: ["ค่ารถตู้ VIP + คนขับ", "น้ำมันตลอดเส้นทาง", "เผื่อเวลาสำหรับเช็คอินที่สถานี"],
    excluded: ["ค่าตั๋วรถไฟ", "ค่าธรรมเนียมสัมภาระเกินขนาดของสถานี"],
    sampleTimeline: [
      { time: "-90 นาที ก่อนขบวนออก", activity: "รับที่พักในตัวเมืองเวียงจันทน์" },
      { time: "-50 นาที ก่อนขบวนออก", activity: "ถึงสถานีรถไฟลาว-จีน เผื่อเวลาเช็คอิน" },
    ],
    faqs: [
      { q: "ควรออกจากที่พักก่อนขบวนออกกี่ชั่วโมง", a: "แนะนำเผื่อเวลาอย่างน้อย 1.5 ชั่วโมงก่อนขบวนออก เพราะต้องเช็คอินและตรวจกระเป๋าที่สถานี" },
      { q: "รับจากด่านหนองคายตรงไปสถานีรถไฟได้ไหม", a: "ได้ครับ ราคาสำหรับเส้นทางด่าน-สถานีรถไฟแยกต่างหาก ดูรายละเอียดที่หน้า /routes/nongkhai-vientiane" },
      { q: "ถ้าขบวนรถไฟล่าช้าทำอย่างไร", a: "แจ้งคนขับหรือทีมงานทันทีที่ทราบ เราปรับตารางรับส่งให้ตามเวลาจริง" },
    ],
    pricingGroupTitles: ["รับ–ส่ง (จุดต่อจุด)"],
    relatedRouteSlugs: ["nongkhai-vientiane"],
    relatedCitySlugs: ["vientiane"],
  },
];

export const getRouteBySlug = (slug: string): Route | undefined =>
  routes.find((r) => r.slug === slug);

export const getAllRoutes = (): Route[] => routes;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit` (from `huglao-site/`)
Expected: no errors referencing `data/routes.ts`.

- [ ] **Step 3: Commit**

```bash
git add data/routes.ts
git commit -m "feat: add routes data for 5 phase-1 routes"
```

---

## Task 3: Create `data/services.ts`

**Files:**
- Create: `huglao-site/data/services.ts`

- [ ] **Step 1: Write the full file**

```ts
// data/services.ts
// Single source of truth สำหรับหน้า /services/[slug]
// หมายเหตุ: "van-vip" ไม่อยู่ในนี้ — หน้า /van-vip เดิมทำหน้าที่นั้นอยู่แล้ว หน้า hub /services ลิงก์ไปตรง ๆ

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  intro: string[];
  features: string[];
  faqs: ServiceFaq[];
  relatedCitySlugs: string[];
}

export const services: Service[] = [
  {
    slug: "airport-transfer",
    title: "รถรับส่งสนามบิน",
    metaTitle: "รถรับส่งสนามบินลาว | บริการรับส่งสนามบินวัตไต | HUGLAO",
    metaDescription:
      "บริการรถรับส่งสนามบินนานาชาติวัตไต เวียงจันทน์ คนขับติดตามเที่ยวบินแบบเรียลไทม์ รอรับแม้เที่ยวบินดีเลย์ จองง่ายผ่าน LINE @huglao",
    heroImage: "/assets/dest-vientiane.webp",
    intro: [
      "บริการรถรับส่งสนามบินของ HUGLAO ครอบคลุมสนามบินนานาชาติวัตไต (เวียงจันทน์) เป็นหลัก คนขับติดตามเที่ยวบินแบบเรียลไทม์ผ่านระบบแจ้งเตือน จึงรอรับตรงเวลาแม้เที่ยวบินจะล่าช้า ไม่ต้องกังวลเรื่องแท็กซี่ไม่มาตามนัดในพื้นที่ที่ไม่คุ้นเคย",
      "เหมาะสำหรับนักท่องเที่ยวที่มาถึงดึกหรือมีกระเป๋าเยอะ ซึ่งการต่อรองราคากับแท็กซี่หน้าสนามบินอาจไม่สะดวกและไม่มีราคาที่แน่นอน",
    ],
    features: ["ติดตามเที่ยวบินแบบเรียลไทม์", "รอรับแม้ดีเลย์ ไม่มีค่าใช้จ่ายเพิ่ม", "รถตู้ VIP สะอาด ปลอดภัย", "คนขับพูดไทยได้"],
    faqs: [
      { q: "ครอบคลุมสนามบินไหนบ้าง", a: "หลักคือสนามบินนานาชาติวัตไต เวียงจันทน์ สนามบินอื่นทักแชทสอบถามได้" },
      { q: "จองล่วงหน้าก่อนกี่วัน", a: "แนะนำอย่างน้อย 1 วันก่อนเดินทาง เพื่อยืนยันคิวรถ" },
      { q: "ราคาเท่าไหร่", a: "ดูราคาเส้นทางสนามบิน-ที่พักได้ที่หน้า /routes/vientiane-airport-hotel" },
    ],
    relatedCitySlugs: ["vientiane"],
  },
  {
    slug: "private-driver",
    title: "รถพร้อมคนขับส่วนตัว",
    metaTitle: "เช่ารถพร้อมคนขับส่วนตัวในลาว | HUGLAO",
    metaDescription:
      "เช่ารถตู้ VIP พร้อมคนขับส่วนตัวเหมาทั้งวันหรือหลายวัน ยืดหยุ่นตามแผนการเที่ยวของคุณ คนขับท้องถิ่นชำนาญเส้นทาง ทักแชทขอใบเสนอราคา",
    heroImage: "/assets/dest-vangvieng.webp",
    intro: [
      "บริการรถพร้อมคนขับส่วนตัวเหมาะกับกลุ่มที่อยากออกแบบทริปเอง ไม่ยึดตามโปรแกรมตายตัว รถและคนขับพร้อมให้บริการตามตารางที่คุณกำหนด ไม่ว่าจะเป็นเที่ยววันเดียวหรือหลายวันข้ามเมือง",
      "คนขับของเราคุ้นเคยเส้นทางทั้งในและนอกตัวเมืองของแต่ละจังหวัด ช่วยแนะนำจุดจอด ร้านอาหาร และลำดับการเที่ยวให้เหมาะกับเวลาที่มีอยู่",
    ],
    features: ["เหมาได้ทั้งวันหรือหลายวัน", "ปรับเปลี่ยนโปรแกรมระหว่างทางได้", "คนขับแนะนำเส้นทาง/ร้านอาหารท้องถิ่น", "รถตู้ VIP รองรับสูงสุด 10 ท่าน"],
    faqs: [
      { q: "เหมาขั้นต่ำกี่วัน", a: "เหมาได้ตั้งแต่ครึ่งวันขึ้นไป ยิ่งเหมาหลายวันยิ่งคุ้มค่าเฉลี่ยต่อวัน" },
      { q: "เปลี่ยนโปรแกรมกะทันหันได้ไหม", a: "ได้ครับ ตราบใดที่อยู่ในช่วงเวลาที่เหมาไว้ แจ้งคนขับได้โดยตรง" },
      { q: "คิดราคายังไง", a: "ราคาขึ้นกับจำนวนวันและเมืองที่เที่ยว ทักแชท LINE @huglao เพื่อขอใบเสนอราคาตามแผนของคุณ" },
    ],
    relatedCitySlugs: ["vientiane", "vangvieng", "luangprabang", "pakse"],
  },
  {
    slug: "train-ticket",
    title: "จองตั๋วรถไฟลาว-จีน",
    metaTitle: "จองตั๋วรถไฟลาว-จีน | บริการจองตั๋วรถไฟความเร็วสูง | HUGLAO",
    metaDescription:
      "บริการจองตั๋วรถไฟความเร็วสูงลาว-จีน เส้นทางเวียงจันทน์-วังเวียง-หลวงพระบาง พร้อมรถตู้รับส่งเชื่อมสถานี ทักแชทสอบถามที่นั่งว่าง",
    heroImage: "/assets/dest-luangprabang.webp",
    intro: [
      "รถไฟความเร็วสูงลาว-จีนเป็นทางเลือกที่เร็วและสะดวกที่สุดในการเดินทางระหว่างเวียงจันทน์ วังเวียง และหลวงพระบาง แต่ที่นั่งมักเต็มเร็วในช่วงเทศกาลและวันหยุดยาว ทีมงานของเราช่วยตรวจสอบที่นั่งว่างและจองตั๋วล่วงหน้าให้",
      "เนื่องจากสถานีรถไฟทุกแห่งอยู่นอกตัวเมือง เราแนะนำให้จองรถตู้รับส่งเชื่อมสถานีควบคู่กันไปเพื่อความสะดวกครบวงจร ดูเส้นทางที่เกี่ยวข้องได้ในหน้า Routes",
    ],
    features: ["ตรวจสอบที่นั่งว่างและจองล่วงหน้าให้", "แนะนำช่วงเวลาที่เหมาะกับแผนเที่ยว", "เชื่อมต่อกับบริการรถตู้รับส่งสถานี", "รองรับเส้นทางเวียงจันทน์-วังเวียง-หลวงพระบาง"],
    faqs: [
      { q: "จองตั๋วล่วงหน้ากี่วัน", a: "แนะนำอย่างน้อย 3-5 วัน โดยเฉพาะช่วงเทศกาลที่ตั๋วขายหมดเร็วมาก" },
      { q: "มีบริการรับส่งจากสถานีด้วยไหม", a: "มีครับ ดูรายละเอียดที่หน้า /routes/vientiane-train-station และ /routes/vangvieng-luangprabang" },
      { q: "ซื้อตั๋วชั้นไหนได้บ้าง", a: "มีให้เลือกทั้งชั้นธุรกิจและชั้นประหยัด ทักแชทแจ้งความต้องการเพื่อเช็คที่นั่งว่างจริง" },
    ],
    relatedCitySlugs: ["vientiane", "vangvieng", "luangprabang"],
  },
  {
    slug: "guide",
    title: "ไกด์นำเที่ยว",
    metaTitle: "ไกด์นำเที่ยวลาว พูดไทย | บริการไกด์ท้องถิ่น | HUGLAO",
    metaDescription:
      "บริการไกด์นำเที่ยวลาวพูดไทยได้ ให้ข้อมูลประวัติศาสตร์และวัฒนธรรมระหว่างทริป เหมาะกับกลุ่มที่อยากเที่ยวเชิงลึก ทักแชทขอใบเสนอราคา",
    heroImage: "/assets/dest-pakse.webp",
    intro: [
      "นอกจากรถตู้พร้อมคนขับ HUGLAO ยังมีบริการไกด์นำเที่ยวท้องถิ่นที่พูดไทยได้ สำหรับกลุ่มที่อยากเข้าใจประวัติศาสตร์ วัฒนธรรม และเรื่องราวเบื้องหลังสถานที่ท่องเที่ยวแต่ละแห่งอย่างลึกซึ้งกว่าการเที่ยวเอง",
      "ไกด์และคนขับเป็นคนละบทบาทกัน ลูกค้าสามารถเลือกใช้บริการทั้งสองอย่างพร้อมกันหรือแยกกันก็ได้ตามความต้องการของทริป",
    ],
    features: ["ไกด์ท้องถิ่นพูดไทยได้", "ให้ข้อมูลเชิงลึกด้านประวัติศาสตร์/วัฒนธรรม", "ใช้ร่วมกับบริการรถตู้ได้", "ปรับเนื้อหาตามความสนใจของกลุ่ม"],
    faqs: [
      { q: "ต้องจองรถตู้ด้วยไหมถึงจะใช้บริการไกด์ได้", a: "ไม่จำเป็นครับ จองไกด์อย่างเดียวได้ แต่ส่วนใหญ่ลูกค้าเลือกใช้คู่กับรถตู้เพื่อความสะดวก" },
      { q: "ไกด์พูดภาษาอะไรได้บ้าง", a: "หลักคือไทยและลาว ภาษาอื่นทักแชทสอบถามความพร้อมล่วงหน้า" },
      { q: "เหมาะกับทริปแบบไหน", a: "เหมาะกับกลุ่มที่สนใจประวัติศาสตร์/วัฒนธรรมเชิงลึก เช่น วัดพู หรือย่านเมืองเก่าหลวงพระบาง" },
    ],
    relatedCitySlugs: ["vientiane", "luangprabang", "pakse"],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

export const getAllServices = (): Service[] => services;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit` (from `huglao-site/`)
Expected: no errors referencing `data/services.ts`.

- [ ] **Step 3: Commit**

```bash
git add data/services.ts
git commit -m "feat: add services data for 4 phase-1 services"
```

---

## Task 4: Create `data/guides.ts`

**Files:**
- Create: `huglao-site/data/guides.ts`
- Read (for content grounding, do not modify): `huglao-site/app/articles/page.tsx` and whatever existing articles cover money/train topics (fetch via `getAllArticles()` if convenient, or `lib/contentful.ts`'s article list in the running app) — this step exists to avoid duplicating an existing article's content in `laos-money` / `laos-china-train`; if no matching article exists yet, write the guide as new standalone content.

- [ ] **Step 1: Check for existing article overlap**

Run the dev server and check `/articles` for any article whose title/tags mention "แลกเงิน", "เงินกีบ", or "รถไฟลาว-จีน":

```bash
npm run dev
```

Visit `http://localhost:3000/articles` in the browser and note any matching titles. If none exist, proceed with the guide content below as-is (no cross-reference needed beyond the internal link).

- [ ] **Step 2: Write the full file**

```ts
// data/guides.ts
// Single source of truth สำหรับหน้า /guides/[slug] (info-intent, ไม่ใช่หน้าขาย)

export interface GuideFaq {
  q: string;
  a: string;
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  body: string[];
  faqs: GuideFaq[];
  relatedCitySlugs: string[];
  relatedRouteSlugs: string[];
}

export const guides: Guide[] = [
  {
    slug: "cross-border-nongkhai",
    title: "วิธีข้ามด่านหนองคาย-เวียงจันทน์ ฉบับเข้าใจง่าย",
    metaTitle: "วิธีข้ามด่านหนองคาย เวียงจันทน์ เตรียมตัวอย่างไร | HUGLAO",
    metaDescription:
      "ขั้นตอนข้ามด่านหนองคาย-เวียงจันทน์ทางสะพานมิตรภาพ เอกสารที่ต้องเตรียม เวลาทำการ และเคล็ดลับลดเวลารอคิว อัปเดตล่าสุดสำหรับนักท่องเที่ยวไทย",
    heroImage: "/assets/dest-vientiane.webp",
    body: [
      "การข้ามด่านหนองคาย-เวียงจันทน์ผ่านสะพานมิตรภาพไทย-ลาวแห่งที่ 1 เป็นเส้นทางที่นักท่องเที่ยวไทยใช้มากที่สุด นักท่องเที่ยวไทยสามารถใช้บัตรประชาชนข้ามแดนได้โดยไม่ต้องใช้พาสปอร์ต (ในกรณีเดินทางแบบไป-กลับในวันเดียวหรือพำนักระยะสั้นตามเงื่อนไข border pass) แต่หากวางแผนเดินทางต่อไปเมืองอื่นในลาวหรือพำนักนาน แนะนำให้พกพาสปอร์ตแทนเพื่อความสะดวก",
      "ขั้นตอนคร่าว ๆ คือ ผ่านจุดตรวจคนเข้าเมืองฝั่งไทยที่ด่านหนองคาย นั่งรถข้ามสะพานมิตรภาพ (มีรถบริการข้ามสะพานแยกจากรถส่วนตัว ผู้โดยสารทั่วไปต้องลงจากรถส่วนตัวและขึ้นรถข้ามสะพานที่ด่าน) จากนั้นผ่านจุดตรวจคนเข้าเมืองฝั่งลาว ทั้งหมดใช้เวลาประมาณ 15-45 นาทีขึ้นอยู่กับความหนาแน่นของคิวในแต่ละช่วงเวลา",
      "ช่วงเวลาที่คิวมักหนาแน่นคือเช้าวันหยุดยาวและวันศุกร์-อาทิตย์ แนะนำข้ามด่านช่วงเช้าตรู่หรือช่วงบ่ายวันธรรมดาเพื่อลดเวลารอ ด่านเปิดทำการทุกวัน โดยทั่วไปตั้งแต่ช่วงเช้าถึงช่วงค่ำ (เวลาทำการอาจเปลี่ยนแปลง ควรตรวจสอบล่วงหน้าก่อนเดินทาง) หลังผ่านด่านฝั่งลาวแล้ว รถตู้ HUGLAO รอรับที่จุดนัดหมายเพื่อพาเข้าตัวเมืองเวียงจันทน์ต่อทันที ดูรายละเอียดเส้นทางได้ที่ /routes/nongkhai-vientiane",
    ],
    faqs: [
      { q: "ใช้บัตรประชาชนข้ามด่านได้เลยไหม", a: "นักท่องเที่ยวไทยใช้บัตรประชาชนข้ามแดนได้ตามเงื่อนไข border pass แต่ถ้าวางแผนเดินทางต่อไปเมืองอื่นหรือพำนักนาน แนะนำพกพาสปอร์ตแทน" },
      { q: "ข้ามด่านใช้เวลานานแค่ไหน", a: "โดยทั่วไปประมาณ 15-45 นาที ขึ้นอยู่กับความหนาแน่นของคิวในแต่ละช่วงเวลา" },
      { q: "ต้องเปลี่ยนเงินก่อนข้ามด่านไหม", a: "ไม่จำเป็นต้องเปลี่ยนก่อนข้าม มีจุดแลกเงินทั้งสองฝั่งด่าน ดูรายละเอียดเพิ่มเติมที่ /guides/laos-money" },
    ],
    relatedCitySlugs: ["vientiane"],
    relatedRouteSlugs: ["nongkhai-vientiane"],
  },
  {
    slug: "laos-money",
    title: "เตรียมเงินไปเที่ยวลาว แลกเงินกีบยังไงให้คุ้ม",
    metaTitle: "แลกเงินไปเที่ยวลาว เงินกีบ บาท ดอลลาร์ ใช้ยังไง | HUGLAO",
    metaDescription:
      "คู่มือเตรียมเงินก่อนเที่ยวลาว ใช้เงินบาทหรือกีบดี แลกเงินที่ไหนคุ้มสุด พกเงินสดเท่าไหร่พอ อัปเดตสำหรับนักท่องเที่ยวไทย",
    heroImage: "/assets/dest-vangvieng.webp",
    body: [
      "เงินบาทไทยใช้จ่ายได้ทั่วไปในเมืองท่องเที่ยวหลักของลาวอย่างเวียงจันทน์และวังเวียง โดยเฉพาะร้านค้าและที่พักที่รับนักท่องเที่ยวไทยเป็นหลัก แต่ร้านค้าท้องถิ่นเล็ก ๆ หรือตลาดสดบางแห่งอาจรับเฉพาะเงินกีบ การพกเงินกีบติดตัวบางส่วนจึงช่วยให้จับจ่ายได้คล่องตัวกว่า",
      "จุดแลกเงินมีทั้งฝั่งด่านหนองคายและฝั่งด่านเวียงจันทน์ รวมถึงร้านแลกเงินในตัวเมือง อัตราแลกเปลี่ยนจะแตกต่างกันเล็กน้อยในแต่ละจุด แนะนำเทียบราคาจากร้านแลกเงินในตัวเมืองเวียงจันทน์ซึ่งมักให้เรทดีกว่าจุดแลกบริเวณด่านที่มีความต้องการเร่งด่วนสูง",
      "สำหรับทริปสั้น 2-3 วัน การพกเงินสดผสมทั้งบาทและกีบในจำนวนที่เหมาะสม พร้อมสำรองบัตรเครดิตไว้ใช้ในโรงแรมหรือร้านค้าใหญ่ที่รับบัตร ถือเป็นวิธีที่สะดวกและปลอดภัยที่สุด ตู้ ATM ในตัวเมืองเวียงจันทน์และวังเวียงมีให้บริการทั่วไป แต่ค่าธรรมเนียมกดเงินต่างประเทศอาจสูงกว่าการแลกเงินสด",
    ],
    faqs: [
      { q: "ใช้เงินบาทจ่ายได้ทุกที่ไหม", a: "ใช้ได้ในร้านค้า/ที่พักที่รับนักท่องเที่ยวไทยเป็นหลัก แต่ตลาดท้องถิ่นบางแห่งรับเฉพาะเงินกีบ" },
      { q: "แลกเงินที่ด่านหรือในเมืองคุ้มกว่ากัน", a: "โดยทั่วไปร้านแลกเงินในตัวเมืองเวียงจันทน์ให้เรทดีกว่าจุดแลกบริเวณด่าน แนะนำเทียบราคาก่อนแลก" },
      { q: "กดเงินจาก ATM ในลาวได้ไหม", a: "ได้ครับ มีตู้ ATM ในตัวเมืองเวียงจันทน์และวังเวียงทั่วไป แต่มีค่าธรรมเนียมกดเงินต่างประเทศ" },
    ],
    relatedCitySlugs: ["vientiane", "vangvieng"],
    relatedRouteSlugs: ["nongkhai-vientiane"],
  },
  {
    slug: "laos-china-train",
    title: "นั่งรถไฟความเร็วสูงลาว-จีน ต้องรู้อะไรบ้าง",
    metaTitle: "รถไฟความเร็วสูงลาว-จีน จองตั๋วยังไง สถานีอยู่ไหน | HUGLAO",
    metaDescription:
      "คู่มือนั่งรถไฟความเร็วสูงลาว-จีน เส้นทางเวียงจันทน์-วังเวียง-หลวงพระบาง จองตั๋วที่ไหน สถานีอยู่ตรงไหน เผื่อเวลาเดินทางเท่าไหร่",
    heroImage: "/assets/dest-luangprabang.webp",
    body: [
      "รถไฟความเร็วสูงลาว-จีนเปิดให้บริการเชื่อมเวียงจันทน์-วังเวียง-หลวงพระบาง-บ่อเต็น ย่นระยะเวลาเดินทางที่เคยใช้หลายชั่วโมงบนถนนภูเขาให้เหลือเพียง 1-2 ชั่วโมง เป็นทางเลือกยอดนิยมของนักท่องเที่ยวที่อยากประหยัดเวลาไปกับการเที่ยวจริงมากกว่าการเดินทาง",
      "สถานีทั้งหมดตั้งอยู่นอกตัวเมือง (เช่น สถานีเวียงจันทน์ใต้ห่างจากตัวเมืองประมาณ 30 นาที) จึงจำเป็นต้องมีรถต่อเข้าเมืองเสมอ ตั๋วสามารถซื้อได้ที่เคาน์เตอร์สถานีหรือผ่านตัวแทนจำหน่าย ที่นั่งมักเต็มเร็วในช่วงเทศกาลและวันหยุดยาว แนะนำจองล่วงหน้าอย่างน้อย 3-5 วัน",
      "แนะนำไปถึงสถานีก่อนเวลาขบวนออกอย่างน้อย 45-60 นาทีเพื่อผ่านขั้นตอนเช็คอินและตรวจกระเป๋าแบบเดียวกับสนามบิน ดูบริการรถตู้รับส่งเชื่อมสถานีที่เกี่ยวข้องได้ที่หน้า /services/train-ticket และ /routes/vientiane-train-station",
    ],
    faqs: [
      { q: "จองตั๋วรถไฟความเร็วสูงล่วงหน้าได้กี่วัน", a: "ระบบเปิดขายตั๋วล่วงหน้าตามรอบที่ประกาศ ช่วงเทศกาลตั๋วขายหมดเร็วมาก แนะนำให้ทีมงาน HUGLAO ช่วยตรวจสอบและจองให้" },
      { q: "สถานีอยู่ในตัวเมืองไหม", a: "ไม่อยู่ครับ ทุกสถานีอยู่นอกตัวเมือง ต้องต่อรถเข้า-ออกเสมอ" },
      { q: "มีกี่ชั้นที่นั่ง", a: "มีชั้นธุรกิจและชั้นประหยัด ราคาต่างกันตามระดับที่นั่ง ทักแชทสอบถามที่นั่งว่างได้" },
    ],
    relatedCitySlugs: ["vientiane", "vangvieng", "luangprabang"],
    relatedRouteSlugs: ["vientiane-train-station", "vangvieng-luangprabang"],
  },
];

export const getGuideBySlug = (slug: string): Guide | undefined =>
  guides.find((g) => g.slug === slug);

export const getAllGuides = (): Guide[] => guides;
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit` (from `huglao-site/`)
Expected: no errors referencing `data/guides.ts`.

- [ ] **Step 4: Commit**

```bash
git add data/guides.ts
git commit -m "feat: add guides data for 3 phase-1 guides"
```

---

## Task 5: Route detail page `app/routes/[slug]/page.tsx`

**Files:**
- Create: `huglao-site/app/routes/[slug]/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import PricingTable from "@/components/PricingTable";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { routes, getRouteBySlug } from "@/data/routes";
import { getPricingGroupsByTitles } from "@/data/pricing";

const LINE_URL = "https://lin.ee/xudxWlE";

export async function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) return {};
  return {
    title: route.metaTitle,
    description: route.metaDescription,
    alternates: { canonical: `/routes/${route.slug}` },
    openGraph: {
      title: route.metaTitle,
      description: route.metaDescription,
      url: `/routes/${route.slug}`,
      type: "website",
      images: [{ url: route.heroImage }],
    },
  };
}

export default async function RoutePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) notFound();

  const pricingGroups = getPricingGroupsByTitles(route.pricingGroupTitles);
  const relatedRoutes = routes.filter((r) => route.relatedRouteSlugs.includes(r.slug));

  return (
    <div>
      <BreadcrumbStructuredData
        items={[
          { name: "หน้าแรก", href: "/" },
          { name: "เส้นทาง", href: "/routes" },
          { name: route.title, href: `/routes/${route.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: route.title,
            provider: { "@type": "Organization", name: "HUGLAO GROUP", url: "https://huglao.com" },
            areaServed: [route.fromCity, route.toCity],
          }),
        }}
      />
      {route.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: route.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}

      {/* ===== HERO ===== */}
      <section
        className="relative overflow-hidden py-16 md:py-[clamp(112px,15vw,152px)] px-[clamp(20px,5vw,48px)] pb-6 md:pb-[clamp(48px,7vw,72px)]"
        style={{ background: "linear-gradient(165deg,#0a1f14,#123524)", color: "#fbf7ec" }}
      >
        <div className="relative max-w-[1180px] mx-auto">
          <nav aria-label="breadcrumb" className="text-[.85rem] mb-[18px]" style={{ color: "#b7b29d" }}>
            <Link href="/" className="no-underline hover:text-gold-light" style={{ color: "#b7b29d" }}>
              หน้าแรก
            </Link>{" "}
            /{" "}
            <Link href="/routes" className="no-underline hover:text-gold-light" style={{ color: "#b7b29d" }}>
              เส้นทาง
            </Link>{" "}
            / <span className="text-gold-light">{route.title}</span>
          </nav>
          <div className="max-w-[820px]">
            <h1
              className="mt-4 font-serif-th font-bold leading-[1.2]"
              style={{ fontSize: "clamp(2rem,5.6vw,3.4rem)", letterSpacing: "-.01em" }}
            >
              {route.title}
            </h1>
            <p className="mt-5 max-w-[64ch]" style={{ color: "#cfc9b6", fontSize: "clamp(1rem,2vw,1.2rem)", lineHeight: 1.75 }}>
              ระยะเวลาโดยประมาณ {route.durationText}
            </p>
            <div className="flex flex-wrap gap-3.5 mt-[30px]">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2.5 rounded-full px-[30px] py-[15px] font-bold text-deep-green no-underline text-[1rem] hover:-translate-y-1 transition-transform"
                style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)", boxShadow: "0 16px 36px rgba(168,120,21,.45)" }}
              >
                ติดต่อจองรถ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="max-w-[900px] mx-auto px-[clamp(20px,5vw,48px)] pt-8 md:pt-[clamp(48px,7vw,72px)]">
        {route.intro.map((p, i) => (
          <p key={i} className="text-[1.08rem] leading-[1.9] text-[#3c3e33] mb-5 last:mb-0">
            {p}
          </p>
        ))}
      </section>

      {/* ===== INCLUDED / EXCLUDED ===== */}
      <section className="max-w-[900px] mx-auto px-[clamp(20px,5vw,48px)] pt-8 grid gap-4 md:grid-cols-2">
        <div className="bg-white border border-border rounded-2xl p-5">
          <h3 className="mt-0 mb-3 text-deep-green-2 text-[1rem]">รวมอะไรบ้าง</h3>
          <ul className="m-0 pl-5 text-text-muted text-[.92rem] leading-[1.8]">
            {route.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5">
          <h3 className="mt-0 mb-3 text-deep-green-2 text-[1rem]">ไม่รวม</h3>
          <ul className="m-0 pl-5 text-text-muted text-[.92rem] leading-[1.8]">
            {route.excluded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {route.crossBorderNote && (
        <section className="max-w-[900px] mx-auto px-[clamp(20px,5vw,48px)] pt-6">
          {route.crossBorderNote.map((p, i) => (
            <p key={i} className="text-[.98rem] leading-[1.85] text-[#3c3e33]">
              {p}
            </p>
          ))}
        </section>
      )}

      {/* ===== TIMELINE ===== */}
      <section className="max-w-[900px] mx-auto px-[clamp(20px,5vw,48px)] pt-10">
        <h2 className="mt-0 mb-4 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>
          ไทม์ไลน์ตัวอย่าง
        </h2>
        <div className="flex flex-col gap-3">
          {route.sampleTimeline.map((stop) => (
            <div key={stop.time + stop.activity} className="flex gap-4 bg-white border border-border rounded-2xl p-4">
              <span className="font-bold text-gold-dark shrink-0 w-24">{stop.time}</span>
              <span className="text-[#3c3e33]">{stop.activity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">ราคา</span>
        <h2 className="mt-3 mb-4 md:mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          ราคา{route.title}
        </h2>
        <PricingTable groups={pricingGroups} />
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="max-w-[840px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <span className="inline-block text-gold-dark font-bold tracking-[.2em] text-[.8rem] uppercase">คำถามที่พบบ่อย</span>
        <h2 className="mt-3 mb-4 md:mb-[30px] font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          FAQ {route.title}
        </h2>
        <div className="flex flex-col gap-3">
          {route.faqs.map((faq) => (
            <details key={faq.q} className="bg-white border border-border rounded-2xl px-[22px] py-1.5">
              <summary className="cursor-pointer list-none py-4 font-semibold text-deep-green-2 text-[1rem] flex justify-between gap-3.5">
                {faq.q}
                <span className="text-gold-dark">+</span>
              </summary>
              <p className="mb-4 text-text-muted leading-[1.75] text-[.94rem]">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== RELATED ===== */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/routes"
            className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
          >
            ← ดูเส้นทางทั้งหมด
          </Link>
          {relatedRoutes.map((r) => (
            <Link
              key={r.slug}
              href={`/routes/${r.slug}`}
              className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
            >
              {r.title} →
            </Link>
          ))}
          {route.relatedCitySlugs.map((slug) => (
            <Link
              key={slug}
              href={`/van/${slug}`}
              className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
            >
              ดูหน้าเมือง →
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] mt-10 md:mt-[clamp(64px,8vw,96px)] pb-14 md:pb-[clamp(80px,10vw,120px)]">
        <div
          className="rounded-[24px] p-[clamp(36px,6vw,60px)] flex flex-wrap gap-9 items-center justify-between"
          style={{ background: "linear-gradient(165deg,#0a1f14,#123524)", color: "#fbf7ec" }}
        >
          <div className="max-w-[520px]">
            <h2 className="mt-0 mb-3.5 font-serif-th font-bold" style={{ fontSize: "clamp(1.6rem,3.2vw,2.2rem)" }}>
              พร้อมจอง{route.title}แล้วหรือยัง
            </h2>
            <p className="m-0 text-[#cfc9b6] text-[1rem] leading-[1.8]">
              แจ้งวันเดินทางและจำนวนผู้โดยสาร ทีมงานจะจัดรถตู้ VIP และเสนอราคาให้ภายในไม่กี่ชั่วโมง
            </p>
            <div className="flex gap-3.5 mt-[26px] flex-wrap">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener"
                className="no-underline rounded-full px-7 py-3.5 font-bold text-deep-green text-[.98rem]"
                style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" }}
              >
                ติดต่อจองรถ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build` (from `huglao-site/`)
Expected: fails only if a dependent file from a later task is missing (e.g. hub page not yet created isn't required for this route to build — `[slug]` pages don't depend on the hub page). If it fails for any other reason, fix before continuing.

- [ ] **Step 3: Commit**

```bash
git add app/routes/\[slug\]/page.tsx
git commit -m "feat: add /routes/[slug] detail page template"
```

---

## Task 6: Route hub page `app/routes/page.tsx`

**Files:**
- Create: `huglao-site/app/routes/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { getAllRoutes } from "@/data/routes";

export const metadata: Metadata = {
  title: "เส้นทางเที่ยวลาว ราคาเริ่มต้นชัดเจน | HUGLAO",
  description: "รวมเส้นทางรถตู้ยอดนิยมเที่ยวลาว ทั้งข้ามด่าน เชื่อมเมือง และรับส่งสนามบิน/สถานีรถไฟ ราคาเริ่มต้นบอกชัดในทุกเส้นทาง",
  alternates: { canonical: "/routes" },
};

export default function RoutesHubPage() {
  const routes = getAllRoutes();

  return (
    <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(96px,12vw,140px)] pb-[clamp(64px,8vw,96px)]">
      <BreadcrumbStructuredData items={[{ name: "หน้าแรก", href: "/" }, { name: "เส้นทาง", href: "/routes" }]} />
      <nav aria-label="breadcrumb" className="text-[.85rem] mb-[18px] text-text-muted">
        <Link href="/" className="no-underline hover:text-gold-dark text-text-muted">
          หน้าแรก
        </Link>{" "}
        / <span className="text-deep-green-2">เส้นทาง</span>
      </nav>
      <h1 className="mt-0 mb-3 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(2rem,4.4vw,3rem)" }}>
        เส้นทางเที่ยวลาว
      </h1>
      <p className="mb-10 text-text-muted text-[1.05rem] leading-[1.8] max-w-[70ch]">
        รวมเส้นทางรถตู้ยอดนิยม ทั้งข้ามด่าน เชื่อมเมือง และรับส่งสนามบิน/สถานีรถไฟ ราคาเริ่มต้นบอกชัดในทุกเส้นทาง
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => (
          <Link
            key={route.slug}
            href={`/routes/${route.slug}`}
            className="group block no-underline bg-white border border-border rounded-2xl overflow-hidden hover:border-gold-light transition-colors"
          >
            <div className="relative aspect-[16/10]">
              <Image src={route.heroImage} alt={route.title} fill sizes="(max-width: 900px) 100vw, 380px" className="object-cover" />
            </div>
            <div className="p-5">
              <h2 className="m-0 mb-2 font-serif-th text-deep-green-2 text-[1.1rem]">{route.title}</h2>
              <p className="m-0 text-text-muted text-[.88rem]">{route.durationText}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds with no type errors in `app/routes/page.tsx`.

- [ ] **Step 3: Commit**

```bash
git add app/routes/page.tsx
git commit -m "feat: add /routes hub page"
```

---

## Task 7: Service detail + hub pages

**Files:**
- Create: `huglao-site/app/services/[slug]/page.tsx`
- Create: `huglao-site/app/services/page.tsx`

- [ ] **Step 1: Write `app/services/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { services, getServiceBySlug } from "@/data/services";
import { cities } from "@/data/cities";

const LINE_URL = "https://lin.ee/xudxWlE";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
      type: "website",
      images: [{ url: service.heroImage }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedCities = cities.filter((c) => service.relatedCitySlugs.includes(c.slug));

  return (
    <div>
      <BreadcrumbStructuredData
        items={[
          { name: "หน้าแรก", href: "/" },
          { name: "บริการ", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: service.title,
            provider: { "@type": "Organization", name: "HUGLAO GROUP", url: "https://huglao.com" },
          }),
        }}
      />
      {service.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: service.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}

      <section
        className="relative overflow-hidden py-16 md:py-[clamp(112px,15vw,152px)] px-[clamp(20px,5vw,48px)] pb-6 md:pb-[clamp(48px,7vw,72px)]"
        style={{ background: "linear-gradient(165deg,#0a1f14,#123524)", color: "#fbf7ec" }}
      >
        <div className="relative max-w-[1180px] mx-auto">
          <nav aria-label="breadcrumb" className="text-[.85rem] mb-[18px]" style={{ color: "#b7b29d" }}>
            <Link href="/" className="no-underline hover:text-gold-light" style={{ color: "#b7b29d" }}>
              หน้าแรก
            </Link>{" "}
            /{" "}
            <Link href="/services" className="no-underline hover:text-gold-light" style={{ color: "#b7b29d" }}>
              บริการ
            </Link>{" "}
            / <span className="text-gold-light">{service.title}</span>
          </nav>
          <h1 className="mt-4 font-serif-th font-bold leading-[1.2]" style={{ fontSize: "clamp(2rem,5.6vw,3.4rem)" }}>
            {service.title}
          </h1>
          <div className="flex flex-wrap gap-3.5 mt-[30px]">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2.5 rounded-full px-[30px] py-[15px] font-bold text-deep-green no-underline text-[1rem] hover:-translate-y-1 transition-transform"
              style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)", boxShadow: "0 16px 36px rgba(168,120,21,.45)" }}
            >
              สอบถาม/จองบริการ
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-[900px] mx-auto px-[clamp(20px,5vw,48px)] pt-8 md:pt-[clamp(48px,7vw,72px)]">
        {service.intro.map((p, i) => (
          <p key={i} className="text-[1.08rem] leading-[1.9] text-[#3c3e33] mb-5 last:mb-0">
            {p}
          </p>
        ))}
      </section>

      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <h2 className="mt-0 mb-4 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          จุดเด่นของบริการ
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {service.features.map((f) => (
            <div key={f} className="bg-white border border-border rounded-2xl p-4 text-[#3c3e33] text-[.96rem]">
              {f}
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="max-w-[840px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <h2 className="mt-0 mb-4 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.7rem,3.6vw,2.5rem)" }}>
          FAQ {service.title}
        </h2>
        <div className="flex flex-col gap-3">
          {service.faqs.map((faq) => (
            <details key={faq.q} className="bg-white border border-border rounded-2xl px-[22px] py-1.5">
              <summary className="cursor-pointer list-none py-4 font-semibold text-deep-green-2 text-[1rem] flex justify-between gap-3.5">
                {faq.q}
                <span className="text-gold-dark">+</span>
              </summary>
              <p className="mb-4 text-text-muted leading-[1.75] text-[.94rem]">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
          >
            ← ดูบริการทั้งหมด
          </Link>
          {relatedCities.map((c) => (
            <Link
              key={c.slug}
              href={`/van/${c.slug}`}
              className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
            >
              รถตู้{c.name} →
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] mt-10 md:mt-[clamp(64px,8vw,96px)] pb-14 md:pb-[clamp(80px,10vw,120px)]">
        <div
          className="rounded-[24px] p-[clamp(36px,6vw,60px)] flex flex-wrap gap-9 items-center justify-between"
          style={{ background: "linear-gradient(165deg,#0a1f14,#123524)", color: "#fbf7ec" }}
        >
          <div className="max-w-[520px]">
            <h2 className="mt-0 mb-3.5 font-serif-th font-bold" style={{ fontSize: "clamp(1.6rem,3.2vw,2.2rem)" }}>
              สนใจ{service.title}?
            </h2>
            <p className="m-0 text-[#cfc9b6] text-[1rem] leading-[1.8]">
              ทักแชท LINE แจ้งความต้องการ ทีมงานจะตอบกลับพร้อมรายละเอียดและราคาให้เร็วที่สุด
            </p>
            <div className="flex gap-3.5 mt-[26px] flex-wrap">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener"
                className="no-underline rounded-full px-7 py-3.5 font-bold text-deep-green text-[.98rem]"
                style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" }}
              >
                แชท LINE
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Write `app/services/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { getAllServices } from "@/data/services";

export const metadata: Metadata = {
  title: "บริการเที่ยวลาวครบวงจร | HUGLAO",
  description: "รวมบริการเที่ยวลาวของ HUGLAO ตั้งแต่รถตู้ VIP รถรับส่งสนามบิน รถพร้อมคนขับ ตั๋วรถไฟลาว-จีน ไปจนถึงไกด์นำเที่ยว",
  alternates: { canonical: "/services" },
};

export default function ServicesHubPage() {
  const services = getAllServices();

  return (
    <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(96px,12vw,140px)] pb-[clamp(64px,8vw,96px)]">
      <BreadcrumbStructuredData items={[{ name: "หน้าแรก", href: "/" }, { name: "บริการ", href: "/services" }]} />
      <nav aria-label="breadcrumb" className="text-[.85rem] mb-[18px] text-text-muted">
        <Link href="/" className="no-underline hover:text-gold-dark text-text-muted">
          หน้าแรก
        </Link>{" "}
        / <span className="text-deep-green-2">บริการ</span>
      </nav>
      <h1 className="mt-0 mb-3 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(2rem,4.4vw,3rem)" }}>
        บริการเที่ยวลาวครบวงจร
      </h1>
      <p className="mb-10 text-text-muted text-[1.05rem] leading-[1.8] max-w-[70ch]">
        ตั้งแต่รถตู้ VIP เที่ยวลาว รถรับส่งสนามบิน รถพร้อมคนขับส่วนตัว ตั๋วรถไฟลาว-จีน ไปจนถึงไกด์นำเที่ยว
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/van-vip"
          className="group block no-underline bg-white border border-border rounded-2xl overflow-hidden hover:border-gold-light transition-colors"
        >
          <div className="p-5">
            <h2 className="m-0 mb-2 font-serif-th text-deep-green-2 text-[1.1rem]">รถตู้ VIP เที่ยวลาว</h2>
            <p className="m-0 text-text-muted text-[.88rem]">บริการหลัก — เช่ารถตู้พร้อมคนขับทุกเมือง</p>
          </div>
        </Link>
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group block no-underline bg-white border border-border rounded-2xl overflow-hidden hover:border-gold-light transition-colors"
          >
            <div className="relative aspect-[16/10]">
              <Image src={service.heroImage} alt={service.title} fill sizes="(max-width: 900px) 100vw, 380px" className="object-cover" />
            </div>
            <div className="p-5">
              <h2 className="m-0 mb-2 font-serif-th text-deep-green-2 text-[1.1rem]">{service.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds, no type errors.

- [ ] **Step 4: Commit**

```bash
git add app/services/
git commit -m "feat: add /services hub and detail pages"
```

---

## Task 8: Guide detail + hub pages

**Files:**
- Create: `huglao-site/app/guides/[slug]/page.tsx`
- Create: `huglao-site/app/guides/page.tsx`

- [ ] **Step 1: Write `app/guides/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { guides, getGuideBySlug } from "@/data/guides";
import { cities } from "@/data/cities";
import { routes } from "@/data/routes";

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `/guides/${guide.slug}`,
      type: "article",
      images: [{ url: guide.heroImage }],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedCities = cities.filter((c) => guide.relatedCitySlugs.includes(c.slug));
  const relatedRoutes = routes.filter((r) => guide.relatedRouteSlugs.includes(r.slug));

  return (
    <div>
      <BreadcrumbStructuredData
        items={[
          { name: "หน้าแรก", href: "/" },
          { name: "คู่มือเที่ยวลาว", href: "/guides" },
          { name: guide.title, href: `/guides/${guide.slug}` },
        ]}
      />
      {guide.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: guide.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      )}

      <section className="max-w-[900px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(96px,12vw,140px)] pb-8">
        <nav aria-label="breadcrumb" className="text-[.85rem] mb-[18px] text-text-muted">
          <Link href="/" className="no-underline hover:text-gold-dark text-text-muted">
            หน้าแรก
          </Link>{" "}
          /{" "}
          <Link href="/guides" className="no-underline hover:text-gold-dark text-text-muted">
            คู่มือเที่ยวลาว
          </Link>{" "}
          / <span className="text-deep-green-2">{guide.title}</span>
        </nav>
        <h1 className="mt-0 mb-6 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(2rem,4.4vw,3rem)" }}>
          {guide.title}
        </h1>
        <div className="relative aspect-[16/8] rounded-2xl overflow-hidden mb-8">
          <Image src={guide.heroImage} alt={guide.title} fill sizes="900px" className="object-cover" />
        </div>
        {guide.body.map((p, i) => (
          <p key={i} className="text-[1.05rem] leading-[1.9] text-[#3c3e33] mb-5 last:mb-0">
            {p}
          </p>
        ))}
      </section>

      <section id="faq" className="max-w-[840px] mx-auto px-[clamp(20px,5vw,48px)] pt-10">
        <h2 className="mt-0 mb-4 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>
          คำถามที่พบบ่อย
        </h2>
        <div className="flex flex-col gap-3">
          {guide.faqs.map((faq) => (
            <details key={faq.q} className="bg-white border border-border rounded-2xl px-[22px] py-1.5">
              <summary className="cursor-pointer list-none py-4 font-semibold text-deep-green-2 text-[1rem] flex justify-between gap-3.5">
                {faq.q}
                <span className="text-gold-dark">+</span>
              </summary>
              <p className="mb-4 text-text-muted leading-[1.75] text-[.94rem]">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-[900px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 pb-16">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
          >
            ← ดูคู่มือทั้งหมด
          </Link>
          {relatedRoutes.map((r) => (
            <Link
              key={r.slug}
              href={`/routes/${r.slug}`}
              className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
            >
              {r.title} →
            </Link>
          ))}
          {relatedCities.map((c) => (
            <Link
              key={c.slug}
              href={`/van/${c.slug}`}
              className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
            >
              รถตู้{c.name} →
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Write `app/guides/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { getAllGuides } from "@/data/guides";

export const metadata: Metadata = {
  title: "คู่มือเที่ยวลาว | HUGLAO",
  description: "รวมคู่มือเตรียมตัวก่อนเที่ยวลาว ข้ามด่าน แลกเงิน นั่งรถไฟความเร็วสูง อัปเดตสำหรับนักท่องเที่ยวไทย",
  alternates: { canonical: "/guides" },
};

export default function GuidesHubPage() {
  const guides = getAllGuides();

  return (
    <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(96px,12vw,140px)] pb-[clamp(64px,8vw,96px)]">
      <BreadcrumbStructuredData items={[{ name: "หน้าแรก", href: "/" }, { name: "คู่มือเที่ยวลาว", href: "/guides" }]} />
      <nav aria-label="breadcrumb" className="text-[.85rem] mb-[18px] text-text-muted">
        <Link href="/" className="no-underline hover:text-gold-dark text-text-muted">
          หน้าแรก
        </Link>{" "}
        / <span className="text-deep-green-2">คู่มือเที่ยวลาว</span>
      </nav>
      <h1 className="mt-0 mb-3 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(2rem,4.4vw,3rem)" }}>
        คู่มือเที่ยวลาว
      </h1>
      <p className="mb-10 text-text-muted text-[1.05rem] leading-[1.8] max-w-[70ch]">
        เตรียมตัวก่อนเที่ยวลาวให้พร้อม ตั้งแต่ข้ามด่าน แลกเงิน ไปจนถึงนั่งรถไฟความเร็วสูง
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group block no-underline bg-white border border-border rounded-2xl overflow-hidden hover:border-gold-light transition-colors"
          >
            <div className="relative aspect-[16/10]">
              <Image src={guide.heroImage} alt={guide.title} fill sizes="(max-width: 900px) 100vw, 380px" className="object-cover" />
            </div>
            <div className="p-5">
              <h2 className="m-0 font-serif-th text-deep-green-2 text-[1.1rem]">{guide.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds, no type errors.

- [ ] **Step 4: Commit**

```bash
git add app/guides/
git commit -m "feat: add /guides hub and detail pages"
```

---

## Task 9: Cities hub page `app/cities/page.tsx`

**Files:**
- Create: `huglao-site/app/cities/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { cities } from "@/data/cities";

export const metadata: Metadata = {
  title: "เมืองยอดนิยมในลาว | HUGLAO",
  description: "รวมเมืองท่องเที่ยวยอดนิยมในลาว เวียงจันทน์ วังเวียง หลวงพระบาง ปากเซ พร้อมรถตู้ VIP พร้อมคนขับในทุกเมือง",
  alternates: { canonical: "/cities" },
};

export default function CitiesHubPage() {
  return (
    <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-[clamp(96px,12vw,140px)] pb-[clamp(64px,8vw,96px)]">
      <BreadcrumbStructuredData items={[{ name: "หน้าแรก", href: "/" }, { name: "เมือง", href: "/cities" }]} />
      <nav aria-label="breadcrumb" className="text-[.85rem] mb-[18px] text-text-muted">
        <Link href="/" className="no-underline hover:text-gold-dark text-text-muted">
          หน้าแรก
        </Link>{" "}
        / <span className="text-deep-green-2">เมือง</span>
      </nav>
      <h1 className="mt-0 mb-3 font-serif-th font-bold text-deep-green-2" style={{ fontSize: "clamp(2rem,4.4vw,3rem)" }}>
        เมืองยอดนิยมในลาว
      </h1>
      <p className="mb-10 text-text-muted text-[1.05rem] leading-[1.8] max-w-[70ch]">
        รถตู้ VIP พร้อมคนขับพร้อมให้บริการในทุกเมือง เลือกเมืองที่คุณสนใจเพื่อดูสถานที่เที่ยว โปรแกรม และราคา
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/van/${city.slug}`}
            className="group block no-underline bg-white border border-border rounded-2xl overflow-hidden hover:border-gold-light transition-colors"
          >
            <div className="relative aspect-[16/10]">
              <Image src={city.heroImage} alt={city.name} fill sizes="(max-width: 900px) 100vw, 380px" className="object-cover" />
            </div>
            <div className="p-5">
              <h2 className="m-0 mb-2 font-serif-th text-deep-green-2 text-[1.1rem]">{city.name}</h2>
              <p className="m-0 text-text-muted text-[.88rem]">{city.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/cities/
git commit -m "feat: add /cities hub page"
```

---

## Task 10: Wire related routes/services/guides into `/van/[city]`

**Files:**
- Modify: `huglao-site/app/van/[city]/page.tsx:1-10` (imports), `:48-49` (data derivation), `:229-248` (related-links section)

- [ ] **Step 1: Add imports and derive related data**

In `app/van/[city]/page.tsx`, add to the imports at the top (after the `getPricingGroupsForCity` import on line 9):

```tsx
import { routes } from "@/data/routes";
import { services } from "@/data/services";
import { guides } from "@/data/guides";
```

Then, in `CityVanPage`, right after the existing `const otherCities = cities.filter(...)` line (line 49), add:

```tsx
  const relatedRoutes = routes.filter((r) => r.relatedCitySlugs.includes(city.slug));
  const relatedServices = services.filter((s) => s.relatedCitySlugs.includes(city.slug));
  const relatedGuides = guides.filter((g) => g.relatedCitySlugs.includes(city.slug));
```

- [ ] **Step 2: Extend the "INTERNAL LINKS" section**

Replace the existing internal-links section (the block starting `{/* ===== INTERNAL LINKS ===== */}` around line 229) with:

```tsx
      {/* ===== INTERNAL LINKS ===== */}
      <section className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,48px)] pt-10 md:pt-[clamp(64px,8vw,96px)]">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/van-vip"
            className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
          >
            ← ดูภาพรวมรถตู้ VIP เที่ยวลาวทั้งหมด
          </Link>
          {otherCities.map((c) => (
            <Link
              key={c.slug}
              href={`/van/${c.slug}`}
              className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
            >
              รถตู้{c.name} →
            </Link>
          ))}
          {relatedRoutes.map((r) => (
            <Link
              key={r.slug}
              href={`/routes/${r.slug}`}
              className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
            >
              {r.title} →
            </Link>
          ))}
          {relatedServices.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
            >
              {s.title} →
            </Link>
          ))}
          {relatedGuides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="inline-flex items-center gap-2 no-underline text-deep-green-2 bg-white border border-border rounded-xl px-5 py-4 font-semibold hover:border-gold-light transition-colors"
            >
              {g.title} →
            </Link>
          ))}
        </div>
      </section>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds, no type errors, `/van/vientiane` etc. still statically generate.

- [ ] **Step 4: Commit**

```bash
git add app/van/\[city\]/page.tsx
git commit -m "feat: link city pages to related routes, services, and guides"
```

---

## Task 11: Extend `app/sitemap.ts`

**Files:**
- Modify: `huglao-site/app/sitemap.ts`

- [ ] **Step 1: Add new imports and URL entries**

Replace the full file with:

```ts
import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/contentful";
import { cities } from "@/data/cities";
import { getAllRoutes } from "@/data/routes";
import { getAllServices } from "@/data/services";
import { getAllGuides } from "@/data/guides";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://huglao.com";
  const articles = await getAllArticles();

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/van-vip`, lastModified: new Date() },
    { url: `${base}/cities`, lastModified: new Date() },
    ...cities.map((c) => ({
      url: `${base}/van/${c.slug}`,
      lastModified: new Date(),
    })),
    { url: `${base}/routes`, lastModified: new Date() },
    ...getAllRoutes().map((r) => ({
      url: `${base}/routes/${r.slug}`,
      lastModified: new Date(),
    })),
    { url: `${base}/services`, lastModified: new Date() },
    ...getAllServices().map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: new Date(),
    })),
    { url: `${base}/guides`, lastModified: new Date() },
    ...getAllGuides().map((g) => ({
      url: `${base}/guides/${g.slug}`,
      lastModified: new Date(),
    })),
    { url: `${base}/articles`, lastModified: new Date() },
    ...articles.map((a) => ({
      url: `${base}/articles/${a.slug}`,
      lastModified: a.publishDate ? new Date(a.publishDate) : new Date(),
    })),
  ];
}
```

- [ ] **Step 2: Verify build and inspect output**

Run: `npm run build`
Expected: succeeds. Then check `out/sitemap.xml` (or run `npm run dev` and visit `http://localhost:3000/sitemap.xml`) and confirm it lists `/cities`, `/routes`, `/routes/nongkhai-vientiane`, `/services`, `/services/airport-transfer`, `/guides`, `/guides/cross-border-nongkhai`, etc.

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: add routes/services/guides/cities to sitemap"
```

---

## Task 12: Update header/footer links from `#anchor` to real URLs

**Files:**
- Modify: `huglao-site/components/SiteHeader.tsx:9-15`
- Modify: `huglao-site/components/SiteFooter.tsx:35-45`

- [ ] **Step 1: Update `SiteHeader.tsx` nav links**

Replace the `NAV_LINKS` array (lines 9–15):

```tsx
const NAV_LINKS = [
  { href: "/services", label: "บริการ" },
  { href: "/cities", label: "เที่ยวลาว" },
  { href: "/van-vip", label: "รถตู้ VIP" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/articles", label: "บทความ" },
];
```

- [ ] **Step 2: Update `SiteFooter.tsx` "บริการ" and "เส้นทางยอดนิยม" columns**

Replace the "บริการ" list (lines 37–44):

```tsx
          <ul className="list-none p-0 m-0 flex flex-col gap-[11px] text-[.92rem]">
            <li><Link href="/van-vip" className="no-underline text-[#b6b1a2] hover:text-gold-light">รถตู้ VIP ลาว / จองรถตู้ลาว</Link></li>
            <li><Link href="/services/train-ticket" className="no-underline text-[#b6b1a2] hover:text-gold-light">จองตั๋วรถไฟลาว–จีน</Link></li>
            <li><Link href="/services/guide" className="no-underline text-[#b6b1a2] hover:text-gold-light">ไกด์นำเที่ยวลาว</Link></li>
            <li><Link href="/cities" className="no-underline text-[#b6b1a2] hover:text-gold-light">แพ็กเกจเที่ยวลาว</Link></li>
            <li><Link href="/about" className="no-underline text-[#b6b1a2] hover:text-gold-light">เกี่ยวกับเรา</Link></li>
            <li><Link href="/#faq" className="no-underline text-[#b6b1a2] hover:text-gold-light">คำถามที่พบบ่อย</Link></li>
          </ul>
```

Replace the "เส้นทางยอดนิยม" list (lines 48–55) to also link routes, not just cities:

```tsx
        <div>
          <h4 className="mb-4 text-[#f4ecd7] text-base font-semibold">เส้นทางยอดนิยม</h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-[11px] text-[.92rem]">
            <li><Link href="/routes/nongkhai-vientiane" className="no-underline text-[#b6b1a2] hover:text-gold-light">รถตู้ หนองคาย → เวียงจันทน์</Link></li>
            <li><Link href="/routes/vientiane-vangvieng" className="no-underline text-[#b6b1a2] hover:text-gold-light">รถตู้ เวียงจันทน์ → วังเวียง</Link></li>
            <li><Link href="/routes/vangvieng-luangprabang" className="no-underline text-[#b6b1a2] hover:text-gold-light">รถตู้ วังเวียง → หลวงพระบาง</Link></li>
            <li><Link href="/routes" className="no-underline text-[#b6b1a2] hover:text-gold-light">ดูเส้นทางทั้งหมด →</Link></li>
          </ul>
        </div>
```

- [ ] **Step 3: Verify no remaining `#explore`/`#services` anchors point at destinations that now have real pages**

Run: `grep -rn "#explore\|/#services" huglao-site/components/SiteHeader.tsx huglao-site/components/SiteFooter.tsx`
Expected: no matches (the homepage's own `#explore`/`#services`/`#faq` section IDs on `app/page.tsx` are unaffected — those remain valid same-page anchors; this check is only for the header/footer links that pointed at them from other pages).

- [ ] **Step 4: Run build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add components/SiteHeader.tsx components/SiteFooter.tsx
git commit -m "feat: point header/footer nav at real routes/services/cities pages"
```

---

## Task 13: Final verification pass

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

Run: `npm run build` (from `huglao-site/`)
Expected: succeeds with 0 errors. Confirm the build output lists all new static routes: `/cities`, `/routes`, `/routes/[5 slugs]`, `/services`, `/services/[4 slugs]`, `/guides`, `/guides/[3 slugs]`.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors (warnings acceptable only if they already existed before this change — compare against a lint run on `main` before this branch if unsure).

- [ ] **Step 3: Manual spot-check in dev server**

Run: `npm run dev`, then visit and check each renders without console errors and shows populated content (not placeholders):
- `http://localhost:3000/cities`
- `http://localhost:3000/routes`
- `http://localhost:3000/routes/nongkhai-vientiane`
- `http://localhost:3000/services`
- `http://localhost:3000/services/airport-transfer`
- `http://localhost:3000/guides`
- `http://localhost:3000/guides/cross-border-nongkhai`
- `http://localhost:3000/van/vientiane` (confirm the new related routes/services/guides links appear at the bottom)

- [ ] **Step 4: Confirm no orphan pages**

Every new page must be reachable from a link somewhere already verified:
- Hub pages (`/cities`, `/routes`, `/services`, `/guides`) are linked from header nav and footer (Task 12).
- Detail pages are linked from their hub's grid (Tasks 6–9) and from `/van/[city]`'s related-links strip (Task 10).

- [ ] **Step 5: Report remaining TODOs to the user**

Search for unconfirmed prices before calling this done:

Run: `grep -rn "TODO: confirm price" huglao-site/data/`
Expected: 4 matches (2 in `data/pricing.ts` from Task 1, reflected in the `vangvieng-luangprabang` and `vientiane-airport-hotel` route pages). Report this list to the user as the set of prices that need confirming before the pages go live — do not silently resolve them.

---

## Self-Review Notes

- **Spec coverage:** Part 1 URL structure ✅ (Tasks 5–9), Part 2 data fields ✅ (Tasks 2–4, adapted per Deviation note), Part 3 example content style followed for `nongkhai-vientiane` ✅, Part 4 on-page SEO (title/meta patterns, breadcrumb, JSON-LD, canonical) ✅ (all detail pages), Part 5 internal linking ✅ (Task 10 + hub pages), Part 7 Steps 1/4/5/6/7 ✅, Step 8 final checklist ✅ (Task 13). Steps 2/3 (Contentful) intentionally out of scope per user decision.
- **Placeholder scan:** all data content is real, unique Thai copy; the only intentionally-flagged items are the two `TODO: confirm price` price rows, called out explicitly rather than hidden.
- **Type consistency:** `Route`, `Service`, `Guide` interfaces and their `getXBySlug`/`getAllX` accessor names are used identically across Tasks 2–4 (definitions) and Tasks 5–10 (consumers).
