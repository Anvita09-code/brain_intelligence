"use client";

import { useTelemetry } from "@/contexts/TelemetryContext";
import { ANOMALY_TYPES } from "@/utils/constants";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShieldAlert, RefreshCw, AlertOctagon, CheckCircle2, Flame, BellRing } from "lucide-react";

export default function AlertsPage() {
  const { assets, activeAnomaly, injectAnomaly, clearAnomalies, selectedAssetId } = useTelemetry();

  const focusAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];

  return (
    <div className="flex flex-col flex-grow py-md pb-xl">
      <Container fluid className="flex flex-col gap-md">
        <div className="border-b border-industrial-border-dark pb-sm">
          <h1 className="font-mono text-lg font-bold uppercase tracking-wider text-industrial-bg-light flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-industrial-status-warning" />
            <span>Hazard Injection & Alarm Management Board</span>
          </h1>
          <p className="font-mono text-xs text-industrial-status-offline mt-1">
            Simulate mechanical stress vectors on focus asset: [{focusAsset?.name}]
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hazard Injection Column */}
          <Card className="lg:col-span-2 shadow-xl" title="HAZARD INJECTION MATRIX">
            <p className="font-mono text-xs text-industrial-status-offline mb-6 leading-relaxed">
              Triggering a hazard overrides live sensor simulation on the targeted focus asset, inducing extreme thermal spikes, acoustic vibration harmonics, or compressor aerodynamic surge.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ANOMALY_TYPES.map((anomaly) => {
                const isActive = activeAnomaly === anomaly.id;

                return (
                  <div
                    key={anomaly.id}
                    onClick={() => injectAnomaly(anomaly.id)}
                    className={`p-4 rounded border font-mono transition cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? "bg-industrial-status-critical/15 border-industrial-status-critical text-industrial-bg-light shadow-lg shadow-industrial-status-critical/10"
                        : "bg-industrial-bg-dark border-industrial-border-dark hover:border-industrial-status-warning text-industrial-status-offline hover:text-industrial-bg-light"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold uppercase flex items-center gap-2 ${isActive ? "text-industrial-status-critical animate-pulse" : "text-industrial-bg-light"}`}>
                          {anomaly.severity === "critical" ? <Flame className="w-4 h-4 text-industrial-status-critical" /> : <AlertOctagon className="w-4 h-4 text-industrial-status-warning" />}
                          <span>{anomaly.name}</span>
                        </span>
                        {isActive && (
                          <span className="bg-industrial-status-critical text-industrial-bg-highContrast text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] opacity-80 mt-2 leading-normal">{anomaly.description}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-industrial-border-dark/60 flex items-center justify-between text-[10px]">
                      <span className="uppercase font-bold text-industrial-status-offline">Severity: {anomaly.severity}</span>
                      <span className="text-industrial-status-warning font-bold">{isActive ? "INJECTING..." : "CLICK TO INJECT"}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-industrial-border-dark flex items-center justify-between">
              <span className="font-mono text-xs text-industrial-status-offline">
                Plant Stability Override Control
              </span>
              {activeAnomaly ? (
                <Button variant="ok" size="lg" onClick={clearAnomalies} leftIcon={<RefreshCw className="w-4 h-4 animate-spin" />}>
                  RESTORE PLANT STABILITY
                </Button>
              ) : (
                <div className="inline-flex items-center gap-2 font-mono text-xs text-industrial-status-ok font-bold bg-industrial-status-ok/10 px-4 py-2 rounded border border-industrial-status-ok/30 select-none">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>PLANT OPERATING IN NOMINAL STATE</span>
                </div>
              )}
            </div>
          </Card>

          {/* Alarm Log Feed Column */}
          <Card title="LIVE SYSTEM ALARM LOG">
            <div className="flex flex-col gap-3 font-mono text-xs">
              {activeAnomaly ? (
                <div className="p-3 bg-industrial-status-critical/10 border border-industrial-status-critical/40 rounded flex flex-col gap-1">
                  <div className="flex items-center justify-between text-industrial-status-critical font-bold text-[10px]">
                    <span className="flex items-center gap-1.5 animate-pulse">
                      <BellRing className="w-3.5 h-3.5" />
                      <span>CRITICAL ALARM UNACKNOWLEDGED</span>
                    </span>
                    <span>NOW</span>
                  </div>
                  <div className="text-industrial-bg-light font-bold mt-1">{activeAnomaly.toUpperCase()} DETECTED</div>
                  <p className="text-[10px] text-industrial-status-offline">Automated trip classification loop initiated. SHAP explainer calculating feature weights.</p>
                </div>
              ) : (
                <div className="p-6 text-center text-industrial-status-offline text-xs">
                  No active mechanical alarms in telemetry buffer.
                </div>
              )}

              <div className="p-3 bg-industrial-bg-dark border border-industrial-border-dark rounded opacity-60 flex flex-col gap-1">
                <div className="flex items-center justify-between text-[10px] text-industrial-status-offline">
                  <span>SYSTEM_BOOT</span>
                  <span>08:00:12</span>
                </div>
                <div className="text-industrial-bg-light text-[11px]">Telemetry Engine Initialized</div>
                <p className="text-[9px] text-industrial-status-offline">Connected to mock streaming server fallback simulator.</p>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
