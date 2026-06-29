"use client";

import React, { useState } from "react";
import { TelemetryProvider, useTelemetry } from "@/context/TelemetryContext";
import { DigitalTwinView } from "@/components/DigitalTwinView";
import { GraphRagPanel } from "@/components/GraphRagPanel";
import { ShapExplainability } from "@/components/ShapExplainability";
import { Activity, ShieldAlert, Database, Cpu, RefreshCw } from "lucide-react";

const MainDashboard: React.FC = () => {
  const {
    assets,
    selectedAssetId,
    setSelectedAssetId,
    wsStatus,
    injectAnomaly,
    clearAnomalies,
    activeAnomaly,
    features
  } = useTelemetry();

  const [activeTab, setActiveTab] = useState<"twin" | "rag" | "shap">("twin");


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
    <div className="flex flex-col min-h-screen bg-industrial-bg-dark font-sans selection:bg-industrial-status-warning selection:text-industrial-bg-highContrast">
      {/* Header Panel */}
      <header className="border-b border-industrial-border-dark bg-industrial-panel-dark px-md py-sm flex flex-col md:flex-row md:items-center justify-between gap-sm crt-scanlines shrink-0">
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-xs">
            <div className="bg-industrial-status-critical text-industrial-bg-highContrast p-xs rounded font-bold font-mono text-sm tracking-tighter">
              IOB
            </div>
            <h1 className="text-md font-bold font-mono uppercase tracking-wider text-industrial-bg-light">
              Industrial Operations Board
            </h1>
          </div>
          <span className="hidden md:inline text-industrial-status-offline text-xs">|</span>
          <span className="hidden md:inline font-mono text-[10px] text-industrial-status-offline">
            NODE_ENV: <span className="text-industrial-status-ok">{process.env.NODE_ENV || "development"}</span>
          </span>
        </div>

        {/* WebSocket Stream Details */}
        <div className="flex flex-wrap items-center gap-sm font-mono text-xs">
          <span className="text-industrial-status-offline">Endpoint:</span>
          <span className="text-industrial-bg-light bg-industrial-bg-dark border border-industrial-border-dark px-sm py-0.5 rounded text-[10px]">
            {process.env.NEXT_PUBLIC_WS_URL || "wss://stream.iob.enterprise.internal/v1"}
          </span>
          <span className={`px-sm py-0.5 rounded border text-[10px] uppercase font-bold flex items-center gap-xs ${getWsBadgeColor()}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              wsStatus === "connected" ? "bg-industrial-status-ok" :
              wsStatus === "connecting" ? "bg-industrial-status-warning animate-ping" :
              "bg-industrial-status-warning"
            }`} />
            {wsStatus.replace("-", " ")}
          </span>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="flex-grow flex flex-col lg:flex-row gap-0 overflow-hidden">
        
        {/* Left Control Column (Asset Selectors & Anomaly Injectors) */}
        <aside className="w-full lg:w-80 border-r border-industrial-border-dark bg-industrial-panel-dark/40 flex flex-col shrink-0">
          
          {/* Asset List Section */}
          <div className="p-md border-b border-industrial-border-dark">
            <span className="text-[10px] font-mono font-bold text-industrial-status-offline uppercase tracking-wider block mb-sm">
              Operational Assets
            </span>
            <div className="flex flex-col gap-sm">
              {assets.map((asset) => {
                const isSelected = asset.id === selectedAssetId;
                return (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`w-full text-left font-mono border rounded p-sm flex justify-between items-center transition group ${
                      isSelected
                        ? "bg-industrial-bg-dark border-industrial-status-warning/60 text-industrial-bg-light"
                        : "bg-transparent border-industrial-border-dark hover:border-industrial-status-offline/50 text-industrial-status-offline hover:text-industrial-bg-light"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{asset.name}</div>
                      <div className="text-[9px] opacity-70 mt-xs">{asset.type.toUpperCase()} | {asset.telemetry.speed} RPM</div>
                    </div>
                    {/* Tiny Status indicator light */}
                    <div className="flex items-center gap-xs">
                      <span className={`w-2 h-2 rounded-full ${
                        asset.status === "ok" ? "bg-industrial-status-ok" :
                        asset.status === "warning" ? "bg-industrial-status-warning" :
                        "bg-industrial-status-critical"
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Anomaly Controls */}
          <div className="p-md flex-grow flex flex-col justify-between">
            <div className="flex flex-col gap-sm">
              <div className="flex items-center gap-xs mb-xs">
                <ShieldAlert className="w-4 h-4 text-industrial-status-warning" />
                <span className="text-[10px] font-mono font-bold text-industrial-status-offline uppercase tracking-wider">
                  Hazard Injection Board
                </span>
              </div>
              <p className="text-[10px] text-industrial-status-offline leading-relaxed mb-sm font-mono">
                Force mechanical anomalies to simulate AI classification, SHAP explanations, and RAG retrieval loops.
              </p>

              <div className="flex flex-col gap-sm">
                <button
                  onClick={() => injectAnomaly("bearing-wear")}
                  className={`w-full font-mono text-xs p-sm text-left border rounded transition ${
                    activeAnomaly === "bearing-wear"
                      ? "bg-industrial-status-warning/20 border-industrial-status-warning text-industrial-status-warning font-bold"
                      : "bg-industrial-bg-dark border-industrial-border-dark text-industrial-bg-light hover:border-industrial-status-warning/40"
                  }`}
                >
                  <div className="font-bold">⚠️ Bearing Degradation</div>
                  <div className="text-[9px] opacity-70 mt-xs">Spikes Turbine casing vibration & thermal readings.</div>
                </button>

                <button
                  onClick={() => injectAnomaly("compressor-surge")}
                  className={`w-full font-mono text-xs p-sm text-left border rounded transition ${
                    activeAnomaly === "compressor-surge"
                      ? "bg-industrial-status-critical/20 border-industrial-status-critical text-industrial-status-critical font-bold animate-pulse"
                      : "bg-industrial-bg-dark border-industrial-border-dark text-industrial-bg-light hover:border-industrial-status-critical/40"
                  }`}
                >
                  <div className="font-bold">🔥 Compressor Aerodynamic Surge</div>
                  <div className="text-[9px] opacity-70 mt-xs">Spikes Compressor vibration, drops dynamic pressure.</div>
                </button>

                <button
                  onClick={() => injectAnomaly("leakage")}
                  className={`w-full font-mono text-xs p-sm text-left border rounded transition ${
                    activeAnomaly === "leakage"
                      ? "bg-industrial-status-warning/20 border-industrial-status-warning text-industrial-status-warning font-bold"
                      : "bg-industrial-bg-dark border-industrial-border-dark text-industrial-bg-light hover:border-industrial-status-warning/40"
                  }`}
                >
                  <div className="font-bold">⚠️ Suction Seal Leakage</div>
                  <div className="text-[9px] opacity-70 mt-xs">Drops Pump discharge flow capacity and pressure lines.</div>
                </button>

                <button
                  onClick={() => injectAnomaly("electrical-trip")}
                  className={`w-full font-mono text-xs p-sm text-left border rounded transition ${
                    activeAnomaly === "electrical-trip"
                      ? "bg-industrial-status-critical/25 border-industrial-status-critical text-industrial-status-critical font-bold"
                      : "bg-industrial-bg-dark border-industrial-border-dark text-industrial-bg-light hover:border-industrial-status-critical/40"
                  }`}
                >
                  <div className="font-bold">🚨 Global Emergency Trip</div>
                  <div className="text-[9px] opacity-70 mt-xs">Triggers motor braking, halts load grid outputs.</div>
                </button>
              </div>
            </div>

            {/* Clear Button */}
            <div className="pt-md mt-md border-t border-industrial-border-dark">
              {activeAnomaly ? (
                <button
                  onClick={clearAnomalies}
                  className="w-full bg-industrial-status-ok text-industrial-bg-highContrast hover:bg-industrial-status-ok/90 font-mono text-xs font-bold py-sm px-md rounded transition flex items-center justify-center gap-xs animate-pulse"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  RESTORE PLANT STABILITY
                </button>
              ) : (
                <div className="w-full bg-industrial-bg-dark border border-industrial-border-dark py-sm px-md rounded text-center text-industrial-status-ok font-mono text-xs flex items-center justify-center gap-xs select-none">
                  <span className="w-2 h-2 rounded-full bg-industrial-status-ok glow-ok" />
                  PLANT OPERATIONAL
                </div>
              )}
            </div>

          </div>
        </aside>

        {/* Right Dashboard Area (Navigation Tabs + Dynamic Panel) */}
        <main className="flex-grow flex flex-col overflow-y-auto">
          
          {/* Feature Tabs Navigation */}
          <div className="border-b border-industrial-border-dark bg-industrial-panel-dark px-md py-xs flex gap-md shrink-0">
            {features.digitalTwin && (
              <button
                onClick={() => setActiveTab("twin")}
                className={`py-sm px-md border-b-2 font-mono text-xs font-bold transition flex items-center gap-xs ${
                  activeTab === "twin"
                    ? "border-industrial-status-warning text-industrial-bg-light"
                    : "border-transparent text-industrial-status-offline hover:text-industrial-bg-light"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                Digital Twin & Telemetry
              </button>
            )}

            {features.graphRag && (
              <button
                onClick={() => setActiveTab("rag")}
                className={`py-sm px-md border-b-2 font-mono text-xs font-bold transition flex items-center gap-xs ${
                  activeTab === "rag"
                    ? "border-industrial-status-warning text-industrial-bg-light"
                    : "border-transparent text-industrial-status-offline hover:text-industrial-bg-light"
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                Graph RAG Diagnostics
              </button>
            )}

            {features.shap && (
              <button
                onClick={() => setActiveTab("shap")}
                className={`py-sm px-md border-b-2 font-mono text-xs font-bold transition flex items-center gap-xs ${
                  activeTab === "shap"
                    ? "border-industrial-status-warning text-industrial-bg-light"
                    : "border-transparent text-industrial-status-offline hover:text-industrial-bg-light"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                SHAP Explainability
              </button>
            )}
          </div>

          {/* Active Feature Window Content */}
          <div className="flex-grow p-md">
            {activeTab === "twin" && <DigitalTwinView />}
            {activeTab === "rag" && <GraphRagPanel />}
            {activeTab === "shap" && <ShapExplainability />}
          </div>

        </main>
      </div>

      {/* Footer Diagnostic Panel */}
      <footer className="border-t border-industrial-border-dark bg-industrial-panel-dark px-md py-xs text-[10px] font-mono text-industrial-status-offline flex flex-col sm:flex-row sm:justify-between sm:items-center gap-xs shrink-0">
        <div>
          <span>Plant Diagnostic status: </span>
          {activeAnomaly ? (
            <span className="text-industrial-status-critical font-bold animate-pulse">
              ANOMALY CLASSIFIED IN PROGRESS: [{activeAnomaly.toUpperCase()}]
            </span>
          ) : (
            <span className="text-industrial-status-ok font-bold">NOMINAL OPERATIONAL PROFILE</span>
          )}
        </div>
        <div className="flex items-center gap-md">
          <span className="flex items-center gap-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-industrial-status-ok" />
            Security: CSP Active
          </span>
          <span>© 2026 Enterprise Industrial Operations Board</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <TelemetryProvider>
      <MainDashboard />
    </TelemetryProvider>
  );
}
