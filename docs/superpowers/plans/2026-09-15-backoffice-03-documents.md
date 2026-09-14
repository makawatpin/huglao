# HUGLAO Back Office — Plan 3: Documents (DP / RC / IV / CR) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** From a booking, staff issue the four booking documents — ใบเสร็จมัดจำ (DP), ใบเสร็จยอดคงเหลือ (RC), ใบแจ้งหนี้รถตู้ (IV), ใบเสร็จค่านายหน้า (CR) — through a prefilled form with preview; each issued document gets a gap-free number and opens as a print-ready bilingual A4 page in HUGLAO green/gold that the browser prints or saves as PDF. Admins edit company details used on the header.

**Architecture:** Pure, tested helpers decide which documents are available next (`lib/doc-flow.ts`) and build the prefilled draft for each type (`lib/doc-drafts.ts`). A server action validates the draft with zod and calls the existing `issue_document` RPC (numbering, immutability and booking-status changes already live in Postgres). One React component `DocumentSheet` renders every type for both the in-form preview and the printable page; print CSS hides the app chrome. A small migration seeds company details, adds an RLS-bypassing timeline RPC, and makes voids roll back booking status.

**Tech Stack:** Next.js 16.3.5 App Router, React 19, Tailwind v4, `@supabase/ssr` typed, zod 4, Vitest, `next/font/google` Sarabun (document font).

