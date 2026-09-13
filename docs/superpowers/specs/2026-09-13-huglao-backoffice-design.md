# HUGLAO Back Office (app.huglao.com) — Design

Date: 2026-09-13
Status: Approved in brainstorming, pending spec review

## Goal

Staff-only web app at `app.huglao.com` for issuing bilingual (Thai + English) receipts, invoices and payment vouchers for HUGLAO's van-booking brokerage business, backed by Supabase.

## Business model (drives everything)

HUGLAO brokers van trips between customers and independent van owners.

- Van owner quotes a price (e.g. ฿10,000).
- HUGLAO sells to the customer at van price + commission (default 25%, editable per booking) → ฿12,500; commission ฿2,500.
- Customer pays a deposit to HUGLAO. By default **deposit = commission**.
- Customer pays the remainder (sale price − deposit) **directly to the van** after the trip.
- When the deposit does not cover the commission (or a formal record is wanted), HUGLAO invoices the van owner for the difference and issues a receipt when paid.
- Internal company expenses are recorded with payment vouchers.

## Scope decisions

| Decision | Choice |
|---|---|
| Deployment | Separate new Next.js project (own repo), separate Vercel project, domain `app.huglao.com` via CNAME on existing huglao.com DNS |
| Backend | Supabase: Auth, Postgres, Storage (voucher slip images) |
| Language | Thai + English on every document |
| Currency | THB only, no VAT |
| Roles | `admin` and `staff` |
| Login | Employee code + password (mapped server-side to an internal Supabase Auth email, e.g. `<code>@staff.huglao.local`) |
| Document model | Documents linked to a booking (except PV, which may optionally link) |
| Commission invoicing | One invoice per trip |
| Branding | Attached HUGLAO logo; dark green + gold palette; Sarabun font |

## Document types

| Code | Name (TH / EN) | Recipient | Amount default |
|---|---|---|---|
| `DP` | ใบเสร็จรับเงินมัดจำ / Deposit Receipt | Customer | = commission |
| `RC` | ใบเสร็จรับเงิน (ยอดคงเหลือ) / Final Receipt | Customer | sale price − DP total; shows breakdown and note "paid directly to van operator" |
| `IV` | ใบแจ้งหนี้ / Invoice (commission) | Van owner | commission − deposit held; has due date + HUGLAO bank account |
| `CR` | ใบเสร็จรับเงิน (ค่านายหน้า) / Commission Receipt | Van owner | = referenced IV total |
| `PV` | ใบสำคัญจ่าย / Payment Voucher | Internal payee | entered manually; category, payment method, optional slip image |

All defaults are pre-filled and editable before issuing.

Number format: `<CODE>-<YYMM>-<NNNN>`, e.g. `DP-2609-0001`; sequence resets monthly per type, generated atomically in the database (no gaps, no duplicates). Bookings use `BK-<YYMM>-<NNNN>`.

## Data model

- `staff` — id (= auth user id), employee_code (unique), full_name, role (`admin`|`staff`), active
- `company_settings` — single row: name_th, name_en, address, tax_id, phone, bank_name, bank_account_no, bank_account_name, default_commission_pct (25)
- `customers` — name, phone, email, address
- `vans` — owner_name, plate_no, phone, bank_name, bank_account_no, notes
- `bookings` — booking_no, customer_id, van_id, route, trip_start, trip_end, passengers, van_price, commission_pct, commission, sale_price, status (`booked`|`deposit_paid`|`completed`|`cancelled`), created_by
- `documents` — doc_type, doc_no, issue_date, booking_id (nullable), ref_document_id (nullable; RC→DP, CR→IV), recipient snapshot (name, phone, address as issued), total, payment_method, due_date (IV), category (PV), slip_path (PV), notes, issued_by, status (`issued`|`void`), void_reason, voided_by, voided_at
- `document_items` — document_id, line_no, description, qty, unit_price, amount
- `doc_counters` — doc_type, period (YYMM), last_no

Recipient data is snapshotted on the document so later edits to customers/vans never change issued documents.

## Rules

- Issued documents are immutable. They cannot be deleted; only an admin can void one, with a reason. Voided PDFs render a red "ยกเลิก / VOID" watermark; the number is never reused.
- Row Level Security: staff read their own documents and all bookings/customers/vans; admin reads/writes everything; only admin manages staff and settings and voids documents.
- Booking status advances automatically: issuing DP → `deposit_paid`; issuing RC → `completed`.
- Money stored as numeric(12,2); amount-in-words rendered in Thai ("…บาทถ้วน").

## Screens

- `/login`
- `/` dashboard — bookings awaiting deposit, awaiting completion, outstanding commission invoices, recent documents
- `/bookings`, `/bookings/new`, `/bookings/[id]` — booking detail with document timeline and "next document" buttons (DP → RC → IV → CR)
- `/documents` — list/filter all documents, re-download PDF; `/documents/[id]` detail + void (admin)
- `/vouchers/new` — PV form with slip upload
- `/customers`, `/vans` — registries with search (used for autofill)
- `/admin/staff`, `/admin/settings` — admin only

Issue flow: prefilled form → preview → "ยืนยันออกเอกสาร" → number assigned → PDF opens for print/share.

## PDF

Server-side generated A4 PDF, one shared template: header with logo, company info, bilingual title, number/date; recipient block; booking reference (route/date); items table; total + Thai amount-in-words; payment method; signature lines (PV has three: payer / payee / approver). Per-type differences listed in the document types table.

## Error handling

- Number generation and document insert run in one DB transaction (Postgres function); failure leaves no gap.
- Form validation on client and server (non-negative amounts, required recipient, at least one item).
- Deactivated staff cannot log in.

## Testing

- Unit tests: commission/amount calculations, Thai amount-in-words, number formatting.
- Database tests for RLS policies and the numbering function.
- One end-to-end happy path: create booking → DP → RC → IV → CR, plus PV and an admin void.

## Out of scope (for now)

Multiple currencies, VAT/tax invoices, Lao language, monthly batched commission invoices, per-document-type permissions, emailing documents from the app, accounting reports.
