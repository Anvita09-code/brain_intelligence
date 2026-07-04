import React from 'react';
import Link from 'next/link';

export default function AlertDetailPage({ params }: { params: { id: string } }) {
  const alertId = params.id;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1"><Link href="/alerts" className="text-[10px] font-mono text-slate-500 hover:text-cyan-400 transition-colors">&larr; ALERT CENTER</Link></div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">RCA TIMELINE: {alertId}</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Root-cause-analysis event chain with correlated telemetry snapshot.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">ACKNOWLEDGE</button>
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-red-600 hover:bg-red-500 text-white font-semibold">ESCALATE</button>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-red-800/40 rounded p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🚨</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-red-950 text-red-400 border border-red-800/40">CRITICAL</span>
              <span className="text-[10px] font-mono text-slate-500">ID: {alertId}</span>
              <span className="text-[10px] font-mono text-slate-500">UNACKED</span>
            </div>
            <p className="text-sm font-sans text-slate-200 font-semibold">Substation Transformer T4 Core temperature exceeds threshold limit of 85.0°C.</p>
            <p className="text-xs text-slate-400 mt-1">Associated Asset: <Link href="/assets/TX-4" className="text-cyan-400 hover:underline">TX-4</Link> — Location: BUILDING-ALPHA, SECTOR-2</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded">
        <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">ROOT CAUSE ANALYSIS EVENT CHAIN</span></div>
        <div className="p-6">
          <div className="space-y-0">
            {[
              { time: '09:41:02', event: 'CRITICAL ALARM TRIGGERED — Core temp 92.4°C exceeds threshold 85.0°C', type: 'CRITICAL' },
              { time: '09:38:15', event: 'Cooling fan RPM dropped below 1800 (nominal: 2400)', type: 'WARNING' },
              { time: '09:35:40', event: 'Oil pump current draw increased 12% above baseline', type: 'WARNING' },
              { time: '09:30:00', event: 'Ambient bay temperature sensor reports 38°C (normal range)', type: 'INFO' },
              { time: '09:15:00', event: 'Last routine diagnostic check — all parameters nominal', type: 'INFO' },
              { time: '08:00:00', event: 'Shift change — Operator OP_ENG_41 assumes monitoring station', type: 'INFO' },
            ].map((e, idx) => (
              <div key={idx} className="flex gap-4 pb-6 relative">
                {idx < 5 && <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-slate-800" />}
                <div className={`relative z-10 mt-0.5 h-3.5 w-3.5 rounded-full border-2 flex-shrink-0 ${e.type === 'CRITICAL' ? 'bg-red-500 border-red-500' : e.type === 'WARNING' ? 'bg-amber-500 border-amber-500' : 'bg-slate-600 border-slate-600'}`} />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-slate-500">{e.time}</span>
                  <p className="text-xs font-sans text-slate-300 mt-0.5">{e.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded">
        <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">RECOMMENDED REMEDIATION ACTIONS</span></div>
        <div className="p-4 space-y-2">
          {[
            'Inspect and replace cooling fan assembly on Transformer T4.',
            'Verify oil pump bearing integrity and lubrication levels.',
            'Re-calibrate core temperature sensor TMP-101.',
            'Schedule follow-up thermographic inspection within 48 hours.',
          ].map((a, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2 bg-slate-950/60 rounded border border-slate-800/80">
              <span className="text-[10px] font-mono text-cyan-400 mt-0.5">STEP-{idx + 1}</span>
              <span className="text-xs font-sans text-slate-300">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
