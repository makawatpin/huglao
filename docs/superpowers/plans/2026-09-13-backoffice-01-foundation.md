# HUGLAO Back Office — Plan 1: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A deployed `app.huglao.com` where staff log in with employee code + password and land in the glass-styled app shell (sidebar on desktop, capsule bottom bar on mobile), backed by the complete Supabase schema, numbering and RLS that later plans build on.

**Architecture:** New standalone Next.js 16 App Router project (`huglao-app`, separate repo, separate Vercel project). Supabase provides Auth, Postgres and (later) Storage. All money/number rules that must be atomic live in Postgres functions (`next_doc_no`, `issue_document`, `void_document`); the app calls them via RPC. Session refresh and the login guard run in `proxy.ts` (Next 16's renamed middleware). Pure helpers (Thai amount-in-words, pricing) are unit-tested with Vitest.

**Tech Stack:** Next.js 16.x, React 19, TypeScript, Tailwind CSS v4, `@supabase/ssr` + `@supabase/supabase-js`, Supabase CLI, Vitest, `next/font/google` (Prompt, Cinzel, IBM Plex Mono).

**Spec:** `huglao/docs/superpowers/specs/2026-09-13-huglao-backoffice-design.md`
**Design reference:** `huglao/docs/design-system/glass.html`

## Roadmap (this is plan 1 of 4)

| Plan | Delivers | Depends on |
|---|---|---|
| **1. Foundation** (this file) | Project, schema + RLS + numbering functions, login, app shell, deploy | — |
| 2. Bookings | Customers, vans, bookings CRUD with pricing calculator (+25%, editable) | 1 |
| 3. Documents | DP / RC / IV / CR issue flow, preview, PDF (brand green/gold), document list | 1, 2 |
| 4. Operations | Payment vouchers + slip upload, void, admin staff & settings, dashboard KPIs, e2e test | 1–3 |

Plans 2–4 are written after plan 1 ships, so they can reference real file names.

## Before you start

- Next.js 16 differs from older versions. Before writing Next code, read the relevant guide in `huglao-app/node_modules/next/dist/docs/` — in particular `01-app/01-getting-started/16-proxy.md` (middleware is now `proxy.ts`, exported function `proxy`) and `01-app/02-guides/authentication.md` (`cookies()` is async: `await cookies()`). Page `params` are `Promise<...>`.
- Shell commands below are bash; on Windows run them in Git Bash.
- You need: Node 20+, a Supabase account, a Vercel account, and access to the DNS of `huglao.com`.

## File structure (created in this plan)

```
huglao-app/
  proxy.ts                         # session refresh + login guard
  app/
    layout.tsx                     # fonts, <html lang="th">, glass background
    globals.css                    # Tailwind + glass design tokens/classes
    login/page.tsx                 # login form (client)
    login/actions.ts               # signIn / signOut server actions
    (app)/layout.tsx               # authenticated shell: Sidebar + MobileNav
    (app)/page.tsx                 # dashboard placeholder (greeting)
  components/
    brandmark.tsx                  # stupa emblem + "HUGLAO" wordmark
    sidebar.tsx                    # desktop glass sidebar (client, active state)
    mobile-nav.tsx                 # mobile capsule bottom bar (client)
    icons.tsx                      # inline SVG icons used by nav
  lib/
    nav.ts                         # nav items + isActive()
    nav.test.ts
    money.ts                       # round2, calcPricing, bahtText
    money.test.ts
    staff-email.ts                 # employee code -> internal auth email
    staff-email.test.ts
    supabase/server.ts             # server client (cookies)
    supabase/client.ts             # browser client
    supabase/session.ts            # updateSession() used by proxy.ts
    current-staff.ts               # getCurrentStaff() for server components
  public/logo-mark.png             # copied from huglao/docs/design-system/logo-mark.png
  scripts/create-staff.mjs         # create auth user + staff row (service role)
  supabase/migrations/20260913000000_init.sql
  vitest.config.ts
  .env.local.example
```

---

### Task 1: Scaffold the project

**Files:**
- Create: `huglao-app/` (via create-next-app), `huglao-app/vitest.config.ts`, `huglao-app/.env.local.example`
- Modify: `huglao-app/package.json` (scripts)

- [ ] **Step 1: Create the app next to the existing site repo**

```bash
cd /c/Users/Makawat_PC/Documents/Code
npx create-next-app@latest huglao-app --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
cd huglao-app
```

Expected: folder `huglao-app` with `app/`, `package.json` listing `next` 16.x.

- [ ] **Step 2: Install dependencies**

```bash
npm install @supabase/ssr @supabase/supabase-js
npm install -D vitest supabase
```

- [ ] **Step 3: Add Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
  test: { environment: 'node', include: ['lib/**/*.test.ts'] },
})
```

- [ ] **Step 4: Add the test script**

In `package.json` `"scripts"` add:

```json
"test": "vitest run"
```

- [ ] **Step 5: Add env example**

Create `.env.local.example`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
# server-only, used by scripts/create-staff.mjs; never expose to the browser
SUPABASE_SECRET_KEY=sb_secret_xxx
```