**Repo:** `C:\Users\Makawat_PC\Documents\Code\huglao-app` (branch `main` → https://app.huglao.com). Supabase `ouwdzheoelqklmssfbmm` (migrations through `20260915000000_inline_customer.sql` applied).

**Spec:** `huglao/docs/superpowers/specs/2026-09-13-huglao-backoffice-design.md` (document types table, PDF section — print-ready page, decision 2026-09-15).

## Business rules (from the owner)

- Sale price = van price + commission (default 25%). Customer pays a **deposit = commission** to HUGLAO (DP), and pays the **rest to the van directly** after the trip (RC records it).
- IV invoices the van owner for `commission − deposit held` only when that is > 0 (usually 0 because deposit = commission). CR is the receipt for a paid IV.
- Recipients: DP/RC → the booking's customer (`customer_name`, `customer_phone`); IV/CR → the van owner (`vans.owner_name`, `vans.phone`). IV/CR need a van on the booking.
- `issue_document` (DB) already enforces: active staff, recipient, ≥1 valid item, booking exists and not cancelled, CR references an issued IV of the same booking, RC may reference an issued DP of the same booking, payment method `cash|transfer` for DP/RC/CR/PV, IV has a due date and no payment method; DP → booking `deposit_paid`, RC → `completed`.

## Before you start

- Read Next 16 docs under `node_modules/next/dist/docs/01-app/` for anything unfamiliar (`params`/`searchParams` are Promises; `PageProps<'/route'>`; server actions + `useActionState`; `redirect` outside try/catch; `next/font`).
- Reuse: `lib/money.ts` (`round2`, `bahtText`, `formatBaht`, `formatThaiDate`), `lib/validation.ts` (`FormState`, `formDataToObject`, `toFormState`), `lib/uuid.ts` (`isUuid`), `components/ui/*` (`PageHeader`, `Field`, `describedBy`, `StatusPill`, `EmptyState`), `lib/data/bookings.ts` (`getBooking`), `lib/current-staff.ts`, CSS classes `.glass .glass-solid .btn .btn-primary .btn-glass .btn-danger .btn-sm .input .pill .chip .eyebrow .num .field-error .nav-link`.
- UI rules: data panels use `glass glass-solid`; money `.num` + `formatBaht`; doc numbers `font-mono`. **Documents themselves use the brand palette** (green `#0F2A1D`, gold `#D9A21B`, ivory paper `#FFFDF7`), not the app palette.
- Commit trailer: `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.

## File structure (this plan)

```
supabase/migrations/20260916000000_documents_support.sql  # company seed, timeline RPC, void rollback
lib/database.types.ts                                     # regenerate after push (npm run db:types)
lib/doc-types.ts / doc-types.test.ts                      # labels TH/EN, recipient kind, codes
lib/doc-flow.ts / doc-flow.test.ts                        # which documents can be issued next
lib/doc-drafts.ts / doc-drafts.test.ts                    # prefilled items/amounts per type
lib/validation.ts (+test)                                 # documentSchema (items JSON), settingsSchema
lib/data/documents.ts                                     # list/get documents, timeline RPC, company settings
components/document-sheet.tsx                             # A4 bilingual template (preview + print)
components/document-form.tsx, line-items-editor.tsx      # issue form (client)
components/print-button.tsx                               # window.print()
app/(app)/bookings/[id]/documents/new/page.tsx            # ?type=DP|RC|IV|CR
app/(app)/bookings/[id]/documents/actions.ts              # issueDocument server action
app/(app)/documents/page.tsx, [id]/page.tsx               # list + printable view
app/(app)/admin/settings/page.tsx, actions.ts             # company settings (admin)
app/globals.css                                           # @media print rules
app/(app)/bookings/[id]/page.tsx                          # timeline with "ออกใบ" buttons
lib/nav.ts (+test)                                        # remove soon on /documents, /admin/settings
```

---

### Task 1: Migration — company seed, timeline RPC, void rollback

**Files:** Create `supabase/migrations/20260916000000_documents_support.sql`

- [ ] **Step 1: Write**

```sql
-- Plan 3 support

-- Company details provided by the owner 2026-09-15 (tax id, address, bank come later via /admin/settings)
update company_settings
   set name_th = 'บริษัท ฮักลาว กรุ๊ป จำกัด',
       name_en = 'Huglao Group Co., Ltd.',
       phone = '095-596-2525'
 where id = 1;

-- Timeline for a booking regardless of who issued each document (RLS shows staff only their own).
-- Returns numbers/status only for documents the caller cannot otherwise read.
create function booking_documents(p_booking_id uuid)
returns table (id uuid, doc_type doc_type, doc_no text, status doc_status, total numeric, issued_by uuid, created_at timestamptz)
language sql stable security definer set search_path = public as $$
  select d.id, d.doc_type, d.doc_no, d.status, d.total, d.issued_by, d.created_at
    from documents d
   where d.booking_id = p_booking_id and is_active_staff()
   order by d.created_at
$$;
revoke execute on function booking_documents(uuid) from public, anon;
grant execute on function booking_documents(uuid) to authenticated;

-- Voiding rolls the booking status back so the flow can be redone.
create or replace function void_document(p_document_id uuid, p_reason text) returns documents
language plpgsql security definer set search_path = public as $$
declare v_doc documents;
begin
  if not is_admin() then raise exception 'admin only'; end if;
  if coalesce(trim(p_reason), '') = '' then raise exception 'reason required'; end if;
  update documents set status = 'void', void_reason = trim(p_reason),
    voided_by = auth.uid(), voided_at = now()
  where id = p_document_id and status = 'issued'
  returning * into v_doc;
  if v_doc.id is null then raise exception 'document not found or already void'; end if;

  if v_doc.doc_type = 'RC' and not exists (
       select 1 from documents where booking_id = v_doc.booking_id and doc_type = 'RC' and status = 'issued') then
    update bookings set status = case when exists (
        select 1 from documents where booking_id = v_doc.booking_id and doc_type = 'DP' and status = 'issued')
      then 'deposit_paid'::booking_status else 'booked'::booking_status end
     where id = v_doc.booking_id and status = 'completed';
  elsif v_doc.doc_type = 'DP' and not exists (
       select 1 from documents where booking_id = v_doc.booking_id and doc_type = 'DP' and status = 'issued') then
    update bookings set status = 'booked' where id = v_doc.booking_id and status = 'deposit_paid';
  end if;
  return v_doc;
end $$;
```

(`create or replace` keeps the existing grants/revokes on `void_document`. The booking updates run as the function owner, so `guard_booking_update` lets them through.)

- [ ] **Step 2: Commit** `git add supabase/migrations/20260916000000_documents_support.sql && git commit -m "feat(db): company seed, booking timeline RPC, void rollback"`
- [ ] **Step 3: CHECKPOINT (human)** owner runs `npx supabase db push` in `huglao-app`. Then `npm run db:types`, verify `booking_documents` appears in `lib/database.types.ts`, `npm run build`, commit `chore: regenerate types`.

---

### Task 2: Document type metadata (TDD)

**Files:** `lib/doc-types.ts`, `lib/doc-types.test.ts`

- [ ] **Test**

```ts
import { describe, it, expect } from 'vitest'
import { DOC_META, BOOKING_DOC_TYPES, isBookingDocType } from './doc-types'

describe('doc types', () => {
  it('has bilingual titles', () => {
    expect(DOC_META.DP).toMatchObject({ th: 'ใบเสร็จรับเงินมัดจำ', en: 'DEPOSIT RECEIPT', recipient: 'customer', needsPayment: true })
    expect(DOC_META.RC).toMatchObject({ th: 'ใบเสร็จรับเงิน', en: 'RECEIPT', recipient: 'customer', needsPayment: true })
    expect(DOC_META.IV).toMatchObject({ th: 'ใบแจ้งหนี้', en: 'INVOICE', recipient: 'van', needsPayment: false })
    expect(DOC_META.CR).toMatchObject({ th: 'ใบเสร็จรับเงินค่านายหน้า', en: 'COMMISSION RECEIPT', recipient: 'van', needsPayment: true })
    expect(DOC_META.PV).toMatchObject({ th: 'ใบสำคัญจ่าย', en: 'PAYMENT VOUCHER' })
  })
  it('booking document types are DP RC IV CR in flow order', () => {
    expect(BOOKING_DOC_TYPES).toEqual(['DP', 'RC', 'IV', 'CR'])
    expect(isBookingDocType('RC')).toBe(true)
    expect(isBookingDocType('PV')).toBe(false)
    expect(isBookingDocType('xx')).toBe(false)
  })
})
```

- [ ] **Implement**

```ts
export type DocType = 'DP' | 'RC' | 'IV' | 'CR' | 'PV'
export type BookingDocType = Exclude<DocType, 'PV'>

type Meta = { th: string; en: string; short: string; recipient: 'customer' | 'van' | 'payee'; needsPayment: boolean; receivedFromLabel: string }

export const DOC_META: Record<DocType, Meta> = {
  DP: { th: 'ใบเสร็จรับเงินมัดจำ', en: 'DEPOSIT RECEIPT', short: 'ใบเสร็จมัดจำ', recipient: 'customer', needsPayment: true, receivedFromLabel: 'ได้รับเงินจาก / Received from' },
  RC: { th: 'ใบเสร็จรับเงิน', en: 'RECEIPT', short: 'ใบเสร็จยอดคงเหลือ', recipient: 'customer', needsPayment: true, receivedFromLabel: 'ได้รับเงินจาก / Received from' },
  IV: { th: 'ใบแจ้งหนี้', en: 'INVOICE', short: 'ใบแจ้งหนี้รถตู้', recipient: 'van', needsPayment: false, receivedFromLabel: 'เรียกเก็บจาก / Bill to' },
  CR: { th: 'ใบเสร็จรับเงินค่านายหน้า', en: 'COMMISSION RECEIPT', short: 'ใบเสร็จค่านายหน้า', recipient: 'van', needsPayment: true, receivedFromLabel: 'ได้รับเงินจาก / Received from' },
  PV: { th: 'ใบสำคัญจ่าย', en: 'PAYMENT VOUCHER', short: 'ใบสำคัญจ่าย', recipient: 'payee', needsPayment: true, receivedFromLabel: 'จ่ายให้ / Paid to' },
}

export const BOOKING_DOC_TYPES: BookingDocType[] = ['DP', 'RC', 'IV', 'CR']

export function isBookingDocType(v: unknown): v is BookingDocType {
  return typeof v === 'string' && (BOOKING_DOC_TYPES as string[]).includes(v)
}

export const PAYMENT_LABEL = { cash: 'เงินสด / Cash', transfer: 'โอนเงิน / Transfer' } as const
```

- [ ] **Commit** `feat: document type metadata`

---

### Task 3: Document flow — what can be issued next (TDD)

**Files:** `lib/doc-flow.ts`, `lib/doc-flow.test.ts`

Input: booking `{ status, commission, sale_price, hasVan }` and timeline docs `{ doc_type, status, total }[]` (from `booking_documents`). Output per type: `{ type, state: 'issued' | 'available' | 'blocked', reason?: string, docs }`.

Rules:
- Cancelled booking → everything not issued is `blocked` ('งานถูกยกเลิก').
- DP: available if no issued DP. (Multiple deposits are out of scope.)
- RC: available if no issued RC and booking not cancelled; allowed even without DP (customer paid everything at the end).
- IV: needs van ('ระบุรถตู้ก่อน'); available when no issued IV and `commission − depositHeld > 0`; if `≤ 0` → blocked 'มัดจำครอบคลุมค่านายหน้าแล้ว'.
- CR: needs an issued IV without an issued CR; else blocked 'ออกใบแจ้งหนี้ก่อน'.
- `depositHeld` = sum of issued DP totals.

- [ ] **Test**

```ts
import { describe, it, expect } from 'vitest'
import { docFlow, depositHeld } from './doc-flow'

const b = { status: 'booked' as const, commission: 2500, sale_price: 12500, hasVan: true }
const dp = { doc_type: 'DP' as const, status: 'issued' as const, total: 2500 }

const state = (flow: ReturnType<typeof docFlow>, t: string) => flow.find((s) => s.type === t)!

describe('docFlow', () => {
  it('fresh booking: DP and RC available, IV available (no deposit yet), CR blocked', () => {
    const f = docFlow(b, [])
    expect(state(f, 'DP').state).toBe('available')
    expect(state(f, 'RC').state).toBe('available')
    expect(state(f, 'IV').state).toBe('available')
    expect(state(f, 'CR')).toMatchObject({ state: 'blocked', reason: 'ออกใบแจ้งหนี้ก่อน' })
  })
  it('deposit equal to commission blocks IV', () => {
    const f = docFlow({ ...b, status: 'deposit_paid' }, [dp])
    expect(state(f, 'DP').state).toBe('issued')
    expect(state(f, 'IV')).toMatchObject({ state: 'blocked', reason: 'มัดจำครอบคลุมค่านายหน้าแล้ว' })
  })
  it('partial deposit leaves IV available', () => {
    expect(state(docFlow(b, [{ ...dp, total: 1000 }]), 'IV').state).toBe('available')
  })
  it('void documents do not count', () => {
    expect(state(docFlow(b, [{ ...dp, status: 'void' }]), 'DP').state).toBe('available')
  })
  it('IV and CR need a van', () => {
    const f = docFlow({ ...b, hasVan: false }, [])
    expect(state(f, 'IV')).toMatchObject({ state: 'blocked', reason: 'ระบุรถตู้ก่อน' })
  })
  it('CR available after IV', () => {
    const f = docFlow(b, [{ doc_type: 'IV', status: 'issued', total: 1500 }])
    expect(state(f, 'CR').state).toBe('available')
  })
  it('cancelled booking blocks everything not issued', () => {
    const f = docFlow({ ...b, status: 'cancelled' }, [dp])
    expect(state(f, 'DP').state).toBe('issued')
    expect(state(f, 'RC')).toMatchObject({ state: 'blocked', reason: 'งานถูกยกเลิก' })
  })
  it('depositHeld sums issued DPs only', () => {
    expect(depositHeld([dp, { ...dp, total: 500 }, { ...dp, status: 'void' }])).toBe(3000)
  })
})
```

- [ ] **Implement**

```ts
import { round2 } from './money'
import { BOOKING_DOC_TYPES, type BookingDocType, type DocType } from './doc-types'

export type TimelineDoc = { doc_type: DocType; status: 'issued' | 'void'; total: number }
export type FlowBooking = { status: 'booked' | 'deposit_paid' | 'completed' | 'cancelled'; commission: number; sale_price: number; hasVan: boolean }
export type FlowStep = { type: BookingDocType; state: 'issued' | 'available' | 'blocked'; reason?: string }

const issued = (docs: TimelineDoc[], t: DocType) => docs.filter((d) => d.doc_type === t && d.status === 'issued')

export function depositHeld(docs: TimelineDoc[]): number {
  return round2(issued(docs, 'DP').reduce((s, d) => s + Number(d.total), 0))
}

export function docFlow(b: FlowBooking, docs: TimelineDoc[]): FlowStep[] {
  return BOOKING_DOC_TYPES.map((type): FlowStep => {
    if (issued(docs, type).length > 0) return { type, state: 'issued' }
    if (b.status === 'cancelled') return { type, state: 'blocked', reason: 'งานถูกยกเลิก' }
    if (type === 'IV' || type === 'CR') {
      if (!b.hasVan) return { type, state: 'blocked', reason: 'ระบุรถตู้ก่อน' }
    }
    if (type === 'IV' && round2(b.commission - depositHeld(docs)) <= 0) {
      return { type, state: 'blocked', reason: 'มัดจำครอบคลุมค่านายหน้าแล้ว' }
    }
    if (type === 'CR' && issued(docs, 'IV').length === 0) return { type, state: 'blocked', reason: 'ออกใบแจ้งหนี้ก่อน' }
    return { type, state: 'available' }
  })
}
```

- [ ] **Commit** `feat: document flow rules`

---

### Task 4: Draft builder (TDD)

**Files:** `lib/doc-drafts.ts`, `lib/doc-drafts.test.ts`

`buildDraft(type, booking, docs, today)` returns `{ recipient: {name, phone, address}, items: [{description, qty, unit_price}], payment_method: 'transfer'|'cash'|null, due_date: string|null, ref_document_id: string|null }`.

- DP: recipient customer; item `มัดจำค่าบริการรถตู้ {route}` × 1 @ commission; payment 'transfer'.
- RC: recipient customer; item `ค่าบริการรถตู้ {route} (ยอดคงเหลือหลังหักมัดจำ)` × 1 @ `max(0, sale_price − depositHeld)`; `ref_document_id` = latest issued DP id or null; payment 'cash'.
- IV: recipient van owner; item `ค่านายหน้า {booking_no} {route}` @ `commission − depositHeld`; payment null; due_date today + 7 days (ISO).
- CR: recipient van owner; item `รับชำระค่านายหน้าตามใบแจ้งหนี้ {IV doc_no}` @ IV total; ref = IV id; payment 'transfer'.

- [ ] **Test**

```ts
import { describe, it, expect } from 'vitest'
import { buildDraft, addDays } from './doc-drafts'

const booking = { booking_no: 'BK-2609-0004', route: 'อุดรธานี → วังเวียง', customer_name: 'คุณวิภา', customer_phone: '081', commission: 2500, sale_price: 12500,
  van: { owner_name: 'คุณสมชาย', phone: '089' } }
const dp = { id: 'd1', doc_type: 'DP' as const, doc_no: 'DP-2609-0001', status: 'issued' as const, total: 2500 }

describe('buildDraft', () => {
  it('DP = commission to the customer', () => {
    const d = buildDraft('DP', booking, [], '2026-09-15')
    expect(d.recipient).toEqual({ name: 'คุณวิภา', phone: '081', address: '' })
    expect(d.items).toEqual([{ description: 'มัดจำค่าบริการรถตู้ อุดรธานี → วังเวียง', qty: 1, unit_price: 2500 }])
    expect(d.payment_method).toBe('transfer')
  })
  it('RC = sale price minus deposit, references the DP', () => {
    const d = buildDraft('RC', booking, [dp], '2026-09-15')
    expect(d.items[0].unit_price).toBe(10000)
    expect(d.ref_document_id).toBe('d1')
  })
  it('IV = commission minus deposit, due in 7 days, to the van owner', () => {
    const d = buildDraft('IV', booking, [{ ...dp, total: 1000 }], '2026-09-15')
    expect(d.recipient.name).toBe('คุณสมชาย')
    expect(d.items[0].unit_price).toBe(1500)
    expect(d.due_date).toBe('2026-09-22')
    expect(d.payment_method).toBeNull()
  })
  it('CR = IV total, references the IV', () => {
    const iv = { id: 'i1', doc_type: 'IV' as const, doc_no: 'IV-2609-0001', status: 'issued' as const, total: 1500 }
    const d = buildDraft('CR', booking, [iv], '2026-09-15')
    expect(d.items[0]).toMatchObject({ unit_price: 1500, description: 'รับชำระค่านายหน้าตามใบแจ้งหนี้ IV-2609-0001' })
    expect(d.ref_document_id).toBe('i1')
  })
  it('addDays handles month ends', () => {
    expect(addDays('2026-09-28', 7)).toBe('2026-10-05')
  })
})
```

- [ ] **Implement** (`lib/doc-drafts.ts`)

```ts
import { round2 } from './money'
import { depositHeld } from './doc-flow'
import type { BookingDocType, DocType } from './doc-types'

export type DraftDoc = { id: string; doc_type: DocType; doc_no: string; status: 'issued' | 'void'; total: number }
export type DraftBooking = { booking_no: string; route: string; customer_name: string; customer_phone: string; commission: number; sale_price: number; van: { owner_name: string; phone: string } | null }
export type DraftItem = { description: string; qty: number; unit_price: number }
export type Draft = { recipient: { name: string; phone: string; address: string }; items: DraftItem[]; payment_method: 'cash' | 'transfer' | null; due_date: string | null; ref_document_id: string | null }

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

const latest = (docs: DraftDoc[], t: DocType) => [...docs].reverse().find((d) => d.doc_type === t && d.status === 'issued') ?? null

export function buildDraft(type: BookingDocType, b: DraftBooking, docs: DraftDoc[], today: string): Draft {
  const customer = { name: b.customer_name, phone: b.customer_phone, address: '' }
  const van = { name: b.van?.owner_name ?? '', phone: b.van?.phone ?? '', address: '' }
  const held = depositHeld(docs)
  switch (type) {
    case 'DP':
      return { recipient: customer, items: [{ description: `มัดจำค่าบริการรถตู้ ${b.route}`, qty: 1, unit_price: round2(b.commission) }], payment_method: 'transfer', due_date: null, ref_document_id: null }
    case 'RC':
      return { recipient: customer, items: [{ description: `ค่าบริการรถตู้ ${b.route} (ยอดคงเหลือหลังหักมัดจำ)`, qty: 1, unit_price: Math.max(0, round2(b.sale_price - held)) }], payment_method: 'cash', due_date: null, ref_document_id: latest(docs, 'DP')?.id ?? null }
    case 'IV':
      return { recipient: van, items: [{ description: `ค่านายหน้า ${b.booking_no} ${b.route}`, qty: 1, unit_price: Math.max(0, round2(b.commission - held)) }], payment_method: null, due_date: addDays(today, 7), ref_document_id: null }
    case 'CR': {
      const iv = latest(docs, 'IV')
      return { recipient: van, items: [{ description: `รับชำระค่านายหน้าตามใบแจ้งหนี้ ${iv?.doc_no ?? ''}`.trim(), qty: 1, unit_price: round2(Number(iv?.total ?? 0)) }], payment_method: 'transfer', due_date: null, ref_document_id: iv?.id ?? null }
    }
  }
}
```

- [ ] **Commit** `feat: prefilled document drafts`

---

### Task 5: Validation for documents and settings (TDD)

**Files:** modify `lib/validation.ts`, `lib/validation.test.ts`

- `documentSchema` over the form fields: `doc_type` (DP|RC|IV|CR), `booking_id` uuid, `ref_document_id` uuid or '' → null, `recipient_name` required ≤200, `recipient_phone` ≤40, `recipient_address` ≤500, `payment_method` '' | 'cash' | 'transfer' → null when '', `due_date` optional valid date (reuse `optionalDate`), `notes` ≤500, `items` = JSON string parsed to an array (1–20) of `{ description: non-empty ≤300, qty: number > 0 ≤ 9999, unit_price: number ≥ 0 ≤ 99,999,999 }` (strip commas in numbers). Refinements: payment_method required for DP/RC/CR ('เลือกวิธีชำระเงิน'); IV requires due_date ('กำหนดวันครบกำหนดชำระ') and no payment method; total (Σ round2(qty×price)) must be > 0 ('ยอดรวมต้องมากกว่า 0').
- `settingsSchema`: `name_th`, `name_en` required; `address` ≤500, `tax_id` '' or 13 digits ('เลขผู้เสียภาษีต้องมี 13 หลัก'), `phone`, `bank_name`, `bank_account_no`, `bank_account_name` ≤100; `default_commission_pct` money-like 0–999.99.
- Tests: valid DP passes; DP without payment fails with the Thai message; IV without due date fails; items JSON invalid → error on `items`; zero total fails; tax id '123' fails, '' passes, '0105555555555' passes.
- **Commit** `feat: validation for documents and company settings`

---

### Task 6: Data access

**Files:** `lib/data/documents.ts` (server-only)

```ts
import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { isUuid } from '@/lib/uuid'
import type { DocType } from '@/lib/doc-types'

export async function getCompanySettings() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('company_settings').select('*').eq('id', 1).single()
  if (error) throw error
  return data
}

