# HUGLAO Back Office — Plan 4: Vouchers, Void, Staff, Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the back office: staff record company expenses as payment vouchers (PV) with an optional slip photo; admins void any document with a reason; admins manage staff accounts from the web (add, deactivate/reactivate, reset password, change role); the dashboard shows what needs attention today and this month's money.

**Architecture:** PV reuses `issue_document` (doc_type 'PV', no booking, category required) and the existing `DocumentSheet` (payee variant, three signatures). Slip images go to a private Supabase Storage bucket `slips` behind RLS and are shown through short-lived signed URLs. Voiding calls the existing `void_document` RPC (admin only; booking status rollback already in DB) with one new guard. Staff management runs in server actions using a **server-only** Supabase admin client (`SUPABASE_SECRET_KEY`), always re-checking that the caller is an active admin. Dashboard numbers come from one security-definer RPC so every staff member sees company-wide counts.

**Tech Stack:** Next.js 16.3.5, React 19, Tailwind v4 glass, `@supabase/ssr` + `@supabase/supabase-js` (admin client), Supabase Storage, zod 4, Vitest.

**Repo:** `C:\Users\Makawat_PC\Documents\Code\huglao-app` (main → https://app.huglao.com). Supabase `ouwdzheoelqklmssfbmm`. Tag after Plan 3: `plan-3-documents`.

## Decisions (defaults — confirm with the owner before Task 1)

1. **Void a DP after its RC exists:** blocked in the DB with the message "ยกเลิกใบเสร็จยอดคงเหลือ (RC) ก่อน". Void order is always RC → DP, CR → IV, so booking status stays consistent.
2. **PV categories:** น้ำมัน, ค่าจ้าง/เงินเดือน, ค่าเช่า, ค่าโฆษณา, ค่าน้ำ/ค่าไฟ/อินเทอร์เน็ต, ค่าเดินทาง, ค่าอุปกรณ์สำนักงาน, อื่นๆ (free text when อื่นๆ). Stored as text so the list can change later.
3. **PV may optionally link to a booking** (e.g. fuel for a specific trip) — no status change.
4. **Slip:** one image (JPEG/PNG/WebP/HEIC ≤ 5 MB) per PV, uploaded before issuing; visible to the issuer and admins.
5. **Staff management needs `SUPABASE_SECRET_KEY` on Vercel** (Environment Variables → Type **Secret**, Production only). It never reaches the browser.
6. **Staff can't delete accounts** — only deactivate (keeps document history). Admins can reset a password to one they type (shown once, not stored).

## File structure

```
supabase/migrations/20260917000000_operations.sql      # void guard, slips bucket+RLS, dashboard RPC, staff email lookup
lib/database.types.ts                                   # regenerate after push
lib/pv-categories.ts (+test)                            # category list + label
lib/validation.ts (+test)                               # voucherSchema, voidSchema, staffCreateSchema, passwordSchema
lib/supabase/admin.ts                                   # server-only admin client (secret key)
lib/data/vouchers.ts, lib/data/dashboard.ts, lib/data/staff.ts
components/document-sheet.tsx                           # PV variant (payee, category, 3 signatures)
components/slip-upload.tsx                              # client upload to Storage
components/voucher-form.tsx
components/void-dialog.tsx                              # inline reason + confirm
app/(app)/vouchers/page.tsx, new/page.tsx, actions.ts
app/(app)/documents/[id]/page.tsx                       # PV support + void + slip link
app/(app)/documents/actions.ts                          # voidDocument
app/(app)/admin/staff/page.tsx, [id]/page.tsx, actions.ts
app/(app)/page.tsx                                      # dashboard
components/create-sheet.tsx, lib/nav.ts (+test)         # enable vouchers + staff
```

---

### Task 1: Migration

**File:** `supabase/migrations/20260917000000_operations.sql`

```sql
-- 1) Void order: RC before DP, CR before IV (keeps booking status consistent)
create or replace function void_document(p_document_id uuid, p_reason text) returns documents
language plpgsql security definer set search_path = public as $$
declare v_doc documents; v_target documents;
begin
  if not is_admin() then raise exception 'admin only'; end if;
  if coalesce(trim(p_reason), '') = '' then raise exception 'reason required'; end if;

  select * into v_target from documents where id = p_document_id;
  if v_target.id is null or v_target.status <> 'issued' then raise exception 'document not found or already void'; end if;
  if v_target.doc_type = 'DP' and exists (
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

-- 2) PV slip: private bucket; path = <auth uid>/<uuid>.<ext>
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('slips', 'slips', false, 5242880, array['image/jpeg','image/png','image/webp','image/heic'])
on conflict (id) do nothing;

create policy slips_insert_own on storage.objects for insert to authenticated
  with check (bucket_id = 'slips' and is_active_staff() and (storage.foldername(name))[1] = auth.uid()::text);
create policy slips_read on storage.objects for select to authenticated
  using (bucket_id = 'slips' and (is_admin() or (is_active_staff() and (storage.foldername(name))[1] = auth.uid()::text)));

-- documents.slip_path is set at issue time: allow issue_document callers to pass it
create or replace function attach_slip(p_document_id uuid, p_slip_path text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not is_active_staff() then raise exception 'not allowed'; end if;
  if p_slip_path is null or split_part(p_slip_path, '/', 1) <> auth.uid()::text then raise exception 'invalid slip path'; end if;
  update documents set slip_path = p_slip_path
   where id = p_document_id and doc_type = 'PV' and issued_by = auth.uid() and slip_path is null;
  if not found then raise exception 'cannot attach slip'; end if;
end $$;
revoke execute on function attach_slip(uuid, text) from public, anon;
grant execute on function attach_slip(uuid, text) to authenticated;

-- 3) Dashboard numbers (company-wide, any active staff)
create function dashboard_stats(p_month_start date, p_month_end date)
returns table (awaiting_deposit int, awaiting_completion int, trips_next_7_days int,
               commission_month numeric, deposits_month numeric, expenses_month numeric, bookings_month int)
language sql stable security definer set search_path = public as $$
  select
    (select count(*)::int from bookings where status = 'booked'),
    (select count(*)::int from bookings where status = 'deposit_paid'),
    (select count(*)::int from bookings where status in ('booked','deposit_paid')
        and trip_start between (now() at time zone 'Asia/Bangkok')::date and (now() at time zone 'Asia/Bangkok')::date + 7),
    (select coalesce(sum(commission),0) from bookings where status <> 'cancelled' and created_at::date between p_month_start and p_month_end),
    (select coalesce(sum(total),0) from documents where doc_type = 'DP' and status = 'issued' and issue_date between p_month_start and p_month_end),
    (select coalesce(sum(total),0) from documents where doc_type = 'PV' and status = 'issued' and issue_date between p_month_start and p_month_end),
    (select count(*)::int from bookings where created_at::date between p_month_start and p_month_end)
  where is_active_staff()
$$;
revoke execute on function dashboard_stats(date, date) from public, anon;
grant execute on function dashboard_stats(date, date) to authenticated;
```

Commit `feat(db): void order guard, PV slips bucket, dashboard stats`. **CHECKPOINT:** owner runs `npx supabase db push`; then `npm run db:types`, build, commit `chore: regenerate types`.

---

### Task 2: PV categories + validation (TDD)

- `lib/pv-categories.ts`: `PV_CATEGORIES = ['น้ำมัน','ค่าจ้าง/เงินเดือน','ค่าเช่า','ค่าโฆษณา','ค่าน้ำ/ค่าไฟ/อินเทอร์เน็ต','ค่าเดินทาง','ค่าอุปกรณ์สำนักงาน','อื่นๆ'] as const`; `resolveCategory(choice, other)` → choice, or trimmed `other` when choice is 'อื่นๆ' (throws/undefined when empty). Tests.
- `lib/validation.ts`:
  - `voucherSchema`: `payee_name` required ≤200, `payee_phone` ≤40, `category_choice` in PV_CATEGORIES, `category_other` ≤100 (required when 'อื่นๆ': 'ระบุหมวดค่าใช้จ่าย'), `booking_id` optional uuid, `payment_method` cash|transfer required, `notes` ≤500, `items` (reuse itemsSchema), `slip_path` optional string (must start with `<uuid>/`). Missing optional keys tolerated (preprocess `?? ''`, same as documentSchema). Total > 0.
  - `voidSchema`: `document_id` uuid, `reason` required 3–300 ('ระบุเหตุผลการยกเลิก').
  - `staffCreateSchema`: `employee_code` (isValidEmployeeCode rules), `full_name` 1–100, `role` admin|staff, `password` 8–72 ('รหัสผ่านอย่างน้อย 8 ตัวอักษร'), `password_confirm` equal ('รหัสผ่านไม่ตรงกัน').
  - `passwordSchema`: password + confirm as above.
- Tests for each rule. Commit `feat: PV categories and validation for vouchers, void and staff`.

### Task 3: Admin client + data access

- `lib/supabase/admin.ts`: `import 'server-only'`; `createAdminClient()` using `createClient(url, process.env.SUPABASE_SECRET_KEY!, { auth: { persistSession: false, autoRefreshToken: false } })`; throw a clear error if the key is missing ('ยังไม่ได้ตั้งค่า SUPABASE_SECRET_KEY'). Never import from client components.
- `lib/data/vouchers.ts`: `listVouchers({ q, category, month })` (documents where doc_type = 'PV'; RLS: own or admin), `getSlipUrl(path)` → `storage.from('slips').createSignedUrl(path, 300)`.
- `lib/data/dashboard.ts`: `getDashboardStats(today)` → month start/end in Asia/Bangkok → rpc `dashboard_stats`; plus `upcomingTrips(limit 5)` and `recentDocuments(limit 5)`.
- `lib/data/staff.ts`: `listStaff()` (staff table; admin RLS sees all), `getStaff(id)`.
- Commit `feat: admin client and data access for vouchers, dashboard, staff`.

### Task 4: PV on the document sheet

- `DocumentSheet`: when `type === 'PV'`: recipient label from DOC_META ('จ่ายให้ / Paid to'), show `หมวด / Category`, optional booking ref, payment method, and **three** signature lines: `ผู้จ่ายเงิน / Paid by` (issuer), `ผู้รับเงิน / Received by`, `ผู้อนุมัติ / Approved by`. No customer/van notes. Add a small "มีสลิปแนบ / Slip attached" line when a slip exists (the image itself is not printed).
- Commit `feat(documents): payment voucher layout`.

### Task 5: Voucher form, upload, pages

- `components/slip-upload.tsx` (client): file input (accept images, capture on mobile), client-side size/type check, uploads with the browser Supabase client to `slips/<userId>/<crypto.randomUUID()>.<ext>`, shows preview + "เปลี่ยนรูป"/"ลบ" (delete only the object this form uploaded), writes `slip_path` to a hidden input. Upload errors in Thai.
- `components/voucher-form.tsx`: payee name/phone, category chips (+ other text), optional booking picker (search by booking no — reuse a small server action `searchBookings(q)` returning id/booking_no/route), LineItemsEditor, payment method, notes, SlipUpload, preview (DocumentSheet PV) and inline two-step confirm (same pattern as DocumentForm); keep values on error.
- `app/(app)/vouchers/actions.ts` `issueVoucher`: voucherSchema → rpc `issue_document` with `p_doc_type 'PV'`, `p_booking_id` null or id, `p_category` resolved, `p_payment_method`, items; then if `slip_path` → rpc `attach_slip`. Errors via `lib/document-errors.ts` (+ 'category required' → 'เลือกหมวดค่าใช้จ่าย'). Redirect `/documents/{id}`.
- `app/(app)/vouchers/page.tsx`: list (month filter chips: เดือนนี้ / เดือนก่อน / ทั้งหมด, category filter, search), monthly total at top (`formatBaht`), "+ ออกใบสำคัญจ่าย". `new/page.tsx` renders the form.
- `/documents/[id]`: allow PV (remove the PV 404), show "ดูสลิป" link (signed URL, opens new tab) when slip_path set.
- Nav: remove `soon` from /vouchers (sidebar + mobile tab), enable "ออกใบสำคัญจ่าย" in the create sheet (link `/vouchers/new`). Update nav tests.
- Commit `feat(vouchers): payment vouchers with slip upload`.

### Task 6: Void (admin)

- `components/void-dialog.tsx` (client): button "ยกเลิกเอกสาร" (danger) → inline panel with reason textarea (required) + "ยืนยันยกเลิก" / "ไม่ใช่"; shows server error inline.
- `app/(app)/documents/actions.ts` `voidDocument(prev, fd)`: admin check via `getCurrentStaff()`, voidSchema, rpc `void_document`; map errors: 'void RC first' → 'ยกเลิกใบเสร็จยอดคงเหลือ (RC) ก่อน', 'void CR first' → 'ยกเลิกใบเสร็จค่านายหน้า (CR) ก่อน', 'already void' → 'เอกสารนี้ถูกยกเลิกแล้ว', 'admin only' → 'เฉพาะผู้ดูแลระบบ'; revalidate the document, its booking and lists.
- `/documents/[id]`: admins see VoidDialog in the toolbar (no-print) for issued docs; void docs show a red banner with reason, voided by, date; the sheet shows the VOID watermark (already supported).
- Document list: void pill already; add filter chip "ยกเลิกแล้ว".
- Commit `feat(documents): admin void with reason`.

### Task 7: Staff management (admin)

- `app/(app)/admin/staff/page.tsx`: admin only (notFound otherwise). Table/list: code (mono), name, role pill (ผู้ดูแลระบบ/พนักงาน), status (ใช้งาน/ปิดใช้งาน). "+ เพิ่มพนักงาน" opens an inline form (code, name, role, password, confirm).
- `app/(app)/admin/staff/[id]/page.tsx`: edit name/role, activate/deactivate (cannot deactivate or demote yourself — also the DB keeps ≥1 admin), reset password (password + confirm, shown once in a success message "ตั้งรหัสผ่านใหม่แล้ว — แจ้งพนักงานโดยตรง").
- `app/(app)/admin/staff/actions.ts` (all begin with `requireAdmin()` that throws/returns error unless the caller is an active admin):
  - `createStaff`: staffCreateSchema → admin client `auth.admin.createUser({ email: staffEmail(code), password, email_confirm: true })` → insert staff row (admin client) → on insert failure delete the auth user. Duplicate code → 'รหัสพนักงานนี้มีอยู่แล้ว'.
  - `updateStaff(id)`: name/role/active via the normal server client (RLS admin write); map `at least one active admin required` → 'ต้องมีผู้ดูแลระบบที่ใช้งานอยู่อย่างน้อย 1 คน'.
  - `resetPassword(id)`: passwordSchema → `auth.admin.updateUserById(id, { password })`.
  - Deactivation also signs the user out everywhere: `auth.admin.signOut(id)` is not available by id in all SDK versions — if not, rely on `getCurrentStaff()` redirecting inactive staff to /logout on the next request (already implemented) and note it.
- Remove `soon` from /admin/staff. Commit `feat(admin): staff management`.

### Task 8: Dashboard

- `app/(app)/page.tsx`: keep the greeting card (clear glass). Below: KPI tiles (clear glass) — รอมัดจำ (awaiting_deposit), ทริปที่ยังไม่จบ (awaiting_completion), ทริป 7 วันข้างหน้า, ค่านายหน้าเดือนนี้ (formatBaht), ค่าใช้จ่ายเดือนนี้ (PV), งานใหม่เดือนนี้; each tile links to the filtered list (`/bookings?status=booked`, `/bookings?status=deposit_paid`, `/vouchers`). Then two solid-glass panels: "ทริปที่กำลังจะมาถึง" (next 5 by trip_start, with status pill) and "เอกสารล่าสุด" (5, own or all per RLS). Empty states in Thai. Mobile: tiles 2 per row.
- Commit `feat: dashboard with today's work and this month's money`.

### Task 9: Ship and verify

- Owner adds `SUPABASE_SECRET_KEY` to Vercel (Secret, Production) and redeploys **before** testing staff management.
- `npm run build && npm test && npm run lint`, push, tag `plan-4-operations` after acceptance.
- Browser acceptance (controller, owner logged in; test data prefixed ทดสอบ):
  1. Dashboard shows counts matching the booking list.
  2. Issue a PV (ทดสอบ ค่าน้ำมัน ฿500, category น้ำมัน, with a small image slip) → PV-2609-0001 page, three signatures, "ดูสลิป" opens the image.
  3. Void RC-2609-0001 (reason "ทดสอบระบบ") → watermark + banner; booking BK-2609-0002 back to มัดจำแล้ว. Then void DP-2609-0001 → booking จองแล้ว. (Before voiding RC, voiding DP shows "ยกเลิกใบเสร็จยอดคงเหลือ (RC) ก่อน".)
  4. Add staff T001 ทดสอบ พนักงาน (role staff) → log in as T001 in a private window (owner types the password) → sees only own documents; deactivate T001 → next request logs out.
  5. Mobile: create sheet → ออกใบสำคัญจ่าย works; slip upload from phone camera.

## Self-review

- Covers the remaining spec items: PV with category, payment method and slip (Tasks 1, 2, 4, 5), admin void with reason and booking rollback (1, 6), admin staff & settings (settings done in Plan 3; staff in 7), dashboard KPIs (1, 8), mobile create sheet voucher entry (5). The DP-void-after-RC question is resolved by decision 1.
- Security: secret key only in `lib/supabase/admin.ts` (server-only) and used after `requireAdmin()`; storage RLS by folder = uid; slips attach only by their uploader; dashboard RPC requires active staff.
