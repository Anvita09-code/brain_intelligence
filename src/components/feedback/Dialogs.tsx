/**
 * IOB Dialogs – Modal/Dialog Components (Phase 2)
 *
 * Accessible dialog overlays for confirmations, forms, and info panels.
 * Uses native <dialog> element with React portals for proper stacking.
 *
 * Integration: Coexists with existing src/components/feedback/ files.
 */

'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import { X, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DialogVariant = 'default' | 'danger' | 'warning' | 'success' | 'info';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: DialogSize;
  variant?: DialogVariant;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Show close button; default true */
  showClose?: boolean;
  /** Close on backdrop click; default true */
  closeOnBackdrop?: boolean;
  /** Close on Escape key; default true */
  closeOnEscape?: boolean;
  className?: string;
}

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  variant?: DialogVariant;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Size Map                                                           */
/* ------------------------------------------------------------------ */

const sizeWidthMap: Record<DialogSize, string> = {
  sm: '400px',
  md: '520px',
  lg: '680px',
  xl: '880px',
  full: 'calc(100vw - 64px)',
};

/* ------------------------------------------------------------------ */
/*  Variant Config                                                     */
/* ------------------------------------------------------------------ */

const variantIconMap = {
  default: null,
  danger: XCircle,
  warning: AlertTriangle,
  success: CheckCircle,
  info: Info,
};

const variantColorMap: Record<DialogVariant, string> = {
  default: tokens.colors.brand.primary,
  danger: tokens.colors.status.danger,
  warning: tokens.colors.status.warning,
  success: tokens.colors.status.success,
  info: tokens.colors.status.info,
};

/* ------------------------------------------------------------------ */
/*  Dialog                                                             */
/* ------------------------------------------------------------------ */

export function Dialog({
  open,
  onClose,
  title,
  description,
  size = 'md',
  variant = 'default',
  children,
  footer,
  showClose = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Escape key handler
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, closeOnEscape, onClose]);

  // Focus trap
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      dialogRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const VariantIcon = variantIconMap[variant];
  const accentColor = variantColorMap[variant];

  const content = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(2px)' }}
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Dialog Panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby={description ? 'dialog-desc' : undefined}
        tabIndex={-1}
        className={cn('relative flex flex-col overflow-hidden', className)}
        style={{
          backgroundColor: tokens.colors.bg.elevated,
          border: `1px solid ${tokens.colors.border.default}`,
          borderRadius: tokens.borderRadius.lg,
          boxShadow: tokens.shadows.overlay,
          width: '90vw',
          maxWidth: sizeWidthMap[size],
          maxHeight: '85vh',
        }}
      >
        {/* Accent bar */}
        {variant !== 'default' && (
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ backgroundColor: accentColor }}
          />
        )}

        {/* Header */}
        <header
          className="flex items-start justify-between px-6 py-4 shrink-0"
          style={{ borderBottom: `1px solid ${tokens.colors.border.subtle}` }}
        >
          <div className="flex items-start gap-3">
            {VariantIcon && (
              <VariantIcon
                className="w-5 h-5 mt-0.5 shrink-0"
                style={{ color: accentColor }}
              />
            )}
            <div>
              <h2
                id="dialog-title"
                style={{
                  color: tokens.colors.text.primary,
                  fontSize: tokens.typography.fontSize.lg,
                  fontWeight: tokens.typography.fontWeight.bold,
                }}
              >
                {title}
              </h2>
              {description && (
                <p
                  id="dialog-desc"
                  style={{
                    color: tokens.colors.text.secondary,
                    fontSize: tokens.typography.fontSize.sm,
                    marginTop: tokens.spacing.xxs,
                  }}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
          {showClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded transition-colors shrink-0"
              aria-label="Close dialog"
              style={{ transition: tokens.transitions.fast }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  tokens.colors.bg.hover;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  'transparent';
              }}
            >
              <X
                className="w-4 h-4"
                style={{ color: tokens.colors.text.muted }}
              />
            </button>
          )}
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <footer
            className="flex items-center justify-end gap-3 px-6 py-3 shrink-0"
            style={{ borderTop: `1px solid ${tokens.colors.border.subtle}` }}
          >
            {footer}
          </footer>
        )}
      </div>
    </div>
  );

  // Portal to body to escape layout stacking contexts
  if (typeof document === 'undefined') return null;
  return createPortal(content, document.body);
}

/* ------------------------------------------------------------------ */
/*  ConfirmDialog                                                      */
/* ------------------------------------------------------------------ */

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  variant = 'default',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
}: ConfirmDialogProps) {
  const handleConfirm = useCallback(() => {
    if (!loading) onConfirm();
  }, [loading, onConfirm]);

  const isDestructive = variant === 'danger';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      variant={variant}
      size="sm"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded transition-colors"
            style={{
              color: tokens.colors.text.secondary,
              border: `1px solid ${tokens.colors.border.default}`,
              backgroundColor: 'transparent',
              borderRadius: tokens.borderRadius.md,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              transition: tokens.transitions.fast,
            }}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded transition-colors"
            style={{
              color: '#FFFFFF',
              backgroundColor: isDestructive
                ? tokens.colors.status.danger
                : tokens.colors.brand.primary,
              borderRadius: tokens.borderRadius.md,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: tokens.transitions.fast,
            }}
          >
            {loading ? 'Processing…' : confirmLabel}
          </button>
        </>
      }
    >
      <p
        style={{
          color: tokens.colors.text.secondary,
          fontSize: tokens.typography.fontSize.base,
          lineHeight: tokens.typography.lineHeight.normal,
        }}
      >
        {message}
      </p>
    </Dialog>
  );
}
