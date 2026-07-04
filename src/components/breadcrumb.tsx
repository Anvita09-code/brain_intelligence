'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Dynamic breadcrumb component.
 * Parses the pathname and renders a clickable trail with IOB-CORE root.
 */
export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((item) => item !== '');

  return (
    <nav
      aria-label="Industrial Breadcrumb Navigation Topology"
      className="font-mono text-[11px] tracking-wide text-slate-400 flex items-center gap-1.5"
    >
      <Link
        href="/dashboard"
        className="hover:text-cyan-400 uppercase transition-colors"
      >
        IOB-CORE
      </Link>
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;

        return (
          <React.Fragment key={href}>
            <span className="text-slate-600 font-sans">/</span>
            {isLast ? (
              <span className="text-cyan-400 font-semibold truncate max-w-[140px] uppercase">
                {segment}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-cyan-400 uppercase transition-colors truncate max-w-[140px]"
              >
                {segment}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
