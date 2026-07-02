/**
 * IOB Form Inputs – Text Inputs, Textareas, Search (Phase 2)
 *
 * Industrial-styled inputs compatible with react-hook-form.
 */

'use client';

import React, { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import { Search, Eye, EyeOff, X } from '@/components/icons';

/* ------------------------------------------------------------------ */
/*  Base Input Styles                                                  */
/* ------------------------------------------------------------------ */

const baseInputStyles: React.CSSProperties = {
  backgroundColor: tokens.colors.bg.surface,
  color: tokens.colors.text.primary,
  border: `1px solid ${tokens.colors.border.default}`,
  borderRadius: tokens.borderRadius.md,
  fontSize: tokens.typography.fontSize.base,
  fontFamily: tokens.typography.fontFamily.sans,
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  transition: tokens.transitions.fast,
  width: '100%',
  outline: 'none',
};

/* ------------------------------------------------------------------ */
/*  TextInput                                                          */
/* ------------------------------------------------------------------ */

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...rest }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s/g, '-')}`;

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              color: tokens.colors.text.secondary,
              fontSize: tokens.typography.fontSize.sm,
              fontWeight: tokens.typography.fontWeight.medium,
            }}
          >
            {label}
            {rest.required && (
              <span
                className="ml-0.5"
                style={{ color: tokens.colors.status.danger }}
                aria-hidden="true"
              >
                *
              </span>
            )}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span
              className="absolute left-3 flex items-center pointer-events-none"
              style={{ color: tokens.colors.text.muted }}
            >
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className="w-full rounded focus:ring-1"
            style={{
              ...baseInputStyles,
              paddingLeft: leftIcon ? '2.25rem' : baseInputStyles.paddingLeft,
              paddingRight: rightIcon ? '2.25rem' : baseInputStyles.paddingLeft,
              borderColor: error ? tokens.colors.status.danger : tokens.colors.border.default,
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = tokens.colors.border.focus;
              (e.target as HTMLInputElement).style.boxShadow = `0 0 0 1px ${tokens.colors.border.focus}`;
              rest.onFocus?.(e);
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = error
                ? tokens.colors.status.danger
                : tokens.colors.border.default;
              (e.target as HTMLInputElement).style.boxShadow = 'none';
              rest.onBlur?.(e);
            }}
            {...rest}
          />
          {rightIcon && (
            <span
              className="absolute right-3 flex items-center"
              style={{ color: tokens.colors.text.muted }}
            >
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <span
            style={{
              color: tokens.colors.status.danger,
              fontSize: tokens.typography.fontSize.xs,
            }}
            role="alert"
          >
            {error}
          </span>
        )}
        {hint && !error && (
          <span
            style={{
              color: tokens.colors.text.muted,
              fontSize: tokens.typography.fontSize.xs,
            }}
          >
            {hint}
          </span>
        )}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';

/* ------------------------------------------------------------------ */
/*  PasswordInput                                                      */
/* ------------------------------------------------------------------ */

export interface PasswordInputProps extends Omit<TextInputProps, 'type' | 'rightIcon'> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ ...rest }, ref) => {
    const [visible, setVisible] = React.useState(false);

    return (
      <TextInput
        ref={ref}
        type={visible ? 'text' : 'password'}
        rightIcon={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="cursor-pointer"
            tabIndex={-1}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        }
        {...rest}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

/* ------------------------------------------------------------------ */
/*  SearchInput                                                        */
/* ------------------------------------------------------------------ */

export interface SearchInputProps extends Omit<TextInputProps, 'leftIcon' | 'type'> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, value, ...rest }, ref) => {
    return (
      <TextInput
        ref={ref}
        type="search"
        leftIcon={<Search className="w-4 h-4" />}
        rightIcon={
          value ? (
            <button
              type="button"
              onClick={onClear}
              className="cursor-pointer"
              tabIndex={-1}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : undefined
        }
        value={value}
        {...rest}
      />
    );
  },
);

SearchInput.displayName = 'SearchInput';

/* ------------------------------------------------------------------ */
/*  Textarea                                                           */
/* ------------------------------------------------------------------ */

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...rest }, ref) => {
    const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s/g, '-')}`;

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        {label && (
          <label
            htmlFor={textareaId}
            style={{
              color: tokens.colors.text.secondary,
              fontSize: tokens.typography.fontSize.sm,
              fontWeight: tokens.typography.fontWeight.medium,
            }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className="w-full rounded resize-y min-h-[80px]"
          style={{
            ...baseInputStyles,
            borderColor: error ? tokens.colors.status.danger : tokens.colors.border.default,
          }}
          onFocus={(e) => {
            (e.target as HTMLTextAreaElement).style.borderColor = tokens.colors.border.focus;
            (e.target as HTMLTextAreaElement).style.boxShadow = `0 0 0 1px ${tokens.colors.border.focus}`;
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            (e.target as HTMLTextAreaElement).style.borderColor = error
              ? tokens.colors.status.danger
              : tokens.colors.border.default;
            (e.target as HTMLTextAreaElement).style.boxShadow = 'none';
            rest.onBlur?.(e);
          }}
          {...rest}
        />
        {error && (
          <span
            style={{
              color: tokens.colors.status.danger,
              fontSize: tokens.typography.fontSize.xs,
            }}
            role="alert"
          >
            {error}
          </span>
        )}
        {hint && !error && (
          <span
            style={{
              color: tokens.colors.text.muted,
              fontSize: tokens.typography.fontSize.xs,
            }}
          >
            {hint}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