- [ ] **Step 6: Verify it runs**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold huglao-app (Next 16, Tailwind, Vitest, Supabase deps)"
```

---

### Task 2: Money helpers (pricing + Thai amount in words)

**Files:**
- Create: `lib/money.ts`
- Test: `lib/money.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `lib/money.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { round2, calcPricing, bahtText } from './money'

describe('round2', () => {
  it('rounds half up to 2 decimals', () => {
    expect(round2(1.005)).toBe(1.01)
    expect(round2(2500)).toBe(2500)
  })
})

describe('calcPricing', () => {
  it('adds commission percent on top of the van price', () => {
    expect(calcPricing(10000, 25)).toEqual({ commission: 2500, salePrice: 12500 })
  })
  it('rounds commission to satang', () => {
    expect(calcPricing(3333, 25)).toEqual({ commission: 833.25, salePrice: 4166.25 })
  })
  it('handles zero percent', () => {
    expect(calcPricing(5000, 0)).toEqual({ commission: 0, salePrice: 5000 })
  })
})

describe('bahtText', () => {
  it.each([
    [0, 'ศูนย์บาทถ้วน'],
    [1, 'หนึ่งบาทถ้วน'],
    [11, 'สิบเอ็ดบาทถ้วน'],
    [21, 'ยี่สิบเอ็ดบาทถ้วน'],
    [101, 'หนึ่งร้อยเอ็ดบาทถ้วน'],
    [2500, 'สองพันห้าร้อยบาทถ้วน'],
    [12500.5, 'หนึ่งหมื่นสองพันห้าร้อยบาทห้าสิบสตางค์'],
    [0.25, 'ยี่สิบห้าสตางค์'],
    [1000001, 'หนึ่งล้านเอ็ดบาทถ้วน'],
    [21000000, 'ยี่สิบเอ็ดล้านบาทถ้วน'],
  ])('%d -> %s', (amount, words) => {
    expect(bahtText(amount)).toBe(words)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `./money`.

- [ ] **Step 3: Implement**

Create `lib/money.ts`:

```ts
export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

export function calcPricing(vanPrice: number, commissionPct: number) {
  const commission = round2((vanPrice * commissionPct) / 100)
  return { commission, salePrice: round2(vanPrice + commission) }
}

const DIGITS = ['ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า']
const PLACES = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน']

function readNumber(n: number, hasHigher = false): string {
  if (n === 0) return ''
  if (n >= 1_000_000) {
    return readNumber(Math.floor(n / 1_000_000)) + 'ล้าน' + readNumber(n % 1_000_000, true)
  }
  const s = String(n)
  let out = ''
  for (let i = 0; i < s.length; i++) {
    const d = Number(s[i])
    const place = s.length - i - 1
    if (d === 0) continue
    if (place === 0 && d === 1 && (s.length > 1 || hasHigher)) out += 'เอ็ด'
    else if (place === 1 && d === 2) out += 'ยี่'
    else if (place === 1 && d === 1) out += ''
    else out += DIGITS[d]
    out += PLACES[place]
  }
  return out
}