export async function getBookingTimeline(bookingId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('booking_documents', { p_booking_id: bookingId })
  if (error) throw error
  return (data ?? []).map((d) => ({ ...d, total: Number(d.total) }))
}

export async function getDocument(id: string) {
  if (!isUuid(id)) return null
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('documents')
    .select('*, document_items(*), bookings(booking_no, route, trip_start, trip_end, sale_price, commission, van_price), ref:ref_document_id(doc_no, total), issuer:issued_by(full_name)')
    .eq('id', id)
    .order('line_no', { referencedTable: 'document_items' })
    .maybeSingle()
  if (error) throw error
  return data
}

export async function listDocuments({ type, q }: { type?: DocType; q?: string }) {
  const supabase = await createClient()
  let query = supabase.from('documents')
    .select('id, doc_type, doc_no, issue_date, recipient_name, total, status, bookings(booking_no)')
    .order('created_at', { ascending: false }).limit(50)
  if (type) query = query.eq('doc_type', type)
  // q: doc_no or recipient_name (escapeLike from lib/search.ts)
  ...
}
```

Adapt the embedded-select syntax for the self-reference (`ref:documents!ref_document_id(doc_no,total)`) and the staff join (`issuer:staff!issued_by(full_name)`) to what PostgREST/generated types accept — verify with `npm run build`; if typed embedding is awkward, fetch the ref doc and issuer in separate queries. RLS: staff see only their own documents (a staff member opening someone else's document gets `null` → `notFound()`); admins see all.

- **Commit** `feat(documents): data access`

---

### Task 7: Document sheet (A4 template) + print CSS

**Files:** `components/document-sheet.tsx`, `components/print-button.tsx`, `app/globals.css`, `app/layout.tsx` (add Sarabun font variable `--font-doc`)

`DocumentSheet` props: `{ type, docNo | null (preview shows 'ตัวอย่าง / PREVIEW'), issueDate, company, recipient, booking {booking_no, route, trip_start, trip_end} | null, items, total, paymentMethod, dueDate, notes, extra: { salePrice?, depositNo?, depositTotal?, refDocNo? }, issuerName, void?: { reason } }`.

Layout (A4 portrait, 210×297mm, 14mm margins, font Sarabun 11pt, color #1E2A22 on #FFFDF7, 6px green top border):
- Header row: left = logo emblem (`/logo-mark.png`) + company `name_th` bold green + `name_en` + address / โทร / เลขผู้เสียภาษี (only lines that are filled); right = Thai title (green, 18pt bold) + English title (gold, letter-spaced 10pt) + `เลขที่ / No.` mono + `วันที่ / Date` (formatThaiDate). Gold 2px rule below.
- Recipient block: `DOC_META[type].receivedFromLabel` + name, phone, address; right side `อ้างอิงงาน / Booking` booking_no, route, trip dates.
- Items table: header row green background white text — `ลำดับ / No.`, `รายการ / Description`, `จำนวน / Qty`, `ราคา / Unit price`, `จำนวนเงิน / Amount`; numbers right-aligned tabular.
- RC extra rows under the table: `ราคาค่าบริการทั้งหมด` sale price, `หักมัดจำ {depositNo}` −depositTotal, then total. IV: `กำหนดชำระ / Due date` and HUGLAO bank account block (bank_name, bank_account_no, bank_account_name; if empty show 'โปรดติดต่อบริษัทเพื่อรับเลขบัญชี'). DP/RC: note line 'ยอดคงเหลือชำระให้ผู้ให้บริการรถตู้โดยตรง' on DP; RC shows 'ชำระให้ผู้ให้บริการรถตู้โดยตรง' under payment.
- Total bar: ivory-gold `#F6EFD9` background: left `({bahtText(total)})`, right `รวม / Total ฿…`.
- Payment: `ชำระโดย / Paid by` ☑ เงินสด ☐ โอน (checked per paymentMethod) — omit for IV.
- Signatures: two lines — left `ผู้รับเงิน / Received by` with issuer name under it; right `ผู้จ่ายเงิน / Paid by` (IV: `ผู้วางบิล / Issued by` and `ผู้รับวางบิล / Acknowledged by`).
- Void: absolutely positioned rotated red text `ยกเลิก / VOID` 72pt at 25% opacity + reason line.
- Footer small muted: `ออกโดยระบบ HUGLAO Back Office`.

