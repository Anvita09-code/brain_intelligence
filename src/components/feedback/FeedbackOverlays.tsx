/**
 * IOB FeedbackOverlays – Toast, Banner, and Notification Components (Phase 2)
 */

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/components/lib/utils';
import { tokens } from '@/design-system/tokens';
import {
  X,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
} from '@/components/icons';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type FeedbackType = 'success' | 'warning' | 'error' | 'info';

export interface ToastProps {
  id?: string;
  type?: FeedbackType;
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export interface BannerProps {
  type?: FeedbackType;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Feedback Config                                                    */
/* ------------------------------------------------------------------ */

const feedbackConfig: Record<
  FeedbackType,
  { icon: React.ElementType; color: string; bgColor: string }
> = {
  success: {
    icon: CheckCircle,
    color: tokens.colors.status.success,
    bgColor: tokens.colors.status.successBg,
  },
  warning: {
    icon: AlertTriangle,
    color: tokens.colors.status.warning,
    bgColor: tokens.colors.status.warningBg,
  },
  error: {
    icon: XCircle,
    color: tokens.colors.status.danger,
    bgColor: tokens.colors.status.dangerBg,
  },
  info: {
    icon: Info,
    color: tokens.colors.status.info,
    bgColor: tokens.colors.status.infoBg,
  },
};

/* ------------------------------------------------------------------ */
/*  Toast                                                              */
/* ------------------------------------------------------------------ */

export function Toast({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  className,
}: ToastProps) {
  const [visible, setVisible] = useState(true);
  const config = feedbackConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 200);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible && !onClose) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 p-4 shadow-lg transition-all',
        !visible && 'opacity-0 translate-x-4',
        className,
      )}
      style={{
        backgroundColor: tokens.colors.bg.elevated,
        border: `1px solid ${tokens.colors.border.default}`,
        borderLeft: `3px solid ${config.color}`,
        borderRadius: tokens.borderRadius.md,
        boxShadow: tokens.shadows.overlay,
        minWidth: '320px',
        maxWidth: '420px',
        transition: tokens.transitions.normal,
      }}
    >
      <Icon className="w-5 h-5 mt-0.5 shrink-0" style={{ color: config.color }} />

      <div className="flex-1 min-w-0">
        <p
          style={{
            color: tokens.colors.text.primary,
            fontSize: tokens.typography.fontSize.sm,
            fontWeight: tokens.typography.fontWeight.medium,
          }}
        >
          {title}
        </p>
        {message && (
          <p
            className="mt-1"
            style={{
              color: tokens.colors.text.secondary,
              fontSize: tokens.typography.fontSize.xs,
            }}
          >
            {message}
          </p>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            setTimeout(() => onClose(), 200);
          }}
          className="p-1 shrink-0 rounded"
          aria-label="Dismiss"
          style={{ transition: tokens.transitions.fast }}
        >
          <X
            className="w-3.5 h-3.5"
            style={{ color: tokens.colors.text.muted }}
          />
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ToastContainer – Floating container for toast stack                */
/* ------------------------------------------------------------------ */

export interface ToastContainerProps {
  children: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const positionClasses: Record<string, string> = {
  'top-right': 'fixed top-4 right-4',
  'top-left': 'fixed top-4 left-4',
  'bottom-right': 'fixed bottom-4 right-4',
  'bottom-left': 'fixed bottom-4 left-4',
};

export function ToastContainer({
  children,
  position = 'top-right',
}: ToastContainerProps) {
  const content = (
    <div
      className={cn('z-[10000] flex flex-col gap-2', positionClasses[position])}
      aria-live="polite"
      aria-label="Notifications"
    >
      {children}
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(content, document.body);
}

/* ------------------------------------------------------------------ */
/*  Banner                                                             */
/* ------------------------------------------------------------------ */

export function Banner({
  type = 'info',
  message,
  dismissible = true,
  onDismiss,
  action,
  className,
}: BannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const config = feedbackConfig[type];
  const Icon = config.icon;

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    onDismiss?.();
  }, [onDismiss]);

  if (dismissed) return null;

  return (
    <div
      role="alert"
      className={cn('flex items-center gap-3 px-4 py-3', className)}
      style={{
        backgroundColor: config.bgColor,
        border: `1px solid ${config.color}33`,
        borderRadius: tokens.borderRadius.md,
      }}
    >
      <Icon className="w-4 h-4 shrink-0" style={{ color: config.color }} />

      <p
        className="flex-1"
        style={{
          color: tokens.colors.text.primary,
          fontSize: tokens.typography.fontSize.sm,
        }}
      >
        {message}
      </p>

      {action && <div className="shrink-0">{action}</div>}

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 shrink-0 rounded"
          aria-label="Dismiss banner"
          style={{ transition: tokens.transitions.fast }}
        >
          <X
            className="w-3.5 h-3.5"
            style={{ color: tokens.colors.text.muted }}
          />
        </button>
      )}
    </div>
  );
}