export function bahtText(amount: number): string {
  const satangTotal = Math.round(amount * 100)
  const baht = Math.floor(satangTotal / 100)
  const satang = satangTotal % 100
  if (baht === 0 && satang === 0) return 'ศูนย์บาทถ้วน'
  const bahtPart = baht > 0 ? readNumber(baht) + 'บาท' : ''
  return satang === 0 ? bahtPart + 'ถ้วน' : bahtPart + readNumber(satang) + 'สตางค์'
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: all `money.test.ts` tests PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/money.ts lib/money.test.ts
git commit -m "feat: add pricing and Thai baht-text helpers"
```

---

### Task 3: Employee code → internal auth email

**Files:**
- Create: `lib/staff-email.ts`
- Test: `lib/staff-email.test.ts`

- [ ] **Step 1: Write the failing test**

Create `lib/staff-email.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { staffEmail, isValidEmployeeCode } from './staff-email'

describe('staffEmail', () => {
  it('lowercases and trims the code', () => {
    expect(staffEmail('  A001 ')).toBe('a001@staff.huglao.local')
  })
})

describe('isValidEmployeeCode', () => {
  it('accepts 2-20 letters, digits, dash or underscore', () => {
    expect(isValidEmployeeCode('A001')).toBe(true)
    expect(isValidEmployeeCode('ops_2')).toBe(true)
  })
  it('rejects empty, spaces and @', () => {
    expect(isValidEmployeeCode('')).toBe(false)
    expect(isValidEmployeeCode('a b')).toBe(false)
    expect(isValidEmployeeCode('a@b')).toBe(false)
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./staff-email`.

- [ ] **Step 3: Implement**

Create `lib/staff-email.ts`:

```ts
export const STAFF_EMAIL_DOMAIN = 'staff.huglao.local'

export function isValidEmployeeCode(code: string): boolean {
  return /^[A-Za-z0-9_-]{2,20}$/.test(code.trim())
}

export function staffEmail(code: string): string {
  return `${code.trim().toLowerCase()}@${STAFF_EMAIL_DOMAIN}`
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/staff-email.ts lib/staff-email.test.ts
git commit -m "feat: map employee codes to internal auth emails"
```

---

### Task 4: Database schema, numbering, RLS

**Files:**
- Create: `supabase/migrations/20260913000000_init.sql`

- [ ] **Step 1: Create a Supabase project and link it**

In the Supabase dashboard create project `huglao-backoffice` (region: Singapore). Then:

```bash
npx supabase init
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
```

In Dashboard → Authentication → Providers → Email: turn **off** "Confirm email" and turn **off** "Allow new users to sign up" (staff are created only by the script in Task 9).

- [ ] **Step 2: Write the migration**

Create `supabase/migrations/20260913000000_init.sql`:

```sql
-- ===== Types =====
create type staff_role as enum ('admin', 'staff');
create type booking_status as enum ('booked', 'deposit_paid', 'completed', 'cancelled');
create type doc_type as enum ('DP', 'RC', 'IV', 'CR', 'PV');
create type doc_status as enum ('issued', 'void');

-- ===== Tables =====
create table staff (
  id uuid primary key references auth.users(id) on delete cascade,
  employee_code text not null unique,
  full_name text not null,
  role staff_role not null default 'staff',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table company_settings (
  id smallint primary key default 1 check (id = 1),
  name_th text not null default 'บริษัท ฮักลาว',
  name_en text not null default 'HUGLAO Co., Ltd.',
  address text not null default '',
  tax_id text not null default '',
  phone text not null default '',
  bank_name text not null default '',
  bank_account_no text not null default '',
  bank_account_name text not null default '',
  default_commission_pct numeric(5,2) not null default 25
);
insert into company_settings (id) values (1);

create table customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null default '',
  email text not null default '',
  address text not null default '',
  created_at timestamptz not null default now()
);

create table vans (
  id uuid primary key default gen_random_uuid(),
  owner_name text not null,
  plate_no text not null default '',
  phone text not null default '',
  bank_name text not null default '',
  bank_account_no text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table doc_counters (
  prefix text not null,
  period text not null,          -- YYMM, Asia/Bangkok
  last_no integer not null,
  primary key (prefix, period)
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  booking_no text not null unique,
  customer_id uuid not null references customers(id),
  van_id uuid references vans(id),
  route text not null default '',
  trip_start date,
  trip_end date,
  passengers integer,
  van_price numeric(12,2) not null check (van_price >= 0),
  commission_pct numeric(5,2) not null check (commission_pct >= 0),
  commission numeric(12,2) not null check (commission >= 0),
  sale_price numeric(12,2) not null check (sale_price >= 0),
  status booking_status not null default 'booked',
  created_by uuid not null references staff(id) default auth.uid(),
  created_at timestamptz not null default now()
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  doc_type doc_type not null,
  doc_no text not null unique,
  issue_date date not null default (now() at time zone 'Asia/Bangkok')::date,
  booking_id uuid references bookings(id),
  ref_document_id uuid references documents(id),
  recipient_name text not null,
  recipient_phone text not null default '',
  recipient_address text not null default '',
  total numeric(12,2) not null check (total >= 0),
  payment_method text,
  due_date date,
  category text,
  slip_path text,
  notes text not null default '',
  issued_by uuid not null references staff(id),
  status doc_status not null default 'issued',
  void_reason text,
  voided_by uuid references staff(id),
  voided_at timestamptz,
  created_at timestamptz not null default now(),
  check (doc_type = 'PV' or booking_id is not null)
);

create table document_items (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id) on delete cascade,
  line_no integer not null,
  description text not null,
  qty numeric(12,2) not null check (qty > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  amount numeric(12,2) not null check (amount >= 0),
  unique (document_id, line_no)
);

create index on documents (booking_id);
create index on documents (issued_by);
create index on bookings (status);

-- ===== Helpers =====
create function is_active_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from staff where id = auth.uid() and active)
$$;

create function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from staff where id = auth.uid() and active and role = 'admin')
$$;

-- Atomic, gap-free per prefix per month: e.g. DP-2609-0001
create function next_doc_no(p_prefix text) returns text
language plpgsql security definer set search_path = public as $$
declare
  v_period text := to_char(now() at time zone 'Asia/Bangkok', 'YYMM');
  v_no integer;
begin
  insert into doc_counters (prefix, period, last_no) values (p_prefix, v_period, 1)
  on conflict (prefix, period) do update set last_no = doc_counters.last_no + 1
  returning last_no into v_no;
  return p_prefix || '-' || v_period || '-' || lpad(v_no::text, 4, '0');
end $$;
revoke all on function next_doc_no(text) from public, anon, authenticated;

create function set_booking_no() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.booking_no := next_doc_no('BK');
  return new;
end $$;
create trigger bookings_set_no before insert on bookings
  for each row execute function set_booking_no();

-- Issue a document with its items in one transaction.
-- p_items: [{"description": "...", "qty": 1, "unit_price": 2500}]
create function issue_document(
  p_doc_type doc_type,
  p_booking_id uuid,
  p_ref_document_id uuid,
  p_recipient_name text,
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
begin
  if not is_active_staff() then raise exception 'not allowed'; end if;
  if coalesce(trim(p_recipient_name), '') = '' then raise exception 'recipient required'; end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'at least one item required';
  end if;
  if p_doc_type <> 'PV' and p_booking_id is null then raise exception 'booking required'; end if;

  select coalesce(sum(round((i->>'qty')::numeric * (i->>'unit_price')::numeric, 2)), 0)
    into v_total from jsonb_array_elements(p_items) i;

  insert into documents (doc_type, doc_no, booking_id, ref_document_id, recipient_name,
    recipient_phone, recipient_address, total, payment_method, due_date, category, notes, issued_by)
  values (p_doc_type, next_doc_no(p_doc_type::text), p_booking_id, p_ref_document_id,
    trim(p_recipient_name), coalesce(p_recipient_phone, ''), coalesce(p_recipient_address, ''),
    v_total, p_payment_method, p_due_date, p_category, coalesce(p_notes, ''), auth.uid())
  returning * into v_doc;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_line := v_line + 1;
    insert into document_items (document_id, line_no, description, qty, unit_price, amount)
    values (v_doc.id, v_line, v_item->>'description', (v_item->>'qty')::numeric,
      (v_item->>'unit_price')::numeric,
      round((v_item->>'qty')::numeric * (v_item->>'unit_price')::numeric, 2));
  end loop;

  if p_doc_type = 'DP' then
    update bookings set status = 'deposit_paid' where id = p_booking_id and status = 'booked';
  elsif p_doc_type = 'RC' then
    update bookings set status = 'completed' where id = p_booking_id and status <> 'cancelled';
  end if;

  return v_doc;
end $$;
grant execute on function issue_document to authenticated;

create function void_document(p_document_id uuid, p_reason text) returns documents
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
  return v_doc;
end $$;
grant execute on function void_document to authenticated;

-- ===== Row Level Security =====
alter table staff enable row level security;
alter table company_settings enable row level security;
alter table customers enable row level security;
alter table vans enable row level security;
alter table bookings enable row level security;
alter table documents enable row level security;
alter table document_items enable row level security;
alter table doc_counters enable row level security;  -- no policies: functions only

create policy staff_read on staff for select to authenticated using (is_active_staff());
create policy staff_admin_write on staff for all to authenticated using (is_admin()) with check (is_admin());

create policy settings_read on company_settings for select to authenticated using (is_active_staff());
create policy settings_admin_update on company_settings for update to authenticated using (is_admin()) with check (is_admin());

create policy customers_rw on customers for select to authenticated using (is_active_staff());
create policy customers_ins on customers for insert to authenticated with check (is_active_staff());
create policy customers_upd on customers for update to authenticated using (is_active_staff()) with check (is_active_staff());
create policy customers_del on customers for delete to authenticated using (is_admin());

create policy vans_read on vans for select to authenticated using (is_active_staff());
create policy vans_ins on vans for insert to authenticated with check (is_active_staff());
create policy vans_upd on vans for update to authenticated using (is_active_staff()) with check (is_active_staff());
create policy vans_del on vans for delete to authenticated using (is_admin());

create policy bookings_read on bookings for select to authenticated using (is_active_staff());
create policy bookings_ins on bookings for insert to authenticated with check (is_active_staff());
create policy bookings_upd on bookings for update to authenticated using (is_active_staff()) with check (is_active_staff());

-- documents: no insert/update/delete policies; writes only via issue_document / void_document
create policy documents_read on documents for select to authenticated
  using (is_admin() or (is_active_staff() and issued_by = auth.uid()));

create policy items_read on document_items for select to authenticated
  using (exists (select 1 from documents d where d.id = document_id
    and (is_admin() or (is_active_staff() and d.issued_by = auth.uid()))));
```

- [ ] **Step 3: Push the migration**

Run: `npx supabase db push`
Expected: `Applying migration 20260913000000_init.sql... Finished supabase db push.`

- [ ] **Step 4: Verify numbering in the SQL editor (Dashboard → SQL Editor, runs as postgres)**

```sql
select next_doc_no('TEST') as a, next_doc_no('TEST') as b;
```

Expected: `a = TEST-2609-0001`, `b = TEST-2609-0002` (YYMM = current month in Bangkok).

Then clean up:

```sql
delete from doc_counters where prefix = 'TEST';
```

- [ ] **Step 5: Verify RLS is on for every table**

```sql
select relname, relrowsecurity from pg_class
where relnamespace = 'public'::regnamespace and relkind = 'r' order by relname;
```

Expected: every row shows `relrowsecurity = true`.

- [ ] **Step 6: Commit**

```bash
git add supabase
git commit -m "feat(db): schema, gap-free numbering, issue/void functions, RLS"
```

---

### Task 5: Supabase clients and session proxy

**Files:**
- Create: `lib/supabase/server.ts`, `lib/supabase/client.ts`, `lib/supabase/session.ts`, `proxy.ts`
- Create: `.env.local` (not committed; copy from `.env.local.example` and fill from Dashboard → Project Settings → API)

- [ ] **Step 1: Server client**

Create `lib/supabase/server.ts`:

```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => {
          try {
            toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Called from a Server Component: cookies are read-only there; proxy.ts refreshes them.
          }
        },
      },
    },
  )
}
```

- [ ] **Step 2: Browser client**

Create `lib/supabase/client.ts`:

```ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  )
}
```

- [ ] **Step 3: Session refresh + guard**

Create `lib/supabase/session.ts`:

```ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/login']

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    },
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname
  const isPublic = PUBLIC_PATHS.some((p) => path === p || path.startsWith(p + '/'))

  if (!user && !isPublic) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  if (user && path === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
  return response
}
```

- [ ] **Step 4: Proxy entry**

Create `proxy.ts` in the project root:

```ts
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/session'

