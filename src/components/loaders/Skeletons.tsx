/**
 * IOB Skeletons – Loading skeleton placeholders (Phase 2)
 */

'use client';

import React from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';

/* ------------------------------------------------------------------ */
/*  Base Skeleton                                                      */
/* ------------------------------------------------------------------ */

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
  animate?: boolean;
}

export function Skeleton({
  width = '100%',
  height = '1rem',
  borderRadius,
  className,
  animate = true,
}: SkeletonProps) {
  return (
    <div
      className={cn(animate && 'animate-pulse', className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        backgroundColor: tokens.colors.bg.hover,
        borderRadius: borderRadius ?? tokens.borderRadius.sm,
      }}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  SkeletonText                                                       */
/* ------------------------------------------------------------------ */

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? '60%' : '100%'}
          height="0.875rem"
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SkeletonCard                                                       */
/* ------------------------------------------------------------------ */

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn('p-4', className)}
      style={{
        backgroundColor: tokens.colors.bg.surface,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.borderRadius.md,
      }}
      aria-hidden="true"
    >
      <div className="flex items-center gap-3 mb-4">
        <Skeleton width={32} height={32} borderRadius={tokens.borderRadius.full} />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton width="40%" height="0.875rem" />
          <Skeleton width="25%" height="0.6875rem" />
        </div>
      </div>
      <SkeletonText lines={2} />
      <div className="mt-4 flex gap-2">
        <Skeleton width={80} height={28} borderRadius={tokens.borderRadius.md} />
        <Skeleton width={80} height={28} borderRadius={tokens.borderRadius.md} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SkeletonTable                                                      */
/* ------------------------------------------------------------------ */

export interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function SkeletonTable({
  rows = 5,
  columns = 4,
  className,
}: SkeletonTableProps) {
  return (
    <div
      className={cn('overflow-hidden', className)}
      style={{
        backgroundColor: tokens.colors.bg.surface,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.borderRadius.md,
      }}
      aria-hidden="true"
    >
      {/* Header row */}
      <div
        className="flex gap-4 px-4 py-3"
        style={{ borderBottom: `1px solid ${tokens.colors.border.subtle}` }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton
            key={i}
            width={`${100 / columns}%`}
            height="0.75rem"
          />
        ))}
      </div>

      {/* Data rows */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="flex gap-4 px-4 py-3"
          style={{
            borderBottom:
              rowIdx < rows - 1
                ? `1px solid ${tokens.colors.border.subtle}`
                : undefined,
          }}
        >
          {Array.from({ length: columns }).map((_, colIdx) => (
            <Skeleton
              key={colIdx}
              width={`${70 + Math.random() * 30}%`}
              height="0.875rem"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
