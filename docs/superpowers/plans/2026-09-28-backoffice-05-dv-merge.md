# DV Merge & Document Template Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge the deposit receipt (`DP`) and balance invoice (`IV`) into one document type (`DV`), cutting the booking flow from 4 documents to 3 (`DV → RC → PV`), and redesign the printed sheet with a bilingual name, dashed phone numbers, passenger count, pickup time, and a per-line-item detail note.

**Architecture:** Additive Postgres migration (new enum value + columns, updated RPCs) in the `huglao-app` repo, followed by changes that ripple outward from the pure `lib/*.ts` logic (TDD, `vitest`) to the shared `DocumentSheet`/`LineItemsEditor` components and finally the pages/actions that wire them together. No new abstractions — every file already has a clear single job; this plan keeps that shape.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Supabase (Postgres + RLS), Zod 4, Vitest.

**Spec:** `docs/superpowers/specs/2026-09-28-document-flow-redesign-design.md` (this repo).

**Working directory for every step below:** `C:\Users\Makawat_PC\Documents\Code\huglao-app`

---

## File structure

| File | Responsibility |
|---|---|
| `supabase/migrations/20260928000000_dv_columns.sql` | New `DV` enum value + new columns (its own transaction — Postgres won't let a new enum value be used in the transaction that creates it) |
| `supabase/migrations/20260928000001_dv_functions.sql` | `issue_document`, `void_document`, `dashboard_stats` updated for `DV` |
| `lib/database.types.ts` | Hand-updated to mirror the new schema (no live DB access during this plan; matches Supabase's generator output) |
| `lib/money.ts` | New `formatPhone()` |
| `lib/doc-types.ts` | `DV` replaces `DP`+`IV` in the booking flow |
| `lib/doc-flow.ts` | Flow/availability logic, now 2 steps instead of 3 |
| `lib/doc-drafts.ts` | Draft item/recipient builder, `DV` instead of `DP`/`IV` |
| `lib/validation.ts` | `bookingSchema` (`customer_name_en`, `pickup_time`), `documentSchema` (`DV`, `recipient_name_en`, item `detail`) |
| `lib/data/documents.ts` | `getDocument`'s booking sub-select gains `passengers`, `pickup_time` |
| `components/line-items-editor.tsx` | Per-row optional `detail` field |
| `components/document-sheet.tsx` | The printed sheet: bilingual name, dashed phones, booking box, item detail, `DV` layout |
| `components/document-form.tsx` | `recipient_name_en` field, preview wiring |
| `components/voucher-form.tsx` | Carries item `detail` through on error-restore |
| `components/customer-fields.tsx` | `customer_name_en` field |
| `components/booking-form.tsx` | `pickup_time` field |
| `app/(app)/bookings/new/page.tsx`, `.../[id]/edit/page.tsx` | Initial values for the two new booking fields |
| `app/(app)/bookings/[id]/documents/new/page.tsx`, `.../documents/actions.ts` | Draft/RPC wiring for `DV` and `recipient_name_en` |
| `app/(app)/vouchers/actions.ts`, `app/(app)/vouchers/new/page.tsx` | RPC wiring (`p_recipient_name_en`), item `detail` default |
| `app/(app)/documents/[id]/page.tsx` | Issued-document render: `recipient_name_en`, item `detail`, booking box, `DV` extra |

No changes needed (verified, not a task): `app/(app)/documents/page.tsx`, `app/(app)/bookings/[id]/page.tsx`, `app/(app)/bookings/actions.ts` — all three are already driven by `DOC_META`/`BOOKING_DOC_TYPES` or spread `parsed.data` directly, so they pick up `DV` and the new booking fields with no code change.

---

### Task 1: Migration — enum value and new columns

**Files:**
- Create: `supabase/migrations/20260928000000_dv_columns.sql`

- [ ] **Step 1: Write the migration**

```sql
-- 2026-09-28: merge DP (deposit receipt) + IV (balance invoice) into one document, DV,
-- issued once at deposit time showing full price / deposit paid / balance due.
-- Also adds a bilingual customer name, a free-text detail per line item, and a pickup
-- time for the trip. DP and IV stay in the doc_type enum so old test rows keep rendering;
-- the app just never issues them again (see 20260928000001_dv_functions.sql).
--
-- This is its own migration because Postgres will not let a new enum value be used in
-- the same transaction that adds it — the functions that reference 'DV' go in the next file.

alter type doc_type add value 'DV';

alter table documents add column recipient_name_en text not null default '';
alter table document_items add column detail text not null default '';
alter table bookings add column customer_name_en text not null default '';
alter table bookings add column pickup_time time;
```

- [ ] **Step 2: Commit (do not push yet — see Task 22)**

```bash
git add supabase/migrations/20260928000000_dv_columns.sql
git commit -m "feat(db): add DV doc type and bilingual/detail/pickup-time columns"
```

---

### Task 2: Migration — `issue_document`, `void_document`, `dashboard_stats` for `DV`

**Files:**
- Create: `supabase/migrations/20260928000001_dv_functions.sql`

- [ ] **Step 1: Write the migration**

```sql
-- 2026-09-28: point the document RPCs at DV instead of DP/IV (see 20260928000000_dv_columns.sql).

create or replace function issue_document(
  p_doc_type doc_type,
  p_booking_id uuid,
  p_ref_document_id uuid,
  p_recipient_name text,
  p_recipient_name_en text,
  p_recipient_phone text,
  p_recipient_address text,
  p_payment_method text,
  p_due_date date,
  p_category text,
  p_notes text,
  p_items jsonb
) returns documents
language plpgsql security definer set search_path = public as $$
declare
  v_doc documents;
  v_total numeric(12,2);
  v_item jsonb;
  v_line integer := 0;
  v_booking_status booking_status;
  v_ref documents;
begin
  if not is_active_staff() then raise exception 'not allowed'; end if;
  if p_doc_type in ('CR', 'DP', 'IV') then raise exception '% retired', p_doc_type; end if;
  if coalesce(trim(p_recipient_name), '') = '' then raise exception 'recipient required'; end if;
  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'at least one item required';
  end if;
  if p_doc_type <> 'PV' and p_booking_id is null then raise exception 'booking required'; end if;

  if p_booking_id is not null then
    select status into v_booking_status from bookings where id = p_booking_id;
    if not found then raise exception 'booking not found'; end if;
    if v_booking_status = 'cancelled' then raise exception 'booking cancelled'; end if;
  end if;

  -- Only an RC may reference a document (its DV).
  if p_ref_document_id is not null then
    if p_doc_type <> 'RC' then raise exception 'invalid reference document'; end if;
    select * into v_ref from documents
    where id = p_ref_document_id
      and doc_type = 'DV'
      and status = 'issued'
      and booking_id is not distinct from p_booking_id
      and (is_admin() or issued_by = auth.uid());
    if not found then raise exception 'invalid reference document'; end if;
  end if;

  if p_doc_type = 'PV' and coalesce(trim(p_category), '') = '' then
    raise exception 'category required';
  end if;

  if p_payment_method is null or p_payment_method not in ('cash', 'transfer') then
    raise exception 'payment method required';
  end if;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_line := v_line + 1;
    if coalesce(trim(v_item->>'description'), '') = '' then
      raise exception 'item % description required', v_line;
    end if;
    if coalesce(jsonb_typeof(v_item->'qty'), '') <> 'number'
       or coalesce(jsonb_typeof(v_item->'unit_price'), '') <> 'number'
       or (v_item->>'qty')::numeric <= 0 or (v_item->>'unit_price')::numeric < 0 then
      raise exception 'item % invalid qty or unit_price', v_line;
    end if;
  end loop;
  v_line := 0;

  select coalesce(sum(round((i->>'qty')::numeric * (i->>'unit_price')::numeric, 2)), 0)
    into v_total from jsonb_array_elements(p_items) i;

  insert into documents (doc_type, doc_no, booking_id, ref_document_id, recipient_name, recipient_name_en,
    recipient_phone, recipient_address, total, payment_method, due_date, category, notes, issued_by)
  values (p_doc_type, next_doc_no(p_doc_type::text), p_booking_id, p_ref_document_id,
    trim(p_recipient_name), coalesce(p_recipient_name_en, ''), coalesce(p_recipient_phone, ''), coalesce(p_recipient_address, ''),
    v_total, p_payment_method, p_due_date, p_category, coalesce(p_notes, ''), auth.uid())
  returning * into v_doc;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_line := v_line + 1;
    insert into document_items (document_id, line_no, description, detail, qty, unit_price, amount)
    values (v_doc.id, v_line, trim(v_item->>'description'), coalesce(v_item->>'detail', ''),
      (v_item->>'qty')::numeric, (v_item->>'unit_price')::numeric,
      round((v_item->>'qty')::numeric * (v_item->>'unit_price')::numeric, 2));
  end loop;

  if p_doc_type = 'DV' then
    update bookings set status = 'deposit_paid' where id = p_booking_id and status = 'booked';
  elsif p_doc_type = 'RC' then
    update bookings set status = 'completed' where id = p_booking_id and status <> 'cancelled';
  end if;

  return v_doc;
end $$;

-- Void order: RC before DV (was DP), CR before IV (dead code — CR/IV are retired,
-- left untouched so this migration only changes what actually needs to change).
create or replace function void_document(p_document_id uuid, p_reason text) returns documents
language plpgsql security definer set search_path = public as $$
declare v_doc documents; v_target documents;
begin
  if not is_admin() then raise exception 'admin only'; end if;
  if coalesce(trim(p_reason), '') = '' then raise exception 'reason required'; end if;

  select * into v_target from documents where id = p_document_id for update;
  if v_target.id is null or v_target.status <> 'issued' then raise exception 'document not found or already void'; end if;
  if v_target.doc_type = 'DV' and exists (
       select 1 from documents where booking_id = v_target.booking_id and doc_type = 'RC' and status = 'issued') then
    raise exception 'void RC first';
  end if;
  if v_target.doc_type = 'IV' and exists (
       select 1 from documents where ref_document_id = v_target.id and doc_type = 'CR' and status = 'issued') then
    raise exception 'void CR first';
  end if;

  update documents set status = 'void', void_reason = trim(p_reason), voided_by = auth.uid(), voided_at = now()
   where id = p_document_id and status = 'issued'
   returning * into v_doc;
  if v_doc.id is null then raise exception 'document not found or already void'; end if;

  if v_doc.doc_type = 'RC' and not exists (
       select 1 from documents where booking_id = v_doc.booking_id and doc_type = 'RC' and status = 'issued') then
    update bookings set status = case when exists (
        select 1 from documents where booking_id = v_doc.booking_id and doc_type = 'DV' and status = 'issued')
      then 'deposit_paid'::booking_status else 'booked'::booking_status end
     where id = v_doc.booking_id and status = 'completed';
  elsif v_doc.doc_type = 'DV' and not exists (
       select 1 from documents where booking_id = v_doc.booking_id and doc_type = 'DV' and status = 'issued') then
    update bookings set status = 'booked' where id = v_doc.booking_id and status = 'deposit_paid';
  end if;
  return v_doc;
end $$;

-- Dashboard revenue: DV + RC instead of DP + RC.
create or replace function dashboard_stats(p_month_start date, p_month_end date)
returns table (awaiting_deposit int, awaiting_completion int, trips_next_7_days int,
               revenue_month numeric, van_cost_month numeric, expenses_month numeric, bookings_month int)
language sql stable security definer set search_path = public as $$
  select
    (select count(*)::int from bookings where status = 'booked'),
    (select count(*)::int from bookings where status = 'deposit_paid'),
    (select count(*)::int from bookings where status in ('booked','deposit_paid')
        and trip_start between (now() at time zone 'Asia/Bangkok')::date and (now() at time zone 'Asia/Bangkok')::date + 7),
    (select coalesce(sum(total),0) from documents where doc_type in ('DV','RC') and status = 'issued' and issue_date between p_month_start and p_month_end),
    (select coalesce(sum(total),0) from documents where doc_type = 'PV' and category = 'ค่าจ้างรถตู้' and status = 'issued' and issue_date between p_month_start and p_month_end),
    (select coalesce(sum(total),0) from documents where doc_type = 'PV' and category is distinct from 'ค่าจ้างรถตู้' and status = 'issued' and issue_date between p_month_start and p_month_end),
    (select count(*)::int from bookings where (created_at at time zone 'Asia/Bangkok')::date between p_month_start and p_month_end)
  where is_active_staff()
$$;
```

- [ ] **Step 2: Commit**

```bash
git add supabase/migrations/20260928000001_dv_functions.sql
git commit -m "feat(db): route issue_document/void_document/dashboard_stats through DV"
```

---

### Task 3: Update `lib/database.types.ts` to match the new schema

This file is normally generated by the Supabase CLI. Since applying the migration to the live project is the owner's step (see Task 22), hand-edit it now so the rest of this plan type-checks; regenerate for real once the owner has run `db push`, and if the generator's output differs cosmetically from this hand edit, that's expected and fine.

**Files:**
- Modify: `lib/database.types.ts`

- [ ] **Step 1: `bookings` — add `customer_name_en` and `pickup_time` to `Row`/`Insert`/`Update`**

In the `bookings.Row` block (around line 17), add after `created_by: string`:

```ts
          created_by: string
          customer_name_en: string
```

In `bookings.Row`, add after `passengers: number | null`:

```ts
          passengers: number | null
          pickup_time: string | null
```

Mirror both additions into `bookings.Insert` and `bookings.Update`, but optional (the column has a default/is nullable):

```ts
          customer_name_en?: string
```
```ts
          pickup_time?: string | null
```

- [ ] **Step 2: `document_items` — add `detail`**

In `document_items.Row` (around line 192), add after `description: string`:

```ts
          detail: string
```

In `document_items.Insert` and `document_items.Update`, add the optional form:

```ts
          detail?: string
```

- [ ] **Step 3: `documents` — add `recipient_name_en`**

In `documents.Row` (around line 230), add after `recipient_name: string`:

```ts
          recipient_name_en: string
```

In `documents.Insert` and `documents.Update`, add:

```ts
          recipient_name_en?: string
```

- [ ] **Step 4: `Functions.issue_document` — new arg and return field**

In `issue_document.Args`, add after `p_recipient_name: string`:

```ts
          p_recipient_name_en: string
```

In `issue_document.Returns`, add after `recipient_name: string`:

```ts
          recipient_name_en: string
```

- [ ] **Step 5: `Functions.void_document` — return field**

In `void_document.Returns`, add after `recipient_name: string`:

```ts
          recipient_name_en: string
```

- [ ] **Step 6: `Enums.doc_type` and `Constants.public.Enums.doc_type` — add `"DV"`**

```ts
      doc_type: "DP" | "RC" | "IV" | "CR" | "PV" | "DV"
```

```ts
      doc_type: ["DP", "RC", "IV", "CR", "PV", "DV"],
```

- [ ] **Step 7: Run the TypeScript compiler to confirm no other type is now inconsistent**

```bash
npx tsc --noEmit
```

Expected: still reports errors in files this plan hasn't touched yet (e.g. `lib/doc-types.ts` using `'DP' | 'IV' | 'RC'`) — that's expected at this point in the plan. Confirm there are no errors specifically about `lib/database.types.ts` itself.

- [ ] **Step 8: Commit**

```bash
git add lib/database.types.ts
git commit -m "chore(types): hand-sync database types with the DV migration"
```

---

### Task 4: `formatPhone()` in `lib/money.ts` (TDD)

**Files:**
- Modify: `lib/money.ts`
- Test: `lib/money.test.ts`

- [ ] **Step 1: Write the failing tests**

Add to `lib/money.test.ts`:

```ts
describe('formatPhone', () => {
  it('formats a 10-digit mobile number as 0XX-XXX-XXXX', () => {
    expect(formatPhone('0818232734')).toBe('081-823-2734')
  })
  it('formats a 9-digit landline number as 0X-XXX-XXXX', () => {
    expect(formatPhone('021234567')).toBe('02-123-4567')
  })
  it('is idempotent on an already-dashed number', () => {
    expect(formatPhone('095-596-2525')).toBe('095-596-2525')
  })
  it('strips spaces before formatting', () => {
    expect(formatPhone('081 823 2734')).toBe('081-823-2734')
  })
  it('returns an empty string unchanged', () => {
    expect(formatPhone('')).toBe('')
  })
  it('returns anything that is not 9-10 digits starting with 0 unchanged', () => {
    expect(formatPhone('12345')).toBe('12345')
    expect(formatPhone('+66818232734')).toBe('+66818232734')
  })
})
```

Update the import line at the top of `lib/money.test.ts`:

```ts
import { round2, calcPricing, bahtText, formatAmount, formatThaiDate, formatPhone } from './money'
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
npx vitest run lib/money.test.ts
```

Expected: FAIL — `formatPhone` is not exported from `./money`.

- [ ] **Step 3: Implement `formatPhone`**

Add to `lib/money.ts`, after `formatThaiDate`:

```ts
// Renders a Thai phone number with dashes for display, e.g. '0818232734' -> '081-823-2734'.
// Strips existing punctuation first so it's safe to call on already-formatted numbers
// (company.phone is stored as '095-596-2525'). Anything that isn't 9-10 digits starting
// with 0 is returned unchanged rather than guessed at.
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10 && digits.startsWith('0')) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  if (digits.length === 9 && digits.startsWith('0')) {
    return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`
  }
  return raw
}
```

- [ ] **Step 4: Run the tests to verify they pass**

```bash
npx vitest run lib/money.test.ts
```

Expected: PASS, all tests including the new `formatPhone` block.

- [ ] **Step 5: Commit**

```bash
git add lib/money.ts lib/money.test.ts
git commit -m "feat(money): add formatPhone for dashed Thai phone numbers"
```

---

### Task 5: `DV` in `lib/doc-types.ts` (TDD)

**Files:**
- Modify: `lib/doc-types.ts`
- Test: `lib/doc-types.test.ts`

- [ ] **Step 1: Write the failing test**

Replace the contents of `lib/doc-types.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { DOC_META, BOOKING_DOC_TYPES, isBookingDocType, asPaymentMethod } from './doc-types'

