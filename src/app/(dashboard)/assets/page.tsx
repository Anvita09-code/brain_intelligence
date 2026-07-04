/**
 * Fleet-Wide Industrial Asset Registry – Assets Matrix Ecosystem
 *
 * Physical equipment directory, component tree classification node structure,
 * and operational availability matrices.
 *
 * Route: /assets
 * Layout: (dashboard) – inherits sidebar, header, breadcrumbs
 *
 * @version 3.0.0 – Phase 3 Industrial Platform
 */

import React from 'react';
import Link from 'next/link';

export default function FleetWideAssetDirectoryMatrix() {
  return (
    <div className="space-y-6">

      {/* ── HEADER SECTION ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">FLEET-WIDE INDUSTRIAL ASSET REGISTRY</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Physical equipment directory, component tree classification node structure, and operational availability matrices.</p>
        </div>
        <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold self-start sm:self-center">REGISTER NOVO ASSET NODE</button>
      </div>

      {/* ── FILTER PANEL WIREFRAME CONTROLS ── */}
      <div className="bg-[#0f172a] border border-slate-800 p-4 rounded grid grid-cols-1 sm:grid-cols-4 gap-3">
        <input type="text" placeholder="QUERY INTERFACE SEARCH..." className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 font-mono text-xs text-slate-300 focus:outline-none focus:border-cyan-500" disabled />
        <select className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 font-mono text-xs text-slate-400 focus:outline-none" disabled><option>PLANT LOCATION: ALL REGIONS</option></select>
        <select className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 font-mono text-xs text-slate-400 focus:outline-none" disabled><option>CRITICALITY COMPONENT RATIO</option></select>
        <select className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 font-mono text-xs text-slate-400 focus:outline-none" disabled><option>HEALTH: AGGREGATE SUMMARY</option></select>
      </div>

      {/* ── INDUSTRIAL ASSETS COMPREHENSIVE REGISTRY GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { tag: 'SYS-TURB-081', type: 'Heavy Centrifugal Turbine Gas Compressor', health: 94, area: 'Munich Processing Plant Line A', dev: '6 Sensors Embedded' },
          { tag: 'SYS-PUMP-402', type: 'High-Pressure Submersible Fluid Inductor', health: 71, area: 'Rotterdam Refining Depot Terminal 2', dev: '4 Sensors Embedded' },
          { tag: 'SYS-ROBT-119', type: 'Articulated Precision Assembly Robotic Node', health: 99, area: 'Stuttgart Automation Complex Line 4', dev: '12 Sensors Embedded' },
          { tag: 'SYS-GENR-904', type: 'Emergency Baseload Synchronous Power Unit', health: 42, area: 'Austin Datacenter Critical Subsystem', dev: '8 Sensors Embedded' },
          { tag: 'SYS-BOIL-331', type: 'Industrial Thermal Steam Heat Exchanger Vessel', health: 88, area: 'Houston Petrochemical Refinery Area D', dev: '5 Sensors Embedded' },
        ].map((asset) => (
          <div key={asset.tag} className="bg-[#0f172a] border border-slate-800 rounded flex flex-col justify-between p-4 hover:border-slate-700 transition-all duration-150">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-cyan-400 font-bold tracking-wider">{asset.tag}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${asset.health > 90 ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40' : asset.health > 60 ? 'bg-amber-950/60 text-amber-400 border-amber-800/40' : 'bg-red-950/60 text-red-400 border-red-800/40'}`}>
                  HEALTH: {asset.health}%
                </span>
              </div>
              <h3 className="text-sm font-sans font-bold text-slate-200 mb-1">{asset.type}</h3>
              <p className="text-[11px] font-mono text-slate-500 mb-4">{asset.area}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">{asset.dev}</span>
              <Link href={`/assets/${asset.tag}`} className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1">
                EXAMINE CORE TWIN <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
