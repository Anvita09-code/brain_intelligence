# Section 10 — Abstract Data Visualization Overlays (Integration Notes)

Brain Intelligence / Industrial Operating Brain (IOB) — Next.js 16 / React 19

This package delivers **Section 10 (Abstract Data Visualization Overlays)** integrated with the project's design system and structural layout components.

---

## 1. Overview of Changes

Section 10 introduces standardized, abstract chart containers for telemetry and digital twin visualizations. These components provide a consistent shell for line streams, telemetry gauges, and topology graphs.

### 1. `src/components/charts/ChartContainers.tsx`
Added three new containerized visualization shells:
- **`LineChartContainer`**: Designed for real-time time-series data. Uses `TrendingUp` icon and Cyber Cyan accent.
- **`GaugeContainer`**: Designed for high-visibility telemetry metrics. Uses a ghosted `Activity` background and mono-spaced font for value precision.
- **`NetworkGraphContainer`**: Designed for mesh topology and digital twin relationships.

**Integration details:**
- **Design Tokens**: Fully wired to `src/design-system/tokens.ts` for colors (`bg.surface`, `bg.deep`, `border.subtle`), typography, and spacing.
- **Structural Layout**: Uses the `Stack` component from `src/components/layout/Structural.tsx` for centered alignment of placeholders and telemetry data.
- **Iconography**: Uses `TrendingUp`, `Activity`, and `Layers` from the centralized icon engine (`src/components/icons`).

### 2. `src/components/charts/index.ts`
Updated to barrel-export all components from `ChartContainers.tsx` using `export *`.

---

## 2. Verification

Verified with the existing design system:
- [x] Correct token mapping for dark-theme industrial aesthetics.
- [x] Responsive height support via props.
- [x] Integration with `lucide-react` icons via the internal icon proxy.

## 3. Installation

Copy the `src` folder into your repository root:

```bash
# Example
cp -r src/* path/to/brain_intelligence/src/
```

The components are now available via:
```tsx
import { LineChartContainer, GaugeContainer, NetworkGraphContainer } from '@/components/charts';
```
