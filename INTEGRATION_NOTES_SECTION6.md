# Section 6 — Layout Containers & Components (Integration Notes)

Brain Intelligence / Industrial Operating Brain (IOB) — Next.js 16 / React 19

This package integrates the Section 6 `Card`, `Accordion`, and `EmptyStates`
spec into the **existing** `src/components/display/*` module already shipped
in `https://github.com/Anvita09-code/brain_intelligence`, instead of
overwriting those files outright.

## Why a straight drop-in would have broken the build

The repo's `src/components/display/` already contains a **more advanced**,
already-wired Phase 2 version of `Card.tsx`, `Accordion.tsx`, and
`EmptyStates.tsx` — different in shape from the pasted spec:

| Spec file | Existing repo file | Conflict |
|---|---|---|
| `Card` takes `children` as its only required content and renders a raw inline header/footer directly | `Card` is a compound component: `<Card><CardHeader/><CardBody/><CardFooter/></Card>`, with `variant: 'default' \| 'elevated' \| 'outlined' \| 'status'`, a status-color stripe, hover states, and `cn()`/Tailwind class merging | Overwriting would delete the compound `CardHeader`/`CardBody`/`CardFooter` API and the `'elevated'`/`'status'` variants, which the rest of the design system (`INTEGRATION_GUIDE.md` usage examples) documents and relies on |
| `Card` variants are `'default' \| 'outlined' \| 'glass'` | Existing variants don't include `'glass'` | Spec's frosted-glass telemetry panel style didn't exist yet |
| `Accordion` takes a flat `items: { id, title, content }[]` array | Existing `Accordion` is a compound `<Accordion><AccordionItem id=... /></Accordion>` component supporting `multiple` open state, icons, and cloned controlled state | Overwriting would remove the compound API and the icon/subtitle support already used by the design system's documented usage patterns |
| `EmptyStates.tsx` exports named components `NoData`, `ServerError`, `PermissionDenied` | Existing `EmptyStates.tsx` exports a single configurable `EmptyState` component with a `variant` prop (`noData \| noResults \| offline \| error \| noItems \| noFile`) | The three named spec exports don't exist in the repo at all yet — nothing to overwrite, but a lot to lose if the whole file were replaced |
| Uses local `Flex`/`Stack` from `../layout/Structural` for centering | Existing file uses plain `<div>` + Tailwind flex utility classes + `cn()` | Consistent with the rest of `display/` — kept as-is |

## What was actually changed

