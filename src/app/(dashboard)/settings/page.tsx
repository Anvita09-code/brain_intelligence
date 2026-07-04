import React from 'react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">SYSTEM PROFILES, RBAC & NODES CONFIGURATION</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Platform-level configuration: threshold tuning, access control, edge node management, and integration endpoints.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold">SAVE CONFIG</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0f172a] border border-slate-800 rounded">
          <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">ALARM THRESHOLD PROFILES</span></div>
          <div className="p-4 space-y-3">
            {[
              { label: 'CORE TEMPERATURE CRITICAL', value: '85.0', unit: '°C', range: '60-120' },
              { label: 'VIBRATION WARNING (RMS)', value: '4.5', unit: 'mm/s', range: '1-10' },
              { label: 'OIL PRESSURE LOW', value: '2.0', unit: 'bar', range: '0-10' },
              { label: 'CURRENT OVERLOAD', value: '350', unit: 'A', range: '100-500' },
              { label: 'COOLANT FLOW LOW', value: '1800', unit: 'RPM', range: '1000-3600' },
            ].map((t, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 bg-slate-950/60 rounded border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-400 w-56 truncate">{t.label}</span>
                <input type="text" defaultValue={t.value} className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[11px] font-mono text-cyan-400 text-center focus:outline-none focus:border-cyan-500/50" />
                <span className="text-[10px] font-mono text-slate-600">{t.unit}</span>
                <span className="text-[9px] font-mono text-slate-600 ml-auto">{t.range}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded">
          <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">RBAC ROLE DEFINITIONS</span></div>
          <div className="p-4 space-y-2">
            {[
              { role: 'PLATFORM_ADMIN', users: 3, perms: 'FULL ACCESS', color: 'text-red-400' },
              { role: 'SHIFT_SUPERVISOR', users: 8, perms: 'READ/WRITE + ESCALATE', color: 'text-amber-400' },
              { role: 'FIELD_ENGINEER', users: 24, perms: 'READ/WRITE + DISPATCH', color: 'text-cyan-400' },
              { role: 'OPERATOR', users: 67, perms: 'READ + ACKNOWLEDGE', color: 'text-emerald-400' },
              { role: 'AUDITOR', users: 5, perms: 'READ ONLY', color: 'text-slate-400' },
            ].map((r, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2.5 bg-slate-950/60 rounded border border-slate-800/80">
                <span className={`text-[10px] font-mono font-bold ${r.color} w-36`}>{r.role}</span>
                <span className="text-[11px] font-mono text-slate-400">{r.users} users</span>
                <span className="text-[9px] font-mono text-slate-500 ml-auto">{r.perms}</span>
              </div>
            ))}
            <button type="button" className="w-full px-3 py-2 font-mono text-[11px] rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 mt-2">+ ADD ROLE</button>
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded">
          <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">EDGE NODE REGISTRY</span></div>
          <div className="p-4 space-y-2">
            {[
              { node: 'WE-EU-PRD-014', location: 'Building Alpha', status: 'ONLINE', ver: 'v4.12', uptime: '47d 3h' },
              { node: 'WE-EU-PRD-015', location: 'Building Beta', status: 'ONLINE', ver: 'v4.12', uptime: '31d 12h' },
              { node: 'WE-EU-PRD-016', location: 'Line 3 Edge', status: 'DEGRADED', ver: 'v4.11', uptime: '14d 6h' },
              { node: 'WE-EU-PRD-017', location: 'Utility Zone', status: 'ONLINE', ver: 'v4.12', uptime: '52d 1h' },
            ].map((n, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2.5 bg-slate-950/60 rounded border border-slate-800/80">
                <span className={`w-1.5 h-1.5 rounded-full ${n.status === 'ONLINE' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-[10px] font-mono text-cyan-400 font-semibold">{n.node}</span>
                <span className="text-[10px] font-mono text-slate-400">{n.location}</span>
                <span className="text-[9px] font-mono text-slate-600 ml-auto">{n.ver} · {n.uptime}</span>
              </div>
            ))}
            <button type="button" className="w-full px-3 py-2 font-mono text-[11px] rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 mt-2">+ REGISTER NODE</button>
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded">
          <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">INTEGRATION ENDPOINTS</span></div>
          <div className="p-4 space-y-2">
            {[
              { name: 'OPC-UA SERVER', endpoint: 'opc.tcp://gateway-east:4840', status: 'CONNECTED', color: 'text-emerald-400' },
              { name: 'MQTT BROKER', endpoint: 'mqtt://broker.internal:1883', status: 'CONNECTED', color: 'text-emerald-400' },
              { name: 'REST API GATEWAY', endpoint: 'https://api.iob.internal/v4', status: 'CONNECTED', color: 'text-emerald-400' },
              { name: 'CMMS ADAPTER', endpoint: 'https://cmms.internal/soap', status: 'DEGRADED', color: 'text-amber-400' },
              { name: 'ERP CONNECTOR', endpoint: 'https://erp.internal/odata', status: 'DISCONNECTED', color: 'text-red-400' },
            ].map((ep, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2.5 bg-slate-950/60 rounded border border-slate-800/80">
                <span className={`w-1.5 h-1.5 rounded-full ${ep.status === 'CONNECTED' ? 'bg-emerald-500' : ep.status === 'DEGRADED' ? 'bg-amber-500' : 'bg-red-500'}`} />
                <span className="text-[10px] font-mono text-slate-300 w-32 truncate">{ep.name}</span>
                <span className="text-[9px] font-mono text-slate-500 truncate">{ep.endpoint}</span>
                <span className={`text-[9px] font-mono font-bold ${ep.color} ml-auto`}>{ep.status}</span>
              </div>
            ))}
            <button type="button" className="w-full px-3 py-2 font-mono text-[11px] rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 mt-2">+ ADD ENDPOINT</button>
          </div>
        </div>
      </div>
    </div>
  );
}
