import React from 'react';
import Link from 'next/link';

export default function AssetsMatrixPage() {
  const assets = [
    { id: 'TX-101', name: 'Primary Transformer Substation A', type: 'ELECTRICAL', status: 'ONLINE', health: 98.2, location: 'BUILDING-ALPHA' },
    { id: 'TX-204', name: 'Secondary Distribution Transformer B', type: 'ELECTRICAL', status: 'ONLINE', health: 94.7, location: 'BUILDING-BETA' },
    { id: 'PUMP-01A', name: 'High-Pressure Hydraulic Pump Unit', type: 'HYDRAULIC', status: 'DEGRADED', health: 72.3, location: 'LINE-1-SECTOR-C' },
    { id: 'PUMP-02B', name: 'Coolant Circulation Pump Assembly', type: 'HYDRAULIC', status: 'ONLINE', health: 99.1, location: 'LINE-2-SECTOR-A' },
    { id: 'ROBOT-ARM-6', name: 'Articulated 6-Axis Welding Robot', type: 'ROBOTICS', status: 'MAINTENANCE', health: 85.6, location: 'LINE-3-STATION-4' },
    { id: 'CNC-MILL-3', name: '5-Axis CNC Milling Center', type: 'MACHINING', status: 'ONLINE', health: 91.4, location: 'LINE-2-STATION-1' },
    { id: 'COMP-001', name: 'Industrial Air Compressor Unit', type: 'PNEUMATIC', status: 'ONLINE', health: 97.8, location: 'UTILITY-ZONE-NORTH' },
    { id: 'VLV-MAIN-02', name: 'Main Isolation Valve Assembly', type: 'VALVE', status: 'CRITICAL', health: 45.2, location: 'LINE-1-SECTOR-A' },
    { id: 'GEN-STBY-1', name: 'Diesel Standby Generator 500kVA', type: 'POWER', status: 'STANDBY', health: 100, location: 'UTILITY-ZONE-SOUTH' },
    { id: 'SENSOR-TH-44', name: 'Thermocouple Array Node 44', type: 'SENSOR', status: 'ONLINE', health: 99.9, location: 'LINE-1-REACTOR' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">FLEET-WIDE ASSET DIRECTORY MATRIX</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Industrial asset hierarchy registry with real-time health telemetry and operational status mapping.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300">ADD ASSET</button>
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold">BULK IMPORT</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'TOTAL REGISTERED ASSETS', val: '1,240', color: 'text-cyan-400' },
          { title: 'ONLINE / OPERATIONAL', val: '1,187', color: 'text-emerald-400' },
          { title: 'DEGRADED / WARNING', val: '39', color: 'text-amber-400' },
          { title: 'CRITICAL / OFFLINE', val: '14', color: 'text-red-400' },
        ].map((m, idx) => (
          <div key={idx} className="bg-[#0f172a] border border-slate-800 p-4 rounded">
            <div className="text-[10px] font-mono text-slate-500 tracking-wider mb-2">{m.title}</div>
            <div className={`text-xl font-bold font-mono tracking-tight ${m.color}`}>{m.val}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-300">ASSET REGISTRY INDEX</span>
          <input type="text" placeholder="SEARCH ASSETS..." className="bg-slate-900 border border-slate-700 rounded px-3 py-1 text-[11px] font-mono text-slate-300 placeholder-slate-600 w-48 focus:outline-none focus:border-cyan-500/50" />
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="pb-3 font-medium">ASSET ID</th>
                <th className="pb-3 font-medium">DESIGNATION</th>
                <th className="pb-3 font-medium">TYPE CLASS</th>
                <th className="pb-3 font-medium">LOCATION NODE</th>
                <th className="pb-3 font-medium">HEALTH INDEX</th>
                <th className="pb-3 font-medium text-right">OPERATIONAL STATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {assets.map((a) => (
                <tr key={a.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 text-cyan-400 font-semibold"><Link href={`/assets/${a.id}`} className="hover:underline">{a.id}</Link></td>
                  <td className="py-3 text-slate-300 font-sans text-xs">{a.name}</td>
                  <td className="py-3 text-slate-400">{a.type}</td>
                  <td className="py-3 text-slate-400">{a.location}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${a.health >= 90 ? 'bg-emerald-500' : a.health >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${a.health}%` }} />
                      </div>
                      <span className="text-slate-400">{a.health}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${a.status === 'ONLINE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' : a.status === 'DEGRADED' ? 'bg-amber-950 text-amber-400 border border-amber-800/40' : a.status === 'MAINTENANCE' ? 'bg-blue-950 text-blue-400 border border-blue-800/40' : a.status === 'STANDBY' ? 'bg-slate-900 text-slate-400 border border-slate-800' : 'bg-red-950 text-red-400 border border-red-800/40'}`}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