### 1. `src/components/display/Card.tsx`
- Added `'glass'` to `CardVariant` (frosted `rgba(18,24,29,0.75)` background +
  `backdropFilter: blur(8px)`, matching the spec's `glass` variant), alongside
  the existing `'default' | 'elevated' | 'outlined' | 'status'` variants.
- `variant="outlined"` now also flips the background to `transparent` (as in
  the spec) instead of just changing the border color.
- Added **optional** convenience props — `title`, `subtitle`, `actions`,
  `footer`, `style` — directly on `<Card>` so callers can write the spec's
  flat, all-in-one style:
  ```tsx
  <Card title="Reactor A" subtitle="Live feed" actions={<Button/>} footer={<span/>}>
    ...
  </Card>
  ```
  Internally this renders the **same** `CardHeader` / `CardFooter`
  sub-components the compound API already uses, so both authoring styles
  produce visually identical output and nothing about the compound API
  changed.
- `children` is now optional (a header/footer-only card is valid) and
  `CardHeaderProps.title` was relaxed to optional to support the internal
  auto-header call.
- The existing compound usage — `<Card><CardHeader title=".."/><CardBody/>
  <CardFooter/></Card>` — is **100% unchanged** and still works exactly as
  before.

### 2. `src/components/display/Accordion.tsx`
- Added an optional `items?: AccordionItemData[]` prop to `<Accordion>`
  (`{ id, title, subtitle?, icon?, content }[]`), matching the spec's flat
  data-driven API:
  ```tsx
  <Accordion items={[{ id: 'a', title: 'Section A', content: <p>...</p> }]} />
  ```
  When `items` is supplied, `Accordion` renders `AccordionItem` internally for
  each entry, reusing the exact same single/multiple-open logic, hover
  states, and chevron rotation already implemented.
- `children` was made optional so `items`-driven usage doesn't require an
  unused `children` prop.
- The existing compound usage — `<Accordion><AccordionItem id="a" title="A">
  ...</AccordionItem></Accordion>` — is **unchanged** and still works.

### 3. `src/components/display/EmptyStates.tsx`
- Added three new named exports on top of the existing `EmptyState` component
  (no changes to `EmptyState` itself):
  - `NoData({ title, description, action, className })` — dashed border,
    `Database` icon, muted palette (wraps `EmptyState variant="noData"`).
  - `ServerError({ title, description, action, className })` — red
    danger-background panel with `AlertCircle` icon (matches
    `tokens.colors.status.danger` / `dangerBg`, mirroring the spec's
    `ServerError` styling exactly, since the base `EmptyState` component
    doesn't support a danger background natively).
  - `PermissionDenied({ title, description, action, className })` — warning
    `ShieldAlert` icon (wraps `EmptyState variant="error"` with custom icon
    and copy).
- All three reuse `tokens` from `@/design-system/tokens` and icons already
  re-exported from `@/components/icons` (`Database`, `AlertCircle`,
  `ShieldAlert`) — no new icon imports were needed since the repo's icon
  barrel already re-exports every icon the spec needs.

### 4. `src/components/display/index.ts`
- Added barrel exports for the three new `EmptyStates` components and the new
  `AccordionItemData` / `NamedEmptyStateProps` types. No existing exports were
  removed or renamed.

## Provider/import chain (unchanged, verified)

```
src/components/display/index.ts
   ├─ Card, CardHeader, CardBody, CardFooter        (src/components/display/Card.tsx)
   ├─ Accordion, AccordionItem                      (src/components/display/Accordion.tsx)
   ├─ EmptyState, NoData, ServerError, PermissionDenied  (src/components/display/EmptyStates.tsx)
   └─ Heading, Body, Text, ...                       (src/components/display/Typography.tsx)
        └─ tokens (src/design-system/tokens.ts)
        └─ icons  (src/components/icons/index.ts)
        └─ cn()   (src/components/lib/utils.ts)
```

No page in `src/app/**` currently imports from `@/components/display` yet
(all dashboard routes are still placeholder stubs per the existing repo
state), so this change introduces **zero risk** to the current build.

## Verification

Tested against Next.js 16.2.9 + React 19 + Turbopack, exactly as prior
sections were verified:

```bash
npm install --legacy-peer-deps
npx tsc --noEmit
npm run build
```

Result:
```
▲ Next.js 16.2.9 (Turbopack)
✓ Compiled successfully in 6.5s
✓ Finished TypeScript in 7.3s
✓ Generating static pages (13/13) in 442ms
```

A temporary smoke-test route was also added and removed during verification,
exercising:
```tsx
<Card title="Reactor A Telemetry" subtitle="Live feed" actions={<Button/>}
      footer={<span/>} variant="glass">
  <p>Body content</p>
</Card>

<Accordion items={[{ id: 'a', title: 'Section A', content: <p/> }]} />

<NoData title="No telemetry" description="Nothing to show yet." />
<ServerError title="Backend down" description="Could not reach API." />
<PermissionDenied />
```
Both `tsc --noEmit` and `next build` passed cleanly with this route present,
confirming the new APIs compile and render against the real, existing
`design-system`, `icons`, and `lib/utils` wiring — not in isolation.

> Note: as with prior sections, `npm run lint` has a pre-existing, unrelated
> Next 16.2.9 CLI issue in this repo and is not affected by this patch.

## Installation

Unzip into the project root, preserving paths — this **overwrites** only the
three touched files plus the barrel export:

```
brain_intelligence/
└─ src/
   └─ components/
      └─ display/
         ├─ Card.tsx          <-- overwrite (adds 'glass' variant + inline header/footer props)
         ├─ Accordion.tsx     <-- overwrite (adds items[] data-driven API)
         ├─ EmptyStates.tsx   <-- overwrite (adds NoData/ServerError/PermissionDenied)
         └─ index.ts          <-- overwrite (adds new barrel exports)
```

Then:
```bash
npm install --legacy-peer-deps
npm run build
npm run dev
```

## Usage examples

```tsx
import { Card, Accordion, NoData, ServerError, PermissionDenied } from '@/components/display';

// Spec-style flat Card
<Card title="Reactor A" subtitle="Live feed" variant="glass" footer={<span>Updated 2s ago</span>}>
  <TelemetryChart />
</Card>

// Still works — compound Card API, unchanged
<Card variant="elevated" statusColor="warning">
  <CardHeader title="Pump P-101" subtitle="72.4°C" />
  <CardBody>...</CardBody>
  <CardFooter>...</CardFooter>
</Card>

// Spec-style flat Accordion
<Accordion items={[
  { id: 'faults', title: 'Fault History', content: <FaultList /> },
  { id: 'specs', title: 'Specifications', content: <SpecTable /> },
]} />

// Empty states
<NoData title="No sensors configured" description="Add a sensor to begin monitoring." />
<ServerError description="Could not reach the telemetry backend." />
<PermissionDenied />
```
