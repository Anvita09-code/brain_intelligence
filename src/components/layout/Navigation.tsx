/**
 * IOB Navigation – Top bar and breadcrumb navigation (Phase 2)
 *
 * Complements existing src/components/layout/Navbar.tsx with Phase 2
 * industrial design tokens and semantic HTML.
 */

'use client';

import React from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import { ChevronRight, Home } from '@/components/icons';

/* ------------------------------------------------------------------ */
/*  Breadcrumb                                                         */
/* ------------------------------------------------------------------ */

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight
                  className="w-3 h-3"
                  style={{ color: tokens.colors.text.muted }}
                  aria-hidden="true"
                />
              )}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="flex items-center gap-1 transition-colors"
                  style={{
                    color: tokens.colors.text.secondary,
                    fontSize: tokens.typography.fontSize.sm,
                    textDecoration: 'none',
                    transition: tokens.transitions.fast,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      tokens.colors.text.primary;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      tokens.colors.text.secondary;
                  }}
                >
                  {item.icon}
                  {item.label}
                </a>
              ) : (
                <span
                  className="flex items-center gap-1"
                  style={{
                    color: isLast
                      ? tokens.colors.text.primary
                      : tokens.colors.text.secondary,
                    fontSize: tokens.typography.fontSize.sm,
                    fontWeight: isLast
                      ? tokens.typography.fontWeight.medium
                      : tokens.typography.fontWeight.regular,
                  }}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  TopBar                                                             */
/* ------------------------------------------------------------------ */

export interface TopBarProps {
  /** Left side content (logo, hamburger) */
  left?: React.ReactNode;
  /** Center content (search, breadcrumb) */
  center?: React.ReactNode;
  /** Right side content (user menu, notifications) */
  right?: React.ReactNode;
  className?: string;
  /** Height of the top bar; default 48px */
  height?: number;
}

export function TopBar({
  left,
  center,
  right,
  className,
  height = 48,
}: TopBarProps) {
  return (
    <header
      className={cn('flex items-center justify-between px-4 shrink-0', className)}
      style={{
        height: `${height}px`,
        backgroundColor: tokens.colors.bg.surface,
        borderBottom: `1px solid ${tokens.colors.border.subtle}`,
      }}
      role="banner"
    >
      <div className="flex items-center gap-3">{left}</div>
      <div className="flex-1 flex justify-center">{center}</div>
      <div className="flex items-center gap-3">{right}</div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  NavTabs                                                            */
/* ------------------------------------------------------------------ */

export interface NavTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface NavTabsProps {
  tabs: NavTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function NavTabs({ tabs, activeTab, onTabChange, className }: NavTabsProps) {
  return (
    <nav
      className={cn('flex items-center gap-0', className)}
      role="tablist"
      aria-label="Navigation tabs"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onTabChange(tab.id)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors relative"
            style={{
              color: isActive
                ? tokens.colors.text.primary
                : tokens.colors.text.muted,
              backgroundColor: isActive ? tokens.colors.bg.hover : 'transparent',
              cursor: tab.disabled ? 'not-allowed' : 'pointer',
              opacity: tab.disabled ? 0.4 : 1,
              transition: tokens.transitions.fast,
              borderBottom: isActive
                ? `2px solid ${tokens.colors.brand.accent}`
                : '2px solid transparent',
            }}
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className="ml-1 px-1.5 py-0.5 text-xs rounded-full"
                style={{
                  backgroundColor: tokens.colors.brand.primary,
                  color: '#FFFFFF',
                  fontSize: tokens.typography.fontSize.xs,
                  borderRadius: tokens.borderRadius.full,
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
