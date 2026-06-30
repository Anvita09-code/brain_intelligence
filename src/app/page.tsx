import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Cpu, Activity, Database, ArrowRight, Lock } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-grow flex flex-col min-h-screen bg-industrial-bg-dark font-sans grid-mesh selection:bg-industrial-status-warning selection:text-industrial-bg-highContrast">
      {/* Top Bar */}
      <header className="border-b border-industrial-border-dark bg-industrial-panel-dark/80 backdrop-blur-md px-md md:px-lg py-4 flex items-center justify-between">
        <Logo size="lg" />
        <div className="flex items-center gap-4 font-mono text-xs">
          <Link
            href="/login"
            className="text-industrial-status-offline hover:text-industrial-bg-light transition flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-industrial-bg-dark"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Operator Auth</span>
          </Link>
          <Link
            href="/dashboard"
            className="bg-industrial-status-ok text-industrial-bg-highContrast hover:bg-industrial-status-ok/90 font-bold px-4 py-2 rounded transition flex items-center gap-1.5 uppercase tracking-wider"
          >
            <span>Control Room</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-md md:p-2xl max-w-6xl mx-auto text-center my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-industrial-status-warning/10 border border-industrial-status-warning/30 text-industrial-status-warning font-mono text-xs mb-6 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-industrial-status-warning" />
          <span>ENTERPRISE RELEASE v2.4.0 ONLINE</span>
        </div>

        <h1 className="font-mono text-4xl md:text-6xl font-bold uppercase tracking-tight text-industrial-bg-light max-w-4xl leading-tight">
          Next-Gen Industrial <span className="text-industrial-status-warning">Operations Board</span>
        </h1>

        <p className="font-sans text-sm md:text-base text-industrial-status-offline max-w-2xl mt-6 leading-relaxed">
          Unifying high-frequency streaming digital twin telemetry, semantic Graph RAG knowledge diagnostics, and real-time SHAP machine learning explainability into a single enterprise dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full max-w-md justify-center">
          <Link
            href="/dashboard"
            className="flex-1 bg-industrial-status-warning text-industrial-bg-highContrast hover:bg-industrial-status-warning/90 font-mono font-bold py-3.5 px-6 rounded text-sm uppercase tracking-wider transition shadow-lg shadow-industrial-status-warning/20 flex items-center justify-center gap-2"
          >
            <span>Enter Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="flex-1 bg-industrial-panel-dark border border-industrial-border-dark hover:border-industrial-status-offline text-industrial-bg-light font-mono font-bold py-3.5 px-6 rounded text-sm uppercase tracking-wider transition flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-industrial-status-offline" />
            <span>Operator Login</span>
          </Link>
        </div>

        {/* Subsystem Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full text-left">
          <div className="bg-industrial-panel-dark/60 border border-industrial-border-dark p-6 rounded flex flex-col gap-3 hover:border-industrial-status-ok/50 transition">
            <Cpu className="w-8 h-8 text-industrial-status-ok" />
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-industrial-bg-light">Digital Twin Telemetry</h2>
            <p className="font-sans text-xs text-industrial-status-offline leading-relaxed">
              Sub-second monitoring of turbine RPM, thermal boundary limits, and dynamic compressor discharge pressure.
            </p>
          </div>

          <div className="bg-industrial-panel-dark/60 border border-industrial-border-dark p-6 rounded flex flex-col gap-3 hover:border-industrial-status-warning/50 transition">
            <Database className="w-8 h-8 text-industrial-status-warning" />
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-industrial-bg-light">Graph RAG Diagnostics</h2>
            <p className="font-sans text-xs text-industrial-status-offline leading-relaxed">
              Semantic retrieval loops linking real-time mechanical vibration signatures to enterprise standard operating procedures.
            </p>
          </div>

          <div className="bg-industrial-panel-dark/60 border border-industrial-border-dark p-6 rounded flex flex-col gap-3 hover:border-industrial-status-critical/50 transition">
            <Activity className="w-8 h-8 text-industrial-status-critical" />
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-industrial-bg-light">SHAP Explainability</h2>
            <p className="font-sans text-xs text-industrial-status-offline leading-relaxed">
              Demystifying XGBoost anomaly predictions with force plots and feature contribution weights in real time.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-industrial-border-dark py-6 px-md md:px-lg text-center font-mono text-xs text-industrial-status-offline">
        © 2026 Enterprise Industrial Operations Board // Modular Architecture
      </footer>
    </div>
  );
}
