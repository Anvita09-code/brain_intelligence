import React from 'react';

export default function EnterpriseDashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">
            OPERATIONAL TELEMETRY COMMAND HARBOR
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time cross-facility execution overview mapping, health factors,
            and process line alerts.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300">
            EXPORT SUMMARY
          </button>
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold">
            INCIDENT MAP
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'OVERALL EQUIPMENT EFFECTIVENESS (OEE)', val: '88.42 %', state: 'NORMAL', color: 'text-emerald-400' },
          { title: 'CRITICAL ACTIVE PROCESS ALARMS', val: '14 ACTIVE', state: 'WARNING', color: 'text-amber-400' },
          { title: 'PREDICTIVE PROBABILITY OF FAILURE RISK', val: '2.14 %', state: 'NOMINAL', color: 'text-emerald-400' },
          { title: 'ACTIVE ENERGY UTILIZATION INDEX', val: '4,112 kW/h', state: 'OPTIMAL', color: 'text-cyan-400' },
        ].map((m, idx) => (
          <div key={idx} className="bg-[#0f172a] border border-slate-800 p-4 rounded relative overflow-hidden">
            <div className="text-[10px] font-mono text-slate-500 tracking-wider mb-2">{m.title}</div>
            <div className={`text-xl font-bold font-mono tracking-tight ${m.color}`}>{m.val}</div>
            <div className="mt-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 inline-block text-slate-400 border border-slate-800/60">{m.state}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-[#0f172a] border border-slate-800 rounded flex flex-col min-h-[360px]">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-300">REAL-TIME TELEMETRY MATRIX & SCADA WAVEFORMS</span>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <span className="text-[10px] font-mono text-slate-500">LIVE FEED ENGINE</span>
            </div>
          </div>
          <div className="flex-1 p-6 flex flex-col items-center justify-center border-dashed border-2 border-slate-800/60 m-4 rounded bg-slate-950/40 text-center">
            <span className="text-3xl mb-2 text-slate-700">📊</span>
            <span className="text-xs font-mono text-slate-400 font-semibold">ANALOG REAL-TIME STREAM TIMELINE WORKPLACE</span>
            <span className="text-[10px] font-mono text-slate-600 mt-1 max-w-xs">Simulated canvas structural placeholder for high-frequency vibration and pressure indicators.</span>
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded flex flex-col h-[360px]">
          <div className="px-4 py-3 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-slate-300">SYSTEM HEALTH LOGS & RECENT ALERTS</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {[
              { id: 'AL-908', type: 'CRITICAL', msg: 'Substation Transformer T4 Core temperature exceeds threshold limit.', asset: 'TX-4', time: '2m ago' },
              { id: 'AL-905', type: 'WARNING', msg: 'Hydraulic Pressure Drops below minimum baseline config limits.', asset: 'PUMP-01A', time: '14m ago' },
              { id: 'AL-899', type: 'MAINT', msg: 'Scheduled diagnostic runtime routine interval notification task.', asset: 'ROBOT-ARM-6', time: '1h ago' },
            ].map((al) => (
              <div key={al.id} className="p-2.5 bg-slate-950/60 rounded border border-slate-800/80 font-mono text-xs flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${al.type === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-800/40' : al.type === 'WARNING' ? 'bg-amber-950 text-amber-400 border border-amber-800/40' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}>{al.type}</span>
                  <span className="text-[10px] text-slate-500">{al.time}</span>
                </div>
                <div className="text-slate-300 font-sans text-xs line-clamp-1">{al.msg}</div>
                <div className="text-[10px] text-cyan-500/80 mt-0.5">NODE ASSOC: {al.asset} // ID: {al.id}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded">
        <div className="px-4 py-3 border-b border-slate-800">
          <span className="text-xs font-mono font-bold text-slate-300">GLOBAL INCIDENT RESPONDERS & AUDIT TRAIL LOG ENVIRONMENT</span>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="pb-3 font-medium">TIMESTAMP UNIT</th>
                <th className="pb-3 font-medium">EVENT DISPATCHER IDENTIFIER</th>
                <th className="pb-3 font-medium">FACILITY DOMAIN CATEGORY</th>
                <th className="pb-3 font-medium">ACTION REGISTER VALUE</th>
                <th className="pb-3 font-medium text-right">STATUS ASSIGNMENT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {[
                { time: '2026-07-04 09:41:02', id: 'OP_ENG_41', area: 'ROTATING_EQUIPMENT_W2', action: 'MANUAL_OVERRIDE_VLV_02', status: 'COMMIT_SUCCESS' },
                { time: '2026-07-04 08:12:59', id: 'SYS_CORE', area: 'COMPUTE_NODE_EAST', action: 'MEM_BUFFER_FLUSH_SYSTEM', status: 'SYS_OK' },
                { time: '2026-07-04 06:00:00', id: 'AUTO_SCHED', area: 'LINE_3_LOGISTICS_HUB', action: 'BATCH_PROCESS_EXEC_START', status: 'SYS_OK' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 text-slate-400 text-[11px]">{row.time}</td>
                  <td className="py-3 text-cyan-400 font-semibold">{row.id}</td>
                  <td className="py-3 text-slate-400">{row.area}</td>
                  <td className="py-3 font-sans text-xs">{row.action}</td>
                  <td className="py-3 text-right text-emerald-400 font-bold text-[11px]">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
