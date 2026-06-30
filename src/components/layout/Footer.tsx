"use client";

import React from "react";
import { useTelemetry } from "@/contexts/TelemetryContext";

export const Footer: React.FC = () => {
  const { activeAnomaly } = useTelemetry();

  return (
    <footer className="border-t border-industrial-border-dark bg-industrial-panel-dark px-md py-2 text-[10px] font-mono text-industrial-status-offline flex flex-col sm:flex-row sm:justify-between sm:items-center gap-xs shrink-0 z-30">
      <div>
        <span>Plant Diagnostic Loop: </span>
        {activeAnomaly ? (
          <span className="text-industrial-status-critical font-bold animate-pulse">
            HAZARD ACTIVE IN SIMULATION: [{activeAnomaly.toUpperCase()}]
          </span>
        ) : (
          <span className="text-industrial-status-ok font-bold">NOMINAL OPERATIONAL PROFILE</span>
        )}
      </div>
      <div className="flex items-center gap-md">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-industrial-status-ok" />
          <span>Security: Enterprise CSP</span>
        </span>
        <span>© 2026 Enterprise Industrial Operations Board</span>
      </div>
    </footer>
  );
};
