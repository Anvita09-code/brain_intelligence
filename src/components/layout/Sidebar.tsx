"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/hooks/useSidebar";
import { useTelemetry } from "@/contexts/TelemetryContext";
import { NAV_ITEMS } from "@/utils/constants";
import {
  LayoutDashboard,
  Cpu,
  ShieldAlert,
  Activity,
  Database,
  MessageSquareCode,
  Settings,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  X
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Cpu,
  ShieldAlert,
  Activity,
  Database,
  MessageSquareCode,
  Settings,
  UserCheck,
};

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { isOpen, isCollapsed, toggleCollapse, closeMobileSidebar } = useSidebar();
  const { assets, selectedAssetId, setSelectedAssetId, activeAnomaly, clearAnomalies } = useTelemetry();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 bg-industrial-panel-dark border-r border-industrial-border-dark flex flex-col transition-all duration-300 shrink-0 ${
          isOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "lg:w-20" : "lg:w-72"}`}
      >
        {/* Mobile Header / Desktop Collapse Toggle */}
        <div className="p-sm border-b border-industrial-border-dark flex items-center justify-between bg-industrial-bg-dark/40 shrink-0">
          <span className={`font-mono text-[10px] font-bold uppercase tracking-wider text-industrial-status-offline px-2 ${isCollapsed ? "lg:hidden" : ""}`}>
            System Navigation
          </span>
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-1.5 hover:bg-industrial-panel-dark text-industrial-status-offline hover:text-industrial-bg-light rounded transition border border-industrial-border-dark cursor-pointer"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={closeMobileSidebar}
            className="lg:hidden p-1.5 text-industrial-status-offline hover:text-industrial-bg-light"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-sm flex flex-col gap-1 overflow-y-auto shrink-0 border-b border-industrial-border-dark">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/dashboard");
            const IconComponent = iconMap[item.iconName] || LayoutDashboard;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileSidebar}
                className={`flex items-center gap-3 px-3 py-2.5 rounded font-mono text-xs transition group ${
                  isActive
                    ? "bg-industrial-bg-dark border border-industrial-status-warning/60 text-industrial-bg-light font-bold shadow-xs"
                    : "text-industrial-status-offline hover:bg-industrial-bg-dark/50 hover:text-industrial-bg-light border border-transparent"
                }`}
              >
                <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? "text-industrial-status-warning" : "group-hover:text-industrial-bg-light"}`} />
                <span className={`${isCollapsed ? "lg:hidden" : "truncate"}`}>{item.label}</span>
                {!isCollapsed && item.badge && (
                  <span className="ml-auto bg-industrial-status-ok/20 text-industrial-status-ok text-[9px] px-1.5 py-0.5 rounded font-bold uppercase animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Global Asset Switcher Quick Panel */}
        {!isCollapsed && (
          <div className="p-md flex-grow flex flex-col overflow-y-auto">
            <span className="text-[10px] font-mono font-bold text-industrial-status-offline uppercase tracking-wider block mb-sm">
              Active Focus Asset
            </span>
            <div className="flex flex-col gap-sm">
              {assets.map((asset) => {
                const isSelected = asset.id === selectedAssetId;
                return (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`w-full text-left font-mono border rounded p-sm flex justify-between items-center transition cursor-pointer ${
                      isSelected
                        ? "bg-industrial-bg-dark border-industrial-status-warning text-industrial-bg-light"
                        : "bg-transparent border-industrial-border-dark hover:border-industrial-status-offline/50 text-industrial-status-offline hover:text-industrial-bg-light"
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="text-xs font-bold truncate">{asset.name}</div>
                      <div className="text-[9px] opacity-70 mt-0.5">{asset.type.toUpperCase()} | {asset.telemetry.speed} RPM</div>
                    </div>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      asset.status === "ok" ? "bg-industrial-status-ok" :
                      asset.status === "warning" ? "bg-industrial-status-warning" :
                      "bg-industrial-status-critical"
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Quick Stability Indicator */}
            <div className="mt-auto pt-md border-t border-industrial-border-dark">
              {activeAnomaly ? (
                <button
                  onClick={clearAnomalies}
                  className="w-full bg-industrial-status-critical text-industrial-bg-highContrast hover:bg-industrial-status-critical/90 font-mono text-[10px] font-bold py-2 px-3 rounded transition flex items-center justify-center gap-1.5 animate-pulse cursor-pointer uppercase"
                >
                  <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                  <span>Restore Stability</span>
                </button>
              ) : (
                <div className="w-full bg-industrial-bg-dark border border-industrial-border-dark py-2 px-3 rounded text-center text-industrial-status-ok font-mono text-[10px] flex items-center justify-center gap-1.5 select-none uppercase">
                  <span className="w-2 h-2 rounded-full bg-industrial-status-ok glow-ok shrink-0" />
                  <span>Plant Nominal</span>
                </div>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
