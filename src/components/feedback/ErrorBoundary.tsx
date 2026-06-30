"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { ShieldAlert, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Critical Component Failure:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="bg-industrial-panel-dark border border-industrial-status-critical p-md rounded flex flex-col items-center justify-center text-center gap-sm font-mono my-md">
          <ShieldAlert className="w-8 h-8 text-industrial-status-critical animate-pulse" />
          <h2 className="text-sm font-bold text-industrial-status-critical uppercase tracking-wider">
            SYSTEM MODULE FAULT DETECTED
          </h2>
          <p className="text-xs text-industrial-status-offline max-w-md">
            {this.state.error?.message || "An unexpected rendering fault halted this panel subsystem."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-sm bg-industrial-status-critical/20 hover:bg-industrial-status-critical/30 border border-industrial-status-critical text-industrial-status-critical text-xs px-4 py-2 rounded font-bold uppercase transition inline-flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            RESET MODULE
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
