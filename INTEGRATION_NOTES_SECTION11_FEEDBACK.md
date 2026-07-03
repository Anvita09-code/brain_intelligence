# Section 11 — Modal, Dialog & Feedback Components (Integration Notes)

Brain Intelligence / Industrial Operating Brain (IOB) — Next.js 16 / React 19

This package integrates the pasted Section 11 spec (`Dialogs.tsx`, `FeedbackOverlays.tsx`,
`ErrorBoundaries.tsx`, `feedback/index.ts`) **into the existing, richer Phase 2 feedback
layer** that already lives in `src/components/feedback/`, instead of overwriting it.

The repository already ships a fuller-featured set of components under the same file
names (`Dialog`/`ConfirmDialog`, `Toast`/`ToastContainer`/`Banner`,
`ErrorBoundary`/`ErrorFallback`). Rather than clobbering that work, the simpler named
components requested in the pasted spec (`Modal`, `AlertBanner`, `ErrorBoundaryUI`) were
**added alongside** the existing implementations so both APIs are available and nothing
that other pages/components already depend on breaks.

---

## 1. What changed

### `src/components/feedback/Dialogs.tsx`
* **Added** `Modal` (+ `ModalProps`) — a minimal, dependency-free overlay matching the
  pasted spec: fixed-position backdrop, centered panel, header with title + close
  button, scrollable body.
* Kept the existing `Dialog` / `ConfirmDialog` (portal-based, sizes, variants, footer
  slot, focus/escape handling) untouched — use `Modal` for a quick inline dialog, or
  `Dialog`/`ConfirmDialog` when you need the fuller feature set.
* Fixes applied vs. the pasted snippet (which would not have compiled as plain TSX):
  * Wrapped `border`, `borderBottom`, `boxShadow`-adjacent template strings that were
    written as bare, unquoted template literals (` border: 1px solid ${...} `) in
    proper backtick strings.
  * Removed the redundant/duplicate `justifyStyle: 'space-between'` style property
    (not a valid CSS property; `justifyContent` already does the job).
  * Added an Escape-key handler and `document.body.style.overflow` lock for parity
    with the rest of the feedback layer's modal-like components.

### `src/components/feedback/FeedbackOverlays.tsx`
* **Added** `AlertBanner` (+ `AlertBannerProps`) — the simple, non-dismissible
  `danger | warning | info` inline alert strip from the pasted spec, built on the
  same `tokens.colors.status.*` palette as the existing `Banner`/`Toast`.
* Fixed the same "unquoted template literal in an inline style object" issue found in
  the pasted snippet (`borderLeft`, `margin`).
* Reused the already-imported icon set — `AlertCircle` was added to the icon import
  list since the existing file only imported `CheckCircle` / `AlertTriangle` /
  `XCircle` / `Info`.
* Kept `Toast`, `ToastContainer`, and `Banner` (dismissible, actionable, portal-mounted)
  exactly as they were.

### `src/components/feedback/ErrorBoundaries.tsx`
* **Added** `ErrorBoundaryUI` — the simple class-based boundary from the pasted spec
  that renders the shared `ServerError` empty-state (`@/components/display/EmptyStates`)
  on crash.
* **Bug fix vs. the pasted snippet:** the original `render()` returned `this.children`,
  which is `undefined` on a class component (children live on `this.props.children`).
  That would have made the boundary always render `null` in the non-error path. Fixed
  to `return this.props.children;`.
* Kept the existing, more configurable `ErrorBoundary` (custom `fallback`, `onError`
  callback, `moduleName` labeling, `showReset`, and the `ErrorFallback` presentational
  component with a collapsible stack trace) untouched.
* Note: there is also a pre-existing, unrelated `src/components/feedback/ErrorBoundary.tsx`
  (singular) used nowhere else in the app — it was left as-is; nothing in this package
  reads from it.

### `src/components/feedback/index.ts`
* Extended the barrel to also export `Modal`, `AlertBanner`, and `ErrorBoundaryUI`
  (plus their prop types) alongside the pre-existing `Dialog`, `ConfirmDialog`, `Toast`,
  `ToastContainer`, `Banner`, `ErrorBoundary`, and `ErrorFallback` exports. No existing
  export was removed or renamed, so every current import site keeps working unchanged.

---

## 2. Why nothing else needed to change

A full repository search confirmed:
* Nothing outside `src/components/feedback/` previously imported `Dialog`, `Modal`,
  `ConfirmDialog`, `Toast`, `Banner`, `AlertBanner`, `ErrorBoundaryUI`, or
  `ErrorFallback` by name — these are being introduced/expanded for future use by
  pages such as `alerts`, `assets`, and `settings`.
* `src/app/loading.tsx` is the only external consumer inside `src/components/feedback/`
  today, and it imports the unrelated `Loader` default export from `Loader.tsx`, which
  this package does not touch.
* All design-token references (`tokens.colors.*`, `tokens.spacing.*`,
  `tokens.borderRadius.*`, `tokens.shadows.overlay`) already exist in
  `src/design-system/tokens.ts` — no token additions were required.
* All icon references (`X`, `AlertCircle`, `AlertTriangle`, `CheckCircle`, `Info`,
  `XCircle`, `RefreshCw`, `Bug`) already exist in `src/components/icons/index.ts`.
* `ServerError` is already exported from `src/components/display/EmptyStates.tsx` and
  re-exported via `src/components/display/index.ts`.

---

## 3. Usage

```tsx
import { Modal, AlertBanner, ErrorBoundaryUI } from '@/components/feedback';

// Simple modal
<Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm Action">
  <p>Are you sure you want to acknowledge this alert?</p>
</Modal>

// Inline alert
<AlertBanner variant="warning" message="Sensor drift detected on Pump-04." />

// Isolate a risky subtree
<ErrorBoundaryUI>
  <DigitalTwinView />
</ErrorBoundaryUI>
```

The fuller Phase 2 components remain available from the same barrel for cases that
need sizes/variants/footers/toast queues:

```tsx
import { Dialog, ConfirmDialog, Toast, ToastContainer, Banner, ErrorBoundary } from '@/components/feedback';
```

---

## 4. Verification

Verified against Next.js 16.2.9 + React 19 + Turbopack, from a clean install:

```bash
npm install --legacy-peer-deps
npx tsc --noEmit
npm run build
```

Result:
```
▲ Next.js 16.2.9 (Turbopack)
✓ Compiled successfully in 6.4s
✓ Finished TypeScript in 7.3s
✓ Generating static pages using 1 worker (14/14) in 499ms
```

All application routes (`/`, `/login`, `/dashboard`, `/alerts`, `/assets`, `/chat`,
`/knowledge`, `/predictions`, `/profile`, `/settings`, `/loaders-demo`) compile and
statically prerender with zero errors.

## 5. Installation

Copy the `src` folder into your repository root (or unzip this package at the repo
root — the paths already match `brain_intelligence/src/...`):

```bash
cp -r src/* path/to/brain_intelligence/src/
```
