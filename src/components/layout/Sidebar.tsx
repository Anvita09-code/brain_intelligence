/**
 * IOB Sidebar – Enhanced with Section 13 Prop-Based API
 *
 * Supports two usage modes:
 * 1. Legacy (no props): Uses useSidebar() hook and hardcoded routes
 *    - Used by src/app/(dashboard)/layout.tsx
 *
 * 2. Prop-based (Section 13): Accepts isCollapsed, onToggle, activeItem, groups
 *    - Used by src/App.tsx Production Integration Matrix
 *
 * Backward compatibility: When no props are passed, falls back to legacy behavior.
 *
 * @version 2.13.0
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useSidebar } from '@/hooks/useSidebar';
import { tokens } from '@/design-system/tokens';
import {
  LayoutDashboard,
  Layers,
  AlertTriangle,
  TrendingUp,
  Network,
  MessageSquare,
  Settings,
  User,
  ChevronLeft,
} from '@/components/icons';

/* -------------------------------------------------------------------------- */
/* Legacy Routes (backward compatibility)                                      */
/* -------------------------------------------------------------------------- */

const routes = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Assets', path: '/assets', icon: Layers },
  { name: 'Alerts', path: '/alerts', icon: AlertTriangle },
  { name: 'Predictions', path: '/predictions', icon: TrendingUp },
  { name: 'Knowledge Graph', path: '/knowledge', icon: Network },
  { name: 'Co-Pilot Chat', path: '/chat', icon: MessageSquare },
  { name: 'Loaders Demo', path: '/loaders-demo', icon: TrendingUp },
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'Profile', path: '/profile', icon: User },
];

/* -------------------------------------------------------------------------- */
/* Section 13 Prop-Based API Types                                             */
/* -------------------------------------------------------------------------- */

export interface SidebarGroupItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  path?: string;
}

export interface SidebarGroup {
  title: string;
  items: SidebarGroupItem[];
}

export interface SidebarProps {
  /** Collapsed state (controlled) */
  isCollapsed?: boolean;
  /** Toggle callback */
  onToggle?: () => void;
  /** Currently active item ID */
  activeItem?: string;
  /** Navigation groups (Section 13 API) */
  groups?: SidebarGroup[];
}

/* -------------------------------------------------------------------------- */
/* Sidebar Component                                                           */
/* -------------------------------------------------------------------------- */

export function Sidebar({
  isCollapsed: controlledCollapsed,
  onToggle,
  activeItem,
  groups,
}: SidebarProps = {}) {
  const sidebar = useSidebar();
  const pathname = usePathname();

  // Determine if using prop-based API or legacy API
  const isPropBased = groups !== undefined;
  const isOpen = isPropBased ? !controlledCollapsed : sidebar.isOpen;
  const handleToggle = isPropBased ? onToggle : sidebar.toggle;

  const sidebarWidth = isOpen ? '240px' : '64px';

  return (
    <aside
      style={{
        width: sidebarWidth,
        backgroundColor: tokens.colors.bg.surface,
        borderRight: `1px solid ${tokens.colors.border.subtle}`,
        transition: tokens.transitions.normal,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
      }}
    >
      {/* Toggle button */}
      <button
        onClick={handleToggle}
        style={{
          padding: tokens.spacing.md,
          backgroundColor: 'transparent',
          border: 'none',
          color: tokens.colors.text.secondary,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isOpen ? 'flex-end' : 'center',
          transition: tokens.transitions.fast,
        }}
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <ChevronLeft
          size={20}
          style={{
            transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: tokens.transitions.fast,
          }}
        />
      </button>

      {/* Navigation content */}
      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: isOpen ? tokens.spacing.md : tokens.spacing.sm,
        }}
      >
        {isPropBased && groups ? (
          /* Section 13 Prop-Based Navigation Groups */
          groups.map((group, groupIdx) => (
            <div key={groupIdx} style={{ marginBottom: tokens.spacing.xl }}>
              {isOpen && (
                <div
                  style={{
                    fontSize: tokens.typography.fontSize.xs,
                    fontWeight: tokens.typography.fontWeight.bold,
                    color: tokens.colors.text.muted,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                    marginBottom: tokens.spacing.xs,
                  }}
                >
                  {group.title}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                const href = item.path || '#';

                return (
                  <Link
                    key={item.id}
                    href={href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: tokens.spacing.md,
                      padding: isOpen
                        ? `${tokens.spacing.sm} ${tokens.spacing.md}`
                        : tokens.spacing.sm,
                      marginBottom: tokens.spacing.xs,
                      backgroundColor: isActive
                        ? tokens.colors.bg.active
                        : 'transparent',
                      color: isActive
                        ? tokens.colors.text.primary
                        : tokens.colors.text.secondary,
                      textDecoration: 'none',
                      borderRadius: tokens.borderRadius.md,
                      fontSize: tokens.typography.fontSize.sm,
                      transition: tokens.transitions.fast,
                      justifyContent: isOpen ? 'flex-start' : 'center',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = tokens.colors.bg.hover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {Icon && <Icon size={18} style={{ flexShrink: 0 }} />}
                    {isOpen && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))
        ) : (
          /* Legacy Route-Based Navigation */
          routes.map((route) => {
            const isActive = pathname === route.path;
            const Icon = route.icon;

            return (
              <Link
                key={route.path}
                href={route.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: tokens.spacing.md,
                  padding: isOpen
                    ? `${tokens.spacing.sm} ${tokens.spacing.md}`
                    : tokens.spacing.sm,
                  marginBottom: tokens.spacing.xs,
                  backgroundColor: isActive
                    ? tokens.colors.bg.active
                    : 'transparent',
                  color: isActive
                    ? tokens.colors.text.primary
                    : tokens.colors.text.secondary,
                  textDecoration: 'none',
                  borderRadius: tokens.borderRadius.md,
                  fontSize: tokens.typography.fontSize.sm,
                  transition: tokens.transitions.fast,
                  justifyContent: isOpen ? 'flex-start' : 'center',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = tokens.colors.bg.hover;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                {isOpen && <span>{route.name}</span>}
              </Link>
            );
          })
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
