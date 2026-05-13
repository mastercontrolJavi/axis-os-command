# AXIS Design Audit

## Colors

### Dark theme (default)
`#0A0A0A` — bg-base — page/app background  
`#111111` — bg-elevated — card and panel surfaces  
`#161616` — bg-hover — interactive hover state  
`#1F1F1F` — border-hairline — subtle dividers, card borders, `--border`  
`#2A2A2A` — border-strong — prominent borders, `--input` backgrounds  
`#FAFAFA` — text-1 — primary text, headings, active nav labels  
`#A1A1A1` — text-2 — secondary labels, captions, inactive nav  
`#525252` — text-3 — tertiary text, ticker content, placeholder hints  
`#3B82F6` — accent — CTA buttons, focus ring, active nav 1px indicator, `--ring`  
`#10B981` — success — positive deltas, goal completion, health metrics  
`#F59E0B` — warn — budget warnings, caution states  
`#EF4444` — danger — destructive actions, overspend, negative values  
`#8B5CF6` — chart-5 — fifth chart series (purple)  
`rgba(255,255,255,0.02)` — grid — dot-grid background texture

### Light theme overrides
`#FAFAFA` — bg-base  
`#FFFFFF` — bg-elevated  
`#F5F5F5` — bg-hover  
`#E5E5E5` — border-hairline  
`#D4D4D4` — border-strong  
`#0A0A0A` — text-1  
`#525252` — text-2  
`#A1A1A1` — text-3  
`#2563EB` — accent (slightly darker blue for white surface contrast)  
`#059669` — success  
`#D97706` — warn  
`#DC2626` — danger

---

## Typography

### Font families
- **Sans:** `var(--font-sans)` → Inter (Google Fonts via `next/font/google`) — body, UI controls
- **Mono:** `var(--font-mono)` → JetBrains Mono (Google Fonts via `next/font/google`) — nav labels, captions, stat values, wordmark

### Utility classes
- `.caption` — 11px / 16px line-height / mono / `uppercase` / tracking `0.08em` / `text-text-2` — section headers, nav labels, data field labels
- `.num-display` — mono / `tabular-nums` / tracking `-0.02em` / `font-weight: 600` — financial and stat values

### Custom scale additions (tailwind.config.ts)
- `text-2xs` — 11px / 16px / tracking `0.08em`
- `text-display` — 56px / 60px / tracking `-0.04em` / weight 600

### Font sizes in use
| Size | Context |
|------|---------|
| 9px | Minimal chart tick labels |
| 10px | Ticker on mobile (`@media max-width: 767px`) |
| 11px | `.caption`, `text-2xs`, table headers, form labels |
| 12px | `text-xs` — secondary content |
| 13px | `text-[13px]` — body text, sidebar wordmark, list items |
| 14px | `text-sm` — button text |
| 16px | `text-base` — body default |
| 18px | `text-[18px]` — section titles |
| 20px | `text-[20px]` — medium stats |
| 24px | `text-[24px]` — sub-display values |
| 28px | `text-[28px]` — display values |
| 32px | `text-[32px]` — large financial display |
| 40px | `text-[40px]` — primary stat value (Stat component default) |
| 48px | `text-[48px]` — large hero values |
| 56px | `text-display` — display hero |

### Font weights in use
- 400 — body text (default)
- 500 (`font-medium`) — emphasized body
- 600 (`font-semibold`) — `.num-display`, wordmark, display heading

### Letter spacing in use
- `-0.04em` — display hero (56px)
- `-0.02em` — `.num-display`, financial values
- `normal` — body default
- `0.08em` — `.caption`
- `0.18em` — sidebar wordmark (`AXIS_OS`)
- `0.04em` — savings goal labels
- `0.06em` — budget table column headers

---

## Spacing scale

Tailwind 4px base unit — values actually in use:

| Token | px |
|-------|----|
| `0` | 0 |
| `0.5` | 2px |
| `1` | 4px |
| `1.5` | 6px |
| `2` | 8px |
| `2.5` | 10px |
| `3` | 12px |
| `4` | 16px |
| `5` | 20px |
| `6` | 24px |
| `8` | 32px |
| `32` | 128px (pb-32 scroll clearance on mobile) |

Fixed dimensions in use: `200px` (sidebar width), `56px` (mobile bottom nav height), `24px` (dot-grid background-size)

---

