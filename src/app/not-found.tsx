import Link from 'next/link';

/**
 * 404 – Route address space unmapped.
 */
export default function GlobalNotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 font-mono">
      <div className="text-6xl mb-4 animate-bounce">🚨</div>
      <h1 className="text-2xl font-bold tracking-tight text-red-400 sm:text-3xl">
        ERR_404_ROUTE_UNDEFINED
      </h1>
      <p className="mt-4 text-sm text-slate-400 max-w-md">
        The requesting logical memory address space mapping is invalid. Target
        address layout node is unreachable or does not exist inside the core
        schema context.
      </p>
      <div className="mt-8">
        <Link
          href="/dashboard"
          className="rounded border border-cyan-500/30 bg-cyan-950/40 px-4 py-2 text-xs font-semibold text-cyan-400 hover:bg-cyan-950 transition-colors"
        >
          RETURN TO PLATFORM ROOT HARBOR
        </Link>
      </div>
    </div>
  );
}
