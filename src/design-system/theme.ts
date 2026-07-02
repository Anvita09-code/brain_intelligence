/**
 * IOB Design System – Theme Injector & Provider (Phase 2)
 *
 * Injects CSS custom properties and base styles into the document <head>
 * at runtime. Designed for Next.js App Router – call injectCSS() from
 * a client-side component or provider (e.g. DesignSystemProvider).
 *
 * Integration with existing project:
 *   - The existing layout.tsx uses id="__next__root" on <body> (Tailwind important selector)
 *   - GlobalProviders.tsx wraps children – add <DesignSystemProvider> there
 *   - globals.css is already imported in layout.tsx
 */

'use client';

import React, { useEffect } from 'react';
import { tokens } from './tokens';

/* ------------------------------------------------------------------ */
/*  Theme CSS Injector                                                 */
/* ------------------------------------------------------------------ */

export const themeStyles = {
  injectCSS: () => {
    if (typeof window === 'undefined') return;
    const styleId = 'iob-design-system-core';
    if (document.getElementById(styleId)) return;

    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.innerHTML = `
      :root {
        --iob-bg-deep: ${tokens.colors.bg.deep};
        --iob-bg-surface: ${tokens.colors.bg.surface};
        --iob-bg-elevated: ${tokens.colors.bg.elevated};
        --iob-bg-hover: ${tokens.colors.bg.hover};
        --iob-bg-active: ${tokens.colors.bg.active};

        --iob-border-subtle: ${tokens.colors.border.subtle};
        --iob-border-default: ${tokens.colors.border.default};
        --iob-border-focus: ${tokens.colors.border.focus};
        --iob-border-contrast: ${tokens.colors.border.contrast};

        --iob-text-primary: ${tokens.colors.text.primary};
        --iob-text-secondary: ${tokens.colors.text.secondary};
        --iob-text-muted: ${tokens.colors.text.muted};
        --iob-text-disabled: ${tokens.colors.text.disabled};

        --iob-brand-primary: ${tokens.colors.brand.primary};
        --iob-brand-hover: ${tokens.colors.brand.primaryHover};
        --iob-brand-accent: ${tokens.colors.brand.accent};

        --iob-status-success: ${tokens.colors.status.success};
        --iob-status-success-bg: ${tokens.colors.status.successBg};
        --iob-status-warning: ${tokens.colors.status.warning};
        --iob-status-warning-bg: ${tokens.colors.status.warningBg};
        --iob-status-danger: ${tokens.colors.status.danger};
        --iob-status-danger-bg: ${tokens.colors.status.dangerBg};
        --iob-status-info: ${tokens.colors.status.info};
        --iob-status-info-bg: ${tokens.colors.status.infoBg};

        --iob-font-sans: ${tokens.typography.fontFamily.sans};
        --iob-font-mono: ${tokens.typography.fontFamily.mono};
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        background-color: var(--iob-bg-deep);
        color: var(--iob-text-primary);
        font-family: var(--iob-font-sans);
        font-size: ${tokens.typography.fontSize.base};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
      }

      /* Base Focus Ring styles for strict keyboard navigation */
      *:focus-visible {
        outline: 2px solid var(--iob-border-focus);
        outline-offset: 1px;
      }

      /* Custom scrollbar matching industrial operational displays */
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        background: var(--iob-bg-deep);
      }
      ::-webkit-scrollbar-thumb {
        background: var(--iob-border-default);
        border-radius: ${tokens.borderRadius.sm};
      }
      ::-webkit-scrollbar-thumb:hover {
        background: var(--iob-border-contrast);
      }
    `;
    document.head.appendChild(styleElement);
  },
};

/* ------------------------------------------------------------------ */
/*  React Provider Wrapper                                             */
/* ------------------------------------------------------------------ */

interface DesignSystemProviderProps {
  children: React.ReactNode;
}

/**
 * Client-side provider that injects the IOB design-system CSS on mount.
 * Wrap your app with this inside GlobalProviders.tsx:
 *
 * ```tsx
 * import { DesignSystemProvider } from '@/design-system';
 *
 * export function GlobalProviders({ children }: { children: React.ReactNode }) {
 *   return (
 *     <DesignSystemProvider>
 *       <QueryClientProvider client={queryClient}>
 *         {children}
 *       </QueryClientProvider>
 *     </DesignSystemProvider>
 *   );
 * }
 * ```
 */
export function DesignSystemProvider({ children }: DesignSystemProviderProps) {
  useEffect(() => {
    themeStyles.injectCSS();
  }, []);

  return <>{children}</>;
}
