/**
 * IOB Form Inputs – TextInput, Select, Switch + Legacy Inputs (Phase 2 – Section 5)
 *
 * Industrial-styled form inputs compatible with react-hook-form and zod.
 * Uses semantic HTML elements for accessibility.
 *
 * Section 5 adds: TextInput (with label/helperText/error), Select, Switch.
 * Retains existing PasswordInput, SearchInput, Textarea for backward compat.
 */

'use client';

import React, {
  forwardRef,
  type InputHTMLAttributes,
} from 'react';
import { tokens } from '../../design-system/tokens';
import { Label } from '../display/Typography';
import { cn } from '../lib/utils';
import { Search, Eye, EyeOff, X } from '../icons';

/* ------------------------------------------------------------------ */
/* TextInput – New Implementation (Section 5)                         */
/* ------------------------------------------------------------------ */

interface BaseInputProps {
  label?: string;
  helperText?: string;
  error?: boolean;
  required?: boolean;
}

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    BaseInputProps {}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  helperText,
  error,
  required,
  style,
  id,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <input
        id={id}
        style={{
          backgroundColor: tokens.colors.bg.deep,
          border: `1px solid ${error ? tokens.colors.status.danger : tokens.colors.border.default}`,
          borderRadius: tokens.borderRadius.sm,
          padding: '6px 10px',
          color: props.disabled
            ? tokens.colors.text.disabled
            : tokens.colors.text.primary,
          fontSize: tokens.typography.fontSize.sm,
          fontFamily: tokens.typography.fontFamily.sans,
          outline: 'none',
          ...style,
        }}
        {...props}
      />
      {helperText && (
        <span
          style={{
            fontSize: tokens.typography.fontSize.xs,
            color: error
              ? tokens.colors.status.danger
              : tokens.colors.text.muted,
            marginTop: '4px',
          }}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

TextInput.displayName = 'TextInput';

/* ------------------------------------------------------------------ */
/* Select – New Implementation (Section 5)                            */
/* ------------------------------------------------------------------ */

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    BaseInputProps {
  options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  helperText,
  error,
  required,
  options,
  id,
  style,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <select
        id={id}
        style={{
          backgroundColor: tokens.colors.bg.deep,
          border: `1px solid ${error ? tokens.colors.status.danger : tokens.colors.border.default}`,
          borderRadius: tokens.borderRadius.sm,
          padding: '6px 10px',
          color: tokens.colors.text.primary,
          fontSize: tokens.typography.fontSize.sm,
          outline: 'none',
          ...style,
        }}
        {...props}
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            style={{ backgroundColor: tokens.colors.bg.surface }}
          >
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && (
        <span
          style={{
            fontSize: tokens.typography.fontSize.xs,
            color: error
              ? tokens.colors.status.danger
              : tokens.colors.text.muted,
            marginTop: '4px',
          }}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

Select.displayName = 'Select';

/* ------------------------------------------------------------------ */
/* Switch – New Implementation (Section 5)                            */
/* ------------------------------------------------------------------ */

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  checked,
  id,
  ...props
}) => {
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        id={id}
        style={{ display: 'none' }}
        {...props}
      />
      <div
        style={{
          width: '34px',
          height: '18px',
          backgroundColor: checked
            ? tokens.colors.brand.primary
            : tokens.colors.border.contrast,
          borderRadius: tokens.borderRadius.full,
          position: 'relative',
          transition: tokens.transitions.fast,
          marginRight: tokens.spacing.sm,
        }}
      >
        <div
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#FFF',
            borderRadius: '50%',
            position: 'absolute',
            top: '3px',
            left: checked ? '18px' : '3px',
            transition: tokens.transitions.fast,
          }}
        />
      </div>
      <span
        style={{
          fontSize: tokens.typography.fontSize.sm,
          color: tokens.colors.text.primary,
        }}
      >
        {label}
      </span>
    </label>
  );
};

Switch.displayName = 'Switch';

/* ------------------------------------------------------------------ */
/* Legacy Input Styles (shared by existing components below)           */
/* ------------------------------------------------------------------ */

