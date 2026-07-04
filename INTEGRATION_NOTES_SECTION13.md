# Integration Notes – Section 13: Production Integration Matrix & Verification

## Overview

Section 13 provides a centralized blueprint rendering isolated component topologies. It functions without backend business logic layers, state orchestrations, or side effects. This is the Phase 2 Sandbox Deployment Mode verification harness.

## Files Modified / Created

### New Files

| File | Description |
|------|-------------|
| `src/App.tsx` | Production Integration Matrix – master component that exercises all Phase 2 UI primitives |

### Updated Files

| File | Changes |
|------|---------|
| `src/components/layout/Sidebar.tsx` | Enhanced with Section 13 prop-based API (`isCollapsed`, `onToggle`, `activeItem`, `groups`) while maintaining backward compatibility with legacy hook-based API |
| `src/components/layout/Navbar.tsx` | Enhanced with Section 13 breadcrumbs API (`breadcrumbs` array prop) while maintaining backward compatibility |
| `src/app/(dashboard)/dashboard/page.tsx` | Updated to import and render the `App` component (Section 13 verification harness) |

## Component Import Resolution Map

The `App.tsx` imports resolve through the existing barrel export chain:

```
src/App.tsx
├── import { themeStyles } from './design-system/theme'
│   └── src/design-system/theme.ts ✅ (existing)
│
├── import { Activity, Cpu, Sliders, AlertTriangle } from './components/icons'
│   └── src/components/icons/index.ts ✅ (re-exports from lucide-react)
│
└── import { ... } from './components'
    └── src/components/index.ts (barrel)
        ├── ./icons      → Activity, Cpu, Sliders, AlertTriangle
        ├── ./layout     → DashboardWrapper, Sidebar, Navbar, PageHeader,
        │                   ContentWrapper, Grid, Stack, Flex
        │   ├── Structural.tsx → Grid, Stack, Flex, Container, Section
        │   ├── Shell.tsx      → DashboardWrapper, PageHeader, ContentWrapper
        │   ├── Sidebar.tsx    → Sidebar (updated with props API)
        │   └── Navbar.tsx     → Navbar (updated with breadcrumbs)
        ├── ./display    → Card, Heading, Body
        │   ├── Card.tsx       → Card (with title/subtitle/variant props)
        │   └── Typography.tsx → Heading, Body, Text, Caption
        ├── ./forms      → Button, TextInput, Select, Switch
        │   ├── Controls.tsx   → Button (variant/size/fullWidth)
        │   └── Inputs.tsx     → TextInput, Select, Switch
        ├── ./status     → Badge, HealthIndicator, ProgressIndicator
        │   └── Indicators.tsx → Badge, HealthIndicator, ProgressIndicator
        ├── ./tables     → DataTable
        │   └── DataTable.tsx  → DataTable (with render function accessor)
        ├── ./charts     → LineChartContainer, GaugeContainer, NetworkGraphContainer
        │   └── ChartContainers.tsx → All three chart containers
        └── ./feedback   → Modal, AlertBanner, ErrorBoundaryUI
            ├── Dialogs.tsx           → Modal
            ├── FeedbackOverlays.tsx  → AlertBanner
            └── ErrorBoundaries.tsx   → ErrorBoundaryUI
```

## Sidebar API Compatibility

### Legacy API (no props) – Used by `(dashboard)/layout.tsx`
```tsx
<Sidebar />  // Uses useSidebar() hook internally
```

### Section 13 API (prop-based) – Used by `App.tsx`
```tsx
<Sidebar
  isCollapsed={sidebarCollapsed}
  onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
  activeItem="dash"
  groups={[
    {
      title: 'Operational Hub',
      items: [
        { id: 'dash', label: 'Telemetry Monitoring', icon: Activity },
        { id: 'assets', label: 'Digital Twins & Assets', icon: Cpu },
      ]
    }
  ]}
/>
```

## Navbar API Compatibility

