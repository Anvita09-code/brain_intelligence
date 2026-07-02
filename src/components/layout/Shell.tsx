/**
 * IOB Shell – Application shell / layout wrapper (Phase 2)
 *
 * Provides the main layout structure: sidebar + topbar + main content area.
 * Designed to wrap the dashboard route group.
 *
 * Integration: Use in src/app/(dashboard)/layout.tsx
 */

'use client';

import React, { useState, useCallback } from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import { Menu, X } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface AppShellProps {
  /** Sidebar navigation content */
  sidebar: React.ReactNode;
  /** Top bar content */
  topBar?: React.ReactNode;
  /** Main content area */
  children: React.ReactNode;
  /** Sidebar width when expanded; default 240px */
  sidebarWidth?: number;
  /** Sidebar width when collapsed; default 56px */
  sidebarCollapsedWidth?: number;
  /** Start with sidebar collapsed */
  defaultCollapsed?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  AppShell                                                           */
/* ------------------------------------------------------------------ */

export function AppShell({
  sidebar,
  topBar,
  children,
  sidebarWidth = 240,
  sidebarCollapsedWidth = 56,
  defaultCollapsed = false,
  className,
}: AppShellProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const currentWidth = collapsed ? sidebarCollapsedWidth : sidebarWidth;

  const toggleSidebar = useCallback(() => {
    setCollapsed((c) => !c);
  }, []);

  return (
    <div
      className={cn('flex h-screen overflow-hidden', className)}
      style={{ backgroundColor: tokens.colors.bg.deep }}
    >
      {/* Sidebar */}
      <aside
        className="shrink-0 flex flex-col overflow-y-auto overflow-x-hidden transition-all"
        style={{
          width: `${currentWidth}px`,
          backgroundColor: tokens.colors.bg.surface,
          borderRight: `1px solid ${tokens.colors.border.subtle}`,
          transition: 'width 0.2s ease-in-out',
        }}
        role="complementary"
        aria-label="Sidebar navigation"
      >
        {/* Sidebar toggle */}
        <div
          className="flex items-center justify-end p-3"
          style={{ borderBottom: `1px solid ${tokens.colors.border.subtle}` }}
        >
          <button
            type="button"
            onClick={toggleSidebar}
            className="p-1.5 rounded transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{ transition: tokens.transitions.fast }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                tokens.colors.bg.hover;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                'transparent';
            }}
          >
            {collapsed ? (
              <Menu
                className="w-4 h-4"
                style={{ color: tokens.colors.text.muted }}
              />
            ) : (
              <X
                className="w-4 h-4"
                style={{ color: tokens.colors.text.muted }}
              />
            )}
          </button>
        </div>

        {/* Sidebar content – pass collapsed state via render prop or context */}
        <div className="flex-1 overflow-y-auto">
          {typeof sidebar === 'function'
            ? (sidebar as (collapsed: boolean) => React.ReactNode)(collapsed)
            : sidebar}
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        {topBar && <div className="shrink-0">{topBar}</div>}

        {/* Content */}
        <main
          className="flex-1 overflow-y-auto overflow-x-hidden"
          role="main"
          style={{ backgroundColor: tokens.colors.bg.deep }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
