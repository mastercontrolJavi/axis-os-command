# DREXIT HQ — Codebase Inventory Report

**Generated:** 2026-04-05
**Repository:** mastercontroljavi/drexit-hq

---

## Project Overview

This repository contains a **single monolithic Next.js application** — not a multi-project monorepo. All modules (Budget, Fitness, Goals, Business, Dashboard) live under one unified app with shared Supabase backend, shared types, and shared UI components.

**Total custom code:** ~7,755 lines (excluding 1,282 lines of shadcn/ui primitives)

---

## PROJECT: DREXIT HQ

### 1. Project Name
**DREXIT HQ** — inferred from `app/layout.tsx` metadata title and sidebar branding.

### 2. One-Line Description
A personal command center for tracking budget/spending, fitness/weight loss, life goals, and business ideas — all counting down to a target relocation date (July 24, 2026, "Last Day in UK").

### 3. Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14.2.35 (App Router, React 18) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3.4 + custom iOS-inspired theme (`tailwind.config.ts`) |
| **UI Library** | shadcn/ui (base-nova style) — 19 components in `components/ui/` |
| **Charts** | Recharts 3.8 (bar, line, area, composed, pie charts) |
| **Database** | Supabase (PostgreSQL) — `@supabase/supabase-js` 2.99 |
| **Drag & Drop** | dnd-kit (core + sortable) for Kanban board |
| **File Import** | xlsx 0.18 for CSV/XLSX budget import |
| **Date Handling** | date-fns 4.1 |
| **Notifications** | sonner 2.0 (toast) |
| **Theming** | next-themes 0.4 |
| **Icons** | lucide-react 0.577 |

### 4. Status: **Active Development / MVP Complete**

Evidence:
- All 5 modules have functional CRUD and real Supabase queries (not mock data)
- 7 sequential SQL migrations show iterative schema evolution
- Design spec doc (`docs/superpowers/specs/2026-03-30-budget-savings-charts-design.md`) shows planned features — most are now implemented
- `.env.local.example` contains a live Supabase project URL (`aukqtzllffedrsjpsbof.supabase.co`)
- README is still the default `create-next-app` boilerplate (not customized)
- No deployment config found (no `vercel.json`, no `netlify.toml`, no Docker, no CI/CD)
- No authentication layer (RLS disabled, single-user design)

### 5. Entry Points

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Redirects to `/dashboard` |
| `/dashboard` | `app/dashboard/page.tsx` | Main HQ — 8 widget components |
| `/budget` | `app/budget/page.tsx` | 5-tab budget module (Overview, Spending, Budgets, Recurring, Insights) |
| `/fitness` | `app/fitness/page.tsx` | Weight/BMI/body fat tracking + food list |
| `/goals` | `app/goals/page.tsx` | Timeline-view goal tracker with progress |
| `/business` | `app/business/page.tsx` | Kanban board for business ideas |

**Layout:** `app/layout.tsx` — Sidebar navigation + Toaster + global CSS

### 6. Database / Data Layer

