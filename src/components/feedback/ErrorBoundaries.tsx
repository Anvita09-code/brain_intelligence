/**
 * IOB ErrorBoundaries – React Error Boundary Components (Phase 2)
 *
 * Provides graceful error handling for module-level crashes.
 *
 * Integration: Complements existing src/components/feedback/ErrorBoundary.tsx.
 * This file provides the enhanced Phase 2 version with industrial styling.
 */

'use client';

import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { tokens } from '@/design-system/tokens';
import { AlertTriangle, RefreshCw, Bug } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ErrorBoundaryProps {
  children: ReactNode;
  /** Custom fallback UI */
  fallback?: ReactNode;
  /** Called when an error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Module label for debugging context */
  moduleName?: string;
  /** Show "Reset" button; default true */
  showReset?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/* ------------------------------------------------------------------ */
/*  ErrorBoundary (Class Component – required by React)                */
/* ------------------------------------------------------------------ */

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <ErrorFallback
          error={this.state.error}
          moduleName={this.props.moduleName}
          onReset={this.props.showReset !== false ? this.handleReset : undefined}
        />
      );
    }

    return this.props.children;
  }
}

/* ------------------------------------------------------------------ */
/*  ErrorFallback                                                      */
/* ------------------------------------------------------------------ */

export interface ErrorFallbackProps {
  error: Error | null;
  moduleName?: string;
  onReset?: () => void;
  className?: string;
}

export function ErrorFallback({
  error,
  moduleName,
  onReset,
  className,
}: ErrorFallbackProps) {
  return (
    <div
      className={className}
      role="alert"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: tokens.spacing.xxl,
        backgroundColor: tokens.colors.status.dangerBg,
        border: `1px solid ${tokens.colors.status.danger}`,
        borderRadius: tokens.borderRadius.md,
        textAlign: 'center',
        minHeight: '200px',
      }}
    >
      <AlertTriangle
        className="w-10 h-10 mb-4"
        style={{ color: tokens.colors.status.danger }}
      />

      <h3
        style={{
          color: tokens.colors.status.danger,
          fontSize: tokens.typography.fontSize.lg,
          fontWeight: tokens.typography.fontWeight.bold,
          marginBottom: tokens.spacing.sm,
        }}
      >
        Module Error{moduleName ? `: ${moduleName}` : ''}
      </h3>

      <p
        style={{
          color: tokens.colors.text.secondary,
          fontSize: tokens.typography.fontSize.sm,
          maxWidth: '480px',
          marginBottom: tokens.spacing.lg,
          lineHeight: tokens.typography.lineHeight.normal,
        }}
      >
        {error?.message || 'An unexpected error occurred in this module.'}
      </p>

      {error?.stack && (
        <details
          className="w-full max-w-lg mb-4 text-left"
          style={{ color: tokens.colors.text.muted }}
        >
          <summary
            className="cursor-pointer flex items-center gap-2"
            style={{ fontSize: tokens.typography.fontSize.xs }}
          >
            <Bug className="w-3 h-3" />
            Stack Trace
          </summary>
          <pre
            className="mt-2 p-3 overflow-auto text-xs"
            style={{
              fontFamily: tokens.typography.fontFamily.mono,
              fontSize: tokens.typography.fontSize.xs,
              color: tokens.colors.text.muted,
              backgroundColor: tokens.colors.bg.deep,
              borderRadius: tokens.borderRadius.sm,
              maxHeight: '200px',
            }}
          >
            {error.stack}
          </pre>
        </details>
      )}

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors"
          style={{
            color: '#FFFFFF',
            backgroundColor: tokens.colors.brand.primary,
            borderRadius: tokens.borderRadius.md,
            border: 'none',
            cursor: 'pointer',
            transition: tokens.transitions.fast,
          }}
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  );
}