const legacyBaseInputStyles: React.CSSProperties = {
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
/* TextInputLegacy – Existing implementation (kept for backward compat)*/
/* ------------------------------------------------------------------ */

export interface TextInputLegacyProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TextInputLegacy = forwardRef<
  HTMLInputElement,
  TextInputLegacyProps
>(({ label, error, hint, leftIcon, rightIcon, className, id, ...rest }, ref) => {
  const inputId =
    id || `input-${label?.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <div className={cn('flex flex-col w-full', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-medium mb-1"
          style={{ color: tokens.colors.text.secondary }}
        >
          {label}
          {rest.required && (
            <span style={{ color: tokens.colors.status.danger }}> *</span>
          )}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span
            className="absolute left-2 pointer-events-none"
            style={{ color: tokens.colors.text.muted }}
          >
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          style={{
            ...legacyBaseInputStyles,
            paddingLeft: leftIcon ? '2rem' : undefined,
            paddingRight: rightIcon ? '2rem' : undefined,
            borderColor: error
              ? tokens.colors.status.danger
              : tokens.colors.border.default,
          }}
          onFocus={(e) => {
            (e.target as HTMLInputElement).style.borderColor =
              tokens.colors.border.focus;
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
            className="absolute right-2"
            style={{ color: tokens.colors.text.muted }}
          >
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <span
          className="text-xs mt-1"
          style={{ color: tokens.colors.status.danger }}
        >
          {error}
        </span>
      )}
      {hint && !error && (
        <span
          className="text-xs mt-1"
          style={{ color: tokens.colors.text.muted }}
        >
          {hint}
        </span>
      )}
    </div>
  );
});

TextInputLegacy.displayName = 'TextInputLegacy';

/* ------------------------------------------------------------------ */
/* PasswordInput – Existing implementation retained                   */
/* ------------------------------------------------------------------ */

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ ...rest }, ref) => {
    const [visible, setVisible] = React.useState(false);

    return (
      <TextInputLegacy
        ref={ref}
        type={visible ? 'text' : 'password'}
        rightIcon={
          <span
            onClick={() => setVisible((v) => !v)}
            className="cursor-pointer"
            tabIndex={-1}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </span>
        }
        {...rest}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

/* ------------------------------------------------------------------ */
/* SearchInput – Existing implementation retained                     */
/* ------------------------------------------------------------------ */

export interface SearchInputProps
  extends Omit<TextInputLegacyProps, 'leftIcon'> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, value, ...rest }, ref) => {
    return (
      <TextInputLegacy
        ref={ref}
        leftIcon={<Search size={16} />}
        rightIcon={
          value ? (
            <X
              size={14}
              className="cursor-pointer"
              onClick={onClear}
            />
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
/* Textarea – Existing implementation retained                        */
/* ------------------------------------------------------------------ */

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...rest }, ref) => {
    const textareaId =
      id || `textarea-${label?.toLowerCase().replace(/\s/g, '-')}`;

    return (
      <div className={cn('flex flex-col w-full', className)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-medium mb-1"
            style={{ color: tokens.colors.text.secondary }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          style={{
            ...legacyBaseInputStyles,
            minHeight: '80px',
            resize: 'vertical',
            borderColor: error
              ? tokens.colors.status.danger
              : tokens.colors.border.default,
          }}
          onFocus={(e) => {
            (e.target as HTMLTextAreaElement).style.borderColor =
              tokens.colors.border.focus;
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
            className="text-xs mt-1"
            style={{ color: tokens.colors.status.danger }}
          >
            {error}
          </span>
        )}
        {hint && !error && (
          <span
            className="text-xs mt-1"
            style={{ color: tokens.colors.text.muted }}
          >
            {hint}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

/* ------------------------------------------------------------------ */
/* Legacy Select (kept for backward compat with existing consumers)    */
/* ------------------------------------------------------------------ */

export interface SelectLegacyProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const SelectLegacy = forwardRef<HTMLSelectElement, SelectLegacyProps>(
  ({ label, error, options, placeholder, className, ...rest }, ref) => {
    return (
      <div className={cn('flex flex-col w-full', className)}>
        {label && (
          <label
            className="text-xs font-medium mb-1"
            style={{ color: tokens.colors.text.secondary }}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          style={{
            ...legacyBaseInputStyles,
            borderColor: error
              ? tokens.colors.status.danger
              : tokens.colors.border.default,
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
            className="text-xs mt-1"
            style={{ color: tokens.colors.status.danger }}
          >
            {error}
          </span>
        )}
      </div>
    );
  },
);

SelectLegacy.displayName = 'SelectLegacy';
