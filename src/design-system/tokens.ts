/**
 * IOB Design System – Design Tokens (Phase 2)
 * Industrial Operating Brain – Dark theme, high-density operational display
 *
 * These tokens map directly to CSS custom properties injected via theme.ts
 * and are used throughout the component library for consistent styling.
 */

export const tokens = {
  colors: {
    bg: {
      deep: '#0B0F12',       // Core app backdrop
      surface: '#12181D',    // Standard card/module surface
      elevated: '#1A232A',   // Popovers, dialogs, dropdowns
      hover: '#222F38',      // Row/item hover state
      active: '#2A3B47',     // Selected/active states
    },
    border: {
      subtle: '#1F2C35',
      default: '#2E3F4B',
      focus: '#007ACC',      // Control focus ring
      contrast: '#455E6F',
    },
    text: {
      primary: '#E2E8F0',    // Main reading text
      secondary: '#94A3B8',  // Labels, metadata
      muted: '#64748B',      // Sub-labels, placeholders
      disabled: '#475569',
    },
    brand: {
      primary: '#005A9E',    // Industrial Blue (Siemens/Azure style)
      primaryHover: '#007ACC',
      accent: '#00E5FF',     // Cyber Cyan for telemetry emphasis
    },
    status: {
      success: '#10B981',    // Normal operational status
      successBg: '#042F22',
      warning: '#F59E0B',    // Warning/Degraded state
      warningBg: '#3F2203',
      danger: '#EF4444',     // Critical/Trip status
      dangerBg: '#381212',
      info: '#3B82F6',       // Process Advisory
      infoBg: '#0A2540',
    },
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'JetBrains Mono, Fira Code, Courier New, monospace',
    },
    fontSize: {
      xs: '0.6875rem',  // 11px - dense telemetry label
      sm: '0.75rem',    // 12px - standard data display
      base: '0.875rem', // 14px - standard UI text
      lg: '1rem',       // 16px - sub-headers
      xl: '1.25rem',    // 20px - section headers
      xxl: '1.5rem',    // 24px - module/view headers
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      bold: '600',
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
    },
  },
  spacing: {
    xxs: '0.125rem', // 2px
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    xxl: '2rem',     // 32px
  },
  borderRadius: {
    none: '0px',     // Sharp industrial edges
    sm: '2px',       // Strict controls
    md: '4px',       // Default components
    lg: '6px',       // Overlay modules
    full: '9999px',
  },
  shadows: {
    none: 'none',
    flat: '0 0 0 1px #2E3F4B',
    overlay: '0 4px 20px 0 rgba(0, 0, 0, 0.5), 0 0 0 1px #2E3F4B',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  transitions: {
    fast: 'all 0.1s ease-in-out',
    normal: 'all 0.2s ease-in-out',
  },
} as const;

/** Deep-readonly utility for token type safety */
export type Tokens = typeof tokens;

/**
 * Resolve a token path (e.g. 'colors.bg.deep') to its string value.
 * Useful for dynamic token access in JS-driven styles.
 */
export function getToken(path: string): string | undefined {
  const parts = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = tokens;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = current[part];
  }
  return typeof current === 'string' ? current : undefined;
}

/**
 * Map token color keys to CSS custom property references.
 * e.g. cssVar('bg.deep') => 'var(--iob-bg-deep)'
 */
export function cssVar(category: string, key: string): string {
  return `var(--iob-${category}-${key})`;
}
