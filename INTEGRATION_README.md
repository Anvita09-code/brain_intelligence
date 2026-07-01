# IOB Layout Architecture — Integration Package

## Files Included

This package contains all Layout & Route Skeleton files for the **Industrial Operating Brain (IOB)** Next.js App Router, pre-integrated with your existing codebase wiring.

### New / Updated Layout Files
| File | Description |
|------|-------------|
| `src/app/layout.tsx` | Root layout with Inter font, MUI AppRouterCacheProvider (v15), and GlobalProviders |
| `src/app/(auth)/layout.tsx` | Auth group layout (login/register) with centered industrial surface card |
| `src/app/(dashboard)/layout.tsx` | Dashboard shell with Sidebar, Navbar, Footer, and scrollable main area |

### Route Skeleton Pages (All Dashboard Sub-Routes)
| File | Route | Description |
|------|-------|-------------|
| `src/app/page.tsx` | `/` | Redirects to `/dashboard` |
| `src/app/(auth)/login/page.tsx` | `/login` | System Authentication placeholder |
| `src/app/(dashboard)/dashboard/page.tsx` | `/dashboard` | Telemetry Dashboard placeholder |
| `src/app/(dashboard)/assets/page.tsx` | `/assets` | Industrial Asset Inventory placeholder |
| `src/app/(dashboard)/alerts/page.tsx` | `/alerts` | Real-Time Exception Engine placeholder |
| `src/app/(dashboard)/predictions/page.tsx` | `/predictions` | Predictive Analytics & Maintenance placeholder |
| `src/app/(dashboard)/knowledge/page.tsx` | `/knowledge` | GraphRAG Knowledge Graph placeholder |
| `src/app/(dashboard)/chat/page.tsx` | `/chat` | IOB Co-Pilot Execution Interface placeholder |
| `src/app/(dashboard)/settings/page.tsx` | `/settings` | Platform Configurations placeholder |
| `src/app/(dashboard)/profile/page.tsx` | `/profile` | Operator Configuration Profile placeholder |

### Integration Patches (Required for Wiring Compatibility)
| File | Why Updated |
|------|-------------|
| `src/providers/GlobalProviders.tsx` | **Removed nested `AppRouterCacheProvider`** (now handled in root layout) and added `default` export to match the new layout import style |
| `src/components/ui/Typography.tsx` | **Added `h4` and `body1` variants** to support the skeleton pages' Typography usage |

## Integration Changes Made

1. **Import Style Alignment**  
   Your existing components (`Sidebar`, `Navbar`, `Footer`, `Container`, `Typography`) use **named exports** (`export const ...`). The skeleton files have been adjusted to use named imports (`import { ... }`) so they compile against your existing codebase without any component rewrites.

2. **MUI Provider Nesting Fix**  
   The new root `layout.tsx` wraps `AppRouterCacheProvider` around `GlobalProviders`. Your original `GlobalProviders` also wrapped `AppRouterCacheProvider`, which would have caused a duplicate/nested cache provider error. The updated `GlobalProviders.tsx` removes that inner wrapper while keeping the `ThemeProvider`, `CssBaseline`, `TelemetryProvider`, and `SidebarProvider` intact.

3. **Typography Variant Expansion**  
   All skeleton pages use `variant="h4"` and `variant="body1"`. Your original `Typography` component only supported `h1–h3` and `body`. The updated component now includes `h4` and `body1` mappings so every page renders correctly.

## Installation

1. Extract the ZIP.
2. Copy the `src` folder into your repo root, overwriting existing files where prompted.
3. Run `npm run dev` (or `next dev`) to verify all routes resolve without errors.
4. The following routes should now be immediately accessible:
   - `/` → `/dashboard`
   - `/login`
   - `/dashboard`, `/assets`, `/alerts`, `/predictions`, `/knowledge`, `/chat`, `/settings`, `/profile`

## Notes

- The `AppRouterCacheProvider` import path uses `@mui/material-nextjs/v15-appRouter`, which is correct for Next.js 15/16 (your `package.json` specifies `next@^16.2.9`).
- All placeholder pages use the existing `Typography` component and your Tailwind industrial color tokens (`bg-industrial-bg`, `text-industrial-slate`, etc.).
- The dashboard layout uses `h-screen w-screen overflow-hidden` to create a full-viewport app-shell, matching standard industrial dashboard UX patterns.
