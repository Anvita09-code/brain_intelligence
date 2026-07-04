'use client';

import React, { useState } from 'react';

export default function DigitalTwinPage() {
  const [selectedAsset] = useState('TX-4');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">REAL-TIME COMPONENT SIMULATION SANDBOX</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">3D digital twin canvas with live physics simulation, what-if scenario testing, and parameter tuning.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <select className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-[11px] font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50" defaultValue={selectedAsset}>
            <option>TX-4 (Transformer)</option>
            <option>PUMP-01A (Hydraulic Pump)</option>
            <option>ROBOT-ARM-6 (Robot)</option>
            <option>CNC-MILL-3 (CNC Mill)</option>
            <option>COMP-001 (Compressor)</option>
          </select>
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold">LOAD TWIN</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-[#0f172a] border border-slate-800 rounded flex flex-col min-h-[480px]">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-300">DIGITAL TWIN CANVAS — {selectedAsset} // REAL-TIME PHYSICS ENGINE</span>
            <div className="flex gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" /><span className="text-[10px] font-mono text-slate-500">SIM ACTIVE · 60 FPS</span></div>
          </div>
          <div className="flex-1 p-6 flex items-center justify-center border-dashed border-2 border-slate-800/60 m-4 rounded bg-slate-950/40 text-center">
            <div>
              <span className="text-5xl mb-3 block">💎</span>
              <span className="text-xs font-mono text-slate-400 font-semibold block">3D WEBGL RENDER CANVAS</span>
              <span className="text-[10px] font-mono text-slate-600 block mt-1">Rotate: Drag · Zoom: Scroll · Select: Click</span>
              <div className="mt-3 flex justify-center gap-3">
                <span className="text-[10px] font-mono text-slate-500">◉ WIREFRAME</span>
                <span className="text-[10px] font-mono text-slate-500">◉ SOLID</span>
                <span className="text-[10px] font-mono text-cyan-500">◉ THERMAL</span>
                <span className="text-[10px] font-mono text-slate-500">◉ STRESS</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded flex flex-col">
          <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">SIMULATION PARAMETERS</span></div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
            {[
              { label: 'AMBIENT TEMP', value: '38.0', unit: '°C', min: 0, max: 60 },
              { label: 'LOAD FACTOR', value: '78', unit: '%', min: 0, max: 100 },
              { label: 'COOLANT FLOW', value: '2400', unit: 'RPM', min: 0, max: 3600 },
              { label: 'OIL PRESSURE', value: '4.2', unit: 'bar', min: 0, max: 10 },
              { label: 'VIBRATION RMS', value: '2.1', unit: 'mm/s', min: 0, max: 10 },
            ].map((p, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between"><span className="text-[10px] font-mono text-slate-500">{p.label}</span><span className="text-[10px] font-mono text-cyan-400">{p.value} {p.unit}</span></div>
                <input type="range" min={p.min} max={p.max} defaultValue={parseFloat(p.value)} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
              </div>
            ))}
            <button type="button" className="w-full px-3 py-2 font-mono text-[11px] rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold mt-2">APPLY SCENARIO</button>
            <button type="button" className="w-full px-3 py-2 font-mono text-[11px] rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300">RESET DEFAULTS</button>
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded">
        <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">SIMULATION EVENT LOG</span></div>
        <div className="p-4 font-mono text-[11px] text-slate-400 space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
          <div>[09:41:02.014] SIM_INIT: Digital twin loaded for asset TX-4. Mesh vertices: 24,182. Physics engine: ACTIVE.</div>
          <div>[09:41:02.018] TELEMETRY_STREAM: Live data feed attached. Polling interval: 100ms.</div>
          <div>[09:41:02.022] SCENARIO_DEFAULT: Baseline parameters applied from asset registry.</div>
          <div>[09:41:05.341] RENDER_READY: Canvas framebuffer initialized. 60 FPS target achieved.</div>
        </div>
      </div>
    </div>
  );
}