## Border radius scale

`tailwind.config.ts` hard-caps all radii at 4px. `lg`, `xl`, `2xl`, `3xl` all resolve to `4px`.

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0 | Sharp-edged UI elements |
| `rounded-sm` | 2px | Small UI chips, tight contexts |
| `rounded-md` / `rounded-lg` / `rounded-xl` | 4px | Cards, inputs, buttons, dialogs — **maximum** |
| `rounded-full` | 9999px | Circular avatars, pill badges only |

---

## Component inventory

### Shell / layout
| Component | Path |
|-----------|------|
| Root layout | `app/layout.tsx` |
| Sidebar | `components/sidebar.tsx` |
| BootSequence | `components/shell/boot-sequence.tsx` |
| CommandPalette | `components/shell/command-palette.tsx` |
| MobileNav | `components/shell/mobile-nav.tsx` |
| Ticker | `components/shell/ticker.tsx` |
| ThemeToggle | `components/shell/theme-toggle.tsx` |
| Providers | `components/shell/providers.tsx` |
| DemoBanner | `components/demo-banner.tsx` |
| Countdown | `components/countdown.tsx` |

### Data primitives
| Component | Path |
|-----------|------|
| Stat | `components/data/stat.tsx` |
| MetricStrip | `components/data/metric-strip.tsx` |
| StatusLabel | `components/data/status-label.tsx` |
| RingProgress | `components/data/ring-progress.tsx` |
| Sparkline | `components/data/sparkline.tsx` |
| HairlineProgress | `components/data/hairline-progress.tsx` |
| TimelineRail | `components/data/timeline-rail.tsx` |
| UnderlineTabs | `components/data/underline-tabs.tsx` |

### Dashboard widgets
| Component | Path |
|-----------|------|
| StatCards | `components/dashboard/stat-cards.tsx` |
| TodoList | `components/dashboard/todo-list.tsx` |
| NonNegotiables | `components/dashboard/non-negotiables.tsx` |
| BurnRateBars | `components/dashboard/burn-rate-bars.tsx` |
| MiniWeightChart | `components/dashboard/mini-weight-chart.tsx` |
| WeeklyFocus | `components/dashboard/weekly-focus.tsx` |
| CashFlowMini | `components/dashboard/cash-flow-mini.tsx` |
| SavingsMini | `components/dashboard/savings-mini.tsx` |

### Budget
| Component | Path |
|-----------|------|
| BudgetClient | `components/budget/budget-client.tsx` |
| BudgetTabs | `components/budget/budget-tabs.tsx` |
| SpendingOverview | `components/budget/spending-overview.tsx` |
| BudgetLimits | `components/budget/budget-limits.tsx` |
| CsvImport | `components/budget/csv-import.tsx` |
| RecurringTracker | `components/budget/recurring-tracker.tsx` |
| SavingsTracker | `components/budget/savings-tracker.tsx` |
| SpendingInsights | `components/budget/spending-insights.tsx` |
| BudgetAnalytics | `components/budget/budget-analytics.tsx` |

### Feature modules
| Component | Path |
|-----------|------|
| KanbanBoard | `components/business/kanban-board.tsx` |
| FitnessClient | `components/fitness/fitness-client.tsx` |
| GoalsClient | `components/goals/goals-client.tsx` |

### Base UI primitives
`components/ui/`: badge, button, card, checkbox, dialog, input, label, progress, scroll-area, select, separator, sheet, skeleton, slider, sonner, table, tabs, textarea

---

### Anatomy: Sidebar (`components/sidebar.tsx`)

```
<aside>  w-[200px] / h-screen / shrink-0 / flex-col
         border-r border-border / bg-bg-base

  Wordmark block  px-4 pt-5 pb-6
    SVG crosshair  18×18 / text-text-1 / strokeWidth 1.4
    Wordmark text  font-mono text-[13px] font-semibold uppercase tracking-[0.18em] text-text-1
    Subtitle       .caption text-text-3  ("v1.0.0 · COMMAND CTR")

  Nav  px-2 / space-y-px
    Nav item  px-3 py-2 / flex items-center gap-2.5
              transition-colors duration-200 ease-out-200
      Active indicator  absolute inset-y-1 left-0 w-px / bg-accent
      Icon              h-3.5 w-3.5 / strokeWidth=1.5 / lucide-react
      Label             .caption !text-current
      States:
        inactive  text-text-2
        hover     bg-bg-hover text-text-1
        active    text-text-1 + accent left-edge bar

  Bottom block  px-3 pb-3 / space-y-2
    <Countdown />
    <ThemeToggle />
```

