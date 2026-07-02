/**
 * IOB System Health Panel – Status & Health Tracking Architecture
 *
 * Composes the status primitives (Badge, HealthIndicator, ProgressIndicator,
 * StatusIndicator, StatusCard) into a live UI-health tracking panel.
 *
 * Self-contained: runs a lightweight client-side health tick so it works
 * whether or not TelemetryProvider is mounted. Subsystem rows mirror the
 * TelemetryContext AssetStatus shape ('ok' | 'warning' | 'critical' | 'offline')
 * mapped onto OperationalStatus for the indicator components.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import {
  Badge,
  HealthIndicator,
  ProgressIndicator,
  StatusIndicator,
  StatusCard,
  type OperationalStatus,
} from './Indicators';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SubsystemHealth {
  id: string;
  name: string;
  status: OperationalStatus;
  health: number; // 0–100
  detail?: string;
}

export interface SystemHealthPanelProps {
  /** Override the subsystem rows (defaults to IOB core subsystems) */
  subsystems?: SubsystemHealth[];
  /** Disable the simulated live tick (e.g. when feeding real telemetry) */
  live?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Defaults – mirrors TelemetryContext asset naming                   */
/* ------------------------------------------------------------------ */

const DEFAULT_SUBSYSTEMS: SubsystemHealth[] = [
  { id: 'telemetry-bus', name: 'Telemetry Bus', status: 'running', health: 98, detail: 'WS stream nominal' },
  { id: 'prediction-engine', name: 'Prediction Engine', status: 'running', health: 92, detail: 'Model v2.4 loaded' },
  { id: 'knowledge-graph', name: 'Knowledge Graph', status: 'warning', health: 74, detail: 'Reindex in progress' },
  { id: 'alert-router', name: 'Alert Router', status: 'running', health: 96, detail: 'All channels active' },
];

/** Map a health score to a Badge variant, aligned with HealthIndicator thresholds. */
export function healthToVariant(
  health: number
): 'success' | 'warning' | 'danger' {
  if (health < 50) return 'danger';
  if (health < 85) return 'warning';
  return 'success';
}

/** Map a health score to an OperationalStatus. */
export function healthToStatus(health: number): OperationalStatus {
  if (health < 50) return 'critical';
  if (health < 85) return 'warning';
  return 'running';
}

/* ------------------------------------------------------------------ */
/*  SystemHealthPanel                                                  */
/* ------------------------------------------------------------------ */

export function SystemHealthPanel({
  subsystems: subsystemsProp,
  live = true,
  className,
}: SystemHealthPanelProps) {
  const [subsystems, setSubsystems] = useState<SubsystemHealth[]>(
    subsystemsProp ?? DEFAULT_SUBSYSTEMS
  );

  // Keep in sync when driven externally
  useEffect(() => {
    if (subsystemsProp) setSubsystems(subsystemsProp);
  }, [subsystemsProp]);

  // Lightweight simulated health tick (only when not externally driven)
  useEffect(() => {
    if (!live || subsystemsProp) return;
    const timer = setInterval(() => {
      setSubsystems((prev) =>
        prev.map((s) => {
          const drift = (Math.random() - 0.45) * 4;
          const health = Math.round(
            Math.max(40, Math.min(100, s.health + drift))
          );
          return { ...s, health, status: healthToStatus(health) };
        })
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [live, subsystemsProp]);

  const overall = Math.round(
    subsystems.reduce((sum, s) => sum + s.health, 0) /
      Math.max(1, subsystems.length)
  );

  return (
    <section
      className={cn('flex flex-col', className)}
      aria-label="System health tracking"
      style={{
        backgroundColor: tokens.colors.bg.surface,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.borderRadius.md,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.lg,
      }}
    >
      {/* Header: overall UI health */}
      <div className="flex items-center justify-between">
        <div className="flex items-center" style={{ gap: tokens.spacing.md }}>
          <span
            style={{
              color: tokens.colors.text.primary,
              fontSize: tokens.typography.fontSize.lg,
              fontWeight: tokens.typography.fontWeight.bold,
            }}
          >
            System Health
          </span>
          <Badge variant={healthToVariant(overall)}>
            {overall >= 85 ? 'NOMINAL' : overall >= 50 ? 'DEGRADED' : 'CRITICAL'}
          </Badge>
        </div>
        <HealthIndicator value={overall} />
      </div>

      <ProgressIndicator value={overall} />

      {/* Subsystem grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
        style={{ gap: tokens.spacing.md }}
      >
        {subsystems.map((s) => (
          <StatusCard
            key={s.id}
            status={s.status}
            title={s.name}
            value={s.health}
            unit="% UI-H"
            detail={s.detail}
          />
        ))}
      </div>

      {/* Footer strip: compact indicators */}
      <div
        className="flex flex-wrap items-center"
        style={{
          gap: tokens.spacing.xl,
          borderTop: `1px solid ${tokens.colors.border.subtle}`,
          paddingTop: tokens.spacing.md,
        }}
      >
        {subsystems.map((s) => (
          <div
            key={s.id}
            className="flex items-center"
            style={{ gap: tokens.spacing.sm }}
          >
            <StatusIndicator
              status={s.status}
              label={s.name}
              size="sm"
              showPulse={s.status === 'running'}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
