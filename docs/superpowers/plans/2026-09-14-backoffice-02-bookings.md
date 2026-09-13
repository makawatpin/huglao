# HUGLAO Back Office — Plan 2: Customers, Vans & Bookings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Staff can manage customers and vans, create a booking with the +25% pricing calculator (every price field editable), list/search/filter bookings, view a booking, edit it, and cancel it — on desktop and mobile — with the database enforcing that status only moves through documents (Plan 3) or cancellation.

**Architecture:** Server Components read through small typed data modules (`lib/data/*`); mutations are Server Actions validated with zod (`lib/validation.ts`) and return a `FormState` to `useActionState` forms. Pricing math lives in a pure, tested `recalc()`. A new migration adds booking guards (status transitions, lock pricing once a document exists, sale = van + commission) that hold even if someone calls the API directly.

**Tech Stack:** Next.js 16.3.5 App Router, React 19, Tailwind v4 (glass tokens from Plan 1), `@supabase/ssr` 0.12 + generated `Database` types, zod 4, Vitest.

**Repo:** `C:\Users\Makawat_PC\Documents\Code\huglao-app` (branch `main`, auto-deploys to https://app.huglao.com). Supabase project ref `ouwdzheoelqklmssfbmm` (already linked on this machine; Plan 1 migration applied).

**Spec:** `huglao/docs/superpowers/specs/2026-09-13-huglao-backoffice-design.md` · **Design:** `huglao/docs/design-system/glass.html`

## Before you start

- Next.js 16: read `node_modules/next/dist/docs/01-app/` guides before writing Next code. Page `params` and `searchParams` are `Promise`s (`const { id } = await params`). Server Actions use `'use server'`; call `redirect()` outside try/catch; use `revalidatePath()` after writes (`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/revalidatePath.md`).
- UI rules from the design system: clear glass (`.glass`) for navigation/greeting; **solid glass** (`.glass .glass-solid`) for anything with money or data (lists, forms, tables). Prompt weight 300 only for headings ≥ 20px. Money: `.num` (tabular), ฿ prefix in display, unit on the right inside inputs. Doc/booking numbers in `font-mono`.
- Existing pieces: `lib/money.ts` (`round2`, `calcPricing`, `bahtText`), `lib/supabase/server.ts` (`createClient()`), `lib/current-staff.ts` (`getCurrentStaff()` cached), `components/icons.tsx` (`Icon`, names in `lib/nav.ts` `IconName`), CSS classes `.glass .glass-solid .num .eyebrow .btn .btn-primary .input .nav-link`, vars `--ink --ink-2 --muted --accent --hover --ok --warn --bad --info` and `*-soft`.
- Commit trailer on every commit: `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.

## File structure (this plan)

```
supabase/migrations/20260914000000_booking_guards.sql   # notes column, guards, checks
lib/database.types.ts                                    # generated (supabase gen types)
lib/supabase/server.ts, client.ts, session.ts            # modify: add <Database> generic
lib/pricing.ts / pricing.test.ts                         # recalc() for the price editor
lib/booking-status.ts / booking-status.test.ts           # labels, tones, filter parsing
lib/validation.ts / validation.test.ts                   # zod schemas + FormState helpers
lib/data/customers.ts, vans.ts, bookings.ts, settings.ts # server-only reads
components/ui/page-header.tsx, field.tsx, status-pill.tsx, search-box.tsx, empty-state.tsx
components/customer-form.tsx, van-form.tsx               # client forms (useActionState)
components/booking-form.tsx, customer-picker.tsx, price-editor.tsx
components/create-sheet.tsx                              # mobile "สร้าง" popover
app/(app)/customers/{page,new/page,[id]/page,actions}.tsx|ts
app/(app)/vans/{page,new/page,[id]/page,actions}.tsx|ts
app/(app)/bookings/{page,new/page,[id]/page,[id]/edit/page,actions}.tsx|ts
app/globals.css                                          # modify: .pill tones, .chip
components/mobile-nav.tsx                                # modify: use CreateSheet
```

---

### Task 1: Booking guards migration

**Files:**
- Create: `supabase/migrations/20260914000000_booking_guards.sql`

Why the design looks like this: direct updates from the app run as Postgres role `authenticated`; `issue_document` (Plan 1, `SECURITY DEFINER`) runs as the function owner. The guard trigger is therefore **not** security definer so `current_user` tells the two apart. The "does this booking have documents?" lookup must bypass RLS (staff only see their own documents), so it lives in a separate security-definer helper.

- [ ] **Step 1: Write the migration**

```sql
-- Plan 2: booking notes + integrity guards

alter table bookings add column notes text not null default '';

-- sale price must always equal van price + commission (1 satang tolerance)
alter table bookings add constraint bookings_sale_matches
  check (abs(sale_price - (van_price + commission)) <= 0.01);

-- new bookings always start as 'booked'
drop policy bookings_ins on bookings;
create policy bookings_ins on bookings for insert to authenticated
  with check (is_active_staff() and created_by = auth.uid() and status = 'booked');

-- RLS-bypassing lookup used by the guard (staff can only see their own documents)
create function booking_has_documents(p_booking_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from documents where booking_id = p_booking_id and status = 'issued')
$$;
revoke execute on function booking_has_documents(uuid) from public, anon;
grant execute on function booking_has_documents(uuid) to authenticated;

-- Direct API updates (role authenticated) may only: edit details, cancel an open booking.
-- Status changes to deposit_paid/completed happen only inside issue_document (runs as owner).
create function guard_booking_update() returns trigger
language plpgsql set search_path = public as $$
begin
  if current_user <> 'authenticated' then
    return new;
  end if;
  if old.status = 'cancelled' then
    raise exception 'booking is cancelled';
  end if;
  if new.status is distinct from old.status
     and not (new.status = 'cancelled' and old.status in ('booked', 'deposit_paid')) then
    raise exception 'status can only change to cancelled from booked or deposit_paid';
  end if;
  if (new.customer_id, new.van_price, new.commission_pct, new.commission, new.sale_price)
       is distinct from (old.customer_id, old.van_price, old.commission_pct, old.commission, old.sale_price)
     and booking_has_documents(old.id) then
    raise exception 'customer and prices are locked after a document is issued';
  end if;
  return new;
end $$;
revoke execute on function guard_booking_update() from public, anon, authenticated;
create trigger bookings_guard before update on bookings
  for each row execute function guard_booking_update();
```

- [ ] **Step 2: Commit**

```bash
git add supabase/migrations/20260914000000_booking_guards.sql
git commit -m "feat(db): booking notes and integrity guards"
```

- [ ] **Step 3: CHECKPOINT — apply to the live database (human)**

The controller asks the owner to run, in PowerShell in `huglao-app`:

```powershell
npx supabase db push
```

Expected: `Applying migration 20260914000000_booking_guards.sql... Finished supabase db push.` Do not continue to Task 2 until this is done.

---

### Task 2: Generated database types

**Files:**
- Create: `lib/database.types.ts` (generated)
- Modify: `lib/supabase/server.ts`, `lib/supabase/client.ts`, `lib/supabase/session.ts`, `package.json`

- [ ] **Step 1: Add a script and generate**

In `package.json` scripts add:

```json
"db:types": "supabase gen types typescript --linked --schema public > lib/database.types.ts"
```

Run: `npm run db:types`
Expected: `lib/database.types.ts` exports `type Database` containing `bookings` with a `notes` column and functions `issue_document`, `void_document`, `booking_has_documents`.

- [ ] **Step 2: Type the clients**

In each of the three files, import the type and pass it as the generic:

```ts
import type { Database } from '@/lib/database.types'
// server.ts / session.ts:
createServerClient<Database>(...)
// client.ts:
createBrowserClient<Database>(...)
```

- [ ] **Step 3: Verify**

Run: `npm run build && npm test && npm run lint`
Expected: all pass. (If `lib/current-staff.ts` now reports a type error on `role`, it is because the generated enum is `'admin' | 'staff'` — keep `CurrentStaff['role']` as `Database['public']['Enums']['staff_role']`.)

- [ ] **Step 4: Commit**

```bash
git add lib/database.types.ts lib/supabase package.json lib/current-staff.ts
git commit -m "chore: generated Supabase types and typed clients"
```

---

### Task 3: Pricing editor math (TDD)

**Files:**
- Create: `lib/pricing.ts`, `lib/pricing.test.ts`

Rule (from the owner): commission defaults to 25% on top of the van price, but every field can be edited for negotiation. Editing van price or % recomputes commission and sale price; editing commission recomputes sale price and %; editing sale price recomputes commission and %.

- [ ] **Step 1: Write failing tests** — `lib/pricing.test.ts`

```ts
import { describe, it, expect } from 'vitest'
import { recalc, type Pricing } from './pricing'

const base: Pricing = { vanPrice: 10000, commissionPct: 25, commission: 2500, salePrice: 12500 }

describe('recalc', () => {
  it('van price change keeps % and recomputes commission + sale', () => {
    expect(recalc({ ...base, vanPrice: 8000 }, 'vanPrice')).toEqual({ vanPrice: 8000, commissionPct: 25, commission: 2000, salePrice: 10000 })
  })
  it('% change recomputes commission + sale', () => {
    expect(recalc({ ...base, commissionPct: 20 }, 'commissionPct')).toEqual({ vanPrice: 10000, commissionPct: 20, commission: 2000, salePrice: 12000 })
  })
  it('commission change recomputes sale and %', () => {
    expect(recalc({ ...base, commission: 3000 }, 'commission')).toEqual({ vanPrice: 10000, commissionPct: 30, commission: 3000, salePrice: 13000 })
  })
  it('sale price change recomputes commission and %', () => {
    expect(recalc({ ...base, salePrice: 12000 }, 'salePrice')).toEqual({ vanPrice: 10000, commissionPct: 20, commission: 2000, salePrice: 12000 })
  })
  it('rounds % to 2 decimals', () => {
    expect(recalc({ ...base, commission: 1000, vanPrice: 3000 }, 'commission').commissionPct).toBe(33.33)
  })
  it('zero van price gives 0% instead of dividing by zero', () => {
    expect(recalc({ vanPrice: 0, commissionPct: 25, commission: 500, salePrice: 0 }, 'commission')).toEqual({ vanPrice: 0, commissionPct: 0, commission: 500, salePrice: 500 })
  })
})
```

- [ ] **Step 2: Run** `npm test` → FAIL (cannot resolve `./pricing`).

- [ ] **Step 3: Implement** — `lib/pricing.ts`

```ts
import { calcPricing, round2 } from './money'

export type Pricing = { vanPrice: number; commissionPct: number; commission: number; salePrice: number }
export type PricingField = keyof Pricing

function pctOf(commission: number, vanPrice: number) {
  return vanPrice > 0 ? round2((commission / vanPrice) * 100) : 0
}

export function recalc(p: Pricing, changed: PricingField): Pricing {
  const vanPrice = round2(p.vanPrice)
  switch (changed) {
    case 'vanPrice':
    case 'commissionPct': {
      const { commission, salePrice } = calcPricing(vanPrice, p.commissionPct)
      return { vanPrice, commissionPct: round2(p.commissionPct), commission, salePrice }
    }
    case 'commission': {
      const commission = round2(p.commission)
      return { vanPrice, commissionPct: pctOf(commission, vanPrice), commission, salePrice: round2(vanPrice + commission) }
    }
    case 'salePrice': {
      const salePrice = round2(p.salePrice)
      const commission = round2(salePrice - vanPrice)
      return { vanPrice, commissionPct: pctOf(commission, vanPrice), commission, salePrice }
    }
  }
}
```

- [ ] **Step 4: Run** `npm test` → PASS.
- [ ] **Step 5: Commit** `git add lib/pricing.ts lib/pricing.test.ts && git commit -m "feat: pricing editor recalculation"`

---

### Task 4: Booking status helpers (TDD)

**Files:**
- Create: `lib/booking-status.ts`, `lib/booking-status.test.ts`

- [ ] **Step 1: Failing tests** — `lib/booking-status.test.ts`

```ts
import { describe, it, expect } from 'vitest'
import { STATUS_LABEL, STATUS_TONE, parseStatusFilter, canCancel } from './booking-status'

describe('booking status', () => {
  it('has Thai labels for every status', () => {
    expect(STATUS_LABEL).toEqual({ booked: 'จองแล้ว', deposit_paid: 'มัดจำแล้ว', completed: 'จบทริป', cancelled: 'ยกเลิก' })
  })
  it('maps statuses to design tones', () => {
    expect(STATUS_TONE).toEqual({ booked: 'info', deposit_paid: 'warn', completed: 'ok', cancelled: 'bad' })
  })
  it('parses a known filter and ignores anything else', () => {
    expect(parseStatusFilter('deposit_paid')).toBe('deposit_paid')
    expect(parseStatusFilter('nope')).toBeUndefined()
    expect(parseStatusFilter(undefined)).toBeUndefined()
    expect(parseStatusFilter(['booked'])).toBeUndefined()
  })
  it('only open bookings can be cancelled', () => {
    expect(canCancel('booked')).toBe(true)
    expect(canCancel('deposit_paid')).toBe(true)
    expect(canCancel('completed')).toBe(false)
    expect(canCancel('cancelled')).toBe(false)
  })
})
```

- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Implement** — `lib/booking-status.ts`

```ts
export const BOOKING_STATUSES = ['booked', 'deposit_paid', 'completed', 'cancelled'] as const
export type BookingStatus = (typeof BOOKING_STATUSES)[number]
export type Tone = 'info' | 'warn' | 'ok' | 'bad'

export const STATUS_LABEL: Record<BookingStatus, string> = {
  booked: 'จองแล้ว',
  deposit_paid: 'มัดจำแล้ว',
  completed: 'จบทริป',
  cancelled: 'ยกเลิก',
}

export const STATUS_TONE: Record<BookingStatus, Tone> = {
  booked: 'info',
  deposit_paid: 'warn',
  completed: 'ok',
  cancelled: 'bad',
}

export function parseStatusFilter(v: string | string[] | undefined): BookingStatus | undefined {
  return typeof v === 'string' && (BOOKING_STATUSES as readonly string[]).includes(v) ? (v as BookingStatus) : undefined
}

export function canCancel(status: BookingStatus): boolean {
  return status === 'booked' || status === 'deposit_paid'
}
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git commit -am`-style: `git add lib/booking-status* && git commit -m "feat: booking status labels, tones and filters"`

---

### Task 5: Validation schemas (TDD)

**Files:**
- Create: `lib/validation.ts`, `lib/validation.test.ts`
- Modify: `package.json` (zod)

- [ ] **Step 1: Install** `npm install zod`

- [ ] **Step 2: Failing tests** — `lib/validation.test.ts`

```ts
import { describe, it, expect } from 'vitest'
import { customerSchema, vanSchema, bookingSchema, toFormState, formDataToObject } from './validation'

const uuid = '11111111-1111-4111-8111-111111111111'

describe('customerSchema', () => {
  it('trims and requires a name', () => {
    expect(customerSchema.safeParse({ name: '  ', phone: '', email: '', address: '' }).success).toBe(false)
    expect(customerSchema.parse({ name: ' คุณวิภา ', phone: '081', email: '', address: '' }).name).toBe('คุณวิภา')
  })
  it('accepts empty email but rejects a malformed one', () => {
    expect(customerSchema.safeParse({ name: 'a', phone: '', email: 'x@', address: '' }).success).toBe(false)
  })
})

describe('vanSchema', () => {
  it('requires owner name', () => {
    expect(vanSchema.safeParse({ owner_name: '', plate_no: '', phone: '', bank_name: '', bank_account_no: '', notes: '' }).success).toBe(false)
  })
})

describe('bookingSchema', () => {
  const ok = {
    customer_id: uuid, van_id: '', route: 'อุดรธานี → วังเวียง', trip_start: '2026-09-18', trip_end: '2026-09-20',
    passengers: '8', van_price: '10000', commission_pct: '25', commission: '2500', sale_price: '12500', notes: '',
  }
  it('coerces numbers and turns empty van/passengers into null', () => {
    const b = bookingSchema.parse({ ...ok, passengers: '' })
    expect(b.van_price).toBe(10000)
    expect(b.van_id).toBeNull()
    expect(b.passengers).toBeNull()
  })
  it('rejects end date before start date', () => {
    expect(bookingSchema.safeParse({ ...ok, trip_end: '2026-09-17' }).success).toBe(false)
  })
  it('rejects sale price that is not van price + commission', () => {
    expect(bookingSchema.safeParse({ ...ok, sale_price: '13000' }).success).toBe(false)
  })
  it('rejects negative commission', () => {
    expect(bookingSchema.safeParse({ ...ok, commission: '-1', sale_price: '9999' }).success).toBe(false)
  })
})

describe('toFormState', () => {
  it('collects the first message per field', () => {
    const r = customerSchema.safeParse({ name: '', phone: '', email: 'bad', address: '' })
    if (r.success) throw new Error('expected failure')
    const s = toFormState(r.error)
    expect(Object.keys(s.fieldErrors ?? {}).sort()).toEqual(['email', 'name'])
  })
})

describe('formDataToObject', () => {
  it('turns FormData into a plain string record', () => {
    const fd = new FormData()
    fd.set('name', 'x')
    expect(formDataToObject(fd)).toEqual({ name: 'x' })
  })
})
```

- [ ] **Step 3: Run** → FAIL.

- [ ] **Step 4: Implement** — `lib/validation.ts`

```ts
import { z } from 'zod'

export type FormState = { error?: string; fieldErrors?: Record<string, string>; ok?: boolean }

export function formDataToObject(fd: FormData): Record<string, string> {
  const out: Record<string, string> = {}
  fd.forEach((v, k) => { if (typeof v === 'string') out[k] = v })
  return out
}

export function toFormState(err: z.ZodError): FormState {
  const fieldErrors: Record<string, string> = {}
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? '_')
    if (!fieldErrors[key]) fieldErrors[key] = issue.message
  }
  return { error: 'กรุณาตรวจสอบข้อมูลที่กรอก', fieldErrors }
}

