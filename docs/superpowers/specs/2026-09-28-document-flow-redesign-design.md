# HUGLAO Back Office — Document Flow & Template Redesign

Date: 2026-09-28
Status: Approved in brainstorming, pending spec review
Supersedes parts of: `2026-09-13-huglao-backoffice-design.md` (document types table, data model)

## Goal

Reduce the booking document flow from 4 documents to 3 by merging the deposit
receipt (DP) and the balance invoice (IV) into one document, and bring the
printed document layout up to a reference design the owner supplied: bilingual
customer name, dashed phone numbers, passenger count, pickup time, per-line-item
detail text, and a "full price → deposit deducted → balance due" breakdown.

## Current flow vs. new flow

- Current: `DP` (deposit receipt) → `IV` (invoice for balance) → `RC` (final
  receipt) → `PV` (van hire cost)
- New: `DV` (deposit receipt **and** invoice, combined) → `RC` (final receipt)
  → `PV` (van hire cost)

`DV` is issued at the same point `DP` used to be issued (when the customer
pays the deposit). It shows the full sale price, the deposit received (with
payment method — cash/transfer, same as `DP` today), and the balance due —
i.e. it does the job `IV` used to do, immediately, instead of as a separate
later step. `RC` is unchanged: issued when the customer/van settles the
balance.

`DP` and `IV` stay in the `doc_type` enum so historical/void test rows keep
rendering, but the app never issues them again. `CR` remains retired as
before.

## Data model changes

**`documents`**
- `doc_type` enum gains `DV`.
- New column `recipient_name_en text not null default ''`.

**`document_items`**
- New column `detail text not null default ''` — free-text note rendered in
  small gray text under a line item's description. Optional, per line.

**`bookings`**
- New column `customer_name_en text not null default ''` — optional English
  name, entered once on the booking, defaults `recipient_name_en` when
  drafting a `DV`/`RC`.
- New column `pickup_time time` — optional, no default. Not shown on the
  document when null.

No changes to `vans`, `company_settings`, `staff`, `doc_counters`.

## `issue_document` RPC

- New parameters: `p_recipient_name_en text`, and each element of `p_items`
  gains an optional `detail` key (defaults to `''` when absent).
