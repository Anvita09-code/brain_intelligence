import React from 'react';

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">INDUSTRIAL OPERATOR PERSONA & PREFERENCES</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Operator credentials, clearance mappings, notification preferences, and ACL definitions.</p>
        </div>
        <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold self-start sm:self-center">SAVE PROFILE</button>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded p-6 flex items-start gap-5">
        <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 border-2 border-cyan-400 flex items-center justify-center font-mono font-bold text-xl text-white shadow-lg shadow-cyan-500/20 flex-shrink-0">OP</div>
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'OPERATOR ID', value: 'OP_ENG_41', readOnly: false },
              { label: 'FULL NAME', value: 'Alexandra Voss', readOnly: false },
              { label: 'ROLE / CLEARANCE', value: 'SHIFT_SUPERVISOR', readOnly: true, color: 'text-amber-400' },
              { label: 'ASSIGNED NODE', value: 'WE-EU-PRD-014', readOnly: false },
            ].map((f, idx) => (
              <div key={idx}>
                <label className="text-[10px] font-mono text-slate-500 block mb-1">{f.label}</label>
                <input type="text" defaultValue={f.value} readOnly={f.readOnly} className={`w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs font-mono ${f.color || 'text-slate-300'} focus:outline-none focus:border-cyan-500/50`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded">
        <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">NOTIFICATION PREFERENCES</span></div>
        <div className="p-4 space-y-2">
          {[
            { label: 'CRITICAL ALARMS', desc: 'Push notification + SMS + Email', enabled: true },
            { label: 'WARNING ALERTS', desc: 'Push notification + Email', enabled: true },
            { label: 'MAINTENANCE REMINDERS', desc: 'Email digest (daily)', enabled: true },
            { label: 'PREDICTION UPDATES', desc: 'In-app notification', enabled: false },
            { label: 'SYSTEM HEALTH REPORTS', desc: 'Weekly email summary', enabled: true },
          ].map((n, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded border border-slate-800/80">
              <div><div className="text-[11px] font-mono text-slate-300">{n.label}</div><div className="text-[9px] font-mono text-slate-600">{n.desc}</div></div>
              <div className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${n.enabled ? 'bg-cyan-600' : 'bg-slate-700'}`}><div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${n.enabled ? 'left-4' : 'left-0.5'}`} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0f172a] border border-slate-800 rounded">
        <div className="px-4 py-3 border-b border-slate-800"><span className="text-xs font-mono font-bold text-slate-300">SECURITY CREDENTIALS</span></div>
        <div className="p-4 space-y-3">
          <div>
            <label className="text-[10px] font-mono text-slate-500 block mb-1">MFA STATUS</label>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-xs font-mono text-emerald-400">ENABLED — TOTP + HARDWARE KEY</span></div>
          </div>
          <div>
            <label className="text-[10px] font-mono text-slate-500 block mb-1">LAST PASSWORD ROTATION</label>
            <span className="text-xs font-mono text-slate-300">2026-06-28 (6 days ago) — Next required: 2026-09-26</span>
          </div>
          <div>
            <label className="text-[10px] font-mono text-slate-500 block mb-1">ACTIVE SESSIONS</label>
            <span className="text-xs font-mono text-slate-300">1 active — WE-EU-PRD-014 / Chrome 128.0</span>
          </div>
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300">CHANGE PASSWORD</button>
        </div>
      </div>
    </div>
  );
}
