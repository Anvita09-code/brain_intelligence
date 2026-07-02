/**
 * IOB Structural – Layout primitives (Divider, Spacer, Grid, Section) (Phase 2)
 */

'use client';

import React from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';

/* ------------------------------------------------------------------ */
/*  Divider                                                            */
/* ------------------------------------------------------------------ */

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  /** Add label in the middle of the divider */
  label?: string;
}

export function Divider({
  orientation = 'horizontal',
  className,
  label,
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        className={cn('self-stretch', className)}
        style={{
          width: '1px',
          backgroundColor: tokens.colors.border.subtle,
        }}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (label) {
    return (
      <div
        className={cn('flex items-center gap-3', className)}
        role="separator"
      >
        <div
          className="flex-1"
          style={{ height: '1px', backgroundColor: tokens.colors.border.subtle }}
        />
        <span
          style={{
            color: tokens.colors.text.muted,
            fontSize: tokens.typography.fontSize.xs,
            fontWeight: tokens.typography.fontWeight.medium,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {label}
        </span>
        <div
          className="flex-1"
          style={{ height: '1px', backgroundColor: tokens.colors.border.subtle }}
        />
      </div>
    );
  }

  return (
    <hr
      className={cn('border-0', className)}
      style={{
        height: '1px',
        backgroundColor: tokens.colors.border.subtle,
      }}
      role="separator"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Spacer                                                             */
/* ------------------------------------------------------------------ */

export interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
}

const spacerSizeMap = {
  xs: tokens.spacing.xs,
  sm: tokens.spacing.sm,
  md: tokens.spacing.md,
  lg: tokens.spacing.lg,
  xl: tokens.spacing.xl,
  xxl: tokens.spacing.xxl,
};

export function Spacer({ size = 'md', className }: SpacerProps) {
  return (
    <div
      className={cn('shrink-0', className)}
      style={{ height: spacerSizeMap[size], width: '100%' }}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Grid                                                               */
/* ------------------------------------------------------------------ */

export interface GridProps {
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}

const gapSizeMap = {
  xs: tokens.spacing.xs,
  sm: tokens.spacing.sm,
  md: tokens.spacing.md,
  lg: tokens.spacing.lg,
  xl: tokens.spacing.xl,
};

export function Grid({ columns = 1, gap = 'md', className, children }: GridProps) {
  const colCount = typeof columns === 'number' ? columns : columns.lg ?? columns.md ?? columns.sm ?? 1;

  return (
    <div
      className={cn('grid', className)}
      style={{
        gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
        gap: gapSizeMap[gap],
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export interface SectionProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const sectionPaddingMap = {
  none: '0',
  sm: tokens.spacing.sm,
  md: tokens.spacing.lg,
  lg: tokens.spacing.xl,
};

export function Section({
  title,
  description,
  actions,
  children,
  className,
  padding = 'md',
}: SectionProps) {
  return (
    <section className={cn(className)} style={{ padding: sectionPaddingMap[padding] }}>
      {(title || actions) && (
        <header className="flex items-start justify-between mb-4">
          <div>
            {title && (
              <h2
                style={{
                  color: tokens.colors.text.primary,
                  fontSize: tokens.typography.fontSize.xl,
                  fontWeight: tokens.typography.fontWeight.bold,
                  lineHeight: tokens.typography.lineHeight.tight,
                }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className="mt-1"
                style={{
                  color: tokens.colors.text.secondary,
                  fontSize: tokens.typography.fontSize.sm,
                }}
              >
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
