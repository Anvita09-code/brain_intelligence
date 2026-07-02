# Section — Status & Health Tracking Architecture (Integration Notes)

Brain Intelligence / Industrial Operating Brain (IOB) — Next.js 16 / React 19

This package integrates the pasted spec for `src/components/status/Indicators.tsx`
(`Badge`, `HealthIndicator`, `ProgressIndicator`) into the **existing**
`src/components/status/*` module already shipped in
`https://github.com/Anvita09-code/brain_intelligence`, instead of overwriting
those files outright.

## Why a straight drop-in would have broken the build

| Spec file | Existing repo file | Conflict |
|---|---|---|
| `Indicators.tsx` exports only `Badge`, `HealthIndicator`, `ProgressIndicator` | Existing `Indicators.tsx` is a fully-wired Phase 2 module exporting `StatusIndicator`, `StatusCard`, `OperationalStatus`, using `cn()`, `PulseRing`, and the icon engine | Overwriting would delete `StatusIndicator`/`StatusCard`, which `status/index.ts` re-exports — an instant compile failure |
| `index.ts` is `export * from './Indicators'` | Existing `index.ts` uses explicit named + type exports | A blind `export *` swap loses the explicit type re-exports convention used across every barrel in the repo |
| Uses relative import `../../design-system/tokens` | Repo standard is the `@/` alias (`@/design-system/tokens`, per `tsconfig.json` paths) | Style/lint inconsistency |
| ``border: 1px solid ${...}33`` and ``width: ${percentage}%`` are **not quoted/template-literals** in the pasted spec | — | Literal syntax errors as pasted; fixed with proper template literals |
| A second `Badge` already exists in `src/components/navigation/NavIndicators.tsx` (different variants: `default`/`primary`/…) | New status `Badge` (variants `success`/`warning`/`danger`/`info`) | Both are namespaced by their own barrels, so no collision — but a `StatusBadge` alias was added for disambiguation in mixed imports |

## What was actually changed

### 1. `src/components/status/Indicators.tsx` (MERGED — nothing removed)
Appended the three spec components to the existing file, keeping
`StatusIndicator` / `StatusCard` 100% untouched:

- **`Badge`** — exact spec visuals (2px/6px padding, `sm` radius, `xs` font,
  `medium` weight, token status colors, translucent `${color}33` border),
  with fixed template-literal syntax, an exported `BadgeVariant` type,
  optional `className` (merged via `cn()`), and a `StatusBadge` alias.
- **`HealthIndicator`** — spec thresholds preserved exactly
  (`< 50` → danger, `< 85` → warning, else success) via an exported
  `getHealthColor()` helper; 8px dot + mono `"{value}% UI-H"` readout.
  Added: value clamping to 0–100, `role="status"` + aria-label, optional
  `unit` prop (defaults to the spec's `UI-H`), explicit text color token.
- **`ProgressIndicator`** — spec visuals preserved (4px track, `bg.hover`
  track color, `brand.primary` fill, `full` radius, `width 0.3s ease`
  transition). Added: percentage clamping, divide-by-zero guard on `max`,
  and full `role="progressbar"` ARIA wiring.

### 2. `src/components/status/HealthPanel.tsx` (NEW)
`SystemHealthPanel` — the "architecture" layer that composes all five status
primitives into a live health-tracking module:
- Overall UI-health score (mean of subsystems) → `HealthIndicator` +
  `ProgressIndicator` + `Badge` (NOMINAL / DEGRADED / CRITICAL).
- Subsystem grid rendered with the existing `StatusCard`.
- Compact footer strip using existing `StatusIndicator` with `showPulse`
  on running subsystems.
- Exported `healthToVariant()` / `healthToStatus()` mappers keep Badge
  variants and `OperationalStatus` aligned with the spec's 50/85 thresholds.
- Self-contained simulated 3s health tick (disable with `live={false}` or
  drive it externally via the `subsystems` prop — shape mirrors
  `TelemetryContext`'s asset model, so real telemetry can be plugged straight
  in later).

### 3. `src/components/status/index.ts` (UPDATED)
Barrel now exports everything — old and new:
`StatusIndicator`, `StatusCard`, `Badge`, `StatusBadge`, `HealthIndicator`,
`ProgressIndicator`, `getHealthColor`, `SystemHealthPanel`,
`healthToVariant`, `healthToStatus` + all prop/variant types.

### 4. `src/app/(dashboard)/dashboard/page.tsx` (WIRED)
The placeholder dashboard page now renders `<SystemHealthPanel />` via
`import { SystemHealthPanel } from '@/components/status'`, so the new
architecture is live at `/dashboard` immediately.

## Verification (executed, not assumed)

```
npm install --legacy-peer-deps   # (repo needs this due to @mui/material-nextjs peer range vs next@16)
npx tsc --noEmit                 # ✓ 0 errors
npm run build                    # ✓ Compiled successfully — all 13 routes generated
```

## Usage

```tsx
import {
  Badge,
  HealthIndicator,
  ProgressIndicator,
  SystemHealthPanel,
} from '@/components/status';

<Badge variant="success">ONLINE</Badge>
<HealthIndicator value={92} />          // green dot · "92% UI-H"
<ProgressIndicator value={62} max={80} />
<SystemHealthPanel />                    // full tracking panel (live tick)
<SystemHealthPanel live={false} subsystems={mySubsystems} />
```