Print CSS in `globals.css`:

```css
@media print {
  @page { size: A4; margin: 0; }
  body { background: #fff !important; }
  .no-print, nav, header.app-header { display: none !important; }
  .print-area { box-shadow: none !important; margin: 0 !important; }
}
.doc-sheet { width: 210mm; min-height: 297mm; padding: 14mm; background: #FFFDF7; color: #1E2A22; font-family: var(--font-doc), 'Sarabun', Tahoma, sans-serif; font-size: 11pt; line-height: 1.5; }
```

On screen the sheet sits in a horizontally scrollable wrapper scaled to fit (`transform: scale()` via container query or simply `max-width: 100%; overflow-x: auto`). Mark the app layout's mobile header and sidebars with `no-print` (modify `app/(app)/layout.tsx`, `components/sidebar.tsx`, `components/mobile-nav.tsx`).

`PrintButton`: client component `<button className="btn btn-primary no-print" onClick={() => window.print()}>พิมพ์ / บันทึกเป็น PDF</button>`.

- Verify build/lint; commit `feat(documents): A4 bilingual document template and print styles`

---

### Task 8: Issue form + server action

**Files:** `components/line-items-editor.tsx`, `components/document-form.tsx`, `app/(app)/bookings/[id]/documents/new/page.tsx`, `app/(app)/bookings/[id]/documents/actions.ts`

