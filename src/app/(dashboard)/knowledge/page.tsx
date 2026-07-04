import React from 'react';
import Link from 'next/link';

export default function KnowledgePage() {
  const nodes = [
    { id: 'N-101', label: 'TRANSFORMER_TX-4', type: 'ASSET', connections: 24, cluster: 'ELECTRICAL_DISTRIBUTION' },
    { id: 'N-102', label: 'PUMP_ASSEMBLY_01A', type: 'ASSET', connections: 18, cluster: 'HYDRAULIC_SYSTEMS' },
    { id: 'N-103', label: 'LINE_3_WORKFLOW', type: 'PROCESS', connections: 42, cluster: 'MANUFACTURING_LINE_3' },
    { id: 'N-201', label: 'ALARM_POLICY_CRITICAL', type: 'POLICY', connections: 15, cluster: 'ALERT_MANAGEMENT' },
    { id: 'N-202', label: 'MAINTENANCE_SCHEDULE_Q3', type: 'SCHEDULE', connections: 31, cluster: 'FIELD_SERVICES' },
    { id: 'N-301', label: 'SOP_EMERGENCY_SHUTDOWN', type: 'DOCUMENT', connections: 12, cluster: 'SAFETY_PROCEDURES' },
    { id: 'N-302', label: 'ISO_55000_COMPLIANCE', type: 'STANDARD', connections: 8, cluster: 'REGULATORY' },
    { id: 'N-401', label: 'SENSOR_ARRAY_BUILDING_A', type: 'SENSOR_GROUP', connections: 56, cluster: 'TELEMETRY_INFRA' },
    { id: 'N-402', label: 'EDGE_GATEWAY_EAST', type: 'INFRASTRUCTURE', connections: 19, cluster: 'NETWORK_TOPOLOGY' },
    { id: 'N-501', label: 'FAILURE_MODE_BEARING', type: 'KNOWLEDGE', connections: 7, cluster: 'RCA_LIBRARY' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">KNOWLEDGE GRAPH SEMANTIC NODE NAVIGATOR</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">GraphRAG-powered semantic infrastructure topology with entity relationship mapping.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <input type="text" placeholder="SEARCH GRAPH NODES..." className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-[11px] font-mono text-slate-300 placeholder-slate-600 w-56 focus:outline-none focus:border-cyan-500/50" />
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold">QUERY GRAPH</button>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded flex flex-col min-h-[400px]">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-300">SEMANTIC TOPOLOGY GRAPH — FORCE-DIRECTED LAYOUT</span>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500"><span className="w-2 h-2 rounded-full bg-cyan-500" /> ASSET</span>
            <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500"><span className="w-2 h-2 rounded-full bg-emerald-500" /> PROCESS</span>
            <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500"><span className="w-2 h-2 rounded-full bg-amber-500" /> POLICY</span>
            <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500"><span className="w-2 h-2 rounded-full bg-purple-500" /> OTHER</span>
          </div>
        </div>
        <div className="flex-1 p-6 flex items-center justify-center border-dashed border-2 border-slate-800/60 m-4 rounded bg-slate-950/40 text-center">
          <div><span className="text-4xl mb-3 block">🕸️</span><span className="text-xs font-mono text-slate-400 font-semibold block">INTERACTIVE GRAPH CANVAS</span><span className="text-[10px] font-mono text-slate-600 block mt-1">1,247 nodes · 3,891 edges · 14 clusters · Force-directed layout</span></div>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded">
        <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">ENTITY NODE REGISTRY</span></div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="pb-3 font-medium">NODE ID</th><th className="pb-3 font-medium">LABEL</th><th className="pb-3 font-medium">TYPE</th><th className="pb-3 font-medium">EDGES</th><th className="pb-3 font-medium">CLUSTER</th><th className="pb-3 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {nodes.map((n) => (
                <tr key={n.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 text-cyan-400 font-semibold">{n.id}</td>
                  <td className="py-3 text-slate-300">{n.label}</td>
                  <td className="py-3"><span className={`text-[10px] px-2 py-0.5 rounded font-bold ${n.type === 'ASSET' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40' : n.type === 'PROCESS' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' : n.type === 'POLICY' ? 'bg-amber-950 text-amber-400 border border-amber-800/40' : 'bg-purple-950 text-purple-400 border border-purple-800/40'}`}>{n.type}</span></td>
                  <td className="py-3 text-slate-400">{n.connections}</td>
                  <td className="py-3 text-slate-400 text-[11px]">{n.cluster}</td>
                  <td className="py-3 text-right"><Link href={`/knowledge/${n.id}`} className="text-cyan-500 hover:text-cyan-300 text-[10px]">EXPAND →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