const text = (max = 500) => z.string().trim().max(max, 'ยาวเกินไป')
const required = (label: string, max = 200) => z.string().trim().min(1, `กรอก${label}`).max(max, 'ยาวเกินไป')
const money = (label: string) =>
  z.coerce.number({ message: `${label}ต้องเป็นตัวเลข` }).finite().min(0, `${label}ต้องไม่ติดลบ`).max(99_999_999)
const optionalDate = z.string().trim().refine((v) => v === '' || /^\d{4}-\d{2}-\d{2}$/.test(v), 'วันที่ไม่ถูกต้อง')
  .transform((v) => (v === '' ? null : v))

export const customerSchema = z.object({
  name: required('ชื่อลูกค้า'),
  phone: text(40),
  email: z.string().trim().max(200).refine((v) => v === '' || z.email().safeParse(v).success, 'อีเมลไม่ถูกต้อง'),
  address: text(),
})

export const vanSchema = z.object({
  owner_name: required('ชื่อเจ้าของรถ'),
  plate_no: text(40),
  phone: text(40),
  bank_name: text(100),
  bank_account_no: text(40),
  notes: text(),
})

export const bookingSchema = z
  .object({
    customer_id: z.uuid('เลือกลูกค้า'),
    van_id: z.string().trim().transform((v) => (v === '' ? null : v)).pipe(z.uuid().nullable()),
    route: required('เส้นทาง', 300),
    trip_start: optionalDate,
    trip_end: optionalDate,
    passengers: z.string().trim().transform((v) => (v === '' ? null : Number(v)))
      .pipe(z.number().int('จำนวนผู้โดยสารต้องเป็นจำนวนเต็ม').min(1).max(99).nullable()),
    van_price: money('ราคารถตู้'),
    commission_pct: z.coerce.number().finite().min(0, 'เปอร์เซ็นต์ต้องไม่ติดลบ').max(1000),
    commission: money('ค่านายหน้า'),
    sale_price: money('ราคาขาย'),
    notes: text(),
  })
  .refine((b) => !b.trip_start || !b.trip_end || b.trip_end >= b.trip_start, { path: ['trip_end'], message: 'วันกลับต้องไม่ก่อนวันไป' })
  .refine((b) => Math.abs(b.sale_price - (b.van_price + b.commission)) <= 0.01, { path: ['sale_price'], message: 'ราคาขายต้องเท่ากับราคารถตู้ + ค่านายหน้า' })

