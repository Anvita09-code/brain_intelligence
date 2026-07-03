# Heavy Telemetry & High Density Tables — Integration Notes

Brain Intelligence / Industrial Operating Brain (IOB) — Next.js 16 / React 19

This package integrates the pasted `src/components/tables/DataTable.tsx` high-density telemetry table into the existing repository wiring without removing the richer Phase 2 table API that was already present.

## What changed

### 1. `src/components/tables/DataTable.tsx`
- Kept the existing client component wiring (`'use client'`), token usage, icon barrel usage, sorting, row selection, pagination, sticky headers, mono cells, and custom render callbacks.
- Added compatibility with the pasted lightweight spec:
  - `Column<T>` now supports `{ header, accessor, width? }` with optional `id`.
  - `rowKey` is now optional and defaults to `row.id`, matching the pasted `T extends { id: string | number }` behavior.
  - Default loading copy is now `Streaming metrics stream layer...`.
  - Default empty copy is now `No historical telemetry matrices stored.`.
  - The telemetry footer now renders by default with `Showing X-Y of Z items` and disabled previous/next controls when pagination is not enabled.
- Preserved backwards-compatible richer exports:
  - `ColumnDef<T>`
  - `DataTableProps<T>`
  - `SortDirection`
  - `DataTableColumn<T>` alias
- Added safer runtime fallbacks:
  - Generated column IDs when a lightweight spec column omits `id`.
  - Generated row keys from `row.id`, configured `rowKey`, or final index fallback.
  - Numeric/date/boolean-aware sorting.
  - Safe fallback cell rendering for null, primitives, React elements, arrays, bigint, and object values.

### 2. `src/components/tables/index.ts`
- Updated to the requested barrel style:

```ts
export * from './DataTable';
```

### 3. `src/components/ui/Button.tsx` build fix
During execution, TypeScript revealed a pre-existing build blocker in `src/app/(dashboard)/loaders-demo/page.tsx`: it uses `variant="outline"` and `variant="default"` on the MUI-backed UI button, while MUI only accepts `outlined`, `contained`, or `text`.

Rather than editing every caller, the UI button adapter now accepts the legacy aliases and normalizes them:

- `default` → `contained`
- `outline` → `outlined`

This keeps the existing page wiring intact and allows the full project build to complete.

## Files included in the ZIP

```text
src/components/tables/DataTable.tsx
src/components/tables/index.ts
src/components/ui/Button.tsx
INTEGRATION_NOTES_HEAVY_TELEMETRY_TABLES.md
```

## Verification executed

```bash
npm install --legacy-peer-deps
npx prettier --write src/components/tables/DataTable.tsx src/components/tables/index.ts src/components/ui/Button.tsx
npx tsc --noEmit
npm run build
```

Result:

```text
✓ TypeScript completed with 0 errors
✓ Next.js production build compiled successfully
✓ Static routes generated: 14/14
```

Note: the repository's existing `npm run lint` script is still `next lint`; with Next.js 16 this command is no longer valid and fails before checking project code. TypeScript and production build were executed successfully.
