/**
 * Root Layout – Updated to use Phase 2 Design System (Phase 2)
 *
 * Changes from existing layout.tsx:
 *   - Added JetBrains Mono font for telemetry/monospace displays
 *   - DesignSystemProvider is now injected via GlobalProviders
 *   - Kept existing MUI AppRouterCacheProvider for MUI compatibility
 *
 * NOTE: The DesignSystemProvider is now inside GlobalProviders,
 * so you don't need to add it here separately.
 */

import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { GlobalProviders } from '@/providers/GlobalProviders';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Industrial Operating Brain (IOB)',
  description: 'Enterprise Industry 5.0 Intelligent Monitoring Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body id="__next_root">
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <GlobalProviders>
            {children}
          </GlobalProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
