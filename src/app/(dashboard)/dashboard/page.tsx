"use client";

import { useState } from "react";
import { useTelemetry } from "@/contexts/TelemetryContext";
import { DigitalTwinView } from "@/components/DigitalTwinView";
import { GraphRagPanel } from "@/components/GraphRagPanel";
import { ShapExplainability } from "@/components/ShapExplainability";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Cpu, Database, Activity, ShieldAlert, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";

export default function DashboardOverviewPage() {
  const { assets, activeAnomaly, wsStatus, clearAnomalies, features } = useTelemetry();
  const [activeTab, setActiveTab] = useState<"twin" | "rag" | "shap">("twin");

  const activeAssetCount = assets.filter((a) => a.status === "ok").length;
  const warningCount = assets.filter((a) => a.status !== "ok").length;

  return (
    <div className="flex flex-col flex-grow pb-xl">
      {/* Top Banner */}
      <div className="bg-industrial-panel-dark border-b border-industrial-border-dark p-md">
        <Container fluid className="flex flex-col md:flex-row md:items-center justify-between gap-md">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${activeAnomaly ? "bg-industrial-status-critical animate-ping" : "bg-industrial-status-ok glow-ok"}`} />
              <h1 className="font-mono text-base md:text-lg font-bold uppercase tracking-wider text-industrial-bg-light">
                Plant Operations Overview
              </h1>
            </div>
            <p className="font-mono text-xs text-industrial-status-offline mt-1">
              Real-time enterprise control loop // Local Node Sync Status: {wsStatus.toUpperCase()}
            </p>
          </div>

          <div className="flex items-center gap-sm">
            {activeAnomaly ? (
              <button
                onClick={clearAnomalies}
                className="bg-industrial-status-critical text-industrial-bg-highContrast hover:bg-industrial-status-critical/90 font-mono text-xs font-bold px-4 py-2 rounded transition flex items-center gap-2 animate-pulse cursor-pointer uppercase"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Clear Hazard: [{activeAnomaly}]</span>
              </button>
            ) : (
              <div className="bg-industrial-status-ok/10 border border-industrial-status-ok/30 text-industrial-status-ok font-mono text-xs px-3 py-1.5 rounded flex items-center gap-1.5 uppercase font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Nominal Grid Stability</span>
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container fluid className="mt-md flex flex-col gap-md">
        {/* KPI Metric Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="!p-4 border-l-4 !border-l-industrial-status-ok">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[10px] uppercase text-industrial-status-offline font-bold">Nominal Assets</span>
                <div className="font-mono text-2xl font-bold text-industrial-bg-light mt-1">{activeAssetCount} / {assets.length}</div>
              </div>
              <Cpu className="w-5 h-5 text-industrial-status-ok opacity-80" />
            </div>
          </Card>

          <Card className="!p-4 border-l-4 !border-l-industrial-status-warning">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[10px] uppercase text-industrial-status-offline font-bold">Degraded / Warnings</span>
                <div className="font-mono text-2xl font-bold text-industrial-status-warning mt-1">{warningCount}</div>
              </div>
              <AlertTriangle className="w-5 h-5 text-industrial-status-warning opacity-80" />
            </div>
          </Card>

          <Card className="!p-4 border-l-4 !border-l-industrial-status-critical">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[10px] uppercase text-industrial-status-offline font-bold">Active Hazards</span>
                <div className="font-mono text-2xl font-bold text-industrial-status-critical mt-1">{activeAnomaly ? 1 : 0}</div>
              </div>
              <ShieldAlert className="w-5 h-5 text-industrial-status-critical opacity-80" />
            </div>
          </Card>

          <Card className="!p-4 border-l-4 !border-l-industrial-status-ok">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[10px] uppercase text-industrial-status-offline font-bold">ML Classifier Confidence</span>
                <div className="font-mono text-2xl font-bold text-industrial-status-ok mt-1">98.4%</div>
              </div>
              <Activity className="w-5 h-5 text-industrial-status-ok opacity-80" />
            </div>
          </Card>
        </div>

        {/* Feature Window Navigation Tabs */}
        <div className="border-b border-industrial-border-dark bg-industrial-panel-dark px-md pt-2 flex gap-md shrink-0 rounded-t border">
          {features.digitalTwin && (
            <button
              onClick={() => setActiveTab("twin")}
              className={`py-2.5 px-4 border-b-2 font-mono text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === "twin"
                  ? "border-industrial-status-warning text-industrial-bg-light"
                  : "border-transparent text-industrial-status-offline hover:text-industrial-bg-light"
              }`}
            >
              <Cpu className="w-4 h-4 text-industrial-status-ok" />
              <span>Digital Twin Schematic</span>
            </button>
          )}

          {features.graphRag && (
            <button
              onClick={() => setActiveTab("rag")}
              className={`py-2.5 px-4 border-b-2 font-mono text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === "rag"
                  ? "border-industrial-status-warning text-industrial-bg-light"
                  : "border-transparent text-industrial-status-offline hover:text-industrial-bg-light"
              }`}
            >
              <Database className="w-4 h-4 text-industrial-status-warning" />
              <span>Graph RAG Diagnostics</span>
            </button>
          )}

          {features.shap && (
            <button
              onClick={() => setActiveTab("shap")}
              className={`py-2.5 px-4 border-b-2 font-mono text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === "shap"
                  ? "border-industrial-status-warning text-industrial-bg-light"
                  : "border-transparent text-industrial-status-offline hover:text-industrial-bg-light"
              }`}
            >
              <Activity className="w-4 h-4 text-industrial-status-critical" />
              <span>SHAP ML Explainability</span>
            </button>
          )}
        </div>

        {/* Dynamic Tab Content View */}
        <div className="bg-industrial-panel-dark/40 border border-t-0 border-industrial-border-dark p-md rounded-b">
          {activeTab === "twin" && <DigitalTwinView />}
          {activeTab === "rag" && <GraphRagPanel />}
          {activeTab === "shap" && <ShapExplainability />}
        </div>
      </Container>
    </div>
  );
}
