"use client";

import React, { useState } from "react";
import { useTelemetry } from "@/contexts/TelemetryContext";
import { useTheme } from "@/hooks/useTheme";
import { DEFAULT_WS_URL } from "@/utils/constants";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Settings, Sliders, Monitor, Wifi, Save, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  const { wsStatus, features } = useTelemetry();
  const { theme, toggleTheme } = useTheme();
  const [wsUrl, setWsUrl] = useState(DEFAULT_WS_URL);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex flex-col flex-grow py-md pb-xl">
      <Container fluid className="flex flex-col gap-md max-w-4xl">
        <div className="border-b border-industrial-border-dark pb-sm">
          <h1 className="font-mono text-lg font-bold uppercase tracking-wider text-industrial-bg-light flex items-center gap-2">
            <Settings className="w-5 h-5 text-industrial-status-offline" />
            <span>Enterprise System Settings & Config</span>
          </h1>
          <p className="font-mono text-xs text-industrial-status-offline mt-1">
            Configure streaming transport layers, feature flag submodules, and panel themes
          </p>
        </div>

        {isSaved && (
          <div className="bg-industrial-status-ok/20 border border-industrial-status-ok p-sm rounded font-mono text-xs text-industrial-status-ok flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span>Enterprise configuration parameters saved to local state buffer.</span>
          </div>
        )}

        {/* Transport Layer Settings */}
        <Card title="TELEMETRY TRANSPORT LAYER (WEBSOCKET)">
          <form onSubmit={handleSave} className="flex flex-col gap-4 font-mono text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-industrial-status-offline flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-industrial-status-warning" />
                <span>Primary Streaming Endpoint URL</span>
              </label>
              <input
                type="text"
                value={wsUrl}
                onChange={(e) => setWsUrl(e.target.value)}
                className="bg-industrial-bg-dark border border-industrial-border-dark rounded px-3 py-2 text-industrial-bg-light focus:border-industrial-status-warning focus:outline-none"
              />
              <span className="text-[10px] text-industrial-status-offline">
                Current Stream Sync Status: <span className="text-industrial-status-warning font-bold">{wsStatus.toUpperCase()}</span> (Fallback simulator active)
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="md" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
                UPDATE ENDPOINT
              </Button>
            </div>
          </form>
        </Card>

        {/* Subsystem Feature Flags */}
        <Card title="SUBSYSTEM FEATURE FLAGS">
          <div className="flex flex-col gap-4 font-mono text-xs">
            <div className="flex items-center justify-between p-3 bg-industrial-bg-dark rounded border border-industrial-border-dark">
              <div>
                <div className="font-bold text-industrial-bg-light flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-industrial-status-ok" />
                  <span>Digital Twin High-Frequency Streaming</span>
                </div>
                <p className="text-[10px] text-industrial-status-offline mt-0.5">Enables animated SVG pipe flow schematics and turbine RPM fluctuation models.</p>
              </div>
              <span className="text-industrial-status-ok font-bold uppercase">{features.digitalTwin ? "ENABLED" : "DISABLED"}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-industrial-bg-dark rounded border border-industrial-border-dark">
              <div>
                <div className="font-bold text-industrial-bg-light flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-industrial-status-warning" />
                  <span>Semantic Graph RAG Diagnostics</span>
                </div>
                <p className="text-[10px] text-industrial-status-offline mt-0.5">Enables knowledge graph query panels linking failures to SOP documents.</p>
              </div>
              <span className="text-industrial-status-ok font-bold uppercase">{features.graphRag ? "ENABLED" : "DISABLED"}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-industrial-bg-dark rounded border border-industrial-border-dark">
              <div>
                <div className="font-bold text-industrial-bg-light flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-industrial-status-critical" />
                  <span>SHAP Machine Learning Explainability</span>
                </div>
                <p className="text-[10px] text-industrial-status-offline mt-0.5">Calculates Shapley additive feature contribution weights for anomaly classifications.</p>
              </div>
              <span className="text-industrial-status-ok font-bold uppercase">{features.shap ? "ENABLED" : "DISABLED"}</span>
            </div>
          </div>
        </Card>

        {/* UI Theme Customization */}
        <Card title="CONTROL PANEL AESTHETICS">
          <div className="flex items-center justify-between font-mono text-xs p-2">
            <div>
              <div className="font-bold text-industrial-bg-light flex items-center gap-2">
                <Monitor className="w-4 h-4 text-industrial-status-offline" />
                <span>Active Color Scheme Profile</span>
              </div>
              <p className="text-[10px] text-industrial-status-offline mt-0.5">Switch between dark CRT monitor mode and high-contrast day shift mode.</p>
            </div>
            <Button variant="secondary" size="sm" onClick={toggleTheme}>
              THEME: {theme.toUpperCase()}
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