- Page (server): `await params`, `await searchParams`; `type` must satisfy `isBookingDocType` else `notFound()`; load booking (`getBooking`), van (booking.vans), timeline (`getBookingTimeline`), company settings; compute `docFlow` — if the step isn't `available`, render a glass panel with the reason and a back link. Otherwise `buildDraft(type, …, today in Asia/Bangkok)` and render `<DocumentForm>` with booking summary on top (booking_no, customer, route, sale/commission).
- `LineItemsEditor` (client): rows with description (text), qty (number), unit price (money input, commas allowed), amount (computed, read-only), remove button; "+ เพิ่มรายการ" (max 20); shows total and `bahtText`; serializes to a hidden input `items` as JSON `[{description, qty, unit_price}]`.
- `DocumentForm` (client, `useActionState(issueDocument)`): hidden `doc_type`, `booking_id`, `ref_document_id`; recipient name/phone/address (prefilled, editable); `LineItemsEditor`; payment method radio chips (DP/RC/CR); due date (IV); notes; buttons "ดูตัวอย่าง" (toggles a `DocumentSheet` preview with `docNo=null` below the form — scrolls into view) and primary "ยืนยันออกเอกสาร" (disabled while pending). Confirm step: first click shows inline "ออกเอกสารแล้วแก้ไขไม่ได้ — ยืนยัน?" with confirm/cancel (no window.confirm). Keep typed values on error (`state.values`, items JSON).
- Action `issueDocument(prev, fd)`: parse `documentSchema`; `supabase.rpc('issue_document', { p_doc_type, p_booking_id, p_ref_document_id, p_recipient_name, p_recipient_phone, p_recipient_address, p_payment_method, p_due_date, p_category: null, p_notes, p_items })`; map DB errors to Thai (`booking cancelled` → 'งานนี้ถูกยกเลิกแล้ว', `invalid reference document` → 'เอกสารอ้างอิงไม่ถูกต้อง', `payment method` → 'เลือกวิธีชำระเงิน', `due date` → 'กำหนดวันครบกำหนดชำระ', default 'ออกเอกสารไม่สำเร็จ กรุณาลองใหม่') — put the mapping in `lib/document-errors.ts` with tests; on success `revalidatePath('/bookings/'+id)`, `revalidatePath('/documents')`, `redirect('/documents/'+doc.id)`.
- Commit `feat(documents): issue form with preview`

