'use client';

import React, { useState } from 'react';

export default function ChatPage() {
  const [messages] = useState([
    { role: 'system', text: 'IOB-CORE v4.12 initialized. Connected to 1,240 assets across 14 clusters. 14 active alarms, 3 critical. How may I assist?', time: '09:41:00' },
    { role: 'user', text: 'Show me the top 3 critical alarms and recommend remediation steps.', time: '09:41:15' },
    { role: 'system', text: 'TOP CRITICAL ALARMS:\n1. AL-908: TX-4 Core temp 92.4°C (threshold 85°C) — RECOMMEND: Inspect cooling fan assembly, verify oil pump integrity.\n2. AL-907: VLV-MAIN-02 mechanical seizure — RECOMMEND: Immediate actuator diagnostic, isolate line.\n3. AL-906: LINE-3 Emergency Stop breach — RECOMMEND: Dispatch field engineer to Station 7.', time: '09:41:18' },
    { role: 'user', text: 'Create a work order for TX-4 cooling fan inspection.', time: '09:42:05' },
    { role: 'system', text: 'WORK ORDER WO-2026-0742 CREATED:\n• Asset: TX-4 (Transformer A, Building Alpha)\n• Task: Cooling fan assembly inspection & replacement\n• Priority: CRITICAL — SLA 4 hours\n• Assigned: Field Team ALPHA\n• Scheduled: 2026-07-04 10:30\n\nWould you like me to notify the team lead?', time: '09:42:06' },
  ]);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800 shrink-0">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">AI OPERATOR COPILOT CHAT WORKSPACE</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">LLM orchestration engine with runbook execution, asset query, and work order dispatch.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="flex items-center gap-1.5 px-2 py-1 font-mono text-[10px] rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> CONNECTED</span>
          <button type="button" className="px-3 py-1.5 font-mono text-[11px] rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300">CLEAR CHAT</button>
        </div>
      </div>

      <div className="flex-1 bg-[#0f172a] border border-slate-800 rounded flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded p-3 ${m.role === 'user' ? 'bg-cyan-600/20 border border-cyan-500/30' : 'bg-slate-900 border border-slate-800'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-mono font-bold ${m.role === 'user' ? 'text-cyan-400' : 'text-emerald-400'}`}>{m.role === 'user' ? 'OPERATOR' : 'IOB-COPILOT'}</span>
                  <span className="text-[9px] font-mono text-slate-600">{m.time}</span>
                </div>
                <pre className="text-xs font-sans text-slate-300 whitespace-pre-wrap leading-relaxed">{m.text}</pre>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex gap-2">
            <input type="text" placeholder="ENTER COMMAND OR QUERY... (E.G., 'SHOW ACTIVE ALARMS', 'CREATE WORK ORDER')" className="flex-1 bg-slate-900 border border-slate-700 rounded px-4 py-2.5 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50" />
            <button type="button" className="px-4 py-2.5 font-mono text-[11px] rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold">EXECUTE</button>
          </div>
          <div className="flex gap-2 mt-2">
            {['/alarms','/assets','/predictions','/maintenance','/runbook'].map(cmd => (
              <button key={cmd} className="px-2 py-1 font-mono text-[10px] rounded bg-slate-900 border border-slate-800 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors">{cmd}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
