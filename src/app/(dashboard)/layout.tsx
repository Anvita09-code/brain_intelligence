import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/breadcrumb';

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

const navigationConfig: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Assets Matrix', href: '/assets', icon: '🏭', badge: '1,240' },
  { name: 'Alert Center', href: '/alerts', icon: '⚠️', badge: '14 Active' },
  { name: 'Prediction Center', href: '/predictions', icon: '🔮' },
  { name: 'Knowledge Graph', href: '/knowledge', icon: '🕸️' },
  { name: 'AI Operator Copilot', href: '/chat', icon: '🤖' },
  { name: 'Digital Twin Canvas', href: '/digital-twin', icon: '💎' },
  { name: 'Maintenance Schedule', href: '/maintenance', icon: '🔧' },
  { name: 'Analytics & OEE', href: '/analytics', icon: '📈' },
  { name: 'System Settings', href: '/settings', icon: '⚙️' },
  { name: 'Operator Profile', href: '/profile', icon: '👤' },
  { name: 'SOP Documentation', href: '/help', icon: '❓' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:inset-y-0 border-r border-[#1e293b] bg-[#0f172a] transition-all duration-300">
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-[#1e293b] justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧠</span>
            <span className="font-mono font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-lg">
              IOB // PLATFORM
            </span>
          </div>
          <span className="text-xs px-2 py-0.5 font-mono rounded bg-slate-800 text-cyan-400 border border-cyan-500/30">
            v4.12
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
          {navigationConfig.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between px-3 py-2.5 rounded-md font-mono text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50 transition-all duration-150 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-base group-hover:scale-110 transition-transform duration-150">
                  {item.icon}
                </span>
                <span>{item.name.toUpperCase()}</span>
              </div>
              {item.badge && (
                <span className="inline-flex items-center rounded bg-red-400/10 px-2 py-0.5 text-[10px] font-medium text-red-400 border border-red-500/20 font-sans">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1e293b] bg-slate-950/40 font-mono text-[10px] text-slate-500 flex flex-col gap-1">
          <div>NODE: WE-EU-PRD-014</div>
          <div>STATUS: SYSTEM SECURE // SECURE_TLS</div>
        </div>
      </aside>

      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#1e293b] bg-[#0f172a]/80 backdrop-blur px-6 z-10">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="lg:hidden text-slate-400 hover:text-slate-100 text-xl"
              aria-label="Open operational sidebar"
            >
              ☰
            </button>
            <div className="hidden sm:block">
              <Breadcrumbs />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-400">EDGE CONNECTIVITY: 100%</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 border border-cyan-400 flex items-center justify-center font-mono font-bold text-xs text-white shadow-lg shadow-cyan-500/20">
              OP
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#090d16] p-6 focus:outline-none custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