---

### Task 9: Documents list + printable page

**Files:** `app/(app)/documents/page.tsx`, `app/(app)/documents/[id]/page.tsx`

- List: PageHeader "เอกสาร"; chips filter by type (ทั้งหมด / DP / RC / IV / CR) using `DOC_META[t].short`; SearchBox (doc no or recipient); rows: type code pill (font-mono), `doc_no`, recipient, booking_no, formatThaiDate(issue_date), total (`formatBaht`), `ยกเลิก` pill when void. Staff see their own, admins all (RLS) — add a muted note for staff: 'แสดงเฉพาะเอกสารที่คุณออก'.
- Detail: `getDocument` → `notFound()` if null; toolbar (no-print): back link to booking, `PrintButton`; then `<div className="print-area">` with `DocumentSheet` fed from the stored document (recipient snapshot, items, total, payment, due date, notes, company settings **current values**, issuer name, RC extras from booking sale_price and ref DP, void state).
- Remove `soon: true` from `/documents` in `lib/nav.ts` (+ tests).
- Commit `feat(documents): list and printable document page`

---

### Task 10: Booking timeline with issue buttons

**Files:** `app/(app)/bookings/[id]/page.tsx`, delete `lib/booking-timeline.ts` (+test) if superseded

- Replace the timeline with `docFlow(booking, timeline)`: each row shows `DOC_META[type].short`; issued → doc_no (link to `/documents/{id}` — the page itself returns 404 for staff who can't read another staff's doc, so show the number as plain text when `issued_by !== currentStaff.id` and user is not admin) + total; available → primary small button `ออกใบ` linking to `/bookings/{id}/documents/new?type=XX`; blocked → muted reason. Remove the "การออกเอกสารจะเปิดใช้ในเวอร์ชันถัดไป" note.
- Commit `feat(bookings): issue documents from the booking timeline`