### Anatomy: Stat (`components/data/stat.tsx`)

```
<div>  flex flex-col gap-1.5
       (align=center: items-center text-center)

  Label   .caption text-text-2
  Value   .num-display tracking-[-0.02em]
          default size: text-[40px] leading-[44px]
          tone variants: neutral→text-text-1 / success→text-success
                         warn→text-warn / danger→text-danger / accent→text-accent

  Delta row  flex items-center gap-2  (optional)
    Sparkline  64×14px / stroke color inherits tone
    Delta text  font-mono text-[11px] tabular-nums / tone color
```

---

## Design decisions inferred from the code

1. **Monospace as the primary voice.** Every piece of navigational and informational UI — nav labels (`DAILY_HQ`, `BUDGET`), all section headers via `.caption`, all stat values via `.num-display`, and the app wordmark — uses JetBrains Mono. The boot sequence renders as terminal stdout. This is a deliberate OS/command-center framing, not incidental font choice. Evidence: `sidebar.tsx:49`, `globals.css` `.caption` utility, `tailwind.config.ts` mono font stack.

2. **Near-black, not pure black.** `--bg-base` is `#0A0A0A` and the surface stack increments only 6–22 luminance units (`#0A0A0A` → `#111111` → `#161616`). Layers are separated almost entirely by hairline borders rather than shadow or saturation. Drop shadows are absent from all components. Evidence: `globals.css` CSS variables, `tailwind.config.ts` `boxShadow: { none, focus }` — no elevation shadows defined.

3. **4px hard radius ceiling.** `tailwind.config.ts` explicitly overrides `lg`, `xl`, `2xl`, `3xl` to all resolve to `4px`. The only escape is `rounded-full` for circles and pill badges. This prevents any accidental softness that would undercut the industrial/terminal aesthetic.

4. **Color reserved for signal only.** Accent (`#3B82F6`) is used exclusively for interactive signal: the 1px active nav indicator, focus rings, and primary buttons. Status colors (success/warn/danger) appear only in the `Stat` tone system and `StatusLabel` badges. All structural chrome — cards, dividers, nav chrome — uses only the gray text tones and two border values. Evidence: sidebar active indicator `w-px bg-accent`, `stat.tsx` `TONE_CLASS` mapping, no decorative color use in layout components.

5. **Density through type, not cramped spacing.** Structural spacing follows standard Tailwind conventions (p-4, gap-4). Density is achieved instead through small font sizes (11–13px labels), mono's tighter glyph advance, and the `.caption` class's uppercase+tracking combination. The result reads as information-dense HUD rather than compressed UI. Evidence: `globals.css` `.caption` definition, sidebar nav item `py-2 px-3`, `stat.tsx` default `gap-1.5`.

---

## Stack

| Dependency | Version | Role |
|------------|---------|------|
| Next.js | 14.2.35 | Framework (App Router) |
| React | 18 | UI runtime |
| Tailwind CSS | 3.4.1 | Utility-first styling |
| tw-animate-css | 1.4.0 | CSS animation utilities |
| framer-motion | 12.38.0 | Component/page animations |
| shadcn | 4.1.0 | Component primitive library |
| @base-ui/react | 1.3.0 | Low-level accessible UI primitives |
| class-variance-authority | 0.7.1 | Component variant authoring (CVA) |
| clsx | 2.1.1 | className composition |
| tailwind-merge | 3.5.0 | className deduplication |
| lucide-react | 0.577.0 | Icon library (`strokeWidth=1.5` throughout) |
| cmdk | 1.1.1 | Command palette (⌘K) |
| sonner | 2.0.7 | Toast notifications |
| recharts | 3.8.0 | Chart library (SpendingOverview, BudgetAnalytics) |
| @dnd-kit/core + sortable + utilities | 6.3/10.0/3.2 | Drag-and-drop (KanbanBoard) |
| next-themes | 0.4.6 | Dark/light theme switching via `data-theme` |
| date-fns | 4.1.0 | Date formatting (budget, fitness, goals) |
| **Inter** | via next/font | Sans-serif font |
| **JetBrains Mono** | via next/font | Monospace font |
