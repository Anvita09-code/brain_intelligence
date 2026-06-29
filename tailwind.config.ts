import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          bg: {
            light: "#F8F9FA",
            dark: "#0F1115",
            contrast: "#FFFFFF",
            highContrast: "#000000"
          },
          panel: {
            light: "#FFFFFF",
            dark: "#161920",
          },
          border: {
            light: "#E2E8F0",
            dark: "#2A303C",
          },
          status: {
            ok: "#10B981",       // Nominal operational state
            warning: "#F59E0B",  // Premature wear/anomaly alert
            critical: "#EF4444", // Immediate shutdown requirement
            offline: "#6B7280"   // Stale telemetry or broken connection
          }
        }
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px'
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"]
      }
    },
  },
  plugins: [],
};
export default config;