**Backend:** Supabase PostgreSQL (client-side queries via `@supabase/supabase-js`)
**Client init:** `lib/supabase.ts` — singleton client using `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### Tables (10 total)

| Table | Columns | Key Features |
|---|---|---|
| `budget_entries` | id, date, category, description, amount_gbp, month_key, created_at | Indexed on month_key |
| `budget_limits` | id, category (unique), monthly_limit, rollover, carryover_amount, rollover_applied_month | Per-category budgets with rollover |
| `savings_goals` | id, name, target_amount, current_amount, deadline, created_at | Seeded: "Mexico Trip Fund" (£800), "General Savings" (£1500) |
| `savings_transactions` | id, goal_id (FK), amount, type, note, linked_entry_id (FK), date, created_at | Ledger-style; links budget entries to savings |
| `goals` | id, title, description, category, deadline, target_quarter, status, progress_pct, notes | 5 categories, 3 statuses |
| `weigh_ins` | id, date (unique), weight_lbs, bmi, body_fat_pct, note, created_at | One entry per day constraint |
| `food_items` | id, name, category, notes, created_at | Approved food list |
| `business_ideas` | id, title, description, direction, priority, status, next_action, notes, archived | 4 directions, 4 statuses |
| `todos` | id, title, completed, created_at | Simple task list |
| `non_negotiables` | id, title, sort_order, last_completed_date, active | Daily habit tracker |
| `app_settings` | key (PK), value, updated_at | Stores monthly_income, weekly_focus |

#### Migration Files (7)

| File | Purpose |
|---|---|
| `supabase/migration.sql` | Base schema: budget_entries, goals, weigh_ins, food_items, business_ideas, app_settings, todos |
| `supabase/002_savings_goals.sql` | Savings goals table + seed data |
| `supabase/003_savings_transactions.sql` | Transaction ledger with FK to goals + budget entries |
| `supabase/004_weigh_ins_bmi_bodyfat.sql` | Adds bmi and body_fat_pct columns to weigh_ins |
| `supabase/005_feature_updates.sql` | Adds target_quarter to goals; renames budget categories |
| `supabase/006_non_negotiables.sql` | Non-negotiables table for daily habits |
| `supabase/007_budget_limits.sql` | Per-category budget limits with rollover |

**RLS:** Disabled (single-user app, no auth)

### 7. Deployment

**None configured.** No `vercel.json`, `netlify.toml`, `Dockerfile`, GitHub Actions, or CI/CD pipeline. The app runs locally via `npm run dev`. Vercel-ready by default (Next.js), but no explicit deployment setup exists.

### 8. Public-Facing Features (What a User Sees)

#### Dashboard (`/dashboard`)
- **Stat Cards:** Days to DREXIT, Monthly Runway (income - spent), Lbs to Goal, Open Todos
- **Non-Negotiables:** Daily habit checklist with completion tracking
- **Todo List:** Quick task manager (top 5 incomplete)
- **Burn Rate Bars:** Category spending as % of income (color-coded thresholds)
- **Mini Weight Chart:** Last 8 weigh-ins vs goal weight (area chart)
- **Weekly Focus:** Free-text area auto-saved to DB
- **Cash Flow Mini:** 3-month income vs expenses comparison (bar chart)
- **Savings Mini:** Progress bars for all savings goals

#### Budget Module (`/budget`) — 5 tabs
- **Overview:** Monthly expense tracker with add/edit/delete, category assignment, month selector, income/spent/remaining cards, savings goal linking
- **Spending:** 6-month spending overview with bar + donut charts, custom date ranges, bill exclusion toggle, frequent merchants, largest purchases
- **Budgets:** Per-category budget limits with progress bars, rollover support, projected spend, vs-last-month comparison
- **Recurring:** Auto-detection of recurring expenses (pattern matching across months), recurring spend bar chart, active/inactive toggle
- **Insights:** 8 auto-generated spending insights (category surges, decreases, concentration, biggest day, frequent merchant, budget pace, MoM trend, savings opportunity)
- **Analytics (within Overview):** 6 charts — spending by category, monthly cash flow, daily spending pace, category breakdown by month, savings growth, net position
- **CSV/XLSX Import:** Column mapping, date parsing (multiple formats), bulk insert

#### Fitness Module (`/fitness`)
- **Weigh-in Logging:** Date, weight, BMI, body fat %, notes — with upsert (one per day)
- **4 Charts:** Weight progress vs target, BMI over time (with reference zones), body fat % over time, combined overview
- **Macro Calculator:** Daily calories/protein/fat/carbs based on Mifflin-St Jeor formula with 750cal deficit
- **Approved Food List:** Categorized food items (Protein, Carb, Fat, Veg, Other) with add/delete
- **Weight History Table:** Inline editable, deletable

#### Goals Module (`/goals`)
- **Timeline View:** Vertical timeline with deadline-sorted goals
- **Category Filters:** Life, Career, Creative, Business, Fitness
- **Progress Tracking:** Slider-based progress (0-100%), status transitions (not started → in progress → done)
- **Deadline Awareness:** Color-coded urgency (red overdue, orange <30 days, green safe)
- **Quarter Targeting:** Optional target quarter assignment
- **Seed Data:** 9 default goals including Mexico trip, remote job, weight loss, YouTube, digital product

#### Business Ideas (`/business`)
- **Kanban Board:** 4 columns (Idea → Researching → Building → Done) with drag-and-drop
- **Direction Tags:** SaaS, AI Tools, Content, Digital Products (filterable)
- **Priority Indicators:** High/Medium/Low
- **Edit Drawer:** Full CRUD with all fields
- **Archive:** Soft-delete functionality
- **Seed Data:** 4 default ideas (AI SaaS, digital product, YouTube monetization, micro SaaS)

#### Global
- **Collapsible Sidebar:** 5 nav items with active highlighting, persisted collapse state (localStorage)
- **DREXIT Countdown:** Days remaining until July 24, 2026 — always visible in sidebar
- **iOS-Inspired Design:** Custom color palette, frosted-glass shadows, SF Pro Display font stack

### 9. What's Impressive

- **Scale of the budget module:** 8 dedicated components, 6 analytics charts, CSV import with intelligent column mapping, recurring expense auto-detection algorithm, per-category rollover budgets, budget-to-savings transaction linking — this is a genuinely functional personal finance tool, not a tutorial project.
- **Recharts integration depth:** ~15 distinct chart visualizations across the app (bar, line, area, composed, pie/donut) with custom tooltips, reference lines, click-to-filter interactivity, gradient fills, and responsive containers.
- **Real data architecture:** 10 Supabase tables with proper foreign keys, indexes, 7 incremental migrations, a transaction ledger for savings, and seed data. This is a production-grade schema.
- **Spending Insights engine** (`components/budget/spending-insights.tsx`): Algorithmically generates 8 types of financial insights by comparing current vs previous month data — category surges/drops, concentration analysis, pace projections, savings opportunities. This is the kind of feature that distinguishes a portfolio piece.
- **Recurring transaction detection** (`components/budget/recurring-tracker.tsx`): Groups expenses by normalized merchant name, detects recurring patterns across months with variance tolerance (≤30%), and predicts next occurrence.
- **Fitness calculator accuracy:** Uses the Mifflin-St Jeor equation with proper BMR→TDEE→cut calorie→macro split chain, not just hardcoded numbers.
- **Personal authenticity:** Hardcoded user stats (5'7", 215 lbs, age 24), real savings goals (Mexico Trip), a real relocation date — this is clearly built for actual use, which is more compelling than generic demo data.
- **Design spec document** (`docs/superpowers/specs/`): Shows a professional feature-planning process with approved specs, non-goals, and file-level implementation plans.

### 10. What's Incomplete

- **No authentication:** RLS disabled, no login/signup, `NEXT_PUBLIC_SUPABASE_ANON_KEY` used directly client-side. Single-user only.
- **No deployment:** No Vercel/Netlify config, no CI/CD, no production environment. Runs locally only.
- **Default README:** Still the `create-next-app` boilerplate — no project description, no screenshots, no setup instructions.
- **Countdown text bug:** `components/countdown.tsx` line 27 says "July 24, 2025" but `DREXIT_DATE` is `'2026-07-24'`. Minor display error.
- **No error boundaries:** No React error boundaries or global error handling. If a Supabase query fails, toast shows but UI may break.
- **No loading states for pages:** Individual components have loading states, but no page-level `loading.tsx` or skeleton screens.
- **No tests:** Zero test files — no unit tests, no integration tests, no E2E.
- **No responsive mobile layout:** Sidebar is desktop-oriented; no hamburger menu or mobile navigation pattern.
- **CSV import categories:** All imported entries get category "Other" — no auto-categorization.
- **No data export:** Can import CSV but cannot export budget data.
- **Food items disconnected:** `food_items` table exists but isn't linked to calorie tracking or meal logging — it's just a reference list.

---

## MODULE BREAKDOWN (by code volume)

| Module | Components | Lines (approx) | Charts | CRUD Ops |
|---|---|---|---|---|
| Budget | 8 components | ~3,200 | 9 | Full CRUD + CSV import |
| Dashboard | 8 widgets | ~850 | 3 | Read + Todo CRUD |
| Fitness | 1 mega-component | ~750 | 4 | Full CRUD |
| Goals | 1 mega-component | ~550 | 0 (timeline UI) | Full CRUD |
| Business | 1 mega-component | ~500 | 0 (kanban UI) | Full CRUD + DnD |
| Shared | sidebar, countdown, types, utils, hooks | ~600 | 0 | Settings CRUD |

---

## PRIORITY RANKING (Portfolio Potential)

Since this is a single project, I'm ranking the **modules** by which ones best demonstrate skill for a portfolio:

| Rank | Module | Reasoning |
|---|---|---|
| **1** | **Budget** | Most complex module by far — 8 components, 9 charts, CSV import, recurring detection, spending insights engine, savings ledger, rollover budgets. This alone could be a standalone portfolio project. |
| **2** | **Dashboard** | Best "wow factor" for a quick demo — 8 widgets pulling from every data source, stat cards, charts, and live data in a clean grid layout. |
| **3** | **Fitness** | Solid data visualization (4 charts with reference zones), real nutritional science (Mifflin-St Jeor), and body composition tracking. Shows domain knowledge. |
| **4** | **Business Ideas** | Drag-and-drop Kanban with dnd-kit is a good technical demo, but the feature set is thin compared to Budget or Fitness. |
| **5** | **Goals** | Clean timeline UI but relatively simple CRUD with no charts or complex logic. Least differentiated. |

---

## PORTFOLIO-READINESS CHECKLIST

### To Make the Overall App Portfolio-Ready

1. **Replace the README** with a proper project description, feature list with screenshots/GIFs, tech stack badges, and local setup instructions (including Supabase schema setup steps).
2. **Deploy to Vercel** — add `vercel.json` if needed, configure environment variables, and include a live demo link in the README.
3. **Fix the countdown bug** (`components/countdown.tsx:27` — "2025" should be "2026") and add page-level `loading.tsx` skeletons for each route.

### Budget Module
1. Add auto-categorization for CSV imports (keyword matching on merchant names).
2. Add a data export button (CSV download of filtered entries).
3. Add a monthly summary email/report view (printable).

### Dashboard
1. Add a mobile-responsive layout with collapsible sections or a tab-based mobile view.
2. Add `loading.tsx` with skeleton cards matching each widget's shape.
3. Consider adding a "Quick Add Expense" shortcut directly on the dashboard.

### Fitness Module
1. Link `food_items` to actual meal/calorie logging (currently disconnected).
2. Add weekly/monthly weight trend summaries (average, rate of loss per week).
3. Add a progress photo or measurement tracker to complement the charts.

### Goals Module
1. Add a Gantt-style or calendar visualization instead of just a vertical timeline.
2. Add sub-tasks or milestones within each goal.
3. Add progress history (log when % changed) to show momentum.

### Business Ideas Module
1. Add a revenue/validation tracking column (MRR, signups, landing page visits).
2. Add a resource/link section per idea (competitor links, tools, notes).
3. Add a "pitch deck" or one-pager export per idea.
