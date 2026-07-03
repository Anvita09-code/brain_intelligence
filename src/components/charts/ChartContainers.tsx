'use client';

import React from 'react';
import { tokens } from '../../design-system/tokens';
import { TrendingUp, Activity, Layers } from '../icons';
import { Stack } from '../layout/Structural';

interface ChartWrapperProps {
  title: string;
  height?: string;
}

export const LineChartContainer: React.FC<ChartWrapperProps> = ({ title, height = '200px' }) => {
  return (
    <div style={{ border: `1px solid ${tokens.colors.border.subtle}`, borderRadius: tokens.borderRadius.md, padding: tokens.spacing.md, backgroundColor: tokens.colors.bg.surface }}>
      <div style={{ fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.medium, marginBottom: tokens.spacing.md, color: tokens.colors.text.secondary }}>{title}</div>
      <Stack align="center" justify="center" style={{ height, backgroundColor: tokens.colors.bg.deep, borderRadius: tokens.borderRadius.sm, border: `1px dashed ${tokens.colors.border.default}` }}>
        <TrendingUp size={24} style={{ color: tokens.colors.brand.accent, marginBottom: '4px' }} />
        <span style={{ fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.muted }}>Real-time Line Stream Placeholder</span>
      </Stack>
    </div>
  );
};

export const GaugeContainer: React.FC<ChartWrapperProps & { value: string }> = ({ title, value, height = '140px' }) => {
  return (
    <div style={{ border: `1px solid ${tokens.colors.border.subtle}`, borderRadius: tokens.borderRadius.md, padding: tokens.spacing.md, backgroundColor: tokens.colors.bg.surface }}>
      <div style={{ fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.medium, marginBottom: tokens.spacing.md, color: tokens.colors.text.secondary }}>{title}</div>
      <Stack align="center" justify="center" style={{ height, backgroundColor: tokens.colors.bg.deep, borderRadius: tokens.borderRadius.sm, position: 'relative' }}>
        <Activity size={32} style={{ color: tokens.colors.status.warning, opacity: 0.15, position: 'absolute' }} />
        <span style={{ fontSize: '1.75rem', fontWeight: tokens.typography.fontWeight.bold, fontFamily: tokens.typography.fontFamily.mono, color: tokens.colors.text.primary }}>{value}</span>
        <span style={{ fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.muted }}>Telemetry Scale Bound</span>
      </Stack>
    </div>
  );
};

export const NetworkGraphContainer: React.FC<ChartWrapperProps> = ({ title, height = '300px' }) => {
  return (
    <div style={{ border: `1px solid ${tokens.colors.border.subtle}`, borderRadius: tokens.borderRadius.md, padding: tokens.spacing.md, backgroundColor: tokens.colors.bg.surface }}>
      <div style={{ fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.medium, marginBottom: tokens.spacing.md, color: tokens.colors.text.secondary }}>{title}</div>
      <Stack align="center" justify="center" style={{ height, backgroundColor: tokens.colors.bg.deep, borderRadius: tokens.borderRadius.sm, border: `1px dashed ${tokens.colors.border.default}` }}>
        <Layers size={24} style={{ color: tokens.colors.text.muted, marginBottom: '4px' }} />
        <span style={{ fontSize: tokens.typography.fontSize.xs, color: tokens.colors.text.muted }}>Digital Twin Mesh Topology Graph</span>
      </Stack>
    </div>
  );
};