export type BookingInput = z.infer<typeof bookingSchema>
```

(If zod 4 names differ in the installed version — e.g. `z.email()` / `z.uuid()` — check `node_modules/zod` and adapt; keep the tests unchanged.)

- [ ] **Step 5: Run** → PASS.
- [ ] **Step 6: Commit** `git add lib/validation* package.json package-lock.json && git commit -m "feat: zod validation for customers, vans and bookings"`

---

### Task 6: Shared UI pieces

**Files:**
- Modify: `app/globals.css`
- Create: `components/ui/page-header.tsx`, `components/ui/field.tsx`, `components/ui/status-pill.tsx`, `components/ui/search-box.tsx`, `components/ui/empty-state.tsx`

- [ ] **Step 1: CSS** — append inside `@layer components` in `app/globals.css`:

```css
  .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 500; padding: 3px 11px; border-radius: 999px; white-space: nowrap; }
  .pill::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
  .pill-info { background: var(--info-soft); color: var(--info); }
  .pill-warn { background: var(--warn-soft); color: var(--warn); }
  .pill-ok { background: var(--ok-soft); color: var(--ok); }
  .pill-bad { background: var(--bad-soft); color: var(--bad); }
  .chip { display: inline-flex; align-items: center; padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 500; border: 1.5px solid var(--glass-line); background: var(--glass); color: var(--ink-2); }
  .chip[aria-current="page"] { background: var(--glass-strong); color: var(--ink); box-shadow: 0 6px 16px -10px rgba(70,50,110,.4); }
  .btn-glass { background: var(--glass-strong); border: 1.5px solid var(--glass-line); color: var(--ink); }
  .btn-danger { background: var(--bad-soft); color: var(--bad); }
  .btn-sm { padding: .45rem 1rem; font-size: 13px; }
  .field-error { font-size: 12px; color: var(--bad); }
