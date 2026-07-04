/**
 * Asset Telemetry Detail Workspace
 *
 * Granular localized sensory streams, historical event log registers,
 * and diagnostics interface indicators.
 *
 * Route: /assets/[id]
 * Layout: (dashboard) – inherits sidebar, header, breadcrumbs
 *
 * @version 3.0.0 – Phase 3 Industrial Platform
 */

import React from 'react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AssetTelemetryDetailWorkspace({ params }: PageProps) {
  const { id } = await params;

  const sensorData = [
    { id: 'TE-101', n: 'CORE THERMAL TRANSMITTER', v: '78.42 °C', status: 'OK' },
    { id: 'PT-102', n: 'PRIMARY INLET DISCHARGE PRESSURE', v: '14.21 BAR', status: 'OK' },
    { id: 'VE-103', n: 'AXIAL VIBRATION ACCELEROMETER', v: '1.42 mm/s', status: 'OK' },
    { id: 'FE-104', n: 'VOLUMETRIC LIQUID FLOW METER', v: '240.2 L/m', status: 'OK' },
  ];

  return (
    <div className="space-y-6">
      {/* ── PROFILE TITLE ARCHITECTURE ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/assets" className="text-xs font-mono text-slate-500 hover:text-cyan-400">
              ← INDEX DIRECTORY
            </Link>
          </div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white uppercase">
            ASSET TOPOLOGY: {id}
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Granular localized sensory streams, historical event log registers, and diagnostics interface indicators.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <Link
            href="/digital-twin"
            className="px-3 py-1.5 font-mono text-[11px] rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-cyan-400 font-bold"
          >
            LAUNCH DIGITAL CANVAS
          </Link>
        </div>
      </div>

      {/* ── TWO COLUMN HARDWARE ANALYTICAL BLOCK PANEL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PHYSICAL ASSET METADATA OVERVIEW CONFIG */}
        <div className="bg-[#0f172a] border border-slate-800 rounded p-4 space-y-4 font-mono text-xs">
          <div className="text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
            METADATA SCHEMATIC INDEX
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-slate-500">MANUFACTURER REG:</span> ABB INDUSTRIAL AUTOMATION GROUP
            </div>
            <div>
              <span className="text-slate-500">DEPLOYMENT TIME:</span> 2021-04-18 @ 06:14:00 UTC
            </div>
            <div>
              <span className="text-slate-500">OPERATIONAL HOURS:</span> 41,209 RUNTIME HRS
            </div>
            <div>
              <span className="text-slate-500">LUBRICATION FACTOR:</span> 94.1% NOMINAL
            </div>
            <div>
              <span className="text-slate-500">FIRMWARE REVISION:</span> v4.81-REV2
            </div>
          </div>
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded text-[11px]">
            <div className="text-slate-400 font-bold mb-1">DESIGNER NOTES RECORD</div>
            <p className="text-slate-500 font-sans leading-relaxed">
              Bearing assembly unit replacement optimized during maintenance interval cycle Q2 2025. 
              Monitoring vibration resonance parameters strictly via specialized sensory array.
            </p>
          </div>
        </div>

        {/* HIGH RECONCILIATION SENSOR STREAMS */}
        <div className="lg:col-span-2 bg-[#0f172a] border border-slate-800 rounded flex flex-col min-h-[300px]">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-300">
              INTEGRATED SENSORY NODE DATA MATRIX STREAM
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
              5/5 ONLINE
            </span>
          </div>

          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
            {sensorData.map((s) => (
              <div
                key={s.id}
                className="p-3 bg-slate-950/60 border border-slate-800/80 rounded flex items-center justify-between font-mono"
              >
                <div>
                  <div className="text-[10px] text-slate-500">{s.id} // {s.n}</div>
                  <div className="text-base font-bold text-slate-200 mt-0.5">{s.v}</div>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-emerald-400 border border-emerald-800/30 font-bold">
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COMPREHENSIVE LOCALIZED MAINTENANCE TICKETING ARCHIVE ── */}
      <div className="bg-[#0f172a] border border-slate-800 rounded">
        <div className="px-4 py-3 border-b border-slate-800">
          <span className="text-xs font-mono font-bold text-slate-300">
            HISTORICAL PREVENTATIVE MAINTENANCE EXPEDITION TRACKS
          </span>
        </div>
        <div className="p-4 flex flex-col items-center justify-center min-h-[140px] border-dashed border-2 border-slate-800/60 m-4 rounded bg-slate-950/40 text-center text-slate-500 font-mono text-xs">
          <span>🛠️ NO UNRESOLVED WORK TICKETS LOGGED AGAINST THIS RECOGNIZED TOPOLOGY NODE UNIT</span>
          <span className="text-[10px] text-slate-600 mt-0.5">
            System database connection verified. Maintenance scheduler registers clean optimization scores for this period.
          </span>
        </div>
      </div>
    </div>
  );
}
