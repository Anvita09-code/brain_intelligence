/**
 * IOB Card – Industrial Module Card Component (Phase 2)
 *
 * Standardized card for dashboard modules, KPI tiles, and telemetry panels.
 *
 * NOTE: This is the Phase 2 replacement for src/components/ui/Card.tsx.
 * The old file can remain for backward compatibility – new code should
 * import from '@/components/display'.
 */

'use client';

import React from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'status' | 'glass';

export interface CardProps {
  variant?: CardVariant;
  /** Status color stripe on left edge */
  statusColor?: 'success' | 'warning' | 'danger' | 'info' | string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  as?: React.ElementType;
  /**
   * Convenience inline-header props (Section 6 spec).
   * When provided, an internal `<CardHeader>` is rendered automatically so
   * callers don't have to compose `<CardHeader>`/`<CardBody>` manually.
   * The compound `CardHeader`/`CardBody`/`CardFooter` API below still works
   * unchanged for callers that prefer full control over composition.
   */
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

export interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Padding Map                                                        */
/* ------------------------------------------------------------------ */

const paddingMap = {
  none: '0',
  sm: tokens.spacing.sm,
  md: tokens.spacing.lg,
  lg: tokens.spacing.xl,
} as const;

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */

export function Card({
  variant = 'default',
  statusColor,
  padding = 'md',
  className,
  children,
  onClick,
  as: Component = 'article',
  title,
  subtitle,
  actions,
  footer,
  style,
}: CardProps) {
  const bg =
    variant === 'elevated'
      ? tokens.colors.bg.elevated
      : variant === 'glass'
        ? 'rgba(18, 24, 29, 0.75)'
        : tokens.colors.bg.surface;
  const border =
    variant === 'outlined'
      ? tokens.colors.border.default
      : tokens.colors.border.subtle;
  const shadow =
    variant === 'elevated' ? tokens.shadows.overlay : tokens.shadows.flat;

  const resolvedStatusColor = statusColor
    ? statusColor in tokens.colors.status
      ? tokens.colors.status[statusColor as keyof typeof tokens.colors.status]
      : statusColor
    : undefined;

  // Compound-header usage (<Card><CardHeader .../><CardBody .../></Card>)
  // stays untouched; these convenience props just wrap the same
  // CardHeader/CardFooter primitives so both authoring styles render
  // identically.
  const hasInlineHeader = Boolean(title || subtitle || actions);

  return (
    <Component
      className={cn(
        'relative flex flex-col overflow-hidden',
        onClick && 'cursor-pointer',
        className,
      )}
      style={{
        backgroundColor: variant === 'outlined' ? 'transparent' : bg,
        border: `1px solid ${border}`,
        ...(variant === 'glass' ? { backdropFilter: 'blur(8px)' } : {}),
        borderRadius: tokens.borderRadius.md,
        boxShadow: shadow,
        transition: tokens.transitions.fast,
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={
        onClick
          ? (e: React.MouseEvent<HTMLElement>) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                tokens.colors.bg.hover;
            }
          : undefined
      }
      onMouseLeave={
        onClick
          ? (e: React.MouseEvent<HTMLElement>) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                variant === 'outlined' ? 'transparent' : bg;
            }
          : undefined
      }
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Status stripe */}
      {resolvedStatusColor && (
        <div
          className="absolute top-0 left-0 bottom-0 w-1"
          style={{ backgroundColor: resolvedStatusColor }}
        />
      )}
      <div
        style={{
          padding: paddingMap[padding],
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {hasInlineHeader && (
          <CardHeader title={title ?? ''} subtitle={subtitle} actions={actions} />
        )}
        <div style={{ flex: 1 }}>{children}</div>
        {footer && <CardFooter>{footer}</CardFooter>}
      </div>
    </Component>
  );
}

/* ------------------------------------------------------------------ */
/*  Card Sub-Components                                                */
/* ------------------------------------------------------------------ */

export function CardHeader({ title, subtitle, actions, className }: CardHeaderProps) {
  return (
    <header
      className={cn('flex items-start justify-between mb-3', className)}
    >
      <div>
        <h3
          style={{
            color: tokens.colors.text.primary,
            fontSize: tokens.typography.fontSize.lg,
            fontWeight: tokens.typography.fontWeight.bold,
            lineHeight: tokens.typography.lineHeight.tight,
          }}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            style={{
              color: tokens.colors.text.secondary,
              fontSize: tokens.typography.fontSize.sm,
              marginTop: tokens.spacing.xxs,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </header>
  );
}

export function CardBody({ className, children }: CardBodyProps) {
  return <div className={cn('flex-1', className)}>{children}</div>;
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <footer
      className={cn('flex items-center gap-3 mt-4 pt-3', className)}
      style={{ borderTop: `1px solid ${tokens.colors.border.subtle}` }}
    >
      {children}
    </footer>
  );
}
