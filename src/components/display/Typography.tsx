/**
 * IOB Typography – Semantic Text Components (Phase 2)
 *
 * NOTE: This is the Phase 2 replacement for src/components/ui/Typography.tsx.
 * The old file can remain for backward compatibility – new code should
 * import from '@/components/display'.
 */

'use client';

import React from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';

/* ------------------------------------------------------------------ */
/*  Heading                                                            */
/* ------------------------------------------------------------------ */

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps {
  level?: HeadingLevel;
  className?: string;
  children: React.ReactNode;
  /** Override color */
  color?: 'primary' | 'secondary' | 'muted' | 'accent';
}

const headingSizeMap: Record<HeadingLevel, string> = {
  1: tokens.typography.fontSize.xxl,
  2: tokens.typography.fontSize.xl,
  3: tokens.typography.fontSize.lg,
  4: tokens.typography.fontSize.base,
  5: tokens.typography.fontSize.sm,
  6: tokens.typography.fontSize.xs,
};

export function Heading({
  level = 2,
  className,
  children,
  color = 'primary',
}: HeadingProps) {
  const Tag = `h${level}` as const;

  const colorMap = {
    primary: tokens.colors.text.primary,
    secondary: tokens.colors.text.secondary,
    muted: tokens.colors.text.muted,
    accent: tokens.colors.brand.accent,
  };

  return (
    <Tag
      className={cn(className)}
      style={{
        color: colorMap[color],
        fontSize: headingSizeMap[level],
        fontWeight: tokens.typography.fontWeight.bold,
        lineHeight: tokens.typography.lineHeight.tight,
        letterSpacing: level <= 2 ? '-0.01em' : undefined,
      }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Text                                                               */
/* ------------------------------------------------------------------ */

export type TextSize = 'xs' | 'sm' | 'base' | 'lg';
export type TextVariant = 'primary' | 'secondary' | 'muted' | 'disabled';

export interface TextProps {
  size?: TextSize;
  variant?: TextVariant;
  mono?: boolean;
  bold?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

const variantColorMap: Record<TextVariant, string> = {
  primary: tokens.colors.text.primary,
  secondary: tokens.colors.text.secondary,
  muted: tokens.colors.text.muted,
  disabled: tokens.colors.text.disabled,
};

export function Text({
  size = 'base',
  variant = 'primary',
  mono = false,
  bold = false,
  className,
  children,
  as: Component = 'p',
}: TextProps) {
  return (
    <Component
      className={cn(className)}
      style={{
        color: variantColorMap[variant],
        fontSize: tokens.typography.fontSize[size],
        fontFamily: mono
          ? tokens.typography.fontFamily.mono
          : tokens.typography.fontFamily.sans,
        fontWeight: bold
          ? tokens.typography.fontWeight.bold
          : tokens.typography.fontWeight.regular,
        lineHeight: tokens.typography.lineHeight.normal,
      }}
    >
      {children}
    </Component>
  );
}

/* ------------------------------------------------------------------ */
/*  Label                                                              */
/* ------------------------------------------------------------------ */

export interface LabelProps {
  htmlFor?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Label({ htmlFor, required, className, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(className)}
      style={{
        color: tokens.colors.text.secondary,
        fontSize: tokens.typography.fontSize.sm,
        fontWeight: tokens.typography.fontWeight.medium,
        display: 'block',
        marginBottom: tokens.spacing.xs,
      }}
    >
      {children}
      {required && (
        <span
          className="ml-0.5"
          style={{ color: tokens.colors.status.danger }}
          aria-hidden="true"
        >
          *
        </span>
      )}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Code (Inline)                                                      */
/* ------------------------------------------------------------------ */

export interface CodeProps {
  className?: string;
  children: React.ReactNode;
}

export function Code({ className, children }: CodeProps) {
  return (
    <code
      className={cn('px-1.5 py-0.5', className)}
      style={{
        fontFamily: tokens.typography.fontFamily.mono,
        fontSize: tokens.typography.fontSize.sm,
        color: tokens.colors.brand.accent,
        backgroundColor: tokens.colors.bg.elevated,
        borderRadius: tokens.borderRadius.sm,
        border: `1px solid ${tokens.colors.border.subtle}`,
      }}
    >
      {children}
    </code>
  );
}

/* ------------------------------------------------------------------ */
/*  KPIValue – Large monospaced numeric display for telemetry          */
/* ------------------------------------------------------------------ */

export interface KPIValueProps {
  value: string | number;
  unit?: string;
  status?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const kpiSizeMap = {
  sm: tokens.typography.fontSize.lg,
  md: tokens.typography.fontSize.xl,
  lg: tokens.typography.fontSize.xxl,
};

const kpiStatusColorMap = {
  success: tokens.colors.status.success,
  warning: tokens.colors.status.warning,
  danger: tokens.colors.status.danger,
  info: tokens.colors.status.info,
  default: tokens.colors.text.primary,
};

export function KPIValue({
  value,
  unit,
  status = 'default',
  size = 'md',
  className,
}: KPIValueProps) {
  return (
    <span
      className={cn('inline-flex items-baseline gap-1', className)}
      style={{
        fontFamily: tokens.typography.fontFamily.mono,
        fontSize: kpiSizeMap[size],
        fontWeight: tokens.typography.fontWeight.bold,
        color: kpiStatusColorMap[status],
        lineHeight: tokens.typography.lineHeight.tight,
      }}
    >
      {value}
      {unit && (
        <span
          style={{
            fontSize: tokens.typography.fontSize.xs,
            color: tokens.colors.text.muted,
            fontWeight: tokens.typography.fontWeight.regular,
          }}
        >
          {unit}
        </span>
      )}
    </span>
  );
}
