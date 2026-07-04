/**
 * IOB Navbar – Enhanced with Section 13 Breadcrumbs API
 *
 * Supports two usage modes:
 * 1. Legacy (no props): Uses useSidebar() hook for toggle
 *    - Used by src/app/(dashboard)/layout.tsx
 *
 * 2. Prop-based (Section 13): Accepts breadcrumbs array
 *    - Used by src/App.tsx Production Integration Matrix
 *
 * Backward compatibility: When no props are passed, falls back to legacy behavior.
 *
 * @version 2.13.0
 */

'use client';

import React from 'react';
import { Menu, ChevronRight } from '@/components/icons';
import { useSidebar } from '@/hooks/useSidebar';
import { tokens } from '@/design-system/tokens';
import Logo from '@/components/ui/Logo';

/* -------------------------------------------------------------------------- */
/* Section 13 Breadcrumbs API Types                                            */
/* -------------------------------------------------------------------------- */

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavbarProps {
  /** Breadcrumb trail (Section 13 API) */
  breadcrumbs?: BreadcrumbItem[];
  /** Optional title override */
  title?: string;
}

/* -------------------------------------------------------------------------- */
/* Navbar Component                                                            */
/* -------------------------------------------------------------------------- */

export function Navbar({ breadcrumbs, title }: NavbarProps = {}) {
  const { toggle } = useSidebar();

  return (
    <header
      style={{
        height: '56px',
        backgroundColor: tokens.colors.bg.surface,
        borderBottom: `1px solid ${tokens.colors.border.subtle}`,
        display: 'flex',
        alignItems: 'center',
        padding: `0 ${tokens.spacing.xl}`,
        gap: tokens.spacing.lg,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Hamburger menu toggle */}
      <button
        onClick={toggle}
        style={{
          padding: tokens.spacing.sm,
          backgroundColor: 'transparent',
          border: 'none',
          color: tokens.colors.text.secondary,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.borderRadius.md,
          transition: tokens.transitions.fast,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = tokens.colors.bg.hover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        aria-label="Toggle navigation"
      >
        <Menu size={20} />
      </button>

      {/* Logo */}
      <Logo />

      {/* Breadcrumbs (Section 13 API) or Title */}
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            fontSize: tokens.typography.fontSize.sm,
            color: tokens.colors.text.secondary,
            flex: 1,
          }}
        >
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <ChevronRight
                  size={14}
                  style={{
                    color: tokens.colors.text.muted,
                    flexShrink: 0,
                  }}
                />
              )}
              <span
                style={{
                  color:
                    idx === breadcrumbs.length - 1
                      ? tokens.colors.text.primary
                      : tokens.colors.text.secondary,
                  fontWeight:
                    idx === breadcrumbs.length - 1
                      ? tokens.typography.fontWeight.medium
                      : tokens.typography.fontWeight.regular,
                }}
              >
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    style={{
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    {crumb.label}
                  </a>
                ) : (
                  crumb.label
                )}
              </span>
            </React.Fragment>
          ))}
        </nav>
      ) : title ? (
        <h1
          style={{
            fontSize: tokens.typography.fontSize.lg,
            fontWeight: tokens.typography.fontWeight.medium,
            color: tokens.colors.text.primary,
            margin: 0,
            flex: 1,
          }}
        >
          {title}
        </h1>
      ) : (
        <div style={{ flex: 1 }} />
      )}
    </header>
  );
}

export default Navbar;
