import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center min-h-screen bg-industrial-bg-dark p-md font-mono text-center">
      <div className="bg-industrial-panel-dark border border-industrial-border-dark p-xl rounded max-w-lg flex flex-col items-center gap-md">
        <Terminal className="w-12 h-12 text-industrial-status-warning" />
        <h1 className="text-2xl font-bold text-industrial-bg-light uppercase tracking-wider">
          404 // ENDPOINT NOT FOUND
        </h1>
        <p className="text-xs text-industrial-status-offline">
          The requested control panel coordinate does not exist in the Enterprise Routing Table.
        </p>
        <Link
          href="/dashboard"
          className="bg-industrial-panel-dark border border-industrial-border-dark hover:border-industrial-status-warning text-industrial-bg-light hover:text-industrial-status-warning px-6 py-2.5 rounded text-xs uppercase tracking-wider transition inline-flex items-center gap-2 mt-sm font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          RETURN TO CONTROL ROOM
        </Link>
      </div>
    </div>
  );
}
