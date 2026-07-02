/**
 * IOB Form Controls – Buttons, Toggles, Checkboxes (Phase 2 – Section 5)
 *
 * Industrial-styled form controls compatible with react-hook-form and zod.
 * Uses semantic HTML elements for accessibility.
 *
 * Updated: Primary Button with expanded variant support (primary, secondary,
 * outline, ghost, danger, success, warning) and size options.
 * Retains existing Toggle and Checkbox for backward compatibility.
 */

'use client';

import React, {
  forwardRef,
  type InputHTMLAttributes,
} from 'react';
import { tokens } from '../../design-system/tokens';
import { Loader2 } from '../icons';
import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/* Button – New Implementation (Section 5)                            */
/* ------------------------------------------------------------------ */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success'
    | 'warning';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  style,
  ...props
}) => {
  const getVariantStyles = (): {
    bg: string;
    text: string;
    border: string;
  } => {
    switch (variant) {
      case 'primary':
        return {
          bg: tokens.colors.brand.primary,
          text: '#FFFFFF',
          border: 'none',
        };
      case 'secondary':
        return {
          bg: tokens.colors.bg.hover,
          text: tokens.colors.text.primary,
          border: `1px solid ${tokens.colors.border.default}`,
        };
      case 'outline':
        return {
          bg: 'transparent',
          text: tokens.colors.text.primary,
          border: `1px solid ${tokens.colors.border.contrast}`,
        };
      case 'ghost':
        return {
          bg: 'transparent',
          text: tokens.colors.text.secondary,
          border: 'none',
        };
      case 'danger':
        return {
          bg: tokens.colors.status.danger,
          text: '#FFFFFF',
          border: 'none',
        };
      case 'success':
        return {
          bg: tokens.colors.status.success,
          text: '#FFFFFF',
          border: 'none',
        };
      case 'warning':
        return {
          bg: tokens.colors.status.warning,
          text: tokens.colors.bg.deep,
          border: 'none',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '4px 8px',
          fontSize: tokens.typography.fontSize.xs,
        };
      case 'medium':
        return {
          padding: '6px 12px',
          fontSize: tokens.typography.fontSize.sm,
        };
      case 'large':
        return {
          padding: '10px 18px',
          fontSize: tokens.typography.fontSize.base,
        };
    }
  };

  const vStyles = getVariantStyles();
  const sStyles = getSizeStyles();

  return (
    <button
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: tokens.typography.fontFamily.sans,
        fontWeight: tokens.typography.fontWeight.medium,
        borderRadius: tokens.borderRadius.sm,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        width: fullWidth ? '100%' : 'auto',
        backgroundColor: vStyles.bg,
        color: vStyles.text,
        border: vStyles.border,
        padding: sStyles.padding,
        fontSize: sStyles.fontSize,
        transition: tokens.transitions.fast,
        ...style,
      }}
      {...props}
    >
      {loading && (
        <Loader2
          size={14}
          style={{ animation: 'spin 1s linear infinite', marginRight: '6px' }}
        />
      )}
      {!loading && icon && (
        <span style={{ display: 'inline-flex', marginRight: '6px' }}>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

Button.displayName = 'Button';

/* ------------------------------------------------------------------ */
/* Legacy type aliases (backward compat for existing consumers)        */
/* ------------------------------------------------------------------ */

/** @deprecated Use ButtonProps directly. Kept for backward compat. */
export type ButtonVariant = ButtonProps['variant'];
/** @deprecated Use ButtonProps directly. Kept for backward compat. */
export type ButtonSize = ButtonProps['size'];

/* ------------------------------------------------------------------ */
/* Toggle (Switch) – Existing implementation retained                 */
/* ------------------------------------------------------------------ */

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
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
        className={cn(
          'inline-flex items-start gap-3 cursor-pointer select-none',
          disabled && 'opacity-40 cursor-not-allowed',
          className,
        )}
      >
        <div className="relative mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            checked={isOn}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only peer"
            {...rest}
          />
          <div
            className="w-9 h-5 rounded-full transition-colors duration-150"
            style={{
              backgroundColor: isOn
                ? tokens.colors.brand.primary
                : tokens.colors.border.contrast,
            }}
          />
          <div
            className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-150"
            style={{
              transform: isOn ? 'translateX(16px)' : 'translateX(0)',
            }}
          />
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span
                className="text-sm leading-tight"
                style={{ color: tokens.colors.text.primary }}
              >
                {label}
              </span>
            )}
            {description && (
              <span
                className="text-xs mt-0.5"
                style={{ color: tokens.colors.text.muted }}
              >
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  },
);

Toggle.displayName = 'Toggle';

/* ------------------------------------------------------------------ */
/* Checkbox – Existing implementation retained                        */
/* ------------------------------------------------------------------ */

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, indeterminate, className, checked, ...rest }, ref) => {
    const innerRef = React.useRef<HTMLInputElement>(null);

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
          className="sr-only peer"
          {...rest}
        />
        <div
          className="w-4 h-4 rounded-sm border flex items-center justify-center transition-colors peer-checked:border-transparent"
          style={{
            borderColor: tokens.colors.border.contrast,
            backgroundColor: checked ? tokens.colors.brand.primary : 'transparent',
          }}
        >
          {checked && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 5L4 7.5L8.5 2.5"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        {label && (
          <span
            className="text-sm"
            style={{ color: tokens.colors.text.primary }}
          >
            {label}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