export async function proxy(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo-mark.png|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)'],
}
```

- [ ] **Step 5: Verify**

Run: `npm run dev`, open `http://localhost:3000/`.
Expected: redirected to `/login` (404 for now is fine — the page arrives in Task 7).

- [ ] **Step 6: Commit**

```bash
git add lib/supabase proxy.ts
git commit -m "feat(auth): supabase clients and session proxy with login guard"
```

---

### Task 6: Glass design tokens, fonts, root layout

**Files:**
- Modify: `app/globals.css` (replace), `app/layout.tsx` (replace)
- Create: `public/logo-mark.png`, `components/brandmark.tsx`

- [ ] **Step 1: Copy the emblem**

```bash
cp ../huglao/docs/design-system/logo-mark.png public/logo-mark.png
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-prompt), system-ui, "Segoe UI", Tahoma, sans-serif;
  --font-mono: var(--font-plex-mono), ui-monospace, Consolas, monospace;
  --font-wordmark: var(--font-cinzel), Georgia, serif;
  --color-ink: var(--ink);
  --color-ink-2: var(--ink-2);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
}

:root {
  --bg: #ECEBEF;
  --blob-1: rgba(246,178,150,.75); --blob-2: rgba(238,160,196,.7); --blob-3: rgba(196,164,240,.75);
  --glass: rgba(255,255,255,.46); --glass-strong: rgba(255,255,255,.78); --glass-solid: rgba(255,255,255,.86);
  --glass-line: rgba(255,255,255,.75); --glass-shadow: 0 24px 48px -28px rgba(70,50,110,.35);
  --ink: #1D1B26; --ink-2: #4A4757; --muted: #6F6B7D; --hair: rgba(29,27,38,.08);
  --accent: #EE6A3C; --accent-soft: rgba(238,106,60,.12);
  --ok: #1E9E6A; --ok-soft: rgba(30,158,106,.12);
  --warn: #8A6300; --warn-soft: rgba(240,190,40,.24);
  --bad: #D6404F; --bad-soft: rgba(214,64,79,.12);
  --info: #5B4BDB; --info-soft: rgba(91,75,219,.12);
  --logo-ink: #0F2A1D;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #15131C; --blob-1: rgba(200,110,80,.35); --blob-2: rgba(190,90,140,.32); --blob-3: rgba(120,90,200,.4);
    --glass: rgba(40,36,54,.5); --glass-strong: rgba(58,52,76,.8); --glass-solid: rgba(34,31,46,.9);
    --glass-line: rgba(255,255,255,.1); --glass-shadow: 0 24px 48px -28px rgba(0,0,0,.7);
    --ink: #F1EFF7; --ink-2: #C9C5D6; --muted: #9C97AE; --hair: rgba(255,255,255,.08);
    --accent: #FF8A5C; --ok: #4CCB94; --warn: #F0C452; --bad: #FF7482; --info: #9D90FF;
    --logo-ink: #F1EFF7;
  }
}

body {
  color: var(--ink);
  font-family: var(--font-sans);
  background:
    radial-gradient(40% 35% at 12% 100%, var(--blob-1), transparent 70%),
    radial-gradient(38% 32% at 55% 105%, var(--blob-2), transparent 70%),
    radial-gradient(40% 38% at 95% 90%, var(--blob-3), transparent 70%),
    radial-gradient(30% 25% at 90% 10%, var(--blob-3), transparent 75%),
    var(--bg);
  background-attachment: fixed;
  min-height: 100dvh;
}

@layer components {
  /* Clear glass: navigation, search, greeting, KPI, mobile bar */
  .glass {
    background: var(--glass);
    backdrop-filter: blur(22px) saturate(1.5);
    -webkit-backdrop-filter: blur(22px) saturate(1.5);
    border: 1.5px solid var(--glass-line);
    border-radius: 28px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.55), var(--glass-shadow);
  }
  /* Solid glass: anything showing money or data */
  .glass-solid { background: var(--glass-solid); }
  .num { font-variant-numeric: tabular-nums; }
  .eyebrow { font-size: 11.5px; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; border-radius: 999px; padding: .7rem 1.4rem; font-weight: 500; font-size: 14px; transition: transform .15s; }
  .btn:focus-visible { outline: 3px solid var(--accent-soft); outline-offset: 2px; }
  .btn-primary { background: var(--ink); color: var(--bg); box-shadow: 0 12px 22px -12px rgba(29,27,38,.6); }
  .btn-primary:hover { transform: translateY(-1px); }
  .btn-primary:disabled { opacity: .5; transform: none; }
  .input { width: 100%; border-radius: 16px; padding: .7rem .9rem; font-size: 15px; color: var(--ink); background: var(--glass-strong); border: 1.5px solid var(--glass-line); }
  .input:focus-visible { outline: 3px solid var(--accent-soft); outline-offset: 2px; }
}
```