### Legacy API (no props) – Used by `(dashboard)/layout.tsx`
```tsx
<Navbar />  // Shows Logo + hamburger toggle
```

### Section 13 API (with breadcrumbs) – Used by `App.tsx`
```tsx
<Navbar
  breadcrumbs={[
    { label: 'Root Infrastructure' },
    { label: 'Scada Monitoring Control' }
  ]}
/>
```

## Component Verification Matrix

| # | Component | Source | Verified |
|---|-----------|--------|----------|
| 1 | `DashboardWrapper` | `layout/Shell.tsx` | ✅ |
| 2 | `Sidebar` | `layout/Sidebar.tsx` | ✅ (updated) |
| 3 | `Navbar` | `layout/Navbar.tsx` | ✅ (updated) |
| 4 | `PageHeader` | `layout/Shell.tsx` | ✅ |
| 5 | `ContentWrapper` | `layout/Shell.tsx` | ✅ |
| 6 | `Grid` | `layout/Structural.tsx` | ✅ |
| 7 | `Card` | `display/Card.tsx` | ✅ |
| 8 | `Stack` | `layout/Structural.tsx` | ✅ |
| 9 | `Flex` | `layout/Structural.tsx` | ✅ |
| 10 | `Heading` | `display/Typography.tsx` | ✅ |
| 11 | `Body` | `display/Typography.tsx` | ✅ |
| 12 | `Button` | `forms/Controls.tsx` | ✅ |
| 13 | `TextInput` | `forms/Inputs.tsx` | ✅ |
| 14 | `Select` | `forms/Inputs.tsx` | ✅ |
| 15 | `Switch` | `forms/Inputs.tsx` | ✅ |
| 16 | `Badge` | `status/Indicators.tsx` | ✅ |
| 17 | `HealthIndicator` | `status/Indicators.tsx` | ✅ |
| 18 | `ProgressIndicator` | `status/Indicators.tsx` | ✅ |
| 19 | `DataTable` | `tables/DataTable.tsx` | ✅ |
| 20 | `LineChartContainer` | `charts/ChartContainers.tsx` | ✅ |
| 21 | `GaugeContainer` | `charts/ChartContainers.tsx` | ✅ |
| 22 | `NetworkGraphContainer` | `charts/ChartContainers.tsx` | ✅ |
| 23 | `Modal` | `feedback/Dialogs.tsx` | ✅ |
| 24 | `AlertBanner` | `feedback/FeedbackOverlays.tsx` | ✅ |
| 25 | `ErrorBoundaryUI` | `feedback/ErrorBoundaries.tsx` | ✅ |

## How to Apply These Changes

1. **Copy `src/App.tsx`** into your project's `src/` directory (new file)
2. **Replace `src/components/layout/Sidebar.tsx`** with the updated version
3. **Replace `src/components/layout/Navbar.tsx`** with the updated version
4. **Replace `src/app/(dashboard)/dashboard/page.tsx`** with the updated version
5. Run `npm run dev` and navigate to `/dashboard` to verify

## Dependencies

No new dependencies required. All components use existing packages:
- `react` / `react-dom`
- `next` (App Router)
- `lucide-react` (icons)
- `clsx` (className utilities)
- `@/components/lib/utils` (cn utility)
- `@/design-system/tokens` (design tokens)

## Notes

- The `'use client'` directive is added to `App.tsx` since it uses React hooks (`useState`, `useEffect`)
- The `DataTable` column with render function accessor (`accessor: (row) => <Badge>...</Badge>`) is supported by the existing DataTable implementation
- The `DashboardWrapper` in `Shell.tsx` renders sidebar/navbar as slot props, so the App's own sidebar/navbar configuration works independently from the `(dashboard)/layout.tsx` shell
- If you see duplicate sidebar/navbar, you may need to either:
  - Remove the `(dashboard)/layout.tsx` wrapper for the Section 13 view
  - Or render App.tsx in a separate route group without the dashboard layout
