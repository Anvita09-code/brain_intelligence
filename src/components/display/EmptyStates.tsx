/**
 * IOB EmptyStates – Placeholder components for empty data views (Phase 2)
 */

'use client';

import React from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import {
  Database,
  SearchX,
  WifiOff,
  AlertTriangle,
  Inbox,
  FileX,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type EmptyStateVariant =
  | 'noData'
  | 'noResults'
  | 'offline'
  | 'error'
  | 'noItems'
  | 'noFile';

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  /** Override the default icon */
  icon?: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Variant Configs                                                    */
/* ------------------------------------------------------------------ */

const variantConfig: Record<
  EmptyStateVariant,
  { icon: React.ElementType; title: string; description: string }
> = {
  noData: {
    icon: Database,
    title: 'No Data Available',
    description: 'There is no telemetry data to display for this time range.',
  },
  noResults: {
    icon: SearchX,
    title: 'No Results Found',
    description: 'Try adjusting your filters or search query.',
  },
  offline: {
    icon: WifiOff,
    title: 'Connection Lost',
    description: 'Unable to reach the data source. Check your network.',
  },
  error: {
    icon: AlertTriangle,
    title: 'Something Went Wrong',
    description: 'An unexpected error occurred. Please try again.',
  },
  noItems: {
    icon: Inbox,
    title: 'No Items',
    description: 'This collection is currently empty.',
  },
  noFile: {
    icon: FileX,
    title: 'No File Selected',
    description: 'Upload or select a file to continue.',
  },
};

/* ------------------------------------------------------------------ */
/*  EmptyState                                                         */
/* ------------------------------------------------------------------ */

export function EmptyState({
  variant = 'noData',
  title: titleProp,
  description: descProp,
  action,
  className,
  icon,
}: EmptyStateProps) {
  const config = variantConfig[variant];
  const IconComponent = config.icon;
  const title = titleProp ?? config.title;
  const description = descProp ?? config.description;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-12 px-6',
        className,
      )}
      role="status"
    >
      <div
        className="flex items-center justify-center w-14 h-14 rounded-full mb-4"
        style={{ backgroundColor: tokens.colors.bg.elevated }}
      >
        {icon ?? (
          <IconComponent
            className="w-7 h-7"
            style={{ color: tokens.colors.text.muted }}
          />
        )}
      </div>

      <h3
        style={{
          color: tokens.colors.text.primary,
          fontSize: tokens.typography.fontSize.lg,
          fontWeight: tokens.typography.fontWeight.bold,
          marginBottom: tokens.spacing.xs,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: tokens.colors.text.muted,
          fontSize: tokens.typography.fontSize.sm,
          maxWidth: '360px',
          lineHeight: tokens.typography.lineHeight.normal,
        }}
      >
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
