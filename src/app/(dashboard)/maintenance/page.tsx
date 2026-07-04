import React from 'react';

export default function MaintenancePage() {
  const workOrders = [
    { id: 'WO-2026-0742', asset: 'TX-4', task: 'Cooling Fan Assembly Inspection & Replacement', priority: 'CRITICAL', status: 'DISPATCHED', tech: 'Field Team ALPHA', scheduled: '2026-07-04 10:30', sla: '4h' },
    { id: 'WO-2026-0741', asset: 'VLV-MAIN-02', task: 'Actuator Diagnostic & Seal Replacement', priority: 'CRITICAL', status: 'IN_PROGRESS', tech: 'Eng. Martinez', scheduled: '2026-07-04 09:00', sla: '8h' },
    { id: 'WO-2026-0740', asset: 'ROBOT-ARM-6', task: 'Joint Lubrication & Calibration Routine', priority: 'MEDIUM', status: 'SCHEDULED', tech: 'Tech Team GAMMA', scheduled: '2026-07-05 08:00', sla: '48h' },
    { id: 'WO-2026-0739', asset: 'PUMP-01A', task: 'Hydraulic Pressure Regulator Calibration', priority: 'HIGH', status: 'COMPLETED', tech: 'Eng. Kowalski', scheduled: '2026-07-03 14:00', sla: '24h' },
    { id: 'WO-2026-0738', asset: 'GEN-STBY-1', task: 'Quarterly Load Bank Test & Battery Check', priority: 'MEDIUM', status: 'SCHEDULED', tech: 'Tech Team BETA', scheduled: '2026-07-06 07:00', sla: '72h' },
    { id: 'WO-2026-0737', asset: 'CNC-MILL-3', task: 'Spindle Alignment Check & Tool Changer PM', priority: 'LOW', status: 'SCHEDULED', tech: 'Eng. Patel', scheduled: '2026-07-10 09:00', sla: '1 week' },
    { id: 'WO-2026-0736', asset: 'COMP-001', task: 'Air Filter Replacement & Oil Change', priority: 'LOW', status: 'COMPLETED', tech: 'Tech Team DELTA', scheduled: '2026-07-02 11:00', sla: '1 week' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">FIELD DISPATCH & PREVENTATIVE WORK ORDERS</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">CMMS-integrated work order lifecycle from generation through dispatch, execution, and closure.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold">+ NEW WORK ORDER</button>
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300">VIEW CALENDAR</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { title: 'OPEN WORK ORDERS', val: '47', color: 'text-slate-200' },
          { title: 'CRITICAL / HIGH', val: '5', color: 'text-red-400' },
          { title: 'DISPATCHED / IN PROGRESS', val: '12', color: 'text-amber-400' },
          { title: 'COMPLETED (MTD)', val: '89', color: 'text-emerald-400' },
          { title: 'SLA COMPLIANCE', val: '96.4%', color: 'text-cyan-400' },
        ].map((m, idx) => (
          <div key={idx} className="bg-[#0f172a] border border-slate-800 p-4 rounded">
            <div className="text-[10px] font-mono text-slate-500 tracking-wider mb-2">{m.title}</div>
            <div className={`text-xl font-bold font-mono tracking-tight ${m.color}`}>{m.val}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-300">WORK ORDER REGISTER — ALL ORDERS</span>
          <div className="flex gap-2">
            {['ALL','CRITICAL','HIGH','MEDIUM','LOW'].map(f => (
              <button key={f} className={`px-2 py-0.5 font-mono text-[10px] rounded border ${f === 'ALL' ? 'bg-cyan-950 text-cyan-400 border-cyan-500/30' : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="pb-3 font-medium">WO ID</th><th className="pb-3 font-medium">ASSET</th><th className="pb-3 font-medium">TASK DESCRIPTION</th><th className="pb-3 font-medium">PRIORITY</th><th className="pb-3 font-medium">STATUS</th><th className="pb-3 font-medium">TECHNICIAN</th><th className="pb-3 font-medium text-right">SCHEDULED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {workOrders.map((wo) => (
                <tr key={wo.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 text-cyan-400 font-semibold">{wo.id}</td>
                  <td className="py-3 text-slate-300">{wo.asset}</td>
                  <td className="py-3 font-sans text-xs text-slate-300 max-w-xs truncate">{wo.task}</td>
                  <td className="py-3"><span className={`text-[10px] px-2 py-0.5 rounded font-bold ${wo.priority === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-800/40' : wo.priority === 'HIGH' ? 'bg-amber-950 text-amber-400 border border-amber-800/40' : wo.priority === 'MEDIUM' ? 'bg-blue-950 text-blue-400 border border-blue-800/40' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}>{wo.priority}</span></td>
                  <td className="py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${wo.status === 'COMPLETED' ? 'bg-emerald-500' : wo.status === 'IN_PROGRESS' ? 'bg-cyan-500 animate-pulse' : wo.status === 'DISPATCHED' ? 'bg-amber-500' : 'bg-slate-500'}`} />
                      <span className={`text-[10px] font-bold ${wo.status === 'COMPLETED' ? 'text-emerald-400' : wo.status === 'IN_PROGRESS' ? 'text-cyan-400' : wo.status === 'DISPATCHED' ? 'text-amber-400' : 'text-slate-400'}`}>{wo.status.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="py-3 text-slate-400 text-[11px]">{wo.tech}</td>
                  <td className="py-3 text-right text-slate-400 text-[11px]">{wo.scheduled}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
