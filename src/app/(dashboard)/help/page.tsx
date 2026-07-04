import React from 'react';

export default function HelpPage() {
  const sops = [
    { id: 'SOP-001', title: 'Emergency Shutdown Procedure', category: 'SAFETY', rev: '3.2', lastUpdated: '2026-06-15', pages: 12 },
    { id: 'SOP-002', title: 'Critical Alarm Acknowledge & Escalate Workflow', category: 'OPERATIONS', rev: '2.1', lastUpdated: '2026-05-30', pages: 8 },
    { id: 'SOP-003', title: 'Work Order Dispatch & Field Execution Protocol', category: 'MAINTENANCE', rev: '4.0', lastUpdated: '2026-07-01', pages: 15 },
    { id: 'SOP-004', title: 'Asset Onboarding & Digital Twin Registration', category: 'ASSET_MGMT', rev: '1.5', lastUpdated: '2026-04-22', pages: 10 },
    { id: 'SOP-005', title: 'Predictive Model Validation & Override Flow', category: 'ANALYTICS', rev: '2.3', lastUpdated: '2026-06-10', pages: 7 },
    { id: 'SOP-006', title: 'Edge Node Deployment & Network Configuration', category: 'INFRASTRUCTURE', rev: '3.0', lastUpdated: '2026-05-18', pages: 22 },
    { id: 'SOP-007', title: 'User Access Control & RBAC Administration', category: 'SECURITY', rev: '2.8', lastUpdated: '2026-06-28', pages: 9 },
    { id: 'SOP-008', title: 'Energy Optimization & Load Shedding Protocol', category: 'OPERATIONS', rev: '1.9', lastUpdated: '2026-04-15', pages: 6 },
    { id: 'SOP-009', title: 'Incident Root Cause Analysis (RCA) Framework', category: 'QUALITY', rev: '4.1', lastUpdated: '2026-07-02', pages: 18 },
    { id: 'SOP-010', title: 'System Backup & Disaster Recovery Runbook', category: 'INFRASTRUCTURE', rev: '2.0', lastUpdated: '2026-06-01', pages: 14 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">STANDARD OPERATING PROCEDURES (SOP) HUB</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Centralized industrial procedure library — safety, operations, maintenance, security, and infrastructure runbooks.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <input type="text" placeholder="SEARCH SOPs..." className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-[11px] font-mono text-slate-300 placeholder-slate-600 w-48 focus:outline-none focus:border-cyan-500/50" />
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold">+ NEW SOP</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {['ALL','SAFETY','OPERATIONS','MAINTENANCE','ASSET_MGMT','ANALYTICS','INFRASTRUCTURE','SECURITY','QUALITY'].map(cat => (
          <button key={cat} className={`px-3 py-1 font-mono text-[11px] rounded border ${cat === 'ALL' ? 'bg-cyan-950 text-cyan-400 border-cyan-500/30' : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300 hover:border-slate-700'}`}>{cat}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sops.map((sop) => (
          <div key={sop.id} className="bg-[#0f172a] border border-slate-800 rounded p-4 hover:border-slate-700 transition-colors group cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">{sop.category}</span>
              <span className="text-[10px] font-mono text-slate-500">v{sop.rev}</span>
            </div>
            <h3 className="text-sm font-mono font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors mb-2 leading-snug">{sop.title}</h3>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1.5"><span className="text-lg">📄</span><span className="text-[10px] font-mono text-slate-500">{sop.pages} pages</span></div>
              <div className="flex items-center gap-2"><span className="text-[9px] font-mono text-slate-600">Updated {sop.lastUpdated}</span><button className="text-cyan-500 group-hover:text-cyan-300 text-[10px] font-mono font-bold">VIEW →</button></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded">
        <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">QUICK REFERENCE LINKS</span></div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: '🚨', label: 'EMERGENCY CONTACTS', desc: 'On-call engineering roster' },
            { icon: '📋', label: 'COMPLIANCE MATRIX', desc: 'ISO 55000 / ISO 45001' },
            { icon: '🔧', label: 'SPARE PARTS CATALOG', desc: 'SKU inventory lookup' },
            { icon: '📡', label: 'NETWORK DIAGRAM', desc: 'Plant topology map' },
          ].map((link, idx) => (
            <div key={idx} className="p-3 bg-slate-950/60 rounded border border-slate-800/80 text-center hover:border-cyan-500/30 transition-colors cursor-pointer">
              <span className="text-2xl block mb-1">{link.icon}</span>
              <span className="text-[10px] font-mono font-bold text-slate-300">{link.label}</span>
              <span className="text-[9px] font-mono text-slate-600 block mt-0.5">{link.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