```

- [ ] **Step 2: Components**

`components/ui/page-header.tsx`:

```tsx
export function PageHeader({ eyebrow, title, actions }: { eyebrow?: string; title: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1 className="text-2xl font-light leading-snug">{title}</h1>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}
```

`components/ui/field.tsx`:

```tsx
export function Field({ label, name, error, hint, children }: {
  label: string; name: string; error?: string; hint?: string; children: React.ReactNode
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={name} className="text-sm font-medium" style={{ color: 'var(--ink-2)' }}>{label}</label>
      {children}
      {error ? <p id={`${name}-error`} className="field-error">{error}</p>
        : hint ? <p className="text-xs" style={{ color: 'var(--muted)' }}>{hint}</p> : null}
    </div>
  )
}
```

`components/ui/status-pill.tsx`:

```tsx
import { STATUS_LABEL, STATUS_TONE, type BookingStatus } from '@/lib/booking-status'

export function StatusPill({ status }: { status: BookingStatus }) {
  return <span className={`pill pill-${STATUS_TONE[status]}`}>{STATUS_LABEL[status]}</span>
}
```

`components/ui/search-box.tsx` (plain GET form — works without JS):

```tsx
export function SearchBox({ placeholder, defaultValue, hidden }: {
  placeholder: string; defaultValue?: string; hidden?: Record<string, string | undefined>
}) {
  return (
    <form role="search" className="glass flex items-center gap-2 rounded-full px-4 py-2">
      {Object.entries(hidden ?? {}).map(([k, v]) => (v ? <input key={k} type="hidden" name={k} value={v} /> : null))}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4 shrink-0" style={{ color: 'var(--muted)' }} aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
      <input name="q" type="search" defaultValue={defaultValue} placeholder={placeholder} aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
    </form>
  )
}
```

`components/ui/empty-state.tsx`:

```tsx
export function EmptyState({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="grid place-items-center gap-3 px-6 py-12 text-center">
      <p className="text-sm" style={{ color: 'var(--muted)' }}>{title}</p>
      {action}
    </div>
  )
}
```

- [ ] **Step 3: Verify** `npm run build && npm run lint` → pass.
- [ ] **Step 4: Commit** `git add app/globals.css components/ui && git commit -m "feat(ui): page header, field, status pill, search and empty state"`

---

### Task 7: Customers — data, actions, pages

**Files:**
- Create: `lib/data/customers.ts`, `app/(app)/customers/actions.ts`, `components/customer-form.tsx`, `app/(app)/customers/page.tsx`, `app/(app)/customers/new/page.tsx`, `app/(app)/customers/[id]/page.tsx`

- [ ] **Step 1: Data** — `lib/data/customers.ts`

```ts
import 'server-only'
import { createClient } from '@/lib/supabase/server'

const PAGE = 50

export async function listCustomers(q?: string) {
  const supabase = await createClient()
  let query = supabase.from('customers').select('id, name, phone, email').order('name').limit(PAGE)
  const term = q?.trim()
  if (term) query = query.or(`name.ilike.%${escapeLike(term)}%,phone.ilike.%${escapeLike(term)}%`)
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getCustomer(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null
  const supabase = await createClient()
  const { data, error } = await supabase.from('customers').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data
}

// PostgREST `or` filter uses commas/parentheses as syntax; strip them from user input.
export function escapeLike(s: string) {
  return s.replace(/[%_,()\\]/g, ' ').trim()
}
```

Install the guard package once: `npm install server-only`.

- [ ] **Step 2: Actions** — `app/(app)/customers/actions.ts`

```ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { customerSchema, formDataToObject, toFormState, type FormState } from '@/lib/validation'

export async function createCustomer(_prev: FormState, fd: FormData): Promise<FormState> {
  const parsed = customerSchema.safeParse(formDataToObject(fd))
  if (!parsed.success) return toFormState(parsed.error)
  const supabase = await createClient()
  const { data, error } = await supabase.from('customers').insert(parsed.data).select('id').single()
  if (error) return { error: 'บันทึกลูกค้าไม่สำเร็จ กรุณาลองใหม่' }
  revalidatePath('/customers')
  redirect(`/customers/${data.id}`)
}

export async function updateCustomer(id: string, _prev: FormState, fd: FormData): Promise<FormState> {
  const parsed = customerSchema.safeParse(formDataToObject(fd))
  if (!parsed.success) return toFormState(parsed.error)
  const supabase = await createClient()
  const { error } = await supabase.from('customers').update(parsed.data).eq('id', id)
  if (error) return { error: 'บันทึกไม่สำเร็จ กรุณาลองใหม่' }
  revalidatePath('/customers')
  revalidatePath(`/customers/${id}`)
  return { ok: true }
}
```

- [ ] **Step 3: Form** — `components/customer-form.tsx`

```tsx
'use client'

import { useActionState } from 'react'
import { Field } from '@/components/ui/field'
import type { FormState } from '@/lib/validation'

type Customer = { name: string; phone: string; email: string; address: string }

export function CustomerForm({ action, initial, submitLabel }: {
  action: (prev: FormState, fd: FormData) => Promise<FormState>
  initial?: Customer
  submitLabel: string
}) {
  const [state, formAction, pending] = useActionState(action, {})
  const e = state.fieldErrors ?? {}
  return (
    <form action={formAction} className="glass glass-solid grid gap-4 p-6">
      <Field label="ชื่อลูกค้า" name="name" error={e.name}>
        <input id="name" name="name" className="input" defaultValue={initial?.name} required aria-invalid={!!e.name} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="เบอร์โทร" name="phone" error={e.phone}>
          <input id="phone" name="phone" className="input" inputMode="tel" defaultValue={initial?.phone} />
        </Field>
        <Field label="อีเมล" name="email" error={e.email}>
          <input id="email" name="email" type="email" className="input" defaultValue={initial?.email} />
        </Field>
      </div>
      <Field label="ที่อยู่" name="address" error={e.address} hint="ใช้พิมพ์บนใบเสร็จ">
        <textarea id="address" name="address" rows={2} className="input" defaultValue={initial?.address} />
      </Field>
      {state.error && <p role="alert" className="field-error">{state.error}</p>}
      {state.ok && <p role="status" className="text-sm" style={{ color: 'var(--ok)' }}>บันทึกแล้ว</p>}
      <div><button className="btn btn-primary" disabled={pending}>{pending ? 'กำลังบันทึก…' : submitLabel}</button></div>
    </form>
  )
}
```

- [ ] **Step 4: Pages**

`app/(app)/customers/page.tsx`:

```tsx
import Link from 'next/link'
import { listCustomers } from '@/lib/data/customers'
import { PageHeader } from '@/components/ui/page-header'
import { SearchBox } from '@/components/ui/search-box'
import { EmptyState } from '@/components/ui/empty-state'

export default async function CustomersPage({ searchParams }: PageProps<'/customers'>) {
  const { q } = await searchParams
  const term = typeof q === 'string' ? q : undefined
  const customers = await listCustomers(term)
  return (
    <>
      <PageHeader eyebrow="Others" title={<>ทะเบียน<b className="font-semibold">ลูกค้า</b></>}
        actions={<Link href="/customers/new" className="btn btn-primary btn-sm">+ เพิ่มลูกค้า</Link>} />
      <div className="mb-4"><SearchBox placeholder="ค้นหาชื่อหรือเบอร์โทร…" defaultValue={term} /></div>
      <section className="glass glass-solid p-2">
        {customers.length === 0 ? (
          <EmptyState title={term ? 'ไม่พบลูกค้าที่ค้นหา' : 'ยังไม่มีลูกค้า'} />
        ) : (
          <ul>
            {customers.map((c) => (
              <li key={c.id}>
                <Link href={`/customers/${c.id}`} className="nav-link flex items-center justify-between gap-3 rounded-2xl px-4 py-3 hover:bg-[var(--hover)]">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-sm" style={{ color: 'var(--muted)' }}>{c.phone || c.email}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
```

`app/(app)/customers/new/page.tsx`:

```tsx
import { CustomerForm } from '@/components/customer-form'
import { PageHeader } from '@/components/ui/page-header'
import { createCustomer } from '../actions'

export default function NewCustomerPage() {
  return (
    <>
      <PageHeader eyebrow="ลูกค้า" title="เพิ่มลูกค้า" />
      <CustomerForm action={createCustomer} submitLabel="บันทึกลูกค้า" />
    </>
  )
}
```

`app/(app)/customers/[id]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { getCustomer } from '@/lib/data/customers'
import { CustomerForm } from '@/components/customer-form'
import { PageHeader } from '@/components/ui/page-header'
import { updateCustomer } from '../actions'

export default async function CustomerPage({ params }: PageProps<'/customers/[id]'>) {
  const { id } = await params
  const customer = await getCustomer(id)
  if (!customer) notFound()
  return (
    <>
      <PageHeader eyebrow="ลูกค้า" title={customer.name} />
      <CustomerForm action={updateCustomer.bind(null, id)} initial={customer} submitLabel="บันทึกการแก้ไข" />
    </>
  )
}
```

(`PageProps<'/route'>` is Next 16's global typed-route helper, like `LayoutProps` in Plan 1. A malformed id makes Postgres raise `invalid input syntax for type uuid`; `getCustomer` should treat that as not found — before the query, return `null` when `!/^[0-9a-f-]{36}$/i.test(id)`.)

- [ ] **Step 5: Verify** `npm run build && npm test && npm run lint` → pass.
- [ ] **Step 6: Commit** `git add -A && git commit -m "feat(customers): list, search, create and edit"`

---

### Task 8: Vans — data, actions, pages

Same pattern as Task 7 (repeat it fully; do not import from customers files except `escapeLike`).

**Files:**
- Create: `lib/data/vans.ts`, `app/(app)/vans/actions.ts`, `components/van-form.tsx`, `app/(app)/vans/page.tsx`, `app/(app)/vans/new/page.tsx`, `app/(app)/vans/[id]/page.tsx`

- [ ] **Step 1: Data** — `lib/data/vans.ts`

```ts
import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { escapeLike } from './customers'

const UUID = /^[0-9a-f-]{36}$/i

export async function listVans(q?: string) {
  const supabase = await createClient()
  let query = supabase.from('vans').select('id, owner_name, plate_no, phone').order('owner_name').limit(100)
  const term = q?.trim() ? escapeLike(q) : ''
  if (term) query = query.or(`owner_name.ilike.%${term}%,plate_no.ilike.%${term}%,phone.ilike.%${term}%`)
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getVan(id: string) {
  if (!UUID.test(id)) return null
  const supabase = await createClient()
  const { data, error } = await supabase.from('vans').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data
}
```

- [ ] **Step 2: Actions** — `app/(app)/vans/actions.ts`: identical shape to customers with `vanSchema`, table `vans`, paths `/vans`, messages `บันทึกรถตู้ไม่สำเร็จ กรุณาลองใหม่`; exports `createVan` (redirects to `/vans/${id}`) and `updateVan(id, prev, fd)`.

```ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { vanSchema, formDataToObject, toFormState, type FormState } from '@/lib/validation'

export async function createVan(_prev: FormState, fd: FormData): Promise<FormState> {
  const parsed = vanSchema.safeParse(formDataToObject(fd))
  if (!parsed.success) return toFormState(parsed.error)
  const supabase = await createClient()
  const { data, error } = await supabase.from('vans').insert(parsed.data).select('id').single()
  if (error) return { error: 'บันทึกรถตู้ไม่สำเร็จ กรุณาลองใหม่' }
  revalidatePath('/vans')
  redirect(`/vans/${data.id}`)
}

export async function updateVan(id: string, _prev: FormState, fd: FormData): Promise<FormState> {
  const parsed = vanSchema.safeParse(formDataToObject(fd))
  if (!parsed.success) return toFormState(parsed.error)
  const supabase = await createClient()
  const { error } = await supabase.from('vans').update(parsed.data).eq('id', id)
  if (error) return { error: 'บันทึกไม่สำเร็จ กรุณาลองใหม่' }
  revalidatePath('/vans')
  revalidatePath(`/vans/${id}`)
  return { ok: true }
}
```

- [ ] **Step 3: Form** — `components/van-form.tsx` (fields: ชื่อเจ้าของรถ `owner_name` required; ทะเบียนรถ `plate_no`; เบอร์โทร `phone`; ธนาคาร `bank_name`; เลขบัญชี `bank_account_no` with `inputMode="numeric"`; หมายเหตุ `notes` textarea). Use the exact structure of `CustomerForm` (solid glass form, `Field`, error/ok messages, pending label) with type `Van = { owner_name; plate_no; phone; bank_name; bank_account_no; notes }` all strings. Layout: owner_name full width; plate_no + phone in 2 columns; bank_name + bank_account_no in 2 columns; notes full width.

- [ ] **Step 4: Pages** — `/vans` (title `ทะเบียน<b>รถตู้</b>`, button `+ เพิ่มรถตู้`, search placeholder `ค้นหาชื่อ ทะเบียน หรือเบอร์โทร…`, rows show `owner_name` and `plate_no · phone`), `/vans/new` (`เพิ่มรถตู้`), `/vans/[id]` (edit, title = owner_name, `notFound()` when missing) — mirror Task 7 Step 4 code with the van names.

- [ ] **Step 5: Verify** build/test/lint → pass.
- [ ] **Step 6: Commit** `git add -A && git commit -m "feat(vans): list, search, create and edit"`

---

### Task 9: Bookings data layer

**Files:**
- Create: `lib/data/bookings.ts`, `lib/data/settings.ts`

- [ ] **Step 1:** `lib/data/settings.ts`

```ts
import 'server-only'
import { createClient } from '@/lib/supabase/server'

export async function getDefaultCommissionPct(): Promise<number> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('company_settings').select('default_commission_pct').eq('id', 1).single()
  if (error) throw error
  return Number(data.default_commission_pct)
}
```

- [ ] **Step 2:** `lib/data/bookings.ts`

```ts
import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { escapeLike } from './customers'
import type { BookingStatus } from '@/lib/booking-status'

const UUID = /^[0-9a-f-]{36}$/i
const LIST_SELECT = 'id, booking_no, route, trip_start, trip_end, sale_price, status, customers(name), vans(owner_name, plate_no)'

export async function listBookings({ status, q }: { status?: BookingStatus; q?: string }) {
  const supabase = await createClient()
  let query = supabase.from('bookings').select(LIST_SELECT).order('created_at', { ascending: false }).limit(50)
  if (status) query = query.eq('status', status)
  const term = q?.trim() ? escapeLike(q) : ''
  if (term) {
    const { data: matches } = await supabase.from('customers').select('id').ilike('name', `%${term}%`).limit(50)
    const ids = (matches ?? []).map((c) => c.id)
    const ors = [`booking_no.ilike.%${term}%`, `route.ilike.%${term}%`]
    if (ids.length) ors.push(`customer_id.in.(${ids.join(',')})`)
    query = query.or(ors.join(','))
  }
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getBooking(id: string) {
  if (!UUID.test(id)) return null
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('bookings')
    .select('*, customers(id, name, phone), vans(id, owner_name, plate_no, phone)')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return data
}

// Documents the current user may see (RLS: own docs, admins see all).
export async function listBookingDocuments(bookingId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('documents')
    .select('id, doc_type, doc_no, total, status, issue_date')
    .eq('booking_id', bookingId)
    .order('created_at')
  if (error) throw error
  return data
}

// True if ANY issued document exists (bypasses RLS via booking_has_documents()).
export async function bookingHasDocuments(bookingId: string): Promise<boolean> {
  const supabase = await createClient()
  const { data, error } = await supabase.rpc('booking_has_documents', { p_booking_id: bookingId })
  if (error) throw error
  return Boolean(data)
}
```

- [ ] **Step 3: Verify** build/lint → pass. **Commit** `git add lib/data && git commit -m "feat(bookings): data access"`

---

### Task 10: Booking actions

**Files:**
- Create: `app/(app)/bookings/actions.ts`

- [ ] **Step 1:** write

```ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCurrentStaff } from '@/lib/current-staff'
import { bookingSchema, customerSchema, formDataToObject, toFormState, type FormState } from '@/lib/validation'

// A new customer can be created inline from the booking form (new_customer_name / new_customer_phone).
async function resolveCustomerId(raw: Record<string, string>): Promise<{ id?: string; state?: FormState }> {
  if (raw.customer_id) return { id: raw.customer_id }
  const parsed = customerSchema.safeParse({ name: raw.new_customer_name ?? '', phone: raw.new_customer_phone ?? '', email: '', address: '' })
  if (!parsed.success) return { state: { error: 'เลือกลูกค้า หรือกรอกชื่อลูกค้าใหม่', fieldErrors: { customer_id: 'เลือกลูกค้า หรือกรอกชื่อลูกค้าใหม่' } } }
  const supabase = await createClient()
  const { data, error } = await supabase.from('customers').insert(parsed.data).select('id').single()
  if (error) return { state: { error: 'บันทึกลูกค้าใหม่ไม่สำเร็จ' } }
  return { id: data.id }
}

export async function createBooking(_prev: FormState, fd: FormData): Promise<FormState> {
  const staff = await getCurrentStaff()
  const raw = formDataToObject(fd)
  const precheck = bookingSchema.safeParse({ ...raw, customer_id: raw.customer_id || '00000000-0000-4000-8000-000000000000' })
  if (!precheck.success) return toFormState(precheck.error)
  const customer = await resolveCustomerId(raw)
  if (customer.state) return customer.state
  const parsed = bookingSchema.safeParse({ ...raw, customer_id: customer.id })
  if (!parsed.success) return toFormState(parsed.error)

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('bookings')
    .insert({ ...parsed.data, created_by: staff.id })
    .select('id')
    .single()
  if (error) return { error: 'บันทึกงานไม่สำเร็จ กรุณาลองใหม่' }
  revalidatePath('/bookings')
  redirect(`/bookings/${data.id}`)
}

export async function updateBooking(id: string, _prev: FormState, fd: FormData): Promise<FormState> {
  const parsed = bookingSchema.safeParse(formDataToObject(fd))
  if (!parsed.success) return toFormState(parsed.error)
  const supabase = await createClient()
  const { error } = await supabase.from('bookings').update(parsed.data).eq('id', id)
  if (error) {
    if (error.message.includes('locked')) return { error: 'แก้ลูกค้าหรือราคาไม่ได้ เพราะออกเอกสารของงานนี้แล้ว' }
    if (error.message.includes('cancelled')) return { error: 'งานนี้ถูกยกเลิกแล้ว แก้ไขไม่ได้' }
    return { error: 'บันทึกไม่สำเร็จ กรุณาลองใหม่' }
  }
  revalidatePath('/bookings')
  redirect(`/bookings/${id}`)
}

export async function cancelBooking(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id)
  if (error) throw new Error('ยกเลิกงานไม่สำเร็จ')
  revalidatePath('/bookings')
  revalidatePath(`/bookings/${id}`)
}

// Used by the customer picker (client) — returns at most 8 matches.
export async function searchCustomers(q: string) {
  const term = q.replace(/[%_,()\\]/g, ' ').trim()
  if (term.length < 1) return []
  const supabase = await createClient()
  const { data } = await supabase
    .from('customers')
    .select('id, name, phone')
    .or(`name.ilike.%${term}%,phone.ilike.%${term}%`)
    .order('name')
    .limit(8)
  return data ?? []
}
```

- [ ] **Step 2: Verify** build/lint. **Commit** `git add "app/(app)/bookings/actions.ts" && git commit -m "feat(bookings): create, update, cancel and customer search actions"`

---

### Task 11: Booking form (customer picker + price editor)

**Files:**
- Create: `components/customer-picker.tsx`, `components/price-editor.tsx`, `components/booking-form.tsx`

- [ ] **Step 1:** `components/customer-picker.tsx`

```tsx
'use client'

import { useEffect, useId, useState, useTransition } from 'react'
import { searchCustomers } from '@/app/(app)/bookings/actions'

type Option = { id: string; name: string; phone: string }

export function CustomerPicker({ initial, error, disabled }: { initial?: Option | null; error?: string; disabled?: boolean }) {
  const listId = useId()
  const [selected, setSelected] = useState<Option | null>(initial ?? null)
  const [q, setQ] = useState('')
  const [options, setOptions] = useState<Option[]>([])
  const [creating, setCreating] = useState(false)
  const [, startTransition] = useTransition()

  useEffect(() => {
    if (selected || creating || q.trim().length < 1) { setOptions([]); return }
    const t = setTimeout(() => startTransition(async () => setOptions(await searchCustomers(q))), 250)
    return () => clearTimeout(t)
  }, [q, selected, creating])

  if (selected) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3" style={{ background: 'var(--glass-strong)' }}>
        <input type="hidden" name="customer_id" value={selected.id} />
        <div><div className="font-medium">{selected.name}</div><div className="text-xs" style={{ color: 'var(--muted)' }}>{selected.phone}</div></div>
        {!disabled && <button type="button" className="btn btn-glass btn-sm" onClick={() => { setSelected(null); setQ('') }}>เปลี่ยน</button>}
      </div>
    )
  }

  if (creating) {
    return (
      <div className="grid gap-3 rounded-2xl p-4" style={{ background: 'var(--glass-strong)' }}>
        <input type="hidden" name="customer_id" value="" />
        <input name="new_customer_name" className="input" placeholder="ชื่อลูกค้าใหม่" defaultValue={q} required aria-label="ชื่อลูกค้าใหม่" />
        <input name="new_customer_phone" className="input" placeholder="เบอร์โทร" inputMode="tel" aria-label="เบอร์โทรลูกค้าใหม่" />
        <button type="button" className="btn btn-glass btn-sm justify-self-start" onClick={() => setCreating(false)}>ค้นหาลูกค้าเดิมแทน</button>
      </div>
    )
  }

  return (
    <div className="relative">
      <input type="hidden" name="customer_id" value="" />
      <input className="input" role="combobox" aria-expanded={options.length > 0} aria-controls={listId} aria-invalid={!!error}
        placeholder="พิมพ์ชื่อหรือเบอร์โทรลูกค้า…" value={q} onChange={(e) => setQ(e.target.value)} />
      {(options.length > 0 || q.trim()) && (
        <ul id={listId} role="listbox" className="glass glass-solid absolute inset-x-0 z-30 mt-2 max-h-72 overflow-auto p-1.5">
          {options.map((o) => (
            <li key={o.id} role="option" aria-selected={false}>
              <button type="button" className="nav-link w-full rounded-xl px-3 py-2 text-left hover:bg-[var(--hover)]" onClick={() => setSelected(o)}>
                <span className="font-medium">{o.name}</span> <span className="text-xs" style={{ color: 'var(--muted)' }}>{o.phone}</span>
              </button>
            </li>
          ))}
          <li>
            <button type="button" className="nav-link w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-[var(--hover)]" style={{ color: 'var(--accent)' }} onClick={() => setCreating(true)}>
              + เพิ่มลูกค้าใหม่ {q.trim() && `“${q.trim()}”`}
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
```

- [ ] **Step 2:** `components/price-editor.tsx`

```tsx
'use client'

import { useState } from 'react'
import { recalc, type Pricing, type PricingField } from '@/lib/pricing'
import { Field } from '@/components/ui/field'

const FIELDS: { key: PricingField; name: string; label: string; unit: string; hint: string }[] = [
  { key: 'vanPrice', name: 'van_price', label: 'ราคารถตู้', unit: '฿', hint: 'ราคาที่รถตู้แจ้งมา' },
  { key: 'commissionPct', name: 'commission_pct', label: 'ค่านายหน้า %', unit: '%', hint: 'แก้ได้ เผื่อต่อราคา' },
  { key: 'commission', name: 'commission', label: 'ค่านายหน้า', unit: '฿', hint: '= มัดจำเริ่มต้น' },
  { key: 'salePrice', name: 'sale_price', label: 'ราคาขายลูกค้า', unit: '฿', hint: 'ราคารถตู้ + ค่านายหน้า' },
]

export function PriceEditor({ initial, errors, locked }: { initial: Pricing; errors: Record<string, string>; locked?: boolean }) {
  const [p, setP] = useState<Pricing>(initial)
  const [draft, setDraft] = useState<Partial<Record<PricingField, string>>>({})

  function onChange(key: PricingField, value: string) {
    setDraft((d) => ({ ...d, [key]: value }))
    const n = Number(value.replace(/,/g, ''))
    if (value.trim() !== '' && Number.isFinite(n)) setP((prev) => recalc({ ...prev, [key]: n }, key))
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {FIELDS.map((f) => (
        <Field key={f.key} label={f.label} name={f.name} error={errors[f.name]} hint={f.hint}>
          <div className="relative">
            <input id={f.name} name={f.name} inputMode="decimal" className="input num pr-9 text-right font-medium"
              value={draft[f.key] ?? String(p[f.key])} readOnly={locked} aria-invalid={!!errors[f.name]}
              onChange={(e) => onChange(f.key, e.target.value)}
              onBlur={() => setDraft((d) => ({ ...d, [f.key]: undefined }))} />
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--muted)' }}>{f.unit}</span>
          </div>
        </Field>
      ))}
    </div>
  )
}
```

(The draft keeps what the user is typing, e.g. `10000.` mid-entry; on blur the field shows the recalculated value.)

- [ ] **Step 3:** `components/booking-form.tsx`

```tsx
'use client'

import { useActionState } from 'react'
import { Field } from '@/components/ui/field'
import { CustomerPicker } from '@/components/customer-picker'
import { PriceEditor } from '@/components/price-editor'
import type { FormState } from '@/lib/validation'
import type { Pricing } from '@/lib/pricing'

type Van = { id: string; owner_name: string; plate_no: string }
export type BookingFormInitial = {
  customer: { id: string; name: string; phone: string } | null
  van_id: string | null
  route: string
  trip_start: string | null
  trip_end: string | null
  passengers: number | null
  notes: string
  pricing: Pricing
}

export function BookingForm({ action, vans, initial, locked, submitLabel }: {
  action: (prev: FormState, fd: FormData) => Promise<FormState>
  vans: Van[]
  initial: BookingFormInitial
  locked?: boolean
  submitLabel: string
}) {
  const [state, formAction, pending] = useActionState(action, {})
  const e = state.fieldErrors ?? {}
  return (
    <form action={formAction} className="grid gap-5">
      <section className="glass glass-solid grid gap-4 p-6">
        <div className="eyebrow">ลูกค้าและการเดินทาง</div>
        <Field label="ลูกค้า" name="customer_id" error={e.customer_id}
          hint={locked ? 'เปลี่ยนลูกค้าไม่ได้ เพราะออกเอกสารแล้ว' : undefined}>
          <CustomerPicker initial={initial.customer} error={e.customer_id} disabled={locked} />
        </Field>
        <Field label="เส้นทาง" name="route" error={e.route}>
          <input id="route" name="route" className="input" placeholder="เช่น อุดรธานี → วังเวียง" defaultValue={initial.route} required />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="วันไป" name="trip_start" error={e.trip_start}>
            <input id="trip_start" name="trip_start" type="date" className="input" defaultValue={initial.trip_start ?? ''} />
          </Field>
          <Field label="วันกลับ" name="trip_end" error={e.trip_end}>
            <input id="trip_end" name="trip_end" type="date" className="input" defaultValue={initial.trip_end ?? ''} />
          </Field>
          <Field label="ผู้โดยสาร" name="passengers" error={e.passengers}>
            <input id="passengers" name="passengers" type="number" min={1} max={99} className="input num" defaultValue={initial.passengers ?? ''} />
          </Field>
        </div>
        <Field label="รถตู้" name="van_id" error={e.van_id} hint={vans.length === 0 ? 'ยังไม่มีรถตู้ในทะเบียน — เพิ่มได้ที่เมนูรถตู้' : undefined}>
          <select id="van_id" name="van_id" className="input" defaultValue={initial.van_id ?? ''}>
            <option value="">— ยังไม่ระบุ —</option>
            {vans.map((v) => <option key={v.id} value={v.id}>{v.owner_name}{v.plate_no ? ` · ${v.plate_no}` : ''}</option>)}
          </select>
        </Field>
      </section>

      <section className="glass glass-solid grid gap-4 p-6">
        <div className="eyebrow">ราคา</div>
        <PriceEditor initial={initial.pricing} errors={e} locked={locked} />
        {locked && <p className="text-sm" style={{ color: 'var(--muted)' }}>ราคาถูกล็อก เพราะออกเอกสารของงานนี้แล้ว</p>}
      </section>

      <section className="glass glass-solid grid gap-4 p-6">
        <Field label="หมายเหตุ" name="notes" error={e.notes}>
          <textarea id="notes" name="notes" rows={2} className="input" defaultValue={initial.notes} />
        </Field>
      </section>

      {state.error && <p role="alert" className="field-error">{state.error}</p>}
      <div className="sticky bottom-[calc(6rem+env(safe-area-inset-bottom))] md:static">
        <button className="btn btn-primary w-full md:w-auto" disabled={pending}>{pending ? 'กำลังบันทึก…' : submitLabel}</button>
      </div>
    </form>
  )
}
```

- [ ] **Step 4: Verify** build/lint → pass. **Commit** `git add components && git commit -m "feat(bookings): booking form with customer picker and price editor"`

---

### Task 12: Booking pages

**Files:**
- Create: `app/(app)/bookings/page.tsx`, `app/(app)/bookings/new/page.tsx`, `app/(app)/bookings/[id]/page.tsx`, `app/(app)/bookings/[id]/edit/page.tsx`, `app/(app)/bookings/[id]/cancel-button.tsx`

- [ ] **Step 1: List** — `app/(app)/bookings/page.tsx`

```tsx
import Link from 'next/link'
import { listBookings } from '@/lib/data/bookings'
import { BOOKING_STATUSES, STATUS_LABEL, parseStatusFilter } from '@/lib/booking-status'
import { PageHeader } from '@/components/ui/page-header'
import { SearchBox } from '@/components/ui/search-box'
import { StatusPill } from '@/components/ui/status-pill'
import { EmptyState } from '@/components/ui/empty-state'

const baht = (n: number) => `฿${n.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default async function BookingsPage({ searchParams }: PageProps<'/bookings'>) {
  const sp = await searchParams
  const status = parseStatusFilter(sp.status)
  const q = typeof sp.q === 'string' ? sp.q : undefined
  const bookings = await listBookings({ status, q })
  const href = (s?: string) => `/bookings?${new URLSearchParams({ ...(s ? { status: s } : {}), ...(q ? { q } : {}) })}`

  return (
    <>
      <PageHeader eyebrow="General" title={<>งาน / <b className="font-semibold">การจอง</b></>}
        actions={<Link href="/bookings/new" className="btn btn-primary btn-sm">+ สร้างงานใหม่</Link>} />
      <div className="mb-4 grid gap-3">
        <nav aria-label="กรองตามสถานะ" className="flex flex-wrap gap-2">
          <Link href={href()} className="chip nav-link" aria-current={!status ? 'page' : undefined}>ทั้งหมด</Link>
          {BOOKING_STATUSES.map((s) => (
            <Link key={s} href={href(s)} className="chip nav-link" aria-current={status === s ? 'page' : undefined}>{STATUS_LABEL[s]}</Link>
          ))}
        </nav>
        <SearchBox placeholder="ค้นหาเลขงาน เส้นทาง หรือชื่อลูกค้า…" defaultValue={q} hidden={{ status }} />
      </div>
      <section className="glass glass-solid p-2">
        {bookings.length === 0 ? (
          <EmptyState title={q || status ? 'ไม่พบงานที่ตรงกับเงื่อนไข' : 'ยังไม่มีงาน'}
            action={<Link href="/bookings/new" className="btn btn-primary btn-sm">+ สร้างงานใหม่</Link>} />
        ) : (
          <ul>
            {bookings.map((b) => (
              <li key={b.id}>
                <Link href={`/bookings/${b.id}`} className="nav-link grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 rounded-2xl px-4 py-3 hover:bg-[var(--hover)]">
                  <span className="font-medium">{b.customers?.name ?? '—'}</span>
                  <span className="num text-right font-semibold">{baht(Number(b.sale_price))}</span>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>
                    <span className="font-mono">{b.booking_no}</span> · {b.route}{b.trip_start ? ` · ${b.trip_start}` : ''}
                  </span>
                  <span className="justify-self-end"><StatusPill status={b.status} /></span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
```

(Move `baht` into `lib/money.ts` as `export function formatBaht(n: number)` with a test `formatBaht(12500) === '฿12,500.00'` and import it here and in Step 3 — do this first, TDD.)

- [ ] **Step 2: New** — `app/(app)/bookings/new/page.tsx`

```tsx
import { BookingForm } from '@/components/booking-form'
import { PageHeader } from '@/components/ui/page-header'
import { listVans } from '@/lib/data/vans'
import { getDefaultCommissionPct } from '@/lib/data/settings'
import { calcPricing } from '@/lib/money'
import { createBooking } from '../actions'

export default async function NewBookingPage() {
  const [vans, pct] = await Promise.all([listVans(), getDefaultCommissionPct()])
  return (
    <>
      <PageHeader eyebrow="งาน" title="สร้างงานใหม่" />
      <BookingForm action={createBooking} vans={vans} submitLabel="บันทึกงาน"
        initial={{ customer: null, van_id: null, route: '', trip_start: null, trip_end: null, passengers: null, notes: '',
          pricing: { vanPrice: 0, commissionPct: pct, ...calcPricing(0, pct) } }} />
    </>
  )
}
```

- [ ] **Step 3: Detail** — `app/(app)/bookings/[id]/page.tsx`

```tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBooking, listBookingDocuments } from '@/lib/data/bookings'
import { canCancel } from '@/lib/booking-status'
import { formatBaht } from '@/lib/money'
import { StatusPill } from '@/components/ui/status-pill'
import { CancelButton } from './cancel-button'

const STEPS = [
  { type: 'DP', label: 'ใบเสร็จมัดจำ' },
  { type: 'RC', label: 'ใบเสร็จยอดคงเหลือ' },
  { type: 'IV', label: 'ใบแจ้งหนี้รถตู้' },
  { type: 'CR', label: 'ใบเสร็จค่านายหน้า' },
] as const

export default async function BookingPage({ params }: PageProps<'/bookings/[id]'>) {
  const { id } = await params
  const booking = await getBooking(id)
  if (!booking) notFound()
  const docs = await listBookingDocuments(id)
  const open = booking.status !== 'cancelled'

  return (
    <div className="grid gap-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{booking.booking_no}</div>
          <h1 className="text-2xl font-medium leading-snug">{booking.customers?.name}</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {booking.route}{booking.trip_start ? ` · ${booking.trip_start}${booking.trip_end ? ` – ${booking.trip_end}` : ''}` : ''}
            {booking.passengers ? ` · ${booking.passengers} คน` : ''}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill status={booking.status} />
          {open && <Link href={`/bookings/${id}/edit`} className="btn btn-glass btn-sm">แก้ไข</Link>}
          {canCancel(booking.status) && <CancelButton id={id} />}
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="glass glass-solid grid gap-1 p-6">
          <div className="eyebrow mb-2">ราคา</div>
          <Row label="ราคารถตู้" value={formatBaht(Number(booking.van_price))} />
          <Row label={`ค่านายหน้า ${Number(booking.commission_pct)}%`} value={formatBaht(Number(booking.commission))} />
          <div className="mt-2 flex justify-between border-t border-dashed pt-3 font-semibold" style={{ borderColor: 'var(--hair)' }}>
            <span>ราคาขาย</span><span className="num">{formatBaht(Number(booking.sale_price))}</span>
          </div>
        </section>
        <section className="glass glass-solid grid gap-1 p-6">
          <div className="eyebrow mb-2">รถตู้</div>
          {booking.vans ? (
            <Link href={`/vans/${booking.vans.id}`} className="nav-link rounded-xl">
              <div className="font-medium">{booking.vans.owner_name}</div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>{[booking.vans.plate_no, booking.vans.phone].filter(Boolean).join(' · ')}</div>
            </Link>
          ) : <p className="text-sm" style={{ color: 'var(--muted)' }}>ยังไม่ระบุรถตู้</p>}
          {booking.notes && <p className="mt-3 text-sm" style={{ color: 'var(--ink-2)' }}>{booking.notes}</p>}
        </section>
      </div>

      <section className="glass glass-solid p-6">
        <div className="eyebrow mb-2">เอกสาร</div>
        <ul>
          {STEPS.map((s) => {
            const doc = docs.find((d) => d.doc_type === s.type && d.status === 'issued')
            return (
              <li key={s.type} className="flex items-center justify-between gap-3 border-t py-3 first:border-t-0" style={{ borderColor: 'var(--hair)' }}>
                <div>
                  <div className="font-medium">{s.label}</div>
                  <div className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{doc ? doc.doc_no : 'ยังไม่ออก'}</div>
                </div>
                {doc && <span className="num">{formatBaht(Number(doc.total))}</span>}
              </li>
            )
          })}
        </ul>
        <p className="mt-2 text-xs" style={{ color: 'var(--muted)' }}>การออกเอกสารจะเปิดใช้ในเวอร์ชันถัดไป</p>
      </section>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between text-sm"><span style={{ color: 'var(--muted)' }}>{label}</span><span className="num font-medium">{value}</span></div>
}
```

- [ ] **Step 4: Cancel button** — `app/(app)/bookings/[id]/cancel-button.tsx`

```tsx
'use client'

import { useTransition } from 'react'
import { cancelBooking } from '../actions'

export function CancelButton({ id }: { id: string }) {
  const [pending, start] = useTransition()
  return (
    <button type="button" className="btn btn-danger btn-sm" disabled={pending}
      onClick={() => { if (confirm('ยกเลิกงานนี้? ยกเลิกแล้วแก้ไขไม่ได้')) start(() => cancelBooking(id)) }}>
      {pending ? 'กำลังยกเลิก…' : 'ยกเลิกงาน'}
    </button>
  )
}
```

- [ ] **Step 5: Edit** — `app/(app)/bookings/[id]/edit/page.tsx`

```tsx
import { notFound, redirect } from 'next/navigation'
import { getBooking, bookingHasDocuments } from '@/lib/data/bookings'
import { listVans } from '@/lib/data/vans'
import { BookingForm } from '@/components/booking-form'
import { PageHeader } from '@/components/ui/page-header'
import { updateBooking } from '../../actions'

export default async function EditBookingPage({ params }: PageProps<'/bookings/[id]/edit'>) {
  const { id } = await params
  const booking = await getBooking(id)
  if (!booking) notFound()
  if (booking.status === 'cancelled') redirect(`/bookings/${id}`)
  const [vans, locked] = await Promise.all([listVans(), bookingHasDocuments(id)])
  return (
    <>
      <PageHeader eyebrow={booking.booking_no} title="แก้ไขงาน" />
      <BookingForm action={updateBooking.bind(null, id)} vans={vans} locked={locked} submitLabel="บันทึกการแก้ไข"
        initial={{
          customer: booking.customers ? { id: booking.customers.id, name: booking.customers.name, phone: booking.customers.phone } : null,
          van_id: booking.van_id, route: booking.route, trip_start: booking.trip_start, trip_end: booking.trip_end,
          passengers: booking.passengers, notes: booking.notes,
          pricing: { vanPrice: Number(booking.van_price), commissionPct: Number(booking.commission_pct), commission: Number(booking.commission), salePrice: Number(booking.sale_price) },
        }} />
    </>
  )
}
```

- [ ] **Step 6: Verify** `npm run build && npm test && npm run lint` → pass.
- [ ] **Step 7: Commit** `git add -A && git commit -m "feat(bookings): list with filters, create, detail, edit and cancel"`

---

### Task 13: Mobile create sheet

**Files:**
- Create: `components/create-sheet.tsx`
- Modify: `components/mobile-nav.tsx` (replace the centre `<Link href="/bookings/new">` with `<CreateSheet />`)

- [ ] **Step 1:** `components/create-sheet.tsx`

```tsx
'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function CreateSheet() {
  const ref = useRef<HTMLDetailsElement>(null)
  const pathname = usePathname()
  useEffect(() => { ref.current?.removeAttribute('open') }, [pathname])

  return (
    <details ref={ref} className="relative grid">
      <summary className="nav-link grid cursor-pointer list-none justify-items-center py-1.5 text-[11px] font-medium leading-snug [&::-webkit-details-marker]:hidden" style={{ color: 'var(--ink)' }}>
        <span className="grid h-6 w-[34px] place-items-center rounded-xl" style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="size-4" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        </span>
        สร้าง
      </summary>
      <div className="glass glass-solid absolute bottom-[calc(100%+12px)] left-1/2 z-50 grid w-56 -translate-x-1/2 gap-1 p-2">
        <Link href="/bookings/new" className="nav-link rounded-2xl px-3 py-2.5 text-sm font-medium hover:bg-[var(--hover)]">สร้างงานใหม่</Link>
        <span aria-disabled="true" className="rounded-2xl px-3 py-2.5 text-sm" style={{ color: 'var(--muted)' }}>ออกใบสำคัญจ่าย · เร็วๆ นี้</span>
      </div>
    </details>
  )
}
```

- [ ] **Step 2:** In `components/mobile-nav.tsx` import `CreateSheet` and replace the `{/* Plan 2 turns this into a sheet … */}` comment and the `<Link href="/bookings/new" …>…</Link>` block with `<CreateSheet />`.
- [ ] **Step 3: Verify** build/lint. **Commit** `git add components && git commit -m "feat(ui): mobile create sheet"`

---

### Task 14: Ship and verify on production

- [ ] **Step 1:** `git push` (Vercel deploys `main` to app.huglao.com).
- [ ] **Step 2 (human, ~10 min) — manual acceptance on https://app.huglao.com, desktop and phone:**
  1. รถตู้ → เพิ่มรถตู้ 1 คัน → เห็นในรายการ, ค้นหาด้วยทะเบียนเจอ
  2. ลูกค้า → เพิ่มลูกค้า → แก้ไขเบอร์ → ขึ้น "บันทึกแล้ว"
  3. สร้างงานใหม่ → พิมพ์ชื่อลูกค้าเดิมแล้วเลือก → ราคารถตู้ 10000 → เห็นค่านายหน้า 2,500 / ราคาขาย 12,500 → แก้ราคาขายเป็น 12000 → ค่านายหน้า 2,000 และ 20% → บันทึก → ได้เลข `BK-YYMM-0001`
  4. สร้างงานอีกงานโดย "เพิ่มลูกค้าใหม่" ในฟอร์ม
  5. รายการงาน → กรอง "จองแล้ว", ค้นหาด้วยชื่อลูกค้า
  6. เปิดงาน → แก้ไข → บันทึก → ยกเลิกงาน → สถานะ "ยกเลิก", ปุ่มแก้ไขหายไป
  7. มือถือ: ปุ่ม "สร้าง" เปิดเมนู → สร้างงานใหม่
- [ ] **Step 3: Guard check (SQL editor, runs as postgres so it must impersonate a staff user):**

```sql
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"<A001 user uuid>","role":"authenticated"}';
update bookings set status = 'completed' where booking_no = 'BK-2609-0001';
rollback;
```

Expected: error `status can only change to cancelled from booked or deposit_paid`.

- [ ] **Step 4:** `git tag plan-2-bookings && git push --tags`

---

## Self-review

- **Spec coverage (Plan 2 scope):** customers registry with search/autofill (T7, T11 picker), vans registry (T8), bookings with route/dates/passengers/van/pricing and default % from settings (T9–T12), +25% editable pricing with sale = van + commission enforced in UI, zod and DB (T3, T5, T1), status labels/tones per design (T4, T6), booking list filters/search (T12), detail with document timeline placeholder (T12), cancel (T10, T12), mobile create sheet (T13), glass solid panels for data (T6+). Review carry-overs from Plan 1 closed: direct status changes blocked, pricing locked after documents, new bookings forced to `booked` (T1).
- **Deferred by design:** issuing documents and PDF (Plan 3); vouchers, admin UIs, dashboard KPIs (Plan 4). Delete of customers/vans is admin-only in RLS but has no UI yet (not in spec for Plan 2).
- **Type consistency:** `FormState`, `recalc/Pricing/PricingField`, `BookingStatus`, `formatBaht` (added in T12 Step 1 before use), `escapeLike` exported from `lib/data/customers.ts` and reused; action names `createCustomer/updateCustomer/createVan/updateVan/createBooking/updateBooking/cancelBooking/searchCustomers` match their imports.