- Every check currently keyed on `doc_type = 'DP'` moves to `doc_type = 'DV'`:
  - `RC.ref_document_id` must point to an issued `DV` for the same booking
    (was: issued `DP`).
  - `DV` requires `payment_method in ('cash','transfer')` (same rule `DP` had;
    `IV`'s old "payment method must be empty" rule does not apply to `DV`).
  - Issuing `DV` moves the booking to `deposit_paid` (was: issuing `DP`).
- `IV`'s now-unused due-date handling is not carried over to `DV` — `DV` has
  no due date field, matching the "invoice payable on trip end" decision
  already made for the old `IV` (migration `20260921000000_invoice_no_due_date.sql`).

## `void_document` RPC

- Void-order guard: `if v_target.doc_type = 'DV' and RC issued for that
  booking then raise 'void RC first'` (was keyed on `DP`).
- Status-rollback branch: voiding the last issued `RC` restores
  `deposit_paid` only if a `DV` is still issued for that booking (was: `DP`).
- Voiding the last issued `DV` restores booking status to `booked` (was:
  voiding `DP`).

## `dashboard_stats` RPC

- Revenue sum changes from `doc_type in ('DP','RC')` to
  `doc_type in ('DV','RC')`.

## Application code

**`lib/doc-types.ts`**
- `BookingDocType` becomes `'DV' | 'RC'` (was `'DP' | 'IV' | 'RC'`).
- `BOOKING_DOC_TYPES` becomes `['DV', 'RC']`.
- `DOC_META.DV`: `th: 'ใบแจ้งหนี้ / ใบรับเงินมัดจำ'`, `en: 'INVOICE / DEPOSIT
  RECEIPT'`, `short: 'ใบแจ้งหนี้มัดจำ'`, `recipient: 'customer'`,
  `needsPayment: true`, `receivedFromLabel: 'ได้รับเงินจาก / Received from'`.
- `DOC_META.DP` and `DOC_META.IV` stay (unreachable from the booking flow,
  kept only so old rows still render if ever looked up directly).

**`lib/doc-flow.ts`**
- `depositHeld()` sums issued `DV` totals (was `DP`).
- `docFlow()` walks `['DV', 'RC']`. `DV` is available whenever the booking
  isn't cancelled and no `DV` is issued yet — no "deposit covers everything"
  block, since there's no longer a separate invoicing step to skip.

**`lib/doc-drafts.ts`**
- `DraftBooking` gains `customer_name_en: string` and
  `pickup_time: string | null`.
- `Draft.recipient` gains `name_en: string`.
- `case 'DV'`: same item as today's `DP` draft (deposit = commission),
  `payment_method: 'transfer'` default.
- `case 'IV'` is removed (folded into `DV`).

**`components/document-sheet.tsx`**
- `Company`/`Recipient` types gain `name_en?: string` (already exists on
  `Company`; add to `Recipient`). Renders as a second line under the Thai
  name in both the header company block and the recipient block, only when
  non-empty.
- `Item` type gains `detail?: string`. Renders as a small gray line under the
  description in the same table cell, only when non-empty.
- Booking reference box gains, after the existing trip-date-range line:
  - `เวลารับ {HH:MM} น.` when `pickup_time` is set
  - `ผู้โดยสาร {N} ท่าน` when `passengers` is set
  (each its own line; the date range line is unchanged)
- The block currently gated on `type === 'IV'` (total/deposit
  paid/balance-due breakdown, due-date box, payment-status box, terms box) is
  regated on `type === 'DV'`. Because `DV.needsPayment` is `true`, the
  existing generic payment-method checkbox block now also renders for `DV`
  (no new code needed there).
- New `formatPhone()` helper (in `lib/money.ts` or a new `lib/phone.ts`):
  strips non-digit characters first (existing data like `company.phone` is
  already stored as `'095-596-2525'`, so this must be idempotent), then
  formats a 9–10 digit result starting with `0` as `0XX-XXX-XXXX` (10 digits)
  or `0X-XXX-XXXX` (9 digits); anything else falls back to the original
  string unchanged. Applied to every phone displayed on the sheet: recipient,
  company, van.

**`components/line-items-editor.tsx`**
- `ItemRow` gains `detail: string`. Each row gets a small optional textarea
  "รายละเอียดเพิ่มเติม" under the description field.
- `rowsToItems()` includes `detail: r.detail.trim()`.

**`components/document-form.tsx`**
- New optional field "ชื่อลูกค้า (อังกฤษ)" under the Thai recipient-name
  field, shown only for `type === 'DV' || type === 'RC'`. Defaults from
  `draft.recipient.name_en`.

**`components/booking-form.tsx`**
- New optional field "ชื่อลูกค้า (อังกฤษ)" beside/under `customer_name`.
- New optional field "เวลารับ" (`<input type="time">`) beside the trip-date
  fields.

**`lib/validation.ts`**
- `bookingSchema` gains `customer_name_en: text(200)` (optional, default
  `''`) and `pickup_time` (optional `HH:MM` string or `''` → `null`).
- `documentSchema.doc_type` enum becomes `['DV', 'RC']`; gains
  `recipient_name_en: text(200)`.
- `itemSchema` gains `detail: text(300)` (optional).
- The two `payment_method` refinements that special-cased `doc_type === 'IV'`
  (exempting it from requiring a payment method) are removed: with `IV` gone
  from the flow, both `DV` and `RC` always require a payment method, so a
  single non-null check covers `documentSchema` (mirrors the RPC).

**`app/(app)/bookings/[id]/documents/new/page.tsx`**
- Passes `customer_name_en`, `pickup_time` into `buildDraft`; `extra` (sale
  price / deposit total for the breakdown block) now applies to `RC` and
  `DV` (was `RC`/`IV`).

## Not in scope (explicitly deferred)

- "จองผ่าน" (booking channel) and "เที่ยวเดียว / round trip" labels seen in
  the reference image are not requested by name and are not added — they
  read as free text the owner typed into `route` in that mockup, not new
  structured fields.
- No change to `RC`'s existing total/deposit-breakdown layout beyond what it
  already inherits from the shared component (phone format, item detail,
  passenger/pickup lines, English name).
- No backfill of `customer_name_en`/`pickup_time` for existing bookings —
  all current booking rows are test data slated for the pending cleanup
  script (see `HANDOFF-backoffice.md` → งานค้าง).

## Migration plan

One additive migration file,
`supabase/migrations/20260928000000_dv_merge.sql`, covering: enum value,
new columns (documents, document_items, bookings), `issue_document`,
`void_document`, `dashboard_stats`. Per project rule, this gets committed
locally and the owner runs `npx supabase db push` before the code that
depends on it is pushed.

## Testing

- Unit tests: `lib/doc-flow.test.ts`, `lib/doc-drafts.test.ts`,
  `lib/validation.test.ts` updated for `DV` in place of `DP`/`IV`; new test
  for `formatPhone()`.
- Manual: issue a `DV` on a test booking on production, confirm the PDF
  layout matches the reference image's intent (full price → deposit → balance,
  English name, dashed phones, passenger count, pickup time, per-item
  detail), then void it per existing test-data conventions.
