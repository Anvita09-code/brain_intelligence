/**
 * IOB Component Library – Compilation Export Layer
 * Phase 2 – Section 12
 *
 * Central barrel for the Industrial Operating Brain (IOB) design system.
 * Import any UI primitive from a single entry point:
 *
 *   import { Button, Card, DataTable, StatusIndicator } from '@/components';
 *
 * The layer re-exports 9 categorized domains:
 *  - icons
 *  - layout
 *  - display
 *  - forms
 *  - status
 *  - loaders
 *  - tables
 *  - charts
 *  - feedback
 *
 * Additional component groups in the repo (not re-exported here to avoid
 * name collisions):
 *  - navigation  -> import { DropdownMenu } from '@/components/navigation'
 *  - ui          -> legacy MUI wrappers, import directly from '@/components/ui/*'
 *
 * @version 2.12.0
 */

export * from './icons';
export * from './layout';
export * from './display';
export * from './forms';
export * from './status';
export * from './loaders';
export * from './tables';
export * from './charts';
export * from './feedback';
