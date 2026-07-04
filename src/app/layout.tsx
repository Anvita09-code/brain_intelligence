/**
 * Root Layout – IOB Global App Shell
 *
 * Provides font pipeline, MUI AppRouter cache, and GlobalProviders
 * (QueryClient, DesignSystem). The dashboard shell (sidebar, header,
 * breadcrumbs) lives in the (dashboard) route group layout.
 *
 * @version 3.0.0 – Phase 3 Industrial Platform Shell
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
  description: 'Next-Generation Industry 5.0 Core Operating Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark h-full ${inter.variable} ${jetbrainsMono.variable}`}
      style={{ backgroundColor: '#090d16', color: '#f3f4f6' }}
    >
      <body className="h-full font-sans antialiased overflow-hidden">
        <AppRouterCacheProvider>
          <GlobalProviders>{children}</GlobalProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
