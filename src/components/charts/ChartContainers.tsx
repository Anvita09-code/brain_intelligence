/**
 * IOB ChartContainers – Industrial Chart Wrapper Components (Phase 2)
 *
 * Provides standardized containers for chart visualizations (line, bar,
 * gauge, heatmap) with consistent padding, headers, and status overlays.
 *
 * Integration:
 *   - Uses CSS custom properties from design-system/theme.ts
 *   - Compatible with any charting lib (Recharts, D3, visx, etc.)
 *   - Uses `cn()` for class merging with existing Tailwind classes
 */

'use client';

import React from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ChartStatus = 'normal' | 'warning' | 'critical' | 'info';

export interface ChartContainerProps {
  /** Chart title displayed in the header bar */
  title: string;
  /** Optional subtitle / metric summary */
  subtitle?: string;
  /** Operational status indicator */
  status?: ChartStatus;
  /** Whether chart data is loading */
  loading?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Chart content (Recharts, D3, SVG, etc.) */
  children: React.ReactNode;
  /** Optional toolbar actions (right side of header) */
  actions?: React.ReactNode;
  /** Minimum height of the chart area */
  minHeight?: string | number;
}

export interface ChartMetricProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'flat';
  trendValue?: string;
  status?: ChartStatus;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Status Helpers                                                     */
/* ------------------------------------------------------------------ */

const statusColorMap: Record<ChartStatus, { fg: string; bg: string }> = {
  normal: { fg: tokens.colors.status.success, bg: tokens.colors.status.successBg },
  warning: { fg: tokens.colors.status.warning, bg: tokens.colors.status.warningBg },
  critical: { fg: tokens.colors.status.danger, bg: tokens.colors.status.dangerBg },
  info: { fg: tokens.colors.status.info, bg: tokens.colors.status.infoBg },
};

/* ------------------------------------------------------------------ */
/*  ChartContainer                                                     */
/* ------------------------------------------------------------------ */

export function ChartContainer({
  title,
  subtitle,
  status = 'normal',
  loading = false,
  className,
  children,
  actions,
  minHeight = 280,
}: ChartContainerProps) {
  const statusColors = statusColorMap[status];

  return (
    <figure
      className={cn(
        'flex flex-col overflow-hidden',
        className,
      )}
      style={{
        backgroundColor: tokens.colors.bg.surface,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.borderRadius.md,
      }}
      role="figure"
      aria-label={`${title} chart`}
    >
      {/* Header Bar */}
      <figcaption
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: `1px solid ${tokens.colors.border.subtle}` }}
      >
        <div className="flex items-center gap-3">
          {/* Status dot */}
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: statusColors.fg }}
            aria-label={`Status: ${status}`}
          />
          <div>
            <h3
              style={{
                color: tokens.colors.text.primary,
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.medium,
                lineHeight: tokens.typography.lineHeight.tight,
              }}
            >
              {title}
            </h3>
            {subtitle && (
              <p
                style={{
                  color: tokens.colors.text.muted,
                  fontSize: tokens.typography.fontSize.xs,
                  marginTop: tokens.spacing.xxs,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </figcaption>

      {/* Chart Body */}
      <div
        className="relative flex-1 p-4"
        style={{ minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex items-center gap-2"
              style={{ color: tokens.colors.text.muted, fontSize: tokens.typography.fontSize.sm }}
            >
              <Activity className="w-4 h-4 animate-pulse" />
              <span>Loading telemetry…</span>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  ChartMetric                                                        */
/* ------------------------------------------------------------------ */

const TrendIcon = { up: TrendingUp, down: TrendingDown, flat: Activity } as const;

export function ChartMetric({
  label,
  value,
  unit,
  trend,
  trendValue,
  status = 'normal',
  className,
}: ChartMetricProps) {
  const statusColors = statusColorMap[status];
  const Icon = trend ? TrendIcon[trend] : null;
  const trendColor =
    trend === 'up'
      ? tokens.colors.status.success
      : trend === 'down'
        ? tokens.colors.status.danger
        : tokens.colors.text.muted;

  return (
    <div
      className={cn('flex flex-col gap-1 p-3', className)}
      style={{
        backgroundColor: tokens.colors.bg.surface,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.borderRadius.md,
      }}
    >
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

      <div className="flex items-baseline gap-1.5">
        <span
          style={{
            color: statusColors.fg,
            fontSize: tokens.typography.fontSize.xl,
            fontWeight: tokens.typography.fontWeight.bold,
            fontFamily: tokens.typography.fontFamily.mono,
            lineHeight: tokens.typography.lineHeight.tight,
          }}
        >
          {value}
        </span>
        {unit && (
          <span
            style={{
              color: tokens.colors.text.muted,
              fontSize: tokens.typography.fontSize.xs,
            }}
          >
            {unit}
          </span>
        )}
      </div>

      {trend && trendValue && Icon && (
        <div className="flex items-center gap-1" style={{ color: trendColor }}>
          <Icon className="w-3 h-3" />
          <span style={{ fontSize: tokens.typography.fontSize.xs }}>{trendValue}</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ChartEmptyState                                                    */
/* ------------------------------------------------------------------ */

export interface ChartEmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

export function ChartEmptyState({
  message = 'No telemetry data available',
  icon,
}: ChartEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 py-10">
      {icon || (
        <AlertTriangle
          className="w-8 h-8"
          style={{ color: tokens.colors.text.muted }}
        />
      )}
      <p
        style={{
          color: tokens.colors.text.muted,
          fontSize: tokens.typography.fontSize.sm,
        }}
      >
        {message}
      </p>
    </div>
  );
}
