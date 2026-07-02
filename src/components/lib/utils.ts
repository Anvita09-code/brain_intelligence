/**
 * IOB Component Utility – Class Name Merger
 *
 * Wraps clsx + tailwind-merge for safe Tailwind class composition.
 * Already used in existing project via clsx and tailwind-merge deps.
 *
 * Usage:
 *   import { cn } from '@/components/lib/utils';
 *   <div className={cn('px-4 py-2', isActive && 'bg-blue-500', className)} />
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