- [ ] **Step 3: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Prompt, Cinzel, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const prompt = Prompt({ subsets: ['thai', 'latin'], weight: ['300', '400', '500', '600'], variable: '--font-prompt' })
const cinzel = Cinzel({ subsets: ['latin'], weight: ['600'], variable: '--font-cinzel' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-plex-mono' })

export const metadata: Metadata = {
  title: 'HUGLAO Back Office',
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${prompt.variable} ${cinzel.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Brandmark component**

Create `components/brandmark.tsx`:

```tsx
import Image from 'next/image'

export function Brandmark({ size = 16 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2" style={{ fontSize: size, color: 'var(--logo-ink)' }}>
      <Image src="/logo-mark.png" alt="" width={Math.round(size * 2.4)} height={Math.round(size * 1.9)} priority />
      <b style={{ fontFamily: 'var(--font-wordmark)', fontWeight: 600, letterSpacing: '.16em' }}>HUGLAO</b>
    </span>
  )
}
```

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css app/layout.tsx components/brandmark.tsx public/logo-mark.png
git commit -m "feat(ui): glass design tokens, Prompt/Cinzel/Plex fonts, brandmark"
```

---

### Task 7: Login page

**Files:**
- Create: `app/login/actions.ts`, `app/login/page.tsx`

- [ ] **Step 1: Server actions**

Create `app/login/actions.ts`:

```ts
'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isValidEmployeeCode, staffEmail } from '@/lib/staff-email'

export type LoginState = { error?: string }

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const code = String(formData.get('code') ?? '')
  const password = String(formData.get('password') ?? '')

  if (!isValidEmployeeCode(code) || password.length === 0) {
    return { error: 'กรอกรหัสพนักงานและรหัสผ่านให้ครบ' }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email: staffEmail(code), password })
  if (error || !data.user) {
    return { error: 'รหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง' }
  }

  const { data: staff } = await supabase.from('staff').select('active').eq('id', data.user.id).maybeSingle()
  if (!staff?.active) {
    await supabase.auth.signOut()
    return { error: 'บัญชีนี้ถูกปิดใช้งาน ติดต่อผู้ดูแลระบบ' }
  }

  redirect('/')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
```

- [ ] **Step 2: Login page**

Create `app/login/page.tsx`:

```tsx
'use client'

import { useActionState } from 'react'
import { signIn, type LoginState } from './actions'
import { Brandmark } from '@/components/brandmark'

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn, {})

  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <form action={action} className="glass w-full max-w-sm p-8 grid gap-5">
        <Brandmark size={18} />
        <div>
          <h1 className="text-2xl font-light">ยินดีต้อนรับ <b className="font-semibold">กลับมา</b></h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>เข้าสู่ระบบหลังบ้าน app.huglao.com</p>
        </div>
        <label className="grid gap-1.5 text-sm font-medium" style={{ color: 'var(--ink-2)' }}>
          รหัสพนักงาน
          <input name="code" className="input" autoComplete="username" autoCapitalize="characters" required />
        </label>
        <label className="grid gap-1.5 text-sm font-medium" style={{ color: 'var(--ink-2)' }}>
          รหัสผ่าน
          <input name="password" type="password" className="input" autoComplete="current-password" required />
        </label>
        {state.error && (
          <p role="alert" className="rounded-2xl px-4 py-2 text-sm" style={{ background: 'var(--bad-soft)', color: 'var(--bad)' }}>
            {state.error}
          </p>
        )}
        <button className="btn btn-primary" disabled={pending}>
          {pending ? 'กำลังเข้าสู่ระบบ…' : 'เข้าสู่ระบบ'}
        </button>
      </form>
    </main>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run dev`, open `http://localhost:3000/login`, submit `X001` / `wrong`.
Expected: glass card renders; red message "รหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง".

- [ ] **Step 4: Commit**

```bash
git add app/login
git commit -m "feat(auth): employee-code login page and sign-out action"
```

---

### Task 8: Navigation config

**Files:**
- Create: `lib/nav.ts`
- Test: `lib/nav.test.ts`

- [ ] **Step 1: Write the failing test**

Create `lib/nav.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { isActive, SIDEBAR_GENERAL, MOBILE_TABS } from './nav'

describe('isActive', () => {
  it('matches the dashboard only exactly', () => {
    expect(isActive('/', '/')).toBe(true)
    expect(isActive('/bookings', '/')).toBe(false)
  })
  it('matches a section and its sub-pages', () => {
    expect(isActive('/bookings', '/bookings')).toBe(true)
    expect(isActive('/bookings/123', '/bookings')).toBe(true)
    expect(isActive('/bookingsx', '/bookings')).toBe(false)
  })
})

describe('nav config', () => {
  it('mobile bar has 4 destinations around the create button', () => {
    expect(MOBILE_TABS.map((t) => t.href)).toEqual(['/', '/bookings', '/documents', '/vouchers'])
  })
  it('sidebar general section starts with the dashboard', () => {
    expect(SIDEBAR_GENERAL[0].href).toBe('/')
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./nav`.

- [ ] **Step 3: Implement**

Create `lib/nav.ts`:

```ts
export type IconName = 'grid' | 'van' | 'doc' | 'wallet' | 'user' | 'car' | 'settings' | 'users'
export type NavItem = { href: string; label: string; icon: IconName; adminOnly?: boolean }

export const SIDEBAR_GENERAL: NavItem[] = [
  { href: '/', label: 'แดชบอร์ด', icon: 'grid' },
  { href: '/bookings', label: 'งาน / การจอง', icon: 'van' },
  { href: '/documents', label: 'เอกสาร', icon: 'doc' },
  { href: '/vouchers', label: 'ใบสำคัญจ่าย', icon: 'wallet' },
]

export const SIDEBAR_OTHERS: NavItem[] = [
  { href: '/customers', label: 'ลูกค้า', icon: 'user' },
  { href: '/vans', label: 'รถตู้', icon: 'car' },
  { href: '/admin/staff', label: 'พนักงาน', icon: 'users', adminOnly: true },
  { href: '/admin/settings', label: 'ตั้งค่าบริษัท', icon: 'settings', adminOnly: true },
]

export const MOBILE_TABS: NavItem[] = [
  { href: '/', label: 'หน้าหลัก', icon: 'grid' },
  { href: '/bookings', label: 'งาน', icon: 'van' },
  { href: '/documents', label: 'เอกสาร', icon: 'doc' },
  { href: '/vouchers', label: 'จ่าย', icon: 'wallet' },
]

export function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/nav.ts lib/nav.test.ts
git commit -m "feat(ui): navigation config and active-route matcher"
```

---

### Task 9: App shell (sidebar, mobile bar, current staff, dashboard placeholder)

**Files:**
- Create: `components/icons.tsx`, `components/sidebar.tsx`, `components/mobile-nav.tsx`, `lib/current-staff.ts`, `app/(app)/layout.tsx`, `app/(app)/page.tsx`
- Delete: `app/page.tsx` (the create-next-app starter page; `app/(app)/page.tsx` now owns `/`)

- [ ] **Step 1: Icons**

Create `components/icons.tsx`:

```tsx
import type { IconName } from '@/lib/nav'

const PATHS: Record<IconName, React.ReactNode> = {
  grid: <><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="8" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /><rect x="13" y="13" width="8" height="8" rx="2" /></>,
  van: <><path d="M3 13h18l-2-6H5z" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></>,
  doc: <><path d="M6 3h9l4 4v14H6z" /><path d="M9 12h7M9 16h5" /></>,
  wallet: <><path d="M4 7h16v12H4z" /><path d="M4 11h16M15 15h2" /></>,
  user: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3 3-5 6-5s6 2 6 5" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3 3-5 6-5s6 2 6 5" /><path d="M16 5a3 3 0 010 6M18 15c2 .6 3 2.3 3 5" /></>,
  car: <><rect x="3" y="6" width="18" height="11" rx="3" /><path d="M3 11h18" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" /></>,
}

export function Icon({ name, className = 'size-[18px]' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden="true">
      {PATHS[name]}
    </svg>
  )
}
```

- [ ] **Step 2: Current staff helper**

Create `lib/current-staff.ts`:

```ts
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type CurrentStaff = { id: string; employee_code: string; full_name: string; role: 'admin' | 'staff' }

export async function getCurrentStaff(): Promise<CurrentStaff> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data } = await supabase
    .from('staff')
    .select('id, employee_code, full_name, role, active')
    .eq('id', user.id)
    .maybeSingle()
  if (!data?.active) redirect('/login')
  return { id: data.id, employee_code: data.employee_code, full_name: data.full_name, role: data.role }
}
```

- [ ] **Step 3: Sidebar**

Create `components/sidebar.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SIDEBAR_GENERAL, SIDEBAR_OTHERS, isActive, type NavItem } from '@/lib/nav'
import { Icon } from './icons'
import { Brandmark } from './brandmark'
import { signOut } from '@/app/login/actions'

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActive(pathname, item.href)
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors hover:bg-white/35"
      style={active
        ? { background: 'var(--glass-strong)', color: 'var(--ink)', fontWeight: 500, boxShadow: '0 8px 18px -12px rgba(70,50,110,.45)' }
        : { color: 'var(--ink-2)' }}
    >
      <span style={{ color: active ? 'var(--accent)' : undefined }}><Icon name={item.icon} /></span>
      {item.label}
    </Link>
  )
}

export function Sidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname()
  const others = SIDEBAR_OTHERS.filter((i) => !i.adminOnly || isAdmin)
  return (
    <nav aria-label="เมนูหลัก" className="glass sticky top-4 hidden h-[calc(100dvh-2rem)] w-60 shrink-0 flex-col gap-1 p-4 md:flex">
      <div className="mb-6 px-2"><Brandmark size={16} /></div>
      <div className="eyebrow mb-1 px-3">General</div>
      {SIDEBAR_GENERAL.map((i) => <NavLink key={i.href} item={i} pathname={pathname} />)}
      <div className="eyebrow mb-1 mt-5 px-3">Others</div>
      {others.map((i) => <NavLink key={i.href} item={i} pathname={pathname} />)}
      <form action={signOut} className="mt-auto">
        <button className="w-full rounded-2xl px-3 py-2.5 text-left text-sm hover:bg-white/35" style={{ color: 'var(--ink-2)' }}>
          ออกจากระบบ
        </button>
      </form>
    </nav>
  )
}
```

- [ ] **Step 4: Mobile bottom bar**

Create `components/mobile-nav.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MOBILE_TABS, isActive, type NavItem } from '@/lib/nav'
import { Icon } from './icons'

function Tab({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActive(pathname, item.href)
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className="grid justify-items-center rounded-[20px] py-1.5 text-[11px] font-medium leading-snug transition-colors"
      style={active
        ? { background: 'var(--glass-strong)', color: 'var(--ink)', boxShadow: '0 8px 16px -10px rgba(70,50,110,.5)' }
        : { color: 'var(--muted)' }}
    >
      <span style={{ color: active ? 'var(--accent)' : undefined }}><Icon name={item.icon} className="size-[19px]" /></span>
      {item.label}
    </Link>
  )
}

export function MobileNav() {
  const pathname = usePathname()
  const [home, bookings, documents, vouchers] = MOBILE_TABS
  return (
    <nav aria-label="เมนูหลัก" className="glass fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 gap-0.5 rounded-[26px] p-1.5 md:hidden">
      <Tab item={home} pathname={pathname} />
      <Tab item={bookings} pathname={pathname} />
      {/* Plan 2 turns this into a sheet: สร้างงานใหม่ / ออกใบสำคัญจ่าย */}
      <Link href="/bookings/new" aria-label="สร้าง" className="grid justify-items-center py-1.5 text-[11px] font-medium leading-snug" style={{ color: 'var(--ink)' }}>
        <span className="grid h-6 w-[34px] place-items-center rounded-xl" style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="size-4" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        </span>
        สร้าง
      </Link>
      <Tab item={documents} pathname={pathname} />
      <Tab item={vouchers} pathname={pathname} />
    </nav>
  )
}
```

- [ ] **Step 5: Authenticated layout**

Create `app/(app)/layout.tsx`:

```tsx
import { Sidebar } from '@/components/sidebar'
import { MobileNav } from '@/components/mobile-nav'
import { getCurrentStaff } from '@/lib/current-staff'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const staff = await getCurrentStaff()
  return (
    <div className="mx-auto flex max-w-7xl gap-5 p-4 pb-28 md:pb-4">
      <Sidebar isAdmin={staff.role === 'admin'} />
      <main className="min-w-0 flex-1">{children}</main>
      <MobileNav />
    </div>
  )
}
```

- [ ] **Step 6: Dashboard placeholder**

Delete the starter page, then create `app/(app)/page.tsx`:

```bash
rm app/page.tsx
```

```tsx
import { getCurrentStaff } from '@/lib/current-staff'

function greeting(now: Date) {
  const hour = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Asia/Bangkok' }).format(now))
  if (hour < 12) return 'สวัสดีตอนเช้า'
  if (hour < 17) return 'สวัสดีตอนบ่าย'
  return 'สวัสดีตอนเย็น'
}

export default async function DashboardPage() {
  const staff = await getCurrentStaff()
  return (
    <section className="glass grid place-items-center gap-2 px-6 py-10 text-center">
      <span
        aria-hidden="true"
        className="size-12 rounded-full"
        style={{ background: 'radial-gradient(circle at 35% 30%,#FFE0CC,#F59A7A 45%,#E0607A 80%)', boxShadow: '0 10px 22px -8px rgba(224,96,122,.7)' }}
      />
      <h1 className="text-2xl font-light leading-snug">
        {greeting(new Date())} <b className="font-semibold">{staff.full_name},</b><br />วันนี้มีงานอะไรบ้าง?
      </h1>
      <p className="text-sm" style={{ color: 'var(--muted)' }}>ภาพรวมงานและเอกสารจะแสดงที่นี่</p>
    </section>
  )
}
```

- [ ] **Step 7: Verify build**

Run: `npm run build && npm test`
Expected: build succeeds; all tests PASS.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(ui): glass app shell with sidebar, mobile bar and dashboard greeting"
```

---

### Task 10: Staff creation script and first admin

**Files:**
- Create: `scripts/create-staff.mjs`

- [ ] **Step 1: Write the script**

Create `scripts/create-staff.mjs`:

```js
// Usage: node --env-file=.env.local scripts/create-staff.mjs <CODE> "<Full name>" <admin|staff> <password>
import { createClient } from '@supabase/supabase-js'

const [code, fullName, role, password] = process.argv.slice(2)
if (!code || !fullName || !['admin', 'staff'].includes(role) || !password || password.length < 8) {
  console.error('Usage: node --env-file=.env.local scripts/create-staff.mjs <CODE> "<Full name>" <admin|staff> <password(min 8)>')
  process.exit(1)
}
if (!/^[A-Za-z0-9_-]{2,20}$/.test(code)) {
  console.error('Employee code must be 2-20 letters, digits, dash or underscore')
  process.exit(1)
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
})

const email = `${code.trim().toLowerCase()}@staff.huglao.local`
const { data, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true })
if (error) { console.error('Auth error:', error.message); process.exit(1) }

