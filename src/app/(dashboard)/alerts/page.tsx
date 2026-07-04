'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Alarm {
  id: string;
  level: 'CRITICAL' | 'WARNING' | 'ACKNOWLEDGED' | 'DIAGNOSTIC';
  node: string;
  msg: string;
  time: string;
}

const INITIAL_ALARMS: Alarm[] = [
  { id: 'ERR-W41-908', level: 'CRITICAL', node: 'SYS-TURB-081', msg: 'Exhaust Gas Temperature high saturation limit reached baseline config bounds.', time: '09:48:11' },
  { id: 'ERR-L12-402', level: 'WARNING', node: 'SYS-PUMP-402', msg: 'Motor current imbalance factor delta deviates > 5% nominal run spectrum.', time: '09:41:00' },
  { id: 'ERR-A09-119', level: 'WARNING', node: 'SYS-ROBT-119', msg: 'Kinematic joint torque load variance detected optimization anomalies.', time: '09:33:14' },
];

export default function MasterIndustrialAlarmCenter() {
  const [filter, setFilter] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'ACKNOWLEDGED' | 'DIAGNOSTIC'>('ALL');
  const [isAudibleSilenced, setIsAudibleSilenced] = useState(false);
  const [acknowledgedIds, setAcknowledgedIds] = useState<string[]>([]);

  // Toggle silence
  const handleSilenceAll = () => {
    setIsAudibleSilenced(!isAudibleSilenced);
  };

  // Toggle single alert acknowledgment
  const handleToggleAcknowledge = (id: string) => {
    if (acknowledgedIds.includes(id)) {
      setAcknowledgedIds(acknowledgedIds.filter(item => item !== id));
    } else {
      setAcknowledgedIds([...acknowledgedIds, id]);
    }
  };

  // Filter alarms based on chosen tab
  const filteredAlarms = INITIAL_ALARMS.filter(alarm => {
    const isAcked = acknowledgedIds.includes(alarm.id);
    if (filter === 'CRITICAL') return alarm.level === 'CRITICAL' && !isAcked;
    if (filter === 'WARNING') return alarm.level === 'WARNING' && !isAcked;
    if (filter === 'ACKNOWLEDGED') return isAcked;
    if (filter === 'DIAGNOSTIC') return alarm.level === 'DIAGNOSTIC';
    return true; // 'ALL' or base
  });

  // Calculate counts for badges
  const criticalCount = INITIAL_ALARMS.filter(a => a.level === 'CRITICAL' && !acknowledgedIds.includes(a.id)).length;
  const warningCount = INITIAL_ALARMS.filter(a => a.level === 'WARNING' && !acknowledgedIds.includes(a.id)).length;
  const acknowledgedCount = acknowledgedIds.length;

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
            <span>MASTER INDUSTRIAL ANOMALY & EVENT ALERT LOG</span>
            {isAudibleSilenced && (
              <span className="text-[10px] bg-red-950 text-red-400 border border-red-800/60 px-2 py-0.5 rounded font-mono animate-pulse">
                AUDIBLE SILENCED
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Real-time ISA-18.2 compliant plant alarm tracking matrix, acknowledgement control states, and urgency filters.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button 
            type="button" 
            onClick={handleSilenceAll}
            className={`px-3 py-1.5 font-mono text-[11px] rounded border transition-all ${
              isAudibleSilenced 
                ? 'bg-amber-950 border-amber-800 text-amber-400 hover:bg-amber-900' 
                : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {isAudibleSilenced ? 'ENABLE AUDIBLE ALERTS' : 'SILENCE ALL AUDIBLE ALERTS'}
          </button>
        </div>
      </div>

      {/* ALERTS MATRIX INTERFACE COMPONENT FILTER */}
      <div className="bg-[#0f172a] border border-slate-800 p-4 rounded flex flex-wrap gap-2 text-xs font-mono">
        <button 
          type="button" 
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 rounded border transition-all ${
            filter === 'ALL' 
              ? 'bg-slate-800 border-slate-600 text-white font-bold' 
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          ALL ACTIVE ({INITIAL_ALARMS.length - acknowledgedCount})
        </button>
        
        <button 
          type="button" 
          onClick={() => setFilter('CRITICAL')}
          className={`px-3 py-1.5 rounded border transition-all ${
            filter === 'CRITICAL' 
              ? 'bg-red-950 border-red-800 text-red-400 font-bold' 
              : 'bg-slate-900 border-slate-800 text-red-400/70 hover:text-red-400'
          }`}
        >
          CRITICAL ({criticalCount})
        </button>
        
        <button 
          type="button" 
          onClick={() => setFilter('WARNING')}
          className={`px-3 py-1.5 rounded border transition-all ${
            filter === 'WARNING' 
              ? 'bg-amber-950 border-amber-900 text-amber-400 font-bold' 
              : 'bg-slate-900 border-slate-800 text-amber-400/70 hover:text-amber-400'
          }`}
        >
          WARNING ({warningCount})
        </button>
        
        <button 
          type="button" 
          onClick={() => setFilter('ACKNOWLEDGED')}
          className={`px-3 py-1.5 rounded border transition-all ${
            filter === 'ACKNOWLEDGED' 
              ? 'bg-emerald-950 border-emerald-900 text-emerald-400 font-bold' 
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          ACKNOWLEDGED LOGS ({acknowledgedCount})
        </button>
        
        <button 
          type="button" 
          onClick={() => setFilter('DIAGNOSTIC')}
          className={`px-3 py-1.5 rounded border transition-all ${
            filter === 'DIAGNOSTIC' 
              ? 'bg-blue-950 border-blue-900 text-blue-400 font-bold' 
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          DIAGNOSTIC EVENTS
        </button>
      </div>

      {/* CORE ALARM INTERFACE RECORDS MATRIX */}
      <div className="bg-[#0f172a] border border-slate-800 rounded overflow-hidden">
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500">
                <th className="pb-3 font-medium">ALARM CODE ID</th>
                <th className="pb-3 font-medium">SEVERITY CONTEXT</th>
                <th className="pb-3 font-medium">TARGET EQUIPMENT</th>
                <th className="pb-3 font-medium">FUNCTIONAL ANOMALY DISPATCH CAPTION</th>
                <th className="pb-3 font-medium">TIMESTAMP INDEX</th>
                <th className="pb-3 font-medium">ACKNOWLEDGEMENT</th>
                <th className="pb-3 font-medium text-right">OPERATOR ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredAlarms.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 italic">
                    No matching alarms or event logs found in this query spectrum.
                  </td>
                </tr>
              ) : (
                filteredAlarms.map((al) => {
                  const isAcked = acknowledgedIds.includes(al.id);
                  return (
                    <tr key={al.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 text-red-400 font-bold">{al.id}</td>
                      <td className="py-3.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          al.level === 'CRITICAL' 
                            ? 'bg-red-950 text-red-400 border border-red-800/40' 
                            : 'bg-amber-950 text-amber-400 border border-amber-800/40'
                        }`}>
                          {al.level}
                        </span>
                      </td>
                      <td className="py-3.5 text-cyan-400 font-semibold">{al.node}</td>
                      <td className="py-3.5 text-slate-300 font-sans text-xs max-w-sm truncate">{al.msg}</td>
                      <td className="py-3.5 text-slate-500 text-[11px]">{al.time}</td>
                      <td className="py-3.5">
                        <button
                          type="button"
                          onClick={() => handleToggleAcknowledge(al.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                            isAcked 
                              ? 'bg-emerald-950 border-emerald-800 text-emerald-400 hover:bg-emerald-900/60' 
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          {isAcked ? 'ACKNOWLEDGED' : 'ACKNOWLEDGE'}
                        </button>
                      </td>
                      <td className="py-3.5 text-right">
                        <Link href={`/alerts/${al.id}`} className="px-2.5 py-1 text-[11px] rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-all">
                          INVESTIGATE RCA
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
