/**
 * IOB Spinners – Loading spinners (Phase 2)
 */

'use client';

import React from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import { Loader2 } from '@/components/icons';

/* ------------------------------------------------------------------ */
/*  Spinner                                                            */
/* ------------------------------------------------------------------ */

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  label?: string;
  className?: string;
}

const spinnerSizeMap: Record<SpinnerSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

export function Spinner({
  size = 'md',
  color,
  label = 'Loading…',
  className,
}: SpinnerProps) {
  return (
    <Loader2
      className={cn('animate-spin', className)}
      size={spinnerSizeMap[size]}
      style={{ color: color ?? tokens.colors.brand.primary }}
      aria-label={label}
      role="status"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  SpinnerOverlay – Full-area loading overlay                         */
/* ------------------------------------------------------------------ */

export interface SpinnerOverlayProps {
  message?: string;
  size?: SpinnerSize;
  className?: string;
  /** Render as absolute overlay within parent (parent must be position: relative) */
  absolute?: boolean;
}

export function SpinnerOverlay({
  message = 'Loading…',
  size = 'lg',
  className,
  absolute = false,
}: SpinnerOverlayProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3',
        absolute ? 'absolute inset-0 z-50' : 'min-h-[200px]',
        className,
      )}
      style={{
        backgroundColor: absolute
          ? `${tokens.colors.bg.deep}CC`
          : 'transparent',
        backdropFilter: absolute ? 'blur(2px)' : undefined,
      }}
      role="status"
      aria-live="polite"
    >
      <Spinner size={size} />
      <span
        style={{
          color: tokens.colors.text.muted,
          fontSize: tokens.typography.fontSize.sm,
        }}
      >
        {message}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PulseRing – Animated ring for real-time status                     */
/* ------------------------------------------------------------------ */

export interface PulseRingProps {
  color?: string;
  size?: number;
  className?: string;
}

export function PulseRing({
  color,
  size = 12,
  className,
}: PulseRingProps) {
  const ringColor = color ?? tokens.colors.status.success;

  return (
    <span
      className={cn('relative inline-flex', className)}
      aria-hidden="true"
    >
      <span
        className="absolute inline-flex rounded-full animate-ping opacity-50"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: ringColor,
          borderRadius: tokens.borderRadius.full,
        }}
      />
      <span
        className="relative inline-flex rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: ringColor,
          borderRadius: tokens.borderRadius.full,
        }}
      />
    </span>
  );
}