---

### Task 11: Company settings (admin)

**Files:** `app/(app)/admin/settings/page.tsx`, `app/(app)/admin/settings/actions.ts`, `components/settings-form.tsx`

- Page: `getCurrentStaff()`; non-admin → `notFound()`. Form (solid glass) fields: ชื่อบริษัท (ไทย), ชื่อบริษัท (อังกฤษ), ที่อยู่ (textarea), เลขผู้เสียภาษี (inputMode numeric), เบอร์โทร, ธนาคาร, เลขบัญชี, ชื่อบัญชี, ค่านายหน้าเริ่มต้น %. Keep values on error; "บันทึกแล้ว" on success (hide when dirty) — same pattern as VanForm.
- Action: admin check again server-side (`getCurrentStaff().role === 'admin'` else error), `settingsSchema`, `update company_settings ... where id = 1` with `.select('id')` no-op detection, `revalidatePath('/admin/settings')`.
- Remove `soon: true` from `/admin/settings` in nav (+tests). `/admin/staff` stays soon (Plan 4).
- Commit `feat(admin): company settings`

---

### Task 12: Ship and verify

- [ ] `npm run build && npm test && npm run lint`; `git push`.
- [ ] Browser acceptance (controller, on app.huglao.com with the owner logged in, test data prefixed "ทดสอบ"):
  1. Settings: admin opens ตั้งค่าบริษัท → values seeded (ฮักลาว กรุ๊ป, phone) → add a test address → saved.
  2. New booking ทดสอบ with van, van price 10,000 → timeline: DP/RC/IV available, CR blocked.
  3. Issue DP: form prefilled 2,500, preview shows sheet with "ตัวอย่าง", confirm → `DP-2609-0001` page; booking status มัดจำแล้ว; IV now blocked "มัดจำครอบคลุมค่านายหน้าแล้ว".
  4. Print preview (Ctrl+P) shows only the A4 sheet.
  5. Issue RC → 10,000, shows sale 12,500 − deposit DP-2609-0001 2,500; booking จบทริป.
  6. Documents list shows both; filter RC works.
  7. Mobile width: form usable, sheet scrolls horizontally.
- [ ] `git tag plan-3-documents && git push --tags`

## Self-review

- Spec coverage: DP/RC/IV/CR issue flow with prefill + preview + confirm (T3–T8), bilingual A4 brand template with amount in words, VOID watermark, payment method, due date + bank for IV, signatures (T7), document list/detail/print (T9), booking timeline integration (T10), company settings editable by admin (T11), print-to-PDF decision (spec updated 2026-09-15). Voiding UI and PV vouchers are Plan 4; the DB side of void rollback lands here (T1).
- Names consistent: `DOC_META`, `BOOKING_DOC_TYPES`, `isBookingDocType`, `docFlow`, `depositHeld`, `buildDraft`, `addDays`, `documentSchema`, `settingsSchema`, `getBookingTimeline`, `getDocument`, `listDocuments`, `getCompanySettings`, `DocumentSheet`, `PrintButton`, `LineItemsEditor`, `DocumentForm`, `issueDocument`.