const { error: insertError } = await supabase.from('staff').insert({
  id: data.user.id, employee_code: code.trim().toUpperCase(), full_name: fullName, role,
})
if (insertError) {
  await supabase.auth.admin.deleteUser(data.user.id)
  console.error('Staff insert failed, auth user removed:', insertError.message)
  process.exit(1)
}
console.log(`Created ${role} ${code.toUpperCase()} (${fullName})`)
```

- [ ] **Step 2: Create the first admin (the owner chooses the code and password)**

```bash
node --env-file=.env.local scripts/create-staff.mjs A001 "ชื่อเจ้าของ" admin 'a-strong-password'
```

Expected: `Created admin A001 (ชื่อเจ้าของ)`.

- [ ] **Step 3: Verify login end-to-end**

Run: `npm run dev`, log in at `/login` with `A001` and the password.
Expected: redirected to `/`, greeting shows the admin's name; sidebar shows "พนักงาน" and "ตั้งค่าบริษัท" under Others. Click "ออกจากระบบ" → back to `/login`. Visiting `/` while logged out redirects to `/login`.

- [ ] **Step 4: Verify RLS as that user (SQL editor)**

```sql
-- Simulate the admin user; replace the uuid with the id shown in Dashboard → Authentication
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"ADMIN-USER-UUID","role":"authenticated"}';
select is_admin(), is_active_staff();
rollback;
```

Expected: `is_admin = true`, `is_active_staff = true`.

Then run the write check separately:

```sql
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"ADMIN-USER-UUID","role":"authenticated"}';
insert into documents (doc_type, doc_no, recipient_name, total, issued_by)
  values ('PV', 'X', 'x', 1, 'ADMIN-USER-UUID');
