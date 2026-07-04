import React from 'react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">OPERATIONAL OEE & PLANT KPI AGGREGATORS</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Overall Equipment Effectiveness, availability, performance, quality metrics with trend analytics.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <select className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-[11px] font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50">
            <option>LAST 7 DAYS</option><option>LAST 30 DAYS</option><option>THIS QUARTER</option><option>YTD</option>
          </select>
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300">EXPORT DASHBOARD</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'OVERALL OEE', val: '88.42%', sub: '+1.2% vs last week', color: 'text-emerald-400', bg: 'bg-emerald-500' },
          { title: 'AVAILABILITY', val: '94.71%', sub: 'Target: 95.0%', color: 'text-cyan-400', bg: 'bg-cyan-500' },
          { title: 'PERFORMANCE', val: '93.15%', sub: '-0.4% vs target', color: 'text-amber-400', bg: 'bg-amber-500' },
          { title: 'QUALITY YIELD', val: '99.32%', sub: 'Defects: 0.68%', color: 'text-emerald-400', bg: 'bg-emerald-500' },
        ].map((m, idx) => (
          <div key={idx} className="bg-[#0f172a] border border-slate-800 p-4 rounded">
            <div className="text-[10px] font-mono text-slate-500 tracking-wider mb-3">{m.title}</div>
            <div className={`text-2xl font-bold font-mono tracking-tight ${m.color} mb-1`}>{m.val}</div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2"><div className={`h-full ${m.bg} rounded-full`} style={{ width: m.val }} /></div>
            <div className="text-[9px] font-mono text-slate-500">{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { title: 'OEE TREND — 7 DAY ROLLING', icon: '📈', subtitle: 'Availability × Performance × Quality' },
          { title: 'ENERGY CONSUMPTION PROFILE', icon: '⚡', subtitle: 'kW/h by shift × line' },
          { title: 'DOWNTIME PARETO ANALYSIS', icon: '📊', subtitle: 'Downtime causes ranked by impact' },
          { title: 'PRODUCTION THROUGHPUT', icon: '🏭', subtitle: 'Units/hr per production line' },
        ].map((c, idx) => (
          <div key={idx} className="bg-[#0f172a] border border-slate-800 rounded flex flex-col min-h-[300px]">
            <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">{c.title}</span></div>
            <div className="flex-1 p-6 flex items-center justify-center border-dashed border-2 border-slate-800/60 m-4 rounded bg-slate-950/40 text-center">
              <div><span className="text-3xl mb-2 block text-slate-700">{c.icon}</span><span className="text-xs font-mono text-slate-500">CANVAS</span><span className="text-[10px] font-mono text-slate-600 block mt-1">{c.subtitle}</span></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded">
        <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">LINE-LEVEL KPI BREAKDOWN</span></div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="pb-3 font-medium">PRODUCTION LINE</th><th className="pb-3 font-medium">OEE</th><th className="pb-3 font-medium">AVAILABILITY</th><th className="pb-3 font-medium">PERFORMANCE</th><th className="pb-3 font-medium">QUALITY</th><th className="pb-3 font-medium">THROUGHPUT</th><th className="pb-3 font-medium text-right">DOWNTIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {[
                { line: 'LINE 1 — FORMING', oee: '91.2%', avail: '96.4%', perf: '94.8%', qual: '99.5%', tp: '342 u/h', dt: '2.1h' },
                { line: 'LINE 2 — MACHINING', oee: '85.7%', avail: '92.1%', perf: '93.0%', qual: '99.7%', tp: '218 u/h', dt: '5.4h' },
                { line: 'LINE 3 — ASSEMBLY', oee: '88.2%', avail: '95.6%', perf: '91.8%', qual: '98.9%', tp: '510 u/h', dt: '3.2h' },
                { line: 'LINE 4 — PACKAGING', oee: '92.0%', avail: '97.8%', perf: '94.2%', qual: '99.9%', tp: '640 u/h', dt: '1.5h' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 text-slate-200 font-semibold">{row.line}</td>
                  <td className="py-3 text-cyan-400 font-bold">{row.oee}</td>
                  <td className="py-3">{row.avail}</td>
                  <td className="py-3">{row.perf}</td>
                  <td className="py-3">{row.qual}</td>
                  <td className="py-3">{row.tp}</td>
                  <td className="py-3 text-right text-amber-400">{row.dt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
