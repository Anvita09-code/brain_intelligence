/**
 * IOB Status Indicators – Operational status display components (Phase 2)
 */

'use client';

import React from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import { PulseRing } from '@/components/loaders/Spinners';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Minus,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type OperationalStatus =
  | 'running'
  | 'stopped'
  | 'warning'
  | 'critical'
  | 'maintenance'
  | 'unknown';

export interface StatusIndicatorProps {
  status: OperationalStatus;
  label?: string;
  showIcon?: boolean;
  showPulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface StatusCardProps {
  status: OperationalStatus;
  title: string;
  value?: string | number;
  unit?: string;
  detail?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Status Config                                                      */
/* ------------------------------------------------------------------ */

const statusConfig: Record<
  OperationalStatus,
  { color: string; bgColor: string; icon: React.ElementType; label: string }
> = {
  running: {
    color: tokens.colors.status.success,
    bgColor: tokens.colors.status.successBg,
    icon: CheckCircle,
    label: 'Running',
  },
  stopped: {
    color: tokens.colors.text.muted,
    bgColor: tokens.colors.bg.elevated,
    icon: Minus,
    label: 'Stopped',
  },
  warning: {
    color: tokens.colors.status.warning,
    bgColor: tokens.colors.status.warningBg,
    icon: AlertTriangle,
    label: 'Warning',
  },
  critical: {
    color: tokens.colors.status.danger,
    bgColor: tokens.colors.status.dangerBg,
    icon: XCircle,
    label: 'Critical',
  },
  maintenance: {
    color: tokens.colors.status.info,
    bgColor: tokens.colors.status.infoBg,
    icon: Info,
    label: 'Maintenance',
  },
  unknown: {
    color: tokens.colors.text.muted,
    bgColor: tokens.colors.bg.elevated,
    icon: Minus,
    label: 'Unknown',
  },
};

/* ------------------------------------------------------------------ */
/*  StatusIndicator                                                    */
/* ------------------------------------------------------------------ */

const statusSizeMap = {
  sm: { icon: 14, text: tokens.typography.fontSize.xs },
  md: { icon: 16, text: tokens.typography.fontSize.sm },
  lg: { icon: 20, text: tokens.typography.fontSize.base },
};

export function StatusIndicator({
  status,
  label: labelProp,
  showIcon = true,
  showPulse = false,
  size = 'md',
  className,
}: StatusIndicatorProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const displayLabel = labelProp ?? config.label;
  const sizeConfig = statusSizeMap[size];

  return (
    <span
      className={cn('inline-flex items-center gap-1.5', className)}
      role="status"
      aria-label={displayLabel}
    >
      {showPulse ? (
        <PulseRing color={config.color} size={sizeConfig.icon * 0.6} />
      ) : showIcon ? (
        <Icon size={sizeConfig.icon} style={{ color: config.color }} />
      ) : (
        <span
          className="inline-block rounded-full"
          style={{
            width: `${sizeConfig.icon * 0.5}px`,
            height: `${sizeConfig.icon * 0.5}px`,
            backgroundColor: config.color,
            borderRadius: tokens.borderRadius.full,
          }}
        />
      )}
      <span
        style={{
          color: config.color,
          fontSize: sizeConfig.text,
          fontWeight: tokens.typography.fontWeight.medium,
        }}
      >
        {displayLabel}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  StatusCard                                                         */
/* ------------------------------------------------------------------ */

export function StatusCard({
  status,
  title,
  value,
  unit,
  detail,
  className,
}: StatusCardProps) {
  const config = statusConfig[status];

  return (
    <div
      className={cn('flex flex-col gap-2 p-4', className)}
      style={{
        backgroundColor: tokens.colors.bg.surface,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderLeft: `3px solid ${config.color}`,
        borderRadius: tokens.borderRadius.md,
      }}
    >
      <div className="flex items-center justify-between">
        <span
          style={{
            color: tokens.colors.text.secondary,
            fontSize: tokens.typography.fontSize.sm,
            fontWeight: tokens.typography.fontWeight.medium,
          }}
        >
          {title}
        </span>
        <StatusIndicator status={status} size="sm" />
      </div>

      {value !== undefined && (
        <div className="flex items-baseline gap-1">
          <span
            style={{
              fontFamily: tokens.typography.fontFamily.mono,
              fontSize: tokens.typography.fontSize.xl,
              fontWeight: tokens.typography.fontWeight.bold,
              color: tokens.colors.text.primary,
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
      )}

      {detail && (
        <span
          style={{
            color: tokens.colors.text.muted,
            fontSize: tokens.typography.fontSize.xs,
          }}
        >
          {detail}
        </span>
      )}
    </div>
  );
}
