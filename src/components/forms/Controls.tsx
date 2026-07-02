/**
 * IOB Form Controls – Buttons, Toggles, Checkboxes, Selects (Phase 2)
 *
 * Industrial-styled form controls compatible with react-hook-form and zod.
 * Uses semantic HTML elements for accessibility.
 */

'use client';

import React, { forwardRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type SelectHTMLAttributes } from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import { Loader2 } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Button                                                             */
/* ------------------------------------------------------------------ */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const buttonVariantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: tokens.colors.brand.primary,
    color: '#FFFFFF',
    border: 'none',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: tokens.colors.text.primary,
    border: `1px solid ${tokens.colors.border.default}`,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: tokens.colors.text.secondary,
    border: 'none',
  },
  danger: {
    backgroundColor: tokens.colors.status.danger,
    color: '#FFFFFF',
    border: 'none',
  },
  accent: {
    backgroundColor: tokens.colors.brand.accent,
    color: tokens.colors.bg.deep,
    border: 'none',
  },
};

const buttonHoverBg: Record<ButtonVariant, string> = {
  primary: tokens.colors.brand.primaryHover,
  secondary: tokens.colors.bg.hover,
  ghost: tokens.colors.bg.hover,
  danger: '#DC2626',
  accent: '#33EBFF',
};

const buttonSizeStyles: Record<ButtonSize, React.CSSProperties> = {
  xs: { padding: `${tokens.spacing.xxs} ${tokens.spacing.xs}`, fontSize: tokens.typography.fontSize.xs },
  sm: { padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`, fontSize: tokens.typography.fontSize.sm },
  md: { padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`, fontSize: tokens.typography.fontSize.base },
  lg: { padding: `${tokens.spacing.md} ${tokens.spacing.xl}`, fontSize: tokens.typography.fontSize.lg },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium rounded transition-colors',
          isDisabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        style={{
          ...buttonVariantStyles[variant],
          ...buttonSizeStyles[size],
          borderRadius: tokens.borderRadius.md,
          fontWeight: tokens.typography.fontWeight.medium,
          transition: tokens.transitions.fast,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={(e) => {
          if (!isDisabled) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              buttonHoverBg[variant];
          }
        }}
        onMouseLeave={(e) => {
          if (!isDisabled) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              buttonVariantStyles[variant].backgroundColor ?? 'transparent';
          }
        }}
        {...rest}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';

/* ------------------------------------------------------------------ */
/*  Toggle (Switch)                                                    */
/* ------------------------------------------------------------------ */

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, description, className, checked, onChange, disabled, ...rest }, ref) => {
    const [isOn, setIsOn] = React.useState(checked ?? false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsOn(e.target.checked);
      onChange?.(e);
    };

    return (
      <label
        className={cn('flex items-center gap-3 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed', className)}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            checked={checked ?? isOn}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only peer"
            {...rest}
          />
          <div
            className="w-9 h-5 rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1"
            style={{
              backgroundColor: (checked ?? isOn)
                ? tokens.colors.brand.primary
                : tokens.colors.border.default,
              borderRadius: tokens.borderRadius.full,
              transition: tokens.transitions.fast,
              ringColor: tokens.colors.border.focus,
            }}
          />
          <div
            className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform"
            style={{
              backgroundColor: '#FFFFFF',
              transform: (checked ?? isOn) ? 'translateX(16px)' : 'translateX(0)',
              transition: tokens.transitions.fast,
              borderRadius: tokens.borderRadius.full,
            }}
          />
        </div>
        {(label || description) && (
          <div>
            {label && (
              <span
                style={{
                  color: tokens.colors.text.primary,
                  fontSize: tokens.typography.fontSize.sm,
                  fontWeight: tokens.typography.fontWeight.medium,
                }}
              >
                {label}
              </span>
            )}
            {description && (
              <p
                style={{
                  color: tokens.colors.text.muted,
                  fontSize: tokens.typography.fontSize.xs,
                  marginTop: tokens.spacing.xxs,
                }}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </label>
    );
  },
);

Toggle.displayName = 'Toggle';

/* ------------------------------------------------------------------ */
/*  Checkbox                                                           */
/* ------------------------------------------------------------------ */

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, indeterminate, className, checked, ...rest }, ref) => {
    const innerRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate]);

    const setRefs = (el: HTMLInputElement | null) => {
      innerRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
    };

    return (
      <label className={cn('inline-flex items-center gap-2 cursor-pointer', className)}>
        <input
          ref={setRefs}
          type="checkbox"
          checked={checked}
          className="w-4 h-4 rounded appearance-none cursor-pointer border transition-colors"
          style={{
            backgroundColor: checked
              ? tokens.colors.brand.primary
              : 'transparent',
            border: `1.5px solid ${checked ? tokens.colors.brand.primary : tokens.colors.border.default}`,
            borderRadius: tokens.borderRadius.sm,
            transition: tokens.transitions.fast,
          }}
          {...rest}
        />
        {label && (
          <span
            style={{
              color: tokens.colors.text.primary,
              fontSize: tokens.typography.fontSize.sm,
            }}
          >
            {label}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';

/* ------------------------------------------------------------------ */
/*  Select                                                             */
/* ------------------------------------------------------------------ */

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, ...rest }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        {label && (
          <label
            style={{
              color: tokens.colors.text.secondary,
              fontSize: tokens.typography.fontSize.sm,
              fontWeight: tokens.typography.fontWeight.medium,
            }}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          className="w-full px-3 py-2 rounded appearance-none cursor-pointer"
          style={{
            backgroundColor: tokens.colors.bg.surface,
            color: tokens.colors.text.primary,
            border: `1px solid ${error ? tokens.colors.status.danger : tokens.colors.border.default}`,
            borderRadius: tokens.borderRadius.md,
            fontSize: tokens.typography.fontSize.base,
            transition: tokens.transitions.fast,
            fontFamily: tokens.typography.fontFamily.sans,
          }}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span
            style={{
              color: tokens.colors.status.danger,
              fontSize: tokens.typography.fontSize.xs,
            }}
          >
            {error}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