describe('doc types', () => {
  it('has bilingual titles', () => {
    expect(DOC_META.DV).toMatchObject({ th: 'ใบแจ้งหนี้ / ใบรับเงินมัดจำ', en: 'INVOICE / DEPOSIT RECEIPT', recipient: 'customer', needsPayment: true })
    expect(DOC_META.RC).toMatchObject({ th: 'ใบเสร็จรับเงิน', en: 'RECEIPT', recipient: 'customer', needsPayment: true })
    expect(DOC_META.PV).toMatchObject({ th: 'ใบสำคัญจ่าย', en: 'PAYMENT VOUCHER' })
  })
  it('booking document types are DV then RC in flow order (DP, IV, CR retired)', () => {
    expect(BOOKING_DOC_TYPES).toEqual(['DV', 'RC'])
    expect(isBookingDocType('DV')).toBe(true)
    expect(isBookingDocType('RC')).toBe(true)
    expect(isBookingDocType('DP')).toBe(false)
    expect(isBookingDocType('IV')).toBe(false)
    expect(isBookingDocType('CR')).toBe(false)
    expect(isBookingDocType('PV')).toBe(false)
    expect(isBookingDocType('xx')).toBe(false)
  })
  it('asPaymentMethod accepts only known methods', () => {
    expect(asPaymentMethod('offset')).toBe('offset')
    expect(asPaymentMethod('cash')).toBe('cash')
    expect(asPaymentMethod('')).toBeNull()
    expect(asPaymentMethod(null)).toBeNull()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npx vitest run lib/doc-types.test.ts
```

Expected: FAIL — `DOC_META.DV` is undefined, `BOOKING_DOC_TYPES` is still `['DP','IV','RC']`.

- [ ] **Step 3: Replace `lib/doc-types.ts`**

```ts
export type DocType = 'DV' | 'RC' | 'DP' | 'IV' | 'CR' | 'PV'
// DP and IV are retired (merged into DV, owner decision 2026-09-28); CR was retired earlier.
// All three stay in the union/meta so old rows still render if looked up directly.
export type BookingDocType = 'DV' | 'RC'

type Meta = { th: string; en: string; short: string; recipient: 'customer' | 'van' | 'payee'; needsPayment: boolean; receivedFromLabel: string }

export const DOC_META: Record<DocType, Meta> = {
  DV: { th: 'ใบแจ้งหนี้ / ใบรับเงินมัดจำ', en: 'INVOICE / DEPOSIT RECEIPT', short: 'ใบแจ้งหนี้มัดจำ', recipient: 'customer', needsPayment: true, receivedFromLabel: 'ได้รับเงินจาก / Received from' },
  RC: { th: 'ใบเสร็จรับเงิน', en: 'RECEIPT', short: 'ใบเสร็จยอดคงเหลือ', recipient: 'customer', needsPayment: true, receivedFromLabel: 'ได้รับเงินจาก / Received from' },
  DP: { th: 'ใบเสร็จรับเงินมัดจำ', en: 'DEPOSIT RECEIPT', short: 'ใบเสร็จมัดจำ', recipient: 'customer', needsPayment: true, receivedFromLabel: 'ได้รับเงินจาก / Received from' },
  IV: { th: 'ใบแจ้งหนี้', en: 'INVOICE', short: 'ใบแจ้งหนี้', recipient: 'customer', needsPayment: false, receivedFromLabel: 'เรียกเก็บจาก / Bill to' },
  CR: { th: 'ใบเสร็จรับเงินค่านายหน้า', en: 'COMMISSION RECEIPT', short: 'ใบเสร็จค่านายหน้า', recipient: 'van', needsPayment: true, receivedFromLabel: 'ได้รับเงินจาก / Received from' },
  PV: { th: 'ใบสำคัญจ่าย', en: 'PAYMENT VOUCHER', short: 'ใบสำคัญจ่าย', recipient: 'payee', needsPayment: true, receivedFromLabel: 'จ่ายให้ / Paid to' },
}

// Flow order on a booking: deposit + invoice combined, then the balance receipt.
export const BOOKING_DOC_TYPES: BookingDocType[] = ['DV', 'RC']

export function isBookingDocType(v: unknown): v is BookingDocType {
  return typeof v === 'string' && (BOOKING_DOC_TYPES as string[]).includes(v)
}

export type PaymentMethod = 'cash' | 'transfer' | 'offset'

// 'offset' is for PVs only: the van hire is settled against money the van collected for the company.
export const PAYMENT_LABEL: Record<PaymentMethod, string> = { cash: 'เงินสด / Cash', transfer: 'โอนเงิน / Transfer', offset: 'หักกลบ / Offset' }

export function asPaymentMethod(v: unknown): PaymentMethod | null {
  return v === 'cash' || v === 'transfer' || v === 'offset' ? v : null
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx vitest run lib/doc-types.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/doc-types.ts lib/doc-types.test.ts
git commit -m "feat(doc-types): DV replaces DP+IV in the booking flow"
```

---

### Task 6: `DV` in `lib/doc-flow.ts` (TDD)

**Files:**
- Modify: `lib/doc-flow.ts`
- Test: `lib/doc-flow.test.ts`

- [ ] **Step 1: Write the failing test**

Replace the contents of `lib/doc-flow.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { docFlow, depositHeld, vanCost } from './doc-flow'

const b = { status: 'booked' as const }
const dv = { doc_type: 'DV' as const, status: 'issued' as const, total: 2500 }

const state = (flow: ReturnType<typeof docFlow>, t: string) => flow.find((s) => s.type === t)!

describe('docFlow', () => {
  it('steps are DV, RC in order', () => {
    expect(docFlow(b, []).map((s) => s.type)).toEqual(['DV', 'RC'])
  })
  it('fresh booking: DV and RC both available', () => {
    const f = docFlow(b, [])
    expect(state(f, 'DV').state).toBe('available')
    expect(state(f, 'RC').state).toBe('available')
  })
  it('DV shows issued once issued; RC still available', () => {
    const f = docFlow({ status: 'deposit_paid' }, [dv])
    expect(state(f, 'DV').state).toBe('issued')
    expect(state(f, 'RC').state).toBe('available')
  })
  it('void documents do not count', () => {
    expect(state(docFlow(b, [{ ...dv, status: 'void' }]), 'DV').state).toBe('available')
  })
  it('cancelled booking blocks everything not issued', () => {
    const f = docFlow({ status: 'cancelled' }, [dv])
    expect(state(f, 'DV').state).toBe('issued')
    expect(state(f, 'RC')).toMatchObject({ state: 'blocked', reason: 'งานถูกยกเลิก' })
  })
  it('depositHeld sums issued DVs only', () => {
    expect(depositHeld([dv, { ...dv, total: 500 }, { ...dv, status: 'void' }])).toBe(3000)
  })
  it('vanCost sums issued van-hire PVs only', () => {
    const pv = { doc_type: 'PV' as const, status: 'issued' as const, total: 10000, category: 'ค่าจ้างรถตู้' }
    expect(vanCost([pv, { ...pv, status: 'void' }, { ...pv, category: 'น้ำมัน', total: 500 }, dv])).toBe(10000)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npx vitest run lib/doc-flow.test.ts
```

Expected: FAIL — `docFlow` still returns `['DP','IV','RC']` and `depositHeld` still sums `DP`.

- [ ] **Step 3: Replace `lib/doc-flow.ts`**

`sale_price` is dropped from `FlowBooking`: it was only read by the "deposit covers the whole sale price" block that blocked `IV`, which no longer exists now that `DV` has no separate invoicing step to skip.

```ts
import { round2 } from './money'
import { BOOKING_DOC_TYPES, type BookingDocType, type DocType } from './doc-types'
import { VAN_HIRE_CATEGORY } from './pv-categories'

export type TimelineDoc = { doc_type: DocType; status: 'issued' | 'void'; total: number; category?: string | null }
export type FlowBooking = { status: 'booked' | 'deposit_paid' | 'completed' | 'cancelled' }
export type FlowStep = { type: BookingDocType; state: 'issued' | 'available' | 'blocked'; reason?: string }

const issued = (docs: TimelineDoc[], t: DocType) => docs.filter((d) => d.doc_type === t && d.status === 'issued')

export function depositHeld(docs: TimelineDoc[]): number {
  return round2(issued(docs, 'DV').reduce((s, d) => s + Number(d.total), 0))
}

// Van hire paid for this booking (issued PVs in the ค่าจ้างรถตู้ category).
export function vanCost(docs: TimelineDoc[]): number {
  return round2(issued(docs, 'PV').filter((d) => d.category === VAN_HIRE_CATEGORY).reduce((s, d) => s + Number(d.total), 0))
}

export function docFlow(b: FlowBooking, docs: TimelineDoc[]): FlowStep[] {
  return BOOKING_DOC_TYPES.map((type): FlowStep => {
    if (issued(docs, type).length > 0) return { type, state: 'issued' }
    if (b.status === 'cancelled') return { type, state: 'blocked', reason: 'งานถูกยกเลิก' }
    return { type, state: 'available' }
  })
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx vitest run lib/doc-flow.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/doc-flow.ts lib/doc-flow.test.ts
git commit -m "feat(doc-flow): two-step flow (DV, RC), drop the invoicing pre-checks"
```

---

### Task 7: `DV` in `lib/doc-drafts.ts` (TDD)

**Files:**
- Modify: `lib/doc-drafts.ts`
- Test: `lib/doc-drafts.test.ts`

- [ ] **Step 1: Write the failing test**

Replace the contents of `lib/doc-drafts.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { buildDraft } from './doc-drafts'

const booking = { booking_no: 'BK-2609-0004', route: 'อุดรธานี → วังเวียง', customer_name: 'คุณวิภา', customer_name_en: 'Wipa', customer_phone: '081', commission: 2500, sale_price: 12500 }
const dv = { id: 'd1', doc_type: 'DV' as const, doc_no: 'DV-2609-0001', status: 'issued' as const, total: 2500 }

describe('buildDraft', () => {
  it('DV = commission to the customer, carries the English name', () => {
    const d = buildDraft('DV', booking, [])
    expect(d.recipient).toEqual({ name: 'คุณวิภา', name_en: 'Wipa', phone: '081', address: '' })
    expect(d.items).toEqual([{ description: 'มัดจำค่าบริการรถตู้ อุดรธานี → วังเวียง', qty: 1, unit_price: 2500 }])
    expect(d.payment_method).toBe('transfer')
  })
  it('RC = sale price minus deposit, references the DV', () => {
    const d = buildDraft('RC', booking, [dv])
    expect(d.items[0].unit_price).toBe(10000)
    expect(d.ref_document_id).toBe('d1')
    expect(d.recipient.name_en).toBe('Wipa')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npx vitest run lib/doc-drafts.test.ts
```

Expected: FAIL — `buildDraft('DV', ...)` doesn't match any case (TypeScript will also flag the removed `'IV'` case and the missing `customer_name_en` on the fixture once Task 8 lands, but at the JS runtime level this fails because the switch has no `'DV'` case yet).

- [ ] **Step 3: Replace `lib/doc-drafts.ts`**

```ts
import { round2 } from './money'
import { depositHeld } from './doc-flow'
import type { BookingDocType, DocType } from './doc-types'

export type DraftDoc = { id: string; doc_type: DocType; doc_no: string; status: 'issued' | 'void'; total: number }
export type DraftBooking = { booking_no: string; route: string; customer_name: string; customer_name_en: string; customer_phone: string; commission: number; sale_price: number }
export type DraftItem = { description: string; qty: number; unit_price: number }
export type Draft = { recipient: { name: string; name_en: string; phone: string; address: string }; items: DraftItem[]; payment_method: 'cash' | 'transfer' | null; due_date: string | null; ref_document_id: string | null }

const latest = (docs: DraftDoc[], t: DocType) => [...docs].reverse().find((d) => d.doc_type === t && d.status === 'issued') ?? null

// Every booking document goes to the customer; the balance is the sale price minus deposits held.
export function buildDraft(type: BookingDocType, b: DraftBooking, docs: DraftDoc[]): Draft {
  const customer = { name: b.customer_name, name_en: b.customer_name_en, phone: b.customer_phone, address: '' }
  const balance = Math.max(0, round2(b.sale_price - depositHeld(docs)))
  const balanceLine = { description: `ค่าบริการรถตู้ ${b.route} (ยอดคงเหลือหลังหักมัดจำ)`, qty: 1, unit_price: balance }
  switch (type) {
    case 'DV':
      return { recipient: customer, items: [{ description: `มัดจำค่าบริการรถตู้ ${b.route}`, qty: 1, unit_price: round2(b.commission) }], payment_method: 'transfer', due_date: null, ref_document_id: null }
    case 'RC':
      return { recipient: customer, items: [balanceLine], payment_method: 'cash', due_date: null, ref_document_id: latest(docs, 'DV')?.id ?? null }
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx vitest run lib/doc-drafts.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/doc-drafts.ts lib/doc-drafts.test.ts
git commit -m "feat(doc-drafts): DV draft with English name, drop the IV case"
```

---

### Task 8: `bookingSchema` gains `customer_name_en` and `pickup_time` (TDD)

**Files:**
- Modify: `lib/validation.ts`
- Test: `lib/validation.test.ts`

- [ ] **Step 1: Write the failing test**

Add to `lib/validation.test.ts`, after the `describe('booking van', ...)` block:

```ts
describe('bookingSchema new fields', () => {
  const ok = {
    customer_name: 'ทดสอบลูกค้า', customer_phone: '', van_id: '', route: 'ทดสอบ', trip_start: '', trip_end: '',
    passengers: '', van_price: '10000', commission_pct: '25', commission: '2500', sale_price: '12500', notes: '',
  }
  it('tolerates a missing customer_name_en and pickup_time, defaulting to empty/null', () => {
    const b = bookingSchema.parse(ok)
    expect(b.customer_name_en).toBe('')
    expect(b.pickup_time).toBeNull()
  })
  it('accepts an English name and a pickup time', () => {
    const b = bookingSchema.parse({ ...ok, customer_name_en: 'Test Customer', pickup_time: '14:30' })
    expect(b.customer_name_en).toBe('Test Customer')
    expect(b.pickup_time).toBe('14:30')
  })
  it('rejects a malformed pickup time', () => {
    expect(bookingSchema.safeParse({ ...ok, pickup_time: '2pm' }).success).toBe(false)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npx vitest run lib/validation.test.ts -t "bookingSchema new fields"
```

Expected: FAIL — `customer_name_en`/`pickup_time` are unrecognized keys with no schema fields, so `.parse()` throws on the "tolerates" and "accepts" cases, and the "rejects" case fails because there's nothing to reject yet.

- [ ] **Step 3: Add the fields to `bookingSchema`**

In `lib/validation.ts`, add `customer_name_en` right after `customer_phone: text(40),` inside `bookingSchema`:

```ts
    customer_name_en: z.preprocess((v) => v ?? '', text(200)),
```

Add `pickup_time` right after the `passengers` field (after its closing `),`):

```ts
    pickup_time: z.preprocess((v) => v ?? '', z.string().trim()
      .refine((v) => v === '' || /^\d{2}:\d{2}$/.test(v), 'เวลาไม่ถูกต้อง')
      .transform((v) => (v === '' ? null : v))),
```

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx vitest run lib/validation.test.ts -t "bookingSchema new fields"
```

Expected: PASS.

- [ ] **Step 5: Run the full validation suite to confirm nothing else broke**

```bash
npx vitest run lib/validation.test.ts
```

Expected: PASS (the pre-existing `ok` fixtures across other `describe` blocks omit both new keys; `z.preprocess((v) => v ?? '', ...)` tolerates that the same way `van_name`/`van_phone` already do).

- [ ] **Step 6: Commit**

```bash
git add lib/validation.ts lib/validation.test.ts
git commit -m "feat(validation): bookingSchema gains customer_name_en and pickup_time"
```

---

### Task 9: `documentSchema` moves to `DV`, gains `recipient_name_en` and item `detail` (TDD)

**Files:**
- Modify: `lib/validation.ts`
- Test: `lib/validation.test.ts`

- [ ] **Step 1: Write the failing test**

Replace the `describe('documentSchema', ...)` block in `lib/validation.test.ts`:

```ts
describe('documentSchema', () => {
  const dv = {
    doc_type: 'DV', booking_id: '11111111-1111-4111-8111-111111111111', ref_document_id: '',
    recipient_name: 'คุณวิภา', recipient_name_en: '', recipient_phone: '081', recipient_address: '',
    payment_method: 'transfer', due_date: '', notes: '',
    items: JSON.stringify([{ description: 'มัดจำ', qty: 1, unit_price: 2500 }]),
  }

  it('accepts a valid DV', () => {
    expect(documentSchema.safeParse(dv).success).toBe(true)
  })

  it('rejects a DV without a payment method', () => {
    const r = documentSchema.safeParse({ ...dv, payment_method: '' })
    expect(r.success).toBe(false)
    if (!r.success) expect(toFormState(r.error).fieldErrors?.payment_method).toBe('เลือกวิธีชำระเงิน')
  })

  it('rejects an RC without a payment method', () => {
    expect(documentSchema.safeParse({ ...dv, doc_type: 'RC', payment_method: '' }).success).toBe(false)
  })

  it('rejects invalid items JSON with an error on items', () => {
    const r = documentSchema.safeParse({ ...dv, items: 'not json' })
    expect(r.success).toBe(false)
    if (!r.success) expect(toFormState(r.error).fieldErrors?.items).toBe('รายการไม่ถูกต้อง')
  })

  it('rejects a zero total', () => {
    const r = documentSchema.safeParse({ ...dv, items: JSON.stringify([{ description: 'x', qty: 1, unit_price: 0 }]) })
    expect(r.success).toBe(false)
    if (!r.success) expect(toFormState(r.error).fieldErrors?.items).toBe('ยอดรวมต้องมากกว่า 0')
  })

  it('strips commas from item unit prices', () => {
    const r = documentSchema.parse({ ...dv, items: JSON.stringify([{ description: 'x', qty: 1, unit_price: '2,500' }]) })
    expect(r.items[0].unit_price).toBe(2500)
  })

  it('accepts an item detail and defaults it to empty when missing', () => {
    const withDetail = documentSchema.parse({ ...dv, items: JSON.stringify([{ description: 'x', qty: 1, unit_price: 100, detail: 'มีป้ายชื่อรอรับ' }]) })
    expect(withDetail.items[0].detail).toBe('มีป้ายชื่อรอรับ')
    const withoutDetail = documentSchema.parse(dv)
    expect(withoutDetail.items[0].detail).toBe('')
  })

  it('accepts a DV form with no due_date, notes, recipient_address or recipient_name_en fields at all', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { due_date: _d, notes: _n, recipient_address: _a, recipient_name_en: _e, ...withoutOptional } = dv
    expect(documentSchema.safeParse(withoutOptional).success).toBe(true)
  })

  it('rejects the retired CR type', () => {
    expect(documentSchema.safeParse({ ...dv, doc_type: 'CR' }).success).toBe(false)
  })

  it('rejects the retired DP type', () => {
    expect(documentSchema.safeParse({ ...dv, doc_type: 'DP' }).success).toBe(false)
  })

  it('rejects the retired IV type', () => {
    expect(documentSchema.safeParse({ ...dv, doc_type: 'IV' }).success).toBe(false)
  })

  it('rejects a reference on a DV', () => {
    const r = documentSchema.safeParse({ ...dv, ref_document_id: '22222222-2222-4222-8222-222222222222' })
    expect(r.success).toBe(false)
    if (!r.success) expect(toFormState(r.error).fieldErrors?.ref_document_id).toBe('เอกสารประเภทนี้ไม่ต้องอ้างอิงเอกสารอื่น')
  })

  it('allows an RC with or without a DV reference', () => {
    expect(documentSchema.safeParse({ ...dv, doc_type: 'RC', payment_method: 'cash' }).success).toBe(true)
    expect(documentSchema.safeParse({ ...dv, doc_type: 'RC', payment_method: 'cash', ref_document_id: '22222222-2222-4222-8222-222222222222' }).success).toBe(true)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
npx vitest run lib/validation.test.ts -t documentSchema
```

Expected: FAIL — `doc_type: 'DV'` is rejected by the current `z.enum(['DP','RC','IV'], ...)`, and `recipient_name_en`/item `detail` are unrecognized.

- [ ] **Step 3: Update `documentSchema` and `itemSchema`**

In `lib/validation.ts`, change the `itemSchema` definition:

```ts
const itemSchema = z.object({
  description: required('รายการ', 300),
  detail: z.preprocess((v) => v ?? '', text(300)),
  qty: numLike('จำนวน', { min: 0, max: 9999 }).pipe(z.number().gt(0, 'จำนวนต้องมากกว่า 0')),
  unit_price: numLike('ราคา', { min: 0, max: 99_999_999 }),
})
```

Replace the `documentSchema` block:

```ts
export const documentSchema = z
  .object({
    doc_type: z.enum(['DV', 'RC'], 'ประเภทเอกสารไม่ถูกต้อง'),
    booking_id: z.uuid('รหัสงานไม่ถูกต้อง'),
    // Fields a form may not render for every type arrive missing, not ''.
    ref_document_id: z.preprocess((v) => v ?? '', optionalUuid),
    recipient_name: required('ชื่อผู้รับ', 200),
    recipient_name_en: z.preprocess((v) => v ?? '', text(200)),
    recipient_phone: z.preprocess((v) => v ?? '', text(40)),
    recipient_address: z.preprocess((v) => v ?? '', text(500)),
    payment_method: z.preprocess((v) => v ?? '', optionalPaymentMethod),
    due_date: z.preprocess((v) => v ?? '', optionalDate),
    notes: z.preprocess((v) => v ?? '', text(500)),
    items: itemsSchema,
  })
  .refine((d) => d.payment_method !== null, { path: ['payment_method'], message: 'เลือกวิธีชำระเงิน' })
  .refine((d) => round2(d.items.reduce((s, i) => s + round2(i.qty * i.unit_price), 0)) > 0, { path: ['items'], message: 'ยอดรวมต้องมากกว่า 0' })
  // Mirror issue_document: only an RC may reference a document (its DV).
  .refine((d) => d.doc_type === 'RC' || d.ref_document_id === null, { path: ['ref_document_id'], message: 'เอกสารประเภทนี้ไม่ต้องอ้างอิงเอกสารอื่น' })
```

This removes the two old `refine()` calls that special-cased `doc_type === 'IV'` (exempting it from needing a payment method) — with `IV` gone from the flow, `DV` and `RC` both always require one, so a single non-null check covers it.

- [ ] **Step 4: Run the test to verify it passes**

```bash
npx vitest run lib/validation.test.ts -t documentSchema
```

Expected: PASS.

- [ ] **Step 5: Run the whole validation suite and the whole test suite**

```bash
npx vitest run lib/validation.test.ts
npx vitest run
```

Expected: everything PASSes (any file still touching `'DP'`/`'IV'` string literals in non-test code has already been updated by Tasks 5–7; `voucherSchema` shares `itemsSchema`, so PV items now accept `detail` too, for free).

- [ ] **Step 6: Commit**

```bash
git add lib/validation.ts lib/validation.test.ts
git commit -m "feat(validation): documentSchema moves to DV, adds recipient_name_en and item detail"
```

---

### Task 10: `lib/data/documents.ts` — pass `passengers`/`pickup_time` through `getDocument`

**Files:**
- Modify: `lib/data/documents.ts`

- [ ] **Step 1: Add the two columns to the booking sub-select**

In `getDocument`, change:

```ts
    .select('*, document_items(*), bookings(booking_no, route, trip_start, trip_end, sale_price, commission, van_price)')
```

to:

```ts
    .select('*, document_items(*), bookings(booking_no, route, trip_start, trip_end, passengers, pickup_time, sale_price, commission, van_price)')
```

- [ ] **Step 2: Commit**

```bash
git add lib/data/documents.ts
git commit -m "feat(documents): select passengers/pickup_time for the document sheet"
```

---

### Task 11: Per-item `detail` field in `components/line-items-editor.tsx`

No unit tests for this file (the project's `vitest.config.ts` only runs `lib/**/*.test.ts`; component behavior here is verified manually per the project's existing convention — see Task 23).

**Files:**
- Modify: `components/line-items-editor.tsx`

- [ ] **Step 1: Add `detail` to `ItemRow` and thread it through**

Replace the file's contents:

```tsx
'use client'

import { bahtText, formatAmount, round2 } from '@/lib/money'

export type ItemRow = { description: string; qty: string; unit_price: string; detail: string }

const MAX_ROWS = 20

export function toNumber(v: string): number {
  const n = Number(v.replace(/,/g, ''))
  return Number.isFinite(n) ? n : 0
}

export function rowsToItems(rows: ItemRow[]) {
  return rows.map((r) => ({ description: r.description.trim(), qty: toNumber(r.qty), unit_price: toNumber(r.unit_price), detail: r.detail.trim() }))
}

export function rowsTotal(rows: ItemRow[]): number {
  return round2(rows.reduce((s, r) => s + round2(toNumber(r.qty) * toNumber(r.unit_price)), 0))
}

export function LineItemsEditor({ rows, onChange, error }: {
  rows: ItemRow[]
  onChange: (rows: ItemRow[]) => void
  error?: string
}) {
  const total = rowsTotal(rows)
  const update = (i: number, patch: Partial<ItemRow>) => onChange(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)))

  return (
    <fieldset className="grid gap-3" aria-describedby={error ? 'items-error' : undefined}>
      <legend className="mb-1.5 text-sm font-medium" style={{ color: 'var(--ink-2)' }}>รายการ</legend>
      <input type="hidden" name="items" value={JSON.stringify(rowsToItems(rows))} />
      {rows.map((r, i) => {
        const amount = round2(toNumber(r.qty) * toNumber(r.unit_price))
        return (
          <div key={i} className="grid gap-2 rounded-2xl border p-3" style={{ borderColor: 'var(--hair)' }}>
            <div className="grid gap-2 sm:grid-cols-[1fr_5rem_8rem_8rem_auto] sm:items-end">
              <label className="grid gap-1 text-xs" style={{ color: 'var(--muted)' }}>
                รายการที่ {i + 1}
                <input className="input" value={r.description} aria-invalid={!!error}
                  onChange={(e) => update(i, { description: e.target.value })} />
              </label>
              <div className="grid grid-cols-[4.5rem_1fr] gap-2 sm:contents">
                <label className="grid gap-1 text-xs" style={{ color: 'var(--muted)' }}>
                  จำนวน
                  <input className="input num text-right" inputMode="decimal" value={r.qty}
                    onChange={(e) => update(i, { qty: e.target.value })} />
                </label>
                <label className="grid gap-1 text-xs" style={{ color: 'var(--muted)' }}>
                  ราคาต่อหน่วย
                  <input className="input num text-right" inputMode="decimal" value={r.unit_price}
                    onChange={(e) => update(i, { unit_price: e.target.value })} />
                </label>
              </div>
              <div className="flex items-center justify-between gap-2 sm:contents">
                <div className="grid gap-1 text-xs sm:text-right" style={{ color: 'var(--muted)' }}>
                  จำนวนเงิน
                  <output className="num py-2 text-sm font-medium" style={{ color: 'var(--ink)' }}>{formatAmount(amount)}</output>
                </div>
                <button type="button" className="btn btn-glass btn-sm" disabled={rows.length <= 1}
                  aria-label={`ลบรายการที่ ${i + 1}`} onClick={() => onChange(rows.filter((_, j) => j !== i))}>
                  ลบ
                </button>
              </div>
            </div>
            <label className="grid gap-1 text-xs" style={{ color: 'var(--muted)' }}>
              รายละเอียดเพิ่มเติม (ไม่บังคับ, แสดงตัวเล็กใต้รายการนี้ในเอกสาร)
              <input className="input" value={r.detail} onChange={(e) => update(i, { detail: e.target.value })} />
            </label>
          </div>
        )
      })}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" className="btn btn-glass btn-sm" disabled={rows.length >= MAX_ROWS}
          onClick={() => onChange([...rows, { description: '', qty: '1', unit_price: '0', detail: '' }])}>
          + เพิ่มรายการ
        </button>
        <div className="text-right">
          <div className="num text-lg font-semibold">รวม {formatAmount(total)}</div>
          <div className="text-xs" style={{ color: 'var(--muted)' }}>({total >= 0 ? bahtText(total) : ''})</div>
        </div>
      </div>
      {error && <p id="items-error" className="field-error">{error}</p>}
    </fieldset>
  )
}
```

Note: every row's container is now always bordered (`rounded-2xl border p-3`), where before it was borderless on `sm:` and up. This is a deliberate, small tradeoff to make room for the new detail field without fighting the responsive grid — flag it in the manual check (Task 23).

- [ ] **Step 2: Commit**

```bash
git add components/line-items-editor.tsx
git commit -m "feat(line-items): optional per-item detail note"
```

---

### Task 12: Redesign `components/document-sheet.tsx`

**Files:**
- Modify: `components/document-sheet.tsx`

- [ ] **Step 1: Replace the file's contents**

```tsx
import Image from 'next/image'
import { DOC_META, PAYMENT_LABEL, type DocType, type PaymentMethod } from '@/lib/doc-types'
import { bahtText, formatAmount, formatPhone, formatThaiDate, round2 } from '@/lib/money'

type Company = {
  name_th: string
  name_en: string
  address: string
  tax_id: string
  phone: string
  bank_name: string
  bank_account_no: string
  bank_account_name: string
}

type Recipient = { name: string; name_en?: string; phone: string; address: string }

type Item = { description: string; detail?: string; qty: number; unit_price: number }

type Booking = { booking_no: string; route: string; trip_start: string | null; trip_end: string | null; passengers?: number | null; pickup_time?: string | null }

export type DocumentSheetProps = {
  type: DocType
  docNo: string | null
  issueDate: string
  company: Company
  recipient: Recipient
  booking: Booking | null
  items: Item[]
  total: number
  paymentMethod: PaymentMethod | null
  notes: string
  extra?: { salePrice?: number; depositNo?: string; depositTotal?: number; refDocNo?: string }
  issuerName: string
  void?: { reason: string } | null
  category?: string
  hasSlip?: boolean
}

const GREEN = '#0F2A1D'
const GOLD = '#D9A21B'
const IVORY = '#FFFDF7'
const INK = '#1E2A22'
const TOTAL_BG = '#F6EFD9'

function amount(qty: number, unitPrice: number): number {
  return Math.round(qty * unitPrice * 100) / 100
}

export function DocumentSheet(props: DocumentSheetProps) {
  const { type, docNo, issueDate, company, recipient, booking, items, total, paymentMethod, notes, extra, issuerName, void: voidInfo, category, hasSlip } = props
  const meta = DOC_META[type]
  // DV bills the balance, so the deposit is whatever the trip costs beyond that balance.
  const servicePrice = extra?.salePrice ?? total
  const depositPaid = Math.max(0, round2(servicePrice - total))
  const companyLines = [company.address, company.phone ? `โทร / Tel ${formatPhone(company.phone)}` : '', company.tax_id ? `เลขผู้เสียภาษี / Tax ID ${company.tax_id}` : '']
    .filter(Boolean)

  return (
    <div
      className="doc-sheet relative"
      style={{ borderTop: `6px solid ${GREEN}`, color: INK, background: IVORY }}
    >
      {voidInfo && (
        <div
          className="pointer-events-none absolute inset-0 z-10 grid place-items-center"
          aria-hidden="true"
        >
          <div className="rotate-[-18deg] text-center">
            <div style={{ color: '#B3261E', opacity: 0.25, fontSize: '72pt', fontWeight: 700, lineHeight: 1, letterSpacing: '0.05em' }}>
              ยกเลิก / VOID
            </div>
            <div style={{ color: '#B3261E', opacity: 0.5, fontSize: '13pt', fontWeight: 600 }}>{voidInfo.reason}</div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-6" style={{ borderBottom: `2px solid ${GOLD}`, paddingBottom: '10mm' }}>
        <div className="flex items-start gap-3">
          <Image src="/logo-mark.png" alt="" width={48} height={48} className="shrink-0" />
          <div>
            <div style={{ color: GREEN, fontWeight: 700, fontSize: '13pt' }}>{company.name_th}</div>
            <div style={{ color: INK, fontSize: '10pt' }}>{company.name_en}</div>
            {companyLines.map((line, i) => (
              <div key={i} style={{ color: INK, opacity: 0.75, fontSize: '9pt' }}>{line}</div>
            ))}
          </div>
        </div>
        <div className="text-right">
          <div style={{ color: GREEN, fontWeight: 700, fontSize: '18pt' }}>{meta.th}</div>
          <div style={{ color: GOLD, fontWeight: 600, fontSize: '10pt', letterSpacing: '0.12em' }}>{meta.en}</div>
          <div className="mt-2 font-mono" style={{ fontSize: '10pt' }}>
            เลขที่ / No. {docNo ?? 'ตัวอย่าง / PREVIEW'}
          </div>
          <div style={{ fontSize: '10pt' }}>วันที่ / Date {formatThaiDate(issueDate)}</div>
        </div>
      </div>

      {/* Recipient */}
      <div className="mt-[8mm] flex justify-between gap-6" style={{ fontSize: '10.5pt' }}>
        <div>
          <div style={{ color: GREEN, fontWeight: 600 }}>{meta.receivedFromLabel}</div>
          <div>{recipient.name}</div>
          {recipient.name_en && <div style={{ fontSize: '9.5pt', opacity: 0.85 }}>{recipient.name_en}</div>}
          {recipient.phone && <div>โทร / Tel {formatPhone(recipient.phone)}</div>}
          {recipient.address && <div>{recipient.address}</div>}
          {type === 'PV' && category && (
            <div className="mt-1">
              <span style={{ color: GREEN, fontWeight: 600 }}>หมวด / Category</span> {category}
            </div>
          )}
        </div>
        {booking && (
          <div className="text-right">
            <div style={{ color: GREEN, fontWeight: 600 }}>อ้างอิงงาน / Booking</div>
            <div>{booking.booking_no}</div>
            <div>{booking.route}</div>
            {(booking.trip_start || booking.trip_end) && (
              <div>{formatThaiDate(booking.trip_start)} – {formatThaiDate(booking.trip_end)}</div>
            )}
            {booking.pickup_time && <div>เวลารับ {booking.pickup_time.slice(0, 5)} น.</div>}
            {booking.passengers != null && <div>ผู้โดยสาร {booking.passengers} ท่าน</div>}
          </div>
        )}
      </div>

      {/* Items table */}
      <table className="mt-[6mm] w-full border-collapse" style={{ fontSize: '10.5pt' }}>
        <thead>
          <tr style={{ background: GREEN, color: '#fff' }}>
            <th className="px-2 py-1.5 text-left font-medium" style={{ width: '8%' }}>ลำดับ<br />No.</th>
            <th className="px-2 py-1.5 text-left font-medium">รายการ<br />Description</th>
            <th className="px-2 py-1.5 text-right font-medium" style={{ width: '12%' }}>จำนวน<br />Qty</th>
            <th className="px-2 py-1.5 text-right font-medium" style={{ width: '20%' }}>ราคา (บาท)<br />Unit price (THB)</th>
            <th className="px-2 py-1.5 text-right font-medium" style={{ width: '20%' }}>จำนวนเงิน (บาท)<br />Amount (THB)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(30,42,34,0.15)' }}>
              <td className="px-2 py-1.5">{i + 1}</td>
              <td className="px-2 py-1.5">
                {it.description}
                {it.detail && <div style={{ fontSize: '8.5pt', color: INK, opacity: 0.6 }}>{it.detail}</div>}
              </td>
              <td className="num px-2 py-1.5 text-right">{it.qty}</td>
              <td className="num px-2 py-1.5 text-right">{formatAmount(it.unit_price)}</td>
              <td className="num px-2 py-1.5 text-right">{formatAmount(amount(it.qty, it.unit_price))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* RC extra rows */}
      {type === 'RC' && extra?.salePrice !== undefined && (
        <div className="mt-2 flex flex-col items-end gap-0.5" style={{ fontSize: '10pt' }}>
          <div className="flex w-64 justify-between">
            <span>ราคาค่าบริการทั้งหมด</span>
            <span className="num">{formatAmount(extra.salePrice)}</span>
          </div>
          {extra.depositTotal !== undefined && (
            <div className="flex w-64 justify-between">
              <span>หักมัดจำ {extra.depositNo ?? ''}</span>
              <span className="num">-{formatAmount(extra.depositTotal)}</span>
            </div>
          )}
        </div>
      )}

      {/* Total bar */}
      {type !== 'DV' && (
        <div className="mt-[4mm] flex items-center justify-between rounded-md px-4 py-2" style={{ background: TOTAL_BG }}>
          <div style={{ fontSize: '10pt', fontStyle: 'italic' }}>({bahtText(total)})</div>
          <div style={{ fontSize: '12pt', fontWeight: 700 }}>
            รวม / Total <span className="num">{formatAmount(total)}</span> บาท
          </div>
        </div>
      )}

      {/* DV: what the trip costs, what the deposit covers, what is left to pay */}
      {type === 'DV' && (
        <>
          <div className="mt-[4mm] ml-auto w-[62%]" style={{ fontSize: '10.5pt' }}>
            <div className="flex justify-between px-4 py-1.5" style={{ borderBottom: '1px solid rgba(30,42,34,0.15)' }}>
              <span>ยอดรวมค่าบริการ / Total</span>
              <span className="num font-semibold">{formatAmount(servicePrice)} บาท</span>
            </div>
            {depositPaid > 0 && (
              <div className="flex justify-between px-4 py-1.5" style={{ borderBottom: '1px solid rgba(30,42,34,0.15)' }}>
                <span>หัก มัดจำที่ชำระแล้ว / Deposit paid</span>
                <span className="num font-semibold">-{formatAmount(depositPaid)} บาท</span>
              </div>
            )}
            <div className="mt-1 flex justify-between rounded-md px-4 py-2" style={{ background: TOTAL_BG, color: GREEN, fontSize: '12pt', fontWeight: 700 }}>
              <span>ยอดคงเหลือ / Balance due</span>
              <span className="num">{formatAmount(total)} บาท</span>
            </div>
            <div className="px-4 pt-1 text-right" style={{ fontSize: '9.5pt', opacity: 0.7 }}>
              ยอดคงเหลือ ({bahtText(total)})
            </div>
          </div>

          <div className="mt-[6mm] flex gap-4" style={{ fontSize: '10pt' }}>
            <div className="w-1/2 rounded-md px-4 py-3" style={{ border: '1px solid rgba(30,42,34,0.2)' }}>
              <div style={{ color: GREEN, fontWeight: 600 }}>กำหนดชำระ / Due date</div>
              <div className="mt-1">ชำระในวันเสร็จสิ้นการให้บริการ</div>
              <div>ยอดที่ต้องชำระเพิ่มเติม <span className="num">{formatAmount(total)}</span> บาท</div>
            </div>
            <div className="w-1/2 rounded-md px-4 py-3" style={{ border: '1px solid rgba(30,42,34,0.2)' }}>
              <div style={{ color: GREEN, fontWeight: 600 }}>สถานะการชำระ / Payment status</div>
              <div className="mt-1">รับมัดจำแล้ว <span className="num">{formatAmount(depositPaid)}</span> บาท</div>
              <div>คงเหลือรอชำระ <span className="num">{formatAmount(total)}</span> บาท</div>
            </div>
          </div>

          <div className="mt-[4mm] rounded-md px-4 py-3" style={{ background: TOTAL_BG, borderLeft: `3px solid ${GOLD}`, fontSize: '10pt' }}>
            <div style={{ color: GREEN, fontWeight: 600 }}>เงื่อนไขสำคัญ</div>
            <div className="mt-1.5">
              กรุณามาตามเวลานัดหมาย หากลูกค้าไม่มาตามนัดและบริษัทไม่สามารถติดต่อได้เกิน 2 ชั่วโมงนับจากเวลานัด
              บริษัทขอสงวนสิทธิ์ยกเลิกบริการ
              {depositPaid > 0 && <> และเงินมัดจำ <span className="num">{formatAmount(depositPaid)}</span> บาทไม่สามารถขอคืนได้</>}
            </div>
            <div className="mt-1.5">เวลารับและเวลาถึงอาจเปลี่ยนแปลงตามพิธีการตรวจคนเข้าเมือง การจราจร และสภาพเส้นทาง</div>
          </div>
        </>
      )}

      {/* Notes */}
      {notes && <div className="mt-[4mm]" style={{ fontSize: '10pt' }}>{notes}</div>}

      {/* Payment method */}
      {meta.needsPayment && (
        <div className="mt-[6mm]" style={{ fontSize: '10.5pt' }}>
          <span style={{ color: GREEN, fontWeight: 600 }}>ชำระโดย / Paid by</span>{' '}
          {/* Offset is no longer offered; it shows only on vouchers that were issued with it. */}
          {(paymentMethod === 'offset' ? (['cash', 'transfer', 'offset'] as const) : (['cash', 'transfer'] as const)).map((m) => (
            <span key={m} className="ml-3">{paymentMethod === m ? '☑' : '☐'} {PAYMENT_LABEL[m]}</span>
          ))}
          {type === 'PV' && paymentMethod === 'offset' && (
            <div className="mt-1">หักกลบกับเงินค่าบริการที่ผู้รับเงินรับจากลูกค้าแทนบริษัท</div>
          )}
        </div>
      )}

      {/* PV slip attached */}
      {type === 'PV' && hasSlip && (
        <div className="mt-[2mm]" style={{ fontSize: '9pt', opacity: 0.6 }}>มีสลิปแนบ / Slip attached</div>
      )}

      {/* Signatures */}
      {type === 'PV' ? (
        <div className="mt-[16mm] flex justify-between" style={{ fontSize: '10.5pt' }}>
          <div className="w-[30%] text-center">
            <div style={{ borderTop: `1px solid ${INK}`, paddingTop: 4 }}>ผู้จ่ายเงิน / Paid by</div>
            <div className="mt-1">{issuerName}</div>
          </div>
          <div className="w-[30%] text-center">
            <div style={{ borderTop: `1px solid ${INK}`, paddingTop: 4 }}>ผู้รับเงิน / Received by</div>
          </div>
          <div className="w-[30%] text-center">
            <div style={{ borderTop: `1px solid ${INK}`, paddingTop: 4 }}>ผู้อนุมัติ / Approved by</div>
          </div>
        </div>
      ) : (
        /* ไม่ต้องเซ็น ทั้งสองฝั่งพิมพ์ชื่อจากระบบไปเลย */
        <div className="mt-[12mm] flex justify-between gap-6" style={{ fontSize: '10.5pt' }}>
          <div>
            <span style={{ color: GREEN, fontWeight: 600 }}>ผู้จ่ายเงิน / Paid by</span>{' '}
            <span className="font-medium">{recipient.name}</span>
          </div>
          <div>
            <span style={{ color: GREEN, fontWeight: 600 }}>ผู้รับเงิน / Received by</span>{' '}
            <span className="font-medium">{issuerName}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-[10mm] text-center" style={{ fontSize: '8pt', color: INK, opacity: 0.5 }}>
        ออกโดยระบบ HUGLAO Back Office
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Run the type checker**

```bash
npx tsc --noEmit
```

Expected: no errors from this file (`Company`, `Recipient`, `Item`, `Booking` all accept the callers built in earlier/later tasks).

- [ ] **Step 3: Commit**

```bash
git add components/document-sheet.tsx
git commit -m "feat(document-sheet): DV layout, English name, dashed phones, item detail, booking box"
```

---

### Task 13: `components/document-form.tsx` — `recipient_name_en` field

**Files:**
- Modify: `components/document-form.tsx`

- [ ] **Step 1: Update `Snapshot`, `parseRows`, and add the field**

Change the `Snapshot` type:

```ts
type Snapshot = { recipient_name: string; recipient_name_en: string; recipient_phone: string; recipient_address: string; payment_method: string; notes: string }
```

Change `parseRows` to carry `detail` through on error-restore:

```ts
function parseRows(json: string | undefined): ItemRow[] | null {
  if (!json) return null
  try {
    const arr: unknown = JSON.parse(json)
    if (!Array.isArray(arr)) return null
    return arr.map((it: { description?: unknown; qty?: unknown; unit_price?: unknown; detail?: unknown }) => ({
      description: String(it.description ?? ''), qty: String(it.qty ?? ''), unit_price: String(it.unit_price ?? ''), detail: String(it.detail ?? ''),
    }))
  } catch {
    return null
  }
}
```

Change the initial `rows` state (the `draft.items` don't carry a detail, so default it to `''`):

```ts
  const [rows, setRows] = useState<ItemRow[]>(() =>
    draft.items.map((i) => ({ description: i.description, qty: String(i.qty), unit_price: String(i.unit_price), detail: '' })))
```

Change `readForm()`:

```ts
  function readForm(): Snapshot | null {
    const form = formRef.current
    if (!form) return null
    const fd = new FormData(form)
    const s = (k: string) => (typeof fd.get(k) === 'string' ? String(fd.get(k)) : '')
    return { recipient_name: s('recipient_name'), recipient_name_en: s('recipient_name_en'), recipient_phone: s('recipient_phone'), recipient_address: s('recipient_address'), payment_method: s('payment_method'), notes: s('notes') }
  }
```

Add the field right after the `recipient_name` `Field` block (before the phone/address `grid`):

```tsx
        <Field label="ชื่อลูกค้า (อังกฤษ) — ไม่บังคับ" name="recipient_name_en" error={e.recipient_name_en}>
          <input id="recipient_name_en" name="recipient_name_en" className="input"
            defaultValue={v?.recipient_name_en ?? draft.recipient.name_en}
            aria-invalid={!!e.recipient_name_en} aria-describedby={describedBy('recipient_name_en', { error: e.recipient_name_en })} />
        </Field>
```

Update the preview `<DocumentSheet>` call's `recipient` prop:

```tsx
                recipient={{ name: snap.recipient_name, name_en: snap.recipient_name_en, phone: snap.recipient_phone, address: snap.recipient_address }}
```

- [ ] **Step 2: Run the type checker**

```bash
npx tsc --noEmit
```

Expected: no errors from this file.

- [ ] **Step 3: Commit**

```bash
git add components/document-form.tsx
git commit -m "feat(document-form): recipient_name_en field for DV/RC"
```

---

### Task 14: `components/voucher-form.tsx` — carry item `detail` through

**Files:**
- Modify: `components/voucher-form.tsx`

- [ ] **Step 1: Update `parseRows` and `EMPTY_ROWS`**

```ts
function parseRows(json: string | undefined): ItemRow[] | null {
  if (!json) return null
  try {
    const arr: unknown = JSON.parse(json)
    if (!Array.isArray(arr)) return null
    return arr.map((it: { description?: unknown; qty?: unknown; unit_price?: unknown; detail?: unknown }) => ({
      description: String(it.description ?? ''), qty: String(it.qty ?? ''), unit_price: String(it.unit_price ?? ''), detail: String(it.detail ?? ''),
    }))
  } catch {
    return null
  }
}
```

```ts
const EMPTY_ROWS: ItemRow[] = [{ description: '', qty: '1', unit_price: '', detail: '' }]
```

- [ ] **Step 2: Run the type checker**

```bash
npx tsc --noEmit
```

Expected: this file now compiles; `components/document-sheet.tsx`'s `Item` type accepting `detail` as optional means the existing `items={rowsToItems(rows)}` call (which now includes `detail`) still matches.

- [ ] **Step 3: Commit**

```bash
git add components/voucher-form.tsx
git commit -m "feat(voucher-form): carry item detail through error-restore"
```

---

### Task 15: `components/customer-fields.tsx` — `customer_name_en` field

**Files:**
- Modify: `components/customer-fields.tsx`

- [ ] **Step 1: Add the prop, state, and field**

Change the props signature:

```tsx
export function CustomerFields({ initial, errors, locked }: {
  initial?: { name: string; phone: string; nameEn: string }
  errors?: { customer_name?: string; customer_phone?: string; customer_name_en?: string }
  locked?: boolean
}) {
```

Add state next to `phone`:

```ts
  const [nameEn, setNameEn] = useState(initial?.nameEn ?? '')
```

Add the field after the phone field's closing `</div>` (still inside the outer `<div className="grid gap-3">`):

```tsx
      <div className="grid gap-1.5">
        <label htmlFor="customer_name_en" className="text-sm font-medium" style={{ color: 'var(--ink-2)' }}>ชื่อลูกค้า (อังกฤษ) — ไม่บังคับ</label>
        <input
          id="customer_name_en"
          name="customer_name_en"
          className="input"
          aria-invalid={!!errors?.customer_name_en}
          aria-describedby={fieldDescribedBy('customer_name_en', { error: errors?.customer_name_en })}
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
        />
        {errors?.customer_name_en && <p id="customer_name_en-error" className="field-error">{errors.customer_name_en}</p>}
      </div>
```

- [ ] **Step 2: Commit**

```bash
git add components/customer-fields.tsx
git commit -m "feat(customer-fields): optional English name field"
```

---

### Task 16: `components/booking-form.tsx` — wire `customer_name_en` and add `pickup_time`

**Files:**
- Modify: `components/booking-form.tsx`

- [ ] **Step 1: Update `BookingFormInitial` and the two call sites**

Add to `BookingFormInitial`:

```ts
export type BookingFormInitial = {
  customer_name: string
  customer_name_en: string
  customer_phone: string
  van_id: string | null
  van_name: string
  van_phone: string
  route: string
  trip_start: string | null
  trip_end: string | null
  pickup_time: string | null
  passengers: number | null
  notes: string
  pricing: Pricing
}
```

Update the `<CustomerFields>` call:

```tsx
        <CustomerFields
          initial={{ name: vals?.customer_name ?? initial.customer_name, phone: vals?.customer_phone ?? initial.customer_phone, nameEn: vals?.customer_name_en ?? initial.customer_name_en }}
          errors={{ customer_name: e.customer_name, customer_phone: e.customer_phone, customer_name_en: e.customer_name_en }}
          locked={locked}
        />
```

Replace the trip-dates `grid` (currently `sm:grid-cols-3` with `trip_start`/`trip_end`/`passengers`) with a 4-column grid that adds `pickup_time`:

```tsx
        <div className="grid gap-4 sm:grid-cols-4">
          <Field label="วันไป" name="trip_start" error={e.trip_start}>
            <input id="trip_start" name="trip_start" type="date" className="input" defaultValue={vals?.trip_start ?? initial.trip_start ?? ''}
              aria-invalid={!!e.trip_start} aria-describedby={describedBy('trip_start', { error: e.trip_start })} />
          </Field>
          <Field label="วันกลับ" name="trip_end" error={e.trip_end}>
            <input id="trip_end" name="trip_end" type="date" className="input" defaultValue={vals?.trip_end ?? initial.trip_end ?? ''}
              aria-invalid={!!e.trip_end} aria-describedby={describedBy('trip_end', { error: e.trip_end })} />
          </Field>
          <Field label="เวลารับ (ไม่บังคับ)" name="pickup_time" error={e.pickup_time}>
            <input id="pickup_time" name="pickup_time" type="time" className="input" defaultValue={vals?.pickup_time ?? initial.pickup_time ?? ''}
              aria-invalid={!!e.pickup_time} aria-describedby={describedBy('pickup_time', { error: e.pickup_time })} />
          </Field>
          <Field label="จำนวนผู้โดยสาร" name="passengers" error={e.passengers}>
            <input id="passengers" name="passengers" type="number" min={1} max={99} className="input num" defaultValue={vals?.passengers ?? (initial.passengers != null ? String(initial.passengers) : '')}
              aria-invalid={!!e.passengers} aria-describedby={describedBy('passengers', { error: e.passengers })} />
          </Field>
        </div>
```

- [ ] **Step 2: Commit**

```bash
git add components/booking-form.tsx
git commit -m "feat(booking-form): pickup_time field, wire customer_name_en"
```

---

### Task 17: Booking pages — initial values for the two new fields

**Files:**
- Modify: `app/(app)/bookings/new/page.tsx`
- Modify: `app/(app)/bookings/[id]/edit/page.tsx`

- [ ] **Step 1: `app/(app)/bookings/new/page.tsx`**

```tsx
      <BookingForm action={createBooking} vans={vans} defaultPct={pct} submitLabel="บันทึกงาน"
        initial={{ customer_name: '', customer_name_en: '', customer_phone: '', van_id: null, van_name: '', van_phone: '', route: '', trip_start: null, trip_end: null, pickup_time: null, passengers: null, notes: '',
          pricing: { vanPrice: 0, commissionPct: pct, ...calcPricing(0, pct) } }} />
```

- [ ] **Step 2: `app/(app)/bookings/[id]/edit/page.tsx`**

```tsx
        initial={{
          customer_name: booking.customer_name, customer_name_en: booking.customer_name_en, customer_phone: booking.customer_phone,
          // A registered van shows its registry name/phone in the van box.
          van_id: booking.van_id, van_name: booking.vans?.owner_name ?? booking.van_name, van_phone: booking.vans?.phone ?? booking.van_phone, route: booking.route, trip_start: booking.trip_start, trip_end: booking.trip_end,
          pickup_time: booking.pickup_time, passengers: booking.passengers, notes: booking.notes,
          pricing: { vanPrice: Number(booking.van_price), commissionPct: Number(booking.commission_pct), commission: Number(booking.commission), salePrice: Number(booking.sale_price) },
        }} />
```

- [ ] **Step 3: Run the type checker**

```bash
npx tsc --noEmit
```

Expected: no errors — `getBooking()` already `select('*', ...)`s the `bookings` table, so `booking.customer_name_en`/`booking.pickup_time` are present once `lib/database.types.ts` (Task 3) has the columns.

- [ ] **Step 4: Commit**

```bash
git add "app/(app)/bookings/new/page.tsx" "app/(app)/bookings/[id]/edit/page.tsx"
git commit -m "feat(bookings): wire customer_name_en/pickup_time into the booking form pages"
```

---

### Task 18: Document-issuing pages/actions — `DV`, `recipient_name_en`, `pickup_time`/`passengers`

**Files:**
- Modify: `app/(app)/bookings/[id]/documents/new/page.tsx`
- Modify: `app/(app)/bookings/[id]/documents/actions.ts`

- [ ] **Step 1: `app/(app)/bookings/[id]/documents/new/page.tsx`**

Update the `docFlow` call (its `FlowBooking` no longer takes `sale_price`, per Task 6):

```tsx
  const step = docFlow({ status: booking.status }, timeline).find((s) => s.type === type)
```

Update `buildDraft`'s booking argument to include `customer_name_en`:

```tsx
  const draft = buildDraft(type, {
    booking_no: booking.booking_no, route: booking.route, customer_name: booking.customer_name, customer_name_en: booking.customer_name_en,
    customer_phone: booking.customer_phone, commission, sale_price: salePrice,
  }, timeline)
```

Update the `refDp`/`extra` computation — `RC`'s reference is now a `DV`, and the "full price / deposit" `extra` block applies to `DV` as it did to `IV`:

```tsx
  const refDp = type === 'RC' ? timeline.find((d) => d.id === draft.ref_document_id) : undefined
  const extra = type === 'RC' || type === 'DV'
    ? { salePrice, depositNo: refDp?.doc_no, depositTotal: depositHeld(timeline) || undefined }
    : undefined
```

Update the `sheetBase.booking` object to carry the two new fields through to the preview:

```tsx
        sheetBase={{
          company,
          booking: { booking_no: booking.booking_no, route: booking.route, trip_start: booking.trip_start, trip_end: booking.trip_end, passengers: booking.passengers, pickup_time: booking.pickup_time },
          extra,
          issuerName: staff.full_name,
        }}
```

- [ ] **Step 2: `app/(app)/bookings/[id]/documents/actions.ts`**

Add `p_recipient_name_en` to the RPC call:

```ts
  const { data, error } = await supabase.rpc('issue_document', {
    p_doc_type: d.doc_type,
    p_booking_id: d.booking_id,
    p_ref_document_id: sqlNull(d.ref_document_id),
    p_recipient_name: d.recipient_name,
    p_recipient_name_en: d.recipient_name_en,
    p_recipient_phone: d.recipient_phone,
    p_recipient_address: d.recipient_address,
    p_payment_method: sqlNull(d.payment_method),
    p_due_date: sqlNull(d.due_date),
    p_category: sqlNull(null),
    p_notes: d.notes,
    p_items: d.items,
  })
```

- [ ] **Step 3: Run the type checker**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add "app/(app)/bookings/[id]/documents/new/page.tsx" "app/(app)/bookings/[id]/documents/actions.ts"
git commit -m "feat(documents): wire DV/recipient_name_en/pickup_time into the issue-document page"
```

---

### Task 19: Voucher (PV) actions/page — pass empty `p_recipient_name_en`, default item `detail`

**Files:**
- Modify: `app/(app)/vouchers/actions.ts`
- Modify: `app/(app)/vouchers/new/page.tsx`

- [ ] **Step 1: `app/(app)/vouchers/actions.ts`** — PV has no English name field (per spec, out of scope); pass `''`

```ts
  const { data, error } = await supabase.rpc('issue_document', {
    p_doc_type: 'PV',
    p_booking_id: sqlNull(d.booking_id),
    p_ref_document_id: sqlNull(null),
    p_recipient_name: d.payee_name,
    p_recipient_name_en: '',
    p_recipient_phone: d.payee_phone,
    p_recipient_address: '',
    p_payment_method: d.payment_method,
    p_due_date: sqlNull(null),
    p_category: category,
    p_notes: d.notes,
    p_items: d.items,
  })
```

- [ ] **Step 2: `app/(app)/vouchers/new/page.tsx`** — the "จ่ายค่ารถตู้" prefill row needs a `detail` key now that `ItemRow` requires one

```tsx
        rows: [{ description: `ค่าจ้างรถตู้ ${booking.booking_no} ${booking.route}`, qty: '1', unit_price: String(Number(booking.van_price)), detail: '' }],
```

- [ ] **Step 3: Run the type checker**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add "app/(app)/vouchers/actions.ts" "app/(app)/vouchers/new/page.tsx"
git commit -m "feat(vouchers): pass p_recipient_name_en and item detail defaults"
```

---

### Task 20: `app/(app)/documents/[id]/page.tsx` — render the new fields on an issued document

**Files:**
- Modify: `app/(app)/documents/[id]/page.tsx`

- [ ] **Step 1: Update the `extra` condition and the `<DocumentSheet>` props**

Change the `extra` computation:

```tsx
  // DV bills the balance; the sheet needs the full price to show what the deposit already covered.
  const extra = booking && (doc.doc_type === 'RC' || doc.doc_type === 'DV')
    ? { salePrice: Number(booking.sale_price), depositNo: doc.ref?.doc_no, depositTotal: doc.ref ? doc.ref.total : undefined }
    : undefined
```

Change the `<DocumentSheet>` call's `recipient`, `booking`, and `items` props:

```tsx
          recipient={{ name: doc.recipient_name, name_en: doc.recipient_name_en, phone: doc.recipient_phone, address: doc.recipient_address }}
          booking={booking ? { booking_no: booking.booking_no, route: booking.route, trip_start: booking.trip_start, trip_end: booking.trip_end, passengers: booking.passengers, pickup_time: booking.pickup_time } : null}
          items={doc.document_items.map((i) => ({ description: i.description, detail: i.detail, qty: Number(i.qty), unit_price: Number(i.unit_price) }))}
```

- [ ] **Step 2: Run the type checker**

```bash
npx tsc --noEmit
```

Expected: no errors anywhere in the project now. If there are leftovers, they'll be in files this plan didn't anticipate touching — grep for `'DP'` / `'IV'` / `doc_type === 'IV'` / `sale_price:` (the removed `FlowBooking.sale_price`) across `app/`, `components/`, `lib/` (excluding `*.test.ts`, and excluding `lib/database.types.ts`'s legacy enum members) and resolve any hit the same way this plan resolved its own.

- [ ] **Step 3: Commit**

```bash
git add "app/(app)/documents/[id]/page.tsx"
git commit -m "feat(documents): render recipient_name_en, item detail and booking box on issued documents"
```

---

### Task 21: Full verification (required before push, per project rule)

**Files:** none — verification only.

- [ ] **Step 1: Run the full check chain in one command**

Per this repo's rule, run these chained with `&&` (not piped through `grep`, which would swallow a non-zero exit code):

```bash
npx tsc --noEmit && npx eslint . && npx vitest run && npx next build
```

Expected: all four succeed. If `next build` fails on something unrelated to this change (e.g. an unrelated pre-existing warning-as-error), investigate before proceeding — don't route around it.

- [ ] **Step 2: If everything passes, do nothing further here — do not `git push` yet.**

The migration in Tasks 1–2 must be applied by the owner (`npx supabase db push`, run by the owner in `huglao-app`) before this code is pushed, per this repo's own rule (`AGENTS.md`/`HANDOFF-backoffice.md`: "ถ้าแก้ migration ใหม่ ให้ commit ไว้ในเครื่องก่อน รอเจ้าของรัน `npx supabase db push` เสร็จแล้วค่อย push โค้ด"). Stop here and hand back to the user/owner:
  - Ask the owner to run `npx supabase db push` from `huglao-app`.
  - Once confirmed, regenerate `lib/database.types.ts` for real (Supabase MCP `generate_typescript_types`, or `npx supabase gen types typescript`) and diff it against the hand-edit from Task 3 — commit any generator-only formatting differences.
  - Only then `git push`.

---

### Task 22: Manual verification on a test booking (requires explicit go-ahead)

This project has no component-level automated tests (`vitest.config.ts` only runs `lib/**/*.test.ts`); UI changes are verified by hand on the real app, per this project's established convention (see `HANDOFF-backoffice.md`). **This step creates real rows in the production database — per this repo's rule, ask the owner before issuing anything.**

**Files:** none — manual QA only.

- [ ] **Step 1: Ask the owner for a go-ahead to issue a test `DV` and `RC` on a test booking** (e.g. a new booking named clearly as a test, or reusing the existing "ทดสอบ รถตู้" van), and to void them afterward per the existing test-data convention.

- [ ] **Step 2: Once approved, walk through:**
  - Create/open a test booking with an English customer name, a pickup time, and a passenger count.
  - Issue its `DV`: confirm the preview and the issued sheet show full price → deposit paid → balance due, the payment-method checkboxes, English name under the Thai name, dashed phone numbers, the booking box with trip dates + pickup time + passenger count, and any per-item detail text entered.
  - Issue its `RC`: confirm it still renders correctly (English name, dashed phones, item detail all present; deposit-breakdown rows unchanged).
  - Confirm `/documents` and the booking detail page show `DV`/`RC` chips and flow steps correctly (no code changes were needed there, so this doubles as a regression check).
  - Void the `RC`, confirm booking status rolls back to `deposit_paid`; void the `DV`, confirm it rolls back to `booked`.
  - Void them in the wrong order once to confirm the `'void RC first'` guard still fires with its Thai message.

- [ ] **Step 3: Report back to the user any visual issue found (e.g. the reference-image single-line "date + time" format vs. this plan's separate-line choice) before considering the feature done.**

---

## Self-review notes

- **Spec coverage:** all 6 numbered requests from the brainstorming conversation map to tasks — (1) DV merge → Tasks 1–2, 5–10, 18; (2) English name → Tasks 3, 9, 12, 13, 15–18, 20; (3) dashed phones → Tasks 4, 12; (4) booking box passengers/pickup time → Tasks 3, 8, 12, 16–18, 20; (5) per-item detail → Tasks 2–3, 9, 11–14, 18–20; (6) full price → deposit → balance on the main document → Task 12 (inherits the old `IV` block, regated to `DV`).
- **Type consistency checked:** `ItemRow.detail`/`Item.detail`/`document_items.detail` all line up; `Recipient.name_en` (document-sheet) matches `Draft.recipient.name_en` (doc-drafts) and `documentSchema.recipient_name_en`; `FlowBooking` losing `sale_price` is threaded through its one caller in Task 18.
- **No placeholders:** every step has complete, pasteable code; no "add error handling" style steps.
