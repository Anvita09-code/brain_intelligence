/**
 * Tailwind CSS Configuration – Updated for Phase 2 Design System
 *
 * Changes from existing tailwind.config.ts:
 *   - Added 'src/design-system/**' to content paths
 *   - Extended color palette with IOB design tokens
 *   - Added monospace font family for telemetry displays
 *   - Kept existing industrial colors for backward compatibility
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/design-system/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: '#__next_root',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        /* Keep existing industrial palette for backward compatibility */
        industrial: {
          bg: '#0B0F19',
          surface: '#111827',
          blue: '#007ACC',
          slate: '#64748B',
          border: '#1F2937',
        },

        /* Phase 2 IOB Design System tokens (mirrors tokens.ts) */
        iob: {
          bg: {
            deep: '#0B0F12',
            surface: '#12181D',
            elevated: '#1A232A',
            hover: '#222F38',
            active: '#2A3B47',
          },
          border: {
            subtle: '#1F2C35',
            DEFAULT: '#2E3F4B',
            focus: '#007ACC',
            contrast: '#455E6F',
          },
          text: {
            primary: '#E2E8F0',
            secondary: '#94A3B8',
            muted: '#64748B',
            disabled: '#475569',
          },
          brand: {
            primary: '#005A9E',
            hover: '#007ACC',
            accent: '#00E5FF',
          },
          status: {
            success: '#10B981',
            'success-bg': '#042F22',
            warning: '#F59E0B',
            'warning-bg': '#3F2203',
            danger: '#EF4444',
            'danger-bg': '#381212',
            info: '#3B82F6',
            'info-bg': '#0A2540',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        'iob-xs': ['0.6875rem', { lineHeight: '1.2' }],   // 11px
        'iob-sm': ['0.75rem', { lineHeight: '1.4' }],      // 12px
        'iob-base': ['0.875rem', { lineHeight: '1.5' }],   // 14px
        'iob-lg': ['1rem', { lineHeight: '1.5' }],          // 16px
        'iob-xl': ['1.25rem', { lineHeight: '1.2' }],      // 20px
        'iob-xxl': ['1.5rem', { lineHeight: '1.2' }],      // 24px
      },
      borderRadius: {
        'iob-sm': '2px',
        'iob-md': '4px',
        'iob-lg': '6px',
      },
      boxShadow: {
        'iob-flat': '0 0 0 1px #2E3F4B',
        'iob-overlay': '0 4px 20px 0 rgba(0, 0, 0, 0.5), 0 0 0 1px #2E3F4B',
      },
      animation: {
        'iob-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
