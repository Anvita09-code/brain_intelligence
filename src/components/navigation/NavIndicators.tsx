/**
 * IOB NavIndicators – Navigation status indicators (Phase 2)
 *
 * Badges, notification dots, and status pills for sidebar items and tabs.
 */

'use client';

import React from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import { PulseRing } from '@/components/loaders/Spinners';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export interface StatusPillProps {
  status: 'online' | 'offline' | 'warning' | 'error' | 'maintenance';
  label?: string;
  pulse?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Badge                                                              */
/* ------------------------------------------------------------------ */

const badgeVariantStyles: Record<BadgeVariant, { bg: string; fg: string }> = {
  default: { bg: tokens.colors.bg.elevated, fg: tokens.colors.text.secondary },
  primary: { bg: tokens.colors.brand.primary, fg: '#FFFFFF' },
  success: { bg: tokens.colors.status.successBg, fg: tokens.colors.status.success },
  warning: { bg: tokens.colors.status.warningBg, fg: tokens.colors.status.warning },
  danger: { bg: tokens.colors.status.dangerBg, fg: tokens.colors.status.danger },
  info: { bg: tokens.colors.status.infoBg, fg: tokens.colors.status.info },
};

export function Badge({
  variant = 'default',
  children,
  className,
  dot = false,
}: BadgeProps) {
  const styles = badgeVariantStyles[variant];

  if (dot) {
    return (
      <span
        className={cn('inline-block w-2 h-2 rounded-full', className)}
        style={{
          backgroundColor: styles.fg,
          borderRadius: tokens.borderRadius.full,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className={cn('inline-flex items-center px-2 py-0.5 text-xs font-medium', className)}
      style={{
        backgroundColor: styles.bg,
        color: styles.fg,
        borderRadius: tokens.borderRadius.full,
        fontSize: tokens.typography.fontSize.xs,
        fontWeight: tokens.typography.fontWeight.medium,
      }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  NotificationDot                                                    */
/* ------------------------------------------------------------------ */

export interface NotificationDotProps {
  count?: number;
  max?: number;
  className?: string;
}

export function NotificationDot({
  count,
  max = 99,
  className,
}: NotificationDotProps) {
  if (!count || count <= 0) return null;

  const display = count > max ? `${max}+` : `${count}`;

  return (
    <span
      className={cn(
        'absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1',
        className,
      )}
      style={{
        backgroundColor: tokens.colors.status.danger,
        color: '#FFFFFF',
        fontSize: '10px',
        fontWeight: tokens.typography.fontWeight.bold,
        borderRadius: tokens.borderRadius.full,
        lineHeight: 1,
      }}
      aria-label={`${count} notifications`}
    >
      {display}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  StatusPill                                                         */
/* ------------------------------------------------------------------ */

const statusConfig: Record<
  StatusPillProps['status'],
  { color: string; label: string }
> = {
  online: { color: tokens.colors.status.success, label: 'Online' },
  offline: { color: tokens.colors.text.muted, label: 'Offline' },
  warning: { color: tokens.colors.status.warning, label: 'Warning' },
  error: { color: tokens.colors.status.danger, label: 'Error' },
  maintenance: { color: tokens.colors.status.info, label: 'Maintenance' },
};

export function StatusPill({
  status,
  label: labelProp,
  pulse = false,
  className,
}: StatusPillProps) {
  const config = statusConfig[status];
  const displayLabel = labelProp ?? config.label;

  return (
    <span
      className={cn('inline-flex items-center gap-1.5', className)}
      style={{
        fontSize: tokens.typography.fontSize.xs,
        color: config.color,
        fontWeight: tokens.typography.fontWeight.medium,
      }}
    >
      {pulse ? (
        <PulseRing color={config.color} size={8} />
      ) : (
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{
            backgroundColor: config.color,
            borderRadius: tokens.borderRadius.full,
          }}
        />
      )}
      {displayLabel}
    </span>
  );
}
