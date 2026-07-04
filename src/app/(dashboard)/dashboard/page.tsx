/**
 * Dashboard Page – Section 13 Production Integration Matrix
 *
 * This page now renders the full Section 13 verification harness (App.tsx)
 * which exercises all Phase 2 component library primitives in a single
 * isolated topology.
 *
 * Integration wiring:
 * - The (dashboard)/layout.tsx provides the outer shell (Sidebar, Navbar, Footer)
 * - This page renders the App component which uses its own DashboardWrapper
 *   with prop-based Sidebar and Navbar (Section 13 API)
 * - The App component injects the design system CSS via themeStyles.injectCSS()
 *
 * If you need the legacy dashboard view, rename this file and restore
 * the original page.tsx content from git history.
 *
 * @version 2.13.0
 */

'use client';

import React from 'react';
import App from '@/App';

export default function DashboardPage() {
  return <App />;
}
