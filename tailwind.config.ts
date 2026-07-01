import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: '#__next_root',
  corePlugins: {
    preflight: false, // Disables Tailwind's standard reset to allow MUI baseline synchronization
  },
  theme: {
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
    extend: {
      colors: {
        industrial: {
          bg: {
            DEFAULT: '#0B0F19',
            light: '#F8F9FA',
            dark: '#0F1115',
            contrast: '#FFFFFF',
            highContrast: '#000000',
          },
          surface: '#111827',
          blue: '#007ACC',
          slate: '#64748B',
          border: {
            DEFAULT: '#1F2937',
            light: '#E2E8F0',
            dark: '#2A303C',
          },
          panel: {
            light: '#FFFFFF',
            dark: '#161920',
          },
          status: {
            ok: '#10B981',       // Nominal operational state
            warning: '#F59E0B',  // Premature wear/anomaly alert
            critical: '#EF4444', // Immediate shutdown requirement
            offline: '#6B7280',  // Stale telemetry or broken connection
          },
        },
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
