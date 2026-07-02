/**
 * GlobalProviders – Updated with IOB Design System Provider (Phase 2)
 *
 * WRAP YOUR EXISTING GlobalProviders with DesignSystemProvider.
 * This file should replace your existing src/providers/GlobalProviders.tsx
 *
 * Changes from existing file:
 *   - Added <DesignSystemProvider> wrapper for CSS custom property injection
 *   - Kept existing QueryClientProvider and other providers
 */

'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DesignSystemProvider } from '@/design-system';

/* ------------------------------------------------------------------ */
/*  QueryClient (stable singleton per client instance)                 */
/* ------------------------------------------------------------------ */

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 2,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always create a new client
    return makeQueryClient();
  }
  // Browser: reuse singleton
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

/* ------------------------------------------------------------------ */
/*  GlobalProviders                                                    */
/* ------------------------------------------------------------------ */

export function GlobalProviders({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <DesignSystemProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </DesignSystemProvider>
  );
}
