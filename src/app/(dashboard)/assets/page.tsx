"use client";

import { useTelemetry } from "@/contexts/TelemetryContext";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Cpu, Thermometer, Activity, Gauge, Wind } from "lucide-react";

export default function AssetsPage() {
  const { assets, selectedAssetId, setSelectedAssetId } = useTelemetry();

  return (
    <div className="flex flex-col flex-grow py-md pb-xl">
      <Container fluid className="flex flex-col gap-md">
        <div className="border-b border-industrial-border-dark pb-sm flex justify-between items-end">
          <div>
            <h1 className="font-mono text-lg font-bold uppercase tracking-wider text-industrial-bg-light flex items-center gap-2">
              <Cpu className="w-5 h-5 text-industrial-status-ok" />
              <span>Operational Assets Telemetry</span>
            </h1>
            <p className="font-mono text-xs text-industrial-status-offline mt-1">
              Live streaming sensors // High-frequency polling buffer (1500ms)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {assets.map((asset) => {
            const isFocus = asset.id === selectedAssetId;
            const t = asset.telemetry;

            return (
              <Card
                key={asset.id}
                variant={asset.status === "critical" ? "hazard" : asset.status === "warning" ? "highlight" : "default"}
                title={asset.name}
                subtitle={`TYPE: ${asset.type.toUpperCase()} // ID: [${asset.id}]`}
                className={`transition ${isFocus ? "ring-2 ring-industrial-status-warning" : ""}`}
                headerAction={
                  <span className={`w-3 h-3 rounded-full inline-block ${
                    asset.status === "ok" ? "bg-industrial-status-ok glow-ok" :
                    asset.status === "warning" ? "bg-industrial-status-warning glow-warning" :
                    "bg-industrial-status-critical glow-critical"
                  }`} />
                }
                footer={
                  <div className="flex justify-between items-center w-full">
                    <span>Sync: {t.timestamp}</span>
                    <button
                      onClick={() => setSelectedAssetId(asset.id)}
                      className="text-industrial-status-warning hover:underline font-bold text-[10px] cursor-pointer"
                    >
                      {isFocus ? "• ACTIVE FOCUS" : "SET AS FOCUS"}
                    </button>
                  </div>
                }
              >
                <div className="grid grid-cols-2 gap-4 my-2">
                  <div className="bg-industrial-bg-dark p-3 rounded border border-industrial-border-dark flex flex-col">
                    <span className="font-mono text-[9px] text-industrial-status-offline uppercase flex items-center gap-1 font-bold">
                      <Gauge className="w-3 h-3 text-industrial-status-ok" />
                      <span>Rotational Speed</span>
                    </span>
                    <span className="font-mono text-xl font-bold text-industrial-bg-light mt-1">
                      {t.speed} <span className="text-xs font-normal text-industrial-status-offline">RPM</span>
                    </span>
                  </div>

                  <div className="bg-industrial-bg-dark p-3 rounded border border-industrial-border-dark flex flex-col">
                    <span className="font-mono text-[9px] text-industrial-status-offline uppercase flex items-center gap-1 font-bold">
                      <Thermometer className="w-3 h-3 text-industrial-status-warning" />
                      <span>Casing Temp</span>
                    </span>
                    <span className={`font-mono text-xl font-bold mt-1 ${t.temperature > 85 ? "text-industrial-status-critical animate-pulse" : "text-industrial-bg-light"}`}>
                      {t.temperature} <span className="text-xs font-normal text-industrial-status-offline">°C</span>
                    </span>
                  </div>

                  <div className="bg-industrial-bg-dark p-3 rounded border border-industrial-border-dark flex flex-col">
                    <span className="font-mono text-[9px] text-industrial-status-offline uppercase flex items-center gap-1 font-bold">
                      <Activity className="w-3 h-3 text-industrial-status-critical" />
                      <span>Harmonic Vibration</span>
                    </span>
                    <span className={`font-mono text-xl font-bold mt-1 ${t.vibration > 5.0 ? "text-industrial-status-critical" : "text-industrial-bg-light"}`}>
                      {t.vibration} <span className="text-xs font-normal text-industrial-status-offline">mm/s</span>
                    </span>
                  </div>

                  <div className="bg-industrial-bg-dark p-3 rounded border border-industrial-border-dark flex flex-col">
                    <span className="font-mono text-[9px] text-industrial-status-offline uppercase flex items-center gap-1 font-bold">
                      <Wind className="w-3 h-3 text-blue-400" />
                      <span>Discharge Press</span>
                    </span>
                    <span className="font-mono text-xl font-bold text-industrial-bg-light mt-1">
                      {t.pressure} <span className="text-xs font-normal text-industrial-status-offline">bar</span>
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-industrial-border-dark flex justify-between items-center font-mono text-xs">
                  <span className="text-industrial-status-offline">Anomaly Risk Score:</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    t.riskScore > 75 ? "bg-industrial-status-critical/20 text-industrial-status-critical" :
                    t.riskScore > 40 ? "bg-industrial-status-warning/20 text-industrial-status-warning" :
                    "bg-industrial-status-ok/20 text-industrial-status-ok"
                  }`}>
                    {t.riskScore}%
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
