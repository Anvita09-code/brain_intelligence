"use client";

import React from "react";
import { useTelemetry } from "@/contexts/TelemetryContext";
import { useSidebar } from "@/hooks/useSidebar";
import { Logo } from "@/components/ui/Logo";
import { Menu, Wifi, WifiOff } from "lucide-react";

export const Navbar: React.FC = () => {
  const { wsStatus } = useTelemetry();
  const { toggleSidebar } = useSidebar();

  const getWsBadgeColor = () => {
    switch (wsStatus) {
      case "connected":
        return "bg-industrial-status-ok/10 text-industrial-status-ok border-industrial-status-ok/20";
      case "connecting":
        return "bg-industrial-status-warning/10 text-industrial-status-warning border-industrial-status-warning/20 animate-pulse";
      case "offline-fallback":
        return "bg-industrial-status-offline/15 text-industrial-status-warning border-industrial-status-warning/30";
      default:
        return "bg-industrial-status-offline/10 text-industrial-status-offline border-industrial-status-offline/20";
    }
  };

  return (
    <header className="border-b border-industrial-border-dark bg-industrial-panel-dark px-md py-sm flex items-center justify-between gap-sm crt-scanlines shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-md">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-1.5 text-industrial-status-offline hover:text-industrial-bg-light border border-industrial-border-dark rounded transition bg-industrial-bg-dark"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Logo />

        <span className="hidden md:inline text-industrial-status-offline text-xs">|</span>
        <span className="hidden md:inline font-mono text-[10px] text-industrial-status-offline">
          ENV: <span className="text-industrial-status-ok">{process.env.NODE_ENV || "enterprise"}</span>
        </span>
      </div>

      <div className="flex items-center gap-sm font-mono text-xs">
        <span className="hidden sm:inline text-industrial-status-offline text-[10px]">Stream:</span>
        <span className="hidden xl:inline text-industrial-bg-light bg-industrial-bg-dark border border-industrial-border-dark px-2 py-0.5 rounded text-[10px]">
          {process.env.NEXT_PUBLIC_WS_URL || "wss://stream.iob.enterprise.internal/v1"}
        </span>
        <span className={`px-2 py-0.5 rounded border text-[10px] uppercase font-bold flex items-center gap-1.5 ${getWsBadgeColor()}`}>
          {wsStatus === "connected" ? <Wifi className="w-3 h-3 text-industrial-status-ok" /> : <WifiOff className="w-3 h-3 text-industrial-status-warning" />}
          <span>{wsStatus.replace("-", " ")}</span>
        </span>
      </div>
    </header>
  );
};
