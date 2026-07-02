# IOB Phase 2 – Design System & Component Library Integration Guide

## Overview

This package contains the **Phase 2 Design System and Component Library** for the Industrial Operating Brain (IOB) platform. It includes:

- **Design System Core** (`src/design-system/`) – Tokens, theme injector, and provider
- **Component Library** (`src/components/`) – 10 categorized component modules
- **Updated Config Files** – Tailwind config, layout, and GlobalProviders

All files are designed to **integrate seamlessly** with your existing Next.js 16 + React 19 + Tailwind CSS + MUI project at [github.com/Anvita09-code/brain_intelligence](https://github.com/Anvita09-code/brain_intelligence).

---

## File Manifest

### New Files (add to your project)

```
src/
├── design-system/                    ← NEW: Design system core
│   ├── tokens.ts                     ← Design tokens (colors, spacing, typography)
│   ├── theme.ts                      ← CSS injector + DesignSystemProvider
│   └── index.ts                      ← Barrel export
│
├── components/
│   ├── lib/
│   │   └── utils.ts                  ← NEW: cn() class merge utility
│   │
│   ├── charts/                       ← NEW: Chart containers
│   │   ├── ChartContainers.tsx
│   │   └── index.ts
│   │
│   ├── display/                      ← NEW: Display components
│   │   ├── Accordion.tsx
│   │   ├── Card.tsx
│   │   ├── EmptyStates.tsx
│   │   ├── Typography.tsx
│   │   └── index.ts
│   │
│   ├── feedback/                     ← NEW: (coexists with existing files)
│   │   ├── Dialogs.tsx
│   │   ├── ErrorBoundaries.tsx
│   │   ├── FeedbackOverlays.tsx
│   │   └── index.ts
│   │
│   ├── forms/                        ← NEW: Form controls
│   │   ├── Controls.tsx
│   │   ├── Inputs.tsx
│   │   └── index.ts
│   │
│   ├── icons/                        ← NEW: Icon library
│   │   └── index.ts
│   │
│   ├── layout/                       ← NEW: (coexists with existing files)
│   │   ├── Navigation.tsx
│   │   ├── Shell.tsx
│   │   ├── Structural.tsx
│   │   └── index.ts
│   │
│   ├── loaders/                      ← NEW: Loading states
│   │   ├── Skeletons.tsx
│   │   ├── Spinners.tsx
│   │   └── index.ts
│   │
│   ├── navigation/                   ← NEW: Navigation components
│   │   ├── Menus.tsx
│   │   ├── NavIndicators.tsx
│   │   └── index.ts
│   │
│   ├── status/                       ← NEW: Status indicators
│   │   ├── Indicators.tsx
│   │   └── index.ts
│   │
│   └── tables/                       ← NEW: Data table
│       ├── DataTable.tsx
│       └── index.ts
```

### Modified Files (replace existing files)

```
src/
├── app/
│   └── layout.tsx                    ← UPDATED: Added JetBrains Mono font
│
├── providers/
│   └── GlobalProviders.tsx           ← UPDATED: Wraps with DesignSystemProvider
│
tailwind.config.ts                    ← UPDATED: Extended with IOB tokens
```

### Existing Files (NOT touched – coexist alongside new files)

```
src/
├── components/
│   ├── feedback/
│   │   ├── ErrorBoundary.tsx         ← KEPT (singular name, different file)
│   │   └── Loader.tsx                ← KEPT
│   ├── layout/
│   │   ├── Navbar.tsx                ← KEPT
│   │   ├── Sidebar.tsx               ← KEPT
│   │   └── Footer.tsx                ← KEPT
│   └── ui/
│       ├── Button.tsx                ← KEPT (old, use forms/Controls instead)
│       ├── Card.tsx                  ← KEPT (old, use display/Card instead)
│       ├── Typography.tsx            ← KEPT (old, use display/Typography instead)
│       ├── Container.tsx             ← KEPT
│       └── Logo.tsx                  ← KEPT
```

---

## Integration Steps

### Step 1: Copy New Files

Copy all new files from this package into your project, maintaining the directory structure:

```bash
# From the extracted zip root:
cp -r src/design-system/         /path/to/brain_intelligence/src/
cp -r src/components/lib/        /path/to/brain_intelligence/src/components/
cp -r src/components/charts/     /path/to/brain_intelligence/src/components/
cp -r src/components/display/    /path/to/brain_intelligence/src/components/
cp -r src/components/forms/      /path/to/brain_intelligence/src/components/
cp -r src/components/icons/      /path/to/brain_intelligence/src/components/
cp -r src/components/loaders/    /path/to/brain_intelligence/src/components/
cp -r src/components/navigation/ /path/to/brain_intelligence/src/components/
cp -r src/components/status/     /path/to/brain_intelligence/src/components/
cp -r src/components/tables/     /path/to/brain_intelligence/src/components/

# Feedback & Layout have NEW files that coexist with existing ones:
cp src/components/feedback/Dialogs.tsx          /path/to/brain_intelligence/src/components/feedback/
cp src/components/feedback/ErrorBoundaries.tsx  /path/to/brain_intelligence/src/components/feedback/
cp src/components/feedback/FeedbackOverlays.tsx /path/to/brain_intelligence/src/components/feedback/
cp src/components/feedback/index.ts             /path/to/brain_intelligence/src/components/feedback/

cp src/components/layout/Navigation.tsx    /path/to/brain_intelligence/src/components/layout/
cp src/components/layout/Shell.tsx         /path/to/brain_intelligence/src/components/layout/
cp src/components/layout/Structural.tsx    /path/to/brain_intelligence/src/components/layout/
# Note: Do NOT overwrite existing layout/index.ts if you have one – merge exports instead
```

### Step 2: Replace Modified Files

```bash
cp src/app/layout.tsx              /path/to/brain_intelligence/src/app/
cp src/providers/GlobalProviders.tsx /path/to/brain_intelligence/src/providers/
cp tailwind.config.ts              /path/to/brain_intelligence/
```

### Step 3: Install JetBrains Mono Font (Optional but Recommended)

The updated `layout.tsx` imports JetBrains Mono from `next/font/google`. If your
existing layout doesn't include this, the font variable `--font-jetbrains-mono`
will be available for monospace telemetry displays.

No extra npm install needed – `next/font/google` is built into Next.js.

### Step 4: Verify Integration

```bash
cd /path/to/brain_intelligence
npm run build
```

If the build succeeds without errors, the integration is complete.

---

## Usage Examples

### Import Design Tokens

```tsx
import { tokens, cssVar } from '@/design-system';

// Direct token access
const bgColor = tokens.colors.bg.deep; // '#0B0F12'

// CSS variable reference
const css = cssVar('bg', 'surface'); // 'var(--iob-bg-surface)'
```

### Use Components

```tsx
// Charts
import { ChartContainer, ChartMetric } from '@/components/charts';

// Display
import { Card, CardHeader, CardBody, Heading, KPIValue } from '@/components/display';

// Feedback
import { Dialog, ConfirmDialog, Toast, Banner, ErrorBoundary } from '@/components/feedback';

// Forms
import { Button, TextInput, Select, Toggle, Checkbox } from '@/components/forms';

// Layout
import { AppShell, Breadcrumb, NavTabs, Grid, Section } from '@/components/layout';

// Loaders
import { Skeleton, Spinner, SkeletonTable } from '@/components/loaders';

// Navigation
import { DropdownMenu, Badge, StatusPill } from '@/components/navigation';

// Status
import { StatusIndicator, StatusCard } from '@/components/status';

// Tables
import { DataTable, type ColumnDef } from '@/components/tables';

// Icons
import { Activity, Gauge, PumpIcon, ValveIcon, PLCIcon } from '@/components/icons';
```

### Full Dashboard Page Example

```tsx
'use client';

import { AppShell, Breadcrumb, Section, Grid } from '@/components/layout';
import { Card, CardHeader, CardBody, KPIValue, Heading } from '@/components/display';
import { ChartContainer } from '@/components/charts';
import { StatusIndicator, StatusCard } from '@/components/status';
import { DataTable, type ColumnDef } from '@/components/tables';
import { Spinner } from '@/components/loaders';

const columns: ColumnDef<SensorReading>[] = [
  { id: 'id', header: 'Sensor ID', accessor: 'id', mono: true, sortable: true },
  { id: 'name', header: 'Name', accessor: 'name', sortable: true },
  { id: 'value', header: 'Value', accessor: 'value', mono: true, sortable: true },
  { id: 'status', header: 'Status', accessor: 'status', render: (val) => (
    <StatusIndicator status={val as OperationalStatus} size="sm" />
  )},
];

export default function DashboardPage() {
  return (
    <AppShell
      sidebar={<SidebarContent />}
      topBar={<TopBarContent />}
    >
      <Section title="Plant Overview" padding="lg">
        <Grid columns={4} gap="md">
          <StatusCard status="running" title="Reactor A" value="98.2" unit="%" />
          <StatusCard status="warning" title="Pump P-101" value="72.4" unit="°C" />
          <StatusCard status="running" title="Compressor C-3" value="1450" unit="RPM" />
          <StatusCard status="critical" title="Valve V-22" value="CLOSED" />
        </Grid>
      </Section>
    </AppShell>
  );
}
```

---

## Architecture Notes

### Backward Compatibility

- **Existing `ui/` components**: Your old `Button.tsx`, `Card.tsx`, `Typography.tsx` in `src/components/ui/` still work. New code should use the Phase 2 components from `display/` and `forms/`.
- **Existing `feedback/ErrorBoundary.tsx`**: The new `ErrorBoundaries.tsx` (plural) coexists alongside it.
- **Existing `layout/Navbar.tsx`, `Sidebar.tsx`, `Footer.tsx`**: These remain untouched. New `Navigation.tsx`, `Shell.tsx`, `Structural.tsx` add additional layout primitives.

### Design Token System

Tokens are defined in `tokens.ts` as a frozen `as const` object, providing full TypeScript autocomplete. CSS custom properties are injected at runtime via `DesignSystemProvider`, making them available to both inline styles and Tailwind utility classes (via `tailwind.config.ts`).

### Import Paths

All components use the `@/` path alias (maps to `./src/`):

```
@/design-system         → src/design-system/index.ts
@/components/charts     → src/components/charts/index.ts
@/components/display    → src/components/display/index.ts
@/components/feedback   → src/components/feedback/index.ts
@/components/forms      → src/components/forms/index.ts
@/components/icons      → src/components/icons/index.ts
@/components/layout     → src/components/layout/index.ts
@/components/loaders    → src/components/loaders/index.ts
@/components/navigation → src/components/navigation/index.ts
@/components/status     → src/components/status/index.ts
@/components/tables     → src/components/tables/index.ts
```

---

## Dependencies (All Already in Your package.json)

| Package | Version | Purpose |
|---------|---------|---------|
| `lucide-react` | ^0.400.0 | Icon library |
| `clsx` | ^2.1.1 | Conditional class names |
| `tailwind-merge` | ^2.3.0 | Tailwind class dedup |
| `react` | ^19.2.4 | UI framework |
| `react-dom` | ^19.2.4 | DOM renderer |
| `next` | ^16.2.9 | App framework |
| `@tanstack/react-query` | ^5.0.0 | Data fetching |
| `react-hook-form` | ^7.51.0 | Form handling |
| `zod` | ^3.23.0 | Schema validation |

No new dependencies need to be installed.

---

## License

Part of the IOB (Industrial Operating Brain) project.
