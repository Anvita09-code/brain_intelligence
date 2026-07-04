import React from 'react';
import Link from 'next/link';

export default function PredictionsPage() {
  const predictions = [
    { id: 'PDM-042', asset: 'PUMP-01A', assetPath: '/assets/PUMP-01A', failureMode: 'Bearing Degradation', probability: 78.3, impact: 'HIGH', rfc: '2026-07-18', rul: '14 days', confidence: 91 },
    { id: 'PDM-041', asset: 'VLV-MAIN-02', assetPath: '/assets/VLV-MAIN-02', failureMode: 'Seal Fatigue', probability: 92.1, impact: 'CRITICAL', rfc: '2026-07-09', rul: '5 days', confidence: 87 },
    { id: 'PDM-040', asset: 'ROBOT-ARM-6', assetPath: '/assets/ROBOT-ARM-6', failureMode: 'Joint Wear', probability: 45.6, impact: 'MEDIUM', rfc: '2026-08-02', rul: '29 days', confidence: 82 },
    { id: 'PDM-039', asset: 'CNC-MILL-3', assetPath: '/assets/CNC-MILL-3', failureMode: 'Spindle Misalignment', probability: 33.4, impact: 'MEDIUM', rfc: '2026-08-15', rul: '42 days', confidence: 76 },
    { id: 'PDM-038', asset: 'COMP-001', assetPath: '/assets/COMP-001', failureMode: 'Motor Winding Fault', probability: 21.7, impact: 'LOW', rfc: '2026-09-10', rul: '68 days', confidence: 94 },
    { id: 'PDM-037', asset: 'TX-204', assetPath: '/assets/TX-204', failureMode: 'Insulation Breakdown', probability: 15.2, impact: 'HIGH', rfc: '2026-10-01', rul: '89 days', confidence: 88 },
    { id: 'PDM-036', asset: 'GEN-STBY-1', assetPath: '/assets/GEN-STBY-1', failureMode: 'Battery Degradation', probability: 62.8, impact: 'MEDIUM', rfc: '2026-07-25', rul: '21 days', confidence: 90 },
    { id: 'PDM-035', asset: 'SENSOR-TH-44', assetPath: '/assets/SENSOR-TH-44', failureMode: 'Calibration Drift', probability: 8.9, impact: 'LOW', rfc: '2026-11-15', rul: '134 days', confidence: 95 },
  ];
  const criticalCount = predictions.filter(p => p.impact === 'CRITICAL' || (p.impact === 'HIGH' && p.probability > 50)).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">PREDICTIVE MAINTENANCE (PdM) RISK MATRIX</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Machine learning RUL inference engine — probability × impact risk assessment grid.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300">EXPORT REPORT</button>
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold">REFRESH MODELS</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { title: 'ACTIVE PREDICTIONS', val: '247', color: 'text-cyan-400' },
          { title: 'HIGH RISK ITEMS', val: String(criticalCount), color: 'text-red-400' },
          { title: 'MEAN MODEL CONFIDENCE', val: '87.9%', color: 'text-emerald-400' },
          { title: 'PREVENTED FAILURES (MTD)', val: '12', color: 'text-emerald-400' },
          { title: 'COST AVOIDANCE (MTD)', val: '$342K', color: 'text-cyan-400' },
        ].map((m, idx) => (
          <div key={idx} className="bg-[#0f172a] border border-slate-800 p-4 rounded">
            <div className="text-[10px] font-mono text-slate-500 tracking-wider mb-2">{m.title}</div>
            <div className={`text-xl font-bold font-mono tracking-tight ${m.color}`}>{m.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0f172a] border border-slate-800 rounded flex flex-col min-h-[320px]">
          <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">PROBABILITY × IMPACT RISK MATRIX</span></div>
          <div className="flex-1 p-6 flex items-center justify-center border-dashed border-2 border-slate-800/60 m-4 rounded bg-slate-950/40 text-center">
            <div><span className="text-3xl mb-2 block text-slate-700">🎯</span><span className="text-xs font-mono text-slate-500">RISK HEATMAP CANVAS</span><span className="text-[10px] font-mono text-slate-600 block mt-1">Probability (Y) × Impact Severity (X)</span></div>
          </div>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 rounded flex flex-col min-h-[320px]">
          <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">RUL DISTRIBUTION HISTOGRAM</span></div>
          <div className="flex-1 p-6 flex items-center justify-center border-dashed border-2 border-slate-800/60 m-4 rounded bg-slate-950/40 text-center">
            <div><span className="text-3xl mb-2 block text-slate-700">📊</span><span className="text-xs font-mono text-slate-500">REMAINING USEFUL LIFE DISTRIBUTION</span><span className="text-[10px] font-mono text-slate-600 block mt-1">Bucketed by days-to-failure</span></div>
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded">
        <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">TOP PREDICTED FAILURE MODES — 30 DAY WINDOW</span></div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="pb-3 font-medium">PREDICTION ID</th><th className="pb-3 font-medium">ASSET</th><th className="pb-3 font-medium">FAILURE MODE</th><th className="pb-3 font-medium">PROB %</th><th className="pb-3 font-medium">IMPACT</th><th className="pb-3 font-medium">RECOMMENDED FIX</th><th className="pb-3 font-medium text-right">RUL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {predictions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 text-cyan-400 font-semibold">{p.id}</td>
                  <td className="py-3"><Link href={p.assetPath} className="text-slate-300 hover:text-cyan-400">{p.asset}</Link></td>
                  <td className="py-3 font-sans text-xs text-slate-300">{p.failureMode}</td>
                  <td className="py-3"><div className="flex items-center gap-2"><div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className={`h-full rounded-full ${p.probability >= 70 ? 'bg-red-500' : p.probability >= 40 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${p.probability}%` }} /></div><span className={p.probability >= 70 ? 'text-red-400' : p.probability >= 40 ? 'text-amber-400' : 'text-emerald-400'}>{p.probability}%</span></div></td>
                  <td className="py-3"><span className={`text-[10px] px-2 py-0.5 rounded font-bold ${p.impact === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-800/40' : p.impact === 'HIGH' ? 'bg-amber-950 text-amber-400 border border-amber-800/40' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}>{p.impact}</span></td>
                  <td className="py-3 text-slate-400 text-[11px] font-sans">{p.rfc}</td>
                  <td className="py-3 text-right text-cyan-400 font-bold">{p.rul}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
