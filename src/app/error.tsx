"use client";

import { useEffect } from "react";
import { ShieldAlert, RefreshCw } from "lucide-react";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[RootError] Application Error:", error);
  }, [error]);

  return (
    <div className="flex-grow flex flex-col items-center justify-center min-h-screen bg-industrial-bg-dark p-md font-mono text-center">
      <div className="bg-industrial-panel-dark border border-industrial-status-critical p-xl rounded max-w-lg flex flex-col items-center gap-md">
        <ShieldAlert className="w-12 h-12 text-industrial-status-critical animate-pulse" />
        <h1 className="text-lg font-bold text-industrial-status-critical uppercase tracking-wider">
          CRITICAL ROUTE EXCEPTION
        </h1>
        <p className="text-xs text-industrial-status-offline">
          {error.message || "A severe subsystem failure interrupted root layout execution."}
        </p>
        <button
          onClick={reset}
          className="bg-industrial-status-critical text-industrial-bg-highContrast hover:bg-industrial-status-critical/90 font-bold px-6 py-2.5 rounded text-xs uppercase tracking-wider transition inline-flex items-center gap-2 cursor-pointer mt-sm"
        >
          <RefreshCw className="w-4 h-4" />
          REBOOT APPLICATION
        </button>
      </div>
    </div>
  );
}