rollback;
```

Expected: the insert fails with `new row violates row-level security policy for table "documents"` (documents are written only via `issue_document`).

- [ ] **Step 5: Commit**

```bash
git add scripts/create-staff.mjs
git commit -m "feat(admin): script to create staff accounts"
```

---

### Task 11: Deploy to Vercel on app.huglao.com

**Files:** none (hosting configuration)

- [ ] **Step 1: Push the repo to GitHub**

```bash
gh repo create huglao-app --private --source=. --push
```

- [ ] **Step 2: Create the Vercel project**

In Vercel → Add New → Project → import `huglao-app`. Add environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (do **not** add `SUPABASE_SECRET_KEY`; it is only for the local script). Deploy.

- [ ] **Step 3: Attach the domain**

Vercel → Project → Settings → Domains → add `app.huglao.com`. At the DNS provider for `huglao.com`, add `CNAME app → cname.vercel-dns.com` (if the domain's DNS is already on Vercel this is automatic).

- [ ] **Step 4: Verify production**

Open `https://app.huglao.com` → redirected to `/login`; log in as A001 → greeting page. Confirm `https://huglao.com` still serves the public site unchanged.

- [ ] **Step 5: Tag**

```bash
git tag plan-1-foundation && git push --tags
```

---

## Self-review notes

- Spec coverage for this plan: deployment/domain (T11), Supabase Auth with employee code (T3, T7, T10), roles admin/staff (T4 helpers + RLS, T9 sidebar filter), full data model incl. snapshot recipient columns (T4), gap-free `<CODE>-<YYMM>-<NNNN>` numbering incl. `BK` (T4), immutable documents + admin-only void (T4 functions, no write policies), booking status auto-advance DP/RC (T4 `issue_document`), THB amount-in-words (T2), pricing +25% (T2), glass design system tokens, two glass levels, Prompt weight rule, desktop sidebar + mobile capsule bar with centre create button (T6, T9), deactivated staff cannot log in (T7, T9).
- Deferred to later plans by design: customers/vans/bookings screens (Plan 2), document forms, preview and PDF (Plan 3), vouchers with slip storage, admin UIs, dashboard KPIs, e2e (Plan 4).
