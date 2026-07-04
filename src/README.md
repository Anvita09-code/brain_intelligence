# Asset Telemetry Detail Workspace - Integration Guide

## Files Added/Modified

### 1. Main Feature File (REQUIRED)
**File:** `src/app/(dashboard)/assets/[id]/page.tsx`
- The new Asset Telemetry Detail Workspace page
- Place this in your Next.js app directory under `(dashboard)/assets/[id]/`

### 2. Supporting Files (To Fix Pre-existing Build Issues)

**File:** `components/icons/index.ts`
- Fixed import/export syntax in icons module
- Place at root level `components/icons/index.ts`

**File:** `design-system/`
- Copy entire folder to root level
- Contains theme and token configuration

**File:** `components/`
- Copy entire folder to root level  
- Contains all UI components

## Quick Integration Steps

1. Create the directory structure:
   ```bash
   mkdir -p src/app/\(dashboard\)/assets/\[id\]
   ```

2. Copy `page.tsx` to:
   ```
   src/app/(dashboard)/assets/[id]/page.tsx
   ```

3. If building from scratch, copy `components/`, `design-system/`, and `icons-index.ts` to root level

4. Run `npm install --legacy-peer-deps`

5. Run `npm run build` to verify

## Route Access
After integration, the page will be accessible at:
- `/assets/SYS-TURB-081`
- `/assets/SYS-PUMP-402`
- etc.

Links from the main assets page (`/assets`) will automatically route to this detail view.
